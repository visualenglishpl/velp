import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ExternalLink, PenTool } from "lucide-react";

// Define type for material
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
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
  isPremium = false,
  hasPurchasedAccess = false,
  hasFreeTrial = false,
  onPurchaseClick 
}: ContentSlideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

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
  
  // Placeholder for future question detection logic
  const isQuestion = (text: string): boolean => {
    // Will be implemented later as per user requirements
    return false;
  };

  // Placeholder for future answer generation logic
  const generateAnswerPrompt = (question: string): string | null => {
    // Will be implemented later as per user requirements
    return null;
  };

  // Empty formatter that returns no questions or answers
  // Will be replaced with proper question formatting later
  const formatContentTitle = () => {
    return {
      question: null,
      answer: null
    };
  };
  
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
          
          {/* Enhanced image with modern styling */}
          <motion.img
            src={getS3Url()}
            alt={material.title || "Educational content"}
            className="max-w-[95%] max-h-[55vh] mx-auto object-contain transition-all duration-300 rounded-xl"
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
            style={{ 
              boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          />
          
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
        <div className="relative">
          {/* Modern video player with enhanced styling */}
          <div className="bg-gradient-to-b from-blue-50 to-gray-50 rounded-xl overflow-hidden shadow-xl p-4">
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-inner">
              <video
                src={getS3Url()}
                controls={true}
                className="max-w-[95%] max-h-[55vh] mx-auto rounded-lg"
                autoPlay={isActive && isPlaying}
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setIsError(true)}
                poster="/images/video-placeholder.jpg"
                style={{ 
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.06)',
                }}
              />
            </div>
            
            {/* Video caption - optional */}
            <div className="mt-4 text-center">
              <p className="text-gray-700 font-medium">
                {material.title || "Educational Video"}
              </p>
            </div>
          </div>
          
          {/* Styled error message for videos */}
          {isError && (
            <div className="text-center bg-red-50 border border-red-100 p-4 mt-4 rounded-lg">
              <p className="text-red-600 font-medium">Failed to load video. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
      
    if (contentType === 'text' || contentType === 'lesson') {
      return (
        <div className="prose prose-lg max-w-none mx-auto px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          {/* Enhanced text content display */}
          {material.content.startsWith('http') ? (
            <div className="text-center py-6">
              <p className="text-gray-700 mb-3">External content is available at the link below:</p>
              <a 
                href={material.content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center mt-2 font-medium px-4 py-2 bg-primary-50 rounded-lg transition-colors"
              >
                {material.title} <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          ) : (
            <motion.div 
              dangerouslySetInnerHTML={{ __html: material.content }}
              className="break-words p-5 rounded-lg bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
      );
    }
      
    if (contentType === 'exercise') {
      // For exercises, try to parse as JSON if it looks like JSON, otherwise treat as HTML
      if (material.content.trim().startsWith('{') && material.content.trim().endsWith('}')) {
        try {
          const exercise = JSON.parse(material.content);
          return (
            <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-b from-white to-blue-50 rounded-xl border border-blue-100 shadow-lg">
              <motion.h3 
                className="text-xl font-bold mb-5 text-primary-800 border-b border-blue-100 pb-3 flex items-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="bg-primary-600 text-white p-2 rounded-lg mr-3">
                  <PenTool className="h-5 w-5" />
                </span>
                {exercise.title || 'Interactive Exercise'}
              </motion.h3>
              
              <motion.div 
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {exercise.questions?.map((question: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="p-5 border border-blue-100 rounded-lg bg-white shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <p className="font-medium text-gray-800 mb-3 text-lg">{index + 1}. {question.text}</p>
                    {question.options && (
                      <div className="mt-4 space-y-3">
                        {question.options.map((option: string, optIndex: number) => (
                          <label 
                            key={optIndex} 
                            className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
                          >
                            <input 
                              type="radio" 
                              name={`question-${index}`} 
                              className="h-5 w-5 text-primary-600 focus:ring-primary-500" 
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Submit button for exercises */}
                <div className="mt-6 flex justify-end">
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    Check Answers
                  </button>
                </div>
              </motion.div>
            </Card>
          );
        } catch (e) {
          // If JSON parsing fails, fall back to treating it as HTML
          return (
            <div className="prose prose-lg max-w-none mx-auto px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <motion.div 
                dangerouslySetInnerHTML={{ __html: material.content }} 
                className="break-words p-4 rounded-lg bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          );
        }
      } else {
        // If it doesn't look like JSON, treat it as HTML content
        return (
          <div className="prose prose-lg max-w-none mx-auto px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-lg">
            <motion.div 
              dangerouslySetInnerHTML={{ __html: material.content }} 
              className="break-words p-4 rounded-lg bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        );
      }
    }
      
    // Default case - with modern styling consistent with other content types
    return (
      <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
        <p className="text-gray-700 mb-4 font-medium">Unsupported content type: {material.contentType}</p>
        <pre className="mt-4 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto max-w-full shadow-sm">{material.content}</pre>
      </div>
    );
  };

  // Parse the content title to extract questions and answers
  const { question, answer } = formatContentTitle();

  // Ensure proper capitalization for questions
  const capitalizeQuestion = (q: string): string => {
    if (!q) return "";
    
    // Special handling for "is it" questions (common in logs)
    if (q.toLowerCase().startsWith("is it") || q.toLowerCase().startsWith("s it")) {
      return "Is it" + q.slice(q.toLowerCase().indexOf("it") + 2);
    }
    
    // Special handling for "is he/she" questions
    if (q.toLowerCase().startsWith("is he") || q.toLowerCase().startsWith("s he")) {
      return "Is he" + q.slice(q.toLowerCase().indexOf("he") + 2);
    }
    
    if (q.toLowerCase().startsWith("is she") || q.toLowerCase().startsWith("s she")) {
      return "Is she" + q.slice(q.toLowerCase().indexOf("she") + 3);
    }
    
    // Split into sentences and capitalize each one
    return q.split('. ')
      .map(sentence => {
        if (!sentence.trim()) return "";
        
        // Fix specific start patterns
        const lowerSentence = sentence.toLowerCase();
        if (lowerSentence.startsWith("what")) return "What" + sentence.slice(4);
        if (lowerSentence.startsWith("where")) return "Where" + sentence.slice(5);
        if (lowerSentence.startsWith("when")) return "When" + sentence.slice(4);
        if (lowerSentence.startsWith("who")) return "Who" + sentence.slice(3);
        if (lowerSentence.startsWith("how")) return "How" + sentence.slice(3);
        if (lowerSentence.startsWith("why")) return "Why" + sentence.slice(3);
        if (lowerSentence.startsWith("do")) return "Do" + sentence.slice(2);
        if (lowerSentence.startsWith("does")) return "Does" + sentence.slice(4);
        if (lowerSentence.startsWith("are")) return "Are" + sentence.slice(3);
        if (lowerSentence.startsWith("can")) return "Can" + sentence.slice(3);
        if (lowerSentence.startsWith("could")) return "Could" + sentence.slice(5);
        if (lowerSentence.startsWith("would")) return "Would" + sentence.slice(5);
        if (lowerSentence.startsWith("should")) return "Should" + sentence.slice(6);
        if (lowerSentence.startsWith("will")) return "Will" + sentence.slice(4);
        
        // Capitalize first letter of each sentence as fallback
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      })
      .join('. ');
  };
  
  // If we have a question, make sure it's properly capitalized
  const formattedQuestion = question ? capitalizeQuestion(question) : null;
  
  return (
    <motion.div 
      className="p-2 min-h-[50vh] flex flex-col bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* No questions will be displayed as per user request */}
      
      {/* Centered title display */}
      {material.title && (
        <motion.div
          className="mb-4 z-10 text-center"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white py-3 px-4 rounded-lg shadow-sm border border-gray-200 inline-block">
            <h2 className="text-xl font-semibold text-gray-800">{material.title}</h2>
          </div>
        </motion.div>
      )}
      
      {/* Centered description display */}
      {material.description && (
        <motion.div
          className="mb-4 z-10 text-center"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white py-3 px-4 rounded-lg shadow-sm border border-gray-200 inline-block">
            <p className="text-gray-700">{material.description}</p>
          </div>
        </motion.div>
      )}
      
      {/* Content display with premium overlay if needed */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-4 bg-white shadow-sm border border-gray-200 mt-3 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main content rendering */}
        <div className={isPremium && !hasPurchasedAccess && !hasFreeTrial ? "filter blur-md" : ""}>
          {renderContent()}
        </div>

        {/* Premium content overlay */}
        {isPremium && !hasPurchasedAccess && !hasFreeTrial && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10 p-4 text-center">
            <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md">
              <h3 className="text-xl font-bold mb-2 text-primary">Premium Content</h3>
              <p className="mb-4">This slide is part of premium content. Purchase access to view all materials.</p>
              <button 
                onClick={onPurchaseClick}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Purchase Access
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}