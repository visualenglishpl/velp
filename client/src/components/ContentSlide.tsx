import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ExternalLink, PenTool, BookOpen, EyeOff } from "lucide-react";
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
  
  // Question detection logic
  const isQuestion = (text: string): boolean => {
    if (!text) return false;
    
    const lowercaseText = text.toLowerCase();
    
    // Check for question starters like "is it", "do you", "can he", etc.
    const questionStarters = [
      'is it', 'is he', 'is she', 'are they', 'are you', 
      'are adventure films', 'are comedy films', 'are action films',
      'do you', 'does he', 'does she', 'can you', 'can he', 'can she',
      'have you', 'has he', 'has she', 'did you', 'would you', 'could you', 'would you like',
      'should we', 'what', 'where', 'when', 'why', 'how', 'who', 'which'
    ];
    
    // Check for phrases that indicate questions
    const questionPhrases = [
      'what do you think of', 'what is the', 'which film is', 'is it an interesting',
      'past tense', 'what is she baking', 'did you bake', 'where are they',
      'what is she doing', 'where is he jogging to', 'who is he jogging', 'how often do you'
    ];
    
    return questionStarters.some(starter => lowercaseText.startsWith(starter)) ||
           questionPhrases.some(phrase => lowercaseText.includes(phrase));
  };

  // Generate appropriate answer prompts based on question type following Callan Method
  const generateAnswerPrompt = (question: string): { positive: string, negative: string } | null => {
    if (!question) return null;
    
    const lowercaseQuestion = question.toLowerCase().trim();
    
    // Callan Method patterns for question-answer
    // In Callan Method, answers should:
    // 1. Repeat the key part of the question
    // 2. Provide a complete grammatical sentence
    // 3. Use the same tense as the question
    // 4. Be direct and concise
    
    // Special case for opinion questions (What do you think)
    if (lowercaseQuestion.includes("what do you think of")) {
      return {
        positive: "I think it's interesting. I enjoy it very much.",
        negative: "I don't think much of it. I find it boring."
      };
    }
    
    // Special case for "boring or interesting" questions
    if (lowercaseQuestion.includes("boring or interesting")) {
      return {
        positive: "They are interesting. I enjoy watching them.",
        negative: "They are boring. I don't enjoy watching them."
      };
    }
    
    // Yes/No question patterns with Callan Method style responses
    const questionPatterns: Record<string, { positive: string, negative: string }> = {
      '^do you': {
        positive: "Yes, I do. I do it regularly.",
        negative: "No, I don't. I never do it."
      },
      '^does he': {
        positive: "Yes, he does. He does it often.",
        negative: "No, he doesn't. He never does it."
      },
      '^does she': {
        positive: "Yes, she does. She does it regularly.",
        negative: "No, she doesn't. She never does it."
      },
      '^can you': {
        positive: "Yes, I can. I can do it well.",
        negative: "No, I can't. I can't do it at all."
      },
      '^can he': {
        positive: "Yes, he can. He can do it very well.",
        negative: "No, he can't. He can't do it at all."
      },
      '^can she': {
        positive: "Yes, she can. She can do it perfectly.",
        negative: "No, she can't. She can't do it at all."
      },
      '^is it': {
        positive: "Yes, it is. It's exactly that.",
        negative: "No, it isn't. It's not like that at all."
      },
      '^is he': {
        positive: "Yes, he is. He is indeed.",
        negative: "No, he isn't. He's not like that at all."
      },
      '^is she': {
        positive: "Yes, she is. She is certainly like that.",
        negative: "No, she isn't. She's not like that at all."
      },
      '^are you': {
        positive: "Yes, I am. I am exactly that.",
        negative: "No, I'm not. I'm not like that at all."
      },
      '^are they': {
        positive: "Yes, they are. They are exactly that.",
        negative: "No, they aren't. They're not like that at all."
      },
      '^are action films': {
        positive: "Yes, they are interesting. Action films are full of excitement.",
        negative: "No, they are boring. Action films have too much violence."
      },
      '^are adventure films': {
        positive: "Yes, they are interesting. Adventure films are full of excitement.",
        negative: "No, they are boring. Adventure films are too predictable."
      },
      '^are comedy films': {
        positive: "Yes, they are interesting. Comedy films make me laugh.",
        negative: "No, they are boring. Comedy films aren't funny enough."
      },
      '^have you': {
        positive: "Yes, I have. I have done it many times.",
        negative: "No, I haven't. I've never done it before."
      },
      '^has he': {
        positive: "Yes, he has. He has done it recently.",
        negative: "No, he hasn't. He's never done it before."
      },
      '^has she': {
        positive: "Yes, she has. She has done it several times.",
        negative: "No, she hasn't. She's never done it before."
      },
      '^did you': {
        positive: "Yes, I did. I did it yesterday.",
        negative: "No, I didn't. I didn't do it at all."
      },
      '^would you': {
        positive: "Yes, I would. I would do it anytime.",
        negative: "No, I wouldn't. I wouldn't ever do it."
      },
      '^would you like': {
        positive: "Yes, I would like that very much.",
        negative: "No, I wouldn't like that at all."
      },
      '^could you': {
        positive: "Yes, I could. I could do it easily.",
        negative: "No, I couldn't. I couldn't do it at all."
      },
      '^should we': {
        positive: "Yes, we should. We should definitely do it.",
        negative: "No, we shouldn't. We shouldn't do it at all."
      }
    };
    
    // Check for yes/no question patterns
    for (const [pattern, answers] of Object.entries(questionPatterns)) {
      if (new RegExp(pattern, 'i').test(lowercaseQuestion)) {
        return answers;
      }
    }
    
    // Check for special WH-questions with Callan Method style responses
    const whQuestionPhrases = {
      'what is the name': {
        positive: "The name is Scotland. Scotland is a country in the United Kingdom.",
        negative: "I don't know the name. I've never heard of it before."
      },
      'which film is': {
        positive: "The film is from Hunger Games. Hunger Games is a popular movie series.",
        negative: "I don't know which film it is. I haven't seen it before."
      },
      'what do prop masters do': {
        positive: "Prop masters design and prepare props. They ensure all objects used in films are ready.",
        negative: "I don't know what prop masters do. I'm not familiar with film production."
      },
      'what do hair stylists do': {
        positive: "Hair stylists style actors' hair. They ensure everyone looks right for their role.",
        negative: "I don't know what hair stylists do exactly. I've never worked in a salon."
      },
      'what is the past tense of': {
        positive: "The past tense is 'baked'. Yesterday, she baked a cake.",
        negative: "I don't know the past tense. English irregular verbs are difficult."
      },
      'what is she baking': {
        positive: "She is baking cookies. She's using flour, sugar, and chocolate chips.",
        negative: "She is baking a cake. She's using flour, eggs, and sugar."
      },
      'did you bake last weekend': {
        positive: "Yes, I baked last weekend. I baked some delicious cookies.",
        negative: "No, I didn't bake last weekend. I didn't have time to bake."
      },
      'what is she doing': {
        positive: "She is jogging. She is running at a steady pace for exercise.",
        negative: "She is walking. She is moving at a normal pace down the street."
      },
      'where are they jogging': {
        positive: "They are jogging in the park. The park has a nice jogging path.",
        negative: "They are jogging on the beach. The sand makes jogging more difficult."
      },
      'where is he jogging to': {
        positive: "He is jogging to the station. The station is about two kilometers away.",
        negative: "He is jogging to the park. The park has a nice lake in the center."
      },
      'who is he jogging': {
        positive: "John is jogging. John jogs every morning before work.",
        negative: "The teacher is jogging. The teacher stays fit by jogging regularly."
      },
      'how often do you jog': {
        positive: "I jog three times a week. I usually jog in the mornings before breakfast.",
        negative: "I rarely jog. I prefer swimming or cycling for exercise."
      },
      'how often do you': {
        positive: "I do it frequently. I do it at least three times a week.",
        negative: "I rarely do it. I might do it once a month at most."
      },
      'where is the flag from': {
        positive: "The flag is from Poland. The Polish flag is red and white.",
        negative: "The flag is not from Poland. It's from another European country."
      },
      'what colour is the polish flag': {
        positive: "The Polish flag is red and white. The top half is white and the bottom half is red.",
        negative: "The Polish flag is not red and white. You might be thinking of another country's flag."
      },
      'where are the clothes from': {
        positive: "The clothes are from Poland. Poland has a strong textile industry.",
        negative: "The clothes are not from Poland. They are from a different European country."
      },
      'where are the cities': {
        positive: "The cities are in Poland. Poland has many beautiful cities like Warsaw and Kraków.",
        negative: "The cities are not in Poland. They are in another European country."
      },
      'what is the biggest city in poland': {
        positive: "The biggest city in Poland is Warsaw. Warsaw is Poland's capital and has over 1.7 million people.",
        negative: "The biggest city in Poland is not Warsaw. Kraków is another large Polish city but not the biggest."
      },
      'what is the capital of poland': {
        positive: "The capital of Poland is Warsaw. Warsaw has been Poland's capital since 1596.",
        negative: "The capital of Poland is not Warsaw. Poland has had different capitals throughout its history."
      },
      'what is his nationality': {
        positive: "His nationality is Polish. He is from Poland and speaks Polish.",
        negative: "His nationality is not Polish. He is from another country and speaks a different language."
      },
      'what language does she speak': {
        positive: "She speaks Polish. Polish is the official language of Poland.",
        negative: "She doesn't speak Polish. She speaks a different European language."
      },
      'what is the nationality of people from poland': {
        positive: "The nationality is Polish. People from Poland are Polish.",
        negative: "The nationality is not Polish. I'm not sure about the correct nationality for Poland."
      },
      'what countries are on the british isles': {
        positive: "The countries on the British Isles are England, Scotland, Wales, Northern Ireland, and the Republic of Ireland.",
        negative: "I don't know what countries are on the British Isles. Geography isn't my strongest subject."
      },
      'what countries are in britain': {
        positive: "The countries in Britain are England, Scotland, and Wales. These three countries form Great Britain.",
        negative: "I'm not sure what countries are in Britain. I often confuse Britain with the United Kingdom."
      }
    };
    
    // Check for specific WH-question phrases
    for (const [phrase, answers] of Object.entries(whQuestionPhrases)) {
      if (lowercaseQuestion.includes(phrase)) {
        return answers;
      }
    }
    
    // General check for WH-questions
    const whQuestionStarters = ['what', 'where', 'when', 'why', 'how', 'who', 'which'];
    for (const starter of whQuestionStarters) {
      if (lowercaseQuestion.startsWith(starter)) {
        return {
          positive: "I know the answer.",
          negative: "I don't know."
        };
      }
    }
    
    // Default for unknown question types
    return {
      positive: "Yes, I agree.",
      negative: "No, I disagree."
    };
  };

  // Extract question from filename for display
  const formatContentTitle = () => {
    if (!material.content) {
      return { question: null, answer: null };
    }
    
    try {
      // Get the filename without path
      const filename = material.content.split('/').pop() || material.content;
      
      // Clean the filename by removing extension and prefixes
      const cleaned = cleanFilename(filename);
      
      // Format as a proper question
      let question = cleaned;
      
      // Only capitalize and add question mark if it looks like a question
      if (isQuestion(question)) {
        question = formatQuestion(question);
        const answers = generateAnswerPrompt(question);
        
        return {
          question,
          answer: answers
        };
      }
      
      return { question: null, answer: null };
    } catch (error) {
      console.error("Error formatting content title:", error);
      return { question: null, answer: null };
    }
  };
  
  // Clean filename by removing extension and special prefixes
  const cleanFilename = (filename: string): string => {
    // Remove extension
    let cleaned = filename.split('.')[0];
    
    // Pattern 1: "01 E Aa" or "01 E Bb" or "01 E C" or "02 M A" - numeric followed by letters with spaces
    if (/^\d{1,2}\s+[A-Za-z]+(\s+[A-Za-z]+)?\s+/.test(cleaned)) {
      cleaned = cleaned.replace(/^\d{1,2}\s+[A-Za-z]+(\s+[A-Za-z]+)?\s+/, '');
    }
    
    // Pattern 2: Specific patterns like "01_A_" or "14_D_" at the beginning
    const patterns = [
      /^\d{1,2}_[A-Z]_/,     // matches "01_A_"
      /^\d{1,2}_[A-Z][A-Z]_/, // matches "01_AB_"
      /^\d{1,2}\s+[A-Z]\s+[A-Za-z][a-z]/,  // matches "01 E Aa"
      /^\d{1,2}\s+[A-Z]\s+[A-Za-z][a-z]\s+/, // matches "01 E Bb "
      /^\d{1,2}\s+[A-Z]\s+[A-Z]\s+/, // matches "02 M A "
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '');
        break;
      }
    }
    
    // Handle "What is the Past Tense of X – Y" pattern
    // Extract both the question and answer for later use
    const pastTensePattern = /What is the Past Tense of ([^–]*) – ([^?]*)/i;
    const pastTenseMatch = cleaned.match(pastTensePattern);
    if (pastTenseMatch) {
      const verb = pastTenseMatch[1].trim();
      const pastTense = pastTenseMatch[2].trim();
      // Keep only the question part
      cleaned = `What is the Past Tense of ${verb}`;
    }
    
    // Handle "What is She Baking – X" pattern
    const bakingPattern = /What is She Baking – ([^?]*)/i;
    const bakingMatch = cleaned.match(bakingPattern);
    if (bakingMatch) {
      const item = bakingMatch[1].trim();
      // Keep only the question part
      cleaned = "What is She Baking";
    }
    
    // Handle "Did You X Last Weekend – Yes I Xed – No I Didn't X" pattern
    const weekendPattern = /Did You ([^Last]*) Last Weekend – ([^?]*)/i;
    const weekendMatch = cleaned.match(weekendPattern);
    if (weekendMatch) {
      const verb = weekendMatch[1].trim();
      // Keep only the question part
      cleaned = `Did You ${verb} Last Weekend`;
    }
    
    // Handle "What is She Doing – She is Jogging" pattern
    const doingPattern = /What is She Doing – ([^?]*)/i;
    const doingMatch = cleaned.match(doingPattern);
    if (doingMatch) {
      const activity = doingMatch[1].trim();
      // Keep only the question part
      cleaned = "What is She Doing";
    }
    
    // Handle "Where are They Jogging - in the Park" pattern
    const wherePattern = /Where are They ([^-]*)- ([^?]*)/i;
    const whereMatch = cleaned.match(wherePattern);
    if (whereMatch) {
      const activity = whereMatch[1].trim();
      const location = whereMatch[2].trim();
      // Keep only the question part
      cleaned = `Where are They ${activity}`;
    }
    
    // Handle "Where is He Jogging to – the Toilet" pattern
    const whereToPattern = /Where is He ([^to]*) to – ([^?]*)/i;
    const whereToMatch = cleaned.match(whereToPattern);
    if (whereToMatch) {
      const activity = whereToMatch[1].trim();
      const destination = whereToMatch[2].trim();
      // Keep only the question part
      cleaned = `Where is He ${activity} to`;
    }
    
    // Handle "Who is He Jogging – Santa" pattern
    const whoPattern = /Who is He ([^–]*) – ([^?]*)/i;
    const whoMatch = cleaned.match(whoPattern);
    if (whoMatch) {
      const activity = whoMatch[1].trim();
      const person = whoMatch[2].trim();
      // Keep only the question part
      cleaned = `Who is He ${activity}`;
    }
    
    // Handle "How Often Do You Jog – Often – Sometimes Seldom – Never" pattern
    const howOftenPattern = /How Often Do You ([^–]*) – ([^?]*)/i;
    const howOftenMatch = cleaned.match(howOftenPattern);
    if (howOftenMatch) {
      const activity = howOftenMatch[1].trim();
      const frequencyOptions = howOftenMatch[2].trim();
      // Keep only the question part
      cleaned = `How Often Do You ${activity}`;
    }
    
    // Handle "Where is the Flag From – It is From Poland" pattern
    const flagFromPattern = /Where is the Flag From – ([^?]*)/i;
    const flagFromMatch = cleaned.match(flagFromPattern);
    if (flagFromMatch) {
      // Keep only the question part
      cleaned = "Where is the Flag From";
    }
    
    // Handle "What Colour is the Polish Flag" pattern
    const flagColorPattern = /What Colour is the Polish Flag – ([^?]*)/i;
    const flagColorMatch = cleaned.match(flagColorPattern);
    if (flagColorMatch) {
      // Keep only the question part
      cleaned = "What Colour is the Polish Flag";
    }
    
    // Handle "Where are the Clothes From" pattern
    const clothesFromPattern = /Where are the Clothes From – ([^?]*)/i;
    const clothesFromMatch = cleaned.match(clothesFromPattern);
    if (clothesFromMatch) {
      // Keep only the question part
      cleaned = "Where are the Clothes From";
    }
    
    // Handle "Where are the Cities" pattern
    const citiesPattern = /Where are the Cities – ([^?]*)/i;
    const citiesMatch = cleaned.match(citiesPattern);
    if (citiesMatch) {
      // Keep only the question part
      cleaned = "Where are the Cities";
    }
    
    // Handle "What is the Biggest City in Poland" pattern
    const biggestCityPattern = /What is the Biggest City in Poland – ([^?]*)/i;
    const biggestCityMatch = cleaned.match(biggestCityPattern);
    if (biggestCityMatch) {
      // Keep only the question part
      cleaned = "What is the Biggest City in Poland";
    }
    
    // Handle "What is the Capital of Poland" pattern
    const capitalPattern = /What is the Capital of Poland – ([^?]*)/i;
    const capitalMatch = cleaned.match(capitalPattern);
    if (capitalMatch) {
      // Keep only the question part
      cleaned = "What is the Capital of Poland";
    }
    
    // Handle "What is His Nationality" pattern
    const nationalityPattern = /What is His Nationality – ([^?]*)/i;
    const nationalityMatch = cleaned.match(nationalityPattern);
    if (nationalityMatch) {
      // Keep only the question part
      cleaned = "What is His Nationality";
    }
    
    // Handle "What Language Does She Speak" pattern
    const languagePattern = /What Language Does She Speak – ([^?]*)/i;
    const languageMatch = cleaned.match(languagePattern);
    if (languageMatch) {
      // Keep only the question part
      cleaned = "What Language Does She Speak";
    }
    
    // Handle "Nationality – Poland – Polish" pattern - direct format
    const nationalityDirectPattern = /Nationality – ([^–]*) – ([^?]*)/i;
    const nationalityDirectMatch = cleaned.match(nationalityDirectPattern);
    if (nationalityDirectMatch) {
      const country = nationalityDirectMatch[1].trim();
      const adjective = nationalityDirectMatch[2].trim();
      // Transform into a question
      cleaned = `What is the nationality of people from ${country}`;
    }
    
    // Replace underscores and hyphens with spaces
    cleaned = cleaned.replace(/_/g, ' ').replace(/-/g, ' ');
    
    // Remove extra spaces
    cleaned = cleaned.split(' ').filter(Boolean).join(' ');
    
    return cleaned;
  };
  
  // Format text as proper question
  const formatQuestion = (text: string): string => {
    if (!text) return "";
    
    // Make first letter uppercase
    let formatted = text.charAt(0).toUpperCase() + text.slice(1);
    
    // Add question mark if not present
    if (!formatted.endsWith('?')) {
      formatted += '?';
    }
    
    return formatted;
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
          
          {/* Enhanced image with improved layout and proportional fitting */}
          <div className="flex items-center justify-center w-full py-2" style={{ height: 'calc(100vh - 180px)' }}>
            <motion.div 
              className="relative w-full max-w-[95%] mx-auto h-full"
              style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '10px'
              }}
            >
              <motion.img
                src={getS3Url()}
                alt={material.title || "Educational content"}
                className="max-w-full max-h-full object-contain transition-all duration-300 rounded-lg"
                onLoad={handleImageLoad}
                onError={handleImageError}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
                style={{ 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              />
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
                controls={true}
                className="w-auto max-w-full max-h-[calc(100vh-240px)] mx-auto rounded-lg"
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

  // Function to capitalize questions properly
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
  
  // Parse the content title to extract questions and answers
  const { question, answer } = formatContentTitle();
  
  // Create the formatted question for display
  const formattedQuestion = question ? capitalizeQuestion(question) : null;
  
  return (
    <motion.div 
      className="p-4 min-h-[75vh] flex flex-col bg-white rounded-lg w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Teacher Mode Toggle - Only show if teaching guidance is available */}
      {hasTeachingGuidance && (
        <div className="flex justify-end mb-2">
          <Button 
            variant={showTeacherMode ? "default" : "outline"} 
            size="sm" 
            className={`flex items-center gap-2 ${showTeacherMode ? 'bg-[#a56cf5] hover:bg-[#8c42f4]' : 'border-[#a56cf5] text-[#a56cf5] hover:bg-[#f0e6ff]'}`}
            onClick={toggleTeacherMode}
          >
            {showTeacherMode ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Hide Teaching Resources</span>
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4" />
                <span>Teacher Mode</span>
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Display generated question from filename */}
      {formattedQuestion && (
        <div className="text-center mb-5 mt-2">
          <div className="bg-blue-50 border border-blue-100 rounded-lg py-3 px-5 inline-block shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800">
              {formattedQuestion}
            </h3>
            {answer && (
              <div className="mt-2 flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded border border-green-200">
                  {answer.positive}
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded border border-red-200">
                  {answer.negative}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Centered title display */}
      {material.title && !formattedQuestion && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {material.title}
          </h2>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-grow mt-2 mb-4">
        {renderContent()}
      </div>
      
      {/* Teaching Guidance Section - Only shown when teaching mode is active */}
      {showTeacherMode && hasTeachingGuidance && (
        <TeachingGuidance 
          bookId={bookId} 
          unitNumber={unitNumber}
          onHide={() => setShowTeacherMode(false)}
        />
      )}
      
      {/* Premium content indicator */}
      {isPremium && !hasPurchasedAccess && !hasFreeTrial && (
        <div className="mt-4 w-full">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-center shadow-lg">
            <h3 className="text-xl font-bold text-white mb-3">Premium Content</h3>
            <p className="text-white mb-4">This content is available with a premium subscription.</p>
            <button 
              onClick={onPurchaseClick}
              className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}