import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Lock, 
  Maximize, 
  FileText, 
  Download,
  Video,
  Image as ImageIcon,
  AlertCircle,
  Gamepad2,
  MessageSquare,
  BookOpen,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Plus,
  Pencil,
  X,
  Youtube
} from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

// Material interface from shared schema
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order: number;
  isLocked: boolean;
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

export default function MaterialViewer() {
  // Parse URL parameters
  const [location] = useLocation();
  const materialMatches = location.match(/\/units\/(\d+)\/materials\/(\d+)/);
  const unitMatches = location.match(/\/units\/(\d+)$/);
  
  // Extract unitId and materialIndex from URL
  const unitId = materialMatches 
    ? parseInt(materialMatches[1], 10) 
    : unitMatches 
      ? parseInt(unitMatches[1], 10) 
      : 0;
  
  const initialMaterialIndex = materialMatches 
    ? parseInt(materialMatches[2], 10) 
    : 0;

  // All useState hooks must be defined before any conditional logic
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialMaterialIndex);
  // Sidebar removed as requested
  const showSidebar = false;
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // All useQuery hooks must be defined consistently
  const { data: unit, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/units/${unitId}`],
    enabled: !!unitId,
  });

  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${unit?.bookId}`],
    enabled: !!unit?.bookId,
  });

  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });

  // All useEmblaCarousel hooks must be defined consistently
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: 'keepSnaps',
  });
  
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x'
  });
  
  // All useCallback hooks must be defined consistently
  const navigateToSlide = useCallback((index: number) => {
    if (materials && index >= 0 && index < materials.length) {
      setCurrentSlideIndex(index);
      
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    }
  }, [materials, emblaApi]);
  
  const toggleFullscreen = useCallback(() => {
    const element = document.getElementById('content-viewer');
    
    if (!document.fullscreenElement) {
      element?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);
  
  // Content type icon helper - regular function, not a hook
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="h-4 w-4" />;
      case 'VIDEO':
        return <Video className="h-4 w-4" />;
      case 'PDF':
        return <FileText className="h-4 w-4" />;
      case 'GAME':
        return <Gamepad2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // All useEffect hooks must be defined consistently
  useEffect(() => {
    if (materials && materials.length > 0) {
      const currentMaterial = materials[currentSlideIndex];
      if (currentMaterial && !viewedSlides.includes(currentMaterial.id)) {
        setViewedSlides(prev => [...prev, currentMaterial.id]);
      }
    }
  }, [currentSlideIndex, materials, viewedSlides]);
  
  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;
    
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      thumbsApi.scrollTo(index);
      setCurrentSlideIndex(index);
    };
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, thumbsApi, setCurrentSlideIndex]);
  
  useEffect(() => {
    if (emblaApi && currentSlideIndex >= 0) {
      emblaApi.scrollTo(currentSlideIndex);
    }
  }, [currentSlideIndex, emblaApi]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateToSlide(currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        navigateToSlide(currentSlideIndex + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, navigateToSlide]);

  // Calculate derived values
  const totalSlides = materials?.length || 0;
  const currentMaterial = materials && materials.length > 0 
    ? materials[currentSlideIndex] 
    : null;

  // Loading state
  if (unitLoading || bookLoading || materialsLoading) {
    return <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-[60vh] w-full mb-4" />
      <Skeleton className="h-24 w-3/4" />
    </div>;
  }

  // No materials state
  if (!materials || materials.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href={`/books/${book?.id}/units`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Unit
              </Button>
            </Link>
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
        
        {/* Unit description */}
        <div className="mb-6">
          <p className="text-gray-600">Visual English Lesson</p>
          <p className="text-gray-700 mt-2">
            This unit covers key vocabulary and language structures related to {unit?.title}. 
            Students will practice conversation, reading, and interactive activities.
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>Class Progress</span>
            <span>65% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
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
    if (filename.includes("Unit Introduction") || filename.includes("Book") && filename.includes("Unit")) {
      return "Unit Introduction";
    }
    
    // Handle subject title slides (e.g., "01 P A Subject English.png")
    const subjectMatch = filename.match(/^\d+\s+P\s+[A-Za-z]+\s+Subject\s+(.+)\.[a-zA-Z]+$/i);
    if (subjectMatch && subjectMatch[1]) {
      const subject = subjectMatch[1].trim();
      return `Subject: ${subject}`;
    }
    
    // Handle question slides (e.g., "01 P Ba is It Interesting or Boring.gif")
    const questionMatch = filename.match(/^\d+\s+P\s+[A-Za-z]+[a-z]\s+(.+)\.[a-zA-Z]+$/i);
    if (questionMatch && questionMatch[1]) {
      // Clean up the extracted question
      let extractedQuestion = questionMatch[1].trim();
      
      // Format question properly
      extractedQuestion = extractedQuestion
        // Fix capitalization
        .replace(/^\w/, c => c.toUpperCase())
        // Add question mark for question formats
        .replace(/^(is|are|do|does|who|what|where|when|why|how|can|could)(.+?)(\?)?$/i, (match, qWord, rest, qMark) => {
          return `${qWord.charAt(0).toUpperCase() + qWord.slice(1)}${rest}?`;
        })
        // Fix spacing around punctuation
        .replace(/\s+([,.?!:;])/g, "$1")
        // Ensure space after punctuation
        .replace(/([,.?!:;])([A-Za-z])/g, "$1 $2");
      
      // Make sure it's a proper question if it's in question format
      if (/^(Is|Are|Do|Does|Who|What|Where|When|Why|How|Can|Could)/i.test(extractedQuestion) && !extractedQuestion.endsWith("?")) {
        extractedQuestion += "?";
      }
      
      return extractedQuestion;
    }
    
    // Fallback for other formats
    const genericMatch = filename.match(/^\d+\s+\w+\s+\w+\s+(.+)\.[a-zA-Z]+$/);
    if (genericMatch && genericMatch[1]) {
      let title = genericMatch[1].trim();
      title = title.charAt(0).toUpperCase() + title.slice(1);
      return title;
    }
    
    return "";
  };

  // Main UI with materials
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href={`/books/${book?.id}/units/${unitId}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Unit
            </Button>
          </Link>
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
                                  {/* Extract question from filename and display at top */}
                                  {material.content && (
                                    <div className="w-full bg-primary/10 p-3 text-center mb-2">
                                      <div className="flex items-center justify-center gap-2 mb-1">
                                        {/* Checkmark to show question was asked */}
                                        <Check className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-medium">
                                          {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex-1 flex items-center justify-center">
                                    <img
                                      src={material.content}
                                      alt={material.title}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {material.contentType === 'VIDEO' && (
                                <div className="flex flex-col bg-white h-full">
                                  {/* Extract question from filename and display at top */}
                                  {material.content && (
                                    <div className="w-full bg-primary/10 p-3 text-center mb-2">
                                      <div className="flex items-center justify-center gap-2 mb-1">
                                        {/* Checkmark to show question was asked */}
                                        <Check className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-medium">
                                          {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <video 
                                      controls 
                                      className="w-full h-full"
                                      src={material.content}
                                    >
                                      Your browser does not support the video tag.
                                    </video>
                                  </div>
                                </div>
                              )}
                              
                              {/* PDF type hidden as per request */}
                              
                              {material.contentType === 'GAME' && (
                                <div className="flex flex-col bg-white h-full">
                                  {/* Extract question from filename and display at top */}
                                  {material.content && (
                                    <div className="w-full bg-primary/10 p-3 text-center mb-2">
                                      <div className="flex items-center justify-center gap-2 mb-1">
                                        {/* Checkmark to show question was asked */}
                                        <Check className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-medium">
                                          {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <iframe
                                      src={material.content}
                                      title={material.title}
                                      className="w-full h-full"
                                      allowFullScreen
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {!['IMAGE', 'VIDEO', 'PDF', 'GAME'].includes(material.contentType) && (
                                <div className="flex flex-col items-center justify-center h-full bg-white">
                                  {/* Extract question from filename and display at top */}
                                  {material.content && (
                                    <div className="w-full bg-primary/10 p-3 text-center mb-2">
                                      <div className="flex items-center justify-center gap-2 mb-1">
                                        {/* Checkmark to show question was asked */}
                                        <Check className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-medium">
                                          {extractQuestionFromFilename(material.content.split('/').pop() || '') || material.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                                  <div className="p-6">
                                    <p className="text-gray-500">{material.contentType} content</p>
                                    <h3 className="text-xl font-semibold">{material.title}</h3>
                                    <p className="text-gray-500 mt-2">{material.description}</p>
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
            <div className="overflow-hidden" ref={thumbsRef}>
              <div className="flex gap-2 py-2">
                {materials.map((material, index) => (
                  <div 
                    key={material.id} 
                    className={cn(
                      "flex-[0_0_80px] min-w-0 cursor-pointer",
                      "relative overflow-hidden rounded border-2 transition-all",
                      currentSlideIndex === index ? "border-primary" : "border-transparent"
                    )}
                    onClick={() => navigateToSlide(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}: ${material.title}`}
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
                      {index + 1}
                    </div>
                  </div>
                ))}
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
              {currentMaterial?.contentType === 'PDF' && (
                <Button size="sm" variant="outline" className="flex items-center gap-2"
                  onClick={() => window.open(currentMaterial.content, '_blank')}>
                  <Download className="h-4 w-4" />
                  Download
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
                
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <h5 className="text-primary font-medium mb-4 flex items-center">
                      <Video className="h-5 w-5 mr-2 text-primary/80" />
                      Ask Follow-up Questions
                    </h5>
                    <p className="mb-3">To reinforce comprehension:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>"Why do you think so?"</li>
                      <li>"Can you describe it more?"</li>
                      <li>"What else can you see?"</li>
                    </ul>
                  </div>
                
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <h5 className="text-primary font-medium mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-primary/80" />
                      Prompt Student Answers
                    </h5>
                    <p className="mb-3">Use structured sentence frames:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="font-medium">Q:</span> "Is it a cat or a dog?"
                        <span className="mx-2">→</span>
                        <span className="font-medium">A:</span> "It is a..."
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="font-medium">Q:</span> "Are they sitting or standing?"
                        <span className="mx-2">→</span>
                        <span className="font-medium">A:</span> "They are..."
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="font-medium">Q:</span> "Is he eating or sleeping?"
                        <span className="mx-2">→</span>
                        <span className="font-medium">A:</span> "He is..."
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="font-medium">Q:</span> "Is she happy or sad?"
                        <span className="mx-2">→</span>
                        <span className="font-medium">A:</span> "She is..."
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* School Facilities & Areas */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Unit Content Summary</h3>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-3">School Facilities:</h5>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🏫</span>
                        <span>Primary School: Structure and role of primary education</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🏢</span>
                        <span>Office: Administrative tasks; headmaster/headmistress</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">💪</span>
                        <span>Gym: Physical education and sports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🍽️</span>
                        <span>Canteen/Tuck Shop: Lunch and snacks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">📚</span>
                        <span>Library: Quiet area for reading and studying</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🌟</span>
                        <span>After School Care: Post-school activities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-3">Special School Areas:</h5>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🧥</span>
                        <span>Cloakroom: Changing shoes and storing clothing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🏫</span>
                        <span>Classroom: Primary area for lessons and learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">⚽</span>
                        <span>Sports Field: Outdoor sports and activities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🤾</span>
                        <span>Playground: Free play and informal activities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🎨</span>
                        <span>Art Room: Creative space for drawing and crafting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">🎼</span>
                        <span>Music Room: Learning and practicing music</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar removed as requested */}
      </div>
    </div>
  );
}
