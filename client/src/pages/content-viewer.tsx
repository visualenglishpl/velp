import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video, FileText, Check, Book, Home, FileEdit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import ContentSlide from '@/components/ContentSlide';
import ThumbnailsBar from '@/components/ThumbnailsBar';
import TeachingGuidance from '@/components/TeachingGuidance';

// Define types for our data model
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

type Book = {
  id: number;
  bookId: string;
  title: string;
};

export default function ContentViewer() {
  // Parse URL and get IDs
  const [location] = useLocation();
  const urlParts = location.split('/');
  const unitId = parseInt(urlParts[2] || '0', 10);
  const initialMaterialIndex = parseInt(urlParts[4] || '0', 10) || 0;
  
  // State
  const [currentIndex, setCurrentIndex] = useState(initialMaterialIndex);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  const [showTeacherGuidance, setShowTeacherGuidance] = useState(false);
  
  // Initialize Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: 'keepSnaps',
  });
  
  // Data fetching for unit
  const {
    data: unit,
    isLoading: unitLoading,
    error: unitError
  } = useQuery<Unit>({
    queryKey: ['/api/units', unitId],
    enabled: !!unitId,
  });
  
  // Data fetching for materials within the unit
  const {
    data: materials,
    isLoading: materialsLoading,
    error: materialsError
  } = useQuery<Material[]>({
    queryKey: ['/api/units', unitId, 'materials'],
    enabled: !!unitId,
  });
  
  // Data fetching for the book that contains this unit
  const {
    data: book,
    isLoading: bookLoading,
    error: bookError
  } = useQuery<Book>({
    queryKey: ['/api/books', unit?.bookId],
    enabled: !!unit?.bookId,
  });
  
  // Navigate to a specific slide
  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi && materials && index >= 0 && index < materials.length) {
      emblaApi.scrollTo(index);
      setCurrentIndex(index);
      
      // Update URL to reflect the current slide
      window.history.pushState({}, "", `/units/${unitId}/materials/${index}`);
      
      // Mark slide as viewed
      const materialId = materials[index].id;
      if (!viewedSlides.includes(materialId)) {
        setViewedSlides(prev => [...prev, materialId]);
      }
    }
  }, [emblaApi, materials, unitId, viewedSlides]);
  
  // Handle carousel changes
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        scrollToSlide(currentIndex + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, scrollToSlide]);
  
  // Initialize carousel to the initial index
  useEffect(() => {
    if (emblaApi && initialMaterialIndex > 0) {
      emblaApi.scrollTo(initialMaterialIndex);
    }
  }, [emblaApi, initialMaterialIndex]);

  // Show loading state while data is being fetched
  if (unitLoading || materialsLoading || bookLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-[40vh] w-full max-w-3xl rounded-lg" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state if any errors occurred
  if (unitError || materialsError || bookError) {
    console.error("Content viewer error:", {
      unitError,
      materialsError,
      bookError
    });
    
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium mb-2">Error Loading Content</h3>
          <p>Oops, we couldn't load this unit. Please try again later.</p>
          <details className="mt-4 text-xs text-gray-600">
            <summary>Technical details</summary>
            <p className="mt-2">{(unitError || materialsError || bookError)?.message || 'Failed to load content'}</p>
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold uppercase">
              {book?.title || 'Book'}
            </h1>
            <h2 className="text-lg text-gray-600 uppercase">
              Unit {unit?.unitNumber || ''} {unit?.title ? `- ${unit?.title}` : ''}
            </h2>
            <p className="text-sm text-gray-500">
              Slide {currentIndex + 1} of {materials.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center mr-4 bg-gray-100 p-1 px-3 rounded-full">
              <Switch
                id="teacher-mode"
                checked={showTeacherGuidance}
                onCheckedChange={setShowTeacherGuidance}
                className="mr-2"
              />
              <label htmlFor="teacher-mode" className="text-sm font-medium flex items-center">
                <FileEdit className="h-4 w-4 mr-1" />
                {showTeacherGuidance ? "Teacher Mode On" : "Teacher Mode Off"}
              </label>
            </div>
            <Button onClick={() => window.location.href = "/admin/books"} variant="outline" size="sm">
              <Book className="mr-2 h-4 w-4" />
              Books List
            </Button>
            <Button onClick={() => window.location.href = "/"} variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pb-8 pt-4">
        {/* Carousel wrapper */}
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="overflow-hidden min-h-[70vh]" ref={emblaRef}>
            <div className="embla__container h-full">
              {materials.map((material, index) => (
                <div className="embla__slide flex items-center justify-center h-full" key={material.id}>
                  <ContentSlide 
                    material={material} 
                    isActive={index === currentIndex}
                    bookId={book?.bookId || ''}
                    unitNumber={unit?.unitNumber || 0}
                    slideIndex={index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <AnimatePresence>
            {currentIndex > 0 && (
              <motion.div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Button 
                  onClick={() => scrollToSlide(currentIndex - 1)} 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-md"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
            
            {currentIndex < materials.length - 1 && (
              <motion.div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Button 
                  onClick={() => scrollToSlide(currentIndex + 1)} 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-md"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thumbnails bar */}
        <div className="bg-white shadow rounded-lg p-4">
          <ThumbnailsBar
            materials={materials}
            currentIndex={currentIndex}
            onSelectSlide={scrollToSlide}
            viewedSlides={viewedSlides}
          />
        </div>
        
        {/* Teaching guidance section - shown when teacher mode is active */}
        {showTeacherGuidance && (
          <TeachingGuidance 
            bookId={book?.bookId || ''}
            unitNumber={unit?.unitNumber || 0}
            onHide={() => setShowTeacherGuidance(false)}
          />
        )}
      </main>
    </div>
  );
}