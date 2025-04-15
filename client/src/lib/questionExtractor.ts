interface QuestionAnswer {
  category?: string;
  question: string;
  answer: string;
}

/**
 * Extracts meaningful questions and answers from filenames
 * Similar to the Python script logic but in JavaScript
 */
export function extractQuestionFromFilename(filename: string): QuestionAnswer | null {
  if (!filename) return null;
  
  // Clean up the filename
  const cleanedFilename = filename
    .replace(/\.(jpg|png|gif|jpeg|webp)$/i, '')
    .replace(/^\d+\s*[A-Z]\s*/, '') // Remove leading numbers and letters (like "01 R")
    .trim();
  
  // Extract category if present (usually in all caps before the question)
  let category = '';
  const categoryMatch = cleanedFilename.match(/^([A-Z\s]+)\s*[-–]/);
  if (categoryMatch && categoryMatch[1]) {
    category = categoryMatch[1].trim();
  }
  
  // Handle filenames with explicit question/answer separator
  if (cleanedFilename.includes('–')) {
    const [questionPart, answerPart] = cleanedFilename.split('–').map(part => part.trim());
    
    // Format the question - add question mark if missing
    let question = questionPart;
    if (!question.endsWith('?')) {
      question = question + '?';
    }
    
    // Format the answer
    let answer = answerPart;
    
    // Special case for country/nationality questions
    if (question.toLowerCase().includes('nationality')) {
      if (answer.includes('–')) {
        const [country, nationality] = answer.split('–').map(part => part.trim());
        return {
          category: "NATIONALITY",
          question: `What is his/her nationality?`,
          answer: `He/She is ${nationality}.`
        };
      }
      return {
        category: "NATIONALITY",
        question: `What is his/her nationality?`,
        answer: `He/She is ${answer}.`
      };
    }
    
    // Special case for "from" questions
    if (question.toLowerCase().includes('from') && !answer.toLowerCase().startsWith('it is') && 
        !answer.toLowerCase().startsWith('he is') && !answer.toLowerCase().startsWith('she is')) {
      return {
        category: category || "COUNTRY",
        question: question,
        answer: `It is from ${answer}.`
      };
    }
    
    // Special case for "what is it" questions
    if (question.toLowerCase().includes('what is') && !answer.toLowerCase().startsWith('it is')) {
      return {
        category: category || "OBJECT",
        question: question,
        answer: `It is ${answer}.`
      };
    }
    
    return {
      category: category || undefined,
      question: question,
      answer: answer
    };
  }
  
  // If no clear question-answer pattern, try to make a reasonable guess
  const isQuestion = cleanedFilename.endsWith('?');
  if (isQuestion) {
    return {
      question: cleanedFilename,
      answer: "Yes, it is. / No, it isn't."
    };
  }
  
  // If we can't extract a clear question-answer pair, return null
  return null;
}

/**
 * Extract questions from text pasted directly
 */
export function extractQuestionsFromText(text: string): QuestionAnswer[] {
  if (!text) return [];
  
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const questions: QuestionAnswer[] = [];
  
  let currentCategory = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if line is all uppercase - likely a category
    if (line === line.toUpperCase() && !line.includes('?')) {
      currentCategory = line;
      continue;
    }
    
    // Check for Q: and A: format
    if (line.startsWith('Q:') && i + 1 < lines.length && lines[i + 1].startsWith('A:')) {
      const question = line.substring(2).trim();
      const answer = lines[i + 1].substring(2).trim();
      
      questions.push({
        category: currentCategory || undefined,
        question: question,
        answer: answer
      });
      
      i++; // Skip the next line as we've already processed it
      continue;
    }
    
    // Check for "Question → Answer" format
    if (line.includes('→')) {
      const [question, answer] = line.split('→').map(part => part.trim());
      questions.push({
        category: currentCategory || undefined,
        question: question,
        answer: answer
      });
      continue;
    }
    
    // Check for question marks
    if (line.includes('?') && i + 1 < lines.length && !lines[i + 1].includes('?')) {
      const question = line.trim();
      const answer = lines[i + 1].trim();
      
      questions.push({
        category: currentCategory || undefined,
        question: question,
        answer: answer
      });
      
      i++; // Skip the next line as we've already processed it
    }
  }
  
  return questions;
}