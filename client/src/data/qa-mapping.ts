// Manual mapping based on the provided Excel file
// Generated on 2025-04-25

export interface QuestionAnswer {
  question: string;
  answer: string;
}

// Mapping based on the S3 bucket filenames and Excel data
export const questionAnswerMapping: Record<string, QuestionAnswer> = {
  // Direct mapping from the file list
  "01 I A What Do You Say in the Morning – Good Morning.gif": {
    question: "What do you say in the morning?",
    answer: "I say 'Good Morning' in the morning."
  },
  "01 I B What Time Do You Get Up – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you get up?",
    answer: "I get up in the morning."
  },
  "01 I C What Time Do You Eat Breakfast – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you eat breakfast?",
    answer: "I eat breakfast in the morning."
  },
  "01 I D What Time Do You Go to School – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you go to school?",
    answer: "I go to school in the morning."
  },
  "01 I E What Do You Drink in the Morning.gif": {
    question: "What do you drink in the morning?",
    answer: "I drink milk/juice/coffee in the morning."
  },
  "01 I F What Do You Eat in the Morning.gif": {
    question: "What do you eat in the morning?",
    answer: "I eat cereal/toast/fruit in the morning."
  },
  "01 I G Do You Like to Get Up in the Morning – Yes, I Do – No, I Don't.gif": {
    question: "Do you like to get up in the morning?",
    answer: "Yes, I like to get up in the morning. / No, I don't like to get up in the morning."
  },
  "01 I H Do You Run in the Morning – Yes, I Do – No, I Don't.gif": {
    question: "Do you run in the morning?",
    answer: "Yes, I run in the morning. / No, I don't run in the morning."
  },
  "02 I A What Do You Say in the Afternoon – Good Afternoon.gif": {
    question: "What do you say in the afternoon?",
    answer: "I say 'Good Afternoon' in the afternoon."
  },
  "02 I B What Time Do You Go Home – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you go home?",
    answer: "I go home in the afternoon."
  },
  "02 I C What Time Do You Eat Lunch – in the Morning, in the Afternoon, in the Evening or at Night.png": {
    question: "What time do you eat lunch?",
    answer: "I eat lunch in the afternoon."
  },
  "02 I D Do You Have Lunch in the Afternoon in School – Yes, I Do – No, I Don't.png": {
    question: "Do you have lunch in the afternoon at school?",
    answer: "Yes, I have lunch in the afternoon at school. / No, I don't have lunch in the afternoon at school."
  },
  "02 I E What Do You Eat in the Afternoon.gif": {
    question: "What do you eat in the afternoon?",
    answer: "I eat sandwiches/snacks/fruit in the afternoon."
  },
  "02 I F Do You Do Homework in the Afternoon – Yes, I Do – No, I Don't.gif": {
    question: "Do you do homework in the afternoon?",
    answer: "Yes, I do homework in the afternoon. / No, I don't do homework in the afternoon."
  },
  "02 I G Do You Play with Friends in the Afternoon – Yes, I Do – No, I Don't.gif": {
    question: "Do you play with friends in the afternoon?",
    answer: "Yes, I play with friends in the afternoon. / No, I don't play with friends in the afternoon."
  },
  "02 I H Do You Go Home by Bus in the Afternoon – Yes, I Do – No, I Don't.gif": {
    question: "Do you go home by bus in the afternoon?",
    answer: "Yes, I go home by bus in the afternoon. / No, I don't go home by bus in the afternoon."
  },
  "03 I A What Do You Say in the Evening – Good Evening.gif": {
    question: "What do you say in the evening?",
    answer: "I say 'Good Evening' in the evening."
  },
  "03 I B What Time Do You Eat Dinner – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you eat dinner?",
    answer: "I eat dinner in the evening."
  },
  "03 I C What Time is It in the Picture – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time is it in the picture?",
    answer: "It is in the evening."
  },
  "03 I D What Do You Have for Dinner in the Evening.gif": {
    question: "What do you have for dinner in the evening?",
    answer: "I have pasta/rice/meat for dinner in the evening."
  },
  "03 I E Do You Do Homework in the Evening – Yes, I Do – No, I Don't.gif": {
    question: "Do you do homework in the evening?",
    answer: "Yes, I do homework in the evening. / No, I don't do homework in the evening."
  },
  "03 I F Do You Watch Tv in the Evening – Yes, I Do – No, I Don't.gif": {
    question: "Do you watch TV in the evening?",
    answer: "Yes, I watch TV in the evening. / No, I don't watch TV in the evening."
  },
  "03 I G Do You Take A Bath in the Evening – Yes, I Do – No, I Don't.gif": {
    question: "Do you take a bath in the evening?",
    answer: "Yes, I take a bath in the evening. / No, I don't take a bath in the evening."
  },
  "03 I H Do You Take A Shower in the Evening – Yes, I Do – No, I Don't.gif": {
    question: "Do you take a shower in the evening?",
    answer: "Yes, I take a shower in the evening. / No, I don't take a shower in the evening."
  },
  "04 I A What Do You Say at Night – Good Night.gif": {
    question: "What do you say at night?",
    answer: "I say 'Good Night' at night."
  },
  "04 I B What Time Do You Go to Sleep – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you go to sleep?",
    answer: "I go to sleep at night. / I go to sleep in the evening."
  },
  "04 I C What Time Do You Go to Sleep at Night.gif": {
    question: "What time do you go to sleep at night?",
    answer: "I go to sleep at [time] at night."
  },
  "04 I D What Time Do You Wear Pyjamas – in the Morning, in the Afternoon, in the Evening or at Night.gif": {
    question: "What time do you wear pyjamas?",
    answer: "I wear pyjamas in the evening. / I wear pyjamas at night."
  },
  "04 I E Do You Brush Your Teeth at Night – Yes, I Do – No, I Don't.gif": {
    question: "Do you brush your teeth at night?",
    answer: "Yes, I brush my teeth at night. / No, I don't brush my teeth at night."
  },
  "04 I F Do You Sit on the Telephone at Night – Yes, I Do – No, I Don't.gif": {
    question: "Do you sit on the telephone at night?",
    answer: "Yes, I sit on the telephone at night. / No, I don't sit on the telephone at night."
  },
  "04 I G Do You Watch Tv at Night – Yes, I Do – No, I Don't.gif": {
    question: "Do you watch TV at night?",
    answer: "Yes, I watch TV at night. / No, I don't watch TV at night."
  },
  "04 I H Do You Read Books at Night – Yes, I Do – No, I Don't.gif": {
    question: "Do you read books at night?",
    answer: "Yes, I read books at night. / No, I don't read books at night."
  },
  
  // Code pattern backup - exact code patterns for lookup
  "01 I A": {
    question: "What do you say in the morning?",
    answer: "I say 'Good Morning' in the morning."
  },
  "01 I B": {
    question: "What time do you get up?",
    answer: "I get up in the morning."
  },
  "01 I C": {
    question: "What time do you eat breakfast?",
    answer: "I eat breakfast in the morning."
  },
  "01 I D": {
    question: "What time do you go to school?",
    answer: "I go to school in the morning."
  },
  "01 I E": {
    question: "What time do you drink milk?",
    answer: "I drink milk/juice/coffee in the morning."
  },
  "01 I F": {
    question: "What do you eat in the morning?",
    answer: "I eat cereal/toast/fruit in the morning."
  },
  "01 I Do You": {
    question: "Do you like to get up in the morning?",
    answer: "Yes, I like to get up in the morning. / No, I don't like to get up in the morning."
  },
  "01 Greetings": {
    question: "Do you say in the morning?",
    answer: "Yes, I say it in the morning. / No, I don't say it in the morning."
  },
  "02 I What": {
    question: "What do you say in the afternoon?",
    answer: "I say 'Good Afternoon' in the afternoon."
  },
  "02 I When": {
    question: "What time do you have lunch?",
    answer: "I have lunch in the afternoon."
  },
  "02 I Do You": {
    question: "Do you have lunch in the afternoon at school?",
    answer: "Yes, I have lunch in the afternoon at school. / No, I don't have lunch in the afternoon at school."
  },
  "02 I What Do": {
    question: "What do you eat in the afternoon?",
    answer: "I eat sandwich/salad/soup in the afternoon."
  },
  "02 I Do You Do": {
    question: "Do you do homework in the afternoon?",
    answer: "Yes, I do homework in the afternoon. / No, I don't do homework in the afternoon."
  },
  "02 I Do You Play": {
    question: "Do you play with friends in the afternoon?",
    answer: "Yes, I play with friends in the afternoon. / No, I don't play with friends in the afternoon."
  },
  "03 I What": {
    question: "What do you say in the evening?",
    answer: "I say 'Good Evening' in the evening."
  },
  "03 I What Time": {
    question: "What time do you eat dinner?",
    answer: "I eat dinner in the evening."
  },
  "03 I Do You Watch": {
    question: "Do you watch TV in the evening?",
    answer: "Yes, I watch TV in the evening. / No, I don't watch TV in the evening."
  },
  "03 I Do You Have": {
    question: "Do you have a bath in the evening?",
    answer: "Yes, I have a bath in the evening. / No, I don't have a bath in the evening."
  },
  "04 I What": {
    question: "What do you say at night?",
    answer: "I say 'Good Night' at night."
  },
  "04 I What Time": {
    question: "What time do you go to sleep?",
    answer: "I go to sleep at night. / I go to sleep in the evening."
  },
  "04 I What Do You": {
    question: "What time do you go to sleep at night?",
    answer: "I water my teeth at night. / I wear pajamas at night."
  },
  "04 I Do You": {
    question: "Do you brush your teeth at night?",
    answer: "Yes, I brush my teeth at night. / No, I don't brush my teeth at night."
  },
  "04 I Do You Watch": {
    question: "Do you watch TV at night?",
    answer: "Yes, I watch TV at night. / No, I don't watch TV at night."
  },
  "04 I Do You Read": {
    question: "Do you read books at night?",
    answer: "Yes, I read books at night. / No, I don't read books at night."
  }
};

/**
 * Find the closest matching Q&A for a given filename
 * @param filename The filename to match
 * @returns The matching Q&A or undefined if no match
 */
export function findMatchingQA(filename: string): QuestionAnswer | undefined {
  console.log("Looking for matching Q&A for:", filename);
  
  // Special case for Poland content - put this first for priority
  if (filename.toLowerCase().includes('poland') || filename.match(/01\s*r/i)) {
    console.log("Found Poland content:", filename);
    return {
      question: "What country is this?",
      answer: "It is Poland."
    };
  }
  
  // First, try an exact match
  if (questionAnswerMapping[filename]) {
    console.log("Found exact match for:", filename);
    return questionAnswerMapping[filename];
  }
  
  // If no exact match, try to find a match by cleaning up the filename
  const cleanedFilename = filename
    .replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '') // Remove file extensions
    .trim();
    
  if (questionAnswerMapping[cleanedFilename]) {
    console.log("Found match for cleaned filename:", cleanedFilename);
    return questionAnswerMapping[cleanedFilename];
  }
  
  // Try to match by code pattern (like "01 I A")
  const codePattern = extractCodePattern(filename);
  if (codePattern) {
    console.log("Extracted code pattern:", codePattern, "from filename:", filename);
    
    // Try exact pattern match
    if (questionAnswerMapping[codePattern]) {
      console.log("Found exact code pattern match:", codePattern);
      return questionAnswerMapping[codePattern];
    }
    
    // Get the first two parts of the pattern (e.g., "01 I" from "01 I A")
    const simplifiedPattern = codePattern.split(' ').slice(0, 2).join(' ');
    
    // Special case for 01 R pattern (Poland)
    if (simplifiedPattern === "01 R") {
      console.log("Found Poland pattern:", simplifiedPattern);
      return {
        question: "What country is this?",
        answer: "It is Poland."
      };
    }
    
    // Find keys that start with this simplified pattern
    for (const key of Object.keys(questionAnswerMapping)) {
      if (key.startsWith(simplifiedPattern)) {
        console.log("Found match using simplified pattern:", key);
        return questionAnswerMapping[key];
      }
    }
  }
  
  // Content-based matching
  const lowerFilename = filename.toLowerCase();
  
  // Check for content keywords
  if (lowerFilename.includes('poland') || lowerFilename.includes('polish')) {
    console.log("Found Poland keyword in:", filename);
    return {
      question: "What country is this?",
      answer: "It is Poland."
    };
  }
  
  if (lowerFilename.includes('morning') && !lowerFilename.includes('what time')) {
    console.log("Found morning content without time specifics:", filename);
    return questionAnswerMapping["01 I A"]; // "What do you say in the morning?"
  }
  
  console.log("No matching Q&A found for:", filename);
  return undefined;
}

/**
 * Extract a code pattern like "01 I A" from a filename
 */
function extractCodePattern(text: string): string | null {
  // Look for patterns like "01 I A" in the filename
  const codeMatch = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])/i);
  if (codeMatch) {
    return `${codeMatch[1]} ${codeMatch[2].toUpperCase()} ${codeMatch[3].toUpperCase()}`;
  }
  
  // Try for "01 I" patterns (two parts)
  const simplifiedMatch = text.match(/(\d{2})\s*([A-Za-z])/i);
  if (simplifiedMatch) {
    return `${simplifiedMatch[1]} ${simplifiedMatch[2].toUpperCase()}`;
  }
  
  return null;
}