import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2, Home, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useExcelQA } from '@/hooks/use-excel-qa';
import { getQuestionAnswer as getPatternEngineQA } from '@/lib/qa-pattern-engine';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [slidesToDelete, setSlidesToDelete] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  
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
  
  // Authentication with admin detection
  let user = null;
  let isAdminUser = false;
  
  // First try the auth hook
  try {
    const { user: authUser } = useAuth();
    user = authUser;
    isAdminUser = user?.role === 'admin';
    
    if (isAdminUser) {
      console.log("Admin user detected via auth hook:", user);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    
    // Fallback: try to fetch from storage
    try {
      const storedUser = JSON.parse(sessionStorage.getItem('velp_user') || localStorage.getItem('velp_user') || '{}');
      if (storedUser && storedUser.role === 'admin') {
        user = storedUser;
        isAdminUser = true;
        console.log("Admin user detected via storage fallback:", user);
      }
    } catch (storageError) {
      console.error("Storage access error:", storageError);
    }
  }
  
  // Admin users always have access to all content
  const hasPaidAccess = Boolean(user) || isAdminUser;
  
  // Book specific slide limits (only for non-admin users)
  const freeSlideLimit = isAdminUser ? 999 : /^0[a-c]$/i.test(bookId || '') ? 2 : 10;
  
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
  
  // Fetch content edits to see which slides have been deleted
  const {
    data: contentEdits,
    isLoading: editsLoading
  } = useQuery({
    queryKey: [`/api/direct/content-edits/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath && user?.id)
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
  
  // Toggle slide for deletion
  const toggleSlideForDeletion = useCallback((index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the slide navigation
    
    setSlidesToDelete(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);
  
  // Cancel editing mode and clear slides to delete
  const cancelEditing = useCallback(() => {
    setIsEditMode(false);
    setSlidesToDelete(new Set());
  }, []);
  
  // Mutation for saving slide deletions
  const saveSlideDeletesMutation = useMutation({
    mutationFn: async () => {
      const materialIdsToDelete = Array.from(slidesToDelete).map(index => materials[index].id);
      
      if (materialIdsToDelete.length === 0) {
        throw new Error('No slides selected for deletion');
      }
      
      const result = await apiRequest('POST', `/api/content/${bookPath}/${unitPath}/delete-slides`, {
        materialIds: materialIdsToDelete
      });
      
      return result.json();
    },
    onSuccess: () => {
      // Remove deleted slides from local state
      setMaterials(prev => 
        prev.filter((_, index) => !slidesToDelete.has(index))
      );
      
      // Reset delete selection
      setSlidesToDelete(new Set());
      setIsEditMode(false);
      
      // Show success message
      toast({
        title: "Slides deleted successfully",
        description: `${slidesToDelete.size} slide${slidesToDelete.size > 1 ? 's' : ''} removed.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete slides",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
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
  // Use our enhanced Excel QA hook to get better pattern matching
  const { findMatchingQA } = useExcelQA(bookId || "1");
  const currentUnitId = unitPath; // Use unitPath instead of unitId
  
  const getQuestionAnswer = (material: S3Material) => {
    // Default return value if no match is found
    const defaultResult = { country: "", question: "", answer: "", hasData: false };
    
    // Enable debug logging
    const DEBUG_ENABLED = true;
    const logDebug = (message: string) => {
      if (DEBUG_ENABLED) {
        console.log(`[SimpleContentViewer Q&A] ${message}`);
      }
    };
    
    if (!material.content) {
      return defaultResult;
    }
    
    // -------- APPROACH 1: Check for direct dash patterns in the content filename --------
    const filename = material.content;
    logDebug(`Processing Q&A for: ${filename}`);
    
    // Enhanced dash pattern detection with alternate dash characters
    const dashPattern = /([^-–—]+)\s*[-–—]\s*(.+?)(\.(png|jpg|jpeg|gif|webp|mp4)|$)/i;
    const dashMatch = filename.match(dashPattern);
    
    if (dashMatch && dashMatch[1] && dashMatch[2]) {
      const question = dashMatch[1].trim();
      const answer = dashMatch[2].trim();
      
      // Make sure both parts look valid (at least 2 characters each)
      if (question.length > 2 && answer.length > 2) {
        logDebug(`✅ DIRECT DASH PATTERN found in filename: "${question}" - "${answer}"`);
        
        // Format the Q&A properly
        const formattedQuestion = question.endsWith('?') ? question : question + '?';
        const formattedAnswer = answer.endsWith('.') ? answer : answer + '.';
        
        return {
          country: "", // Leave blank as we don't know the country from dash pattern
          question: formattedQuestion, 
          answer: formattedAnswer,
          hasData: true
        };
      }
    }
    
    // -------- APPROACH 2: Use the enhanced Excel pattern matching system --------
    // Use the currentUnitId defined at the top of the component
    const matchingQA = findMatchingQA(filename, currentUnitId);
    
    if (matchingQA) {
      logDebug(`✅ FOUND MATCH using enhanced Excel QA hook: ${matchingQA.question}`);
      
      // Determine country if available
      let country = "";
      if (filename.toLowerCase().includes('poland') || filename.match(/\b01\s*r\b/i)) {
        country = "POLAND";
      } else if (filename.toLowerCase().includes('britain') || 
                filename.toLowerCase().includes('uk') || 
                filename.match(/\b02\s*n\b/i)) {
        country = "BRITAIN / UK";
      }
      
      return {
        country,
        question: matchingQA.question,
        answer: matchingQA.answer,
        hasData: true
      };
    }
    
    // -------- APPROACH 3: Fall back to the pattern engine for generated questions --------
    const patternEngineResult = getPatternEngineQA(filename, currentUnitId);
    
    if (patternEngineResult && patternEngineResult.question) {
      logDebug(`✅ FOUND MATCH using pattern engine: ${patternEngineResult.question}`);
      
      // Determine country if available
      let country = "";
      if (filename.toLowerCase().includes('poland')) {
        country = "POLAND";
      } else if (filename.toLowerCase().includes('britain') || filename.toLowerCase().includes('uk')) {
        country = "BRITAIN / UK";
      }
      
      return {
        country,
        question: patternEngineResult.question,
        answer: patternEngineResult.answer,
        hasData: true
      };
    }
    
    // -------- APPROACH 4: Check title for question format (Q&A in title) --------
    if (material.title && material.title.includes('?')) {
      const titleQuestion = material.title.trim();
      const titleAnswer = material.description || "";
      
      if (titleQuestion.length > 2 && titleAnswer.length > 2) {
        logDebug(`✅ FOUND Q&A in title/description: ${titleQuestion}`);
        
        return {
          country: "",
          question: titleQuestion,
          answer: titleAnswer,
          hasData: true
        };
      }
    }
    
    // No match found in any system
    logDebug(`❌ No Q&A match found for: ${filename}`);
    return defaultResult;
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
            onClick={() => navigate(`/books/${bookId}`)}
            className="mr-2 border-blue-200 hover:bg-blue-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Units
          </Button>
          <h3 className="text-lg font-medium">
            {unitData?.title || `Book ${bookId}, Unit ${unitNumber}`}
          </h3>
          
          {/* Admin badge and management link if user is admin */}
          {user?.role === 'admin' && (
            <div className="ml-3 flex items-center">
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full mr-2">
                Admin Access
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate(`/admin/book-units/${bookId}`)}
                className="text-xs border-purple-200 hover:bg-purple-50 text-purple-700"
              >
                Manage Unit
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Show regular controls when not in edit mode */}
          {!isEditMode ? (
            <>
              <span className="text-sm text-gray-500">
                Slide {currentIndex + 1} of {materials.length}
              </span>
              
              {/* Only show edit button for admins */}
              {user?.role === 'admin' && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsEditMode(true)}
                  className="border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Slides
                </Button>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-blue-200 hover:bg-blue-50"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </>
          ) : (
            <>
              {/* Edit mode controls */}
              <span className="text-sm text-red-500 font-medium">
                {slidesToDelete.size} slide{slidesToDelete.size !== 1 ? 's' : ''} selected for deletion
              </span>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={cancelEditing}
                className="border-gray-200 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              
              <Button 
                size="sm" 
                variant="default"
                onClick={() => saveSlideDeletesMutation.mutate()}
                disabled={slidesToDelete.size === 0 || saveSlideDeletesMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {saveSlideDeletesMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save Changes
              </Button>
            </>
          )}
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
                content: material.content,
                title: material.title,
                contentType: material.contentType
              });
            }
            
            // Premium content check (based on index and content type)
            const isPremiumContent = (index >= freeSlideLimit || isVideo) && !hasPaidAccess;
            
            return (
              <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                {/* Question-Answer section above image - Only show if a question exists */}
                {(() => {
                  // First check if we have a question from our Q&A mapping system
                  const qa = getQuestionAnswer(material);
                  
                  // Check if question data exists (either from mapping or title format)
                  const hasQuestion = (qa.hasData && qa.question.trim() !== '') || 
                                      (material.title && (material.title.includes('?') || material.title.includes('→')));
                  
                  // If no question data exists for this image, or if question is empty, don't render the Q&A section at all
                  if (!hasQuestion || !qa.question.trim()) return null;
                  
                  // Otherwise, render the Q&A section
                  return (
                    <div className="mb-1 p-2 mx-auto z-10 max-w-2xl">
                      <div className="flex flex-col items-center text-center">
                        {/* Try to extract Q&A data */}
                        {qa.hasData && (
                          <>
                            {qa.country && (
                              <div className="mb-1 text-center">
                                <h3 className="text-base font-bold text-gray-900">
                                  {qa.country}
                                </h3>
                              </div>
                            )}
                            <div className="text-gray-800 text-base font-medium">
                              {/* Remove any numbering from questions */}
                              {qa.question.replace(/^\d+\.\s*/, '')}
                            </div>
                            <div className="mt-2 font-medium text-gray-900 text-base">
                              {/* Remove any numbering from answers */}
                              {qa.answer.replace(/^\d+\.\s*/, '')}
                            </div>
                          </>
                        )}
                        
                        {/* Check for arrow format (question → answer) */}
                        {material.title && material.title.includes('→') && !qa.hasData && (
                          (() => {
                            const [question, answer] = material.title.split('→').map(part => part.trim());
                            return (
                              <>
                                <div className="text-gray-800 text-base font-medium">
                                  {question}
                                </div>
                                <div className="mt-2 font-medium text-gray-900 text-base">
                                  {answer}
                                </div>
                              </>
                            );
                          })()
                        )}
                        
                        {/* Check for question mark format */}
                        {material.title && material.title.includes('?') && !qa.hasData && !material.title.includes('→') && (
                          <>
                            <div className="text-gray-800 text-base font-medium">
                              {material.title}
                            </div>
                            {material.description && (
                              <div className="mt-2 font-medium text-gray-900 text-base">
                                {material.description}
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* Default case - just show title if not starting with "Content from" */}
                        {material.title && !material.title.includes('?') && !material.title.includes('→') && !qa.hasData && 
                         !material.title.startsWith('Content from') && (
                          <div className="text-gray-800 text-base font-medium">
                            {material.title}
                          </div>
                        )}
                        
                        {/* Show description if not shown as answer */}
                        {material.description && !material.title.includes('?') && !material.title.includes('→') && !qa.hasData && (
                          <div className="mt-2 font-medium text-gray-900 text-base">{material.description}</div>
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
                  {isVideo ? (
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
      
      {/* Slide thumbnail reel */}
      <div className="w-full overflow-x-auto py-3 px-2 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2 min-w-max">
          {materials.map((material, index) => {
            const thumbnailPath = `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
            const isVideo = material.content.toLowerCase().includes('video') || 
                          material.content.toLowerCase().endsWith('.mp4');
            
            // Check if premium content (similar logic as above)
            const isAdmin = user?.role === 'admin';
            const isPremiumContent = (index >= freeSlideLimit || isVideo) && !hasPaidAccess && !isAdmin;
            
            // Check if this slide is marked for deletion
            const isMarkedForDeletion = slidesToDelete.has(index);
            
            return (
              <div
                key={`thumb-${index}`}
                className="relative flex-shrink-0"
              >
                <button
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-20 h-16 border-2 transition-all duration-200 ${
                    isMarkedForDeletion
                      ? 'border-red-500 opacity-50' 
                      : currentIndex === index 
                        ? 'border-blue-500 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300'
                  } rounded overflow-hidden`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {isPremiumContent && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="bg-black/60 text-white text-xs p-1 rounded">
                        Premium
                      </div>
                    </div>
                  )}
                  
                  {isMarkedForDeletion && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10">
                      <div className="bg-red-500 text-white text-xs p-1 rounded">
                        Delete
                      </div>
                    </div>
                  )}
                  
                  {isVideo ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={thumbnailPath}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  )}
                  
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1 rounded-tl">
                    {index + 1}
                  </div>
                </button>
                
                {/* Delete toggle button - only shown in edit mode */}
                {isEditMode && isAdmin && (
                  <button
                    onClick={(e) => toggleSlideForDeletion(index, e)}
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-20 ${
                      isMarkedForDeletion 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                    }`}
                    aria-label={isMarkedForDeletion ? "Unmark for deletion" : "Mark for deletion"}
                    title={isMarkedForDeletion ? "Unmark for deletion" : "Mark for deletion"}
                  >
                    {isMarkedForDeletion ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Teacher Resources Section */}
      {user && bookId && unitNumber && (
        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Teacher Resources</h2>
            <div className="text-sm text-gray-500">Resources for Book {bookId}, Unit {unitNumber}</div>
          </div>
          
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-50 p-1 text-indigo-700">
              <TabsTrigger 
                value="videos" 
                className="px-3 py-1 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="games" 
                className="px-3 py-1 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
                Games
              </TabsTrigger>
              <TabsTrigger 
                value="lessons" 
                className="px-3 py-1 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Lessons
              </TabsTrigger>
              <TabsTrigger 
                value="downloads" 
                className="px-3 py-1 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Downloads
              </TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Educational Videos</h3>
                {bookId === '1' && unitNumber === '5' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md hover:border-red-200">
                      <div className="relative">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium z-10">
                          Video
                        </div>
                        <iframe 
                          width="100%" 
                          height="215" 
                          src="https://www.youtube.com/embed/YkFXHZNMviE" 
                          title="Family Members Song for Kids" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="aspect-video"
                        ></iframe>
                      </div>
                      <div className="p-3 border-t">
                        <h4 className="font-medium text-red-700">Family Members Song</h4>
                        <p className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          A fun song to learn family vocabulary
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md hover:border-red-200">
                      <div className="relative">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium z-10">
                          Video
                        </div>
                        <iframe 
                          width="100%" 
                          height="215" 
                          src="https://www.youtube.com/embed/FHaObkHEkHQ" 
                          title="The Finger Family Song" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="aspect-video"
                        ></iframe>
                      </div>
                      <div className="p-3 border-t">
                        <h4 className="font-medium text-red-700">Finger Family Song</h4>
                        <p className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          Interactive finger family activity
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {!(bookId === '1' && unitNumber === '5') && (
                  <p className="text-center py-8 text-gray-500">Videos for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="games" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interactive Games</h3>
                {bookId === '1' && unitNumber === '5' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md hover:border-purple-200">
                      <div className="relative">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-bl-lg font-medium z-10">
                          Interactive
                        </div>
                        <iframe 
                          width="100%" 
                          height="300" 
                          src="https://wordwall.net/embed/09e4b2aae10a4db5b89a6be8be0d5ad1" 
                          title="Family Members Match-up" 
                          allow="fullscreen" 
                          className="aspect-video"
                        ></iframe>
                      </div>
                      <div className="p-3 border-t">
                        <h4 className="font-medium text-purple-800">Family Members Matching</h4>
                        <p className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                          </svg>
                          Match family member words to images
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {!(bookId === '1' && unitNumber === '5') && (
                  <p className="text-center py-8 text-gray-500">Games for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="lessons" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Lesson Plans</h3>
                {bookId === '1' && unitNumber === '5' && (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-200">
                      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            Lesson 1: Family Introduction
                          </h4>
                          <span className="bg-white text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">45 min</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Warm-up:</span> Show family photos and introduce vocabulary <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Present:</span> New words with flashcards <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Practice:</span> "Who's this?" - "This is my mother/father/etc." <span className="text-xs text-gray-500">(15 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Activity:</span> Draw your family tree <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-200">
                      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            Lesson 2: Family Members
                          </h4>
                          <span className="bg-white text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">45 min</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Review:</span> Family vocabulary with song <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Activity:</span> Family tree craft <span className="text-xs text-gray-500">(15 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Game:</span> Family members memory match <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span><span className="font-medium text-teal-800">Worksheet:</span> Label family pictures <span className="text-xs text-gray-500">(10 min)</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {!(bookId === '1' && unitNumber === '5') && (
                  <p className="text-center py-8 text-gray-500">Lesson plans for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="downloads" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Downloadable Resources</h3>
                {bookId === '1' && unitNumber === '5' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <a href="#" className="block group hover:no-underline">
                      <div className="flex items-center p-3 border rounded-lg transition-all duration-200 hover:border-blue-300 hover:shadow-sm group-hover:bg-blue-50">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 group-hover:text-blue-700">Family Vocabulary PDF</h4>
                          <p className="text-xs text-gray-500">Printable flashcards and worksheets</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="block group hover:no-underline">
                      <div className="flex items-center p-3 border rounded-lg transition-all duration-200 hover:border-green-300 hover:shadow-sm group-hover:bg-green-50">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg mr-3 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 group-hover:text-green-700">Family Tree Template</h4>
                          <p className="text-xs text-gray-500">Interactive family tree worksheet</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
                {!(bookId === '1' && unitNumber === '5') && (
                  <p className="text-center py-8 text-gray-500">Resources for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}