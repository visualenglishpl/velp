import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Process an Excel file and generate TypeScript mapping code
 * @param excelFilePath Path to the Excel file to process
 * @param outputPath Path to save the generated TypeScript file (optional)
 * @returns Record<string, {question: string, answer: string}>
 */
export function processExcelAndGenerateTS(
  excelFilePath: string, 
  outputPath?: string
): Record<string, {question: string, answer: string}> {
  console.log(`Processing Excel file from: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  
  // Assume first sheet unless specified
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  console.log(`Found ${jsonData.length} rows in Excel sheet`);
  
  // Create mapping object
  const mapping: Record<string, {question: string, answer: string}> = {};
  
  console.log("Excel data sample:", JSON.stringify(jsonData.slice(0, 3), null, 2));
  
  // Process each row
  for (const row of jsonData) {
    // Type cast row to fix TypeScript errors
    const typedRow = row as Record<string, any>;
    
    // Based on the Excel screenshot, we know exactly what columns to use:
    // Column A: File code (like "01 I A")
    // Column B: Question
    // Column C: Answer
    
    // Access columns directly - Excel typically uses numbers or __EMPTY for column names
    let fileCode = null;
    let question = null;
    let answer = null;
    
    // Try different possible column names based on how Excel files are parsed
    for (const key of Object.keys(typedRow)) {
      const value = String(typedRow[key] || '');
      
      // First column (A) - usually contains file code like "01 I A"
      if (key === 'A' || key === '0' || key.includes('__EMPTY')) {
        if (value && value.match(/^\d{2}\s+[A-Za-z]/)) {
          fileCode = value;
        }
      }
      
      // Second column (B) - contains the question
      if (key === 'B' || key === '1' || (key.includes('__EMPTY') && fileCode && !question)) {
        if (value && value.startsWith('What') || value.startsWith('Do')) {
          question = value;
        }
      }
      
      // Third column (C) - contains the answer
      if (key === 'C' || key === '2' || (key.includes('__EMPTY') && fileCode && question && !answer)) {
        if (value && (value.startsWith('I') || value.startsWith('Yes') || value.startsWith('No'))) {
          answer = value;
        }
      }
    }
    
    // For Excel files where columns might have numeric indices
    if (!fileCode && typedRow['0']) fileCode = String(typedRow['0']);
    if (!question && typedRow['1']) question = String(typedRow['1']);
    if (!answer && typedRow['2']) answer = String(typedRow['2']);
    
    // Log first few rows to understand structure
    if (jsonData.indexOf(row) < 3) {
      console.log("Row structure:", { 
        fileCode, 
        question, 
        answer, 
        allKeys: Object.keys(typedRow),
        sampleValues: Object.values(typedRow).slice(0, 3)
      });
    }
    
    // Skip rows without required data
    if (!fileCode || !question || !answer) {
      continue;
    }
    
    // Clean up the file code to use as key
    const cleanFileCode = fileCode.trim();
    
    // Store mapping with the file code as key for easier pattern matching
    mapping[cleanFileCode] = {
      question: question,
      answer: answer
    };
    
    // Also store by file pattern (with extension variations)
    const filePatterns = [
      `${cleanFileCode}.png`,
      `${cleanFileCode}.jpg`,
      `${cleanFileCode}.gif`,
      `${cleanFileCode}.mp4`,
      cleanFileCode.replace(/\s+/g, ' '),  // normalize spaces
      cleanFileCode.toLowerCase(),         // lowercase version
      cleanFileCode.toUpperCase()          // uppercase version
    ];
    
    // Add these file patterns to our mapping
    for (const pattern of filePatterns) {
      mapping[pattern] = {
        question: question,
        answer: answer
      };
    }
  }
  
  console.log(`Generated mapping for ${Object.keys(mapping).length} files`);
  
  // Generate TypeScript file if outputPath is provided
  if (outputPath) {
    const tsCode = generateTypescriptCode(mapping);
    fs.writeFileSync(outputPath, tsCode);
    console.log(`TypeScript file generated at: ${outputPath}`);
  }
  
  return mapping;
}

/**
 * Generate TypeScript code for the mapping
 * @param mapping The mapping object to convert to TypeScript
 * @returns TypeScript code as a string
 */
function generateTypescriptCode(mapping: Record<string, {question: string, answer: string}>): string {
  // Format the mapping as a TypeScript object
  const entries = Object.entries(mapping)
    .map(([key, {question, answer}]) => {
      // Escape any quotes in the strings
      const escapedKey = key.replace(/"/g, '\\"');
      const escapedQuestion = question.replace(/"/g, '\\"');
      const escapedAnswer = answer.replace(/"/g, '\\"');
      
      return `  "${escapedKey}": {\n    question: "${escapedQuestion}",\n    answer: "${escapedAnswer}"\n  }`;
    })
    .join(',\n');
  
  // Generate the full TypeScript file content
  const tsCode = `// This file is auto-generated by excel-processor.ts
// Generated on ${new Date().toISOString()}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export const questionAnswerMapping: Record<string, QuestionAnswer> = {
${entries}
};

/**
 * Extract a code pattern like "01 I A" from a filename
 */
function extractCodePattern(text: string): string | null {
  // Try to match patterns like "01 I A" or "05 L C" 
  // This matches the exact format from the Excel file
  const codeMatch = text.match(/(\d{2})\s+([A-Za-z])\s+([A-Za-z])/i);
  if (codeMatch) {
    // Return standardized format while preserving case: "01 I A"
    return codeMatch[1] + " " + codeMatch[2] + " " + codeMatch[3];
  }
  
  // Try to match patterns with just two parts like "01 A"
  const simplifiedMatch = text.match(/(\d{2})\s+([A-Za-z])/i);
  if (simplifiedMatch) {
    return simplifiedMatch[1] + " " + simplifiedMatch[2];
  }

  return null;
}

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
    .replace(/\\.(png|jpg|jpeg|gif|webp|mp4)$/i, '') // Remove file extensions
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
`;

  return tsCode;
}