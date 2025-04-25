// Excel-based question and answer mapping
// Questions are now loaded dynamically from Excel files in S3

export interface QuestionAnswer {
  question: string;
  answer: string;
}

// This is now an empty mapping since all data will come from Excel files
export const questionAnswerMapping: Record<string, QuestionAnswer> = {};

/**
 * Find the closest matching Q&A for a given filename using Excel data
 * @param filename The filename to match
 * @returns The matching Q&A or undefined if no match
 */
export function findMatchingQA(filename: string): QuestionAnswer | undefined {
  console.log("Looking for matching Q&A for:", filename);
  
  // All hard-coded patterns are now removed
  // This function now only returns undefined, forcing the system to rely on
  // the Excel-based data loaded directly via the API
  
  console.log("No matching Q&A found for:", filename);
  console.log("Falling back to pattern matching for:", filename);
  
  return undefined;
}

/**
 * Extract a code pattern like "01 I A" from a filename
 * This utility function is kept for compatibility
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