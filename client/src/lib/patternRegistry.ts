/**
 * Pattern Registry System
 * 
 * This file contains a registry of patterns used for matching questions and answers
 * across different categories and units. It provides a more maintainable and 
 * extensible approach to pattern matching compared to hardcoding patterns.
 */

export const patternRegistry: PatternRegistry = {
  // School objects patterns (Book 1 Unit 2)
  "school-objects": [
    {
      type: 'basic',
      regex: /what is it.*pencil/i,
      question: "What is it?",
      answer: "It is a pencil."
    },
    {
      type: 'basic',
      regex: /what is it.*ruler/i,
      question: "What is it?",
      answer: "It is a ruler."
    },
    {
      type: 'basic',
      regex: /what is it.*eraser/i,
      question: "What is it?",
      answer: "It is an eraser."
    },
    {
      type: 'basic',
      regex: /what is it.*scissors/i,
      question: "What is it?",
      answer: "It is a pair of scissors."
    },
    {
      type: 'basic',
      regex: /what is it.*sharpener/i,
      question: "What is it?",
      answer: "It is a sharpener."
    },
    {
      type: 'basic',
      regex: /what is it.*book/i,
      question: "What is it?",
      answer: "It is a book."
    },
    {
      type: 'basic',
      regex: /what is it.*pencil case/i,
      question: "What is it?",
      answer: "It is a pencil case."
    },
    {
      type: 'basic',
      regex: /what is it.*backpack|school bag/i,
      question: "What is it?",
      answer: "It is a backpack."
    }
  ],
  
  // Comparison patterns for different objects (Book 1 Unit 2)
  "comparison-questions": [
    // Pen comparisons
    {
      regex: /is it.*(girl).*(boy).*pen/i,
      question: "Is it a girl or boy pen?",
      answer: "It is a girl pen. / It is a boy pen."
    },
    {
      regex: /is it.*(hotdog).*(hamburger).*pen/i,
      question: "Is it a hotdog or hamburger pen?",
      answer: "It is a hotdog pen. / It is a hamburger pen."
    },
    {
      regex: /is it.*(lion).*(tiger).*pen/i,
      question: "Is it a lion or tiger pen?",
      answer: "It is a lion pen. / It is a tiger pen."
    },
    {
      regex: /is it.*(dog).*(cat).*pen/i,
      question: "Is it a dog or cat pen?",
      answer: "It is a dog pen. / It is a cat pen."
    },
    // Generic comparison with capture groups
    {
      regex: /is it.*(a|an)?\s*([a-z]+)\s*or\s*(a|an)?\s*([a-z]+)\s*pen/i,
      questionTemplate: "Is it a $2 or $4 pen?",
      answerTemplate: "It is a $2 pen. / It is a $4 pen."
    },
    
    // Scissors comparisons
    {
      regex: /are\s+they\s+(big|small)\s+or\s+(big|small)\s+scissors/i,
      questionTemplate: "Are they $1 or $2 scissors?",
      answerTemplate: "They are $1 scissors. / They are $2 scissors."
    },
    {
      regex: /are\s+they\s+(panda|koala)\s+or\s+(panda|koala)\s+scissors/i,
      questionTemplate: "Are they $1 or $2 scissors?",
      answerTemplate: "They are $1 scissors. / They are $2 scissors."
    },
    {
      regex: /are\s+the\s+(horse|unicorn)\s+or\s+(horse|unicorn)\s+scissors/i,
      questionTemplate: "Are they $1 or $2 scissors?",
      answerTemplate: "They are $1 scissors. / They are $2 scissors."
    }
  ],
  
  // Daily routine patterns (Book 1 Unit 1)
  "daily-routine": [
    {
      regex: /what.*(eat|food).*afternoon/i,
      question: "What do you eat in the afternoon?",
      answer: "I eat lunch in the afternoon."
    },
    {
      regex: /what.*(eat|food|have).*breakfast/i,
      question: "What do you eat for breakfast in the morning?",
      answer: "I eat cereal/toast/eggs for breakfast in the morning."
    },
    {
      regex: /what.*(eat|food|have).*dinner/i,
      question: "What do you have for dinner in the evening?",
      answer: "I have pasta/rice/meat/vegetables for dinner in the evening."
    },
    {
      regex: /what time.*sleep.*night/i,
      question: "What time do you go to sleep at night?",
      answer: "I go to sleep at 9/10/11 o'clock at night."
    }
  ],
  
  // Color-related questions
  "color-questions": [
    {
      regex: /what colou?r is the ([a-z]+)/i,
      questionTemplate: "What color is the $1?",
      answerTemplate: "The $1 is blue/red/green/yellow."
    },
    {
      regex: /what colou?r are the ([a-z]+)/i,
      questionTemplate: "What color are the $1?",
      answerTemplate: "The $1 are blue/red/green/yellow."
    }
  ],
  
  // Generic patterns for videos, games, etc.
  "generic-patterns": [
    {
      regex: /video/i,
      question: "Watch the video",
      answer: "Follow along with the video activity."
    },
    {
      regex: /game/i,
      question: "Play the game",
      answer: "Follow the instructions in the game."
    },
    {
      regex: /match/i,
      question: "Match the items",
      answer: "Connect the related items."
    }
  ]
};

// Define stricter types for different pattern category variations
type BasicPattern = {
  type: 'basic';
  regex: RegExp;
  question: string;
  answer: string;
};

type TemplatePattern = {
  type: 'template';
  regex: RegExp;
  questionTemplate: string;
  answerTemplate: string;
};

// Union type that requires either direct question/answer OR templates
type PatternCategory = BasicPattern | TemplatePattern;

type PatternRegistry = {
  [key: string]: PatternCategory[];
};

// Helper function to match a filename against registered patterns
export function findMatchingPattern(filename: string, unitId: string = ''): { 
  question: string; 
  answer: string;
  category?: string;
  matchedRegex?: RegExp;
} | null {
  // Normalize filename
  const normalizedFilename = filename.toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/["''""]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Special handling for unit-specific patterns
  if (unitId.toLowerCase().includes('unit2') || unitId.toLowerCase().includes('school')) {
    // Try school objects patterns first
    for (const pattern of patternRegistry["school-objects"]) {
      const match = normalizedFilename.match(pattern.regex);
      if (match) {
        console.log(`✅ PATTERN REGISTRY: Matched school object pattern: ${pattern.regex}`);
        return {
          question: pattern.question,
          answer: pattern.answer,
          category: "school-objects",
          matchedRegex: pattern.regex
        };
      }
    }
    
    // Try comparison patterns next
    for (const pattern of patternRegistry["comparison-questions"]) {
      const match = normalizedFilename.match(pattern.regex);
      if (match) {
        console.log(`✅ PATTERN REGISTRY: Matched comparison pattern: ${pattern.regex}`);
        
        // Handle templates if present
        if (pattern.questionTemplate && pattern.answerTemplate) {
          let questionWithReplacements = pattern.questionTemplate;
          let answerWithReplacements = pattern.answerTemplate;
          
          // Replace $1, $2, etc. with captured groups
          for (let i = 1; i < match.length; i++) {
            if (match[i]) {
              const replacementValue = match[i].trim();
              questionWithReplacements = questionWithReplacements.replace(`$${i}`, replacementValue);
              answerWithReplacements = answerWithReplacements.replace(`$${i}`, replacementValue);
            }
          }
          
          return {
            question: questionWithReplacements,
            answer: answerWithReplacements,
            category: "comparison-questions",
            matchedRegex: pattern.regex
          };
        }
        
        // For patterns without templates but with direct question/answer
        if (pattern.question && pattern.answer) {
          return {
            question: pattern.question,
            answer: pattern.answer,
            category: "comparison-questions",
            matchedRegex: pattern.regex
          };
        }
        
        return {
          question: pattern.question,
          answer: pattern.answer,
          category: "comparison-questions",
          matchedRegex: pattern.regex
        };
      }
    }
    
    // If no specific match, return a generic school object question
    console.log(`ℹ️ PATTERN REGISTRY: Using generic school object fallback for: ${normalizedFilename}`);
    return {
      question: "What is it?",
      answer: "It is a school object.",
      category: "school-objects-fallback"
    };
  }
  
  // Try other pattern categories for other units
  const categoriesToCheck = [
    "daily-routine", 
    "color-questions", 
    "comparison-questions", 
    "generic-patterns"
  ];
  
  for (const category of categoriesToCheck) {
    if (!patternRegistry[category]) continue;
    
    for (const pattern of patternRegistry[category]) {
      const match = normalizedFilename.match(pattern.regex);
      if (match) {
        console.log(`✅ PATTERN REGISTRY: Matched ${category} pattern: ${pattern.regex}`);
        
        // Handle templates if present
        if (pattern.questionTemplate && pattern.answerTemplate) {
          let questionWithReplacements = pattern.questionTemplate;
          let answerWithReplacements = pattern.answerTemplate;
          
          // Replace $1, $2, etc. with captured groups
          for (let i = 1; i < match.length; i++) {
            if (match[i]) {
              const replacementValue = match[i].trim();
              questionWithReplacements = questionWithReplacements.replace(`$${i}`, replacementValue);
              answerWithReplacements = answerWithReplacements.replace(`$${i}`, replacementValue);
            }
          }
          
          return {
            question: questionWithReplacements,
            answer: answerWithReplacements,
            category: category,
            matchedRegex: pattern.regex
          };
        }
        
        // Provide a fallback to ensure we never return undefined values
        // Handle both BasicPattern and TemplatePattern types
        if ('question' in pattern && 'answer' in pattern) {
          return {
            question: pattern.question,
            answer: pattern.answer,
            category: category,
            matchedRegex: pattern.regex
          };
        } else {
          // This should never happen due to our type system, but provide a fallback
          return {
            question: "What is this?",
            answer: "It is a school object.",
            category: category,
            matchedRegex: pattern.regex
          };
        }
      }
    }
  }
  
  // Check if it's a video
  if (normalizedFilename.includes('video')) {
    return {
      question: "Watch the video",
      answer: "Follow along with the video activity.",
      category: "video-fallback"
    };
  }
  
  // No match found
  return null;
}