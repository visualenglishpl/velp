const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * Script to update question-answer mapping from Excel file
 * 
 * This script:
 * 1. Reads an Excel file containing corrected questions and answers
 * 2. Maps file paths to their corresponding questions/answers
 * 3. Updates the question-data.ts file with corrected Q&As 
 * 
 * Assumption: Excel file has columns for file path, question, and answer
 */

// Configuration
const EXCEL_FILE = path.join(__dirname, '../attached_assets/VISUAL 1 QUESTIONS.xlsx');
const OUTPUT_FILE = path.join(__dirname, '../client/src/data/question-data.ts');

async function main() {
  try {
    console.log('Starting question-answer mapping update process...');
    
    // Read the Excel file
    console.log(`Reading Excel file: ${EXCEL_FILE}`);
    const workbook = xlsx.readFile(EXCEL_FILE);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(`Found ${data.length} rows in Excel file`);
    
    // Create a mapping from file path to question/answer
    const qaMapping = {};
    
    data.forEach((row, index) => {
      // Excel columns might vary - adjust these column names based on your Excel structure
      const filePath = row['File Path'] || row['Filename'] || row['Path'] || '';
      const question = row['Question'] || row['Q'] || '';
      const answer = row['Answer'] || row['A'] || '';
      
      if (filePath && (question || answer)) {
        // Clean the file path - remove extension and directory parts if needed
        const cleanFilePath = filePath.replace(/\.[^/.]+$/, ''); // Remove extension
        
        qaMapping[cleanFilePath] = {
          question: question,
          answer: answer
        };
      }
    });
    
    console.log(`Created mapping for ${Object.keys(qaMapping).length} files`);
    
    // Check if the output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate TypeScript file with the mapping
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
  const cleanPath = filePath.replace(/\.[^/.]+$/, '');
  
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
    fs.writeFileSync(OUTPUT_FILE, tsContent);
    console.log(`Updated question-answer mapping written to: ${OUTPUT_FILE}`);
    
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error processing Excel file:', error);
    process.exit(1);
  }
}

main();