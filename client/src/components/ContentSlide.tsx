import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ContentSlideProps {
  material: {
    id?: number;
    title?: string;
    description?: string;
    contentType: string;
    content: string;
    bookId?: string;
  };
  isActive: boolean;
  bookId: string;
  unitNumber: number;
}

export default function ContentSlide({ material, isActive, bookId, unitNumber }: ContentSlideProps) {
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

  // Generate appropriate answer prompts based on question structure
  const generateAnswerPrompt = (question: string): string | null => {
    // Skip if the question is empty
    if (!question || question.trim() === "") {
      return null;
    }
    
    // Normalize the question for pattern matching
    const normalizedQuestion = question.toLowerCase();
    
    // Log for debugging
    console.log(`Processing question: "${normalizedQuestion}"`);
    
    // Logic check function - returns whether this is a valid question with expected patterns
    const logicCheckQuestion = (q: string): boolean => {
      // Check for common grammar issues
      const hasGrammarIssues = q.includes(" a the ") || 
                              q.includes(" a a ") || 
                              q.includes(" the the ") ||
                              q.match(/\bare\b.*\bis\b/) || // "are" followed by "is"
                              q.match(/\bis\b.*\bare\b/);   // "is" followed by "are"
                              
      // Check for specific Book 7 crime-related malformed content
      const hasCrimeContentIssues = q.includes("criminal") && q.includes("vandal") && q.length < 15;
      
      // Check for specific issues with Book 3 Unit 2 formatting
      const hasTimeIssues = q.includes("clock") && !q.includes("what") && !q.includes("where") && !q.includes("is");
        
      return !hasGrammarIssues && !hasCrimeContentIssues && !hasTimeIssues;
    };
    
    // Perform logic check
    const isValidQuestion = logicCheckQuestion(normalizedQuestion);
    if (!isValidQuestion) {
      console.log(`Logic check failed for: "${normalizedQuestion}"`);
      // Return a corrected version for specific failures
      if (normalizedQuestion.includes("clock") && !normalizedQuestion.includes("where")) {
        return "It's a clock.";
      }
      if (normalizedQuestion.includes("criminal")) {
        return "They are committing a crime.";
      }
    }
    
    // Special handling for Book 7 crime-related content
    if (bookId === "book7") {
      // Crime pattern detection
      if (normalizedQuestion.includes("crime") || 
          normalizedQuestion.includes("criminal") || 
          normalizedQuestion.includes("terrorist") ||
          normalizedQuestion.includes("vandal")) {
        
        // "What crime is he/she committing" pattern
        if (normalizedQuestion.includes("crime") && normalizedQuestion.includes("committing")) {
          if (normalizedQuestion.includes("pickpocket")) {
            return "He is pickpocketing.";
          }
          if (normalizedQuestion.includes("shoplift")) {
            return "She is shoplifting.";
          }
          if (normalizedQuestion.includes("vandal")) {
            return "They are vandalizing.";
          }
          return "They are committing a crime.";
        }
        
        // "Is it good or bad" pattern for vandalism
        if (normalizedQuestion.includes("good or bad") && normalizedQuestion.includes("vandalism")) {
          return "It depends on your perspective.";
        }
      }
    }
    
    // Book 3 Unit 2 time patterns (clock related)
    if (bookId === "book3" && unitNumber === 2) {
      if (normalizedQuestion.includes("clock")) {
        if (normalizedQuestion.startsWith("where is the clock")) {
          // Try to extract location from the question
          const locationMatch = normalizedQuestion.match(/in the ([a-z]+)/i);
          if (locationMatch && locationMatch[1]) {
            return `The clock is in the ${locationMatch[1]}.`;
          }
          return "The clock is on the wall.";
        }
        
        if (normalizedQuestion.startsWith("what is")) {
          return "It is a clock.";
        }
      }
      
      if (normalizedQuestion.includes("time")) {
        return "It is ___ o'clock.";
      }
    }
    
    // Standard patterns across all books
    
    // "Do you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("do you")) {
      return "Yes, I do / No, I don't";
    }
    
    // "Does he/she...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("does he") || normalizedQuestion.startsWith("does she")) {
      return normalizedQuestion.includes("she") 
        ? "Yes, she does / No, she doesn't" 
        : "Yes, he does / No, he doesn't";
    }
    
    // "Does it...?" pattern (All books)
    if (normalizedQuestion.startsWith("does it")) {
      return "Yes, it does / No, it doesn't";
    }
    
    // "Do they...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("do they")) {
      return "Yes, they do / No, they don't";
    }
    
    // "Are you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("are you")) {
      return "Yes, I am / No, I'm not";
    }
    
    // "Are they...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("are they")) {
      return "Yes, they are / No, they're not";
    }
    
    // "Are there...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("are there")) {
      return "Yes, there are / No, there aren't";
    }
    
    // "Is he/she...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("is he") || normalizedQuestion.startsWith("is she")) {
      return normalizedQuestion.includes("she") 
        ? "Yes, she is / No, she isn't" 
        : "Yes, he is / No, he isn't";
    }
    
    // "Is it...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("is it")) {
      return "Yes, it is / No, it isn't";
    }
    
    // "Is there...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("is there")) {
      return "Yes, there is / No, there isn't";
    }
    
    // "Is this...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("is this")) {
      return "Yes, it is / No, it isn't";
    }
    
    // "Can you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("can you")) {
      return "Yes, I can / No, I can't";
    }
    
    // "Could you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("could you")) {
      return "Yes, I could / No, I couldn't";
    }
    
    // "Have you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("have you")) {
      return "Yes, I have / No, I haven't";
    }
    
    // "Did you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("did you")) {
      return "Yes, I did / No, I didn't";
    }
    
    // "Will you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("will you")) {
      return "Yes, I will / No, I won't";
    }
    
    // "Would you...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("would you")) {
      return "Yes, I would / No, I wouldn't";
    }
    
    // "Where does...?" pattern (Book 3-7 job-related questions)
    if (normalizedQuestion.startsWith("where does")) {
      // For specific responses like: "Where Does Babysitter Work?"
      if (normalizedQuestion.includes("babysitter") || normalizedQuestion.includes("baby sitter")) {
        return "A baby sitter works...";
      }
      if (normalizedQuestion.includes("chef")) {
        return "A chef works...";
      }
      if (normalizedQuestion.includes("doctor")) {
        return "A doctor works...";
      }
      if (normalizedQuestion.includes("teacher")) {
        return "A teacher works...";
      }
      return "They work at...";
    }
    
    // "What does...?" pattern (Book 3-7 job-related questions)
    if (normalizedQuestion.startsWith("what does")) {
      // For specific responses like: "What Does Chef Do?"
      if (normalizedQuestion.includes("chef")) {
        return "A chef...";
      }
      if (normalizedQuestion.includes("doctor")) {
        return "A doctor...";
      }
      if (normalizedQuestion.includes("teacher")) {
        return "A teacher...";
      }
      if (normalizedQuestion.includes("terrorist")) {
        return "A terrorist...";
      }
      return "They...";
    }
    
    // "What is...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("what is")) {
      return "It is...";
    }
    
    // "What are...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("what are")) {
      return "They are...";
    }
    
    // "Who are...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("who are")) {
      return "They are...";
    }
    
    // "Who is...?" pattern (Books 1-7)
    if (normalizedQuestion.startsWith("who is")) {
      return "He/She is...";
    }
    
    // "Would you like...?" pattern (Books 1-7)
    if (normalizedQuestion.includes("would you like")) {
      return "Yes, I would like / No, I wouldn't like";
    }
    
    // "Is [job/thing]...?" pattern (Book 3-7 job-related questions)
    if (normalizedQuestion.startsWith("is") && 
        (normalizedQuestion.includes("job") || 
         normalizedQuestion.includes("babysitter") ||
         normalizedQuestion.includes("chef") ||
         normalizedQuestion.includes("doctor") ||
         normalizedQuestion.includes("teacher"))) {
      if (normalizedQuestion.includes("easy or difficult")) {
        return "It is...";
      }
      if (normalizedQuestion.includes("well or badly paying")) {
        return "It is...";
      }
      return "It is...";
    }
    
    // Dream job pattern (Books 3-7)
    if (normalizedQuestion.includes("dream job")) {
      return "My dream job is...";
    }
    
    // "important or unimportant" pattern (Book 7 vacation questions)
    if (normalizedQuestion.includes("important or unimportant")) {
      return "I think it is...";
    }
    
    // "good or bad" pattern (Book 7)
    if (normalizedQuestion.includes("good or bad")) {
      return "I think it is...";
    }
    
    // "do you use" pattern (Book 7 vacation questions)
    if (normalizedQuestion.includes("do you use") && 
        (normalizedQuestion.includes("holiday") || normalizedQuestion.includes("vacation"))) {
      return "Yes, I do / No, I don't";
    }
    
    // Book 7 vacation specific patterns
    if (normalizedQuestion.includes("vacation") || normalizedQuestion.includes("holiday")) {
      if (normalizedQuestion.startsWith("what")) {
        return "It is...";
      }
      if (normalizedQuestion.includes("been to")) {
        return "I have been to...";
      }
      if (normalizedQuestion.includes("interesting or boring")) {
        return "I think they are...";
      }
    }
    
    // "How many" pattern
    if (normalizedQuestion.includes("how many")) {
      return "There are...";
    }
    
    // "How much" pattern
    if (normalizedQuestion.includes("how much")) {
      return "It costs...";
    }
    
    // "When do you" pattern
    if (normalizedQuestion.startsWith("when do you")) {
      return "I...";
    }
    
    // "Where do you" pattern
    if (normalizedQuestion.startsWith("where do you")) {
      return "I...";
    }
    
    // For other question types or non-questions
    return null;
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
      
      // Special handling for Book 0A Unit 1 (Peek-a-boo content)
      if (bookId === "book0a" && unitNumber === 1) {
        // For flashcards content
        if (content.includes("Flashcards")) {
          // Extract location from filename
          const locationMatch = content.match(/Flashcards\s+(in|on|under)\s+the\s+([A-Za-z]+)/i);
          if (locationMatch) {
            const preposition = locationMatch[1]; // "in", "on", or "under" 
            const location = locationMatch[2]; // "Bowl", "Book", etc.
            return {
              question: `Where are the flashcards?`,
              answer: `The flashcards are ${preposition} the ${location}.`
            };
          }
          
          // For generic flashcards
          if (content.includes("Flashcards Craft Peekaboo")) {
            return {
              question: "What are these flashcards for?",
              answer: "These flashcards are for the Peek-a-boo game."
            };
          }
        }
        
        // For Peek-a-boo content
        if (content.toLowerCase().includes("peek a boo") || content.toLowerCase().includes("peekaboo")) {
          // For videos
          if (content.includes("Video")) {
            return {
              question: "What is this video about?",
              answer: "This is a Peek-a-boo song/activity video for children."
            };
          }
          
          // For crafts
          if (content.includes("Crafts")) {
            return {
              question: "What can children make with these crafts?",
              answer: "Children can make Peek-a-boo games and activities."
            };
          }
          
          // For drawings or other activities
          if (content.includes("Draw")) {
            return {
              question: "What game are we playing?",
              answer: "We are playing Peek-a-boo."
            };
          }
        }
      }
      
      // Special handling for Book 3 Unit 2 clock and time related content
      if (bookId === "book3" && unitNumber === 2) {
        // Specific handling for clock images
        if (content.includes("Clock") && !content.includes("–")) {
          // For files like "01 N Clock.jpg"
          if (/^\d+\s+[A-Z]\s+Clock\.[^.]+$/.test(content)) {
            return {
              question: "Where is the clock?",
              answer: "The clock is on the wall."
            };
          }
          
          // For files like "Where is the Clock – in the Bedroom.gif"
          if (content.toLowerCase().includes("where is the clock")) {
            const locationMatch = content.match(/in the ([A-Za-z]+)/i);
            const location = locationMatch ? locationMatch[1] : "room";
            return {
              question: "Where is the clock?",
              answer: `The clock is in the ${location}.`
            };
          }
          
          // For files with "What is the Time"
          if (content.toLowerCase().includes("what is the time")) {
            return {
              question: "What is the time?",
              answer: "It is ___ o'clock."
            };
          }
        }
      }
      
      // Special handling for 00 X pattern files - prioritize these for all books
      if (/^00\s+[A-Z]/.test(content)) {
        // For files like "00 E.png" (just a letter), display a contextual title
        if (/^00\s+[A-Z]\.[^.]+$/.test(content)) {
          const mainLetter = content.match(/^00\s+([A-Z])\./)?.[1];
          
          // Custom titles based on unit content
          if (mainLetter === 'E' && bookId?.includes('5')) {
            return {
              question: "Household Chores",
              answer: null
            };
          } else if (mainLetter === 'C' && bookId?.includes('1')) {
            return {
              question: "Let's Say Hello",
              answer: null
            };
          } else if (mainLetter === 'E' && bookId === "book3" && unitNumber === 2) {
            return {
              question: "Time and Daily Routine",
              answer: null
            };
          } else {
            // For other units, use a generic intro title
            return {
              question: "Unit Introduction",
              answer: null
            };
          }
        }
      }
      
      // Remove file extension
      const withoutExtension = content.replace(/\.[^/.]+$/, "");
      
      // Check if it contains a question or a dash for the question-answer format
      if (withoutExtension.includes(" – ")) {
        const parts = withoutExtension.split(" – ");
        if (parts.length >= 2) {
          // Extract the question (first part)
          let question = parts[0];
          
          // Remove the leading number codes (like "01 N A " or "05 Y Xb " or "00 E C ")
          question = question.replace(/^\d+\s+[A-Z](\s+[A-Z])?(\s+[A-Za-z])?(\s+)?/, "");
          
          // Format the question: remove unnecessary words, fix "A/An" articles, proper spacing
          question = question
            .replace(/\b([Aa])\s+(?=[A-Z])/g, "") // Remove standalone "A" before uppercase words
            .replace(/\s{2,}/g, ' ') // Clean up multiple spaces
            .trim();
          
          // Special handling for various grammatical errors
          if (question.toLowerCase().startsWith("hat is")) {
            question = "What is" + question.substring(6);
          }
          
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
      
      // For non-dash content, clean up the title
      let cleanedTitle = withoutExtension
        .replace(/^\d+\s+[A-Z](\s+[A-Z])?(\s+[A-Za-z])?(\s+)?/, "") // Remove leading codes
        .replace(/\b([Aa])\s+(?=[A-Z])/g, "") // Remove "A" before uppercase words
        .replace(/\s{2,}/g, ' ') // Clean up multiple spaces
        .trim();
      
      // Special handling for various patterns
      
      // Book 5 household chores specific patterns
      if (cleanedTitle.includes("Opinion on House Chores")) {
        cleanedTitle = "What is your opinion on household chores?";
      }
      
      if (cleanedTitle.toLowerCase().includes("are chores relaxing")) {
        cleanedTitle = "Are chores relaxing?";
      }
      
      // Special handling for grammatical errors and missing first letters
      if (cleanedTitle.toLowerCase().startsWith("hat is")) {
        cleanedTitle = "What is" + cleanedTitle.substring(6);
      } else if (cleanedTitle.toLowerCase().startsWith("ideo ")) {
        cleanedTitle = "V" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("rite ")) {
        cleanedTitle = "W" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("eek ")) {
        cleanedTitle = "P" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("eekaboo ")) {
        cleanedTitle = "P" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("lashcards ")) {
        cleanedTitle = "F" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("here ")) {
        cleanedTitle = "W" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("ho ")) {
        cleanedTitle = "W" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("hy ")) {
        cleanedTitle = "W" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("hen ")) {
        cleanedTitle = "W" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("an ")) {
        cleanedTitle = "C" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("o ")) {
        cleanedTitle = "D" + cleanedTitle;
      } else if (cleanedTitle.toLowerCase().startsWith("oes ")) {
        cleanedTitle = "D" + cleanedTitle;
      }
      
      // Handle special cases for Book 0A/0C
      if (bookId === "book0a" || bookId === "book0c") {
        if (cleanedTitle.toLowerCase() === "flashcards craft peekaboo") {
          cleanedTitle = "What game can we play with these flashcards?";
        } else if (cleanedTitle.toLowerCase() === "video song peekaboo song") {
          cleanedTitle = "What is this Peek-a-boo song about?";
        } else if (cleanedTitle.toLowerCase() === "video story") {
          cleanedTitle = "What is this story about?";
        } else if (cleanedTitle.toLowerCase().startsWith("video song")) {
          cleanedTitle = "What is this song teaching us?";
        } else if (cleanedTitle.toLowerCase().startsWith("video teacher")) {
          cleanedTitle = "What teaching activity is shown here?";
        }
        
        // Special handling for Flashcards with locations
        const flashcardLocationMatch = cleanedTitle.match(/Flashcards\s+(in|on|under)\s+the\s+([A-Za-z]+)/i);
        if (flashcardLocationMatch) {
          const preposition = flashcardLocationMatch[1]; // "in", "on", or "under" 
          const location = flashcardLocationMatch[2]; // "Bowl", "Book", etc.
          cleanedTitle = `Where are the flashcards?`;
        }
      }
      
      // Add question mark for questions
      if (isQuestion(cleanedTitle) && !cleanedTitle.endsWith("?")) {
        cleanedTitle = cleanedTitle + "?";
      }
      
      // Make first letter uppercase
      cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);
      
      // Generate appropriate answer prompts based on question structure
      const answerPrompt = generateAnswerPrompt(cleanedTitle);
      
      return {
        question: cleanedTitle,
        answer: answerPrompt
      };
    } catch (error) {
      // If any error, return null to hide unnecessary content
      console.error("Error formatting content title:", error);
      return {
        question: null,
        answer: null
      };
    }
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
      className="p-4 min-h-[50vh] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Display formatted question if available - BEFORE the content for visual flow */}
      {formattedQuestion && (
        <motion.div 
          className="mb-6 text-center"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-3">{formattedQuestion}</h2>
          {answer && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-lg text-gray-700 font-medium">{answer}</p>
            </div>
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