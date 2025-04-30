import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Flag, Check, X, RefreshCw, EyeOff, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useExcelQA } from "@/hooks/use-excel-qa";

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
  category?: string;
}

interface QADatabaseEntry {
  code: string;
  question: string;
  answer: string;
  country?: string;
  category?: string;
}

interface FlaggedQuestion {
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion?: string;
  suggestedAnswer?: string;
  reason?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
}

interface ExcelQAEntry {
  filename: string;
  codePattern: string;
  question: string;
  answer: string;
}

interface QuestionAnswerDisplayProps {
  material: {
    id: number;
    description: string;
    content: string;
    title: string;
  };
  isEditMode?: boolean;
  showQuestions?: boolean;
  bookId?: string;
  unitId?: string;
  hasPaidAccess?: boolean;
  index?: number;
  freeSlideLimit?: number;
  onSlideDelete?: (id: number) => void;
}

// Utility functions
const formatText = {
  // Remove file extensions and code patterns, properly capitalize text
  cleanFileName: (filename: string): string => {
    if (!filename) return '';
    // Remove file extensions
    let cleaned = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    // Remove technical codes like "01 RA" or "05 LC"
    cleaned = cleaned.replace(/\d+\s+[a-z]\s+[a-z]/i, '');
    // Properly capitalize first letter of each word
    cleaned = cleaned.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    return cleaned;
  },
  
  // Determine country from content
  determineCountry: (content: string): string => {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('poland') || contentLower.includes('01 r')) {
      return 'POLAND';
    } else if (contentLower.includes('britain') || contentLower.includes('uk') || contentLower.includes('02 n')) {
      return 'BRITAIN / UK';
    } else if (contentLower.includes('ireland') || contentLower.includes('03 g')) {
      return 'NORTHERN IRELAND';
    } else if (contentLower.includes('scotland') || contentLower.includes('04 l')) {
      return 'SCOTLAND';
    } else if (contentLower.includes('england') || contentLower.includes('05 l')) {
      return 'ENGLAND';
    } else if (contentLower.includes('wales') || contentLower.includes('06 h')) {
      return 'WALES';
    } else if (contentLower.includes('australia') || contentLower.includes('07 l')) {
      return 'AUSTRALIA';
    } else if (contentLower.includes('usa') || contentLower.includes('america') || contentLower.includes('08 m')) {
      return 'USA';
    }
    
    return '';
  },
  
  // Extract question and answer directly from filename
  extractQuestionsFromFilename: (filename: string): { question: string, answer: string } | null => {
    if (!filename) return null;
    
    const lowerFilename = filename.toLowerCase();
    // Try to extract format like "What is it - it is a pencil"
    const dashMatch = filename.match(/([^-]+)\s*[\–\-]\s*(.+?)(\.jpg|\.png|\.gif|$)/i);
    
    if (dashMatch) {
      const beforeDash = dashMatch[1].trim();
      const afterDash = dashMatch[2].trim();
      
      // Check if it looks like a question and answer
      if (
        beforeDash.match(/^(what|where|how|why|when|who|which|is|are|do|does|can|could|has|have)/i) && 
        afterDash.length > 0
      ) {
        // Format as proper question
        let question = beforeDash;
        if (!question.endsWith('?')) {
          question += '?';
        }
        
        // Capitalize first letter
        question = question.charAt(0).toUpperCase() + question.slice(1);
        
        // Format answer with proper capitalization
        let answer = afterDash.charAt(0).toUpperCase() + afterDash.slice(1);
        if (!answer.endsWith('.')) {
          answer += '.';
        }
        
        return {
          question,
          answer
        };
      }
    }
    
    return null;
  }
};

// Helper functions to get question and answer for a material
// Import our pattern-engine for advanced pattern detection
import { getQuestionAnswer } from "@/lib/qa-pattern-engine";
// Legacy pattern-mapper for backward compatibility
import { getQAForFilename } from "@/lib/pattern-mapper";

// Debug helper function to log information about scissors content detection
function debugScissorsDetection(content: string): void {
  if (content.toLowerCase().includes('scissors')) {
    console.log(`📊 SCISSORS DEBUG INFO for "${content}":`);
    console.log(`  • Contains '12 N G': ${content.includes('12 N G')}`);
    console.log(`  • Contains 'green scissors': ${content.toLowerCase().includes('green scissors')}`);
    console.log(`  • Regex match for /12\\s*N\\s*G/i: ${Boolean(content.match(/12\s*N\s*G/i))}`);
    
    const sectionMatch = content.match(/(\d{1,2})\s*([A-Za-z])\s*([A-Za-z])/i);
    if (sectionMatch) {
      console.log(`  • Section pattern extracted: ${sectionMatch[1]} ${sectionMatch[2]} ${sectionMatch[3]}`);
    } else {
      console.log(`  • No section pattern extracted`);
    }
  }
}

function getQuestionAnswerFromData(material: any, unitId?: string): QAData {
  const content = material.content || '';
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  
  // Extract country information
  const country = formatText.determineCountry(content);
  
  // Run our debugging helper for scissors detection
  if (content.toLowerCase().includes('scissors')) {
    debugScissorsDetection(content);
  }
  
  // MOST DIRECT CHECK: Exact substring match for "12 N G Do You Have Green Scissors" anywhere in the filename
  if (content.includes('12 N G Do You Have Green Scissors') || 
      content.includes('12 N G Green Scissors') || 
      content.includes('12NG Do You Have Green Scissors')) {
    console.log('🎯 EXACT FILENAME MATCH FOR 12 N G GREEN SCISSORS');
    return {
      country: country,
      question: "Do you have green scissors?",
      answer: "Yes, I have green scissors. / No, I don't have green scissors.",
      hasData: true
    };
  }
  
  // Check if the filename starts with "12 N G" pattern
  if (content.match(/^12\s*N\s*G/i)) {
    console.log('🔎 FILENAME STARTS WITH 12 N G PATTERN');
    return {
      country: country,
      question: "Do you have green scissors?",
      answer: "Yes, I have green scissors. / No, I don't have green scissors.",
      hasData: true
    };
  }
  
  // Special case for the scissors pattern with 12 N G anywhere in the string
  if (content.includes('12 N G') && content.toLowerCase().includes('scissors')) {
    console.log('✂️ SPECIAL DIRECT MAPPING FOR SCISSORS in QuestionAnswerDisplay');
    return {
      country: country,
      question: "Do you have green scissors?",
      answer: "Yes, I have green scissors. / No, I don't have green scissors.",
      hasData: true
    };
  }
  
  // OVERRIDE FOR SLIDES WITH INCORRECT FILENAMES
  // This is a direct visual detection system that matches what's actually visible in the slides
  // regardless of the filename mapping
  
  // VISUAL DETECTION: Try to determine actual content by looking for specific phrases
  // (filenames may not match what's in the slide)
  
  // SECTION 8 - SHARPENER DETECTION - REMOVED due to incorrect matching

  // SECTION 9 - SCHOOL BAG DETECTION - REMOVED due to incorrect matching
  
  // SECTION 10 - RULER DETECTION - REMOVED due to incorrect matching
  
  // SECTION 11 - PENCIL CASE DETECTION - REMOVED due to incorrect matching
  
  // SECTION 12 - SCISSORS DETECTION
  if (content.toLowerCase().includes('scissors')) {
    console.log('🔎 VISUAL DETECTION FOR SCISSORS SLIDES ACTIVATED');
    // Log the entire content string to see exactly what's in the file
    console.log('SLIDE CONTENT STRING:', content);
    
    // ENHANCED SCISSORS DETECTION - works regardless of the actual filename pattern
    
    // General pattern for 12 N X where X is a letter
    const scissorsCodeMatch = content.match(/12\s*N\s*([A-Z])/i);
    const variantCode = scissorsCodeMatch ? scissorsCodeMatch[1].toUpperCase() : '';
    console.log(`🔍 SCISSORS VARIANT DETECTED: ${variantCode || 'NONE'}`);
    
    // COMPREHENSIVE VISUAL MATCHING - content-based detection for specific variants
    
    // Check for the most problematic cases by content, not just by section code
    if (content.toLowerCase().includes('green scissors') || content.includes('12 N G')) {
      console.log('🟢 OVERRIDING WITH DIRECT VISUAL DETECTION: GREEN SCISSORS');
      return {
        country: country,
        question: "Do you have green scissors?",
        answer: "Yes, I have green scissors. / No, I don't have green scissors.",
        hasData: true
      };
    }
    
    // For basic scissors identification
    if (content.includes('12 N.png') || (content.toLowerCase().includes('scissors') && !variantCode)) {
      console.log('⚠️ DETECTED BASIC SCISSORS CASE');
      return {
        country: country,
        question: "What are they?",
        answer: "They are scissors.",
        hasData: true
      };
    }
    
    // For purple scissors
    if (content.toLowerCase().includes('purple scissors') || 
        (content.includes('12 N H') && content.toLowerCase().includes('purple'))) {
      console.log('💜 DETECTED PURPLE SCISSORS');
      return {
        country: country,
        question: "What color are the scissors?",
        answer: "The scissors are purple.",
        hasData: true
      };
    }
    
    // For yellow scissors
    if (content.toLowerCase().includes('yellow scissors') || 
        (content.includes('12 N J') && content.toLowerCase().includes('yellow'))) {
      console.log('💛 DETECTED YELLOW SCISSORS');
      return {
        country: country,
        question: "What color are the scissors?",
        answer: "The scissors are yellow.",
        hasData: true
      };
    }
    
    // For scissors you like
    if (content.toLowerCase().includes('what scissors do you like') || content.includes('12 N K')) {
      console.log('👍 DETECTED SCISSORS PREFERENCE QUESTION');
      return {
        country: country,
        question: "What scissors do you like?",
        answer: "I like these scissors.",
        hasData: true
      };
    }
  }
  
  // FIRST APPROACH: Try our advanced pattern engine
  // This uses sophisticated pattern detection to generate Q&A for any file
  if (material && material.content && typeof unitId === 'string') {
    const currentUnitId = unitId; // Make it clear this is coming from the parameter
    // The unitId is passed as a prop to this component
    console.log(`Using pattern engine for ${content} in book/${currentUnitId}`);
    const patternEngineResult = getQuestionAnswer(content, currentUnitId);
    
    if (patternEngineResult) {
      console.log(`Pattern engine generated Q&A for ${content}:`, patternEngineResult);
      return {
        country: country,
        question: patternEngineResult.question,
        answer: patternEngineResult.answer,
        hasData: true,
        category: `pattern-engine-${patternEngineResult.generatedBy || 'auto'}`
      };
    }
  }
  
  // SECOND APPROACH: Try our legacy pattern-mapper system
  // This provides a consistent mapping across all sections and units
  const patternMapping = getQAForFilename(content);
  if (patternMapping.hasMapping) {
    console.log(`Using standardized pattern mapping system for ${content}`);
    return {
      country: country,
      question: patternMapping.question,
      answer: patternMapping.answer,
      hasData: true
    };
  }
  
  // SECOND APPROACH: Try to extract question and answer directly from the filename using dash patterns
  // Examples: "What is it – It is a pencil.gif", "Where is this flag from – It is from Poland.jpg"
  const extractedFromFilename = formatText.extractQuestionsFromFilename(content);
  if (extractedFromFilename) {
    console.log("Extracted question/answer from filename:", extractedFromFilename);
    return {
      country: country,
      question: extractedFromFilename.question,
      answer: extractedFromFilename.answer,
      hasData: true
    };
  }
  
  // Special case handling for problematic sections (hardcoded fallbacks)
  const lowerContent = content.toLowerCase();
  
  // Special case for scissors - especially the 12 N G pattern
  if (lowerContent.includes('scissors')) {
    console.log('🔍 SCISSORS SPECIAL SECTION DETECTED: ' + content);
    
    // HIGHEST PRIORITY: Exact match for "12 N G Do You Have Green Scissors"
    if (content.includes('12 N G') && lowerContent.includes('green scissors')) {
      console.log('💚 GREEN SCISSORS EXACT PATTERN MATCH FOUND');
      return {
        country: country,
        question: "Do you have green scissors?",
        answer: "Yes, I have green scissors. / No, I don't have green scissors.",
        hasData: true
      };
    }
    
    // Look for partial matches - any 12 N G pattern
    const scissorsMatch = content.match(/12\s*N\s*G/i);
    if (scissorsMatch) {
      console.log('🎯 12 N G SCISSORS PATTERN MATCH FOUND');
      return {
        country: country,
        question: "Do you have green scissors?",
        answer: "Yes, I have green scissors. / No, I don't have green scissors.",
        hasData: true
      };
    }
    
    // Look for "green scissors" anywhere in the content
    if (lowerContent.includes('green scissors')) {
      console.log('🧩 GREEN SCISSORS CONTENT MATCH FOUND');
      return {
        country: country,
        question: "Do you have green scissors?",
        answer: "Yes, I have green scissors. / No, I don't have green scissors.",
        hasData: true
      };
    }
    
    // Other scissors patterns
    if (content.match(/12\s*N\s*[A-Z]/i)) {
      const scissorsCodeMatch = content.match(/12\s*N\s*([A-Z])/i);
      const variantCode = scissorsCodeMatch ? scissorsCodeMatch[1].toUpperCase() : '';
      
      console.log('✂️ SCISSORS CODE DETECTED: 12 N ' + variantCode);
      
      switch (variantCode) {
        case 'A':
          return {
            country: country,
            question: "What are they?",
            answer: "They are scissors.",
            hasData: true
          };
          
        case 'B':
        case 'C':
          return {
            country: country,
            question: "Are they big or small scissors?",
            answer: "They are big scissors. / They are small scissors.",
            hasData: true
          };
          
        case 'D':
          return {
            country: country,
            question: "Are they horse or unicorn scissors?",
            answer: "They are horse scissors. / They are unicorn scissors.",
            hasData: true
          };
          
        case 'E':
          return {
            country: country,
            question: "Are they panda or koala scissors?",
            answer: "They are panda scissors. / They are koala scissors.",
            hasData: true
          };
          
        case 'F':
          return {
            country: country,
            question: "Do you have scissors in your pencil case?",
            answer: "Yes, I have scissors in my pencil case. / No, I don't have scissors in my pencil case.",
            hasData: true
          };
          
        case 'G':
          return {
            country: country,
            question: "Do you have green scissors?",
            answer: "Yes, I have green scissors. / No, I don't have green scissors.",
            hasData: true
          };
          
        case 'H':
        case 'I':
        case 'J':
          return {
            country: country,
            question: "What color are the scissors?",
            answer: lowerContent.includes('purple') ? "The scissors are purple." : 
                   lowerContent.includes('yellow') ? "The scissors are yellow." : 
                   "The scissors are colorful.",
            hasData: true
          };
          
        case 'K':
          return {
            country: country,
            question: "What scissors do you like?",
            answer: "I like these scissors.",
            hasData: true
          };
          
        case 'L':
          return {
            country: country,
            question: "How many scissors are there?",
            answer: "There are 4 scissors.",
            hasData: true
          };
          
        case 'M':
          return {
            country: country,
            question: "How many scissors are there?",
            answer: "There are 3 scissors.",
            hasData: true
          };
          
        default:
          return {
            country: country,
            question: "What are these?",
            answer: "They are scissors.",
            hasData: true
          };
      }
    }
  }
  
  // Sharpener section with specific pattern matching for 08 M patterns
  if (lowerContent.includes('sharpener')) {
    console.log("Processing sharpener section with code pattern checks");
    
    // Special handling for exact patterns from the provided mapping
    // First, try to extract the exact section pattern (08 M A, 08 M B, etc.)
    const sharpenerMatches = content.match(/0([0-9])\s*([A-Za-z])\s*([A-Za-z])/i);
    if (sharpenerMatches) {
      const sectionNum = sharpenerMatches[1];
      const typeCode = sharpenerMatches[2].toUpperCase();
      const subCode = sharpenerMatches[3].toUpperCase();
      
      // Check if it's section 08 M with various subpatterns
      if (sectionNum === '8' && typeCode === 'M') {
        console.log(`Found exact sharpener pattern match: 08 ${typeCode} ${subCode}`);
        
        // Handle specific subpatterns
        switch (subCode) {
          case 'A':
            return {
              country: country,
              question: "What is it?",
              answer: "It is a sharpener.",
              hasData: true
            };
          
          case 'B':
            return {
              country: country,
              question: "Is it a metal or plastic sharpener?",
              answer: lowerContent.includes('metal') ? "It is a metal sharpener." : "It is a plastic sharpener.",
              hasData: true
            };
            
          case 'C':
            return {
              country: country,
              question: "Is it a dragon or dinosaur sharpener?",
              answer: lowerContent.includes('dragon') ? "It is a dragon sharpener." : "It is a dinosaur sharpener.",
              hasData: true
            };
            
          case 'D':
            return {
              country: country,
              question: "Is it an eye or nose sharpener?",
              answer: lowerContent.includes('eye') ? "It is an eye sharpener." : "It is a nose sharpener.",
              hasData: true
            };
            
          case 'E':
            return {
              country: country,
              question: "Is it a Roblox or Minecraft sharpener?",
              answer: lowerContent.includes('roblox') ? "It is a Roblox sharpener." : "It is a Minecraft sharpener.",
              hasData: true
            };
            
          case 'F':
            return {
              country: country,
              question: "Is it a happy or sad sharpener?",
              answer: lowerContent.includes('happy') ? "It is a happy sharpener." : "It is a sad sharpener.",
              hasData: true
            };
            
          case 'G':
            return {
              country: country,
              question: "Do you have a Lego sharpener?",
              answer: "Yes, I have a Lego sharpener.",
              hasData: true
            };
            
          case 'H':
            return {
              country: country,
              question: "Do you have a sharpener in your pencil case?",
              answer: "Yes, I have a sharpener in my pencil case.",
              hasData: true
            };
            
          case 'I':
            // Check for the number in the filename for "How many" questions
            const howManyMatch = lowerContent.match(/there are (\d+)/i);
            const quantity = howManyMatch ? howManyMatch[1] : "2";
            
            return {
              country: country,
              question: "How many sharpeners are there?",
              answer: `There are ${quantity} sharpeners.`,
              hasData: true
            };
            
          case 'J':
            // Another "How many" with different quantity
            const howManyMatch2 = lowerContent.match(/there are (\d+)/i);
            const quantity2 = howManyMatch2 ? howManyMatch2[1] : "5";
            
            return {
              country: country,
              question: "How many sharpeners are there?",
              answer: `There are ${quantity2} sharpeners.`,
              hasData: true
            };
            
          case 'K':
            // Check for color in the filename
            const colorMatch = lowerContent.match(/(?:what colour|what color)[^-]+([-–]\s*(?:the sharpener is|it is)\s+([a-z]+))?/i);
            const color = colorMatch && colorMatch[2] ? colorMatch[2] : "purple";
            
            return {
              country: country,
              question: "What color is the sharpener?",
              answer: `The sharpener is ${color}.`,
              hasData: true
            };
            
          case 'L':
            return {
              country: country,
              question: "What color are the sharpeners?",
              answer: "The sharpeners are colorful.",
              hasData: true
            };
            
          default:
            // Default fallback for 08 M section sharpeners
            return {
              country: country,
              question: "What is this?",
              answer: "It is a sharpener.",
              hasData: true
            };
        }
      }
    }
    
    // General fallback for any sharpener
    console.log("Using general hardcoded fallback for sharpener section");
    return {
      country: country,
      question: "What is this?",
      answer: "It is a sharpener.",
      hasData: true
    };
  }
  
  // Ruler section with specific pattern matching for 10 N patterns
  if (lowerContent.includes('ruler')) {
    // Try to extract the exact section pattern (10 N A, 10 N B, etc.)
    const rulerMatches = content.match(/([0-9]{2})\s*([A-Za-z])\s*([A-Za-z])/i);
    
    if (rulerMatches) {
      const sectionNum = rulerMatches[1];
      const typeCode = rulerMatches[2].toUpperCase();
      const subCode = rulerMatches[3].toUpperCase();
      
      console.log(`Processing ruler pattern match: ${sectionNum} ${typeCode} ${subCode}`);
      
      // Check if it's section 10 N with various subpatterns
      if (sectionNum === '10' && typeCode === 'N') {
        console.log(`Found exact ruler pattern match: ${sectionNum} ${typeCode} ${subCode}`);
        
        // Handle specific subpatterns based on the provided mapping
        switch (subCode) {
          case 'A':
            return {
              country: country,
              question: "What is it?",
              answer: "It is a ruler.",
              hasData: true
            };
          
          case 'B':
            // Animal-shaped rulers need special handling
            if (lowerContent.includes('shark') || lowerContent.includes('lion') || lowerContent.includes('crocodile') || 
                lowerContent.includes('animal')) {
              console.log("Found animal-shaped rulers pattern");
              return {
                country: country,
                question: "What are they?",
                answer: "They are rulers.",
                hasData: true
              };
            }
            
            return {
              country: country,
              question: "What are they?",
              answer: "They are rulers.",
              hasData: true
            };
            
          case 'C':
            return {
              country: country,
              question: "Is it a big or small ruler?",
              answer: lowerContent.includes('big') ? "It is a big ruler." : "It is a small ruler.",
              hasData: true
            };
            
          case 'D':
            return {
              country: country,
              question: "Is it a Minecraft or Roblox ruler?",
              answer: lowerContent.includes('minecraft') ? "It is a Minecraft ruler." : "It is a Roblox ruler.",
              hasData: true
            };
            
          case 'E':
            return {
              country: country,
              question: "Is it a sleeping or dancing ruler?",
              answer: lowerContent.includes('sleeping') ? "It is a sleeping ruler." : "It is a dancing ruler.",
              hasData: true
            };
            
          case 'F':
            return {
              country: country,
              question: "Is it a tiger or lion ruler?",
              answer: lowerContent.includes('tiger') ? "It is a tiger ruler." : "It is a lion ruler.",
              hasData: true
            };
            
          case 'G':
            return {
              country: country,
              question: "Is it a cat or dog ruler?",
              answer: lowerContent.includes('cat') ? "It is a cat ruler." : "It is a dog ruler.",
              hasData: true
            };
            
          case 'H':
            return {
              country: country,
              question: "Is it a girl's or boy's ruler?",
              answer: lowerContent.includes("girl") ? "It is a girl's ruler." : "It is a boy's ruler.",
              hasData: true
            };
            
          case 'I':
            return {
              country: country,
              question: "Do you have a ruler in your pencil case?",
              answer: "Yes, I have a ruler in my pencil case.",
              hasData: true
            };
            
          case 'J':
            return {
              country: country,
              question: "Is it a plastic or metal ruler?",
              answer: lowerContent.includes('plastic') ? "It is a plastic ruler." : "It is a metal ruler.",
              hasData: true
            };
            
          case 'K':
            // Check for color in the filename
            const colorMatch = lowerContent.match(/what colou?r is the ruler[\s\-–]+([a-z]+)/i);
            const color = colorMatch && colorMatch[1] ? colorMatch[1] : 
                        lowerContent.includes('gold') ? "gold" : "blue";
            
            return {
              country: country,
              question: "What color is the ruler?",
              answer: `The ruler is ${color}.`,
              hasData: true
            };
            
          case 'L':
            return {
              country: country,
              question: "What ruler do you like?",
              answer: "I like the colorful ruler.",
              hasData: true
            };
            
          case 'M':
            // Handle "How many" questions with exact count from your reference data
            console.log("Found 10 N M 'How Many Rulers' pattern match - using exact mapping");
            return {
              country: country,
              question: "How many rulers are there?",
              answer: "There are 5 rulers.",
              hasData: true
            };
            
          default:
            // Default ruler question
            return {
              country: country,
              question: "What is this?",
              answer: "It is a ruler.",
              hasData: true
            };
        }
      }
      // Handle other ruler sections with numbered patterns
      else if ((sectionNum === '08' || sectionNum === '09' || sectionNum === '11' || sectionNum === '12') 
               && (typeCode === 'N' || typeCode === 'M')) {
        
        if (sectionNum === '08') {
          console.log("Using precise hardcoded pattern match for section 08 ruler");
          return {
            country: country,
            question: "What is this?",
            answer: "It is a ruler.",
            hasData: true
          };
        }
        else if (sectionNum === '09') {
          console.log("Using precise hardcoded pattern match for section 09 ruler");
          return {
            country: country,
            question: "What is this?",
            answer: "It is a ruler.",
            hasData: true
          };
        }
        else if (sectionNum === '11') {
          console.log("Using precise hardcoded pattern match for section 11 ruler");
          return {
            country: country,
            question: "What is this?",
            answer: "It is a ruler.",
            hasData: true
          };
        }
        else if (sectionNum === '12') {
          console.log("Using precise hardcoded pattern match for section 12 ruler");
          return {
            country: country,
            question: "What is this?",
            answer: "It is a ruler.",
            hasData: true
          };
        }
      }
    }
    
    // If we couldn't extract a pattern or it's not a recognized pattern, use these fallbacks:
    
    // Section 08 Rulers - by basic pattern
    if (/08.*ruler/i.test(content)) {
      console.log("Using basic pattern match for section 08 ruler");
      return {
        country: country,
        question: "What is this?",
        answer: "It is a ruler.",
        hasData: true
      };
    }
    
    // Section 09 Rulers - by basic pattern
    if (/09.*ruler/i.test(content)) {
      console.log("Using basic pattern match for section 09 ruler");
      return {
        country: country,
        question: "What is this?",
        answer: "It is a ruler.",
        hasData: true
      };
    }
    
    // Section 10 Rulers - direct pattern match
    if (/10.*ruler/i.test(content)) {
      console.log("Using basic pattern match for section 10 ruler");
      
      // Special check for animal-shaped rulers (shark, lion, crocodile)
      if (content.toLowerCase().includes('shark') || 
          content.toLowerCase().includes('lion') || 
          content.toLowerCase().includes('crocodile') || 
          content.toLowerCase().includes('animal')) {
        
        console.log("ANIMAL-SHAPED RULER DETECTED - Using direct hardcoded QA");
        return {
          country: country,
          question: "What are they?",
          answer: "They are rulers.",
          hasData: true
        };
      }
      
      // Check if this is "What is it?" or "What are they?" question  
      if (/what are they/i.test(content)) {
        return {
          country: country,
          question: "What are they?",
          answer: "They are rulers.",
          hasData: true
        };
      } else {
        return {
          country: country,
          question: "What is it?",
          answer: "It is a ruler.",
          hasData: true
        };
      }
    }
    
    // Section 11 Rulers - by basic pattern
    if (/11.*ruler/i.test(content)) {
      console.log("Using basic pattern match for section 11 ruler");
      return {
        country: country,
        question: "What is this?",
        answer: "It is a ruler.",
        hasData: true
      };
    }
    
    // Section 12 Rulers - by basic pattern
    if (/12.*ruler/i.test(content)) {
      console.log("Using basic pattern match for section 12 ruler");
      return {
        country: country,
        question: "What is this?",
        answer: "It is a ruler.",
        hasData: true
      };
    }
    
    // General fallback for any other ruler sections not caught above
    if ((/0[8-9]|1[0-2]/).test(content)) {
      console.log("Using general hardcoded fallback for ruler section 08-12");
      return {
        country: country,
        question: "What is this?",
        answer: "It is a ruler.",
        hasData: true
      };
    }
    
    // Final fallback for any ruler content
    console.log("Using final fallback for ruler content");
    return {
      country: country,
      question: "What is this?",
      answer: "It is a ruler.",
      hasData: true
    };
  }
  
  // Scissors section with specific pattern matching for 12 N patterns
  if (lowerContent.includes('scissors')) {
    console.log("Processing scissors section with code pattern checks");
    
    // First, try to extract the exact section pattern (12 N A, 12 N B, etc.)
    const scissorsMatches = content.match(/([0-9]{2})\s*([A-Za-z])\s*([A-Za-z])/i);
    if (scissorsMatches) {
      const sectionNum = scissorsMatches[1];
      const typeCode = scissorsMatches[2].toUpperCase();
      const subCode = scissorsMatches[3].toUpperCase();
      
      // Check if it's section 12 N with various subpatterns
      if (sectionNum === '12' && typeCode === 'N') {
        console.log(`Found exact scissors pattern match: ${sectionNum} ${typeCode} ${subCode}`);
        
        // Handle specific subpatterns based on the provided mapping
        switch (subCode) {
          case 'A':
            return {
              country: country,
              question: "What are they?",
              answer: "They are scissors.",
              hasData: true
            };
          
          case 'B':
          case 'C':
            return {
              country: country,
              question: "Are they big or small scissors?",
              answer: lowerContent.includes('big') ? "They are big scissors." : "They are small scissors.",
              hasData: true
            };
            
          case 'D':
            return {
              country: country,
              question: "Are they horse or unicorn scissors?",
              answer: lowerContent.includes('horse') ? "They are horse scissors." : "They are unicorn scissors.",
              hasData: true
            };
            
          case 'E':
            return {
              country: country,
              question: "Are they panda or koala scissors?",
              answer: lowerContent.includes('panda') ? "They are panda scissors." : "They are koala scissors.",
              hasData: true
            };
            
          case 'F':
            return {
              country: country,
              question: "Do you have scissors in your pencil case?",
              answer: "Yes, I have scissors in my pencil case.",
              hasData: true
            };
            
          case 'G':
            return {
              country: country,
              question: "Do you have green scissors?",
              answer: "Yes, I have green scissors.",
              hasData: true
            };
            
          case 'H':
          case 'I':
          case 'J':
            // Check for color in the filename
            const colorMatch = lowerContent.match(/what colou?r are the scissors[\s\-–]+([a-z]+)/i);
            const color = colorMatch && colorMatch[1] ? colorMatch[1] : 
                        lowerContent.includes('purple') ? "purple" : 
                        lowerContent.includes('yellow') ? "yellow" : "red";
            
            return {
              country: country,
              question: "What color are the scissors?",
              answer: `The scissors are ${color}.`,
              hasData: true
            };
            
          case 'K':
            return {
              country: country,
              question: "What scissors do you like?",
              answer: "I like colorful scissors.",
              hasData: true
            };
            
          case 'L':
            // Exact mapping from your reference data for "12 N L"
            console.log("Found 12 N L 'How Many Scissors' pattern - using exact mapping");
            return {
              country: country,
              question: "How many scissors are there?",
              answer: "There are 4 scissors.",
              hasData: true
            };
            
          case 'M':
            // Exact mapping from your reference data for "12 N M"
            console.log("Found 12 N M 'How Many Scissors' pattern - using exact mapping");
            return {
              country: country,
              question: "How many scissors are there?",
              answer: "There are 3 scissors.",
              hasData: true
            };
            
          default:
            // Default scissors question
            return {
              country: country,
              question: "What are these?",
              answer: "They are scissors.",
              hasData: true
            };
        }
      }
    }
    
    // General fallback for scissors
    console.log("Using general hardcoded fallback for scissors section");
    return {
      country: country,
      question: "What are these?",
      answer: "They are scissors.",
      hasData: true
    };
  }
  
  // Bag section - with specific pattern matching for 09 N patterns
  if (lowerContent.includes('bag')) {
    console.log("Processing bag section with code pattern checks");
    
    // First, try to extract the exact section pattern (09 N A, 09 N B, etc.)
    const bagMatches = content.match(/0([0-9])\s*([A-Za-z])\s*([A-Za-z])/i);
    if (bagMatches) {
      const sectionNum = bagMatches[1];
      const typeCode = bagMatches[2].toUpperCase();
      const subCode = bagMatches[3].toUpperCase();
      
      // Check if it's section 09 N with various subpatterns
      if (sectionNum === '9' && typeCode === 'N') {
        console.log(`Found exact bag pattern match: 09 ${typeCode} ${subCode}`);
        
        // Handle specific subpatterns based on the provided mapping
        switch (subCode) {
          case 'A':
            return {
              country: country,
              question: "What is it?",
              answer: "It is a bag.",
              hasData: true
            };
          
          case 'B':
          case 'C':
            return {
              country: country,
              question: "What school bag do you like?",
              answer: "I like the colorful school bag.",
              hasData: true
            };
            
          case 'D':
            return {
              country: country,
              question: "Is it a dog or cat school bag?",
              answer: lowerContent.includes('dog') ? "It is a dog school bag." : "It is a cat school bag.",
              hasData: true
            };
            
          case 'E':
            return {
              country: country,
              question: "Is it a tiger or lion school bag?",
              answer: lowerContent.includes('tiger') ? "It is a tiger school bag." : "It is a lion school bag.",
              hasData: true
            };
            
          case 'F':
          case 'G':
          case 'H':
            return {
              country: country,
              question: "Is it a girl's or boy's school bag?",
              answer: lowerContent.includes('girl') ? "It is a girl's school bag." : "It is a boy's school bag.",
              hasData: true
            };
            
          case 'I':
            return {
              country: country,
              question: "Do you have a school bag?",
              answer: "Yes, I have a school bag.",
              hasData: true
            };
            
          case 'J':
            return {
              country: country,
              question: "Is it a Spiderman or Superman school bag?",
              answer: lowerContent.includes('spiderman') ? "It is a Spiderman school bag." : "It is a Superman school bag.",
              hasData: true
            };
            
          case 'K':
            return {
              country: country,
              question: "Is it a Nike or Adidas school bag?",
              answer: lowerContent.includes('nike') ? "It is a Nike school bag." : "It is an Adidas school bag.",
              hasData: true
            };
            
          case 'L':
          case 'M':
            // Check for color in the filename
            const colorMatch = lowerContent.match(/what colou?r is the school bag[\s\-–]+([a-z]+)/i);
            const color = colorMatch && colorMatch[1] ? colorMatch[1] : 
                        lowerContent.includes('pink') ? "pink" : 
                        lowerContent.includes('purple') ? "purple" : 
                        lowerContent.includes('red') ? "red" : "blue";
            
            return {
              country: country,
              question: "What color is the school bag?",
              answer: `The school bag is ${color}.`,
              hasData: true
            };
            
          default:
            // Default bag question if subpattern isn't recognized
            return {
              country: country,
              question: "What is it?",
              answer: "It is a school bag.",
              hasData: true
            };
        }
      }
    }
    
    // More general fallbacks for bag sections
    // Check for specific question types in the filename
    if (lowerContent.includes('do you have')) {
      return {
        country: country,
        question: "Do you have a school bag?",
        answer: "Yes, I have a school bag.",
        hasData: true
      };
    } else if (lowerContent.includes('what color') || lowerContent.includes('what colour')) {
      // Check if this is asking about color
      const colorMatch = lowerContent.match(/(?:what color|what colour)[^-]+([-–]\s*(?:it is|the bag is)\s+([a-z]+))?/i);
      if (colorMatch && colorMatch[2]) {
        const color = colorMatch[2];
        return {
          country: country,
          question: `What color is the school bag?`,
          answer: `The school bag is ${color}.`,
          hasData: true
        };
      } else {
        return {
          country: country,
          question: "What color is the school bag?",
          answer: "The school bag is blue.",
          hasData: true
        };
      }
    } else if (lowerContent.includes('is it')) {
      if (lowerContent.includes('boy') || lowerContent.includes('girl')) {
        return {
          country: country,
          question: "Is it a boy's or girl's school bag?",
          answer: lowerContent.includes('girl') ? "It is a girl's school bag." : "It is a boy's school bag.",
          hasData: true
        };
      } else {
        return {
          country: country,
          question: "Is it a school bag?",
          answer: "Yes, it is a school bag.",
          hasData: true
        };
      }
    } else {
      // Default bag question
      return {
        country: country,
        question: "What is this?",
        answer: "It is a school bag.",
        hasData: true
      };
    }
  }
  
  // No matches found - return empty data
  // This will be filled by Excel data from S3
  return {
    country: country || "",
    question: "",
    answer: "",
    hasData: false
  };
}

const QuestionAnswerDisplay: React.FC<QuestionAnswerDisplayProps> = ({ 
  material, 
  isEditMode = false, 
  showQuestions = true, 
  bookId, 
  unitId,
  hasPaidAccess = false,
  index = 0,
  freeSlideLimit = 10,
  onSlideDelete
}) => {
  // Use our enhanced Excel QA hook for better pattern matching
  const { 
    mappings: jsonMappings, 
    isLoading: isLoadingJsonMappings,
    findMatchingQA 
  } = useExcelQA(bookId || "1");
  
  // Keep the original Excel-based data query for backward compatibility
  const { 
    data: excelData,
    isLoading: isLoadingExcel,
    isError: excelError
  } = useQuery({
    queryKey: [bookId, unitId, 'excel-qa'],
    queryFn: async () => {
      if (!bookId || !unitId) return { success: false, entries: [] };
      
      try {
        // Use the full bookId and unitId format instead of just extracting numeric parts
        // This ensures we match the correct path in our server's API endpoints
        
        // Fetch Excel QA data for this specific book and unit
        const res = await apiRequest('GET', `/api/direct/${bookId}/${unitId}/excel-qa`);
        if (!res.ok) {
          console.log(`Error loading Excel QA data for ${bookId}/${unitId}: ${res.statusText}`);
          return { success: false, entries: [] };
        }
        
        const data = await res.json();
        console.log(`Loaded ${data.entries?.length || 0} QA entries from Excel for ${bookId}/${unitId}`);
        return data;
      } catch (error) {
        console.error("Error fetching Excel QA data:", error);
        return { success: false, entries: [] };
      }
    },
    enabled: !!bookId && !!unitId
  });
  
  const [qaData, setQAData] = useState<QAData>({ country: '', question: '', answer: '', hasData: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [serverSynced, setServerSynced] = useState(false);
  // Always show answers directly, no need for reveal feature
  const { toast } = useToast();

  // Load saved Q&A data from server and localStorage when component mounts
  useEffect(() => {
    if (bookId && unitId && material?.id) {
      // First try to get edits from localStorage (for immediate display)
      try {
        const savedQAString = localStorage.getItem(`qa-${bookId}-${unitId}`);
        if (savedQAString) {
          const savedQA = JSON.parse(savedQAString);
          if (savedQA[material.id]) {
            const savedItem = savedQA[material.id];
            
            // Check if this Q&A was deleted
            if (savedItem.deleted) {
              setIsDeleted(true);
            }
            
            // Apply saved edits
            else if (savedItem.question && savedItem.answer) {
              setQAData(prev => ({ 
                ...prev, 
                question: savedItem.question, 
                answer: savedItem.answer,
                hasData: true 
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error loading saved Q&A data from localStorage:", error);
      }
      
      // Then try to fetch from server (which will override localStorage if newer)
      const fetchServerEdits = async () => {
        try {
          const response = await apiRequest('GET', `/api/direct/content-edits/${bookId}/${unitId}`);
          if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.edits && data.edits.length > 0) {
              // Find edits for this specific material
              const materialEdits = data.edits.filter((edit: any) => 
                edit.materialId === material.id
              );
              
              if (materialEdits.length > 0) {
                // Get the most recent edit
                const latestEdit = materialEdits.reduce((latest: any, edit: any) => {
                  const latestDate = latest?.updatedAt || latest?.createdAt || '';
                  const currentDate = edit.updatedAt || edit.createdAt || '';
                  return new Date(currentDate) > new Date(latestDate) ? edit : latest;
                }, null);
                
                if (latestEdit) {
                  setServerSynced(true);
                  
                  // Apply server edits based on edit type
                  if (latestEdit.editType === 'qa_delete' || latestEdit.isDeleted) {
                    setIsDeleted(true);
                  } 
                  else if (latestEdit.editType === 'qa_edit' && latestEdit.questionText && latestEdit.answerText) {
                    setQAData(prev => ({ 
                      ...prev, 
                      question: latestEdit.questionText, 
                      answer: latestEdit.answerText,
                      hasData: true 
                    }));
                    
                    // Update localStorage with server data
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { 
                      question: latestEdit.questionText, 
                      answer: latestEdit.answerText 
                    };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching content edits from server:", error);
        }
      };
      
      fetchServerEdits();
    }
  }, [bookId, unitId, material?.id]);
  
  useEffect(() => {
    if (!material || !material.content) {
      setQAData({ country: '', question: '', answer: '', hasData: false });
      return;
    }
    
    // Don't load data if this Q&A is marked as deleted
    if (isDeleted) {
      return;
    }
    
    // FIRST APPROACH: Try our enhanced JSON-based mapping (most reliable)
    // This uses the improved pattern matching algorithms
    if (!isLoadingJsonMappings && jsonMappings && Object.keys(jsonMappings).length > 0) {
      console.log("Using enhanced JSON-based Q&A mapping system");
      const filename = material.content;
      
      // Filter mappings by unitId if provided
      const currentUnitId = unitId || '';
      console.log(`Loaded ${Object.values(jsonMappings).filter(qa => qa.unitId === currentUnitId).length} QA entries from Excel for ${bookId}/${currentUnitId}`);
      
      // Pass the currentUnitId to the findMatchingQA function to filter by unit
      const matchingQA = findMatchingQA(filename, currentUnitId);
      
      // Check if we found a matching question
      if (matchingQA) {
        console.log("✅ FOUND MATCH using enhanced JSON-based mapping for:", filename);
        setQAData({
          country: formatText.determineCountry(filename),
          question: matchingQA.question,
          answer: matchingQA.answer,
          hasData: true,
          category: matchingQA.codePattern
        });
        return;
      } else {
        console.log("❌ No match found using enhanced JSON-based mapping for:", filename);
      }
    }
    
    // SECOND APPROACH (LEGACY): Try to match with Excel data first (older method)
    if (excelData?.entries?.length > 0) {
      // Get the filename
      const filename = material.content;
      const normalizedFilename = filename.toLowerCase();
      
      // Helper functions
      const normalizeString = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
      const extractCodePattern = (text: string): string | null => {
        // Special hardcoded mapping for section 08-12 rulers
        const lowerText = text.toLowerCase();
        if (lowerText.includes('ruler')) {
          // Directly detect problematic section codes
          if (/08/i.test(text)) {
            console.log("Using special ruler mapping for section 08");
            return "08 N";
          } else if (/09/i.test(text)) {
            console.log("Using special ruler mapping for section 09");
            return "09 N";
          } else if (/10/i.test(text)) {
            console.log("Using special ruler mapping for section 10");
            return "10 N";
          } else if (/11/i.test(text)) {
            console.log("Using special ruler mapping for section 11");
            return "11 N";
          } else if (/12/i.test(text)) {
            console.log("Using special ruler mapping for section 12");
            return "12 N";
          }
        }
        
        // Special case for ruler, scissors, and sharpener sections
        if (text.toLowerCase().includes('ruler') || 
            text.toLowerCase().includes('scissors') || 
            text.toLowerCase().includes('sharpener')) {
          
          // Check for the standard pattern first (most specific)
          let specialMatches = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])(?:\s+|$)/i);
          if (specialMatches) {
            let specialPattern = `${specialMatches[1]} ${specialMatches[2].toUpperCase()} ${specialMatches[3].toUpperCase()}`;
            console.log("Extracted special section pattern:", specialPattern, "from filename:", filename);
            return specialPattern;
          }
          
          // For these special sections, try to extract the pattern in a more flexible way
          // Look for pattern like "11 N" or "12 N" which are common for these objects
          specialMatches = text.match(/(\d{2})\s*([A-Za-z])/i);
          if (specialMatches) {
            let specialSimplePattern = `${specialMatches[1]} ${specialMatches[2].toUpperCase()}`;
            console.log("Extracted simplified special section pattern:", specialSimplePattern, "from filename:", filename);
            return specialSimplePattern;
          }
        }
        
        // Try the standard format like "01 I A"
        let matches = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])(?:\s+|$)/i);
        if (matches) {
          // Standardize the code pattern format as "XX Y Z" (e.g., "01 I A")
          let extractedCodePattern = `${matches[1]} ${matches[2].toUpperCase()} ${matches[3].toUpperCase()}`;
          console.log("Extracted standard code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        // Try alternative format like "01I"
        matches = text.match(/(\d{2})\s*([A-Za-z])/i);
        if (matches) {
          // Standardize as "XX Y" (e.g., "01 I")
          let extractedCodePattern = `${matches[1]} ${matches[2].toUpperCase()}`;
          console.log("Extracted simplified code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        // Try just the numeric part like "01"
        matches = text.match(/^.*?(\d{2}).*$/i);
        if (matches) {
          let extractedCodePattern = matches[1];
          console.log("Extracted numeric code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        return null;
      };
      
      // 1. First try exact filename match
      let matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
        normalizeString(entry.filename) === normalizedFilename
      );
      
      if (matchingEntry) {
        console.log("Found exact match for:", filename);
        console.log("Found local Excel mapping for:", filename);
        setQAData({ 
          country: formatText.determineCountry(filename),
          question: matchingEntry.question, 
          answer: matchingEntry.answer,
          hasData: true 
        });
        return;
      }
      
      // 2. Try to match code pattern
      const extractedCodePattern = extractCodePattern(filename);
      if (extractedCodePattern) {
        console.log(`Searching for match with extracted code pattern: "${extractedCodePattern}"`);
        
        // Convert to more flexible matching by standardizing both sides
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
          const normalizedEntryPattern = normalizeString(entry.codePattern);
          const normalizedExtractedPattern = normalizeString(extractedCodePattern);
          
          // Try exact match
          if (normalizedEntryPattern === normalizedExtractedPattern) {
            console.log(`Found exact code pattern match: "${entry.codePattern}" = "${extractedCodePattern}"`);
            return true;
          }
          
          // Try prefix match (e.g., "01 I" matches "01 I A")
          if (normalizedEntryPattern.startsWith(normalizedExtractedPattern) || 
              normalizedExtractedPattern.startsWith(normalizedEntryPattern)) {
            console.log(`Found prefix code pattern match: "${entry.codePattern}" starts with "${extractedCodePattern}" (or vice versa)`);
            return true;
          }
          
          // Special case for scissors, ruler, and sharpener sections
          if (filename.toLowerCase().includes('scissors') || 
              filename.toLowerCase().includes('ruler') || 
              filename.toLowerCase().includes('sharpener')) {
              
            // For these sections, we should be more flexible with numeric patterns
            // Extract just the numeric part of both patterns
            const entryNumeric = entry.codePattern.match(/(\d{2})/);
            const extractedNumeric = extractedCodePattern.match(/(\d{2})/);
            
            if (entryNumeric && extractedNumeric && entryNumeric[1] === extractedNumeric[1]) {
              // If the numeric parts match (11, 12, 07, etc.), this is likely a match
              console.log(`Found special section numeric match: "${entry.codePattern}" and "${extractedCodePattern}" share numeric part ${extractedNumeric[1]}`);
              return true;
            }
            
            // Also check if the section name is in the question
            const questionLower = entry.question.toLowerCase();
            if ((filename.toLowerCase().includes('scissors') && questionLower.includes('scissors')) ||
                (filename.toLowerCase().includes('ruler') && questionLower.includes('ruler')) ||
                (filename.toLowerCase().includes('sharpener') && questionLower.includes('sharpener'))) {
              console.log(`Found match based on special section name in question: "${entry.question}"`);
              return true;
            }
          }
          
          return false;
        });
        
        if (matchingEntry) {
          console.log(`Found match using code pattern "${extractedCodePattern}" against entry with pattern "${matchingEntry.codePattern}"`);
        } else {
          console.log(`No entries matched the code pattern "${extractedCodePattern}"`);
          // Debug - print all available code patterns
          console.log("Available code patterns:", excelData.entries.map((e: ExcelQAEntry) => e.codePattern).join(", "));
        }
      }
      
      // 3. If still no match, check if code pattern is contained in the filename
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizedFilename.includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern contained in filename:", matchingEntry.codePattern);
        }
      }
      
      // Special additional check for scissors, ruler, sharpener, and bag sections
      if (!matchingEntry) {
        const lowercaseFilename = filename.toLowerCase();
        
        // Check for special sections by name
        if (lowercaseFilename.includes('scissors') || 
            lowercaseFilename.includes('ruler') || 
            lowercaseFilename.includes('sharpener') ||
            lowercaseFilename.includes('bag')) {
            
          // Direct hardcoded mapping for sections 08-12
          if (lowercaseFilename.includes('ruler') && 
              (/08|09|10|11|12/).test(filename)) {
            console.log("CRITICAL SECTION: Detected ruler section 08-12:", filename);
            
            // For these exact numbered sections, try to find the right question based on both
            // the object type and the section number
            const sectionNumber = filename.match(/\b(0[8-9]|1[0-2])\b/);
            if (sectionNumber) {
              const sectionNum = sectionNumber[1];
              console.log("Extracted section number for special mapping:", sectionNum);
              
              // First try to find exact matches for both ruler AND section number
              matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
                const entryCodePattern = entry.codePattern.toLowerCase();
                const entryQuestion = entry.question.toLowerCase();
                
                // Check for both ruler in question and matching section number
                return entryQuestion.includes('ruler') && 
                       entryCodePattern.includes(sectionNum);
              });
              
              if (matchingEntry) {
                console.log("FOUND PERFECT MATCH for ruler section " + sectionNum + ":", matchingEntry.question);
              } else {
                // If no exact match, find ANY question about rulers
                // But prioritize questions with matching section numbers
                const rulerEntries = excelData.entries.filter((entry: ExcelQAEntry) => 
                  entry.question.toLowerCase().includes('ruler')
                );
                
                if (rulerEntries.length > 0) {
                  // First try to find entries with matching section numbers
                  const matchingNumberEntries = rulerEntries.filter((entry: ExcelQAEntry) => 
                    entry.codePattern.includes(sectionNum)
                  );
                  
                  if (matchingNumberEntries.length > 0) {
                    // Use the first match with both ruler and matching section number
                    matchingEntry = matchingNumberEntries[0];
                    console.log("Found section number match for ruler:", matchingEntry.question);
                  } else {
                    // Fall back to any ruler question
                    matchingEntry = rulerEntries[0];
                    console.log("Using fallback ruler question:", matchingEntry.question);
                  }
                }
              }
            }
          }
          
          // If still no match, try general object type matching
          if (!matchingEntry) {
            matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
              const questionLower = entry.question.toLowerCase();
              
              return (lowercaseFilename.includes('scissors') && questionLower.includes('scissors')) ||
                     (lowercaseFilename.includes('ruler') && questionLower.includes('ruler')) ||
                     (lowercaseFilename.includes('sharpener') && questionLower.includes('sharpener')) ||
                     (lowercaseFilename.includes('bag') && questionLower.includes('bag'));
            });
            
            if (matchingEntry) {
              console.log("Found special section match based on object type:", matchingEntry.question);
            }
          }
          
          // Last resort for sharpener - if it's clearly a sharpener but no match yet
          if (!matchingEntry && lowercaseFilename.includes('sharpener')) {
            // Find ANY question about sharpeners
            matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
              entry.question.toLowerCase().includes('sharpener')
            );
            
            if (matchingEntry) {
              console.log("Found fallback sharpener match:", matchingEntry.question);
            }
          }
          
          // Last resort for bag - if it's clearly a bag but no match yet
          if (!matchingEntry && lowercaseFilename.includes('bag')) {
            // Find ANY question about bags
            matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
              entry.question.toLowerCase().includes('bag')
            );
            
            if (matchingEntry) {
              console.log("Found fallback bag match:", matchingEntry.question);
            }
          }
        }
      }
      
      // 4. If still no match, check if filename contains the question (without ? mark)
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
          const questionWithoutQuestionMark = entry.question.replace(/\?$/, '');
          return normalizedFilename.includes(normalizeString(questionWithoutQuestionMark));
        });
        
        if (matchingEntry) {
          console.log("Found question match in filename for:", matchingEntry.question);
        }
      }
      
      // 5. If still no match, check if material description contains code pattern
      if (!matchingEntry && material.description) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizeString(material.description).includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern in description:", matchingEntry.codePattern);
        }
      }
      
      // If we found a match from Excel data, use it
      if (matchingEntry) {
        console.log("Using Excel entry:", matchingEntry);
        setQAData({ 
          country: formatText.determineCountry(filename),
          question: matchingEntry.question, 
          answer: matchingEntry.answer,
          hasData: true 
        });
        return;
      }
    }
    
    // Fall back to the basic pattern matching logic if no Excel match
    // This section only extracts patterns from the filename, not hardcoded questions
    const processed = getQuestionAnswerFromData(material, unitId);
    setQAData(processed);
  }, [material?.content, excelData?.entries, jsonMappings, isLoadingJsonMappings, isDeleted, unitId]);
  
  const handleFlagQuestion = async () => {
    try {
      const flagData: Partial<FlaggedQuestion> = {
        materialId: material.id,
        questionText: qaData.question,
        answerText: qaData.answer,
        suggestedQuestion: editedQuestion || undefined,
        suggestedAnswer: editedAnswer || undefined,
        reason: flagReason || undefined,
        status: 'pending'
      };
      
      const res = await apiRequest('POST', '/api/flagged-questions', flagData);
      
      if (res.ok) {
        toast({
          title: "Flagged successfully",
          description: "Thank you for your feedback. An admin will review it soon.",
        });
        setShowForm(false);
        setFlagReason('');
        setEditedQuestion('');
        setEditedAnswer('');
      } else {
        throw new Error('Failed to flag question');
      }
    } catch (error) {
      toast({
        title: "Error flagging question",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!material) {
    return null;
  }
  
  // If there's no question and no answer, don't render anything
  if (!qaData.hasData || (qaData.question === '' && qaData.answer === '')) {
    return null;
  }

  return (
    <div className={`relative ${showQuestions ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
      {/* Controls shown in edit mode */}
      {isEditMode && (
        <div className="absolute -top-2 right-0 flex space-x-2">
          <button
            onClick={async () => {
              setIsSaving(true);
              
              // Reset to default values from database or pattern matching
              const processed = getQuestionAnswerFromData(material, unitId);
              setQAData(processed);
              setIsEditing(false);
              setIsDeleted(false);
              setServerSynced(false);

              // Save this reset to localStorage
              if (bookId && unitId) {
                const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                delete savedQA[material.id];
                localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
              }
              
              // Try to reset on server
              try {
                if (bookId && unitId && material?.id) {
                  const response = await apiRequest('DELETE', `/api/direct/content-edits/${bookId}/${unitId}/${material.id}`);
                  const result = await response.json();
                  
                  if (result.success) {
                    toast({
                      title: "Reset complete",
                      description: result.dbAvailable === false 
                        ? "Content has been reset on this device." 
                        : "Content has been reset on the server and this device.",
                    });
                  } else {
                    // If server reset failed, still inform user that local reset worked
                    toast({
                      title: "Partial reset",
                      description: "Content has been reset on this device but the server reset failed.",
                    });
                  }
                } else {
                  toast({
                    title: "Reset complete",
                    description: "Content has been reset to default values.",
                  });
                }
              } catch (error) {
                console.error('Error resetting content on server:', error);
                toast({
                  title: "Partial reset",
                  description: "Content has been reset on this device but the server reset failed.",
                });
              } finally {
                setIsSaving(false);
              }
            }}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Reset to default"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {!isEditing && !isDeleted ? (
            <>
              <button
                onClick={() => {
                  setEditedQuestion(qaData.question);
                  setEditedAnswer(qaData.answer);
                  setIsEditing(true);
                }}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              
              <button
                onClick={async () => {
                  // Delete the Q&A but keep track of this decision
                  setIsDeleted(true);
                  setIsSaving(true);
                  
                  // Save this deletion to localStorage
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { deleted: true };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_delete',
                        isDeleted: true
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Question removed",
                          description: result.dbAvailable === false 
                            ? "The question has been removed from this slide and saved to this device." 
                            : "The question has been removed and this change will persist across devices.",
                        });
                      } else {
                        console.error('Error saving deletion to server:', result.error);
                        toast({
                          title: "Question removed",
                          description: "The question has been removed from this slide but the change could not be saved to the server.",
                        });
                      }
                    } else {
                      toast({
                        title: "Question removed",
                        description: "The question and answer have been removed from this slide.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving deletion to server:', error);
                    toast({
                      title: "Question removed",
                      description: "The question has been removed from this slide but the change could not be saved to the server.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Delete Question/Answer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              <button
                onClick={async () => {
                  // Delete the Q&A but keep track of this decision
                  setIsDeleted(true);
                  setIsSaving(true);
                  
                  // Save this deletion to localStorage
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { deleted: true };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_delete',
                        isDeleted: true
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Question hidden",
                          description: result.dbAvailable === false 
                            ? "The question has been hidden from this slide and saved to this device." 
                            : "The question has been hidden and this change will persist across devices.",
                        });
                      } else {
                        console.error('Error saving deletion to server:', result.error);
                        toast({
                          title: "Question hidden",
                          description: "The question has been hidden from this slide but the change could not be saved to the server.",
                        });
                      }
                    } else {
                      toast({
                        title: "Question hidden",
                        description: "The question and answer have been hidden from this slide.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving deletion to server:', error);
                    toast({
                      title: "Question hidden",
                      description: "The question has been hidden from this slide but the change could not be saved to the server.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="p-1 text-amber-500 hover:text-amber-700 transition-colors"
                title="Hide Q&A"
              >
                <EyeOff className="h-4 w-4" />
              </button>
              
              {/* Video slide delete button - only show for MP4 files */}
              {material.content.toLowerCase().endsWith('.mp4') && onSlideDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSlideDelete && material.id && confirm("Are you sure you want to remove this video slide from the unit?")) {
                      onSlideDelete(material.id);
                    }
                  }}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  title="Remove video slide from unit"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </>
          ) : isEditing ? (
            <>
              <button
                onClick={async () => {
                  setIsSaving(true);
                  const updatedQA = {
                    ...qaData,
                    question: editedQuestion,
                    answer: editedAnswer,
                    hasData: true
                  };
                  setQAData(updatedQA);
                  setIsEditing(false);
                  
                  // Save changes to localStorage for persistence
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { question: editedQuestion, answer: editedAnswer };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    // Function to save edits to server
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_edit',
                        questionText: editedQuestion,
                        answerText: editedAnswer
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Changes saved",
                          description: result.dbAvailable === false 
                            ? "Your edits have been saved to this device." 
                            : "Your edits have been saved to the server and will persist across devices.",
                        });
                      } else {
                        console.error('Error saving to server:', result.error);
                        toast({
                          title: "Changes saved locally",
                          description: "Your edits could not be saved to the server but are saved on this device.",
                        });
                      }
                    } else {
                      toast({
                        title: "Changes saved locally",
                        description: "Your edits have been saved to this device.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving edit to server:', error);
                    toast({
                      title: "Changes saved locally",
                      description: "Your edits could not be saved to the server but are saved on this device.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="p-1 text-green-500 hover:text-green-700 transition-colors"
                title="Save"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      )}
      
      {/* Loading state for Excel data */}
      {isLoadingExcel && (
        <div className="p-2 text-center">
          <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-500">Loading question data...</p>
        </div>
      )}
      
      {/* Display question and answer - unless it's been deleted */}
      {!isLoadingExcel && qaData.hasData && !isDeleted && (
        <div className="p-2 text-center relative">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <input
                  value={editedQuestion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedQuestion(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
              <div>
                <input
                  value={editedAnswer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAnswer(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Handle premium content for questions and answers */}
              {!hasPaidAccess && index >= freeSlideLimit ? (
                <div className="py-4 relative">
                  <div className="blur-lg brightness-75">
                    <div className="mb-3 font-semibold text-2xl">Premium Content</div>
                    <div className="text-lg">Subscribe to view questions and answers</div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm text-white z-10 p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                    <p className="text-sm mb-4">Subscribe to access all learning materials</p>
                    <button 
                      className="px-4 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary/90"
                      onClick={() => window.location.href = '/checkout/single_lesson'}
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Callan-style centered question with larger font */}
                  <div className="mb-4 font-medium text-2xl bg-primary/5 py-3 px-4 rounded-md border border-primary/20">
                    {qaData.question}
                  </div>
                  
                  {/* Answer - shown directly */}
                  <div className="text-lg bg-gray-50 py-2 px-4 rounded-md border border-gray-200 transition-all">
                    {qaData.answer}
                  </div>
                </>
              )}
              
              {/* Flag button for users to report incorrect questions - only show for paid users */}
              {!isEditMode && hasPaidAccess && (
                <div className="mt-3">
                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center text-xs text-gray-500 hover:text-red-500"
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      Flag as incorrect
                    </button>
                  ) : (
                    <div className="p-2 border rounded-md w-full max-w-sm mx-auto mt-2">
                      <h4 className="text-sm font-medium mb-1">Flag this Q&A as incorrect</h4>
                      <div className="space-y-2 text-left">
                        <div>
                          <label className="block text-xs mb-1">Reason</label>
                          <select
                            value={flagReason}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFlagReason(e.target.value)}
                            className="w-full p-1 text-sm border rounded"
                          >
                            <option value="">Select a reason</option>
                            <option value="Wrong question">Wrong question</option>
                            <option value="Wrong answer">Wrong answer</option>
                            <option value="Both wrong">Both wrong</option>
                            <option value="Typo or grammar">Typo or grammar</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Suggested question (optional)</label>
                          <input
                            value={editedQuestion}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedQuestion(e.target.value)}
                            placeholder={qaData.question}
                            className="w-full p-1 text-sm border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Suggested answer (optional)</label>
                          <input
                            value={editedAnswer}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAnswer(e.target.value)}
                            placeholder={qaData.answer}
                            className="w-full p-1 text-sm border rounded"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setShowForm(false);
                              setFlagReason('');
                              setEditedQuestion('');
                              setEditedAnswer('');
                            }}
                            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleFlagQuestion}
                            disabled={!flagReason}
                            className={`px-2 py-1 text-xs text-white rounded ${flagReason ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* No data found state - now hidden per user request */}
      {/* We're hiding the "No question available for this slide" message */}
    </div>
  );
};

export default QuestionAnswerDisplay;