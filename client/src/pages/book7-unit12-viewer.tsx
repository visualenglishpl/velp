import { useEffect, useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentSlide from "@/components/ContentSlide";
import ThumbnailsBar from "@/components/ThumbnailsBar";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// This is a specialized viewer just for Book 7 Unit 12
// Using a direct S3-like path pattern: /book7/unit12

type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order?: number;
  orderIndex?: number;
  isLocked?: boolean;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

type Unit = {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description?: string;
};

export default function Book7Unit12Viewer() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    draggable: true, 
    loop: false,
    skipSnaps: false
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);

  // Fetch unit data directly using simplified endpoint
  const { data: unit, error: unitError, isLoading: isUnitLoading } = useQuery<Unit>({
    queryKey: ["/api/viewer/book7/unit12"],
    enabled: !!user,
  });

  // Fetch materials directly using simplified endpoint
  const { data: materials, error: materialsError, isLoading: isMaterialsLoading } = useQuery<Material[]>({
    queryKey: ["/api/viewer/book7/unit12/materials"],
    enabled: !!user,
  });

  // Scroll to specific slide by index
  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  // Handle slide change
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const currentIdx = emblaApi.selectedScrollSnap();
      setCurrentIndex(currentIdx);
      
      // Mark this slide as viewed
      if (!viewedSlides.includes(currentIdx)) {
        setViewedSlides(prev => [...prev, currentIdx]);
      }
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Call once to initialize

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, viewedSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentIndex < (materials?.length || 0) - 1) {
          scrollToSlide(currentIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          scrollToSlide(currentIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, materials, scrollToSlide]);

  // Show loading state while fetching
  if (isUnitLoading || isMaterialsLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show error state if any errors occurred
  if (unitError || materialsError) {
    console.error("Book7 Unit12 viewer error:", {
      unitError,
      materialsError
    });
    
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium mb-2">Error Loading Content</h3>
          <p>Oops, we couldn't load this unit. Please try again later.</p>
          <details className="mt-4 text-xs text-gray-600">
            <summary>Technical details</summary>
            <p className="mt-2">{(unitError || materialsError)?.message || 'Failed to load content'}</p>
          </details>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.href = '/admin/books'}
          >
            Return to Books
          </Button>
        </div>
      </div>
    );
  }

  // If no materials are available
  if (!materials || materials.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-600 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium mb-2">No Content Available</h3>
          <p>There is no content available for this unit.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.href = '/admin/books'}
          >
            Return to Books
          </Button>
        </div>
      </div>
    );
  }

  // Current material
  const currentMaterial = materials[currentIndex];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">BOOK 7: {unit?.title || 'HEALTHY LIFESTYLE'}</h1>
          <p className="text-gray-500">Slide {currentIndex + 1} of {materials.length}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 md:mt-0"
          onClick={() => window.location.href = '/admin/books'}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Books
        </Button>
      </div>
      
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg border bg-background">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {materials.map((material, index) => (
              <div className="embla__slide" key={material.id}>
                <ContentSlide 
                  material={material} 
                  isActive={index === currentIndex}
                  bookId="7"
                  unitNumber={12}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <AnimatePresence>
          {currentIndex > 0 && (
            <motion.div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={() => scrollToSlide(currentIndex - 1)}
                className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          {currentIndex < materials.length - 1 && (
            <motion.div 
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={() => scrollToSlide(currentIndex + 1)}
                className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Thumbnails/Pagination */}
      <ThumbnailsBar 
        materials={materials} 
        currentIndex={currentIndex} 
        onSelectSlide={scrollToSlide}
        viewedSlides={viewedSlides}
      />
    </div>
  );
}