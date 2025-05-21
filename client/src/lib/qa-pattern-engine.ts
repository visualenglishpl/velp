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
  | 'daily-routine'
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
  
  // Check for daily routine patterns (meals, activities by time of day)
  if (
    lowercaseFilename.includes('what do you eat') || 
    lowercaseFilename.includes('what do you have for') ||
    lowercaseFilename.includes('what time do you') ||
    lowercaseFilename.includes('in the morning') ||
    lowercaseFilename.includes('in the afternoon') ||
    lowercaseFilename.includes('in the evening') ||
    lowercaseFilename.includes('at night') ||
    lowercaseFilename.includes('for breakfast') ||
    lowercaseFilename.includes('for lunch') ||
    lowercaseFilename.includes('for dinner')
  ) {
    return 'daily-routine';
  }
  
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
    case 'daily-routine': {
      const lowercaseFilename = filename.toLowerCase();
      
      // Normalize the filename to handle special characters
      const normalizedFilename = lowercaseFilename
        .replace(/[–—]/g, '-')           // Normalize different types of dashes
        .replace(/["''""]/g, '')         // Remove various quotes
        .replace(/\s+/g, ' ')            // Normalize multiple spaces
        .trim();
        
      console.log("DEBUG: Processing daily routine filename:", normalizedFilename);
      
      // Handle "What do you eat in the afternoon" pattern - multiple variations
      if (normalizedFilename.includes('what do you eat in the afternoon') || 
          normalizedFilename.includes('eat in the afternoon') ||
          (normalizedFilename.includes('eat') && normalizedFilename.includes('afternoon'))) {
        return {
          question: 'What do you eat in the afternoon?',
          answer: 'I eat lunch in the afternoon.',
          generatedBy: 'pattern-engine'
        };
      }
      
      // Handle "What do you have for dinner in the evening" pattern - multiple variations
      if (normalizedFilename.includes('what do you have for dinner in the evening') || 
          normalizedFilename.includes('dinner in the evening') ||
          (normalizedFilename.includes('dinner') && normalizedFilename.includes('evening'))) {
        return {
          question: 'What do you have for dinner in the evening?',
          answer: 'I have pasta/rice/meat/vegetables for dinner in the evening.',
          generatedBy: 'pattern-engine'
        };
      }
      
      // Handle "What time do you go to sleep at night" pattern
      if (lowercaseFilename.includes('what time do you go to sleep at night')) {
        return {
          question: 'What time do you go to sleep at night?',
          answer: 'I go to sleep at 9/10/11 o\'clock at night.',
          generatedBy: 'pattern-engine'
        };
      }
      
      // Handle breakfast questions
      if (lowercaseFilename.includes('for breakfast') || 
          (lowercaseFilename.includes('eat') && lowercaseFilename.includes('morning'))) {
        return {
          question: 'What do you eat for breakfast in the morning?',
          answer: 'I eat cereal/toast/eggs for breakfast in the morning.',
          generatedBy: 'pattern-engine'
        };
      }
      
      // For other daily routine questions, extract the question from the filename
      // and provide a generic but helpful answer template
      const questionMatch = lowercaseFilename.match(/what\s(.+?)\?/i) || 
                           lowercaseFilename.match(/what\s(.+?)\.gif/i) ||
                           lowercaseFilename.match(/what\s(.+?)\.png/i);
      
      if (questionMatch && questionMatch[1]) {
        const questionText = `What ${questionMatch[1]}?`;
        return {
          question: questionText,
          answer: 'I [appropriate response based on the question].',
          generatedBy: 'pattern-engine'
        };
      }
      
      // Generic daily routine question if no specific match
      return {
        question: 'What do you do during this time of day?',
        answer: 'I [activity appropriate for the time of day shown].',
        generatedBy: 'pattern-engine'
      };
    }
    
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
  // Debug level: 0=none, 1=important, 2=details
  const debugLevel = 1;
  
  // Helper function to log with debug level
  const logDebug = (message: string, level: number = 1) => {
    if (level <= debugLevel) {
      console.log(message);
    }
  };
  
  // If bookIdOrMappings is a string (bookId), create an empty mappings object
  const mappings: Record<string, QuestionAnswer> = typeof bookIdOrMappings === 'string' ? {} : bookIdOrMappings;
  
  // STRATEGY 1: First, try to find a direct match in mappings
  if (mappings[filename]) {
    logDebug(`✅ PATTERN ENGINE: Direct match for filename`, 1);
    return {
      ...mappings[filename],
      source: 'direct-match'
    };
  }
  
  // STRATEGY 2: Try with the filename without extension
  const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '').trim();
  if (mappings[filenameWithoutExt]) {
    logDebug(`✅ PATTERN ENGINE: Match for filename without extension`, 1);
    return {
      ...mappings[filenameWithoutExt],
      source: 'direct-match-no-ext'
    };
  }
  
  // STRATEGY 3: Check for dash pattern in filename (what is it - it is a pencil)
  const dashPattern = /([^-–]+)\s*[-–]\s*(.+?)(\.(png|jpg|jpeg|gif|webp|mp4)|$)/i;
  const dashMatch = filename.match(dashPattern);
  
  if (dashMatch && dashMatch[1] && dashMatch[2]) {
    const question = dashMatch[1].trim();
    const answer = dashMatch[2].trim();
    
    if (question && answer) {
      logDebug(`✅ PATTERN ENGINE: Q&A extracted from dash pattern`, 1);
      return {
        question: question.endsWith('?') ? question : question + '?',
        answer: answer.endsWith('.') ? answer : answer + '.',
        generatedBy: 'pattern-engine',
        source: 'dash-pattern'
      };
    }
  }
  
  // STRATEGY 4: Check for section code match
  const sectionMatch = filename.match(/^(\d{2}\s*[A-Za-z]\s*[a-zA-Z]?)/);
  const sectionCode = sectionMatch ? sectionMatch[1].trim() : '';
  
  // If we have a section code, try to match by that
  if (sectionCode && mappings[sectionCode]) {
    logDebug(`✅ PATTERN ENGINE: Section code match: ${sectionCode}`, 1);
    return {
      ...mappings[sectionCode],
      source: 'section-match'
    };
  }
  
  // STRATEGY 5: Try with just the main part of the section code (01 R A -> 01 R)
  if (sectionCode) {
    const mainSectionParts = sectionCode.split(' ');
    if (mainSectionParts.length >= 2) {
      const mainSection = mainSectionParts.slice(0, 2).join(' ');
      
      if (mappings[mainSection]) {
        logDebug(`✅ PATTERN ENGINE: Main section match: ${mainSection}`, 1);
        return {
          ...mappings[mainSection],
          source: 'main-section-match'
        };
      }
      
      // STRATEGY 6: Try with just the numeric part (01 R A -> 01)
      const numericPart = mainSectionParts[0];
      const numericMatches = Object.keys(mappings).filter(key => 
        key.startsWith(numericPart + ' ')
      );
      
      if (numericMatches.length > 0) {
        logDebug(`✅ PATTERN ENGINE: Numeric section match: ${numericPart}`, 1);
        return {
          ...mappings[numericMatches[0]],
          source: 'numeric-match'
        };
      }
    }
  }
  
  // STRATEGY 7: Generate a QA pair based on the filename pattern
  const generatedQA = generateQuestionAnswer(filename, unitId);
  if (generatedQA) {
    logDebug(`✅ PATTERN ENGINE: Generated QA based on pattern`, 1);
    return {
      ...generatedQA,
      source: 'pattern-generation'
    };
  }
  
  // STRATEGY 8: Try to extract questions from common patterns in the filename
  // Check for specific country codes or keywords
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('01 r') || lowerFilename.includes('poland')) {
    logDebug(`✅ PATTERN ENGINE: Poland country match`, 1);
    return {
      question: "What country is this?",
      answer: "It is Poland.",
      generatedBy: 'pattern-engine',
      source: 'country-match'
    };
  } else if (lowerFilename.includes('02 n') || lowerFilename.includes('britain') || lowerFilename.includes('uk')) {
    logDebug(`✅ PATTERN ENGINE: UK/Britain country match`, 1);
    return {
      question: "What country is this?",
      answer: "It is Britain/UK.",
      generatedBy: 'pattern-engine',
      source: 'country-match'
    };
  }
  
  // Check for common objects
  if (lowerFilename.includes('pencil')) {
    logDebug(`✅ PATTERN ENGINE: Pencil keyword match`, 1);
    return {
      question: "What is it?",
      answer: "It is a pencil.",
      generatedBy: 'pattern-engine',
      source: 'keyword-match'
    };
  } else if (lowerFilename.includes('ruler')) {
    logDebug(`✅ PATTERN ENGINE: Ruler keyword match`, 1);
    return {
      question: "What is it?",
      answer: "It is a ruler.",
      generatedBy: 'pattern-engine',
      source: 'keyword-match'
    };
  } else if (lowerFilename.includes('scissors')) {
    logDebug(`✅ PATTERN ENGINE: Scissors keyword match`, 1);
    return {
      question: "What are they?",
      answer: "They are scissors.",
      generatedBy: 'pattern-engine',
      source: 'keyword-match'
    };
  } else if (lowerFilename.includes('sharpener')) {
    logDebug(`✅ PATTERN ENGINE: Sharpener keyword match`, 1);
    return {
      question: "What is it?",
      answer: "It is a sharpener.",
      generatedBy: 'pattern-engine',
      source: 'keyword-match'
    };
  }
  
  // STRATEGY 9: Use context from unitId to generate questions
  if (unitId) {
    const unitIdLower = unitId.toLowerCase();
    
    if (unitIdLower.includes('unit2') || unitIdLower.includes('school')) {
      // Extract specific school object from filename
      const lowerFilename = filename.toLowerCase();
      
      // Check for specific school supplies
      if (lowerFilename.includes('pencil')) {
        logDebug(`✅ PATTERN ENGINE: School objects - pencil match`, 1);
        return {
          question: "What is it?",
          answer: "It is a pencil.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('ruler')) {
        logDebug(`✅ PATTERN ENGINE: School objects - ruler match`, 1);
        return {
          question: "What is it?",
          answer: "It is a ruler.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('eraser')) {
        logDebug(`✅ PATTERN ENGINE: School objects - eraser match`, 1);
        return {
          question: "What is it?",
          answer: "It is an eraser.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('scissors')) {
        logDebug(`✅ PATTERN ENGINE: School objects - scissors match`, 1);
        return {
          question: "What is it?",
          answer: "It is a pair of scissors.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('pen')) {
        // Check for comparison questions (is it A or B pen)
        if ((lowerFilename.includes('is it a') || lowerFilename.includes('is it')) && lowerFilename.includes('or')) {
          // Try several different pattern matching approaches
          
          // Pattern 1: is it a X or a Y pen
          let optionsMatch = lowerFilename.match(/is it a ([a-z]+) or (?:a )?([a-z]+) pen/i);
          
          // Pattern 2: is it a X or Y pen (no second article)
          if (!optionsMatch) {
            optionsMatch = lowerFilename.match(/is it (?:a|an) ([a-z]+) or ([a-z]+) pen/i);
          }
          
          // Pattern 3: is it X or Y pen (no articles)
          if (!optionsMatch) {
            optionsMatch = lowerFilename.match(/is it ([a-z]+) or ([a-z]+) pen/i);
          }
          
          // Handle the case for "girl or boy pen" specifically
          if (lowerFilename.includes('girl') && lowerFilename.includes('boy')) {
            logDebug(`✅ PATTERN ENGINE: School objects - girl/boy pen match`, 1);
            return {
              question: "Is it a girl or boy pen?",
              answer: "It is a girl pen. / It is a boy pen.",
              generatedBy: 'pattern-engine',
              source: 'unit-context'
            };
          }
          
          // Handle the case for "hotdog or hamburger pen" specifically
          if (lowerFilename.includes('hotdog') && lowerFilename.includes('hamburger')) {
            logDebug(`✅ PATTERN ENGINE: School objects - hotdog/hamburger pen match`, 1);
            return {
              question: "Is it a hotdog or hamburger pen?",
              answer: "It is a hotdog pen. / It is a hamburger pen.",
              generatedBy: 'pattern-engine',
              source: 'unit-context'
            };
          }
          
          // Handle the case for "lion or tiger pen" specifically
          if (lowerFilename.includes('lion') && lowerFilename.includes('tiger')) {
            logDebug(`✅ PATTERN ENGINE: School objects - lion/tiger pen match`, 1);
            return {
              question: "Is it a lion or tiger pen?",
              answer: "It is a lion pen. / It is a tiger pen.",
              generatedBy: 'pattern-engine',
              source: 'unit-context'
            };
          }
          
          // If we found a match through any of the patterns
          if (optionsMatch && optionsMatch[1] && optionsMatch[2]) {
            const option1 = optionsMatch[1].trim();
            const option2 = optionsMatch[2].trim();
            
            logDebug(`✅ PATTERN ENGINE: School objects - comparison pen match (${option1} or ${option2})`, 1);
            return {
              question: `Is it a ${option1} or ${option2} pen?`,
              answer: `It is a ${option1} pen. / It is a ${option2} pen.`,
              generatedBy: 'pattern-engine',
              source: 'unit-context'
            };
          }
        }
        
        // Default pen match
        logDebug(`✅ PATTERN ENGINE: School objects - pen match`, 1);
        return {
          question: "What is it?",
          answer: "It is a pen.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('sharpener')) {
        logDebug(`✅ PATTERN ENGINE: School objects - sharpener match`, 1);
        return {
          question: "What is it?",
          answer: "It is a sharpener.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('book')) {
        logDebug(`✅ PATTERN ENGINE: School objects - book match`, 1);
        return {
          question: "What is it?",
          answer: "It is a book.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('pencil case')) {
        logDebug(`✅ PATTERN ENGINE: School objects - pencil case match`, 1);
        return {
          question: "What is it?",
          answer: "It is a pencil case.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else if (lowerFilename.includes('backpack') || lowerFilename.includes('school bag')) {
        logDebug(`✅ PATTERN ENGINE: School objects - backpack match`, 1);
        return {
          question: "What is it?",
          answer: "It is a backpack.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      } else {
        // Generic school object fallback
        logDebug(`✅ PATTERN ENGINE: Generic school objects match`, 1);
        return {
          question: "What is it?",
          answer: "It is a school object.",
          generatedBy: 'pattern-engine',
          source: 'unit-context'
        };
      }
    } else if (unitIdLower.includes('unit17') || unitIdLower.includes('country')) {
      logDebug(`✅ PATTERN ENGINE: Country unit match`, 1);
      return {
        question: "Where is this flag from?",
        answer: "This flag is from [country].",
        generatedBy: 'pattern-engine',
        source: 'unit-context'
      };
    }
  }
  
  // FINAL FALLBACK: Check if it's a video, otherwise leave blank
  logDebug(`⚠️ PATTERN ENGINE: Using ultimate fallback for ${filename}`, 1);
  
  // For videos, return a generic video instruction
  if (filename.toLowerCase().includes('video')) {
    return {
      question: "Watch the video",
      answer: "Follow along with the video activity.",
      generatedBy: 'pattern-engine',
      source: 'video-fallback'
    };
  }
  
  // For all other slides with no question, leave blank as requested
  logDebug(`📝 No question found for ${filename}, leaving blank as requested`, 1);
  return {
    question: '', // Leave blank as requested when no question is found
    answer: '',
    generatedBy: 'pattern-engine',
    source: 'blank-fallback'
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