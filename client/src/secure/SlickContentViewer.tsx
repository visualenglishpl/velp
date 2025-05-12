import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Book, Home, Maximize2, Minimize2, GripVertical, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Structured question data reference for various countries and their codes
const QUESTION_DATA: Record<string, {
  country: string;
  questions: Record<string, { question: string; answer: string }>;
}> = {
  // POLAND - File code "01 R"
  "01 R": {
    country: "POLAND",
    questions: {
      "A": { question: "What country is this?", answer: "It is Poland." },
      "B": { question: "Where is this flag from?", answer: "It is from Poland." },
      "C": { question: "What colors are the Polish flag?", answer: "They are red and white." },
      "D": { question: "Where are these people from?", answer: "They are from Poland." },
      "F": { question: "What nationality are they?", answer: "They are Polish." },
      "I": { question: "What is the capital of Poland?", answer: "It is Warsaw." },
      "K": { question: "What language does she speak?", answer: "She speaks Polish." }
    }
  },
  
  // BRITAIN/UK - File code "02 N"
  "02 N": {
    country: "BRITAIN / UK",
    questions: {
      "A": { question: "Which countries are in Britain?", answer: "They are England, Scotland, and Wales." },
      "C": { question: "Where is this flag from?", answer: "It is from Britain." },
      "D": { question: "What nationality is he?", answer: "He is British." },
      "G": { question: "Who is Britain's leader?", answer: "He is King Charles." },
      "L": { question: "Where is this money from?", answer: "It is from the UK." }
    }
  },
  
  // All other country codes and their questions...
};

interface ContentViewerProps {
  bookId?: string;
  unitNumber?: string;
}

interface Material {
  id: number;
  path: string;
  filename: string;
  type: string;
  url?: string;
  deleted?: boolean;
}

interface UnitInfo {
  bookId: string;
  unitNumber: string;
  title?: string;
  blurAfter?: number;
  totalSlides?: number;
}

const SlickContentViewer: React.FC<ContentViewerProps> = ({ bookId: propBookId, unitNumber: propUnitNumber }) => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Ref for slider component
  const sliderRef = useRef<Slider | null>(null);
  
  // State for bookId and unitNumber (from URL params or props)
  const [bookId, setBookId] = useState<string>(propBookId || '');
  const [unitNumber, setUnitNumber] = useState<string>(propUnitNumber || '');
  
  // Parse URL parameters if not provided as props
  useEffect(() => {
    const path = window.location.pathname;
    
    // Check for /book/:bookId/unit/:unitNumber format
    const bookUnitRegex = /\/book\/([^\/]+)\/unit\/([^\/]+)/;
    const match = path.match(bookUnitRegex);
    
    if (match) {
      const [, pathBookId, pathUnitNumber] = match;
      if (!propBookId) setBookId(pathBookId);
      if (!propUnitNumber) setUnitNumber(pathUnitNumber);
    }
  }, [propBookId, propUnitNumber]);
  
  // State for viewer
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
  
  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Get the full path for the unit materials
  const getUnitPath = () => {
    if (!bookId || !unitNumber) return null;
    return `book${bookId}/unit${unitNumber}`;
  };
  
  // Fetch unit information
  const { 
    data: unitInfo,
    isLoading: unitInfoLoading 
  } = useQuery<UnitInfo>({
    queryKey: ['/api/direct', bookId, unitNumber],
    queryFn: async () => {
      const path = getUnitPath();
      if (!path) return { bookId, unitNumber, title: '', blurAfter: 10, totalSlides: 0 };
      
      console.log(`Fetching unit info from: /api/direct/${path}`);
      const response = await fetch(`/api/direct/${path}`);
      if (!response.ok) {
        throw new Error('Failed to fetch unit information');
      }
      
      const data = await response.json();
      return {
        ...data,
        bookId,
        unitNumber,
      };
    },
    enabled: !!bookId && !!unitNumber,
  });
  
  // Fetch materials for the unit
  const { 
    data: materials,
    isLoading: materialsLoading,
    isError: materialsError 
  } = useQuery<Material[]>({
    queryKey: ['/api/direct', bookId, unitNumber, 'materials'],
    queryFn: async () => {
      const path = getUnitPath();
      if (!path) return [];
      
      console.log(`Fetching materials from: /api/direct/${path}/materials`);
      const response = await fetch(`/api/direct/${path}/materials`);
      if (!response.ok) {
        throw new Error('Failed to fetch materials');
      }
      
      return response.json();
    },
    enabled: !!bookId && !!unitNumber,
  });
  
  // Filter materials to show only images excluding PDFs
  const imageSlides = materials?.filter(material => 
    material.type === 'image' && !material.deleted
  ).sort((a, b) => a.id - b.id) || [];
  
  // Save current slide progress
  const saveProgress = useCallback(() => {
    if (!bookId || !unitNumber) return;
    
    const key = `progress_${bookId}_${unitNumber}`;
    const progress = {
      slide: currentSlide,
      timestamp: new Date().toISOString(),
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(progress));
      toast({
        title: "Progress Saved",
        description: `Your progress in Book ${bookId}, Unit ${unitNumber} has been saved.`,
      });
    } catch (error) {
      console.error("Error saving progress:", error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    }
  }, [bookId, unitNumber, currentSlide, toast]);
  
  // Load saved progress on initial load
  useEffect(() => {
    if (!bookId || !unitNumber) return;
    
    const key = `progress_${bookId}_${unitNumber}`;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      try {
        const { slide } = JSON.parse(saved);
        if (typeof slide === 'number' && slide >= 0) {
          // Set current slide but delay to allow slider to initialize
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.slickGoTo(slide);
              setCurrentSlide(slide);
            }
          }, 500);
        }
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, [bookId, unitNumber, materials]);
  
  // Get question and answer for current slide
  const getCurrentQA = useCallback(() => {
    if (!imageSlides.length || currentSlide >= imageSlides.length) return null;
    
    const filename = imageSlides[currentSlide].filename;
    // Common prefixes for question files in format like "01 C A"
    const prefixMatch = filename.match(/^(\d{2}\s+[A-Z](?:\s+[A-Z])?)/);
    
    if (!prefixMatch) return null;
    
    const prefix = prefixMatch[1];
    const parts = prefix.split(/\s+/);
    
    if (parts.length >= 2) {
      const sectionCode = `${parts[0]} ${parts[1]}`;
      const questionKey = parts.length >= 3 ? parts[2] : 'A';
      
      if (QUESTION_DATA[sectionCode]?.questions[questionKey]) {
        return QUESTION_DATA[sectionCode].questions[questionKey];
      }
    }
    
    return null;
  }, [currentSlide, imageSlides]);
  
  // Determine if content should be blurred
  const shouldBlurContent = useCallback((slideIndex: number) => {
    // If user is authenticated, show all content
    if (user) return false;
    
    // For unauthenticated users, blur after specific slide
    const blurAfter = unitInfo?.blurAfter || 10;
    return slideIndex >= blurAfter;
  }, [unitInfo, user]);
  
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    adaptiveHeight: true,
  };
  
  // Loading state
  if (unitInfoLoading || materialsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-gray-600">Loading content...</p>
      </div>
    );
  }
  
  // Error state
  if (materialsError || !materials || !unitInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-lg text-gray-800 mb-2">Failed to load content</p>
        <p className="text-sm text-gray-600 mb-4">Please check your connection and try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }
  
  // Navigate to a specific slide
  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  
  // Get current question and answer
  const currentQA = getCurrentQA();
  
  return (
    <div className={`flex flex-col h-screen ${isFullScreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Navigation header */}
      <div className="flex justify-between items-center p-3 bg-gray-100">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => setLocation('/')}>
            <Home className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <Button variant="ghost" onClick={() => setLocation(`/books/${bookId}`)}>
            <Book className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Book {bookId}</span>
          </Button>
          <div className="mx-2 text-gray-500">Unit {unitNumber}</div>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={toggleSidebar}>
            <GripVertical className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
            {isFullScreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={saveProgress}>
            <Save className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Slide content */}
        <div className="flex-1 overflow-hidden">
          <div className="relative h-full">
            {/* Progress indicator */}
            <div className="absolute top-0 left-0 right-0 bg-gray-200 z-10">
              <div 
                className="bg-blue-500 h-1" 
                style={{ width: `${((currentSlide + 1) / imageSlides.length) * 100}%` }}
              />
            </div>
            
            {/* Slider component */}
            <div className="h-full pt-1">
              <Slider ref={sliderRef} {...settings} className="h-full">
                {imageSlides.map((slide, index) => (
                  <div key={slide.id} className="outline-none h-full">
                    <div className="flex justify-center items-center h-full px-4 py-2">
                      <div className="relative max-w-full max-h-full">
                        <img 
                          src={slide.path} 
                          alt={`Slide ${index + 1}`}
                          className={`max-h-[75vh] object-contain ${shouldBlurContent(index) ? 'blur-md' : ''}`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder-error.png'; // Fallback image
                          }}
                        />
                        
                        {shouldBlurContent(index) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/80 p-4 rounded-lg text-center max-w-sm">
                              <h3 className="text-lg font-bold mb-2">Premium Content</h3>
                              <p className="mb-3">Log in to view the full content of this unit.</p>
                              <Button onClick={() => setLocation('/login')}>Log In</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white/50 hover:bg-white/80"
                onClick={() => goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white/50 hover:bg-white/80"
                onClick={() => goToSlide(currentSlide + 1)}
                disabled={currentSlide === imageSlides.length - 1}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
            
            {/* Slide number indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentSlide + 1} / {imageSlides.length}
            </div>
          </div>
        </div>
        
        {/* Sidebar with questions/answers */}
        {isSidebarOpen && (
          <div className="w-64 lg:w-80 bg-gray-50 border-l overflow-y-auto p-4">
            <h3 className="font-semibold text-lg mb-3">Q&A Information</h3>
            
            {currentQA ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Question:</h4>
                  <p className="mt-1 text-gray-900">{currentQA.question}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">Answer:</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAnswers(prev => ({ ...prev, [currentSlide]: !prev[currentSlide] }))}
                    >
                      {answers[currentSlide] ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  
                  {answers[currentSlide] ? (
                    <p className="mt-1 p-2 bg-green-50 border border-green-200 rounded-md">
                      {currentQA.answer}
                    </p>
                  ) : (
                    <p className="mt-1 p-2 bg-gray-100 border border-gray-200 rounded-md text-gray-400 italic">
                      Click "Show" to reveal the answer
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No question information available for this slide.</p>
            )}
            
            {/* Thumbnails for quick navigation */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Quick Navigation</h3>
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pb-2">
                {imageSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`
                      cursor-pointer rounded-md overflow-hidden border-2 transition-all
                      ${currentSlide === index ? 'border-blue-500 shadow-md' : 'border-transparent'}
                      ${shouldBlurContent(index) ? 'blur-sm' : ''}
                    `}
                    onClick={() => goToSlide(index)}
                    title={`Go to slide ${index + 1}`}
                  >
                    <img 
                      src={slide.path} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-16 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.opacity = '0.3'; // Make broken image faded
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlickContentViewer;