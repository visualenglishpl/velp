import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Define type for material
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

interface ContentSlideProps {
  material: Material;
  isActive: boolean;
  bookId: string;
  unitNumber: number;
}

export default function ContentSlide({ material, isActive, bookId, unitNumber }: ContentSlideProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isError, setIsError] = useState(false);

  // Format the S3 URL based on content path
  const getS3Url = () => {
    console.log(`Getting URL for material: bookId=${bookId}, unitNumber=${unitNumber}, contentType=${material.contentType}, content=${material.content}`);
    
    // Always convert numeric bookId to "book" format
    const formattedBookId = bookId.startsWith('book') 
      ? bookId 
      : `book${bookId}`;
    
    // Always format unit number consistently
    const unitPath = `unit${unitNumber}`;
    
    // IMPORTANT: Always use the direct path which we fixed in the backend
    // This is the most reliable method that handles S3 content directly
    const directPath = `/api/direct/${formattedBookId}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
    console.log(`Using direct path: ${directPath}`);
    return directPath;
  };
  
  // Format the title/question text by cleaning up the filename
  const formatContentTitle = () => {
    try {
      const content = material.content;
      
      // Remove file extension
      const withoutExtension = content.replace(/\.[^/.]+$/, "");
      
      // Check if it contains a question or a dash for the question-answer format
      if (withoutExtension.includes(" – ")) {
        const parts = withoutExtension.split(" – ");
        if (parts.length >= 2) {
          // Extract the question (first part)
          let question = parts[0];
          
          // Remove the leading number codes (like "01 N A ")
          question = question.replace(/^\d+\s+[A-Z](\s+[A-Z])?(\s+)?/, "");
          
          // Format the question: remove unnecessary words, fix "A/An" articles, proper spacing
          question = question
            .replace(/\b([Aa])\s+(?=[A-Z])/g, "") // Remove standalone "A" before uppercase words
            .replace(/\s{2,}/g, ' ') // Clean up multiple spaces
            .trim();
          
          // Ensure question has a question mark if it's a question
          if (isQuestion(question) && !question.endsWith("?")) {
            question = question + "?";
          }
          
          // Make first letter uppercase for better presentation
          question = question.charAt(0).toUpperCase() + question.slice(1);
          
          // Extract and clean the answer (second part)
          let answer = parts[1].trim();
          
          // Handle specific article formatting in answers
          answer = answer
            .replace(/\bit is\s+a\b/i, "It is a")
            .replace(/\b([Aa])\s+(?=[A-Z])/g, "a "); // Fix article placement
          
          // Make first letter uppercase for consistency
          answer = answer.charAt(0).toUpperCase() + answer.slice(1);
          
          return {
            question,
            answer
          };
        }
      }
      
      // If not a question-answer format, just clean up the content name
      let cleanedTitle = withoutExtension
        .replace(/^\d+\s+[A-Z](\s+[A-Z])?(\s+)?/, "") // Remove leading codes
        .replace(/\b([Aa])\s+(?=[A-Z])/g, "") // Remove "A" before uppercase words
        .replace(/\s{2,}/g, ' ') // Clean up multiple spaces
        .trim();
      
      // Add question mark for questions
      if (isQuestion(cleanedTitle) && !cleanedTitle.endsWith("?")) {
        cleanedTitle = cleanedTitle + "?";
      }
      
      // Make first letter uppercase
      cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);
      
      return {
        question: cleanedTitle,
        answer: null
      };
    } catch (error) {
      // If any error, just return the content as is
      return {
        question: material.content,
        answer: null
      };
    }
  };
  
  // Enhanced check if text is likely a question
  const isQuestion = (text: string) => {
    const questionWords = [
      'what', 'where', 'when', 'why', 'how', 'which', 'who', 'whose', 
      'is it', 'are they', 'do you', 'can you', 'does it', 'is this', 
      'are these', 'how many', 'how much', 'how long', 'how often'
    ];
    const lowerText = text.toLowerCase();
    
    // Special case handling: begins with "is" or another auxiliary verb (common question pattern)
    if (/^(is|are|do|does|can|could|will|would|should|has|have)\b/i.test(lowerText)) {
      return true;
    }
    
    return questionWords.some(word => lowerText.includes(word));
  };

  useEffect(() => {
    // Reset state when the active slide changes
    if (isActive) {
      setZoomedIn(false);
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
        <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${zoomedIn ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 h-[50vh]">
              <div className="w-full max-w-md p-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-40 bg-gray-300 rounded-md mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  <div className="flex justify-center space-x-2">
                    <div className="rounded-full bg-gray-300 h-6 w-6"></div>
                    <div className="rounded-full bg-gray-300 h-6 w-6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <motion.img
            src={getS3Url()}
            alt={material.title}
            className={`max-w-full max-h-[70vh] mx-auto object-contain transition-all duration-300 ${zoomedIn ? 'scale-150' : 'scale-100'}`}
            onClick={() => setZoomedIn(!zoomedIn)}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {imageLoaded && !isError && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedIn(!zoomedIn);
              }}
            >
              {zoomedIn ? <Minimize className="h-4 w-4 mr-1" /> : <Maximize className="h-4 w-4 mr-1" />}
              {zoomedIn ? 'Zoom Out' : 'Zoom In'}
            </Button>
          )}
          {isError && (
            <div className="text-center text-red-500 p-4">
              <p>Failed to load image. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
        
    if (contentType === 'video') {
      return (
        <div className="relative">
          <video
            src={getS3Url()}
            controls={isActive}
            className="max-w-full max-h-[70vh] mx-auto"
            autoPlay={isActive && isPlaying}
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setIsError(true)}
          />
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/80 backdrop-blur-sm shadow-md"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/80 backdrop-blur-sm shadow-md"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          </div>
          {isError && (
            <div className="text-center text-red-500 p-4">
              <p>Failed to load video. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
      
    if (contentType === 'text' || contentType === 'lesson') {
      return (
        <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
          {/* Handle different text formats */}
          {material.content.startsWith('http') ? (
            <div className="text-center">
              <p>External content is available at the link below:</p>
              <a 
                href={material.content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center mt-2"
              >
                {material.title} <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: material.content }}
              className="break-words"
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
            <Card className="p-4 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">{exercise.title || 'Exercise'}</h3>
              <div className="space-y-4">
                {exercise.questions?.map((question: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md">
                    <p className="font-medium">{index + 1}. {question.text}</p>
                    {question.options && (
                      <div className="mt-2 space-y-2">
                        {question.options.map((option: string, optIndex: number) => (
                          <label key={optIndex} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                            <input 
                              type="radio" 
                              name={`question-${index}`} 
                              className="h-4 w-4 text-blue-600" 
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        } catch (e) {
          // If JSON parsing fails, fall back to treating it as HTML
          return (
            <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
              <div dangerouslySetInnerHTML={{ __html: material.content }} className="break-words" />
            </div>
          );
        }
      } else {
        // If it doesn't look like JSON, treat it as HTML content
        return (
          <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
            <div dangerouslySetInnerHTML={{ __html: material.content }} className="break-words" />
          </div>
        );
      }
    }
      
    // Default case
    return (
      <div className="text-center p-4">
        <p>Unsupported content type: {material.contentType}</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">{material.content}</pre>
      </div>
    );
  };

  // Parse the content title to extract questions and answers
  const { question, answer } = formatContentTitle();

  return (
    <motion.div 
      className="p-4 min-h-[50vh] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content comes first for questions with images */}
      <motion.div 
        className="flex-1 flex items-center justify-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {renderContent()}
      </motion.div>
      
      {/* Display formatted question if available - AFTER the content for visual flow */}
      {question && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-3">{question}</h2>
          {answer && (
            <p className="text-lg text-gray-700 mt-2">{answer}</p>
          )}
        </motion.div>
      )}
      
      {/* Fallback to original title if question formatting failed */}
      {!question && material.title && (
        <motion.h2 
          className="text-xl font-semibold text-center mb-4 mt-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {material.title}
        </motion.h2>
      )}
      
      {material.description && !question && (
        <motion.p 
          className="text-gray-600 text-center mb-6"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {material.description}
        </motion.p>
      )}
    </motion.div>
  );
}