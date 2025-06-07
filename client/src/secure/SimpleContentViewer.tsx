import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2, Home, Trash2, Save, X, Edit, PenTool, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useExcelQA } from '@/hooks/use-excel-qa';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cleanQuestionText, cleanAnswerText, formatDisplayText, removePrefixes } from '@/lib/textCleaners';
import { encodeS3Path, createS3ImageUrl, extractQuestionCode, filenameToTitle } from '@/lib/imageUtils';
import QuestionEditor from '@/components/questions/QuestionEditor';

import { TeacherResourcesContainer } from '@/components/resources/TeacherResourcesContainer';
import { book1PdfResources, book1PdfResourcesByUnit } from '@/data/book1-pdf-resources';
import { book1LessonPlans, book1LessonPlansByUnit } from '@/data/book1-lesson-plans';

// Local helper function to replace the missing cleanLeadingPatterns function
const cleanLeadingPatterns = (text: string): string => {
  if (!text) return '';
  return formatDisplayText(text);
};

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
  const [isQuestionEditorOpen, setIsQuestionEditorOpen] = useState(false);
  const [currentQuestionData, setCurrentQuestionData] = useState<{
    id?: string;
    bookId: string;
    unitId: string;
    slideId: string;
    originalQuestion: string;
    originalAnswer: string;
    flagReason?: string;
  } | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
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
  } catch (error) {
    console.error("Authentication error:", error);
    
    // Fallback: try to fetch from storage
    try {
      const storedUser = JSON.parse(sessionStorage.getItem('velp_user') || localStorage.getItem('velp_user') || '{}');
      if (storedUser && storedUser.role === 'admin') {
        user = storedUser;
        isAdminUser = true;
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
  
  // Open question editor for the current material
  const openQuestionEditor = useCallback((material: S3Material, qa: { question: string, answer: string, hasData: boolean }) => {
    if (!material || !qa.hasData) return;
    
    setCurrentQuestionData({
      bookId: bookId || "",
      unitId: unitPath,
      slideId: material.id.toString(),
      originalQuestion: qa.question,
      originalAnswer: qa.answer
    });
    
    setIsQuestionEditorOpen(true);
  }, [bookId, unitPath]);
  
  // Handle saving edited questions
  const handleSaveQuestion = useCallback((updatedQuestion: any) => {
    toast({
      title: "Question Updated",
      description: "The question has been successfully updated.",
    });
    
    // You would normally refetch the data or update the local state
    // For now, we'll close the editor and let the page refresh to show changes
    setIsQuestionEditorOpen(false);
    setCurrentQuestionData(null);
  }, [toast]);
  
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
      if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        if (currentIndex > 0) goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        if (currentIndex < materials.length - 1) goToSlide(currentIndex + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(materials.length - 1);
      } else if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'F11') {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      } else if (e.key === '?') {
        e.preventDefault();
        setShowKeyboardHelp(!showKeyboardHelp);
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
  // Use Excel QA hook for Q&A data only
  const { findMatchingQA } = useExcelQA(bookId || "1");
  const currentUnitId = unitPath;
  
  // Simple Excel-only Q&A function
  const getQuestionAnswer = (material: S3Material) => {
    const defaultResult = { country: "", question: "", answer: "", hasData: false };
    
    if (!material.content) {
      return defaultResult;
    }
    
    // Check if this slide should be blank by design
    const filenameOnly = material.content.split('/').pop() || material.content;
    const lowerFilename = filenameOnly.toLowerCase();
    
    if (
      lowerFilename.includes('00 a') || // Title slides
      lowerFilename.endsWith('.pdf') || // PDF files
      lowerFilename.includes('video') || // Video resources
      lowerFilename.includes('game') || // Game resources
      lowerFilename.includes('wordwall') || // Wordwall games
      lowerFilename.startsWith('00') // Other intro resources
    ) {
      return { ...defaultResult, generatedBy: 'blank-by-design' };
    }
    
    // EXCEL-ONLY: Use only Excel-based Q&A data
    const matchingQA = findMatchingQA(material.content, currentUnitId);
    
    if (matchingQA) {
      return {
        country: "",
        question: matchingQA.question,
        answer: matchingQA.answer,
        hasData: true
      };
    }
    
    // Return default if no Excel match found
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
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-blue-50' : 'rounded-xl shadow-xl border border-slate-200 bg-white overflow-hidden'}`}
    >
      {/* Enhanced Header with Gradient */}
      <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 flex justify-between items-center ${isFullscreen ? 'sticky top-0 z-10 shadow-lg' : 'rounded-t-xl'}`}>
        <div className="flex items-center">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => navigate(`/books/${bookId}`)}
            className="text-white/80 hover:text-white hover:bg-white/10 mr-4 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Books
          </Button>
          <div className="flex items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 mr-3">
              <span className="text-white/90 text-sm font-medium">Book {bookId}</span>
            </div>
            <h3 className="text-xl font-semibold text-white">
              {unitData?.title || `Unit ${unitNumber}`}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Show regular controls when not in edit mode */}
          {!isEditMode ? (
            <>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-white/90 text-sm font-medium">
                  {currentIndex + 1} / {materials.length}
                </span>
              </div>
              
              {/* Only show edit button for admins */}
              {user?.role === 'admin' && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setIsEditMode(true)}
                  className="text-white/80 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                  title="Delete Slides"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              {/* Keyboard shortcuts help button */}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                title="Keyboard Shortcuts (?)"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              {/* Edit mode controls - Simplified */}
              {slidesToDelete.size > 0 && (
                <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full font-medium">
                  {slidesToDelete.size} selected
                </span>
              )}
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={cancelEditing}
                className="text-gray-600"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => saveSlideDeletesMutation.mutate()}
                className={`${slidesToDelete.size > 0 ? 'text-red-600' : 'text-gray-400'}`}
                disabled={slidesToDelete.size === 0 || saveSlideDeletesMutation.isPending}
                title="Save Changes"
              >
                {saveSlideDeletesMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Slider with images */}
      <div className="relative h-full">
        <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
          {materials.map((material, index) => {
            // Use our improved image path handling utility
            const imagePath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, material.content);
            
            // Check for video content using multiple indicators
            const isVideo = material.content.toLowerCase().includes('video') || 
                           material.content.toLowerCase().endsWith('.mp4') ||
                           (material.title && material.title.toLowerCase().includes('video')) ||
                           (material.description && material.description.toLowerCase().includes('video')) ||
                           material.contentType === 'VIDEO' ||
                           material.contentType === 'video';
            
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
                  
                  // Enhanced check for blank questions - if the question is blank after removing prefixes, don't show anything
                  const cleanedQuestion = removePrefixes(qa.question).trim();
                  
                  // Check if this is a slide that should be blank (no question)
                  // Simplified logic focused on file extensions and common prefixes
                  const contentLower = material.content.toLowerCase();
                  const filenamePart = contentLower.split('/').pop() || contentLower;
                  
                  // Debug info
                  console.log(`Checking if slide should be blank: ${filenamePart}`);
                  
                  // Clear rules for what makes a blank slide (no question)
                  const isBlankByDesign = 
                    filenamePart.includes('00 a') ||     // Title slides
                    filenamePart.endsWith('.pdf') ||     // PDF files
                    filenamePart.endsWith('.mp4') ||     // Video files
                    filenamePart.endsWith('.swf') ||     // Flash files
                    filenamePart.includes('video') ||    // Video resources
                    filenamePart.includes('game') ||     // Game resources
                    filenamePart.includes('wordwall') || // Wordwall games
                    filenamePart.startsWith('00');       // Intro resources
                    
                  // Additional check for Book 1 Unit 2
                  const isBook1Unit2 = bookId === "1" && unitPath === "unit2";
                  
                  // For Book 1 Unit 2, make sure school objects show questions
                  const forceShowQuestion = isBook1Unit2 && 
                                         filenamePart.includes('01 e') && 
                                         (filenamePart.includes('pen') || 
                                          filenamePart.includes('pencil') ||
                                          filenamePart.includes('ruler') ||
                                          filenamePart.includes('book') ||
                                          filenamePart.includes('scissors') ||
                                          filenamePart.includes('eraser'));
                                          
                  const finalIsBlank = isBlankByDesign && !forceShowQuestion;
                  
                  if (finalIsBlank) {
                    console.log(`Slide will be blank (by design): ${filenamePart}`);
                  }
                  
                  // If no question data exists for this image, or if question is empty after cleaning, 
                  // or if slide is designated as blank by design, don't render the Q&A section at all
                  if (!hasQuestion || !cleanedQuestion || finalIsBlank) return null;
                  
                  // Otherwise, render the Q&A section
                  return (
                    <div className="mb-6 mx-auto z-10 max-w-4xl px-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        {/* Try to extract Q&A data */}
                        {qa.hasData && (
                          <>
                            {qa.country && (
                              <div className="mb-3 text-center">
                                <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                  {qa.country}
                                </div>
                              </div>
                            )}
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-slate-800 text-lg font-semibold flex-grow leading-relaxed">
                                {/* Apply our improved question text cleaning to remove codes and format properly */}
                                {cleanQuestionText(removePrefixes(qa.question))}
                              </div>
                              {/* Only show edit button if user is admin or teacher */}
                              {(isAdminUser || user?.role === 'teacher') && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 opacity-70 hover:opacity-100 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openQuestionEditor(material, qa);
                                  }}
                                  title="Edit question/answer"
                                >
                                  <PenTool className="h-4 w-4 text-blue-600" />
                                </Button>
                              )}
                            </div>
                            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-400">
                              <div className="text-slate-700 text-lg font-medium leading-relaxed">
                                {/* Apply our improved answer text cleaning to remove codes and format properly */}
                                {cleanAnswerText(removePrefixes(qa.answer))}
                              </div>
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
                                  {cleanQuestionText(question)}
                                </div>
                                <div className="mt-2 font-medium text-gray-900 text-base">
                                  {cleanAnswerText(answer)}
                                </div>
                              </>
                            );
                          })()
                        )}
                        
                        {/* Check for question mark format */}
                        {material.title && material.title.includes('?') && !qa.hasData && !material.title.includes('→') && (
                          <>
                            <div className="text-gray-800 text-base font-medium">
                              {cleanQuestionText(material.title)}
                            </div>
                            {material.description && (
                              <div className="mt-2 font-medium text-gray-900 text-base">
                                {cleanAnswerText(material.description)}
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* Default case - just show title if not starting with "Content from" */}
                        {material.title && !material.title.includes('?') && !material.title.includes('→') && !qa.hasData && 
                         !material.title.startsWith('Content from') && (
                          <div className="text-gray-800 text-base font-medium">
                            {cleanLeadingPatterns(material.title)}
                          </div>
                        )}
                        
                        {/* Show description if not shown as answer */}
                        {material.description && !material.title.includes('?') && !material.title.includes('→') && !qa.hasData && (
                          <div className="mt-2 font-medium text-gray-900 text-base">
                            {cleanLeadingPatterns(material.description)}
                          </div>
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
                    <div className="relative group">
                      <img 
                        src={imagePath}
                        alt={material.title || `Slide ${index + 1}`}
                        className="max-h-full max-w-full object-contain mx-auto shadow-2xl rounded-lg border border-white/30 transition-all duration-300 group-hover:shadow-3xl"
                        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
                      />
                      {/* Image loading placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse rounded-lg -z-10"></div>
                    </div>
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
      
      {/* Enhanced slide thumbnail reel with progress */}
      <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
        {/* Progress indicator */}
        <div className="w-full bg-slate-200 h-1">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / materials.length) * 100}%` }}
          />
        </div>
        
        {/* Thumbnail navigation */}
        <div className="overflow-x-auto py-4 px-4">
          <div className="flex space-x-3 min-w-max">
            {materials.map((material, index) => {
              // Use our improved image path handling utility
              const thumbnailPath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, material.content);
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
                    className={`relative flex-shrink-0 w-24 h-18 border-3 transition-all duration-300 transform hover:scale-105 ${
                      isMarkedForDeletion
                        ? 'border-red-500 opacity-50' 
                        : currentIndex === index 
                          ? 'border-blue-500 shadow-xl ring-2 ring-blue-200' 
                          : 'border-slate-300 hover:border-blue-400 hover:shadow-lg'
                    } rounded-lg overflow-hidden bg-white`}
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
      </div>
      
      {/* Teacher Resources Section */}
      {user && bookId && unitNumber && (
        <div className="mt-8 border-t pt-6">
          
          <Tabs defaultValue="videos" className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList className="flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-1 text-indigo-700 shadow-sm">
                <TabsTrigger 
                  value="videos" 
                  className="px-4 py-1.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Videos
                </TabsTrigger>
                <TabsTrigger 
                  value="games" 
                  className="px-4 py-1.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  Games
                </TabsTrigger>
                {bookId === '1' && unitNumber === '1' && (
                  <TabsTrigger 
                    value="pdfs" 
                    className="px-4 py-1.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      <path d="M8 11a1 1 0 100-2H7a1 1 0 000 2h1zm2 0a1 1 0 100-2 1 1 0 000 2zm-2 2a1 1 0 110 2H7a1 1 0 110-2h1zm2 0a1 1 0 110 2h-1a1 1 0 110-2h1z" />
                    </svg>
                    PDFs
                  </TabsTrigger>
                )}
                <TabsTrigger 
                  value="lessons" 
                  className="px-4 py-1.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Lessons
                </TabsTrigger>

              </TabsList>
            </div>
            <TabsContent value="videos" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">Educational Videos</h3>
                {/* Videos Tab - These should be videos from TeacherResources */}
                {bookId && unitNumber ? (
                  <>
                    <div id="video-resources-container">
                      <TeacherResourcesContainer 
                        initialBookId={bookId as any} 
                        initialUnitId={unitNumber?.toString() as any} 
                        key={`${bookId}-${unitNumber}-videos`}
                        readOnly={true}
                        initialFilter={{ resourceType: 'video', searchQuery: '' }}
                        hideTabsInContentViewer={true}
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-red-50 text-red-700 rounded">
                    Error: Missing bookId or unitNumber. Cannot load video resources.
                  </div>
                )}
                {/* Legacy example of hard-coded video */}
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
                <h3 className="text-lg font-medium text-center">Interactive Games</h3>
                {/* Games Tab - These should be games from TeacherResources */}
                {bookId && unitNumber ? (
                  <>
                    <div id="game-resources-container">
                      <TeacherResourcesContainer 
                        initialBookId={bookId as any} 
                        initialUnitId={unitNumber?.toString() as any} 
                        key={`${bookId}-${unitNumber}-games`}
                        readOnly={true}
                        initialFilter={{ resourceType: 'game', searchQuery: '' }}
                        hideTabsInContentViewer={true}
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-red-50 text-red-700 rounded">
                    Error: Missing bookId or unitNumber. Cannot load game resources.
                  </div>
                )}
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
                <h3 className="text-lg font-medium text-center">Lesson Plans</h3>
                {bookId === '1' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {unitNumber && book1LessonPlansByUnit[unitNumber] ? (
                      book1LessonPlansByUnit[unitNumber].map((resource) => {
                        const lessonPlan = resource.lessonPlan;
                        if (!lessonPlan) return null;
                        
                        return (
                          <div 
                            key={resource.id} 
                            className="border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-200">
                            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                  </svg>
                                  {lessonPlan.title}
                                </h4>
                                <span className="bg-white text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">{lessonPlan.duration}</span>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="mb-2">
                                <h5 className="text-xs font-medium text-teal-800 mb-1">Objectives:</h5>
                                <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                                  {lessonPlan.objectives.slice(0, 3).map((objective: string, index: number) => (
                                    <li key={index}>{objective}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <h5 className="text-xs font-medium text-teal-800 mb-1 mt-3">Lesson Steps:</h5>
                              <ul className="space-y-2 text-sm">
                                {lessonPlan.steps.map((step: any, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <div className="bg-teal-100 text-teal-700 rounded-full p-1 mt-0.5 mr-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <span>
                                      <span className="font-medium text-teal-800">{step.title}:</span> {step.description} <span className="text-xs text-gray-500">({step.duration})</span>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              
                              {lessonPlan.materials && lessonPlan.materials.length > 0 && (
                                <div className="mt-3">
                                  <h5 className="text-xs font-medium text-teal-800 mb-1">Materials:</h5>
                                  <p className="text-xs text-gray-600">{lessonPlan.materials.join(', ')}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="md:col-span-2 text-center py-8 text-gray-500">
                        No lesson plans available for Unit {unitNumber}
                      </div>
                    )}
                  </div>
                )}
                {bookId !== '1' && (
                  <p className="text-center py-8 text-gray-500">Lesson plans for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="pdfs" className="p-4 border rounded-md">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">PDF Lesson Materials</h3>
                {bookId === '1' && unitNumber === '1' && (
                  <div id="pdf-resources-container">
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Book 1 Unit 1 PDF Resources:</h4>
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {book1PdfResources.filter(resource => resource.unitId === '1').map((resource) => (
                          <div 
                            key={resource.id} 
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer"
                            onClick={() => window.open(resource.sourceUrl, '_blank')}
                          >
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-white">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-xs flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                  Unit {resource.unitId}
                                </h4>
                                <span className="bg-white text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium">PDF</span>
                              </div>
                            </div>
                            <div className="p-2">
                              <div className="flex items-center text-blue-600 text-xs font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Download
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {unitNumber === '1' && book1PdfResourcesByUnit[unitNumber] && book1PdfResourcesByUnit[unitNumber].length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Unit PDFs:</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          {book1PdfResourcesByUnit[unitNumber].map((resource) => (
                            <div 
                              key={resource.id} 
                              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer"
                              onClick={() => window.open(resource.sourceUrl, '_blank')}
                            >
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                    {resource.title}
                                  </h4>
                                  <span className="bg-white text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">PDF</span>
                                </div>
                              </div>
                              <div className="p-3 text-sm">
                                <p className="text-gray-600">{resource.description}</p>
                                <div className="mt-3 flex justify-end">
                                  <button className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Download PDF
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {bookId !== '1' && (
                  <p className="text-center py-8 text-gray-500">PDF resources for Book {bookId}, Unit {unitNumber} will appear here.</p>
                )}
              </div>
            </TabsContent>
            
            {/* Downloads section has been removed */}
          </Tabs>
        </div>
      )}
      
      {/* Keyboard Shortcuts Help Overlay */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Keyboard Shortcuts</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowKeyboardHelp(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Next slide</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">→ or L</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Previous slide</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">← or H</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">First slide</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Home</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Last slide</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">End</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Toggle fullscreen</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">F or F11</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Exit fullscreen</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Esc</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Show this help</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">?</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}