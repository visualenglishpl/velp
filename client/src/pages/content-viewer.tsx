import { useState, useEffect, useCallback, useMemo } from "react";
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

  // Find the slide index for a specific file pattern (like "00 A.png")
  useEffect(() => {
    if (materials && materials.length > 0 && book) {
      // Look for first slide with "00 A.png" pattern or similar for unit intro
      const introSlidePattern = /00\s*A/i;
      const introSlideIndex = materials.findIndex(material => 
        material.content && 
        introSlidePattern.test(material.content.split('/').pop() || '')
      );
      
      if (introSlideIndex !== -1) {
        // If we found the intro slide, navigate to it
        navigateToSlide(introSlideIndex);
      }
    }
  }, [materials, book, navigateToSlide]);
  
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
  
  // Extract and format answer from filename
  const getAnswerFromFilename = (filename: string): string => {
    if (!filename) return "";
    
    // Remove URL encoding first
    const decodedFilename = decodeURIComponent(filename);
    
    // Look for patterns with dash or en-dash followed by answer
    // Format: "Question – Answer" or "Question - Answer"
    const answerMatch = decodedFilename.match(/[–-]\s*(.+?)(?:\.[a-zA-Z]+)?$/);
    
    if (answerMatch && answerMatch[1]) {
      let answer = answerMatch[1].trim();
      
      // Clean up the answer: capitalize first letter, remove encoding artifacts
      answer = answer.replace(/%[0-9A-F]{2}/gi, ' ').trim();
      answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      
      // Correct common spelling errors
      answer = answer
        .replace(/Scottland/gi, 'Scotland')
        .replace(/Brittish/gi, 'British')
        .replace(/Australlian/gi, 'Australian')
        .replace(/Amerrican/gi, 'American')
        .replace(/Ingland/gi, 'England')
        .replace(/Whales/gi, 'Wales')
        .replace(/Irland/gi, 'Ireland')
        .replace(/Capital citis/gi, 'Capital cities');
      
      return answer;
    }
    
    return "";
  };

  // Filter out empty slides
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    return materials.filter(material => 
      material.content && 
      material.content.trim() !== '' && 
      !material.title.includes('Empty')
    );
  }, [materials]);
  
  // Derived values
  const totalSlides = filteredMaterials?.length || 0;
  const currentMaterial = filteredMaterials && filteredMaterials.length > 0 
    ? filteredMaterials[currentSlideIndex] 
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
              {filteredMaterials.map((material, index) => (
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
                                    <div className="space-y-1">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                      </h3>
                                      {getAnswerFromFilename(material.content.split('/').pop() || '') && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {getAnswerFromFilename(material.content.split('/').pop() || '')}
                                        </p>
                                      )}
                                    </div>
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
                                  {index + 1}/{totalSlides}
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
                                    <div className="space-y-1">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                      </h3>
                                      {getAnswerFromFilename(material.content.split('/').pop() || '') && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {getAnswerFromFilename(material.content.split('/').pop() || '')}
                                        </p>
                                      )}
                                    </div>
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
                                    {index + 1}/{totalSlides}
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
                                    <div className="space-y-1">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                      </h3>
                                      {getAnswerFromFilename(material.content.split('/').pop() || '') && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {getAnswerFromFilename(material.content.split('/').pop() || '')}
                                        </p>
                                      )}
                                    </div>
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
                                    {index + 1}/{totalSlides}
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
                                    <div className="space-y-1">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                      </h3>
                                      {getAnswerFromFilename(material.content.split('/').pop() || '') && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {getAnswerFromFilename(material.content.split('/').pop() || '')}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="relative w-full h-full">
                                <pre className="whitespace-pre-wrap p-4 text-sm text-gray-800 bg-gray-50 rounded overflow-auto max-h-[calc(60vh-60px)]">
                                  {material.content}
                                </pre>
                                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                  {index + 1}/{totalSlides}
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
        </div>
        
        {/* Controls and thumbnails */}
        <div className="my-6 flex justify-center space-x-3">
          <Button
            variant="outline"
            size="sm" 
            className="flex items-center"
            onClick={() => navigateToSlide(currentSlideIndex - 1)}
            disabled={currentSlideIndex <= 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => navigateToSlide(currentSlideIndex + 1)}
            disabled={!filteredMaterials || currentSlideIndex >= filteredMaterials.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {/* Thumbnails */}
        <div className="overflow-hidden mt-4" ref={thumbsRef}>
          <div className="flex gap-2 py-2 px-1">
            {filteredMaterials && filteredMaterials.map((material, index) => (
              <div
                key={material.id}
                className={cn(
                  "relative flex-[0_0_80px] min-w-0 h-14 border rounded-md overflow-hidden cursor-pointer transition-all",
                  currentSlideIndex === index ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200",
                  viewedSlides.includes(material.id) ? "after:absolute after:inset-0 after:bg-green-500 after:bg-opacity-10" : ""
                )}
                onClick={() => navigateToSlide(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 bg-gray-50">
                  {index + 1}
                </div>
                {material.contentType === 'IMAGE' && material.content && (
                  <>
                    {material.content.includes('book5') ? (
                      <img
                        src={`/api/content/book5/unit${unit?.unitNumber}/${material.content.split('/').pop()}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      <img
                        src={material.content}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover opacity-70"
                      />
                    )}
                  </>
                )}
                <div className="absolute bottom-0 right-0 p-0.5 bg-gray-100 rounded-tl-md">
                  {getContentTypeIcon(material.contentType)}
                </div>
                {viewedSlides.includes(material.id) && (
                  <div className="absolute top-0 right-0 p-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}