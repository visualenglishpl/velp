// Pattern Mapper for Visual English content
// This provides a standardized way to map filenames to questions and answers

// EXACT FILENAME-TO-QA MAPPING SYSTEM
// This maps exact filenames to their specific questions and answers
// Format: "filename.ext": { question: "Question Text?", answer: "Answer Text." }

interface QAMapping {
  question: string;
  answer: string;
}

// Comprehensive mapping for all files
const EXACT_FILENAME_MAPPINGS: Record<string, QAMapping> = {
  // 08 M - SHARPENERS
  "08 M A What is It – It is A Sharpener.gif": { 
    question: "What is it?", 
    answer: "It is a sharpener." 
  },
  "08 M B is It A Metal or Plastic Sharpener.jpg": { 
    question: "Is it a metal or plastic sharpener?", 
    answer: "It is a metal sharpener. / It is a plastic sharpener." 
  },
  "08 M C is It A Dragon or Dinosaur Sharpener.gif": { 
    question: "Is it a dragon or dinosaur sharpener?", 
    answer: "It is a dragon sharpener. / It is a dinosaur sharpener." 
  },
  "08 M D is It A Eye or Nose Sharpener.jpg": { 
    question: "Is it an eye or nose sharpener?", 
    answer: "It is an eye sharpener. / It is a nose sharpener." 
  },
  "08 M E is It A Roblox or Minecraft Sharpener.jpg": { 
    question: "Is it a Roblox or Minecraft sharpener?", 
    answer: "It is a Roblox sharpener. / It is a Minecraft sharpener." 
  },
  "08 M F is It A Happy or Sad Sharpener.gif": { 
    question: "Is it a happy or sad sharpener?", 
    answer: "It is a happy sharpener. / It is a sad sharpener." 
  },
  "08 M G Do You Have A Lego Sharpener.jpg": { 
    question: "Do you have a Lego sharpener?", 
    answer: "Yes, I have a Lego sharpener. / No, I don't have a Lego sharpener." 
  },
  "08 M H Do You Have A Sharpener in Your Pencil Case.gif": { 
    question: "Do you have a sharpener in your pencil case?", 
    answer: "Yes, I have a sharpener in my pencil case. / No, I don't have a sharpener in my pencil case." 
  },
  "08 M I How Many Sharpeners are There – There are 2.jpg": { 
    question: "How many sharpeners are there?", 
    answer: "There are 2 sharpeners." 
  },
  "08 M J How Many Sharpeners are There – There are 5.gif": { 
    question: "How many sharpeners are there?", 
    answer: "There are 5 sharpeners." 
  },
  "08 M K What Colour is the Sharpener – Purple.gif": { 
    question: "What color is the sharpener?", 
    answer: "The sharpener is purple." 
  },
  "08 M L What Colour are the Sharpeners.jpg": { 
    question: "What color are the sharpeners?", 
    answer: "The sharpeners are [color]." 
  },

  // 09 N - BAGS
  "09 N A What is It – It is A Bag.gif": { 
    question: "What is it?", 
    answer: "It is a bag." 
  },
  "09 N B What School Bag Do You Like.gif": { 
    question: "What school bag do you like?", 
    answer: "I like [type of bag]." 
  },
  "09 N C What School Bag Do You Like.jpg": { 
    question: "What school bag do you like?", 
    answer: "I like [type of bag]." 
  },
  "09 N D is It A Dog or Cat School Bag.gif": { 
    question: "Is it a dog or cat school bag?", 
    answer: "It is a dog school bag. / It is a cat school bag." 
  },
  "09 N E is It A Tiger or A Lion School Bag.gif": { 
    question: "Is it a tiger or lion school bag?", 
    answer: "It is a tiger school bag. / It is a lion school bag." 
  },
  "09 N F is It A Girls's or Boy's School Bag.gif": { 
    question: "Is it a girl's or boy's school bag?", 
    answer: "It is a girl's school bag. / It is a boy's school bag." 
  },
  "09 N G is It A Girls's or Boy's School Bag.gif": { 
    question: "Is it a girl's or boy's school bag?", 
    answer: "It is a girl's school bag. / It is a boy's school bag." 
  },
  "09 N H is It A Boy or Girl School Bag.jpg": { 
    question: "Is it a boy or girl school bag?", 
    answer: "It is a boy school bag. / It is a girl school bag." 
  },
  "09 N I Do You Have A School Bag.gif": { 
    question: "Do you have a school bag?", 
    answer: "Yes, I have a school bag. / No, I don't have a school bag." 
  },
  "09 N J is It A Spiderman or Superman School Bag.gif": { 
    question: "Is it a Spiderman or Superman school bag?", 
    answer: "It is a Spiderman school bag. / It is a Superman school bag." 
  },
  "09 N K is It A Nike or Adidas School Bag.gif": { 
    question: "Is it a Nike or Adidas school bag?", 
    answer: "It is a Nike school bag. / It is an Adidas school bag." 
  },
  "09 N L What Colour is the School Bag – Pink.gif": { 
    question: "What color is the school bag?", 
    answer: "The school bag is pink." 
  },
  "09 N L What Colour is the School Bag – Purple.gif": { 
    question: "What color is the school bag?", 
    answer: "The school bag is purple." 
  },
  "09 N M What Colour is the School Bag – Red.jpg": { 
    question: "What color is the school bag?", 
    answer: "The school bag is red." 
  },

  // 10 N - RULERS
  "10 N A What is It – It is A Ruler.gif": { 
    question: "What is it?", 
    answer: "It is a ruler." 
  },
  "10 N B What are They – They are Rulers.gif": { 
    question: "What are they?", 
    answer: "They are rulers." 
  },
  "10 N C is It A Big or Small Ruler.jpg": { 
    question: "Is it a big or small ruler?", 
    answer: "It is a big ruler. / It is a small ruler." 
  },
  "10 N D is It A Minecraft or A Roblox Ruler.jpg": { 
    question: "Is it a Minecraft or Roblox ruler?", 
    answer: "It is a Minecraft ruler. / It is a Roblox ruler." 
  },
  "10 N E is It S Sleeping or Dancing Ruler.gif": { 
    question: "Is it a sleeping or dancing ruler?", 
    answer: "It is a sleeping ruler. / It is a dancing ruler." 
  },
  "10 N F is It A Tiger or A Lion Ruler.png": { 
    question: "Is it a tiger or lion ruler?", 
    answer: "It is a tiger ruler. / It is a lion ruler." 
  },
  "10 N G is It A Cat or Dog Ruler.gif": { 
    question: "Is it a cat or dog ruler?", 
    answer: "It is a cat ruler. / It is a dog ruler." 
  },
  "10 N H is It A Girl's or Boy's Ruler. Png.png": { 
    question: "Is it a girl's or boy's ruler?", 
    answer: "It is a girl's ruler. / It is a boy's ruler." 
  },
  "10 N I Do You Have A Ruler in Your Pencil Case.gif": { 
    question: "Do you have a ruler in your pencil case?", 
    answer: "Yes, I have a ruler in my pencil case. / No, I don't have a ruler in my pencil case." 
  },
  "10 N J is It A Plastic or Metal Ruler.jpg": { 
    question: "Is it a plastic or metal ruler?", 
    answer: "It is a plastic ruler. / It is a metal ruler." 
  },
  "10 N K What Colour is the Ruler – Gold.png": { 
    question: "What color is the ruler?", 
    answer: "The ruler is gold." 
  },
  "10 N L What Ruler Do You Like.jpg": { 
    question: "What ruler do you like?", 
    answer: "I like [type of ruler]." 
  },
  "10 N M How Many Rulers are There – 5 Rulers.jpg": { 
    question: "How many rulers are there?", 
    answer: "There are 5 rulers." 
  },

  // 11 N - PENCIL CASES
  "11 N A What is It – It is A Pencil Case.gif": { 
    question: "What is it?", 
    answer: "It is a pencil case." 
  },
  "11 N B Do You Like This Pencil Case.gif": { 
    question: "Do you like this pencil case?", 
    answer: "Yes, I like this pencil case. / No, I don't like this pencil case." 
  },
  "11 N C is It A Dog or Car Pencil Case.gif": { 
    question: "Is it a dog or car pencil case?", 
    answer: "It is a dog pencil case. / It is a car pencil case." 
  },
  "11 N D Do You Have A Monster Pencil Case.gif": { 
    question: "Do you have a monster pencil case?", 
    answer: "Yes, I have a monster pencil case. / No, I don't have a monster pencil case." 
  },
  "11 N E is It A Pizza or Tortilla Pencil Case.jpg": { 
    question: "Is it a pizza or tortilla pencil case?", 
    answer: "It is a pizza pencil case. / It is a tortilla pencil case." 
  },
  "11 N F Do You Have A Pencil Case in Your Bag.gif": { 
    question: "Do you have a pencil case in your bag?", 
    answer: "Yes, I have a pencil case in my bag. / No, I don't have a pencil case in my bag." 
  },
  "11 N G Do You Have A Led Pencil Case 2.gif": { 
    question: "Do you have a LED pencil case?", 
    answer: "Yes, I have a LED pencil case. / No, I don't have a LED pencil case." 
  },
  "11 N G Do You Have A Led Pencil Case.gif": { 
    question: "Do you have a LED pencil case?", 
    answer: "Yes, I have a LED pencil case. / No, I don't have a LED pencil case." 
  },
  "11 N H Do You Have A Cat Pencil Case.jpg": { 
    question: "Do you have a cat pencil case?", 
    answer: "Yes, I have a cat pencil case. / No, I don't have a cat pencil case." 
  },
  "11 N I Do You Have A Rainbow Pencil Case.gif": { 
    question: "Do you have a rainbow pencil case?", 
    answer: "Yes, I have a rainbow pencil case. / No, I don't have a rainbow pencil case." 
  },
  "11 N J is It A Fish or Snake Pencil Case.jpg": { 
    question: "Is it a fish or snake pencil case?", 
    answer: "It is a fish pencil case. / It is a snake pencil case." 
  },
  "11 N K is It A Panda or Koala Pencil Case.gif": { 
    question: "Is it a panda or koala pencil case?", 
    answer: "It is a panda pencil case. / It is a koala pencil case." 
  },
  "11 N L What Colour is the Pencil Case – Pink.gif": { 
    question: "What color is the pencil case?", 
    answer: "The pencil case is pink." 
  },
  "11 N M What Colour is the Pencil Case – Green.gif": { 
    question: "What color is the pencil case?", 
    answer: "The pencil case is green." 
  },

  // 12 N - SCISSORS
  "12 N A What are They – They are Scissors.gif": { 
    question: "What are they?", 
    answer: "They are scissors." 
  },
  "12 N B are They Big or Small Scissors.jpg": { 
    question: "Are they big or small scissors?", 
    answer: "They are big scissors. / They are small scissors." 
  },
  "12 N C are They Big or Small Scissors.png": { 
    question: "Are they big or small scissors?", 
    answer: "They are big scissors. / They are small scissors." 
  },
  "12 N D are the Horse or Unicorn Scissors.jpg": { 
    question: "Are they horse or unicorn scissors?", 
    answer: "They are horse scissors. / They are unicorn scissors." 
  },
  "12 N E are They Panda or Koala Scissors.jpg": { 
    question: "Are they panda or koala scissors?", 
    answer: "They are panda scissors. / They are koala scissors." 
  },
  "12 N F Do You Have Scissors in Your Pencil Case.gif": { 
    question: "Do you have scissors in your pencil case?", 
    answer: "Yes, I have scissors in my pencil case. / No, I don't have scissors in my pencil case." 
  },
  "12 N G Do You Have Green Scissors.gif": { 
    question: "Do you have green scissors?", 
    answer: "Yes, I have green scissors. / No, I don't have green scissors." 
  },
  "12 N H What Colour are the Scissors – Purple.gif": { 
    question: "What color are the scissors?", 
    answer: "The scissors are purple." 
  },
  "12 N I What Colour are the Scissors.gif": { 
    question: "What color are the scissors?", 
    answer: "The scissors are [color]." 
  },
  "12 N J What Colour are the Scissors – Yellow.gif": { 
    question: "What color are the scissors?", 
    answer: "The scissors are yellow." 
  },
  "12 N K What Scissors Do You Like.jpg": { 
    question: "What scissors do you like?", 
    answer: "I like [type of scissors]." 
  },
  "12 N L How Many Scissors are There – 4 Scissors.jpg": { 
    question: "How many scissors are there?", 
    answer: "There are 4 scissors." 
  },
  "12 N M How Many Scissors are There – There are 3.jpg": { 
    question: "How many scissors are there?", 
    answer: "There are 3 scissors." 
  }
};

/**
 * Extracts pattern details from a filename
 * Example: "10 N B What are They – They are Rulers.gif" returns { sectionNum: "10", typeCode: "N", variantCode: "B", ... }
 */
export function extractPatternFromFilename(filename: string): PatternDetails | null {
  if (!filename) return null;
  
  // Extract the pattern using regex
  const patternMatch = filename.match(/(\d{1,2})\s*([A-Za-z])\s*([A-Za-z])/i);
  
  if (!patternMatch) return null;
  
  const sectionNum = patternMatch[1].padStart(2, '0'); // Ensure 2 digits with leading zero
  const typeCode = patternMatch[2].toUpperCase();
  const variantCode = patternMatch[3].toUpperCase();
  const fullPattern = `${sectionNum} ${typeCode} ${variantCode}`;
  
  // Determine if this is a special section (ruler, scissors, etc.)
  const isSpecialSection = sectionNum === '10' || sectionNum === '12';
  
  // Get the object type based on section number
  const objectType = OBJECT_TYPE_MAP[sectionNum] || '';
  
  return {
    sectionNum,
    typeCode,
    variantCode,
    fullPattern,
    isSpecialSection,
    objectType
  };
}

/**
 * Gets the standardized question and answer for a given filename
 * Prioritizes special mappings, then falls back to pattern-based extraction
 */
export function getQAForFilename(filename: string): { question: string, answer: string, hasMapping: boolean } {
  const pattern = extractPatternFromFilename(filename);
  
  if (!pattern) {
    console.log(`No pattern extracted from filename: ${filename}`);
    return { question: '', answer: '', hasMapping: false };
  }
  
  console.log(`Pattern extracted: ${pattern.fullPattern} from ${filename}`);
  
  // Check for special mappings first (for sections 10, 12, etc.)
  if (pattern.isSpecialSection && SPECIAL_MAPPINGS[pattern.sectionNum]) {
    const sectionMappings = SPECIAL_MAPPINGS[pattern.sectionNum];
    
    if (sectionMappings[pattern.variantCode]) {
      console.log(`Using special mapping for ${pattern.fullPattern}`);
      return {
        ...sectionMappings[pattern.variantCode],
        hasMapping: true
      };
    }
  }
  
  // Check for animal-shaped rulers in section 10
  const lowerFilename = filename.toLowerCase();
  if (pattern.sectionNum === '10' && 
      (lowerFilename.includes('shark') || 
       lowerFilename.includes('lion') || 
       lowerFilename.includes('crocodile') || 
       lowerFilename.includes('animal'))) {
    
    console.log(`Animal-shaped ruler detected in ${filename}`);
    return {
      question: 'What are they?',
      answer: 'They are rulers.',
      hasMapping: true
    };
  }
  
  // Fallback for when we don't have a specific mapping
  console.log(`No specific mapping found for ${pattern.fullPattern}, using fallback`);
  return {
    question: '',
    answer: '',
    hasMapping: false
  };
}