/**
 * Question-Answer Pattern Engine
 * 
 * This system uses a rule-based approach to automatically generate questions and answers
 * based on filename patterns, without requiring explicit mappings for every single file.
 * 
 * It can handle a wide variety of filename patterns and extract the relevant information
 * to create appropriate questions and answers.
 */

import { QuestionAnswer } from '@/hooks/use-excel-qa';

// Define pattern types that we commonly see in the ESL content
type PatternType = 
  | 'color-question' 
  | 'what-is-it'
  | 'fake-or-real'
  | 'weather'
  | 'emotions'
  | 'numbers'
  | 'shapes'
  | 'family'
  | 'classroom'
  | 'animals'
  | 'food'
  | 'fruits'
  | 'vegetables'
  | 'body-parts'
  | 'worksheet'
  | 'game'
  | 'video'
  | 'can-do'
  | 'hotels'
  | 'unknown';

// Define units that we know about
const KNOWN_UNITS: Record<string, string> = {
  'unit2': 'SCHOOL OBJECTS',
  'unit3': 'CLASSROOM RULES',
  'unit4': 'HOW ARE YOU',
  'unit5': 'FAMILY',
  'unit6': 'MY FAVOURITE COLOUR',
  'unit8': 'SHAPES',
  'unit11': 'SEASONS OF THE YEAR',
  'unit12': 'HOME SWEET HOME',
  'unit13': 'DO YOU HAVE A PET',
  'unit15': 'FRUIT',
  'unit16': 'VEGETABLES',
  'unit17': 'HOW IS THE WEATHER',
  'unit18': 'WHAT CAN YOU DO'
};

// Colors we know about
const COLORS = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 
  'black', 'white', 'brown', 'gray', 'grey', 'gold', 'silver'
];

// Items and their typical colors
const TYPICAL_COLORS: Record<string, string> = {
  'banana': 'yellow',
  'apple': 'red',
  'sky': 'blue',
  'grass': 'green',
  'orange': 'orange',
  'frog': 'green',
  'lemon': 'yellow',
  'sun': 'yellow',
  'snow': 'white',
  'night': 'black'
};

/**
 * Determines the type of pattern from a filename
 */
export function determinePatternType(filename: string, unitId: string = ''): PatternType {
  const lowercaseFilename = filename.toLowerCase();
  
  // Check for color-related patterns
  if (
    lowercaseFilename.includes('colour') || 
    lowercaseFilename.includes('color') ||
    COLORS.some(color => lowercaseFilename.includes(color))
  ) {
    return 'color-question';
  }
  
  // Check for "what is it" patterns
  if (lowercaseFilename.includes('what is it')) {
    return 'what-is-it';
  }
  
  // Check for fake or real patterns
  if (lowercaseFilename.includes('fake or real')) {
    return 'fake-or-real';
  }
  
  // Check for worksheet patterns
  if (lowercaseFilename.includes('worksheet')) {
    return 'worksheet';
  }
  
  // Check for game patterns
  if (lowercaseFilename.includes('game')) {
    return 'game';
  }
  
  // Check for video patterns
  if (lowercaseFilename.includes('video')) {
    return 'video';
  }
  
  // Use unit ID as a hint for other content types
  if (unitId) {
    // Extract unit number from paths like "book1/unit8" or "unit8"
    const unitMatch = unitId.match(/unit(\d+)/i);
    const unitNumber = unitMatch ? unitMatch[1] : null;
    
    if (unitNumber) {
      // Check for book7/unit4 specifically
      if (unitId.includes('book7') && unitNumber === '4') {
        return 'hotels';
      }
    
      switch (unitNumber) {
        case '8': return 'shapes';
        case '4': return 'emotions';
        case '5': return 'family';
        case '13': return 'animals';
        case '15': return 'fruits';
        case '16': return 'vegetables';
        case '17': return 'weather';
        case '18': return 'can-do';
        default: break;
      }
    }
  }
  
  return 'unknown';
}

/**
 * Extracts an object name from a filename using various patterns
 */
export function extractObjectFromFilename(filename: string): string | null {
  const lowercaseFilename = filename.toLowerCase();
  
  // Pattern: "What is It – It is A [Object]"
  const objectMatch1 = lowercaseFilename.match(/what is it[\s\-–]+it is an?\s+(.+?)(\.|\s|$)/i);
  if (objectMatch1 && objectMatch1[1]) {
    return objectMatch1[1].trim();
  }
  
  // Pattern: "What Colour is the [Object]"
  const objectMatch2 = lowercaseFilename.match(/what colou?r is the\s+(.+?)(\s+–|\s*$|\?|\.|–)/i);
  if (objectMatch2 && objectMatch2[1]) {
    return objectMatch2[1].trim();
  }
  
  // Pattern: "What Colour are the [Objects]"
  const objectMatch3 = lowercaseFilename.match(/what colou?r are the\s+(.+?)(\s+–|\s*$|\?|\.|–)/i);
  if (objectMatch3 && objectMatch3[1]) {
    return objectMatch3[1].trim();
  }
  
  // Extract the filename's base part (without extension)
  const filenameBase = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '');
  
  // For filenames like "02 A Black Cat"
  const simpleObjectMatch = filenameBase.match(/\d{2}\s+[A-Z]\s+([A-Za-z]+\s+[A-Za-z]+)$/i);
  if (simpleObjectMatch && simpleObjectMatch[1]) {
    return simpleObjectMatch[1].trim();
  }
  
  return null;
}

/**
 * Extracts a color from a filename
 */
export function extractColorFromFilename(filename: string): string | null {
  const lowercaseFilename = filename.toLowerCase();
  
  // Check for explicit colors in the filename
  for (const color of COLORS) {
    if (lowercaseFilename.includes(color)) {
      return color;
    }
  }
  
  // Extract color from "It is A [Color] [Object]" pattern
  const colorObjectMatch = lowercaseFilename.match(/it is an?\s+([a-z]+)\s+([a-z]+)/i);
  if (colorObjectMatch && COLORS.includes(colorObjectMatch[1].toLowerCase())) {
    return colorObjectMatch[1].toLowerCase();
  }
  
  // Try to guess from the object, if we know its typical color
  const object = extractObjectFromFilename(filename);
  if (object && TYPICAL_COLORS[object.toLowerCase()]) {
    return TYPICAL_COLORS[object.toLowerCase()];
  }
  
  return null;
}

/**
 * Generates a question-answer pair for a file based on its filename and pattern
 */
export function generateQuestionAnswer(filename: string, unitId: string = ''): QuestionAnswer | null {
  const patternType = determinePatternType(filename, unitId);
  
  // Different handling based on pattern type
  switch (patternType) {
    case 'hotels': {
      // Hotel-specific questions from Book 7 Unit 4
      
      // Check for vacation type questions
      if (filename.toLowerCase().includes('what vacation is it')) {
        // Extract vacation type
        const vacationMatch = filename.toLowerCase().match(/what vacation is it[^a-z]*(?:–|-)\s*(?:it is|a)\s*(?:a|an)?\s*([a-z\s]+?)(?:vacation)?\s*(?:\.|$)/i);
        const vacationType = vacationMatch && vacationMatch[1] ? vacationMatch[1].trim() : '';
        
        if (vacationType) {
          return {
            question: 'What vacation is it?',
            answer: `It is a ${vacationType} vacation.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      
      // Check for "I think X vacations are interesting or boring"
      if (filename.toLowerCase().includes('interesting or boring')) {
        // Extract vacation type
        const vacationMatch = filename.toLowerCase().match(/i think ([a-z\s]+?) vacations are interesting/i);
        const vacationType = vacationMatch && vacationMatch[1] ? vacationMatch[1].trim() : '';
        
        if (vacationType) {
          return {
            question: `Do I think ${vacationType} vacations are interesting or boring?`,
            answer: `I think ${vacationType} vacations are interesting.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      
      // Check for "Do you go on X vacations"
      if (filename.toLowerCase().includes('do you go on') && filename.toLowerCase().includes('vacation')) {
        // Extract vacation type
        const vacationMatch = filename.toLowerCase().match(/do you go on ([a-z\s]+?) vacations/i);
        const vacationType = vacationMatch && vacationMatch[1] ? vacationMatch[1].trim() : '';
        
        if (vacationType) {
          return {
            question: `Do you go on ${vacationType} vacations?`,
            answer: `Yes, I go on ${vacationType} vacations./No, I don't go on ${vacationType} vacations.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      
      // Check for "Would you like to go on a X vacation"
      if (filename.toLowerCase().includes('would you like to go on')) {
        // Extract vacation type
        const vacationMatch = filename.toLowerCase().match(/would you like to go on a ([a-z\s]+?) vacation/i);
        const vacationType = vacationMatch && vacationMatch[1] ? vacationMatch[1].trim() : '';
        
        if (vacationType) {
          return {
            question: `Would you like to go on a ${vacationType} vacation?`,
            answer: `Yes, I would like to go on a ${vacationType} vacation./No, I wouldn't.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      
      // Check for accommodation type questions
      if (filename.toLowerCase().includes('what is it') && filename.toLowerCase().includes('accommodation')) {
        // Extract accommodation type
        const accommodationMatch = filename.toLowerCase().match(/what is it[^a-z]*(?:–|-)\s*(?:it is|a)\s*(?:a|an)?\s*([a-z\s]+?)\s*(?:\.|$)/i);
        const accommodationType = accommodationMatch && accommodationMatch[1] ? accommodationMatch[1].trim() : '';
        
        if (accommodationType) {
          return {
            question: 'What is it?',
            answer: `It is a ${accommodationType}.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      
      // Use generic question for other hotel/accommodation content
      return {
        question: 'What type of accommodation is shown in the picture?',
        answer: 'This is a [type of accommodation].', 
        generatedBy: 'pattern-engine'
      };
    }
    
    case 'color-question': {
      const object = extractObjectFromFilename(filename);
      const color = extractColorFromFilename(filename);
      
      if (object && color) {
        // Singular or plural for the question
        const isPlural = object.endsWith('s') && !object.endsWith('ss');
        const questionVerb = isPlural ? "are" : "is";
        const answerArticle = isPlural ? "The" : "The";
        const objectWithArticle = `${answerArticle} ${object.toLowerCase()}`;
        
        if (filename.toLowerCase().includes('fake or real')) {
          return {
            question: `What colour ${questionVerb} the ${object.toLowerCase()}? Is the picture fake or real?`,
            answer: `${objectWithArticle} ${questionVerb} ${color}. The picture is fake. / ${objectWithArticle} ${questionVerb} ${color}. The picture is real.`,
            generatedBy: 'pattern-engine'
          };
        } else {
          return {
            question: `What colour ${questionVerb} the ${object.toLowerCase()}?`,
            answer: `${objectWithArticle} ${questionVerb} ${color}.`,
            generatedBy: 'pattern-engine'
          };
        }
      }
      break;
    }
    case 'what-is-it': {
      const object = extractObjectFromFilename(filename);
      const color = extractColorFromFilename(filename);
      
      if (object) {
        const colorPrefix = color ? `${color} ` : '';
        const article = /^[aeiou]/i.test(object) ? 'an' : 'a';
        
        return {
          question: 'What is it?',
          answer: `It is ${article} ${colorPrefix}${object.toLowerCase()}.`,
          generatedBy: 'pattern-engine'
        };
      }
      break;
    }
    case 'fake-or-real': {
      return {
        question: 'Is the picture fake or real?',
        answer: 'The picture is fake. / The picture is real.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'weather': {
      return {
        question: 'How is the weather today?',
        answer: 'The weather is sunny/rainy/cloudy/snowy/windy.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'emotions': {
      return {
        question: 'How are you today?',
        answer: 'I am happy/sad/angry/tired/excited.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'can-do': {
      return {
        question: 'Can you do this activity?',
        answer: 'Yes, I can. / No, I can\'t.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'worksheet': {
      // For worksheets, just provide a generic prompt
      return {
        question: 'This is a worksheet activity.',
        answer: 'Complete the worksheet according to the instructions.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'game': {
      // For games, provide a generic prompt
      return {
        question: 'This is an interactive game.',
        answer: 'Play the game according to the instructions.',
        generatedBy: 'pattern-engine'
      };
    }
    case 'video': {
      // For videos, provide a generic prompt
      return {
        question: 'This is a video activity.',
        answer: 'Watch the video and follow along.',
        generatedBy: 'pattern-engine'
      };
    }
    default: {
      // Extract a section code if possible for better debugging
      const sectionMatch = filename.match(/^(\d{2}\s*[A-Za-z]\s*[a-zA-Z]?)/);
      const sectionCode = sectionMatch ? sectionMatch[1] : '';
      
      // If no pattern match and no questions, leave the slide blank as requested
      return {
        question: '',  // Leave question blank as requested
        answer: '',    // Leave answer blank as requested
        generatedBy: 'pattern-engine'
      };
    }
  }
  
  // If we couldn't generate something specific, return a generic answer
  return {
    question: 'What do you see in this picture?',
    answer: 'I can see [describe what\'s in the image].',
    generatedBy: 'pattern-engine'
  };
}

/**
 * Main function to get a question-answer pair for a file
 * First tries to match with known patterns, then falls back to generation
 * @param filename The filename to get Q&A for
 * @param unitId Optional unit ID for context
 * @param bookIdOrMappings Either a bookId string or mappings object
 */
export function getQuestionAnswer(
  filename: string, 
  unitId: string = '', 
  bookIdOrMappings: string | Record<string, QuestionAnswer> = {}
): QuestionAnswer {
  // If bookIdOrMappings is a string (bookId), create an empty mappings object
  const mappings: Record<string, QuestionAnswer> = typeof bookIdOrMappings === 'string' ? {} : bookIdOrMappings;
  // First, try to find a direct match in mappings
  if (mappings[filename]) {
    return {
      ...mappings[filename],
      source: 'direct-match'
    };
  }
  
  // Extract the basic section code (e.g. "02 A a")
  const sectionMatch = filename.match(/^(\d{2}\s*[A-Za-z]\s*[a-zA-Z]?)/);
  const sectionCode = sectionMatch ? sectionMatch[1].trim() : '';
  
  // If we have a section code, try to match by that
  if (sectionCode && mappings[sectionCode]) {
    return {
      ...mappings[sectionCode],
      source: 'section-match'
    };
  }
  
  // Generate a QA pair based on the filename pattern
  const generatedQA = generateQuestionAnswer(filename, unitId);
  if (generatedQA) {
    return generatedQA;
  }
  
  // Ultimate fallback - leave blank if no question available
  return {
    question: '', // Leave blank as requested when no question is found
    answer: '',
    generatedBy: 'pattern-engine',
    source: 'fallback'
  };
}

/**
 * Utility function to clean up a filename for better pattern matching
 */
export function cleanFilename(filename: string): string {
  return filename
    .replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}