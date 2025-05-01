import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2, GripVertical, Save, Pencil, Type, Square, ArrowUpRight, Eraser, Trash2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import QuestionAnswerDisplay from '@/components/QuestionAnswerDisplay';
import TeacherResources from '@/components/TeacherResources';
import { 
  DndContext, 
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';

type Annotation = {
  id: string;
  type: 'text' | 'highlight' | 'arrow';
  content: string;
  position: {
    x: number;
    y: number;
  };
  color: string;
};

type AnnotationsMap = Record<number, Annotation[]>;

type S3Material = {
  id: number;
  path: string;
  title: string;
  description: string;
  contentType: string; 
  content: string;
  orderIndex: number;
  order: number;
  isPublished: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UnitInfo = {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
};

export default function SlickContentViewer() {
  const [location, navigate] = useLocation();
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // State for the viewer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookId, setBookId] = useState<string | null>(null);
  const [unitNumber, setUnitNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [annotations, setAnnotations] = useState<AnnotationsMap>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<{ type: 'text' | 'highlight' | 'arrow', color: string } | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [slideToRemove, setSlideToRemove] = useState<S3Material | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // Context from URL
  const pathParts = location.split('/');
  const bookPath = pathParts[1] || '';
  const unitPath = pathParts[2] || '';
  
  // Auth context
  const { user } = useAuth();
  const { toast } = useToast();
  const hasPaidAccess = !!user; // TODO: Check for actual subscription status
  
  // Controls how many slides are available for free
  const freeSlideLimit = 10; // Default for standard books
  
  // Use sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px of movement required before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch materials for this unit
  const { data: materials = [], refetch } = useQuery<S3Material[]>({ 
    queryKey: [`/api/materials/${bookPath}/${unitPath}`],
    enabled: !!bookPath && !!unitPath,
    onError: (error: Error) => {
      console.error('Error fetching materials:', error);
      setError('Failed to load materials. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load materials. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Fetch book/unit info
  const { data: unitInfo } = useQuery<UnitInfo>({ 
    queryKey: [`/api/unit-info/${bookPath}/${unitPath}`],
    enabled: !!bookPath && !!unitPath,
    onError: (error: Error) => {
      console.error('Error fetching unit info:', error);
    },
  });
  
  // Fetch annotations data for this unit
  const { data: annotationsData } = useQuery({ 
    queryKey: [`/api/annotations/${bookPath}/${unitPath}`],
    enabled: !!bookPath && !!unitPath && isEditMode,
    onError: (error: Error) => {
      console.error('Error fetching annotations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load annotations.',
        variant: 'destructive',
      });
    },
  });
  
  // Save annotations mutation
  const saveAnnotationsMutation = useMutation({
    mutationFn: async (data: { unitId: string, annotations: AnnotationsMap }) => {
      const response = await apiRequest('POST', '/api/annotations', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Annotations saved successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to save annotations. ' + error.message,
        variant: 'destructive',
      });
    }
  });
  
  // Reorder slides mutation
  const reorderSlidesMutation = useMutation({
    mutationFn: async (data: { unitId: string, materialIds: number[] }) => {
      const response = await apiRequest('POST', '/api/materials/reorder', data);
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: 'Success',
        description: 'Slides reordered successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to reorder slides. ' + error.message,
        variant: 'destructive',
      });
    }
  });
  
  // Remove slide mutation
  const removeSlidesMutation = useMutation({
    mutationFn: async (materialId: number) => {
      const response = await apiRequest('DELETE', `/api/materials/${materialId}`);
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: 'Success',
        description: 'Slide removed successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to remove slide. ' + error.message,
        variant: 'destructive',
      });
    }
  });
  
  // Parse the URL to set initial state
  useEffect(() => {
    if (pathParts.length >= 3) {
      const book = pathParts[1];
      const unit = pathParts[2];
      
      if (book && unit) {
        setBookId(book);
        setUnitNumber(parseInt(unit.replace('unit', '')));
      }
    }
  }, [location, pathParts]);
  
  // Set up annotations when they are loaded
  useEffect(() => {
    if (annotationsData) {
      setAnnotations(annotationsData);
    }
  }, [annotationsData]);
  
  // Initialize annotations object for new materials
  useEffect(() => {
    if (materials.length > 0) {
      const newAnnotations = { ...annotations };
      let changed = false;
      
      // Create empty annotation arrays for materials that don't have them
      materials.forEach(material => {
        if (!newAnnotations[material.id]) {
          newAnnotations[material.id] = [];
          changed = true;
        }
      });
      
      if (changed) {
        setAnnotations(newAnnotations);
      }
    }
  }, [materials, annotations]);
  
  // Function to navigate between slides
  const goToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  }, []);
  
  const goToNextSlide = useCallback(() => {
    if (sliderRef.current && currentIndex < materials.length - 1) {
      sliderRef.current.slickNext();
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, materials.length]);
  
  const goToPrevSlide = useCallback(() => {
    if (sliderRef.current && currentIndex > 0) {
      sliderRef.current.slickPrev();
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when not in edit mode
      if (!isEditMode) {
        switch (e.key) {
          case 'ArrowRight':
            goToNextSlide();
            break;
          case 'ArrowLeft':
            goToPrevSlide();
            break;
          case 'Home':
            goToSlide(0);
            break;
          case 'End':
            goToSlide(materials.length - 1);
            break;
          default:
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, goToSlide, materials.length, isEditMode]);
  
  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  // Add a new annotation when clicking in edit mode
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, materialId: number) => {
    if (isEditMode && activeAnnotation) {
      // Get the position relative to the element
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create a new annotation
      const newAnnotation: Annotation = {
        id: uuidv4(),
        type: activeAnnotation.type,
        content: activeAnnotation.type === 'text' ? 'Text note' : '',
        position: { x, y },
        color: activeAnnotation.color,
      };
      
      // Add it to the state
      const updatedAnnotations = { ...annotations };
      if (!updatedAnnotations[materialId]) {
        updatedAnnotations[materialId] = [];
      }
      updatedAnnotations[materialId].push(newAnnotation);
      setAnnotations(updatedAnnotations);
    }
  };
  
  // Save annotations
  const saveAnnotations = () => {
    if (bookId && unitNumber) {
      const unitId = `${bookId}/unit${unitNumber}`;
      saveAnnotationsMutation.mutate({ unitId, annotations });
    }
  };
  
  // Handle drag and drop reordering
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Extract the material IDs from the thumbnail IDs
      const activeId = parseInt(String(active.id).replace('thumbnail-', ''));
      const overId = parseInt(String(over.id).replace('thumbnail-', ''));
      
      // Find indices for the materials
      const oldIndex = materials.findIndex(m => m.id === activeId);
      const newIndex = materials.findIndex(m => m.id === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        // Update local state for immediate feedback
        const reorderedMaterials = arrayMove(materials, oldIndex, newIndex);
        // Extract the IDs in the new order
        const materialIds = reorderedMaterials.map(m => m.id);
        
        // Save the new order to the server
        if (bookId && unitNumber) {
          reorderSlidesMutation.mutate({
            unitId: `${bookId}/unit${unitNumber}`,
            materialIds
          });
        }
      }
    }
    
    setActiveId(null);
  };
  
  // Open remove slide confirmation
  const openRemoveDialog = (material: S3Material) => {
    setSlideToRemove(material);
    setShowRemoveDialog(true);
  };
  
  // Confirm removal of slide
  const confirmRemoveSlide = (materialId: number) => {
    setIsRemoving(true);
    removeSlidesMutation.mutate(materialId, {
      onSettled: () => {
        setIsRemoving(false);
        setShowRemoveDialog(false);
        setSlideToRemove(null);
      }
    });
  };
  
  // Go to home page
  const goToHome = () => navigate('/');
  
  // Slider settings
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => {
      setCurrentIndex(next);
      // Reset zoom when changing slides
      setIsZoomed(false);
      setZoomLevel(1);
    },
  };
  
  // Sortable thumbnail component
  const SortableThumbnail = ({ material, index }: { material: S3Material, index: number }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({
      id: `thumbnail-${material.id}`,
    });
    
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
      cursor: isEditMode ? 'grab' : 'pointer',
    };
    
    return (
      <div 
        ref={setNodeRef}
        style={style} 
        {...(isEditMode ? { ...attributes, ...listeners } : {})}
        onClick={() => !isEditMode && goToSlide(index)}
        className={`relative h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-md border-2 transition-all ${index === currentIndex ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-200'} ${!hasPaidAccess && index >= freeSlideLimit ? 'opacity-50' : 'opacity-100'}`}
      >
        {/* The thumbnail content */}
        {material.contentType === 'IMAGE' || material.path.endsWith('.jpg') || material.path.endsWith('.png') || material.path.endsWith('.gif') || material.path.endsWith('.avif') ? (
          <>
            <img 
              src={material.path} 
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.error(`Error loading thumbnail at ${material.path}`);
                // Replace with an icon or placeholder based on file type
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-100');
              }}
            />
            {/* File extension badge */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">
              {material.path.toLowerCase().endsWith('.jpg') ? 'JPG' : 
               material.path.toLowerCase().endsWith('.png') ? 'PNG' : 
               material.path.toLowerCase().endsWith('.gif') ? 'GIF' : 'IMG'}
            </div>
          </>
        ) : material.contentType === 'VIDEO' || material.path.endsWith('.mp4') ? (
          <>
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">VIDEO</div>
          </>
        ) : material.contentType === 'PDF' || material.path.endsWith('.pdf') ? (
          <>
            <div className="flex h-full w-full items-center justify-center bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">PDF</div>
          </>
        ) : material.path.endsWith('.swf') ? (
          <>
            <div className="flex h-full w-full items-center justify-center bg-yellow-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5-5 5 5 5"/><path d="M4 5v5h5"/><path d="M4 14h5v5"/><path d="M9 9h5v5"/><path d="M14 9h1v1"/><path d="M19 9h1v1"/><path d="M19 4v5h-5"/><path d="M14 14h5v5"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">SWF</div>
          </>
        ) : (
          <>
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">FILE</div>
          </>
        )}
        
        {/* Slide number */}
        <div className="absolute top-0 left-0 h-4 w-4 bg-white/80 text-[8px] font-medium flex items-center justify-center">{index + 1}</div>
        
        {/* Edit mode controls */}
        {isEditMode && (
          <button 
            className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-bl-md flex items-center justify-center text-xs"
            onClick={(e) => {
              e.stopPropagation();
              openRemoveDialog(material);
            }}
            title="Remove slide"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  };
  
  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col w-full h-[calc(100vh-64px)] ${isFullScreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
    >
      {/* Top bar with navigation and controls */}
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={goToHome}
              className="text-gray-600 hover:text-gray-900"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            
            {unitInfo && (
              <div className="flex items-center">
                <Book className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{unitInfo.bookId.toUpperCase()} - Unit {unitInfo.unitNumber}</span>
                {unitInfo.title && <span className="ml-2 text-gray-500">{unitInfo.title}</span>}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Edit mode toggle */}
            {user && (
              <Button 
                size="sm" 
                variant={isEditMode ? "default" : "outline"} 
                onClick={() => setIsEditMode(!isEditMode)}
                className={isEditMode ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                <Pencil className="h-4 w-4 mr-1" />
                {isEditMode ? "Exit Edit Mode" : "Edit"}
              </Button>
            )}
            
            {/* Save annotations button */}
            {isEditMode && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={saveAnnotations}
                disabled={saveAnnotationsMutation.isPending}
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
              >
                {saveAnnotationsMutation.isPending && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            )}
            
            {/* Annotation tools */}
            {isEditMode && (
              <div className="flex items-center space-x-1 border rounded-md p-1 bg-gray-50">
                <button 
                  className={`p-1 rounded ${activeAnnotation?.type === 'text' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setActiveAnnotation({ type: 'text', color: '#000000' })}
                  title="Add text note"
                >
                  <Type className="h-4 w-4" />
                </button>
                <button 
                  className={`p-1 rounded ${activeAnnotation?.type === 'highlight' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setActiveAnnotation({ type: 'highlight', color: '#ffff00' })}
                  title="Add highlight"
                >
                  <Square className="h-4 w-4" />
                </button>
                <button 
                  className={`p-1 rounded ${activeAnnotation?.type === 'arrow' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setActiveAnnotation({ type: 'arrow', color: '#ff0000' })}
                  title="Add arrow"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 rounded text-gray-600 hover:bg-gray-100" 
                  onClick={() => setActiveAnnotation(null)}
                  title="Clear selection"
                >
                  <Eraser className="h-4 w-4" />
                </button>
                {activeAnnotation && (
                  <div className="p-1 border rounded flex items-center gap-1 bg-white">
                    <div className="text-[10px] font-medium">Color:</div>
                    <button 
                      onClick={() => setActiveAnnotation({ ...activeAnnotation, color: '#000000' })}
                      className={`h-4 w-4 rounded-full bg-black ${activeAnnotation.color === '#000000' ? 'ring-2 ring-blue-500' : ''}`}
                    />
                    <button 
                      onClick={() => setActiveAnnotation({ ...activeAnnotation, color: '#ff0000' })}
                      className={`h-4 w-4 rounded-full bg-red-500 ${activeAnnotation.color === '#ff0000' ? 'ring-2 ring-blue-500' : ''}`}
                    />
                    <button 
                      onClick={() => setActiveAnnotation({ ...activeAnnotation, color: '#00ff00' })}
                      className={`h-4 w-4 rounded-full bg-green-500 ${activeAnnotation.color === '#00ff00' ? 'ring-2 ring-blue-500' : ''}`}
                    />
                    <button 
                      onClick={() => setActiveAnnotation({ ...activeAnnotation, color: '#0000ff' })}
                      className={`h-4 w-4 rounded-full bg-blue-500 ${activeAnnotation.color === '#0000ff' ? 'ring-2 ring-blue-500' : ''}`}
                    />
                    <button 
                      onClick={() => setActiveAnnotation({ ...activeAnnotation, color: '#ffff00' })}
                      className={`h-4 w-4 rounded-full bg-yellow-400 ${activeAnnotation.color === '#ffff00' ? 'ring-2 ring-blue-500' : ''}`}
                    />
                  </div>
                )}
              </div>
            )}
            
            {/* Fullscreen toggle */}
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleFullScreen}
              className="text-gray-600 hover:text-gray-900"
              title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            
            {/* Slide counter */}
            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium border border-gray-200 shadow-sm">
              {currentIndex + 1} / {materials.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="relative flex flex-1 flex-col">
        {/* Content viewer */}
        <div className="relative flex-1">
          <Slider ref={sliderRef} {...slickSettings} className="h-full">
            {materials.map((material, index) => {
              // For premium content, blur or hide based on free slide limit
              const shouldBlur = !hasPaidAccess && index >= freeSlideLimit;
              
              // Debug log for crucial blur check
              if (index >= freeSlideLimit) {
                console.log(`PREMIUM CONTENT CHECK: Slide ${index} | hasPaidAccess=${hasPaidAccess} | freeSlideLimit=${freeSlideLimit} | shouldBlur=${shouldBlur}`);
              }
              
              return (
                <div key={material.id} className="flex h-full items-center justify-center outline-none">
                  <div 
                    className={`relative h-full w-full max-w-7xl mx-auto ${isZoomed ? 'cursor-move' : ''} ${isEditMode ? 'cursor-crosshair' : ''}`}
                    style={{ 
                      transform: isZoomed ? `scale(${zoomLevel})` : 'none',
                      transition: 'transform 0.2s ease-out',
                    }}
                  >
                    {material.contentType === 'IMAGE' || material.path.endsWith('.jpg') || material.path.endsWith('.png') || material.path.endsWith('.gif') || material.path.endsWith('.avif') ? (
                      <div 
                        className="relative p-4 w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => {
                          if (isEditMode && activeAnnotation) {
                            handleImageClick(e, material.id);
                          } else if (!isEditMode) {
                            // Toggle zoom on click when not editing
                            setIsZoomed(!isZoomed);
                            setZoomLevel(isZoomed ? 1 : 2);
                          }
                        }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="flex items-center justify-center w-full">
                            <img 
                              src={material.path}
                              alt={`Learning material slide ${index + 1}`}
                              className={`h-auto object-contain mx-auto transition-transform duration-200 
                                ${isEditMode ? 'cursor-crosshair' : ''}
                                ${!hasPaidAccess && index >= freeSlideLimit ? 'blur-lg brightness-75' : ''}
                                ${material.path.includes('/00 A.png') && (bookPath === 'book7' && unitPath === 'unit1') ? 'max-w-[50%]' : 'max-w-full'}
                              `}
                              loading={index === currentIndex || index === currentIndex + 1 || index === currentIndex - 1 ? "eager" : "lazy"}
                              onError={(e) => {
                                console.error(`Error loading image at ${material.path}`, e);
                                // Set a fallback or placeholder
                                e.currentTarget.src = `/placeholder.png`;
                                e.currentTarget.classList.add('error-image');
                              }}
                            />
                          </div>
                          
                          {/* Premium content overlay */}
                          {!hasPaidAccess && index >= freeSlideLimit && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm text-white z-10 p-4 text-center">
                              <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                              <p className="text-sm mb-4">Subscribe to access all learning materials</p>
                              <Button 
                                size="sm" 
                                variant="default"
                                className="bg-primary text-white hover:bg-primary/90"
                                onClick={() => window.location.href = '/checkout/single_lesson'}
                              >
                                Upgrade Now
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Zoom controls - only show when current slide is active */}
                        {index === currentIndex && !isEditMode && (
                          <div className="absolute bottom-2 right-2 bg-white/80 rounded-lg shadow-md flex items-center p-1 z-10">
                            <button 
                              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-700" 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (zoomLevel > 1) {
                                  setZoomLevel(prev => Math.max(1, prev - 0.5));
                                } else {
                                  setIsZoomed(false);
                                }
                              }}
                              title="Zoom out"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                            <button 
                              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-700" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(true);
                                setZoomLevel(prev => Math.min(4, prev + 0.5));
                              }}
                              title="Zoom in"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                            <div className="mx-1 text-xs font-medium text-gray-700">{Math.round(zoomLevel * 100)}%</div>
                            <button 
                              className="p-1.5 hover:bg-gray-200 rounded-md text-gray-700" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(false);
                                setZoomLevel(1);
                              }}
                              title="Reset zoom"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path><path d="m19 19-3.5-3.5"></path><path d="M2 12h10"></path><path d="M12 2v10"></path></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : material.contentType === 'PDF' || material.path.endsWith('.pdf') ? (
                      <div className="flex flex-col items-center justify-center p-4 rounded bg-blue-50 text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <p className="mt-2 font-medium">PDF Document</p>
                        <a href={material.path} target="_blank" rel="noopener noreferrer" className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Open PDF</a>
                      </div>
                    ) : material.path.endsWith('.swf') ? (
                      <div className="flex flex-col items-center justify-center p-4 rounded bg-yellow-50 text-yellow-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5-5 5 5 5"/><path d="M4 5v5h5"/><path d="M4 14h5v5"/><path d="M9 9h5v5"/><path d="M14 9h1v1"/><path d="M19 9h1v1"/><path d="M19 4v5h-5"/><path d="M14 14h5v5"/></svg>
                        <p className="mt-2 font-medium">Flash SWF File</p>
                        <p className="text-xs text-center mt-1">Flash content is no longer supported in modern browsers</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 rounded bg-gray-50 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        <p className="mt-2 font-medium">Unknown File Type</p>
                        <p className="text-xs text-center mt-1">This content type cannot be displayed</p>
                      </div>
                    )}
                    
                    {/* Edit mode indicator */}
                    {isEditMode && index === currentIndex && (
                      <div className="absolute top-2 right-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Edit Mode: {activeAnnotation ? (
                          activeAnnotation.type === 'text' ? 'Adding Text' :
                          activeAnnotation.type === 'highlight' ? 'Adding Highlight' :
                          'Adding Arrow'
                        ) : 'Select Tool'}
                      </div>
                    )}
                    
                    {/* Premium content overlay */}
                    {shouldBlur && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                          <h3 className="text-lg font-semibold text-blue-700">Premium Content</h3>
                          <p className="mb-4 text-sm text-gray-700">Sign in to access all slides in this unit.</p>
                          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        
        {/* Navigation arrows */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevSlide}
            disabled={currentIndex === 0}
            className="h-12 w-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:shadow-xl border-gray-100 transition-all transform hover:-translate-x-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextSlide}
            disabled={currentIndex === materials.length - 1}
            className="h-12 w-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:shadow-xl border-gray-100 transition-all transform hover:translate-x-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="mt-4 px-4">
        <div className="relative overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToHorizontalAxis]}
          >
            <SortableContext
              items={materials.map(m => `thumbnail-${m.id}`)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-1 overflow-x-auto pb-2 items-center">
                {/* Current position indicator */}
                <div className="min-w-[28px] text-xs font-medium text-gray-500 text-center">
                  {currentIndex + 1}
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {materials.map((material, index) => (
                    <SortableThumbnail 
                      key={`thumbnail-${material.id}`}
                      material={material}
                      index={index}
                    />
                  ))}
                </div>
                
                {/* Total slides indicator */}
                <div className="min-w-[28px] text-xs font-medium text-gray-500 text-center">
                  {materials.length}
                </div>
              </div>
            </SortableContext>
            
            {/* Drag overlay */}
            <DragOverlay>
              {activeId ? (
                <div className="h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-md border-2 border-blue-500 shadow-lg">
                  {(() => {
                    const material = materials.find(m => `thumbnail-${m.id}` === activeId);
                    if (!material) return null;
                    
                    if (material.contentType === 'IMAGE' || material.path.endsWith('.jpg') || material.path.endsWith('.png') || material.path.endsWith('.gif') || material.path.endsWith('.avif')) {
                      return (
                        <img 
                          src={material.path} 
                          alt="Dragging thumbnail"
                          className="h-full w-full object-cover"
                        />
                      );
                    } else if (material.contentType === 'VIDEO' || material.path.endsWith('.mp4')) {
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-gray-800 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                      );
                    } else if (material.contentType === 'PDF' || material.path.endsWith('.pdf')) {
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                      );
                    } else if (material.path.endsWith('.swf')) {
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-yellow-50 text-yellow-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5-5 5 5 5"/><path d="M4 5v5h5"/><path d="M4 14h5v5"/><path d="M9 9h5v5"/><path d="M14 9h1v1"/><path d="M19 9h1v1"/><path d="M19 4v5h-5"/><path d="M14 14h5v5"/></svg>
                        </div>
                      );
                    } else {
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/></svg>
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      
      {/* Question and Answer Display */}
      {currentIndex !== null && materials[currentIndex] && (
        <div className="border-t pt-4 pb-4">
          <QuestionAnswerDisplay 
            imageFileName={materials[currentIndex].path.split('/').pop() || ''}
            unitNumber={unitNumber}
            bookId={bookId}
          />
        </div>
      )}
      
      {/* Teacher Resources Section */}
      <div className="max-w-full w-full mx-auto px-4 pb-12">
        <TeacherResources 
          bookId={bookId || ''} 
          unitId={unitNumber?.toString() || ''}
          isEditMode={isEditMode}
        />
      </div>
      
      {/* Slide Removal Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Slide</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this slide from the unit? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4 border rounded-md bg-gray-50">
            {slideToRemove && (
              <img 
                src={slideToRemove.path} 
                alt="Slide to remove" 
                className="h-32 object-contain"
                onError={(e) => {
                  // Fallback for non-image files
                  e.currentTarget.style.display = 'none';
                }} 
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => slideToRemove && confirmRemoveSlide(slideToRemove.id)} disabled={isRemoving}>
              {isRemoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}