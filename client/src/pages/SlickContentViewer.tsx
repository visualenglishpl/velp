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
import QuestionAnswerDisplay from '@/components/QuestionAnswerDisplay';
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
        <img 
          src={material.path} 
          alt={`Thumbnail ${index + 1}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
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
              onClick={() => navigate(`/book${bookId}`)}
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
    <div ref={containerRef} className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'min-h-[80vh] mt-2'}`}>
      {/* Header / Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/book${bookId}`)}
          >
            <Book className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Units</span>
          </Button>
          
          <h1 className="text-lg font-semibold text-blue-700">
            {unitData ? unitData.title : `${bookPath}/${unitPath}`}
          </h1>
        </div>
        
        {/* Admin controls */}
        {user && user.username === 'admin' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveOrder}
              disabled={isSaving}
              className="bg-blue-50 hover:bg-blue-100"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Order
            </Button>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {/* Fullscreen toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="aspect-square p-2"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          
          {/* Slide counter */}
          <div className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
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
              
              return (
                <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                  {/* Question-Answer section above image */}
                  <QuestionAnswerDisplay material={material} />
                  
                  {/* Main image */}
                  <div className={`w-full flex justify-center items-center ${shouldBlur ? 'filter blur-md' : ''}`}>
                    <img 
                      src={material.path}
                      alt={`Learning material slide ${index + 1}`}
                      className="h-auto max-h-[calc(55vh-100px)] w-auto max-w-full object-contain"
                      loading={index === currentIndex || index === currentIndex + 1 || index === currentIndex - 1 ? "eager" : "lazy"}
                    />
                  </div>
                  
                  {/* Premium content overlay */}
                  {shouldBlur && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                        <h3 className="text-lg font-semibold text-blue-700">Premium Content</h3>
                        <p className="mb-4 text-sm text-gray-700">Sign in to access all slides in this unit.</p>
                        <Button onClick={() => navigate('/auth')}>Sign In</Button>
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
            className="h-8 w-8 rounded-full bg-white/80 shadow-md hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextSlide}
            disabled={currentIndex === materials.length - 1}
            className="h-8 w-8 rounded-full bg-white/80 shadow-md hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
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
                  <img 
                    src={materials.find(m => `thumbnail-${m.id}` === activeId)?.path} 
                    alt="Dragging thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}