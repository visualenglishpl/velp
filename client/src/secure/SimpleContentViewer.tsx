import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define types for question data structure
type QuestionAnswer = {
  question: string;
  answer: string;
};

type CountryQuestions = {
  [key: string]: QuestionAnswer;
};

type CountryData = {
  country: string;
  questions: CountryQuestions;
};

type QuestionDataType = {
  [key: string]: CountryData;
};

// Simplified question data for countries
const QUESTION_DATA: QuestionDataType = {
  "01 R": {
    country: "POLAND",
    questions: {
      "A": { question: "What country is this?", answer: "It is Poland." },
      "B": { question: "Where is this flag from?", answer: "It is from Poland." }
    }
  },
  "02 N": {
    country: "BRITAIN / UK",
    questions: {
      "A": { question: "Which countries are in Britain?", answer: "They are England, Scotland, and Wales." }
    }
  }
};

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

export default function SimpleContentViewer() {
  const [location, navigate] = useLocation();
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [materials, setMaterials] = useState<S3Material[]>([]);
  
  // Extract bookId and unitNumber from URL path
  let bookId: string | null = null;
  let unitNumber: string | null = null;
  
  // Parse from /book/:bookId/unit/:unitNumber format
  const pathRegex = /\/book\/([^/]+)\/unit\/([^/]+)/;
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
  
  // Authentication
  let user = null;
  try {
    const { user: authUser } = useAuth();
    user = authUser;
  } catch (error) {
    console.error("Authentication error:", error);
  }
  
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
    data: fetchedMaterials, 
    error: materialsError,
    isLoading: materialsLoading
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
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
    let sortedMaterials = [...filteredMaterials].sort((a, b) => {
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
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  }, []);
  
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
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < materials.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToSlide, isFullscreen, materials.length]);
  
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
  
  // Settings for react-slick
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    adaptiveHeight: false,
    afterChange: (current: number) => setCurrentIndex(current),
    lazyLoad: 'ondemand' as 'ondemand'
  };
  
  // Helper function to get question and answer for a material
  const getQuestionAnswer = (material: S3Material) => {
    // Default return value
    const defaultResult = { country: "", question: "", answer: "", hasData: false };
    
    // Try to use the file code from the description field
    if (!material.description) return defaultResult;
    
    // The description contains the file code like "01 R A"
    const codeMatch = material.description.match(/^(\d+\s+[A-Z])\s+([A-Z])/);
    if (!codeMatch) return defaultResult;
    
    const codeBase = codeMatch[1]; // "01 R"
    const letterCode = codeMatch[2]; // "A"
    
    // Check if we have data for this code
    if (!QUESTION_DATA[codeBase]) return defaultResult;
    
    const countryData = QUESTION_DATA[codeBase];
    // Make sure the letterCode exists in the questions object
    if (!countryData.questions[letterCode]) return defaultResult;
    
    return {
      country: countryData.country,
      question: countryData.questions[letterCode].question,
      answer: countryData.questions[letterCode].answer,
      hasData: true
    };
  };
  
  // Loading state
  if (materialsLoading || unitLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg text-gray-600">Loading content...</p>
      </div>
    );
  }
  
  // Error state
  if (materialsError || unitError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-50 rounded-lg p-6 text-center border border-red-100 max-w-lg">
          <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Content</h3>
          <p className="text-red-600 mb-4">There was a problem loading the unit content. Please try again later.</p>
          <Button onClick={() => navigate('/books')} className="bg-red-600 hover:bg-red-700">
            Return to Books
          </Button>
        </div>
      </div>
    );
  }
  
  // No materials
  if (!materials.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100 max-w-lg">
          <h3 className="text-xl font-bold text-blue-700 mb-2">No Content Available</h3>
          <p className="text-blue-600 mb-4">There is no content available for this unit yet.</p>
          <Button onClick={() => navigate('/books')} className="bg-blue-600 hover:bg-blue-700">
            Return to Books
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'rounded-lg shadow-md border border-gray-200'}`}
    >
      {/* Header with unit info */}
      <div className={`bg-white border-b border-gray-200 p-2 flex justify-between items-center ${isFullscreen ? 'sticky top-0 z-10' : 'rounded-t-lg'}`}>
        <div className="flex items-center">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => navigate('/books')}
            className="mr-2 border-blue-200 hover:bg-blue-50"
          >
            <Home className="h-4 w-4 mr-1" />
            Books
          </Button>
          <h3 className="text-lg font-medium">
            {unitData?.title || `Book ${bookId}, Unit ${unitNumber}`}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Slide {currentIndex + 1} of {materials.length}
          </span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="border-blue-200 hover:bg-blue-50"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Slider with images */}
      <div className="relative h-full">
        <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
          {materials.map((material, index) => {
            const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
            const isPremiumContent = index >= freeSlideLimit && !hasPaidAccess;
            
            return (
              <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                {/* Question-Answer section above image */}
                {material.title && (
                  <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
                    <div className="flex flex-col gap-0.5">
                      {/* Try to extract Q&A data */}
                      {(() => {
                        // Try getQuestionAnswer first
                        const qa = getQuestionAnswer(material);
                        
                        if (qa.hasData) {
                          return (
                            <>
                              {qa.country && (
                                <div className="mb-1 flex items-center justify-center">
                                  <h3 className="text-base font-bold text-blue-800 bg-white py-0.5 px-3 rounded-full shadow-sm border border-blue-200">
                                    {qa.country}
                                  </h3>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                <span className="text-gray-800 text-base">{qa.question}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                <span className="font-medium text-indigo-900 text-base">{qa.answer}</span>
                              </div>
                            </>
                          );
                        }
                        
                        // Check for arrow format (question → answer)
                        if (material.title.includes('→')) {
                          const [question, answer] = material.title.split('→').map(part => part.trim());
                          return (
                            <>
                              <div className="flex gap-2">
                                <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                <span className="text-gray-800 text-base">{question}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                <span className="font-medium text-indigo-900 text-base">{answer}</span>
                              </div>
                            </>
                          );
                        }
                        
                        // Check for question mark format
                        if (material.title.includes('?')) {
                          return (
                            <>
                              <div className="flex gap-2">
                                <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                <span className="text-gray-800 text-base">{material.title}</span>
                              </div>
                              {material.description && (
                                <div className="flex gap-2 mt-2">
                                  <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                  <span className="font-medium text-indigo-900 text-base">{material.description}</span>
                                </div>
                              )}
                            </>
                          );
                        }
                        
                        // Default case
                        if (!material.title.startsWith('Content from')) {
                          return (
                            <div className="flex gap-2">
                              <span className="font-medium text-gray-800 text-base">{material.title}</span>
                            </div>
                          );
                        }
                        
                        return null;
                      })()}
                      
                      {/* Show description if not shown as answer */}
                      {material.description && !material.title.includes('?') && !material.title.includes('→') && (
                        <div className="mt-2 text-sm text-gray-600">{material.description}</div>
                      )}
                    </div>
                  </div>
                )}
                
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
                  {/* Check if content is a video */}
                  {material.content.toLowerCase().includes('video') || 
                   material.content.toLowerCase().endsWith('.mp4') ? (
                    <video 
                      src={imagePath}
                      controls
                      className="max-h-full max-w-full object-contain mx-auto shadow-lg"
                      poster="/assets/video-placeholder.jpg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    /* Regular image content */
                    <img 
                      src={imagePath}
                      alt={material.title || `Slide ${index + 1}`}
                      className="max-h-full max-w-full object-contain mx-auto shadow-lg"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
        
        {/* Navigation buttons */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-blue-600" />
        </button>
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === materials.length - 1}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg hover:shadow-xl disabled:opacity-40 z-20 transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-blue-600" />
        </button>
      </div>
    </div>
  );
}