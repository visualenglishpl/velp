import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Extract the meaningful part of the filename to match with questions and answers
 * This attempts to extract the Q&A indicator and question text from the file path
 */
function extractMatchingKey(filePath: string): string {
  // Convert backslashes to forward slashes for consistency
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Extract the filename without extension
  const filename = path.basename(normalizedPath, path.extname(normalizedPath));
  
  // Handle different file naming patterns
  
  // Pattern 1: Extract codes like "01 I A" or "05 M E" followed by the question text
  const match = filename.match(/\d{2}\s+[A-Z]\s+[A-Z](.+)/);
  if (match) {
    return match[0].trim();
  }
  
  // Pattern 2: Extract anything after the last slash that contains a question pattern
  const parts = normalizedPath.split('/');
  const lastPart = parts[parts.length - 1];
  
  if (lastPart.includes('?') || 
      lastPart.toLowerCase().includes('what') || 
      lastPart.toLowerCase().includes('where') || 
      lastPart.toLowerCase().includes('who') || 
      lastPart.toLowerCase().includes('how') ||
      lastPart.toLowerCase().includes('can you')) {
    return lastPart.trim();
  }
  
  // Pattern 3: Use the full filename as a fallback
  return filename.trim();
}

/**
 * Process Excel file and generate a mapping between file paths and Q&A
 * @param excelFilePath Path to the Excel file
 * @param outputPath Path where the generated TypeScript file will be saved
 * @returns Object containing the mapping
 */
export function processExcelAndGenerateTS(excelFilePath: string, outputPath: string): Record<string, { question: string; answer: string }> {
  console.log(`Processing Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0]; // Assume first sheet
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: ["filePath", "question", "answer"] });
  
  // Skip header row if present
  const startIndex = typeof data[0].filePath === 'string' && 
                   (data[0].filePath.toLowerCase().includes('file') || 
                    data[0].filePath.toLowerCase().includes('path')) ? 1 : 0;
  
  // Create mapping between file paths (keys) and Q&A (values)
  const qaMapping: Record<string, { question: string; answer: string }> = {};
  
  for (let i = startIndex; i < data.length; i++) {
    const row = data[i];
    
    // Skip empty rows
    if (!row.filePath) continue;
    
    // Extract matching key from file path
    const matchingKey = extractMatchingKey(row.filePath);
    
    // Create mapping entry
    qaMapping[matchingKey] = {
      question: row.question || '',
      answer: row.answer || ''
    };
    
    // Also create variations of the key for better matching
    // For example, if the key is "01 I A What is your name",
    // also create entries for "What is your name", "01 I A", etc.
    
    // Variant 1: Numbers and codes only (e.g., "01 I A")
    const codeMatch = matchingKey.match(/^\d{2}\s+[A-Z]\s+[A-Z]/);
    if (codeMatch) {
      qaMapping[codeMatch[0].trim()] = {
        question: row.question || '',
        answer: row.answer || ''
      };
    }
    
    // Variant 2: Question text only
    const questionTextMatch = matchingKey.match(/\d{2}\s+[A-Z]\s+[A-Z]\s+(.*)/);
    if (questionTextMatch && questionTextMatch[1]) {
      qaMapping[questionTextMatch[1].trim()] = {
        question: row.question || '',
        answer: row.answer || ''
      };
    }
  }
  
  // Generate TypeScript file
  const tsContent = `// Auto-generated file from Excel data
// Generated on ${new Date().toISOString()}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export const questionAnswerMapping: Record<string, QuestionAnswer> = ${JSON.stringify(qaMapping, null, 2)};

/**
 * Find the closest matching Q&A for a given filename
 * @param filename The filename to match
 * @returns The matching Q&A or undefined if no match
 */
export function findMatchingQA(filename: string): QuestionAnswer | undefined {
  // Normalize filename
  const normalizedFilename = filename.replace(/\\\\/g, '/');
  const baseFilename = normalizedFilename.split('/').pop() || '';
  
  // Try direct match first
  const directMatch = questionAnswerMapping[baseFilename];
  if (directMatch) return directMatch;
  
  // Try matching just the basename without extension
  const basenameWithoutExt = baseFilename.split('.')[0];
  const basenameMatch = questionAnswerMapping[basenameWithoutExt];
  if (basenameMatch) return basenameMatch;
  
  // Try looking for key portions in the filename
  for (const key of Object.keys(questionAnswerMapping)) {
    if (baseFilename.includes(key) || key.includes(baseFilename)) {
      return questionAnswerMapping[key];
    }
  }
  
  // No match found
  return undefined;
}
`;
  
  // Write the TypeScript file
  fs.writeFileSync(outputPath, tsContent);
  console.log(`Generated TypeScript file at: ${outputPath}`);
  
  return qaMapping;
}