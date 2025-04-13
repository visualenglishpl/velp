import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import ContentSlide from "@/components/ContentSlide";
import ThumbnailsBar from "@/components/ThumbnailsBar";
import { Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Book, Home, Maximize2, Minimize2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Direct material type from the new S3 direct paths
type DirectMaterial = {
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

// Simple unit type for direct access
type DirectUnit = {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
};

export default function DirectContentViewer() {
  // Get the path from the URL directly - more reliable than useParams
  const [location] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  
  // Extract bookPath and unitPath from URL
  const bookPath = pathParts[0]; // e.g., "book3"
  const unitPath = pathParts[1]; // e.g., "unit12"
  
  console.log(`Direct Content Viewer: Book path=${bookPath}, Unit path=${unitPath}`);
  
  // Extract unit number for API calls
  const unitNumber = unitPath ? parseInt(unitPath.replace(/\D/g, '')) : 0;
  
  // State for carousel management
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [initialSlideSet, setInitialSlideSet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [keyboardFeedback, setKeyboardFeedback] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "keepSnaps",
    dragFree: false
  });

  // Navigate hook for routing
  const [_, navigate] = useLocation();

  // Handle a user selecting a slide from the thumbnails bar
  const onThumbnailClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Navigate to next or previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track which slides have been viewed
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      const currentSlide = emblaApi.selectedScrollSnap();
      setCurrentSlideIndex(currentSlide);
      
      // Add current slide to viewed slides
      setSlidesInView((prev) => {
        if (prev.includes(currentSlide)) return prev;
        return [...prev, currentSlide];
      });
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  
  // Handle fullscreen mode
  const contentContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentContainerRef.current) return;
    
    if (isFullscreen) {
      try {
        if (contentContainerRef.current.requestFullscreen) {
          contentContainerRef.current.requestFullscreen();
        }
      } catch (error) {
        console.error("Error attempting to enable fullscreen:", error);
      }
    } else if (document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (error) {
        console.error("Error attempting to exit fullscreen:", error);
      }
    }
  }, [isFullscreen]);

  // Use more robust custom queries with better error handling
  const { data: unitData, error: unitError, isLoading: unitLoading } = useQuery<DirectUnit>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: !!bookPath && !!unitPath,
    queryFn: async () => {
      console.log(`Fetching unit data from: /api/direct/${bookPath}/${unitPath}`);
      const res = await fetch(`/api/direct/${bookPath}/${unitPath}`);
      
      if (!res.ok) {
        console.error(`Failed to load unit: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to load unit: ${res.status}`);
      }
      
      try {
        const data = await res.json();
        console.log("Unit data received:", data);
        return data;
      } catch (err) {
        console.error("Invalid JSON in unit response:", err);
        throw new Error("Invalid response format");
      }
    }
  });

  // Query for direct materials data with improved error handling
  const { data: materialsData, error: materialsError, isLoading: materialsLoading } = useQuery<DirectMaterial[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: !!bookPath && !!unitPath,
    queryFn: async () => {
      console.log(`Fetching materials from: /api/direct/${bookPath}/${unitPath}/materials`);
      const res = await fetch(`/api/direct/${bookPath}/${unitPath}/materials`);
      
      if (!res.ok) {
        console.error(`Failed to load materials: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to load materials: ${res.status}`);
      }
      
      try {
        const data = await res.json();
        console.log(`Materials received: ${data.length} items`);
        return data;
      } catch (err) {
        console.error("Invalid JSON in materials response:", err);
        throw new Error("Invalid response format");
      }
    }
  });
  
  // Effect to set the initial slide to "00 A.png" when content loads
  useEffect(() => {
    if (!materialsData || !emblaApi || initialSlideSet) return;
    
    // First filter out PDFs
    const filteredMaterials = materialsData.filter(material => {
      const isPDF = 
        material.contentType === "PDF" || 
        material.content.toLowerCase().endsWith('.pdf');
      
      if (isPDF) {
        console.log(`Filtering out PDF: ${material.content}`);
      }
      
      return !isPDF;
    });
    
    if (filteredMaterials.length === 0) return;
    
    // Look for the exact "00 A.png" file first
    let startingIndex = filteredMaterials.findIndex(
      material => material.content === "00 A.png"
    );
    
    // If not found, look for any content that starts with "00 A"
    if (startingIndex === -1) {
      startingIndex = filteredMaterials.findIndex(
        material => material.content.startsWith("00 A")
      );
    }
    
    // If we found a matching slide, scroll to it
    if (startingIndex !== -1) {
      console.log(`Found starting slide (00 A.png) at index ${startingIndex}`);
      emblaApi.scrollTo(startingIndex);
      setCurrentSlideIndex(startingIndex);
      // Add to viewed slides
      setSlidesInView(prev => [...prev, startingIndex]);
      setInitialSlideSet(true);
    }
  }, [materialsData, emblaApi, initialSlideSet]);

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
  if (unitError || materialsError || !unitData || !materialsData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Content Not Available</h1>
        <p className="mb-4">We couldn't load the content for this unit. This could be because:</p>
        <ul className="list-disc text-left mb-6">
          <li className="ml-8 mb-2">The path is incorrect</li>
          <li className="ml-8 mb-2">You don't have access to this content</li>
          <li className="ml-8 mb-2">There was a connection issue</li>
        </ul>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    );
  }

  // If no materials are found
  if (!materialsData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-6">There is no content available for {unitData.title}.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    );
  }

  // Filter out PDFs from materials and prepare for rendering
  const filteredMaterials = materialsData.filter(material => {
    // Filter out PDF files
    const isPDF = 
      material.contentType === "PDF" || 
      material.content.toLowerCase().endsWith('.pdf');
    
    return !isPDF;
  });
  
  // Format for ContentSlide component
  const materials = filteredMaterials.map((material: DirectMaterial) => ({
    ...material,
    // For ContentSlide component compatibility
    unitId: 0, // Not needed for direct access
  }));
  
  // No duplicated declaration needed here
  
  // Add keyboard navigation - added after materials is defined
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let feedbackText = null;
      
      switch (event.key) {
        case "ArrowLeft":
          scrollPrev();
          feedbackText = "Previous slide";
          break;
        case "ArrowRight":
          scrollNext();
          feedbackText = "Next slide";
          break;
        case "Home":
          if (emblaApi) emblaApi.scrollTo(0);
          feedbackText = "First slide";
          break;
        case "End":
          if (emblaApi && materials?.length) emblaApi.scrollTo(materials.length - 1);
          feedbackText = "Last slide";
          break;
        case "f":
        case "F":
          // Toggle fullscreen mode
          setIsFullscreen(!isFullscreen);
          feedbackText = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
          break;
        default:
          break;
      }
      
      // Show keyboard feedback if available
      if (feedbackText) {
        setKeyboardFeedback(feedbackText);
        
        // Hide feedback after a delay
        setTimeout(() => {
          setKeyboardFeedback(null);
        }, 1500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, scrollNext, scrollPrev, isFullscreen, materials?.length]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" ref={contentContainerRef}>
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold uppercase">
              Book {bookPath ? bookPath.replace(/[^\d]/g, '') : ''}
            </h1>
            <h2 className="text-lg text-gray-600 uppercase">
              Unit {unitPath ? unitPath.replace(/[^\d]/g, '') : ''} {unitData?.title ? `- ${unitData.title}` : ''}
            </h2>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-1">
              <div className="text-sm text-gray-500 flex items-center">
                <span>Slide {currentSlideIndex + 1} of {materials.length}</span>
                <span className="mx-2">•</span>
                <span className="text-green-600">{slidesInView.length} viewed</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2 w-full md:w-80">
              <Progress 
                value={(slidesInView.length / (materials?.length || 1)) * 100} 
                className="h-2"
                aria-label="Progress through unit"
              />
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <div>
                      <Info className="h-4 w-4" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2 max-w-xs">
                    <p className="font-medium">Keyboard shortcuts:</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <span>← / →</span>
                      <span>Previous / Next</span>
                      <span>Home / End</span>
                      <span>First / Last slide</span>
                      <span>F</span>
                      <span>Toggle fullscreen</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button onClick={() => navigate("/admin/books")} variant="outline" size="sm">
              <Book className="mr-2 h-4 w-4" />
              Books List
            </Button>
            <Button onClick={() => navigate("/")} variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pb-12 pt-4">
        {/* Carousel wrapper */}
        <div className={`relative bg-white shadow rounded-lg overflow-hidden mb-8 transition-all duration-300
          ${isFullscreen ? 'fixed inset-0 z-50 bg-black h-screen max-h-screen m-0 flex items-center justify-center rounded-none' : ''}`}>
          {/* Sliding progress indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentSlideIndex + 1) / materials.length) * 100}%` 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                mass: 0.5
              }}
            />
          </div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {materials.map((material, index) => (
                <motion.div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentSlideIndex ? 1 : 0.4,
                    scale: index === currentSlideIndex ? 1 : 0.98,
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.3 }
                  }}
                >
                  <ContentSlide 
                    material={material}
                    isActive={index === currentSlideIndex}
                    bookId={bookPath || ""}
                    unitNumber={unitNumber} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4">
            <Button 
              onClick={scrollPrev} 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-md"
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4">
            <Button 
              onClick={scrollNext} 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-md"
              disabled={currentSlideIndex === materials.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Current slide indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md text-sm">
            {currentSlideIndex + 1} / {materials.length}
          </div>
          
          {/* Keyboard feedback indicator */}
          {keyboardFeedback && (
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm
                       flex items-center gap-2 z-50"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {keyboardFeedback === "Previous slide" && <ChevronLeft className="h-5 w-5" />}
              {keyboardFeedback === "Next slide" && <ChevronRight className="h-5 w-5" />}
              {keyboardFeedback === "First slide" && <ChevronLeft className="h-5 w-5 mr-0.5" />}
              {keyboardFeedback === "Last slide" && <ChevronRight className="h-5 w-5 mr-0.5" />}
              {keyboardFeedback.includes("fullscreen") && (
                isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />
              )}
              <span className="font-medium">{keyboardFeedback}</span>
            </motion.div>
          )}
        </div>

        {/* Thumbnails bar */}
        <div className="bg-white shadow rounded-lg p-4">
          <ThumbnailsBar
            materials={materials}
            currentIndex={currentSlideIndex}
            onSelectSlide={onThumbnailClick}
            viewedSlides={slidesInView}
          />
        </div>
        
        {/* Keyboard shortcuts info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Use keyboard arrow keys ← → to navigate between slides</p>
        </div>
      </main>
    </div>
  );
}