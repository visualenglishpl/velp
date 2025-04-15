import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2, List, Images, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Material type from S3 direct paths
type Material = {
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

// Unit type for direct access
type Unit = {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
};

export default function SimpleContentViewer() {
  // Extract path info from URL
  const [location] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  
  // Try different path formats to extract bookId and unitNumber
  let bookPath = "";
  let unitPath = "";
  
  // Check for /book4/unit1 format
  if (location.match(/\/book[0-9a-z]+\/unit[0-9]+/)) {
    bookPath = pathParts[0];
    unitPath = pathParts[1];
  }
  // Check for /simple/book4/unit1 format (for backward compatibility)
  else if (pathParts[0] === "simple" && pathParts.length >= 3) {
    bookPath = pathParts[1];
    unitPath = pathParts[2];
  }
  
  const bookId = bookPath ? bookPath.replace(/\D/g, '') : "";
  const unitNumber = unitPath ? parseInt(unitPath.replace(/\D/g, '')) : 0;
  
  console.log(`Simple Content Viewer: Book=${bookPath}, Unit=${unitPath}, Full path=${location}`);
  
  console.log(`Content Viewer: Book=${bookPath}, Unit=${unitPath}`);
  
  // Basic state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [showThumbnails, setShowThumbnails] = useState(true);
  
  // User info and access control
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const hasPurchasedAccess = isAdmin; // Auto-grant access for admins
  const freeSlideLimit = bookPath?.startsWith('book0') ? 2 : 10;
  
  // Navigation
  const [_, navigate] = useLocation();
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "keepSnaps"
  });
  
  // Fetch unit data
  const { data: unitData, error: unitError, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Fetch materials
  const { data: materials, error: materialsError, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Filter materials - remove PDFs and SWFs
  const filteredMaterials = materials?.filter(material => {
    const content = material.content.toLowerCase();
    return !(
      material.contentType === "PDF" || 
      material.contentType === "SWF" || 
      content.endsWith('.pdf') || 
      content.endsWith('.swf')
    );
  }) || [];
  
  // Sort materials to prioritize "00" prefix files
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    const aContent = a.content.toLowerCase();
    const bContent = b.content.toLowerCase();
    
    // If both start with 00 or both don't, sort alphabetically
    const aStarts00 = aContent.startsWith("00");
    const bStarts00 = bContent.startsWith("00");
    
    if (aStarts00 === bStarts00) return aContent.localeCompare(bContent);
    return aStarts00 ? -1 : 1;
  });
  
  // Navigation functions with improved logging
  const scrollPrev = useCallback(() => {
    console.log("Scrolling to previous slide");
    if (emblaApi) {
      emblaApi.scrollPrev();
    } else {
      console.error("Carousel API not initialized");
    }
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    console.log("Scrolling to next slide");
    if (emblaApi) {
      emblaApi.scrollNext();
    } else {
      console.error("Carousel API not initialized");
    }
  }, [emblaApi]);
  
  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);
  
  // Track current slide and preload adjacent images
  useEffect(() => {
    if (!emblaApi || !sortedMaterials.length) return;
    
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentSlideIndex(index);
      
      // Add to viewed slides
      setViewedSlides(prev => {
        if (prev.includes(index)) return prev;
        return [...prev, index];
      });
      
      // Preload adjacent slides (one before and one after)
      const preloadIndices = [index - 1, index + 1].filter(
        i => i >= 0 && i < sortedMaterials.length
      );
      
      preloadIndices.forEach(i => {
        const material = sortedMaterials[i];
        if (!material) return;
        
        const directPath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
        
        if (!preloadedImages.includes(directPath)) {
          const img = new Image();
          img.src = directPath;
          img.onload = () => {
            setPreloadedImages(prev => [...prev, directPath]);
          };
        }
      });
    };
    
    emblaApi.on("select", onSelect);
    onSelect(); // Execute once on mount
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, sortedMaterials, bookPath, unitPath, preloadedImages]);
  
  // Set initial slide to one that starts with "00 E" if available
  useEffect(() => {
    if (!emblaApi || !sortedMaterials.length) return;
    
    // Look for 00 E.png first
    const priorityPrefixes = ["00 E", "00 C", "00 A", "00 B", "00 D"];
    
    for (const prefix of priorityPrefixes) {
      const index = sortedMaterials.findIndex(material => 
        material.content === `${prefix}.png` || material.content.startsWith(prefix)
      );
      
      if (index !== -1) {
        emblaApi.scrollTo(index);
        return;
      }
    }
    
    // Fall back to any file starting with "00"
    const index = sortedMaterials.findIndex(material => 
      material.content.startsWith("00")
    );
    
    if (index !== -1) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, sortedMaterials]);
  
  // Add keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft": scrollPrev(); break;
        case "ArrowRight": scrollNext(); break;
        case "Home": emblaApi.scrollTo(0); break;
        case "End": emblaApi.scrollTo(sortedMaterials.length - 1); break;
        case "f": case "F": setIsFullscreen(!isFullscreen); break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi, scrollNext, scrollPrev, sortedMaterials.length, isFullscreen]);
  
  // Handle fullscreen mode
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    if (isFullscreen) {
      try {
        containerRef.current.requestFullscreen();
      } catch (error) {
        console.error("Error entering fullscreen:", error);
      }
    } else if (document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (error) {
        console.error("Error exiting fullscreen:", error);
      }
    }
  }, [isFullscreen]);
  
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
  if (unitError || materialsError || !unitData || !materials) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Content Not Available</h1>
        <p className="mb-4">We couldn't load the content for this unit.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  // No materials state
  if (!sortedMaterials.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-6">There is no content available for {unitData.title}.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  // Calculate progress percentage
  const progressPercentage = (viewedSlides.length / sortedMaterials.length) * 100;
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{unitData.title}</h1>
          <p className="text-sm text-muted-foreground">Book {bookId} • Unit {unitNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="ml-1 hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/book${bookId}/units`)}>
            <List size={16} />
            <span className="ml-1 hidden sm:inline">Units</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/books")}>
            <Book size={16} />
            <span className="ml-1 hidden sm:inline">Books</span>
          </Button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {/* Progress bar and toggle */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground mr-4">Progress</p>
              <p className="text-sm font-medium">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground hidden sm:inline-block">Click on image to navigate</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="text-xs flex items-center"
              >
                {showThumbnails ? <EyeOff size={14} className="mr-1" /> : <Images size={14} className="mr-1" />}
                {showThumbnails ? "Hide Thumbnails" : "Show Thumbnails"}
              </Button>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {/* Main carousel */}
        <div className="relative mx-auto max-w-5xl px-4">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {sortedMaterials.map((material, index) => {
                const isPremium = index >= freeSlideLimit && !hasPurchasedAccess;
                const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
                
                return (
                  <div key={material.id} className="flex-grow-0 flex-shrink-0 w-full">
                    <div className="relative mx-auto p-4 flex items-center justify-center">
                      {/* Premium overlay */}
                      {isPremium && (
                        <div className="absolute inset-0 z-10 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center">
                          <div className="max-w-md text-center p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                            <p className="mb-4">This content is available with a subscription.</p>
                            <Button 
                              onClick={() => navigate(`/checkout/unit?bookId=${bookPath}&unitId=${unitPath}`)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                            >
                              Get Access
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Content image with click navigation */}
                      <div className="relative w-full h-full flex justify-center group">
                        {/* Left side navigation hint */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-0 group-hover:bg-opacity-10 p-3 rounded-full transition-all duration-200 z-10">
                          <ChevronLeft size={24} className="text-black opacity-0 group-hover:opacity-50" />
                        </div>
                        
                        {/* Right side navigation hint */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-0 group-hover:bg-opacity-10 p-3 rounded-full transition-all duration-200 z-10">
                          <ChevronRight size={24} className="text-black opacity-0 group-hover:opacity-50" />
                        </div>
                        
                        <img 
                          src={imagePath}
                          alt={material.title || `Slide ${index + 1}`}
                          className="max-h-[70vh] object-contain cursor-pointer"
                          onClick={(e) => {
                            // Determine which side of the image was clicked
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const width = rect.width;
                            
                            // If clicked on left side, go to previous slide; if right side, go to next slide
                            if (x < width / 2) {
                              console.log("Left side of image clicked - previous slide");
                              scrollPrev();
                            } else {
                              console.log("Right side of image clicked - next slide");
                              scrollNext();
                            }
                          }}
                        />
                      </div>
                      
                      {/* Slide number indicator */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white rounded-full px-3 py-1 text-sm">
                        {index + 1} / {sortedMaterials.length}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={scrollPrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 hover:bg-blue-50 p-3 rounded-full shadow-md border border-gray-200 hover:border-blue-300 transition-all"
                >
                  <ChevronLeft size={28} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Previous (←)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={scrollNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 hover:bg-blue-50 p-3 rounded-full shadow-md border border-gray-200 hover:border-blue-300 transition-all"
                >
                  <ChevronRight size={28} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Next (→)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Thumbnails - conditionally rendered */}
      {showThumbnails && (
        <div className="bg-gray-50 border-t p-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2">
              {sortedMaterials.map((material, index) => (
                <button
                  key={material.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded border-2 ${
                    index === currentSlideIndex 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={`/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}