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
      
      // Skip content that doesn't make sense for display
      if (content.includes("Nit") || content.match(/Page_\d+/)) {
        return {
          question: null,
          answer: null
        };
      }
      
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
          
          // Generate appropriate answer prompts based on question structure
          let answerPrompt = generateAnswerPrompt(question);
          
          // If we have both a standard answer and a generated prompt, combine them
          if (answerPrompt && answer) {
            answer = `${answer} ${answerPrompt}`;
          } else if (answerPrompt && !answer) {
            answer = answerPrompt;
          }
          
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
      
      // See if we can generate an answer prompt for this title
      const answerPrompt = generateAnswerPrompt(cleanedTitle);
      
      return {
        question: cleanedTitle,
        answer: answerPrompt
      };
    } catch (error) {
      // If any error, return null to hide unnecessary content
      return {
        question: null,
        answer: null
      };
    }
  };
  
  // Generate appropriate answer prompts based on question structure
  const generateAnswerPrompt = (question: string): string | null => {
    // Normalize the question for pattern matching
    const normalizedQuestion = question.toLowerCase();
    
    // Do you...? pattern
    if (normalizedQuestion.startsWith("do you")) {
      return "Yes, I do / No, I don't";
    }
    
    // Does he/she...? pattern
    if (normalizedQuestion.startsWith("does he") || normalizedQuestion.startsWith("does she")) {
      return normalizedQuestion.includes("she") 
        ? "Yes, she does / No, she doesn't" 
        : "Yes, he does / No, he doesn't";
    }
    
    // Do they...? pattern
    if (normalizedQuestion.startsWith("do they")) {
      return "Yes, they do / No, they don't";
    }
    
    // Are you...? pattern
    if (normalizedQuestion.startsWith("are you")) {
      return "Yes, I am / No, I'm not";
    }
    
    // Is he/she...? pattern
    if (normalizedQuestion.startsWith("is he") || normalizedQuestion.startsWith("is she")) {
      return normalizedQuestion.includes("she") 
        ? "Yes, she is / No, she isn't" 
        : "Yes, he is / No, he isn't";
    }
    
    // Can you...? pattern
    if (normalizedQuestion.startsWith("can you")) {
      return "Yes, I can / No, I can't";
    }
    
    // Could you...? pattern
    if (normalizedQuestion.startsWith("could you")) {
      return "Yes, I could / No, I couldn't";
    }
    
    // Have you...? pattern
    if (normalizedQuestion.startsWith("have you")) {
      return "Yes, I have / No, I haven't";
    }
    
    // Did you...? pattern
    if (normalizedQuestion.startsWith("did you")) {
      return "Yes, I did / No, I didn't";
    }
    
    // Will you...? pattern
    if (normalizedQuestion.startsWith("will you")) {
      return "Yes, I will / No, I won't";
    }
    
    // Would you...? pattern
    if (normalizedQuestion.startsWith("would you")) {
      return "Yes, I would / No, I wouldn't";
    }
    
    // Where does...? pattern
    if (normalizedQuestion.startsWith("where does")) {
      // For specific responses like: "Where Does Babysitter Work?"
      if (normalizedQuestion.includes("babysitter") || normalizedQuestion.includes("baby sitter")) {
        return "A baby sitter works...";
      }
      return "They work at...";
    }
    
    // What does...? pattern
    if (normalizedQuestion.startsWith("what does")) {
      // For specific responses like: "What Does Chef Do?"
      if (normalizedQuestion.includes("chef")) {
        return "A chef...";
      }
      return "They...";
    }
    
    // What is...? pattern
    if (normalizedQuestion.startsWith("what is")) {
      return "It is...";
    }
    
    // Would you like...? pattern
    if (normalizedQuestion.includes("would you like")) {
      return "Yes, I would like / No, I wouldn't like";
    }
    
    // Is [job/thing]...? pattern
    if (normalizedQuestion.startsWith("is") && 
        (normalizedQuestion.includes("job") || 
         normalizedQuestion.includes("babysitter") ||
         normalizedQuestion.includes("chef"))) {
      if (normalizedQuestion.includes("easy or difficult")) {
        return "A babysitter's job is...";
      }
      if (normalizedQuestion.includes("well or badly paying")) {
        return "A babysitter's job is...";
      }
      return "It is...";
    }
    
    // Dream job pattern
    if (normalizedQuestion.includes("dream job")) {
      return "My dream job is...";
    }

    // For other question types or non-questions
    return null;
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
        <div className="relative overflow-hidden transition-all duration-300 ease-in-out px-3">
          {!imageLoaded && (
            <div className="flex items-center justify-center bg-gray-100 h-[50vh] rounded-lg">
              <div className="w-full max-w-md p-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-40 bg-gray-300 rounded-md mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          )}
          <motion.img
            src={getS3Url()}
            alt={material.title || "Educational content"}
            className="max-w-[90%] max-h-[50vh] mx-auto object-contain transition-all duration-300 rounded-lg"
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          />
          {isError && (
            <div className="text-center text-red-500 p-4 mt-2">
              <p>Failed to load image. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
        
    if (contentType === 'video') {
      return (
        <div className="relative px-4">
          <div className="bg-black/5 rounded-lg overflow-hidden shadow-lg">
            <video
              src={getS3Url()}
              controls={true}
              className="max-w-[90%] max-h-[50vh] mx-auto"
              autoPlay={isActive && isPlaying}
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setIsError(true)}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </div>
          {isError && (
            <div className="text-center text-red-500 p-4 mt-2">
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
      {/* Display formatted question if available - BEFORE the content for visual flow */}
      {question && (
        <motion.div 
          className="mb-6 text-center"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
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
          className="text-xl font-semibold text-center mb-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {material.title}
        </motion.h2>
      )}
      
      {material.description && !question && (
        <motion.p 
          className="text-gray-600 text-center mb-6"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {material.description}
        </motion.p>
      )}
      
      {/* Content comes after the question/title */}
      <motion.div 
        className="flex-1 flex items-center justify-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}