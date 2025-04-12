import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import useEmblaCarousel from 'embla-carousel-react';
import {
  ArrowLeft,
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
  const urlParts = window.location.pathname.split("/");
  const unitId = parseInt(urlParts[2] || "0", 10);
  const initialMaterialIndex = parseInt(urlParts[4] || "0", 10) || 0;
  
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

  // Extract title from filename - extremely simplified
  const getSlideTitle = (filename: string): string => {
    if (!filename) return "Learning Content";
    
    // Decode URI components
    const decodedFilename = decodeURIComponent(filename);
    
    // Get just the filename without path
    const baseName = decodedFilename.split('/').pop() || '';
    
    // Check if it's an intro slide
    if (/00\s*A/i.test(baseName)) {
      return "Unit Introduction";
    }
    
    // Return a basic slide name
    return `Slide ${currentSlideIndex + 1}`;
  };
  
  // Filter out empty slides
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    
    // Get all valid materials (non-empty)
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
                              {/* Simplified header */}
                              <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                <div className="flex flex-col items-center justify-center">
                                  <span className="inline-flex items-center justify-center bg-green-100 p-1 rounded-full mb-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                  </span>
                                  <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {material.title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Standard image display */}
                              <div className="flex-1 flex items-center justify-center w-full h-full">
                                {material.content && (
                                  <img
                                    src={
                                      material.content.startsWith('/api/content') 
                                        ? material.content 
                                        : book && unit 
                                          ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${encodeURIComponent(material.content.replace(/^.*[\\\/]/, ''))}`
                                          : material.content
                                    }
                                    alt={material.title}
                                    className="max-w-full max-h-full object-contain"
                                    style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                    onError={(e) => {
                                      console.error(`Failed to load image:`, material.title);
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      
                                      // Simple error message
                                      const container = document.createElement('div');
                                      container.className = 'p-4 bg-white rounded text-center';
                                      container.innerHTML = `
                                        <h3 class="text-xl font-bold mb-2">Unit ${unit?.unitNumber} Content</h3>
                                        <p class="text-gray-700">Image could not be loaded</p>
                                      `;
                                      (e.target as HTMLImageElement).parentNode?.appendChild(container);
                                    }}
                                  />
                                )}
                                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                  {index + 1}/{totalSlides}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Video content */}
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
                          
                          {/* PDF content */}
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
                          
                          {/* Game content */}
                          {material.contentType === 'GAME' && (
                            <div className="flex flex-col bg-white h-full">
                              <div className="w-full bg-gray-100 p-4 text-center mb-4">
                                <h3 className="text-xl font-semibold">
                                  {material.title} - Interactive Game
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