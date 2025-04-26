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
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for slide annotations (when in edit mode)
  const [annotations, setAnnotations] = useState<Record<number, Array<{
    id: string;
    type: 'text' | 'highlight' | 'arrow';
    content?: string;
    position: { x: number; y: number };
    size?: { width: number; height: number };
    color: string;
    slideId: number;
  }>>>({});
  
  // Current annotation being created
  const [activeAnnotation, setActiveAnnotation] = useState<{
    type: 'text' | 'highlight' | 'arrow';
    position: { x: number; y: number } | null;
    content?: string;
    color: string;
  } | null>(null);
  
  // State for saving annotations
  // Note: We use the isPending from the useMutation hook instead
  
  // State for drag and drop
  const [materials, setMaterials] = useState<S3Material[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // State for slide removal
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [slideToRemove, setSlideToRemove] = useState<S3Material | null>(null);
  
  // State for image zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // State for question visibility - default to hidden per user request
  const [showQuestions, setShowQuestions] = useState(true);
  
  // Extract bookId and unitNumber from URL path
  let bookId: string | null = null;
  let unitNumber: string | null = null;
  
  // Parse from /book4/unit3 or /book0a/unit3 format (supporting alphanumeric book IDs)
  const pathRegex = /\/book([a-zA-Z0-9]+)\/unit(\d+)/;
  const pathMatch = location.match(pathRegex);
  
  if (pathMatch) {
    bookId = pathMatch[1];
    unitNumber = pathMatch[2];
    console.log(`Path match: Book ${bookId}, Unit ${unitNumber}`);
  } else {
    // Fallback to URL parameters
    const params = new URLSearchParams(window.location.search);
    bookId = params.get('bookId');
    unitNumber = params.get('unitNumber');
  }
  
  // Build paths for API requests
  const bookPath = `book${bookId}`;
  const unitPath = `unit${unitNumber}`;
  
  console.log(`SlickContentViewer: Book=${bookPath}, Unit=${unitPath}`);
  
  // Authentication
  const { user } = useAuth();
  
  // IMPORTANT: For non-authenticated users viewing public content
  if (!user) {
    console.log("Non-authenticated user accessing public content");
  }
  
  // Check if user has paid access based on authentication status
  const hasPaidAccess = Boolean(user);
  
  // Apply free content limits based on book series:
  // - For Books 0a/0b/0c: blur from 3rd image (index 2)
  // - For standard books: first 10 slides available as preview
  const freeSlideLimit = /^0[a-c]$/i.test(bookId || '') ? 2 : 10;
  
  // Fetch unit information
  const { 
    data: unitData,
    error: unitError,
    isLoading: unitLoading
  } = useQuery<UnitInfo>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Fetch materials from S3
  const {
    data: fetchedMaterials, 
    error: materialsError,
    isLoading: materialsLoading
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Fetch saved order
  const {
    data: savedOrderData,
    isLoading: isSavedOrderLoading
  } = useQuery<{ success: boolean, hasCustomOrder: boolean, order: number[] }>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/savedOrder`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Get toast for notifications
  const { toast } = useToast();
  
  // Save order mutation
  const { mutate: saveOrder, isPending: isSaving } = useMutation({
    mutationFn: async (materialsToSave: S3Material[]) => {
      return await apiRequest("POST", `/api/direct/${bookPath}/${unitPath}/saveOrder`, {
        materials: materialsToSave
      });
    },
    onSuccess: () => {
      toast({
        title: "Order saved",
        description: "The slide order has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/savedOrder`] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving order",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Remove slide mutation
  const { mutate: removeSlide, isPending: isRemoving } = useMutation({
    mutationFn: async (slideId: number) => {
      return await apiRequest("POST", `/api/direct/${bookPath}/${unitPath}/removeSlide`, {
        slideId
      });
    },
    onSuccess: () => {
      // Remove the slide from local state to immediately update the UI
      setMaterials(currentMaterials => currentMaterials.filter(m => m.id !== slideToRemove?.id));
      
      toast({
        title: "Slide removed",
        description: "The slide has been removed from this unit.",
      });
      
      // Invalidate both the materials and savedOrder queries
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`] });
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/savedOrder`] });
      
      // Reset states
      setShowRemoveDialog(false);
      setSlideToRemove(null);
      
      // If the current slide is the one being removed, go to slide 0
      if (currentIndex && slideToRemove && materials[currentIndex]?.id === slideToRemove.id) {
        goToSlide(0);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error removing slide",
        description: error.message,
        variant: "destructive",
      });
      setShowRemoveDialog(false);
      setSlideToRemove(null);
    }
  });
  
  // Handler for slide removal confirmation
  const confirmRemoveSlide = () => {
    if (slideToRemove) {
      removeSlide(slideToRemove.id);
    }
  };
  
  // Save annotations mutation
  const { mutate: saveAnnotations, isPending: isSavingAnnotations } = useMutation({
    mutationFn: async (annotationsToSave: Record<number, Array<any>>) => {
      return await apiRequest("POST", `/api/direct/${bookPath}/${unitPath}/saveAnnotations`, {
        annotations: annotationsToSave
      });
    },
    onSuccess: () => {
      toast({
        title: "Annotations saved",
        description: "Your annotations have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/annotations`] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving annotations",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Fetch saved annotations
  const { data: savedAnnotations } = useQuery<{ 
    success: boolean, 
    annotations: Record<number, Array<{
      id: string;
      type: 'text' | 'highlight' | 'arrow';
      content?: string;
      position: { x: number; y: number };
      color: string;
      slideId: number;
    }>> 
  }>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/annotations`],
    enabled: Boolean(bookPath && unitPath && isEditMode)
  });
  
  // Handle save button click
  const handleSaveOrder = () => {
    saveOrder(materials);
  };
  
  // Process materials when fetched
  useEffect(() => {
    if (!fetchedMaterials) return;
    
    // Filter out PDFs and SWFs
    const filteredMaterials = fetchedMaterials.filter(material => {
      const content = material.content.toLowerCase();
      return !(
        material.contentType === 'PDF' || 
        material.contentType === 'SWF' || 
        content.endsWith('.pdf') || 
        content.endsWith('.swf')
      );
    });
    
    // First sort materials by default order
    let sortedMaterials = [...filteredMaterials].sort((a, b) => {
      const aContent = a.content.toLowerCase();
      const bContent = b.content.toLowerCase();
      
      // Sort by numeric prefix if both have them
      const aNumMatch = aContent.match(/^(\d+)/);
      const bNumMatch = bContent.match(/^(\d+)/);
      
      if (aNumMatch && bNumMatch) {
        return parseInt(aNumMatch[1]) - parseInt(bNumMatch[1]);
      }
      
      // If only one has numeric prefix, prioritize it
      if (aNumMatch) return -1;
      if (bNumMatch) return 1;
      
      // Otherwise sort alphabetically
      return aContent.localeCompare(bContent);
    });
    
    // Apply saved order if available
    if (savedOrderData?.hasCustomOrder && savedOrderData.order) {
      // Create a map for quick lookup of materials
      const materialsMap = new Map(sortedMaterials.map(m => [m.id, m]));
      
      // Create a new array following the saved order
      const orderedMaterials: S3Material[] = [];
      
      // First add materials that exist in the saved order
      savedOrderData.order.forEach(id => {
        const material = materialsMap.get(id);
        if (material) {
          orderedMaterials.push(material);
          materialsMap.delete(id);
        }
      });
      
      // Then add any materials that weren't in the saved order
      materialsMap.forEach(material => {
        orderedMaterials.push(material);
      });
      
      sortedMaterials = orderedMaterials;
    }
    
    setMaterials(sortedMaterials);
  }, [fetchedMaterials, savedOrderData]);
  
  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      console.log(`Manually going to slide ${index}`);
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  }, []);
  
  const goToPrevSlide = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (sliderRef.current && currentIndex > 0) {
      console.log(`Going to previous slide from ${currentIndex}`);
      sliderRef.current.slickPrev();
      // Don't set index here, let the beforeChange/afterChange handlers do it
    }
  }, [currentIndex]);
  
  const goToNextSlide = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (sliderRef.current && currentIndex < materials.length - 1) {
      console.log(`Going to next slide from ${currentIndex}`);
      sliderRef.current.slickNext();
      // Don't set index here, let the beforeChange/afterChange handlers do it
    }
  }, [currentIndex, materials.length]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevSlide, goToNextSlide, isFullscreen]);
  
  // Handle fullscreen
  useEffect(() => {
    if (!containerRef.current) return;
    
    if (isFullscreen) {
      try {
        if (document.fullscreenElement !== containerRef.current) {
          containerRef.current.requestFullscreen();
        }
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    } else if (document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  }, [isFullscreen]);
  
  // Initialize with first slide
  useEffect(() => {
    if (!materials.length) return;
    
    // Try to find a "00" prefixed slide to start with
    const startIndex = materials.findIndex(
      material => material.content.startsWith('00')
    );
    
    if (startIndex !== -1) {
      goToSlide(startIndex);
    } else {
      goToSlide(0);
    }
  }, [materials, goToSlide]);
  
  // Load saved annotations
  useEffect(() => {
    if (savedAnnotations?.annotations && Object.keys(savedAnnotations.annotations).length > 0) {
      setAnnotations(savedAnnotations.annotations);
    }
  }, [savedAnnotations]);
  
  // Custom after change handler for Slick
  const handleAfterChange = (current: number) => {
    setCurrentIndex(current);
  };
  
  // Settings for react-slick
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We're using custom arrows
    swipe: true,
    adaptiveHeight: false,
    afterChange: handleAfterChange,
    lazyLoad: 'ondemand' as 'ondemand',
    beforeChange: (current: number, next: number) => {
      console.log(`Slide changing from ${current} to ${next}`);
      setCurrentIndex(next);
    }
  };
  
  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };
  
  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Find the indices
      const oldIndex = materials.findIndex(item => `thumbnail-${item.id}` === active.id);
      const newIndex = materials.findIndex(item => `thumbnail-${item.id}` === over.id);
      
      // Create a new array with the updated order
      const newMaterials = [...materials];
      const [movedItem] = newMaterials.splice(oldIndex, 1);
      newMaterials.splice(newIndex, 0, movedItem);
      
      // Update state
      setMaterials(newMaterials);
      
      // Go to the selected slide
      goToSlide(newIndex);
    }
    
    setActiveId(null);
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
      data: { index }
    });
    
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
    };
    
    const isActive = currentIndex === index;
    
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className={`group cursor-grab relative h-12 w-12 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-md border ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => goToSlide(index)}
        data-slide-index={index}
        {...attributes}
        {...listeners}
      >
        {/* Admin delete button */}
        {user && user.username === 'admin' && (
          <button
            className="absolute top-1 right-1 z-10 h-5 w-5 rounded-full bg-red-500 text-white opacity-0 hover:opacity-100 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setSlideToRemove(material);
              setShowRemoveDialog(true);
            }}
            title="Remove slide"
          >
            ×
          </button>
        )}
        
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
               material.path.toLowerCase().endsWith('.gif') ? 'GIF' :
               material.path.toLowerCase().endsWith('.avif') ? 'AVIF' : 'IMG'}
            </div>
          </>
        ) : material.contentType === 'VIDEO' || material.path.endsWith('.mp4') ? (
          <>
            <div className="relative h-full w-full bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            {/* File extension badge */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">
              MP4
            </div>
          </>
        ) : material.contentType === 'PDF' || material.path.endsWith('.pdf') ? (
          <>
            <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">
              PDF
            </div>
          </>
        ) : material.path.endsWith('.swf') ? (
          <>
            <div className="flex h-full w-full items-center justify-center bg-yellow-50 text-yellow-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">
              SWF
            </div>
          </>
        ) : (
          <>
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/></svg>
            </div>
            {/* Extract extension from path if possible */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white text-center py-[1px] truncate">
              {material.path.split('.').pop()?.toUpperCase() || 'FILE'}
            </div>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-1">
          <GripVertical className="h-3 w-3 text-gray-400 opacity-50 group-hover:opacity-100" />
        </div>
      </div>
    );
  };
  
  // Show loading while data is being fetched
  if (materialsLoading || unitLoading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-muted-foreground">Loading learning materials...</p>
        </div>
      </div>
    );
  }
  
  // Show error message if data fetch failed
  if (materialsError || unitError) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="max-w-md rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold text-red-600">Error Loading Content</h2>
          <p className="text-red-700">
            {materialsError 
              ? `Failed to load materials: ${materialsError.message}` 
              : `Failed to load unit data: ${unitError?.message}`}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Home className="h-4 w-4" /> Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // If no materials found
  if (!materials || materials.length === 0) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="max-w-md rounded-lg bg-yellow-50 p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold text-yellow-600">No Content Found</h2>
          <p className="text-yellow-700">
            There are no learning materials available for this unit yet.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/book/${bookId}/units`)}
              className="gap-2"
            >
              <Book className="h-4 w-4" /> Back to Units
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Main content viewer
  return (
    <div ref={containerRef} className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'min-h-[75vh] mt-2'}`}>
      {/* Header / Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white shadow-sm rounded-md mb-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/book/${bookId}/units`)}
            className="rounded-full bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 transition-all shadow-sm"
          >
            <Book className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Units</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-blue-700">
              {unitData ? unitData.title : `${bookPath}/${unitPath}`}
            </h1>
          </div>
        </div>
        
        {/* Admin controls */}
        {user && user.username === 'admin' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveOrder}
              disabled={isSaving}
              className="rounded-full shadow-sm bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600 transition-all"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Order
            </Button>
            
            <Button
              variant={isEditMode ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`rounded-full shadow-sm transition-all ${isEditMode 
                ? "bg-orange-100 hover:bg-orange-200 border-orange-200 text-orange-700" 
                : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"}`}
            >
              <Pencil className="mr-2 h-4 w-4" />
              {isEditMode ? "Exit Edit Mode" : "Edit Slides"}
            </Button>
            
            {isEditMode && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => saveAnnotations(annotations)}
                  disabled={isSavingAnnotations}
                  className="rounded-full shadow-sm bg-green-50 hover:bg-green-100 border-green-200 text-green-600 transition-all"
                >
                  {isSavingAnnotations ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Annotations
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (materials[currentIndex]) {
                      setSlideToRemove(materials[currentIndex]);
                      setShowRemoveDialog(true);
                    }
                  }}
                  disabled={isRemoving}
                  className="rounded-full shadow-sm bg-red-50 hover:bg-red-100 border-red-200 text-red-600 transition-all"
                >
                  {isRemoving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete Slide
                </Button>
              </>
            )}
            
            {isEditMode && (
              <div className="flex items-center gap-1 border rounded-full p-1 bg-white shadow-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                  onClick={() => setActiveAnnotation({
                    type: 'text',
                    position: null,
                    content: 'New text',
                    color: '#000000'
                  })}
                  title="Add Text"
                >
                  <Type className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                  onClick={() => setActiveAnnotation({
                    type: 'highlight',
                    position: null,
                    color: '#ffff00'
                  })}
                  title="Add Highlight"
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                  onClick={() => setActiveAnnotation({
                    type: 'arrow',
                    position: null,
                    color: '#ff0000'
                  })}
                  title="Add Arrow"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <div className="h-5 border-l mx-1"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                  onClick={() => {
                    // Clear all annotations for current slide
                    const newAnnotations = { ...annotations };
                    const currentMaterialId = materials[currentIndex]?.id;
                    if (currentMaterialId) {
                      newAnnotations[currentMaterialId] = [];
                      setAnnotations(newAnnotations);
                    }
                  }}
                  title="Clear Annotations"
                >
                  <Eraser className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {/* Question visibility toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQuestions(!showQuestions)}
            className={`rounded-full w-8 h-8 p-0 ${showQuestions ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-500'} shadow-sm transition-all`}
            title={showQuestions ? "Hide questions" : "Show questions"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d={showQuestions 
                  ? "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                  : "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"}
              />
            </svg>
          </Button>

          {/* Answers are always available but need to be clicked to reveal */}

          {/* Fullscreen toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="rounded-full w-8 h-8 p-0 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 shadow-sm transition-all"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
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
                <div key={index} className="outline-none h-[50vh] w-full grid grid-rows-[auto_1fr_auto] relative px-3">
                  {/* Top section with question-answer */}
                  <div className="w-full mb-4">
                    <QuestionAnswerDisplay 
                      material={material} 
                      isEditMode={isEditMode} 
                      showQuestions={showQuestions}
                      bookId={bookPath || undefined}
                      unitId={unitPath || undefined}
                      hasPaidAccess={hasPaidAccess}
                      index={index}
                      freeSlideLimit={freeSlideLimit}
                    />
                  </div>
                  
                  {/* Middle section with centered image - symmetrical layout */}
                  <div className="flex items-center justify-center h-full">
                    <div 
                      className={`w-full h-full flex justify-center items-center ${shouldBlur ? 'filter blur-md' : ''} relative`}
                      onClick={(e) => {
                      // Only handle clicks in edit mode and when user is admin
                      if (isEditMode && user && user.username === 'admin' && activeAnnotation && index === currentIndex) {
                        // Get click position relative to the container
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        // Create a new annotation
                        const newAnnotation = {
                          id: `annotation-${Date.now()}`,
                          type: activeAnnotation.type,
                          content: activeAnnotation.content,
                          position: { x, y },
                          color: activeAnnotation.color,
                          slideId: material.id
                        };
                        
                        // Add the annotation to the current slide's annotations
                        const updatedAnnotations = { ...annotations };
                        if (!updatedAnnotations[material.id]) {
                          updatedAnnotations[material.id] = [];
                        }
                        updatedAnnotations[material.id].push(newAnnotation);
                        setAnnotations(updatedAnnotations);
                        
                        // Reset active annotation if it's not text (to allow multiple annotations)
                        if (activeAnnotation.type !== 'text') {
                          setActiveAnnotation(null);
                        }
                      }
                    }}
                  >
                    {material.contentType === 'VIDEO' || material.path.endsWith('.mp4') ? (
                      <div className="relative h-full flex items-center justify-center">
                        <video 
                          src={material.path}
                          controls
                          className={`h-auto w-auto max-w-full mx-auto object-contain ${isEditMode ? 'cursor-crosshair' : ''} 
                            ${!hasPaidAccess ? 'blur-lg brightness-75' : ''}
                          `}
                          style={{ maxHeight: '100%' }}
                          onError={(e) => {
                            console.error(`Error loading video at ${material.path}`, e);
                          }}
                          autoPlay={index === currentIndex}
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Premium content overlay for videos - show for ALL videos when not logged in */}
                        {!hasPaidAccess && (
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
                    ) : material.contentType === 'IMAGE' || material.path.endsWith('.jpg') || material.path.endsWith('.png') || material.path.endsWith('.gif') || material.path.endsWith('.avif') ? (
                      <div className="relative h-full flex items-center justify-center">
                        <div 
                          className={`relative ${isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'}`} 
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            overflowX: isZoomed ? 'auto' : 'hidden',
                            overflowY: isZoomed ? 'auto' : 'hidden',
                          }}
                          onClick={() => {
                            if (!isEditMode) {
                              setIsZoomed(!isZoomed);
                              setZoomLevel(isZoomed ? 1 : 2);
                            }
                          }}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img 
                              src={material.path}
                              alt={`Learning material slide ${index + 1}`}
                              className={`h-auto w-auto max-w-full object-contain mx-auto ${isEditMode ? 'cursor-crosshair' : ''} transition-transform duration-200 
                                ${!hasPaidAccess && index >= freeSlideLimit ? 'blur-lg brightness-75' : ''}
                              `}
                              style={{ 
                                maxHeight: isZoomed ? 'none' : '100%',
                                transform: `scale(${isZoomed ? zoomLevel : 1})`,
                                transformOrigin: 'center center'
                              }}
                              loading={index === currentIndex || index === currentIndex + 1 || index === currentIndex - 1 ? "eager" : "lazy"}
                              onError={(e) => {
                                console.error(`Error loading image at ${material.path}`, e);
                                // Set a fallback or placeholder
                                e.currentTarget.src = `/placeholder.png`;
                                e.currentTarget.classList.add('error-image');
                              }}
                            />
                            
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
                        
                        {/* Render annotations for this slide */}
                        {isEditMode && index === currentIndex && annotations[material.id]?.map((annotation, i) => (
                          <div 
                            key={annotation.id}
                            className="absolute pointer-events-auto"
                            style={{ 
                              left: `${annotation.position.x}px`, 
                              top: `${annotation.position.y}px`,
                              zIndex: 50 + i
                            }}
                          >
                            {annotation.type === 'text' && (
                              <div 
                                className="min-w-[100px] min-h-[24px] px-2 py-1 text-sm rounded shadow-sm"
                                style={{ backgroundColor: annotation.color === '#000000' ? 'white' : annotation.color, borderColor: annotation.color }}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => {
                                  // Update text content when edited
                                  const updatedAnnotations = { ...annotations };
                                  const annotationIndex = updatedAnnotations[material.id].findIndex(a => a.id === annotation.id);
                                  if (annotationIndex !== -1) {
                                    updatedAnnotations[material.id][annotationIndex].content = e.currentTarget.textContent || '';
                                    setAnnotations(updatedAnnotations);
                                  }
                                }}
                              >
                                {annotation.content}
                              </div>
                            )}
                            
                            {annotation.type === 'highlight' && (
                              <div 
                                className="w-16 h-16 rounded opacity-50 border-2 resize cursor-move"
                                style={{ 
                                  backgroundColor: annotation.color,
                                  borderColor: annotation.color === '#ffff00' ? '#ffcc00' : annotation.color
                                }}
                              />
                            )}
                            
                            {annotation.type === 'arrow' && (
                              <div className="relative h-12 w-12">
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    transform: 'rotate(45deg)',
                                    borderLeft: `2px solid ${annotation.color}`,
                                    borderBottom: `2px solid ${annotation.color}`
                                  }}
                                />
                                <div
                                  className="absolute right-0 top-0 h-3 w-3"
                                  style={{
                                    borderRight: `2px solid ${annotation.color}`,
                                    borderTop: `2px solid ${annotation.color}`,
                                    transform: 'rotate(45deg) translate(70%, -70%)'
                                  }}
                                />
                              </div>
                            )}
                            
                            {isEditMode && (
                              <button
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Remove this annotation
                                  const updatedAnnotations = { ...annotations };
                                  updatedAnnotations[material.id] = updatedAnnotations[material.id].filter(a => a.id !== annotation.id);
                                  setAnnotations(updatedAnnotations);
                                }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
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
                  </div>
                  </div>
                  
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
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
      
      {/* Teacher Resources Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <TeacherResources 
          bookId={bookId || undefined} 
          unitId={unitNumber || undefined}
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
            <Button variant="destructive" onClick={confirmRemoveSlide} disabled={isRemoving}>
              {isRemoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}