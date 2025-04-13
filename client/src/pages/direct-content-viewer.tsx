import { useEffect, useState, useCallback, useRef, useMemo } from "react";
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
  
  // Effect to set the initial slide to prioritize "00 E.png" or other "00 X.png" files when content loads
  useEffect(() => {
    if (!materialsData || !emblaApi || initialSlideSet) return;
    
    // First filter out PDFs and SWF files
    const filteredMaterials = materialsData.filter(material => {
      const isPDF = 
        material.contentType === "PDF" || 
        material.content.toLowerCase().endsWith('.pdf');
      
      const isSWF = 
        material.contentType === "SWF" || 
        material.content.toLowerCase().endsWith('.swf');
      
      if (isPDF) {
        console.log(`Filtering out PDF: ${material.content}`);
      }
      
      if (isSWF) {
        console.log(`Filtering out SWF: ${material.content}`);
      }
      
      return !isPDF && !isSWF;
    });
    
    if (filteredMaterials.length === 0) return;
    
    // Define priority order for starting slides
    const priorityPrefixes = [
      "00 E", // User specified to start with 00 E first
      "00 C", 
      "00 A",
      "00 B", 
      "00 D"
    ];
    
    // Try each priority prefix in order
    let startingIndex = -1;
    
    for (const prefix of priorityPrefixes) {
      // Try exact filename match first
      const exactMatch = filteredMaterials.findIndex(
        material => material.content === `${prefix}.png`
      );
      
      if (exactMatch !== -1) {
        startingIndex = exactMatch;
        console.log(`Found starting slide with exact match: ${prefix}.png`);
        break;
      }
      
      // If no exact match, try prefix match
      const prefixMatch = filteredMaterials.findIndex(
        material => material.content.startsWith(prefix)
      );
      
      if (prefixMatch !== -1) {
        startingIndex = prefixMatch;
        console.log(`Found starting slide with prefix: ${prefix}`);
        break;
      }
    }
    
    // If no priority files were found, try any files that start with "00"
    if (startingIndex === -1) {
      startingIndex = filteredMaterials.findIndex(
        material => material.content.startsWith("00")
      );
      
      if (startingIndex !== -1) {
        console.log(`Found starting slide with generic "00" prefix at index ${startingIndex}`);
      }
    }
    
    // If we found a matching slide, scroll to it
    if (startingIndex !== -1) {
      console.log(`Starting with slide at index ${startingIndex}: ${filteredMaterials[startingIndex].content}`);
      emblaApi.scrollTo(startingIndex);
      setCurrentSlideIndex(startingIndex);
      // Add to viewed slides
      setSlidesInView(prev => [...prev, startingIndex]);
      setInitialSlideSet(true);
    }
  }, [materialsData, emblaApi, initialSlideSet]);

  // Analyze materials to generate unit description
  const generateUnitDescription = (materials: DirectMaterial[]): string => {
    if (!materials || materials.length === 0) return "No content available";
    
    // Count different content types
    const contentTypes = new Map<string, number>();
    const topics = new Set<string>();
    
    // Pattern for extracting subject topics from filenames
    const subjectPatterns = [
      { pattern: /subject\s+(\w+)/i, group: 1 },
      { pattern: /(\w+)\s+lessons/i, group: 1 },
      { pattern: /school\s+(\w+)/i, group: 1 },
      { pattern: /(\w+)\s+school/i, group: 1 },
      { pattern: /(\w+)\s+class/i, group: 1 },
      { pattern: /(\w+)\s+film/i, group: 1 },
      { pattern: /(\w+)\s+movie/i, group: 1 },
      { pattern: /genre\s+(\w+)/i, group: 1 },
      { pattern: /(\w+)\s+genre/i, group: 1 },
    ];
    
    // Extract topics and content types
    materials.forEach(material => {
      // Count content types
      const contentType = material.contentType.toLowerCase();
      contentTypes.set(contentType, (contentTypes.get(contentType) || 0) + 1);
      
      // Try to extract topics
      const content = material.content.toLowerCase();
      
      // Check for specific topics in the filename
      subjectPatterns.forEach(({ pattern, group }) => {
        const match = content.match(pattern);
        if (match && match[group]) {
          topics.add(match[group].charAt(0).toUpperCase() + match[group].slice(1));
        }
      });
      
      // Check for common educational topics
      if (content.includes('english')) topics.add('English');
      if (content.includes('math')) topics.add('Mathematics');
      if (content.includes('history')) topics.add('History');
      if (content.includes('science')) topics.add('Science');
      if (content.includes('chemistry')) topics.add('Chemistry');
      if (content.includes('biology')) topics.add('Biology');
      if (content.includes('art')) topics.add('Art');
      if (content.includes('school')) topics.add('School Life');
      if (content.includes('classroom')) topics.add('Classroom');
      if (content.includes('teacher')) topics.add('Teachers');
      if (content.includes('playground')) topics.add('Playground');
      if (content.includes('film') || content.includes('movie')) topics.add('Films');
      if (content.includes('crime')) topics.add('Crime');
      if (content.includes('holiday') || content.includes('vacation')) topics.add('Holidays');
      if (content.includes('genre')) topics.add('Film Genres');
    });
    
    // Generate description
    const topicsArray = Array.from(topics).slice(0, 5);
    const imagesCount = contentTypes.get('image') || 0;
    const videosCount = contentTypes.get('video') || 0;
    const totalContent = materials.length;
    
    // Book-specific descriptions
    if (bookPath === "book0a") {
      return `Early Learning Unit: Peek-a-boo activities and early childhood language introduction with ${imagesCount} visuals and ${videosCount} videos.`;
    }
    
    if (bookPath === "book3" && unitNumber === 2) {
      return `Time & Clock Unit: Learn to tell time, clock-related vocabulary and expressions with ${totalContent} educational materials.`;
    }
    
    if (bookPath === "book5") {
      return `School Life Unit: Explore ${topicsArray.join(', ')} with ${imagesCount} images and ${videosCount} interactive videos.`;
    }
    
    if (bookPath === "book7" && topics.has('Films')) {
      return `Film & Entertainment Unit: Discover film genres, movie vocabulary, and media topics through ${totalContent} engaging materials.`;
    }
    
    // Generic description
    if (topicsArray.length > 0) {
      return `Educational Unit: ${topicsArray.join(', ')} with ${totalContent} learning materials including ${imagesCount} visuals and ${videosCount} videos.`;
    } else {
      return `Unit ${unitNumber}: ${totalContent} educational materials with ${imagesCount} images and ${videosCount} videos.`;
    }
  };
  
  // Unit description will be created after sortedMaterials is defined

  // Add keyboard navigation effect - needs to be in a consistent location
  useEffect(() => {
    if (!emblaApi) return;
    
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
          emblaApi.scrollTo(0);
          feedbackText = "First slide";
          break;
        case "End":
          if (materialsData?.length) {
            const lastIndex = materialsData.length - 1;
            emblaApi.scrollTo(lastIndex);
            feedbackText = "Last slide";
          }
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
  }, [emblaApi, scrollNext, scrollPrev, isFullscreen, materialsData?.length]);

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

  // Filter out PDFs, SWF files, and content that doesn't make sense
  const filteredMaterials = materialsData.filter(material => {
    // Filter out PDF and SWF files
    const excludedExtensions = ['.pdf', '.swf'];
    const content = material.content.toLowerCase();
    
    // Filter out anything that doesn't make sense
    const nonsensePatterns = [
      /nit\s*\d+\_page\_\d+/i,  // Pattern for "Nit 4_Page_1" etc.
      /page\_\d+/i,             // Just "Page_1" etc.
      /^\d+$/,                  // Just numbers
      /\.swf$/i,                // SWF files
      /\.pdf$/i,                // PDF files
      /\bswf\b/i,               // Contains "swf" anywhere
      /\bpdf\b/i                // Contains "pdf" anywhere
    ];
    
    const shouldExclude = 
      material.contentType === "PDF" || 
      material.contentType === "SWF" || 
      excludedExtensions.some(ext => content.endsWith(ext)) ||
      nonsensePatterns.some(pattern => pattern.test(material.content));
    
    // Double check file extensions from the content field
    if (content.toLowerCase().endsWith('.pdf') || content.toLowerCase().endsWith('.swf')) {
      console.log(`Filtering out file with extension: ${material.content}`);
      return false;
    }
    
    return !shouldExclude;
  });
  
  // Sort to ensure 00 A.png, 00 B.png, etc. files come first
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    const aContent = a.content.toLowerCase();
    const bContent = b.content.toLowerCase();
    
    // Check if content starts with "00"
    const aStarts00 = aContent.startsWith("00");
    const bStarts00 = bContent.startsWith("00");
    
    // If both start with 00 or both don't start with 00, sort alphabetically
    if (aStarts00 === bStarts00) {
      return aContent.localeCompare(bContent);
    }
    
    // If only one starts with 00, prioritize it
    return aStarts00 ? -1 : 1;
  });
  
  // Format for ContentSlide component
  const materials = sortedMaterials.map((material: DirectMaterial) => ({
    ...material,
    // For ContentSlide component compatibility
    unitId: 0, // Not needed for direct access
  }));
  
  // Generate unit description without using hooks
  let unitDescription = "";
  if (sortedMaterials.length > 0) {
    unitDescription = generateUnitDescription(sortedMaterials);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" ref={contentContainerRef}>
      {/* Header with navigation - hidden in fullscreen mode */}
      {!isFullscreen && (
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold uppercase">
                BOOK {bookPath ? bookPath.replace(/[^\d]/g, '') : ''}
              </h1>
              <h2 className="text-lg text-gray-600 uppercase">
                UNIT {unitPath ? unitPath.replace(/[^\d]/g, '') : ''} {unitData?.title ? `- ${unitData.title}` : ''}
              </h2>
              
              {/* Unit description */}
              {unitDescription && (
                <p className="text-sm mt-1 text-gray-700 max-w-xl">
                  {unitDescription}
                </p>
              )}
              
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
                      <p className="font-medium">Unit Information:</p>
                      <p className="text-sm">{unitDescription}</p>
                      <div className="border-t border-gray-200 mt-2 pt-2">
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
      )}

      <main className="flex-grow container mx-auto px-4 pb-6 pt-4">
        {/* Vertical layout - main content on top, thumbnails on bottom */}
        <div className="flex flex-col">
          {/* Main Carousel wrapper */}
          <div className="w-full">
            <div className={`relative bg-white shadow rounded-lg overflow-hidden transition-all duration-300
              ${isFullscreen ? 'fixed inset-0 z-50 bg-black h-screen max-h-screen m-0 flex items-center justify-center rounded-none' : 'h-[60vh]'}`}>
              
              {/* Exit fullscreen button - only visible in fullscreen mode */}
              {isFullscreen && (
                <Button 
                  onClick={() => setIsFullscreen(false)}
                  variant="outline" 
                  size="icon"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 border-0 rounded-full z-50"
                >
                  <Minimize2 className="h-4 w-4 text-white" />
                </Button>
              )}
              
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
              
              {/* Large side navigation arrows */}
              <button 
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg z-20"
                aria-label="Previous slide"
                disabled={currentSlideIndex === 0}
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              
              <button 
                onClick={scrollNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg z-20"
                aria-label="Next slide"
                disabled={currentSlideIndex === materials.length - 1}
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
              
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {materials.map((material, index) => (
                    <motion.div 
                      key={index} 
                      className="flex-[0_0_100%] min-w-0 h-full"
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
              
              {/* Enhanced Navigation Controls - Based on the user's design */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
                <Button 
                  onClick={() => {
                    emblaApi?.scrollTo(0);
                    setCurrentSlideIndex(0);
                  }}
                  variant="ghost"
                  className="font-medium px-4"
                  disabled={currentSlideIndex === 0}
                >
                  First
                </Button>
                
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={scrollPrev} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-8 w-8 flex items-center justify-center"
                    disabled={currentSlideIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    onClick={scrollNext} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-8 w-8 flex items-center justify-center"
                    disabled={currentSlideIndex === materials.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => {
                    emblaApi?.scrollTo(materials.length - 1);
                    setCurrentSlideIndex(materials.length - 1);
                  }}
                  variant="ghost"
                  className="font-medium px-4"
                  disabled={currentSlideIndex === materials.length - 1}
                >
                  Last
                </Button>
              </div>
              
              {/* Current slide indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-sm">
                Viewed: {currentSlideIndex + 1} of {materials.length} slides
                <div className="text-xs text-gray-600 mt-1 text-center">
                  Use keyboard arrow keys ← → to navigate between slides
                </div>
              </div>
              
              {/* Unit description in fullscreen mode */}
              {isFullscreen && unitDescription && (
                <motion.div 
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-sm max-w-xl z-30"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-800 font-medium">{unitDescription}</p>
                </motion.div>
              )}
              
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
          </div>

          {/* Thumbnails below main content - shown in both modes but styled differently */}
          <div className={`${isFullscreen ? 'mt-2 bg-gray-900/80 p-3 rounded-t-lg border-t border-gray-700 absolute bottom-0 left-0 right-0 z-10' : 'mt-4 bg-white shadow rounded-lg p-4'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Lesson Slides</h3>
              <div className={`text-sm ${isFullscreen ? 'text-gray-300' : 'text-gray-500'}`}>
                Viewed: {slidesInView.length} of {materials.length} slides
              </div>
            </div>
            <ThumbnailsBar
              materials={materials}
              currentIndex={currentSlideIndex}
              onSelectSlide={onThumbnailClick}
              viewedSlides={slidesInView}
            />
            
            {/* Keyboard shortcuts info */}
            <div className={`mt-2 text-center text-sm ${isFullscreen ? 'text-gray-300' : 'text-gray-500'}`}>
              <p>Use keyboard arrow keys ← → to navigate between slides</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}