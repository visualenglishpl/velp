import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define types
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
  const { toast } = useToast();
  
  // State for the viewer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for materials
  const [materials, setMaterials] = useState<S3Material[]>([]);
  
  // Extract bookId and unitNumber from URL path
  let bookId: string | null = null;
  let unitNumber: string | null = null;
  
  // Parse from /book/:bookId/unit/:unitNumber format
  const [_, params] = useRoute('/book/:bookId/unit/:unitNumber');
  
  if (params) {
    bookId = params.bookId;
    unitNumber = params.unitNumber;
  } else {
    // Parse from /book/:bookId format
    const [__, bookParams] = useRoute('/book/:bookId');
    if (bookParams) {
      bookId = bookParams.bookId;
      unitNumber = '1'; // Default to unit 1 if only book is specified
    } else {
      // Fallback to URL parameters
      const searchParams = new URLSearchParams(window.location.search);
      bookId = searchParams.get('bookId');
      unitNumber = searchParams.get('unitNumber');
    }
  }
  
  // Build paths for API requests
  const bookPath = bookId ? `book${bookId}` : null;
  const unitPath = unitNumber ? `unit${unitNumber}` : null;
  
  console.log(`SlickContentViewer: Book=${bookPath}, Unit=${unitPath}`);
  
  // Check if the user is logged in
  useEffect(() => {
    fetch('/api/user')
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            setIsLoggedIn(true);
            setIsLoading(false);
          });
        } else {
          if (response.status === 401) {
            // Not authenticated, redirect to the login page after a short delay
            setTimeout(() => {
              navigate('/auth');
            }, 1000);
            setIsLoggedIn(false);
          }
          setIsLoading(false);
          throw new Error('Not authenticated');
        }
      })
      .catch(error => {
        console.error('Authentication check failed:', error);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, [navigate]);
  
  // Fetch unit information
  const { 
    data: unitData,
    error: unitError,
    isLoading: unitLoading
  } = useQuery<UnitInfo>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath && isLoggedIn)
  });
  
  // Fetch materials from S3
  const {
    data: fetchedMaterials, 
    error: materialsError,
    isLoading: materialsLoading
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath && isLoggedIn)
  });
  
  // Process materials when fetched
  useEffect(() => {
    if (!fetchedMaterials) return;
    
    // Filter out PDFs and SWFs
    const filteredMaterials = fetchedMaterials.filter(material => {
      const content = material.content.toLowerCase();
      return !(
        material.contentType === 'PDF' || 
        material.contentType === 'SWF' || 
        content.endsWith('.pdf') || 
        content.endsWith('.swf')
      );
    });
    
    // Sort materials by default order
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
    
    setMaterials(sortedMaterials);
  }, [fetchedMaterials]);
  
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
    }
  }, [currentIndex]);
  
  const goToNextSlide = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (sliderRef.current && currentIndex < materials.length - 1) {
      console.log(`Going to next slide from ${currentIndex}`);
      sliderRef.current.slickNext();
    }
  }, [currentIndex, materials.length]);
  
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
    if (!materials.length) return;
    
    // Try to find a "00" prefixed slide to start with
    const startIndex = materials.findIndex(
      material => material.content.startsWith('00')
    );
    
    if (startIndex !== -1) {
      goToSlide(startIndex);
    } else {
      goToSlide(0);
    }
  }, [materials, goToSlide]);
  
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
  
  // Handle login redirect
  const handleLoginClick = () => {
    navigate('/auth');
  };
  
  // Loading state
  if (isLoading || unitLoading || materialsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-bold mb-2">Loading Content Viewer</h2>
        <p className="text-muted-foreground">Please wait while we load your content...</p>
      </div>
    );
  }
  
  // Not logged in state
  if (isLoggedIn === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Authentication Required</h1>
          <p className="mb-6 text-center text-gray-600">
            Please log in to view this content. You'll be redirected to the login page shortly.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleLoginClick} className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              Log in now
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Error states
  if (unitError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Unit</h1>
        <p className="mb-6 text-center">{(unitError as Error).message}</p>
        <Button onClick={() => navigate('/books')}>
          Return to Books
        </Button>
      </div>
    );
  }
  
  if (materialsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Materials</h1>
        <p className="mb-6 text-center">{(materialsError as Error).message}</p>
        <Button onClick={() => navigate('/books')}>
          Return to Books
        </Button>
      </div>
    );
  }
  
  // No materials found
  if (!materials.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No Materials Found</h1>
        <p className="mb-6 text-center">
          We couldn't find any materials for Book {bookId} Unit {unitNumber}.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/books')}>
            <Book className="mr-2 h-4 w-4" />
            Browse Books
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col relative ${isFullscreen ? 'bg-black' : 'bg-white'}`}
      style={{ height: isFullscreen ? '100vh' : 'calc(100vh - 64px)' }}
    >
      {/* Top navigation bar */}
      <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800">
        <div className="text-sm font-medium">
          Book {bookId} • Unit {unitNumber} {unitData?.title ? `• ${unitData.title}` : ''}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/books')}
          >
            <Book className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow relative">
        {/* Slider container */}
        <div className="h-full">
          <Slider ref={sliderRef} {...slickSettings} className="h-full">
            {materials.map((material, index) => (
              <div key={material.id} className="outline-none">
                <div className="flex justify-center items-center h-full p-4">
                  <img
                    src={`/api/direct/content/${material.content}`}
                    alt={material.title || `Slide ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={goToPrevSlide}
          className={`absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={goToNextSlide}
          className={`absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md ${
            currentIndex === materials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          disabled={currentIndex === materials.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Bottom status bar */}
      <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 text-sm">
        <div>
          Slide {currentIndex + 1} of {materials.length}
        </div>
      </div>
    </div>
  );
}