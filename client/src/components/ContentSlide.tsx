import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ExternalLink, PenTool, BookOpen, EyeOff, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TeachingGuidance from "@/components/TeachingGuidance";

// Define type for material
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  teachingGuidance?: {
    presentingQuestions?: string;
    vocabularyChecks?: string;
    promptStructures?: string;
    followUpQuestions?: string;
  } | null;
  order?: number;
  orderIndex?: number;
  isLocked?: boolean;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface ContentSlideProps {
  material: Material;
  isActive: boolean;
  bookId: string;
  unitNumber: number;
  slideIndex: number;
  totalSlides?: number;
  isPremium?: boolean;
  hasPurchasedAccess?: boolean;
  hasFreeTrial?: boolean;
  onPurchaseClick?: () => void;
}

export default function ContentSlide({ 
  material, 
  isActive, 
  bookId, 
  unitNumber, 
  slideIndex, 
  totalSlides,
  isPremium = false,
  hasPurchasedAccess = false,
  hasFreeTrial = false,
  onPurchaseClick 
}: ContentSlideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showTeacherMode, setShowTeacherMode] = useState(false);

  // Get the formatted S3 URL for the material
  const getS3Url = () => {
    // Format to ensure consistent patterns
    const formattedBookId = bookId || "book1";
    const unitPath = `unit${unitNumber}`;
    
    // IMPORTANT: Always use the direct path which we fixed in the backend
    // This is the most reliable method that handles S3 content directly
    const directPath = `/api/direct/${formattedBookId}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
    console.log(`Using direct path: ${directPath}`);
    return directPath;
  };

  // Question extraction logic removed as requested
  
  // Dummy variables to prevent errors elsewhere in the code
  const betterFormattedQuestion = null;
  const betterFormattedAnswer = null;
  const betterFormattedCategory = null;
  
  // For image preloading
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  
  // Preload images for smoother navigation
  useEffect(() => {
    if (isActive && material.contentType.toLowerCase() === 'image' && material.content) {
      // Preload current image
      const currentImageUrl = getS3Url();
      const img = new Image();
      img.src = currentImageUrl;
      
      // Try to preload next few images if possible
      // This would require knowing the next few images in the sequence
      // In a real implementation, this would come from props
      
      setPreloadedImages(prev => 
        prev.includes(currentImageUrl) 
          ? prev 
          : [...prev, currentImageUrl]
      );
    }
  }, [isActive, material.content]);
  
  // For keyboard navigation
  const [keyboardFeedback, setKeyboardFeedback] = useState<string | null>(null);
  
  // Add keyboard navigation - only active when slide is active
  useEffect(() => {
    if (!isActive) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      let feedbackText = null;
      
      switch (event.key) {
        case "ArrowLeft":
          // This will be handled by the parent component
          feedbackText = "Previous slide";
          break;
        case "ArrowRight":
          // This will be handled by the parent component
          feedbackText = "Next slide";
          break;
        case "Home":
          // This will be handled by the parent component
          feedbackText = "First slide";
          break;
        case "End":
          // This will be handled by the parent component
          feedbackText = "Last slide";
          break;
        case "f":
          // Fullscreen toggle will be handled by the parent component
          feedbackText = "Toggle fullscreen";
          break;
      }
      
      // Show feedback briefly
      if (feedbackText) {
        setKeyboardFeedback(feedbackText);
        setTimeout(() => setKeyboardFeedback(null), 1000);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);
  
  // Reset state when the active slide changes
  useEffect(() => {
    if (isActive) {
      setIsPlaying(false);
      setIsMuted(false);
    }
  }, [isActive]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsError(false);
  };

  // Handle image error
  const handleImageError = () => {
    setIsError(true);
    setImageLoaded(true); // Still mark as loaded to remove skeleton
  };

  // Toggle teacher mode
  const toggleTeacherMode = () => {
    setShowTeacherMode(!showTeacherMode);
  };

  // Check if teaching guidance is available
  const hasTeachingGuidance = material.teachingGuidance && (
    material.teachingGuidance.presentingQuestions || 
    material.teachingGuidance.vocabularyChecks || 
    material.teachingGuidance.promptStructures || 
    material.teachingGuidance.followUpQuestions
  );

  // Render based on content type
  const renderContent = () => {
    console.log("Rendering content type:", material.contentType, "Content:", material.content);
    
    // Simplify: For images, we'll render image component for all image-like content types
    // For html/text content, we'll render the HTML content with dangerouslySetInnerHTML
    const contentType = material.contentType.toLowerCase();
    
    // Detect if this is an image based on content type or file extension
    const isImage = ['image', 'img', 'jpg', 'png', 'gif', 'svg', 'jpeg', 'image'].includes(contentType) || 
                   (material.content && /\.(jpg|jpeg|png|gif|svg)$/i.test(material.content));
    
    if (isImage) {
      return (
        <div className="relative overflow-hidden transition-all duration-300 ease-in-out">
          {/* Modern loading state with brighter colors */}
          {!imageLoaded && (
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 h-[50vh] rounded-xl">
              <div className="w-full max-w-md p-6">
                <div className="animate-pulse space-y-6">
                  <div className="h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl mx-auto"></div>
                  <div className="h-4 bg-blue-200 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-4 bg-indigo-200 rounded-full w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced image with optimized layout and proportional fitting */}
          <div className="flex items-center justify-center w-full h-full py-4 px-4 bg-white">
            <motion.div 
              className="relative flex justify-center items-center w-full h-full bg-white shadow-sm rounded-md"
              style={{ 
                minHeight: '400px', 
                maxHeight: '60vh',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <motion.img
                src={getS3Url()}
                alt={material.title || "Educational content"}
                className="p-0 m-0 max-w-full max-h-full object-contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 0.98,
                }}
                transition={{ duration: 0.3 }}
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  background: 'white',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              {/* Slide number indicator - exactly like in screenshots */}
              <div 
                className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-sm" 
                style={{ fontSize: '11px' }}
              >
                {slideIndex + 1}/{totalSlides || 'N/A'}
              </div>
            </motion.div>
          </div>
          
          {/* Styled error message */}
          {isError && (
            <div className="text-center bg-red-50 border border-red-100 p-4 mt-4 rounded-lg">
              <p className="text-red-600 font-medium">Failed to load image. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
        
    if (contentType === 'video') {
      return (
        <div className="relative" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Modern video player with enhanced styling and thumbnail visibility */}
          <div className="bg-gradient-to-b from-blue-50 to-gray-50 rounded-xl overflow-hidden shadow-xl p-4 h-full flex flex-col">
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-inner flex justify-center items-center flex-grow">
              <video
                src={getS3Url()}
                className="w-full h-full max-h-[calc(100vh-250px)] object-contain"
                controls
                autoPlay={isPlaying}
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={handleImageError}
              />
            </div>
            
            {/* Video controls and indicators */}
            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <span>{isPlaying ? 'Now Playing' : 'Paused'}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </div>
          
          {isError && (
            <div className="text-center bg-red-50 border border-red-100 p-4 mt-4 rounded-lg">
              <p className="text-red-600 font-medium">Failed to load video. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
    
    // Default content rendering (text/html content)
    return (
      <div className="w-full h-[calc(100vh-180px)] overflow-auto py-6 px-4 bg-white rounded-xl">
        <Card className="max-w-4xl mx-auto p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">{material.title}</h3>
          {material.description && (
            <p className="text-gray-600 mb-4">{material.description}</p>
          )}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: material.content }}
          />
        </Card>
      </div>
    );
  };
  
  // Determine if this content should be blurred
  const shouldBlurContent = () => {
    // Check if the user is an admin first
    const isAdmin = document.cookie.includes('isContentManager=true') || 
                    document.cookie.includes('role=admin');

    // If admin user, never blur content
    if (isAdmin) {
      return false;
    }
    
    // Special handling for different book series
    const isBookZeroSeries = bookId === 'book0a' || bookId === 'book0b' || bookId === 'book0c';
    
    // Standard books: First 10 slides of any unit are free (preview)
    if (!isBookZeroSeries && slideIndex < 10) {
      return false;
    }
    
    // Books 0a, 0b, 0c: First 2 images of any unit are free
    if (isBookZeroSeries && slideIndex < 2) {
      return false;
    }
    
    // User has purchased access or has free trial - don't blur
    if (hasPurchasedAccess || hasFreeTrial) {
      return false;
    }
    
    // Otherwise, blur premium content
    return isPremium;
  };
  
  // Render the main component with question/answer and content
  return (
    <div 
      className={`relative fade-in-scale slide-content-wrapper ${isActive ? 'active' : 'inactive'}`}
      style={{
        transition: 'all 0.5s ease',
        transform: isActive ? 'translateX(0)' : 'translateX(100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Simplified header with just title and progress indicator */}
      <div className="bg-blue-50 py-3 px-2 text-center mb-2 transition-all">
        <div className="px-4 flex flex-col items-center max-w-3xl mx-auto">
          <div className="w-full mb-2">
            <h2 className="text-gray-700 text-xl font-medium text-center">
              {material.title || ""}
            </h2>
            {material.description && (
              <h3 className="text-gray-500 text-lg font-medium text-center">
                {material.description || ""}
              </h3>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="w-full mt-2">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((slideIndex + 1) / (totalSlides || 100)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Start</span>
              <span>Unit {unitNumber}</span>
              <span>End</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Content preview section */}
        <div className="flex-1 relative">
          {renderContent()}
          
          {/* Blurred premium content overlay */}
          {shouldBlurContent() && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/80 backdrop-blur-sm">
              <div className="text-center max-w-md p-6">
                <EyeOff className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                <p className="mb-4 text-gray-700">
                  This content is available with a Premium subscription.
                </p>
                {onPurchaseClick && (
                  <Button onClick={onPurchaseClick} className="w-full">
                    View Subscription Options
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Teacher guidance sidebar (conditionally shown) */}
        {hasTeachingGuidance && showTeacherMode && (
          <div className="w-full md:w-1/3 bg-gray-50 border-l border-gray-200 h-full overflow-auto">
            <TeachingGuidance guidance={material.teachingGuidance} onHide={() => setShowTeacherMode(false)} />
          </div>
        )}
      </div>
      
      {/* Keyboard feedback indicator */}
      {keyboardFeedback && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-medium animate-fadeInOut">
            {keyboardFeedback}
          </div>
        </div>
      )}
      
      {/* Teacher mode toggle */}
      {hasTeachingGuidance && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTeacherMode}
            className={`flex items-center space-x-1 ${showTeacherMode ? 'bg-primary text-white' : ''}`}
          >
            <PenTool className="w-4 h-4 mr-1" />
            <span>Teaching Notes</span>
          </Button>
        </div>
      )}
    </div>
  );
}