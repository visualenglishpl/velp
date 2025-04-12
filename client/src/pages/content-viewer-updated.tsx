import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import useEmblaCarousel from 'embla-carousel-react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Lock,
  Video,
  FileText,
  Gamepad2,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Types
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
  // Get unitId and initialMaterialIndex from URL
  const [, params] = useLocation();
  const urlParts = window.location.pathname.split("/");
  const unitId = parseInt(urlParts[2] || "0", 10);
  const initialMaterialIndex = parseInt(urlParts[4] || "0", 10) || 0;
  
  // State hooks
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialMaterialIndex);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  
  // Standardized content handling for all books
  
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
        console.log(`Found intro slide at index ${introSlideIndex}: ${materials[introSlideIndex].title}`);
      } else {
        console.log("No intro slide found with 00A pattern, using first slide");
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

  // Format question and ensure it has a question mark
  const formatQuestion = (text: string): string => {
    if (!text) return "";
    
    // If it's already a question with a question mark, return as is
    if (text.trim().endsWith('?')) return text;
    
    // If it looks like a question but doesn't have a question mark, add one
    if (/^(is|are|do|does|who|what|where|when|why|how|can|could|will|should|may)/i.test(text)) {
      // Capitalize important words in the question
      const capitalizedText = text.replace(/\b[a-z]/g, char => char.toUpperCase());
      return capitalizedText.trim() + '?';
    }
    
    return text;
  };

  // Extract question from filename
  const extractQuestionFromFilename = (filename: string): string => {
    if (!filename) return "";
    
    // Remove URL encoding first
    const decodedFilename = decodeURIComponent(filename);
    
    // Handle unit introduction
    if (/00\s*A/i.test(decodedFilename)) {
      return "Unit Introduction";
    }
    
    // Simple extraction - look for text after file code pattern
    const textMatch = decodedFilename.match(/\d+\s*[A-Z]\s*[A-Z]?\s*(.+?)(?:\.[a-zA-Z]+)?$/i);
    if (textMatch && textMatch[1]) {
      const text = textMatch[1].trim();
      return formatQuestion(text.charAt(0).toUpperCase() + text.slice(1));
    }
    
    // Return clean filename without the encoded parts
    return decodedFilename.split('/').pop()?.split('.')[0] || "Learning Content";
  };
  
  // Filter out empty slides and prioritize slides starting with 00A
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    
    // First get all valid materials (non-empty)
    const validMaterials = materials.filter(material => 
      material.content && 
      material.content.trim() !== '' && 
      !material.title.includes('Empty')
    );
    
    // Check if there's an intro slide (00A pattern)
    const introSlidePattern = /00\s*A/i;
    const hasIntroSlide = validMaterials.some(material => 
      material.content && 
      introSlidePattern.test(material.content.split('/').pop() || '')
    );
    
    // If no intro slide, return the materials as is
    if (!hasIntroSlide) {
      console.log("No 00A intro slide found in this unit");
      return validMaterials;
    }
    
    // Otherwise, sort to prioritize the 00A slide to come first
    return [...validMaterials].sort((a, b) => {
      const aFilename = a.content.split('/').pop() || '';
      const bFilename = b.content.split('/').pop() || '';
      
      const aIsIntro = introSlidePattern.test(aFilename);
      const bIsIntro = introSlidePattern.test(bFilename);
      
      if (aIsIntro && !bIsIntro) return -1; // a comes first
      if (!aIsIntro && bIsIntro) return 1;  // b comes first
      
      // If both are intro slides or neither are, maintain original order
      return 0;
    });
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
                <p className="text-sm text-gray-500">Educational content for this unit.</p>
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
                                    <div className="space-y-2">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {extractQuestionFromFilename(material.content.split('/').pop() || '')}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Standardized image handling for all books */}
                              <div className="flex-1 flex items-center justify-center w-full h-full">
                                {material.content && (
                                  <>
                                    <img
                                      src={
                                        // If content already starts with API path, use it directly
                                        material.content.startsWith('/api/content') 
                                          ? material.content 
                                          // Otherwise, construct a standard path for all books
                                          : book && unit 
                                            ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(material.content.replace(/^.*[\\\/]/, ''))}`
                                            : material.content
                                      }
                                      alt={material.title}
                                      className="max-w-full max-h-full object-contain"
                                      style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                      onError={(e) => {
                                        console.error(`Failed to load image:`, material.title);
                                        (e.target as HTMLImageElement).style.border = "1px dashed #e5e7eb";
                                        
                                        // Display generic unit content on error
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.style.display = 'none';
                                        
                                        // Try different image formats one by one
                                        const tryAlternateFormats = (formats = ['.png', '.jpg', '.gif', '.jpeg', '.webp']) => {
                                          if (formats.length === 0 || !book || !unit) {
                                            // All formats tried or missing book/unit info, show error message
                                            const container = document.createElement('div');
                                            container.className = 'p-4 bg-white rounded text-center';
                                            container.innerHTML = `
                                              <h3 class="text-xl font-bold mb-2">Unit ${unit?.unitNumber} Content</h3>
                                              <p class="text-gray-700">Content not available for ${material.title}</p>
                                            `;
                                            imgElement.parentNode?.appendChild(container);
                                            return;
                                          }
                                          
                                          // Try the next format
                                          const format = formats[0];
                                          const filenameWithoutExt = material.content.replace(/\.[^/.]+$/, "").replace(/^.*[\\\/]/, '');
                                          
                                          const altImg = document.createElement('img');
                                          altImg.src = `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(filenameWithoutExt)}${format}`;
                                          altImg.alt = material.title;
                                          altImg.className = "max-w-full max-h-full object-contain";
                                          altImg.style.objectFit = 'contain';
                                          altImg.style.maxHeight = 'calc(60vh - 60px)';
                                          
                                          // If this format fails, try the next one
                                          altImg.onerror = () => {
                                            altImg.remove();
                                            tryAlternateFormats(formats.slice(1));
                                          };
                                          
                                          imgElement.parentNode?.appendChild(altImg);
                                        };
                                        
                                        // Start trying different formats
                                        tryAlternateFormats();
                                      }}
                                    />
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
                              <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                <h3 className="text-xl font-semibold">
                                  {material.title}
                                </h3>
                              </div>
                              
                              <div className="flex-1 flex items-center justify-center w-full">
                                {material.content && (
                                  <video
                                    controls
                                    className="max-w-full max-h-full"
                                    style={{ maxHeight: 'calc(60vh - 60px)' }}
                                  >
                                    <source 
                                      src={
                                        material.content.startsWith('/api/content')
                                          ? material.content
                                          : book && unit
                                            ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(material.content.replace(/^.*[\\\/]/, ''))}`
                                            : material.content
                                      } 
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {(material.contentType === 'PDF' || material.contentType === 'DOCUMENT') && (
                            <div className="flex flex-col bg-white h-full">
                              <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                <h3 className="text-xl font-semibold">
                                  {material.title}
                                </h3>
                              </div>
                              
                              <div className="flex-1 flex items-center justify-center w-full">
                                {material.content && (
                                  <iframe
                                    src={
                                      material.content.startsWith('/api/content')
                                        ? material.content
                                        : book && unit
                                          ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(material.content.replace(/^.*[\\\/]/, ''))}`
                                          : material.content
                                    }
                                    className="w-full h-full"
                                    style={{ minHeight: '60vh' }}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                          
                          {material.contentType === 'GAME' && (
                            <div className="flex flex-col bg-white h-full">
                              <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                <h3 className="text-xl font-semibold">
                                  {material.title} - Interactive Game
                                </h3>
                              </div>
                              
                              <div className="flex-1 flex items-center justify-center w-full">
                                {material.content && material.content.endsWith('.html') && (
                                  <iframe
                                    src={
                                      material.content.startsWith('/api/content')
                                        ? material.content
                                        : book && unit
                                          ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(material.content.replace(/^.*[\\\/]/, ''))}`
                                          : material.content
                                    }
                                    className="w-full h-full border-0"
                                    style={{ minHeight: '60vh' }}
                                  />
                                )}
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
          
          {/* Navigation arrows */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
              onClick={() => navigateToSlide(currentSlideIndex - 1)}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft />
            </Button>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
              onClick={() => navigateToSlide(currentSlideIndex + 1)}
              disabled={currentSlideIndex === (filteredMaterials?.length || 0) - 1}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        
        {/* Thumbnail navigation */}
        <div className="mt-6">
          <div className="overflow-hidden" ref={thumbsRef}>
            <div className="flex gap-2 py-2">
              {filteredMaterials.map((material, index) => (
                <button
                  key={material.id}
                  type="button"
                  className={`flex-[0_0_100px] min-w-0 h-16 overflow-hidden border rounded-md ${
                    index === currentSlideIndex ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                  } ${viewedSlides.includes(material.id) ? 'opacity-100' : 'opacity-60'}`}
                  onClick={() => navigateToSlide(index)}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-xs text-center p-1">
                    <div className="flex items-center justify-center mb-1">
                      {getContentTypeIcon(material.contentType)}
                    </div>
                    <span className="truncate w-full">{`Slide ${index + 1}`}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Material information */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              {currentMaterial?.title}
            </h3>
            <div className="text-xs text-gray-500">
              {currentSlideIndex + 1} of {totalSlides}
            </div>
          </div>
          {currentMaterial?.description && (
            <p className="mt-1 text-xs text-gray-500">
              {currentMaterial.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}