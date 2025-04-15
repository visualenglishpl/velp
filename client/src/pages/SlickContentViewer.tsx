import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    data: materials, 
    error: materialsError,
    isLoading: materialsLoading
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Filter out PDFs and SWFs
  const filteredMaterials = materials?.filter(material => {
    const content = material.content.toLowerCase();
    return !(
      material.contentType === 'PDF' || 
      material.contentType === 'SWF' || 
      content.endsWith('.pdf') || 
      content.endsWith('.swf')
    );
  }) || [];
  
  // Sort materials to prioritize "00" prefix files
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
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
    if (sliderRef.current && currentIndex < sortedMaterials.length - 1) {
      console.log(`Going to next slide from ${currentIndex}`);
      sliderRef.current.slickNext();
      // Don't set index here, let the beforeChange/afterChange handlers do it
    }
  }, [currentIndex, sortedMaterials.length]);
  
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
    if (!sortedMaterials.length) return;
    
    // Try to find a "00" prefixed slide to start with
    const startIndex = sortedMaterials.findIndex(
      material => material.content.startsWith('00')
    );
    
    if (startIndex !== -1) {
      goToSlide(startIndex);
    } else {
      goToSlide(0);
    }
  }, [sortedMaterials, goToSlide]);
  
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Content</h1>
        <p className="mb-4">There was a problem loading this content.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/books')}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!sortedMaterials.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-4">This unit doesn't have any content yet.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/books')}>
            <Book className="mr-2 h-4 w-4" />Books
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="mr-2 h-4 w-4" />Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{unitData.title}</h1>
          <p className="text-sm text-blue-600 font-medium">
            <span className="font-semibold">Book {bookId}</span> • Unit {unitNumber}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="border-blue-200 hover:bg-blue-50 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="ml-1 hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/books')}
            className="border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <Book size={16} />
            <span className="ml-1 hidden sm:inline">Back to Books</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area with Slick Slider */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Image slider */}
        <div className="w-full max-w-5xl mx-auto flex-1 relative flex flex-col items-center justify-center">
          <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
            {sortedMaterials.map((material, index) => {
              const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
              const isPremiumContent = index >= freeSlideLimit && !hasPaidAccess;
              
              return (
                <div key={index} className="outline-none h-[70vh] w-full flex items-center justify-center relative px-4">
                  {/* Premium content overlay */}
                  {isPremiumContent && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                        <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                        <p className="mb-4">This slide requires a subscription to view.</p>
                        <Button 
                          onClick={() => navigate('/checkout')}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        >
                          Get Premium Access
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Centered content container */}
                  <div className="flex items-center justify-center w-full h-full">
                    {/* Actual image */}
                    <img 
                      src={imagePath}
                      alt={material.title || `Slide ${index + 1}`}
                      className="max-h-full max-w-full object-contain mx-auto shadow-lg"
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
          
          {/* Navigation buttons */}
          <button
            onClick={() => {
              if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => {
              if (currentIndex < sortedMaterials.length - 1) {
                goToSlide(currentIndex + 1);
              }
            }}
            disabled={currentIndex === sortedMaterials.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Slide number indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full z-20 shadow-lg flex items-center gap-1">
            <span className="font-bold text-sm">{currentIndex + 1}</span>
            <span className="text-blue-200">/</span>
            <span className="text-sm">{sortedMaterials.length}</span>
          </div>
        </div>
      </div>
      
      {/* Thumbnails navigation */}
      <div className="border-t p-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">Navigate to slide:</p>
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-3 min-w-max">
              {sortedMaterials.map((material, index) => (
                <div 
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    cursor-pointer border-2 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md
                    transition-all duration-200 hover:scale-105 transform
                    ${index === currentIndex 
                      ? 'border-blue-500 ring-2 ring-blue-300 scale-105 shadow-md' 
                      : 'border-gray-200 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <div className="relative h-full w-full">
                    <img 
                      src={`/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`}
                      alt={material.title || `Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-0.5">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}