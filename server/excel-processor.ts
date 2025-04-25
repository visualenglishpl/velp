import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Module for processing Excel files containing question-answer pairs
 */

// Define the structure for questions data
export interface QuestionAnswerPair {
  question: string;
  answer: string;
}

export type QuestionAnswerMap = Record<string, QuestionAnswerPair>;

/**
 * Process an Excel file to extract question-answer pairs
 * @param excelFilePath Path to the Excel file
 * @returns A map of file paths to question-answer pairs
 */
export function processExcelFile(excelFilePath: string): QuestionAnswerMap {
  if (!fs.existsSync(excelFilePath)) {
    throw new Error(`Excel file not found: ${excelFilePath}`);
  }

  console.log(`Processing Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log(`Found ${data.length} rows in Excel file`);
  
  // Create a mapping from file path to question/answer
  const qaMapping: QuestionAnswerMap = {};
  
  data.forEach((row: any, index: number) => {
    // Excel columns might vary - check all possible column names
    const filePath = row['File Path'] || row['Filename'] || row['Path'] || '';
    const question = row['Question'] || row['Q'] || '';
    const answer = row['Answer'] || row['A'] || '';
    
    if (filePath && (question || answer)) {
      // Clean the file path - remove extension and directory parts if needed
      const cleanFilePath = filePath.replace(/\.[^/.]+$/, '');
      
      qaMapping[cleanFilePath] = {
        question: question,
        answer: answer
      };
    }
  });
  
  console.log(`Created mapping for ${Object.keys(qaMapping).length} files`);
  return qaMapping;
}

/**
 * Generate a TypeScript file with the question-answer mapping
 * @param qaMapping The question-answer mapping
 * @param outputFilePath Path to write the TypeScript file
 */
export function generateTypeScriptFile(qaMapping: QuestionAnswerMap, outputFilePath: string): void {
  const outputDir = path.dirname(outputFilePath);
  
  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate TypeScript file content
  const tsContent = `/**
 * Generated question-answer mapping from Excel file
 * Generated on: ${new Date().toISOString()}
 */

export type QuestionAnswerPair = {
  question: string;
  answer: string;
};

export const questionAnswerMap: Record<string, QuestionAnswerPair> = ${JSON.stringify(qaMapping, null, 2)};

/**
 * Gets a question-answer pair for a given file path
 * @param filePath The file path without extension
 * @returns Question-answer pair or empty strings if not found
 */
export function getQuestionAnswer(filePath: string): QuestionAnswerPair {
  // Clean the file path - remove extension if present
  const cleanPath = filePath.replace(/\\.[^/.]+$/, '');
  
  // Try to find an exact match
  if (questionAnswerMap[cleanPath]) {
    return questionAnswerMap[cleanPath];
  }
  
  // If no exact match, try to find a match based on the filename only
  const fileName = cleanPath.split('/').pop() || '';
  
  for (const key in questionAnswerMap) {
    if (key.endsWith(fileName)) {
      return questionAnswerMap[key];
    }
  }
  
  // Return empty strings if no match found
  return { question: '', answer: '' };
}
`;
  
  // Write the TypeScript file
  fs.writeFileSync(outputFilePath, tsContent);
  console.log(`Generated TypeScript file: ${outputFilePath}`);
}

/**
 * Process an Excel file and generate a TypeScript file
 * @param excelFilePath Path to the Excel file
 * @param outputFilePath Path to write the TypeScript file
 * @returns The question-answer mapping
 */
export function processExcelAndGenerateTS(excelFilePath: string, outputFilePath: string): QuestionAnswerMap {
  const qaMapping = processExcelFile(excelFilePath);
  generateTypeScriptFile(qaMapping, outputFilePath);
  return qaMapping;
}