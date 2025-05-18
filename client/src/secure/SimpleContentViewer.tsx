import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceList } from '@/components/resources/ResourceList';
import { Separator } from '@/components/ui/separator';
import { SideBySideLessonPlanView } from '@/components/resources/SideBySideLessonPlanView';
// Import synchronous resource utilities
import { 
  getVideoResources, 
  getWordwallGames, 
  getPdfResources, 
  getLessonPlans 
} from '@/components/resources/resourceUtilsSync';
import { TeacherResource } from '@/types/TeacherResource';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Types for question-answer data
interface IQuestionAnswer {
  question: string;
  answer: string;
}

interface ICountryQuestions {
  [key: string]: IQuestionAnswer;
}

interface ICountryData {
  country: string;
  questions: ICountryQuestions;
}

interface IQuestionDataType {
  [key: string]: ICountryData;
}

// Sample structured Q&A data for content mapped by filename
const QUESTION_DATA: IQuestionDataType = {
  // Book 2 - Unit 3 - Countries
  'book2-unit3': {
    country: 'Countries',
    questions: {
      '09-M-A-What-country-is-this-It-is-Poland.png': {
        question: 'What country is this?',
        answer: 'It is Poland.'
      },
      '09-M-B-Where-is-this-flag-from-It-is-from-Poland.png': {
        question: 'Where is this flag from?',
        answer: 'It is from Poland.'
      },
      '09-N-A-What-nationality-is-he-He-is-Polish.png': {
        question: 'What nationality is he?',
        answer: 'He is Polish.'
      },
      // More entries...
    }
  },
  // More units...
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

export function SimpleContentViewer() {
  const [activeTab, setActiveTab] = useState('content');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [location, navigate] = useLocation();
  // Temporarily use a mock user for development
  const user = { role: 'admin' };
  
  // Extract book and unit information from the URL
  const params = new URLSearchParams(location.split('?')[1]);
  const bookPath = params.get('book') || '1';
  const unitPath = params.get('unit') || '1';
  
  // Format book/unit IDs for display
  const bookId = bookPath.replace(/^0/, ''); // Remove leading zero if present
  const unitId = unitPath.replace(/^0/, ''); // Remove leading zero if present
  
  // Set up unit information
  const unitInfo: UnitInfo = {
    path: unitPath,
    bookId: bookId,
    unitNumber: parseInt(unitId, 10),
    title: `Book ${bookId} - Unit ${unitId}`
  };
  
  // Determine free content limits based on book type
  const isMiniBook = ['0a', '0b', '0c'].includes(bookPath);
  const freeSlideLimit = isMiniBook ? 3 : 10;
  
  // Subscription/access status detection
  const hasPaidAccess = user?.role === 'teacher' || user?.role === 'admin';

  // Check for special content handling based on book & unit
  const isSpecialContent = 
    (bookId === '1' && unitId === '1') || 
    (bookId === '1' && unitId === '3') ||
    (bookId === '2' && unitId === '3');
  
  // Load materials from S3 via the Direct API
  const { 
    data: materials, 
    isLoading, 
    error 
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: !!bookPath && !!unitPath,
  });
  
  // Get resources for current book & unit using our sync utility functions
  const videoResources = getVideoResources(bookId, unitId);
  const wordwallGames = getWordwallGames(bookId, unitId);
  const pdfResources = getPdfResources(bookId, unitId);
  const lessonPlans = getLessonPlans(bookId, unitId);
  
  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      contentRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        sliderRef.current?.slickPrev();
      } else if (e.key === 'ArrowRight') {
        sliderRef.current?.slickNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);
  
  // Get Q&A data for a material
  const getQuestionAnswer = (material: S3Material) => {
    // Default empty result
    const emptyResult = { hasData: false, question: '', answer: '', country: '' };
    
    // Check for direct unit mapping in our QA database
    const unitKey = `book${bookId}-unit${unitId}`;
    const qaData = QUESTION_DATA[unitKey];
    
    if (!qaData) return emptyResult;
    
    // Look for a match in the questions data
    for (const [filename, qa] of Object.entries(qaData.questions)) {
      if (material.content.includes(filename) || 
          (material.path && material.path.includes(filename))) {
        return {
          hasData: true,
          question: qa.question as string,
          answer: qa.answer as string,
          country: qaData.country
        };
      }
    }
    
    return emptyResult;
  };
  
  // Slider settings
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };
  
  // Helper to determine if we should enable teacher resources
  const showTeacherResources = () => {
    return (user?.role === 'teacher' || user?.role === 'admin') && 
           (videoResources.length > 0 || wordwallGames.length > 0 || 
            pdfResources.length > 0 || lessonPlans.length > 0);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !materials) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-bold text-red-700 mb-2">Error Loading Content</h2>
          <p className="text-red-600">
            {error instanceof Error 
              ? error.message 
              : "Could not load materials for this unit. Please try again."}
          </p>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="mt-4 inline-flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen" ref={contentRef}>
      {/* Header with title and tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Book {bookId} - Unit {unitId}
          </h1>
          <p className="text-muted-foreground">
            {materials.length} slides • Slide {currentSlide + 1} of {materials.length}
          </p>
        </div>
      </div>
      
      <Separator className="mb-4" />
      
      {/* Main tabs component with proper nesting */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="mb-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            {showTeacherResources() && (
              <TabsTrigger value="resources">Teacher Resources</TabsTrigger>
            )}
          </TabsList>
        </div>
        
        {/* Content tab */}
        <TabsContent value="content" className="flex-1 flex flex-col">
          {/* Navigation controls */}
          <div className="flex justify-between mb-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Back to Books</span>
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={toggleFullscreen}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span className="hidden md:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span className="hidden md:inline">Fullscreen</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        
          {/* Slider with images */}
          <div className="relative h-full">
            <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
              {materials.map((material, index) => {
                const imagePath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
                
                // Check for video content using multiple indicators
                const isVideo = material.content.toLowerCase().includes('video') || 
                               material.content.toLowerCase().endsWith('.mp4') ||
                               (material.title && material.title.toLowerCase().includes('video')) ||
                               (material.description && material.description.toLowerCase().includes('video')) ||
                               material.contentType === 'VIDEO' ||
                               material.contentType === 'video';
                               
                // Log video detection for debugging
                if (isVideo) {
                  console.log(`Video detected: ${material.content}`, {
                    contentType: material.contentType,
                    title: material.title,
                    description: material.description
                  });
                }
                
                // Check if the current user is an admin
                const isAdmin = user?.role === 'admin';
                
                // Premium content conditions:
                // 1. Regular slides: index >= freeSlideLimit and !hasPaidAccess and not admin
                // 2. ALL videos: isVideo and !hasPaidAccess and not admin  
                const isPremiumContent = (index >= freeSlideLimit || isVideo) && !hasPaidAccess && !isAdmin;
                
                // Log premium content decision for debugging
                if ((index >= freeSlideLimit || isVideo) && isAdmin) {
                  console.log(`Admin bypass for premium content: ${material.content}`);
                }
                
                return (
                  <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                    {/* Question-Answer section above image - Only show if a question exists */}
                    {(() => {
                      // First check if we have a question from our Q&A mapping system
                      const qa = getQuestionAnswer(material);
                      
                      // Check if question data exists (either from mapping or title format)
                      const hasQuestion = qa.hasData || 
                                         (material.title && (material.title.includes('?') || material.title.includes('→')));
                      
                      // If no question data exists for this image, don't render the Q&A section at all
                      if (!hasQuestion) return null;
                      
                      // Otherwise, render the Q&A section
                      return (
                        <div className="mb-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm mx-auto z-10 max-w-2xl border border-blue-100">
                          <div className="flex flex-col gap-0.5">
                            {(() => {
                              // Display data from our Q&A mapping if available
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
                              
                              // Check for question format
                              if (material.title.includes('?')) {
                                return (
                                  <>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-blue-700 min-w-[24px]">Q:</span>
                                      <span className="text-gray-800 text-base">{material.title}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <span className="font-bold text-indigo-700 min-w-[24px]">A:</span>
                                      <span className="font-medium text-indigo-900 text-base">{material.description || ''}</span>
                                    </div>
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
                      );
                    })()}
                    
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
                        />
                      ) : (
                        // Regular image
                        <img
                          src={imagePath}
                          alt={material.title || `Slide ${index + 1}`}
                          className="max-h-full max-w-full object-contain mx-auto shadow-lg"
                          loading="lazy"
                        />
                      )}
                    </div>
                    
                    {/* Slide number indicator */}
                    <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                      {index + 1} / {materials.length}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </TabsContent>
        
        {/* Resources tab */}
        {showTeacherResources() && (
          <TabsContent value="resources" className="flex-1">
            <div className="mb-4">
              <Tabs defaultValue="videos">
                <TabsList>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="games">Games</TabsTrigger>
                  <TabsTrigger value="pdfs">PDFs</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                </TabsList>
                
                {/* Videos Content */}
                <TabsContent value="videos">
                  <ResourceList 
                    resources={videoResources} 
                    onSearch={() => {}} 
                    readOnly={true}
                    hideTabsInContentViewer={true}
                  />
                </TabsContent>
                
                {/* Games Content */}
                <TabsContent value="games">
                  <ResourceList 
                    resources={wordwallGames} 
                    onSearch={() => {}} 
                    readOnly={true}
                    hideTabsInContentViewer={true}
                  />
                </TabsContent>
                
                {/* PDFs Content */}
                <TabsContent value="pdfs">
                  <ResourceList 
                    resources={pdfResources} 
                    onSearch={() => {}} 
                    readOnly={true}
                    hideTabsInContentViewer={true}
                  />
                </TabsContent>
                
                {/* Lesson Plans Content */}
                <TabsContent value="lessons">
                  <SideBySideLessonPlanView 
                    resources={lessonPlans} 
                    bookId={bookId} 
                    unitId={unitId}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}