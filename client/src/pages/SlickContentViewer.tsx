import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2, GripVertical, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  
  // State for drag and drop
  const [materials, setMaterials] = useState<S3Material[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // Extract bookId and unitNumber from URL path
  let bookId: string | null = null;
  let unitNumber: string | null = null;
  
  // Parse from /book4/unit3 format
  const pathRegex = /\/book(\d+)\/unit(\d+)/;
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
  const hasPaidAccess = Boolean(user);
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
  
  // Find the active item for drag overlay
  const activeItem = activeId 
    ? materials.find(item => `thumbnail-${item.id}` === activeId) 
    : null;
  
  // Sortable thumbnail component
  const SortableThumbnail = ({ material, index }: { material: S3Material, index: number }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: `thumbnail-${material.id}`,
    });
    
    const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
    
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
      zIndex: isDragging ? 50 : 0,
      opacity: isDragging ? 0.5 : 1,
      position: isDragging ? 'relative' : 'static' as any,
    };
    
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className={`
          cursor-grab border-2 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md
          transition-all duration-200 hover:scale-105 transform
          ${index === currentIndex 
            ? 'border-blue-500 ring-1 ring-blue-300 scale-105 shadow-md' 
            : 'border-gray-200 opacity-80 hover:opacity-100'
          }
          ${isDragging ? 'shadow-xl scale-105' : ''}
        `}
        onClick={() => goToSlide(index)}
        {...attributes}
        {...listeners}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={imagePath}
              alt={material.title || `Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center">
            <div className="bg-black/60 text-white text-[10px] text-center py-0.5 px-1 w-full flex justify-between items-center">
              <span>{index + 1}</span>
              <GripVertical className="h-2 w-2 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Loading state
  if (unitLoading || materialsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p>Loading content from {bookPath}/{unitPath}...</p>
      </div>
    );
  }
  
  // Error state
  if (unitError || materialsError || !unitData || !fetchedMaterials) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Content</h1>
        <p className="mb-4">There was a problem loading this content.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/books')}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!materials.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-4">This unit doesn't have any content yet.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/books')}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{unitData.title}</h1>
          <p className="text-sm text-blue-600 font-medium">
            <span className="font-semibold">Book {bookId}</span> • Unit {unitNumber}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSaveOrder}
              disabled={isSaving}
              className="border-green-200 hover:bg-green-50 transition-colors"
            >
              <Save size={16} className={isSaving ? 'animate-spin' : ''} />
              <span className="ml-1 hidden sm:inline">
                {isSaving ? 'Saving...' : 'Save Order'}
              </span>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="border-blue-200 hover:bg-blue-50 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="ml-1 hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/books')}
            className="border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <Book size={16} />
            <span className="ml-1 hidden sm:inline">Back to Books</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area with Slick Slider */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Image slider */}
        <div className="w-full max-w-5xl mx-auto flex-1 relative flex flex-col items-center justify-center">
          <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
            {materials.map((material, index) => {
              const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
              const isPremiumContent = index >= freeSlideLimit && !hasPaidAccess;
              
              return (
                <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                  {/* Question-Answer section above image */}
                  {material.title && (
                    <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
                      <div className="flex flex-col gap-0.5">
                        {/* Handle extracted question format with arrow → */}
                        {material.title.includes('→') ? (
                          <>
                            <div className="flex gap-2">
                              <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                              <span className="text-gray-800 text-base">{material.title.split('→')[0].trim()}</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                              <span className="font-medium text-indigo-900 text-base">{material.title.split('→')[1].trim()}</span>
                            </div>
                          </>
                        ) : 
                        /* Handle country title format */
                        material.title.match(/^[A-Z\s]+\s\(Files/) ? (
                          <div className="flex items-center justify-center mb-1">
                            <h3 className="text-lg font-bold text-blue-800 bg-white py-2 px-4 rounded-full shadow-sm border border-blue-200">
                              {material.title.split('(')[0].trim()}
                            </h3>
                          </div>
                        ) :
                        /* Handle normal question format with question mark */
                        material.title.includes('?') ? (
                          <>
                            <div className="flex gap-2">
                              <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                              <span className="text-gray-800 text-base">{material.title.split('?')[0].trim()}?</span>
                            </div>
                            {material.description && (
                              <div className="flex gap-2 mt-2">
                                <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                <span className="font-medium text-indigo-900 text-base">{material.description}</span>
                              </div>
                            )}
                          </>
                        ) : 
                        /* Replace filename with actual content for country learning materials */
                        material.content.match(/\d+\s+[A-Z]\s+/) ? (
                          <>
                            {/* Extract content info from filename to decide which Q&A to show */}
                            {material.content.toLowerCase().includes('poland') || 
                             material.content.toLowerCase().includes('01 r ') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    POLAND
                                  </h3>
                                </div>
                                {(material.content.toLowerCase().includes('01 r a') || 
                                  (material.content.toLowerCase().includes('what country is this') && 
                                   material.content.toLowerCase().includes('poland'))) && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Poland.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('01 r b') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is this flag from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from Poland.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('01 r c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What colors are the Polish flag?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">They are red and white.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('01 r a') && 
                                 !material.content.toLowerCase().includes('01 r b') && 
                                 !material.content.toLowerCase().includes('01 r c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Poland.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : material.content.toLowerCase().includes('uk') || material.content.toLowerCase().includes('britain') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    BRITAIN / UK
                                  </h3>
                                </div>
                                {material.content.toLowerCase().includes('02 n a') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Which countries are in Britain?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">They are England, Scotland, and Wales.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('02 n c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is this flag from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from Britain.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('02 n d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What nationality is he?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">He is British.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('02 n a') && 
                                 !material.content.toLowerCase().includes('02 n c') && 
                                 !material.content.toLowerCase().includes('02 n d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Which countries are in Britain?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">They are England, Scotland, and Wales.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : material.content.toLowerCase().includes('ireland') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    NORTHERN IRELAND
                                  </h3>
                                </div>
                                {material.content.toLowerCase().includes('03 g a') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Which country is colored pink?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Northern Ireland.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('03 g c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What is the capital of Northern Ireland?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Belfast.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('03 g d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What nationality is he?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">He is Northern Irish.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('03 g a') && 
                                 !material.content.toLowerCase().includes('03 g c') && 
                                 !material.content.toLowerCase().includes('03 g d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What is the capital of Northern Ireland?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Belfast.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : material.content.toLowerCase().includes('scotland') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    SCOTLAND
                                  </h3>
                                </div>
                                {material.content.toLowerCase().includes('04 l a') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Scotland.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('04 l b') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is this flag from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from Scotland.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('04 l c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What is Scotland's capital?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Edinburgh.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('04 l d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What nationality is he?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">He is Scottish.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('04 l i') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is the Loch Ness Monster from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from Scotland.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('04 l a') && 
                                 !material.content.toLowerCase().includes('04 l b') && 
                                 !material.content.toLowerCase().includes('04 l c') && 
                                 !material.content.toLowerCase().includes('04 l d') && 
                                 !material.content.toLowerCase().includes('04 l i') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Scotland.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : material.content.toLowerCase().includes('usa') || material.content.toLowerCase().includes('america') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    USA
                                  </h3>
                                </div>
                                {material.content.toLowerCase().includes('08 m a') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is the USA.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('08 m b') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is this flag from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from the USA.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('08 m c') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">How many stars are on the American flag?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">There are 50 stars.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('08 m e') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What nationality is he?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">He is American.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('08 m k') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What type of food is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is American food.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('08 m a') && 
                                 !material.content.toLowerCase().includes('08 m b') && 
                                 !material.content.toLowerCase().includes('08 m c') && 
                                 !material.content.toLowerCase().includes('08 m e') && 
                                 !material.content.toLowerCase().includes('08 m k') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is the USA.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : material.content.toLowerCase().includes('australia') ? (
                              <>
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    AUSTRALIA
                                  </h3>
                                </div>
                                {(material.content.toLowerCase().includes('07 l a') ||
                                  material.content.toLowerCase().includes('boomerang') ||
                                  (material.content.toLowerCase().includes('australia') && material.content.toLowerCase().includes('what country'))) && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Australia.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('07 l b') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Where is this flag from?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is from Australia.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('07 l d') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What nationality is he?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">He is Australian.</span>
                                    </div>
                                  </>
                                )}
                                {material.content.toLowerCase().includes('07 l h') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">Name three Australian animals.</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">They are kangaroos, koalas, and wombats.</span>
                                    </div>
                                  </>
                                )}
                                {!material.content.toLowerCase().includes('07 l a') && 
                                 !material.content.toLowerCase().includes('07 l b') && 
                                 !material.content.toLowerCase().includes('07 l d') && 
                                 !material.content.toLowerCase().includes('07 l h') && (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">What country is this?</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">It is Australia.</span>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              // Default questions if no specific country identified
                              <>
                                <div className="flex gap-2">
                                  <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                  <span className="text-gray-800 text-base">What country is this?</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                  <span className="font-medium text-indigo-900 text-base">Let's learn about this country.</span>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          /* Default case - but don't show "Content from..." text */
                          !material.title.startsWith('Content from') && (
                            <div className="flex gap-2">
                              <span className="font-medium text-gray-800 text-base">{material.title}</span>
                            </div>
                          )
                        )}
                        
                        {/* Show description only if not already shown as answer */}
                        {material.description && !material.title.includes('?') && !material.title.includes('→') && (
                          <div className="mt-2 text-sm text-gray-600">{material.description}</div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Premium content overlay */}
                  {isPremiumContent && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                        <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                        <p className="mb-4">This slide requires a subscription to view.</p>
                        <Button 
                          onClick={() => navigate('/checkout')}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        >
                          Get Premium Access
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Centered content container */}
                  <div className="flex items-center justify-center w-full h-full">
                    {/* Actual image */}
                    <img 
                      src={imagePath}
                      alt={material.title || `Slide ${index + 1}`}
                      className="max-h-full max-w-full object-contain mx-auto shadow-lg"
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
          
          {/* Navigation buttons */}
          <button
            onClick={() => {
              if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => {
              if (currentIndex < materials.length - 1) {
                goToSlide(currentIndex + 1);
              }
            }}
            disabled={currentIndex === materials.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Slide number indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full z-20 shadow-lg flex items-center gap-1">
            <span className="font-bold text-sm">{currentIndex + 1}</span>
            <span className="text-blue-200">/</span>
            <span className="text-sm">{materials.length}</span>
          </div>
        </div>
      </div>
      
      {/* Thumbnails navigation with drag and drop */}
      <div className="border-t p-2 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-gray-500">Navigate or drag to reorder</p>
            <p className="text-xs text-blue-500 hidden sm:block">Drag thumbnails to reorder slides</p>
          </div>
          
          <div className="overflow-x-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToHorizontalAxis]}
            >
              <SortableContext 
                items={materials.map(item => `thumbnail-${item.id}`)} 
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex space-x-2 min-w-max px-1">
                  {materials.map((material, index) => (
                    <SortableThumbnail 
                      key={`thumbnail-${material.id}`} 
                      material={material} 
                      index={index} 
                    />
                  ))}
                </div>
              </SortableContext>
              
              <DragOverlay>
                {activeItem ? (
                  <div className="h-16 w-16 rounded-md overflow-hidden shadow-2xl rotate-3 border-2 border-blue-500">
                    <img 
                      src={`/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(activeItem.content)}`}
                      alt={activeItem.title || "Dragging thumbnail"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}