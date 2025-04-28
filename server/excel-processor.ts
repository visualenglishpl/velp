import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

/**
 * Process an Excel file and generate TypeScript mapping code
 * @param excelFilePath Path to the Excel file to process
 * @param outputPath Path to save the generated TypeScript file (optional)
 * @returns Record<string, {question: string, answer: string}>
 */
export function processExcelAndGenerateTS(
  excelFilePath: string, 
  outputPath?: string
): Record<string, QuestionAnswer> {
  console.log(`Processing Excel file from: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  
  // Assume first sheet unless specified
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet) as Array<Record<string, string>>;
  
  console.log(`Found ${jsonData.length} rows in Excel sheet`);
  
  // Create mapping object
  const mapping: Record<string, QuestionAnswer> = {};
  
  // Process each row and extract information
  for (const row of jsonData) {
    // Assume Excel structure has columns like: Code, Question, Answer
    const codePattern = row['Code'] || row['code'] || row['CODE'] || '';
    const question = row['Question'] || row['question'] || row['QUESTION'] || '';
    const answer = row['Answer'] || row['answer'] || row['ANSWER'] || '';
    
    // Skip if any required field is missing
    if (!codePattern || !question || !answer) {
      continue;
    }
    
    // Add to mapping using code as key
    mapping[codePattern] = {
      question,
      answer
    };
    
    // Also add formatted variants for better matching
    const formattedCode = codePattern.trim().replace(/\s+/g, ' ');
    if (formattedCode !== codePattern) {
      mapping[formattedCode] = {
        question,
        answer
      };
    }
    
    // Add lowercase variant for case-insensitive matching
    mapping[codePattern.toLowerCase()] = {
      question,
      answer
    };
  }
  
  console.log(`Generated mapping with ${Object.keys(mapping).length} entries`);
  
  return mapping;
}

/**
 * Extract a code pattern like "01 I A" from a filename
 */
export function extractCodePattern(text: string): string | null {
  // Look for patterns like "01 I A" in the filename
  const codeMatch = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])/i);
  if (codeMatch) {
    return codeMatch[1] + " " + codeMatch[2].toUpperCase() + " " + codeMatch[3].toUpperCase();
  }
  
  // Try for "01 I" patterns (two parts)
  const simplifiedMatch = text.match(/(\d{2})\s*([A-Za-z])/i);
  if (simplifiedMatch) {
    return simplifiedMatch[1] + " " + simplifiedMatch[2].toUpperCase();
  }
  
  // Try for just the number like "01"
  const numberMatch = text.match(/(\d{2})/);
  if (numberMatch) {
    return numberMatch[1];
  }
  
  return null;
}

// Empty placeholder for the mapping - this will be loaded dynamically
export const questionAnswerMapping: Record<string, QuestionAnswer> = {};

/**
 * Find the closest matching Q&A for a given filename
 * @param filename The filename to match
 * @returns The matching Q&A or undefined if no match
 */
export function findMatchingQA(filename: string): QuestionAnswer | undefined {
  console.log("Looking for Q&A mapping for:", filename);
  
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
  
  // Try to match by exact code pattern from Excel (like "01 I A")
  const codePattern = extractCodePattern(filename);
  if (codePattern) {
    console.log("Extracted code pattern:", codePattern, "from filename:", filename);
    
    // First, try exact pattern match
    if (questionAnswerMapping[codePattern]) {
      console.log("Found exact code pattern match:", codePattern);
      return questionAnswerMapping[codePattern];
    }
    
    // Try normalized code pattern (lowercase)
    const normalizedCodePattern = codePattern.toLowerCase();
    if (questionAnswerMapping[normalizedCodePattern]) {
      console.log("Found normalized code pattern match:", normalizedCodePattern);
      return questionAnswerMapping[normalizedCodePattern];
    }
    
    // Look for partial matches based on the code pattern
    for (const [key, qa] of Object.entries(questionAnswerMapping)) {
      // Check if the key contains the code pattern at the beginning
      if (key.toLowerCase().startsWith(normalizedCodePattern.toLowerCase()) ||
          key.toLowerCase().includes(normalizedCodePattern.toLowerCase())) {
        console.log("Found partial code pattern match:", key);
        return qa;
      }
    }
  }
  
  // If still no match, try if any key is a substring of filename
  for (const [key, qa] of Object.entries(questionAnswerMapping)) {
    if (filename.includes(key)) {
      console.log("Found substring match:", key, "in filename:", filename);
      return qa;
    }
  }
  
  // Try the reverse - if filename is a substring of any key
  for (const [key, qa] of Object.entries(questionAnswerMapping)) {
    if (key.includes(cleanedFilename)) {
      console.log("Found filename as substring in key:", key);
      return qa;
    }
  }
  
  // No match found
  console.log("No mapping match found for:", filename);
  return undefined;
}