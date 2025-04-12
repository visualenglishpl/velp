import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Lock, 
  FileText, 
  Download,
  Video,
  Image as ImageIcon,
  AlertCircle,
  Gamepad2
} from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

// Type definitions
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order: number;
  isLocked: boolean;
};

type Unit = {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description?: string;
};

type Book = {
  id: number;
  bookId: string;
  title: string;
};

export default function ContentViewer() {
  // Parse URL parameters
  const [location] = useLocation();
  const materialMatches = location.match(/\/units\/(\d+)\/materials\/(\d+)/);
  const unitMatches = location.match(/\/units\/(\d+)$/);
  
  // Extract unitId and materialIndex from URL
  const unitId = materialMatches 
    ? parseInt(materialMatches[1], 10) 
    : unitMatches 
      ? parseInt(unitMatches[1], 10) 
      : 0;
  
  const initialMaterialIndex = materialMatches 
    ? parseInt(materialMatches[2], 10) 
    : 0;

  // State hooks
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialMaterialIndex);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  
  // Data fetching hooks
  const { data: unit, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/units/${unitId}`],
    enabled: !!unitId,
  });

  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${unit?.bookId}`],
    enabled: !!unit?.bookId,
  });

  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });

  // Carousel hooks
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: 'keepSnaps',
  });
  
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x'
  });
  
  // Navigation logic
  const navigateToSlide = useCallback((index: number) => {
    if (materials && index >= 0 && index < materials.length) {
      setCurrentSlideIndex(index);
      
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    }
  }, [materials, emblaApi]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateToSlide(currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        navigateToSlide(currentSlideIndex + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, navigateToSlide]);
  
  // Track viewed slides
  useEffect(() => {
    if (materials && materials.length > 0) {
      const currentMaterial = materials[currentSlideIndex];
      if (currentMaterial && !viewedSlides.includes(currentMaterial.id)) {
        setViewedSlides(prev => [...prev, currentMaterial.id]);
      }
    }
  }, [currentSlideIndex, materials, viewedSlides]);
  
  // Sync carousel and state
  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;
    
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      thumbsApi.scrollTo(index);
      setCurrentSlideIndex(index);
    };
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, thumbsApi, setCurrentSlideIndex]);
  
  // Update carousel when slide index changes
  useEffect(() => {
    if (emblaApi && currentSlideIndex >= 0) {
      emblaApi.scrollTo(currentSlideIndex);
    }
  }, [currentSlideIndex, emblaApi]);
  
  // Content type icon helper
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="h-4 w-4" />;
      case 'VIDEO':
        return <Video className="h-4 w-4" />;
      case 'PDF':
        return <FileText className="h-4 w-4" />;
      case 'GAME':
        return <Gamepad2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Extract and format question from filename
  const extractQuestionFromFilename = (filename: string): string => {
    if (!filename) return "";
    
    // Remove URL encoding first
    const decodedFilename = decodeURIComponent(filename);
    
    // Handle book and unit patterns - extract just the simple description
    if (decodedFilename.includes("book") && /unit\d+/i.test(decodedFilename)) {
      // Check if it's an introduction slide (typically 00 A.png format)
      if (/00\s*A/i.test(decodedFilename)) {
        return "Unit Introduction";
      }
    }
    
    // Handle unit introduction special case
    if (decodedFilename.includes("Unit Introduction") || 
        (decodedFilename.includes("Book") && decodedFilename.includes("Unit"))) {
      return "Unit Introduction";
    }
    
    // Handle "School Vocabulary" specially for Book 5
    if (decodedFilename.includes("School Vocabulary") || 
        decodedFilename.includes("school facilities")) {
      return "School Vocabulary";
    }
    
    // Handle subject title slides (e.g., "01 P A Subject English.png")
    const subjectMatch = decodedFilename.match(/Subject\s+(.+?)\.[a-zA-Z]+$/i);
    if (subjectMatch && subjectMatch[1]) {
      const subject = subjectMatch[1].trim();
      return `Subject: ${subject}`;
    }
    
    // Handle "is X Y or Z" style questions (e.g., "is English Easy or Difficult")
    const isQuestion = decodedFilename.match(/is\s+([A-Za-z]+)\s+(.*?)\.[a-zA-Z]+$/i);
    if (isQuestion) {
      let questionText = `Is ${isQuestion[1]} ${isQuestion[2]}?`;
      return questionText;
    }
    
    // Handle "what fashion is it" pattern that appears in Book 7
    const whatFashionMatch = decodedFilename.match(/What\s+Fashion\s+is\s+It\s+[–-]\s+It\s+is\s+(.*?)(?:\.[a-zA-Z]+)?$/i);
    if (whatFashionMatch && whatFashionMatch[1]) {
      return `What Fashion is It? It is ${whatFashionMatch[1]}`;
    }
    
    // Handle "how many" questions
    const howManyQuestion = decodedFilename.match(/How\s+Many\s+(.*?)\.[a-zA-Z]+$/i);
    if (howManyQuestion) {
      return `How Many ${howManyQuestion[1]}?`;
    }
    
    // Handle "do you" questions
    const doYouQuestion = decodedFilename.match(/Do\s+You\s+(.*?)\.[a-zA-Z]+$/i);
    if (doYouQuestion) {
      return `Do You ${doYouQuestion[1]}?`;
    }
    
    // Handle "who is" questions
    const whoIsQuestion = decodedFilename.match(/Who\s+is\s+(.*?)\.[a-zA-Z]+$/i);
    if (whoIsQuestion) {
      return `Who is ${whoIsQuestion[1]}?`;
    }
    
    // Fallback - just use any text after the file code pattern
    const anyText = decodedFilename.match(/\d+\s+[A-Z]\s+[A-Za-z]+[a-z]?\s+(.*?)(?:\.[a-zA-Z]+)?$/i);
    if (anyText && anyText[1]) {
      let text = anyText[1].trim();
      
      // Remove any URL encoded characters or artifacts
      text = text.replace(/%[0-9A-F]{2}/gi, ' ').trim();
      
      // Capitalize first letter
      text = text.charAt(0).toUpperCase() + text.slice(1);
      
      // Add question mark if it seems like a question
      if (/^(is|are|do|does|who|what|where|when|why|how|can|could)/i.test(text) && !text.endsWith("?")) {
        text += "?";
      }
      
      return text;
    }
    
    // Very simple fallback - try splitting by file code patterns  
    const simpleMatch = decodedFilename.match(/\d{2}\s*[A-Z]\s*[A-Z][a-z]?\s*(.+)/);
    if (simpleMatch && simpleMatch[1]) {
      let text = simpleMatch[1].split('.')[0].trim();
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    // Return clean filename without the encoded parts
    return decodedFilename.split('/').pop()?.split('.')[0] || "Learning Content";
  };

  // Derived values
  const totalSlides = materials?.length || 0;
  const currentMaterial = materials && materials.length > 0 
    ? materials[currentSlideIndex] 
    : null;

  // Loading state
  if (unitLoading || bookLoading || materialsLoading) {
    return <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-[60vh] w-full mb-4" />
      <Skeleton className="h-24 w-3/4" />
    </div>;
  }

  // No materials state
  if (!materials || materials.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => window.location.href = `/admin/books`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Books
            </Button>
            <h1 className="text-xl font-semibold hidden md:block">
              {book?.title} – {unit?.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center my-12">
          <div className="flex items-center justify-center mb-6 bg-gray-100 rounded-full w-16 h-16">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Slides Available</h2>
          <p className="text-gray-500 mb-4 text-center">There are no slides available for this lesson.</p>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.location.reload()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
            Retry Loading Slides
          </Button>
        </div>
      </div>
    );
  }

  // Main UI with materials
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => window.location.href = `/admin/books`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Button>
          <h1 className="text-xl font-semibold hidden md:block">
            {book?.title} – {unit?.title}
          </h1>
        </div>
      </div>

      <div className="block md:hidden mb-4">
        <h1 className="text-xl font-semibold">
          {book?.title} – {unit?.title}
        </h1>
      </div>
      
      <div className="flex flex-col">
        {/* Unit information panel */}
        <div className="mb-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Lock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Unit {unit?.unitNumber} of {book?.title}</h2>
                <p className="text-sm text-gray-500">This unit teaches about school layouts and helps students express how these spaces are used in English.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div id="content-viewer" className="relative rounded-lg overflow-hidden transition-all">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {materials.map((material, index) => (
                <div 
                  key={material.id} 
                  className="flex-[0_0_100%] min-w-0"
                >
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col min-h-[60vh]">
                      {material.isLocked ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Lock className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Content Locked</h3>
                          <p className="text-gray-500 text-center max-w-md">
                            This content is currently locked. Please upgrade your subscription to access all materials.
                          </p>
                        </div>
                      ) : (
                        <>
                          {material.contentType === 'IMAGE' && (
                            <div className="flex flex-col items-center justify-center bg-white h-full">
                              {material.content && (
                                <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="inline-flex items-center justify-center bg-green-100 p-1 rounded-full mb-2">
                                      <Check className="h-5 w-5 text-green-600" />
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                    </h3>
                                  </div>
                                </div>
                              )}
                              <div className="flex-1 flex items-center justify-center w-full h-full">
                                {material.content && (
                                  <>
                                    {material.content.includes('book5') ? (
                                      <>
                                        {/* For Book 5, we display the image using the correct S3 path structure */}
                                        <img
                                          src={`/api/content/book5/unit${unit?.unitNumber}/${material.content.split('/').pop()}`}
                                          alt={material.title}
                                          className="max-w-full max-h-full object-contain"
                                          style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                          onError={(e) => {
                                            console.error("Failed to load Book 5 image:", material.title);
                                            (e.target as HTMLImageElement).style.border = "1px dashed #e5e7eb";
                                            
                                            // Display generic unit content on error
                                            const imgElement = e.target as HTMLImageElement;
                                            imgElement.style.display = 'none';
                                            
                                            // Create a container for the fallback content
                                            const container = document.createElement('div');
                                            container.className = 'p-4 bg-white rounded text-center';
                                            container.innerHTML = `
                                              <h3 class="text-xl font-bold mb-2">Unit ${unit?.unitNumber} Content</h3>
                                              <p class="text-gray-700">Loading image from S3 path: s3://visualenglishmaterial/book5/unit${unit?.unitNumber}/${material.content.split('/').pop()}</p>
                                            `;
                                            
                                            imgElement.parentNode?.appendChild(container);
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <img
                                        src={material.content} 
                                        alt={material.title}
                                        className="max-w-full max-h-full object-contain"
                                        style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                        onError={(e) => {
                                          console.error("Failed to load image:", material.title);
                                          (e.target as HTMLImageElement).style.border = "1px dashed #e5e7eb";
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                  {currentSlideIndex + 1}/{totalSlides}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {material.contentType === 'VIDEO' && (
                            <div className="flex flex-col bg-white h-full">
                              {material.content && (
                                <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="inline-flex items-center justify-center bg-green-100 p-1 rounded-full mb-2">
                                      <Check className="h-5 w-5 text-green-600" />
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                    </h3>
                                  </div>
                                </div>
                              )}
                              <div className="flex-1 flex items-center justify-center w-full h-full">
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <video 
                                    controls 
                                    className="max-w-full max-h-full object-contain"
                                    src={material.content}
                                    style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                    onError={(e) => {
                                      console.error("Failed to load video:", material.title);
                                    }}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                  <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                    {currentSlideIndex + 1}/{totalSlides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* PDF type hidden as per request */}
                          
                          {material.contentType === 'GAME' && (
                            <div className="flex flex-col bg-white h-full">
                              {material.content && (
                                <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="inline-flex items-center justify-center bg-green-100 p-1 rounded-full mb-2">
                                      <Check className="h-5 w-5 text-green-600" />
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                    </h3>
                                  </div>
                                </div>
                              )}
                              <div className="flex-1 flex items-center justify-center w-full h-full">
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <iframe
                                    src={material.content}
                                    title={material.title}
                                    className="max-w-full max-h-full"
                                    style={{ width: '100%', height: 'calc(60vh - 60px)' }}
                                    allowFullScreen
                                  />
                                  <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                    {currentSlideIndex + 1}/{totalSlides}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {!['IMAGE', 'VIDEO', 'PDF', 'GAME'].includes(material.contentType) && (
                            <div className="flex flex-col items-center justify-center h-full bg-white">
                              {material.content && (
                                <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="inline-flex items-center justify-center bg-green-100 p-1 rounded-full mb-2">
                                      <Check className="h-5 w-5 text-green-600" />
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                    </h3>
                                  </div>
                                </div>
                              )}
                              <div className="relative w-full h-full">
                                <div className="p-6">
                                  <p className="text-gray-500">{material.contentType} content</p>
                                  <h3 className="text-xl font-semibold">{material.title}</h3>
                                  <p className="text-gray-500 mt-2">{material.description}</p>
                                </div>
                                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                  {currentSlideIndex + 1}/{totalSlides}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <button 
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity",
              currentSlideIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-80"
            )}
            onClick={() => navigateToSlide(currentSlideIndex - 1)}
            disabled={currentSlideIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity",
              currentSlideIndex === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "opacity-80"
            )}
            onClick={() => navigateToSlide(currentSlideIndex + 1)}
            disabled={currentSlideIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Thumbnails slider */}
        <div className="relative mt-4 px-8">
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md z-10"
            onClick={() => {
              if (thumbsApi) {
                thumbsApi.scrollPrev();
              }
            }}
            aria-label="Previous thumbnails"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md z-10"
            onClick={() => {
              if (thumbsApi) {
                thumbsApi.scrollNext();
              }
            }}
            aria-label="Next thumbnails"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div className="overflow-hidden" ref={thumbsRef}>
            <div className="flex gap-2 py-2">
              {materials
                // Filter out PDF materials from thumbnails
                .filter(material => material.contentType !== 'PDF')
                .map((material, index) => {
                  // Find the actual index in the full materials array
                  const actualIndex = materials.findIndex(m => m.id === material.id);
                  return (
                    <div 
                      key={material.id} 
                      className={cn(
                        "flex-[0_0_80px] min-w-0 cursor-pointer",
                        "relative overflow-hidden rounded border-2 transition-all",
                        currentSlideIndex === actualIndex ? "border-gray-500" : "border-transparent"
                      )}
                      onClick={() => navigateToSlide(actualIndex)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Go to slide ${actualIndex + 1}: ${material.title}`}
                    >
                      {/* Content preview */}
                      <div className="relative h-14 bg-gray-100 flex items-center justify-center">
                        {material.contentType === 'IMAGE' && material.content ? (
                          <img 
                            src={material.content.includes('book5') 
                              ? `/api/content/book5/unit${unit?.unitNumber}/${material.content.split('/').pop()}`
                              : material.content
                            }
                            alt={`Thumbnail for ${material.title}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            {getContentTypeIcon(material.contentType)}
                          </div>
                        )}
                        
                        {/* Status indicator overlay */}
                        {material.isLocked && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Lock className="h-3 w-3 text-white" />
                          </div>
                        )}
                        
                        {/* View status dot */}
                        {!material.isLocked && (
                          <div className="absolute top-0.5 right-0.5">
                            {viewedSlides.includes(material.id) ? (
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-gray-300" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-xs truncate text-center py-1 px-1">
                        {actualIndex + 1}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Slide Info & Resources Panel */}
        <div className="mt-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentMaterial?.isLocked ? (
                <Lock className="h-4 w-4 text-gray-500" />
              ) : (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <span className="text-sm font-medium">
                {currentMaterial?.isLocked ? 'Locked Content' : 'Content Available'}
              </span>
            </div>
            
            {/* PDF download button */}
            {materials.some(m => m.contentType === 'PDF') && (
              <Button size="sm" variant="outline" className="flex items-center gap-2"
                onClick={() => {
                  // Find the first PDF material in this unit
                  const pdfMaterial = materials.find(m => m.contentType === 'PDF');
                  if (pdfMaterial) {
                    window.open(pdfMaterial.content, '_blank');
                  }
                }}>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}