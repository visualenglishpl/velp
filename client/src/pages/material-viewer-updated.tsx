import { useParams, useLocation } from 'wouter';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { AlertCircle, ArrowLeft, Check, ChevronLeft, ChevronRight, Download, ExternalLink, FileText, Lock, Maximize, Menu, Pencil, Plus, X, Youtube } from 'lucide-react';

// Define our types based on the backend schemas
interface Material {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: 'IMAGE' | 'VIDEO' | 'PDF' | 'GAME' | 'audio' | 'video' | 'document' | 'lesson' | 'exercise' | 'quiz';
  content: string;
  orderIndex: number;
  isPublished: boolean;
  isLocked: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Unit {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Book {
  id: number;
  bookId: string;
  title: string;
  description?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MaterialViewer() {
  const { unitId, materialId } = useParams();
  const initialMaterialIndex = materialId ? parseInt(materialId) : 0;
  
  // Fetch unit and book data
  const { data: unit } = useQuery<Unit>({
    queryKey: [`/api/units/${unitId}`],
    enabled: !!unitId,
  });
  
  const { data: book } = useQuery<Book>({
    queryKey: [`/api/books/${unit?.bookId}`],
    enabled: !!unit?.bookId,
  });
  
  // Fetch materials for this unit
  const { data: materials = [], isLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    startIndex: initialMaterialIndex,
  });
  
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });
  
  // State management
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialMaterialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  
  const totalSlides = materials.length;
  const currentMaterial = materials[currentSlideIndex];
  
  // Track viewed slides
  useEffect(() => {
    if (currentMaterial?.id && !viewedSlides.includes(currentMaterial.id)) {
      setViewedSlides(prev => [...prev, currentMaterial.id]);
    }
  }, [currentMaterial, viewedSlides]);
  
  // Methods for controlling the carousel
  const navigateToSlide = useCallback((index: number) => {
    if (emblaApi && index >= 0 && index < totalSlides) {
      emblaApi.scrollTo(index);
      setCurrentSlideIndex(index);
    }
  }, [emblaApi, totalSlides]);
  
  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;
    
    emblaApi.on('select', () => {
      setCurrentSlideIndex(emblaApi.selectedScrollSnap());
      const selected = emblaApi.selectedScrollSnap();
      thumbsApi.scrollTo(selected);
    });
    
    // Initialize with current slide
    if (initialMaterialIndex >= 0 && initialMaterialIndex < totalSlides) {
      navigateToSlide(initialMaterialIndex);
    } else if (totalSlides > 0) {
      navigateToSlide(0);
    }
    
    // Cleanup function 
    return () => {
      // No explicit need to remove event listeners 
      // emblaCarousel handles this automatically
    };
  }, [emblaApi, thumbsApi, totalSlides, navigateToSlide, initialMaterialIndex]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Space') {
        navigateToSlide(currentSlideIndex + 1);
      } else if (e.code === 'ArrowLeft') {
        navigateToSlide(currentSlideIndex - 1);
      } else if (e.code === 'Escape') {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, navigateToSlide]);
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };
  
  // Handle exit fullscreen event (e.g., when user presses Escape)
  useEffect(() => {
    const handleExitFullscreen = () => {
      if (document.fullscreenElement === null && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('fullscreenchange', handleExitFullscreen);
    return () => document.removeEventListener('fullscreenchange', handleExitFullscreen);
  }, [isFullscreen]);
  
  // Function to get icon based on content type
  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'VIDEO':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'PDF':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'GAME':
        return <div className="h-4 w-4 text-green-500">🎮</div>;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading materials...</p>
        </div>
      </div>
    );
  }
  
  // No materials state
  if (materials.length === 0) {
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
        
        <div className="flex flex-col items-center justify-center my-12">
          <div className="flex items-center justify-center mb-6 bg-gray-100 rounded-full w-16 h-16">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Slides Available</h2>
          <p className="text-gray-500 mb-4 text-center">There are no slides available for this lesson. This might be due to:</p>
          <ul className="space-y-2 text-gray-500 mb-6 list-disc pl-6">
            <li>Content is still being loaded from storage</li>
            <li>The slides are stored in a different format or location</li>
            <li>The unit content is not yet available</li>
          </ul>
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
        <div className="w-full max-w-3xl">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Teaching Guidance</h2>
            <p className="text-sm text-gray-500 mb-4">Unit-specific guidance for {book?.title}, Unit {unit?.unitNumber} - {unit?.title}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Presenting Questions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Show the question on the slide and point to any key image details (e.g. facial expressions, actions, background objects).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Clearly read the question aloud to the class — say it twice to help students process the language.</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Check Vocabulary Understanding</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Refer back to the textbook vocabulary section if available.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pause and explain any unfamiliar words using visuals, gestures, or simple definitions.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Ask Follow-up Questions</h3>
              <p className="text-sm mb-2">To reinforce comprehension:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"Why do you think so?"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"Can you describe it more?"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"What else can you see?"</span>
                </li>
              </ul>
              <p className="text-sm italic mt-2">Encourage full-sentence answers — especially with more advanced learners — and guide them toward more complete responses.</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Prompt Student Answers</h3>
              <p className="text-sm mb-2">Use structured sentence frames:</p>
              <div className="grid gap-y-1 gap-x-6 md:grid-cols-2 text-sm">
                <div>"Is it a cat or a dog?" → "It is a..."</div>
                <div>"Are they sitting or standing?" → "They are..."</div>
                <div>"Is he eating or sleeping?" → "He is..."</div>
                <div>"Is she happy or sad?" → "She is..."</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Extract and format question from filename
  const extractQuestionFromFilename = (filename: string): string => {
    if (!filename) return "";
    
    // Handle unit introduction special case
    if (filename.includes("Unit Introduction") || (filename.includes("Book") && filename.includes("Unit"))) {
      return "Unit Introduction";
    }
    
    // Handle subject title slides (e.g., "01 P A Subject English.png")
    const subjectMatch = filename.match(/Subject\s+(.+?)\.[a-zA-Z]+$/i);
    if (subjectMatch && subjectMatch[1]) {
      const subject = subjectMatch[1].trim();
      return `Subject: ${subject}`;
    }
    
    // Handle "is X Y or Z" style questions (e.g., "is English Easy or Difficult")
    const isQuestion = filename.match(/is\s+([A-Za-z]+)\s+(.*?)\.[a-zA-Z]+$/i);
    if (isQuestion) {
      let questionText = `Is ${isQuestion[1]} ${isQuestion[2]}?`;
      return questionText;
    }
    
    // Handle "how many" questions
    const howManyQuestion = filename.match(/How\s+Many\s+(.*?)\.[a-zA-Z]+$/i);
    if (howManyQuestion) {
      return `How Many ${howManyQuestion[1]}?`;
    }
    
    // Handle "do you" questions
    const doYouQuestion = filename.match(/Do\s+You\s+(.*?)\.[a-zA-Z]+$/i);
    if (doYouQuestion) {
      return `Do You ${doYouQuestion[1]}?`;
    }
    
    // Handle "who is" questions
    const whoIsQuestion = filename.match(/Who\s+is\s+(.*?)\.[a-zA-Z]+$/i);
    if (whoIsQuestion) {
      return `Who is ${whoIsQuestion[1]}?`;
    }
    
    // Fallback - just use any text after the file code pattern
    const anyText = filename.match(/\d+\s+P\s+[A-Za-z]+[a-z]?\s+(.*?)\.[a-zA-Z]+$/i);
    if (anyText && anyText[1]) {
      let text = anyText[1].trim();
      
      // Capitalize first letter
      text = text.charAt(0).toUpperCase() + text.slice(1);
      
      // Add question mark if it seems like a question
      if (/^(is|are|do|does|who|what|where|when|why|how|can|could)/i.test(text) && !text.endsWith("?")) {
        text += "?";
      }
      
      return text;
    }
    
    // Very simple fallback
    const simpleFallback = filename.split('.')[0].split(' ').slice(3).join(' ');
    if (simpleFallback) {
      return simpleFallback.charAt(0).toUpperCase() + simpleFallback.slice(1);
    }
    
    return filename; // Last resort, return the filename itself
  };
  
  // Component for displaying the question header consistently across all content types
  const QuestionHeader = ({ content, title }: { content: string; title: string }) => {
    if (!content) return null;
    
    // Extract and decode the filename from the content URL
    let filename = '';
    if (content.includes('/api/content/')) {
      // Handle proxy URL format: /api/content/book5%2Funit1%2F01%20P%20Ab%20is%20English...
      const encodedPath = content.split('/api/content/')[1];
      if (encodedPath) {
        // Decode the URL-encoded path
        const decodedPath = decodeURIComponent(encodedPath);
        // Get the filename part (after the last slash if any)
        filename = decodedPath.split('/').pop() || decodedPath;
      }
    } else {
      // Fallback to original behavior for non-proxy URLs
      filename = content.split('/').pop() || '';
    }
    
    // Extract the question from the decoded filename
    const question = extractQuestionFromFilename(filename) || title;
    
    return (
      <div className="w-full bg-green-100 p-4 text-center mb-4 rounded-md shadow-sm">
        <div className="flex flex-col items-center justify-center">
          {/* Checkmark to show question was asked */}
          <span className="inline-flex items-center justify-center bg-green-500 p-1.5 rounded-full mb-2">
            <Check className="h-5 w-5 text-white" />
          </span>
          <h3 className="text-2xl font-semibold text-green-800">
            {question}
          </h3>
        </div>
      </div>
    );
  };

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
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleFullscreen}
            title="Toggle fullscreen"
            className="hidden md:flex items-center gap-2"
          >
            <Maximize className="h-4 w-4" />
            <span>Fullscreen</span>
          </Button>
          {/* Sidebar button removed */}
        </div>
      </div>

      <div className="block md:hidden mb-4">
        <h1 className="text-xl font-semibold">
          {book?.title} – {unit?.title}
        </h1>
      </div>
      
      {/* Unit Introduction Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Unit {unit?.unitNumber} of {book?.title}</h2>
          </div>
        </div>
        <p className="text-sm text-gray-700 pl-10">
          This unit teaches about school layouts and helps students express how these spaces are used in English. Ready for a tour around your school?
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-grow w-full">
          {/* Slide title and progress */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              {currentMaterial?.title}
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {currentSlideIndex + 1}/{totalSlides} slides
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleFullscreen}
                title="Toggle fullscreen"
                className="md:hidden"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content Carousel */}
          <div 
            id="content-viewer"
            className={cn(
              "relative rounded-lg overflow-hidden transition-all", 
              isFullscreen ? "fixed inset-0 z-50 bg-white flex items-center justify-center" : ""
            )}
          >
            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-gray-200">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {materials.map((material, index) => (
                  <div key={material.id} className="flex-[0_0_100%]">
                    <div className="h-[60vh] relative">
                      {/* Render content for each slide */}
                      {currentSlideIndex === index && (
                        <div className="w-full h-full">
                          {material.isLocked ? (
                            <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                              <Lock className="h-12 w-12 text-gray-400 mb-4" />
                              <h3 className="text-xl font-semibold mb-2">Content Locked</h3>
                              <p className="text-gray-500 text-center max-w-md">
                                This content is currently locked. Please upgrade your subscription to access all materials.
                              </p>
                            </div>
                          ) : (
                            <>
                              {material.contentType === 'IMAGE' && (
                                <div className="flex flex-col items-center justify-center bg-white h-full">
                                  {/* Extract question from filename and display prominently at top */}
                                  {material.content && (
                                    <QuestionHeader 
                                      content={material.content} 
                                      title={material.title} 
                                    />
                                  )}
                                  <div className="flex-1 flex items-center justify-center w-full h-full">
                                    {/* Use the secure proxy URL provided by the backend */}
                                    <img
                                      src={material.content} 
                                      alt={material.title}
                                      className="max-w-full max-h-full object-contain"
                                      style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                      onError={(e) => {
                                        console.error("Failed to load image:", material.title);
                                        (e.target as HTMLImageElement).style.border = "1px dashed #e5e7eb";
                                      }}
                                    />
                                    {/* Banner message for admin users */}
                                    <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                      {currentSlideIndex + 1}/{totalSlides}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {material.contentType === 'VIDEO' && (
                                <div className="flex flex-col bg-white h-full">
                                  {/* Extract question from filename and display prominently at top */}
                                  {material.content && (
                                    <QuestionHeader 
                                      content={material.content} 
                                      title={material.title} 
                                    />
                                  )}
                                  <div className="flex-1 flex items-center justify-center w-full h-full">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                      <video 
                                        controls 
                                        className="max-w-full max-h-full object-contain"
                                        src={material.content}
                                        style={{ objectFit: 'contain', maxHeight: 'calc(60vh - 60px)' }}
                                        onError={(e) => {
                                          console.error("Failed to load video:", material.title);
                                        }}
                                      >
                                        Your browser does not support the video tag.
                                      </video>
                                      {/* Banner message for admin users */}
                                      <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                        {currentSlideIndex + 1}/{totalSlides}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* PDF type hidden as per request */}
                              
                              {material.contentType === 'GAME' && (
                                <div className="flex flex-col bg-white h-full">
                                  {/* Extract question from filename and display prominently at top */}
                                  {material.content && (
                                    <QuestionHeader 
                                      content={material.content} 
                                      title={material.title} 
                                    />
                                  )}
                                  <div className="flex-1 flex items-center justify-center w-full h-full">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                      <iframe
                                        src={material.content}
                                        title={material.title}
                                        className="max-w-full max-h-full"
                                        style={{ width: '100%', height: 'calc(60vh - 60px)' }}
                                        allowFullScreen
                                      />
                                      {/* Banner message for admin users */}
                                      <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                        {currentSlideIndex + 1}/{totalSlides}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {!['IMAGE', 'VIDEO', 'PDF', 'GAME'].includes(material.contentType) && (
                                <div className="flex flex-col items-center justify-center h-full bg-white">
                                  {/* Extract question from filename and display prominently at top */}
                                  {material.content && (
                                    <QuestionHeader 
                                      content={material.content} 
                                      title={material.title}
                                    />
                                  )}
                                  <div className="relative w-full h-full">
                                    <div className="p-6">
                                      <p className="text-gray-500">{material.contentType} content</p>
                                      <h3 className="text-xl font-semibold">{material.title}</h3>
                                      <p className="text-gray-500 mt-2">{material.description}</p>
                                    </div>
                                    {/* Banner message for admin users */}
                                    <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-bl-md">
                                      {currentSlideIndex + 1}/{totalSlides}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation controls overlaid on the carousel */}
            <button 
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity",
                currentSlideIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-80"
              )}
              onClick={() => navigateToSlide(currentSlideIndex - 1)}
              disabled={currentSlideIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity",
                currentSlideIndex === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "opacity-80"
              )}
              onClick={() => navigateToSlide(currentSlideIndex + 1)}
              disabled={currentSlideIndex === totalSlides - 1}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Thumbnails slider */}
          <div className="relative mt-4 px-8">
            {/* Left arrow navigation for thumbnails */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md z-10"
              onClick={() => {
                if (thumbsApi) {
                  thumbsApi.scrollPrev();
                }
              }}
              aria-label="Previous thumbnails"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {/* Right arrow navigation for thumbnails */}
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md z-10"
              onClick={() => {
                if (thumbsApi) {
                  thumbsApi.scrollNext();
                }
              }}
              aria-label="Next thumbnails"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            <div className="overflow-hidden" ref={thumbsRef}>
              <div className="flex gap-2 py-2">
                {materials
                  // Filter out PDF materials from thumbnails
                  .filter(material => material.contentType !== 'PDF')
                  .map((material, index) => {
                    // Find the actual index in the full materials array
                    const actualIndex = materials.findIndex(m => m.id === material.id);
                    return (
                      <div 
                        key={material.id} 
                        className={cn(
                          "flex-[0_0_80px] min-w-0 cursor-pointer",
                          "relative overflow-hidden rounded border-2 transition-all",
                          currentSlideIndex === actualIndex ? "border-primary" : "border-transparent"
                        )}
                        onClick={() => navigateToSlide(actualIndex)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Go to slide ${actualIndex + 1}: ${material.title}`}
                      >
                        {/* Content preview */}
                        <div className="relative h-14 bg-gray-100 flex items-center justify-center">
                          {material.contentType === 'IMAGE' && material.content ? (
                            <img 
                              src={material.content}
                              alt={`Thumbnail for ${material.title}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full">
                              {getContentTypeIcon(material.contentType)}
                            </div>
                          )}
                          
                          {/* Status indicator overlay */}
                          {material.isLocked && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Lock className="h-3 w-3 text-white" />
                            </div>
                          )}
                          
                          {/* View status dot */}
                          {!material.isLocked && (
                            <div className="absolute top-0.5 right-0.5">
                              {viewedSlides.includes(material.id) ? (
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-xs truncate text-center py-1 px-1">
                          {actualIndex + 1}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Slide Info & Question Panel */}
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {currentMaterial?.isLocked ? (
                  <Lock className="h-4 w-4 text-gray-500" />
                ) : (
                  <Check className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm font-medium">
                  {currentMaterial?.isLocked ? 'Locked Content' : 'Content Available'}
                </span>
              </div>
              
              {/* Always show PDF download button in this panel regardless of current content type */}
              {materials.some(m => m.contentType === 'PDF') && (
                <Button size="sm" variant="outline" className="flex items-center gap-2"
                  onClick={() => {
                    // Find the first PDF material in this unit
                    const pdfMaterial = materials.find(m => m.contentType === 'PDF');
                    if (pdfMaterial) {
                      window.open(pdfMaterial.content, '_blank');
                    }
                  }}>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
            {/* Description removed as requested */}
          </div>
          
          {/* Teacher Resources Section */}
          <div className="mt-8">
            <div className="border-b border-gray-200 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Teacher Resources</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Resource
                </Button>
              </div>
            </div>
            
            {/* Interactive Resources */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Interactive Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Kahoot Quiz */}
                <Card className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-500" />
                      <h4 className="font-medium">Kahoot Quiz: Unit 1</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Interactive quiz about key vocabulary</p>
                  <Button variant="link" size="sm" className="flex items-center gap-1 px-0 text-primary" onClick={() => window.open('#', '_blank')}>
                    <ExternalLink className="h-3 w-3" />
                    <span>Kahoot Quiz: Unit 1</span>
                  </Button>
                </Card>
                
                {/* Vocabulary Practice */}
                <Card className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium">Wordwall: Vocabulary Practice</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Practice key vocabulary from this unit</p>
                  <Button variant="link" size="sm" className="flex items-center gap-1 px-0 text-primary" onClick={() => window.open('#', '_blank')}>
                    <ExternalLink className="h-3 w-3" />
                    <span>Wordwall: Vocabulary Practice</span>
                  </Button>
                </Card>
                
                {/* YouTube Resources */}
                <Card className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      <h4 className="font-medium">YouTube Teaching Resources</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Find teaching videos for ESL lessons</p>
                  <Button variant="link" size="sm" className="flex items-center gap-1 px-0 text-primary" onClick={() => window.open('#', '_blank')}>
                    <ExternalLink className="h-3 w-3" />
                    <span>YouTube Teaching Resources</span>
                  </Button>
                </Card>
                
                {/* Online Games PDF */}
                <Card className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Online Games PDF</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">PDF with links to online games (if available)</p>
                  <div className="bg-amber-50 p-3 rounded border border-amber-100 text-sm">
                    <div className="font-medium text-amber-800 mb-1">Untrusted URL</div>
                    <p className="text-amber-700 text-xs">This URL cannot be embedded. Please use a trusted educational platform.</p>
                    <Button variant="link" size="sm" className="flex items-center gap-1 px-0 text-amber-800 mt-1" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="h-3 w-3" />
                      <span>Open link in new tab</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Teaching Guidance */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Teaching Guidance</h3>
              <Card className="p-6 bg-gradient-to-br from-white to-blue-50/40">
                <h4 className="font-semibold text-primary mb-6">
                  Unit-specific guidance for {book?.title}, Unit {unit?.unitNumber} - {unit?.title}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <h5 className="text-primary font-medium mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary/80" />
                      Presenting Questions
                    </h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Show the question on the slide and point to any key image details (e.g. facial expressions, actions, background objects).</li>
                      <li>Clearly read the question aloud to the class — say it twice to help students process the language.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <h5 className="text-primary font-medium mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-primary/80" />
                      Check Vocabulary Understanding
                    </h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Refer back to the textbook vocabulary section if available.</li>
                      <li>Pause and explain any unfamiliar words using visuals, gestures, or simple definitions.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-5 rounded-lg border border-gray-100">
                  <h5 className="text-primary font-medium mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary/80" />
                    Grammar Structures
                  </h5>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use this unit to practice these structures:
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 ml-2">
                        <div className="py-1 px-2 bg-gray-50 rounded text-sm">Subject + is + adjective</div>
                        <div className="py-1 px-2 bg-gray-50 rounded text-sm">How many + noun + do you have?</div>
                        <div className="py-1 px-2 bg-gray-50 rounded text-sm">Subject + is + adjective + or + adjective?</div>
                        <div className="py-1 px-2 bg-gray-50 rounded text-sm">Who is your + subject + teacher?</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}