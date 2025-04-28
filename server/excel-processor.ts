import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export interface QuestionAnswer {
  question: string;
  answer: string;
  codePattern?: string;
  unitId?: string;  // Add unitId to track which unit this Q&A belongs to
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
  
  // Create mapping object
  const mapping: Record<string, QuestionAnswer> = {};
  
  // Process all sheets in the workbook
  for (const sheetName of workbook.SheetNames) {
    console.log(`Processing sheet: ${sheetName}`);
    const worksheet = workbook.Sheets[sheetName];
    
    // Extract unit information from sheet name (e.g., "VISUAL 1 - UNIT 8" → unit8)
    // Use multiple regex patterns to try to extract unit number
    let unitNumber = null;
    
    // Try pattern: "UNIT X" or "UNIT-X"
    const unitMatch = sheetName.match(/UNIT[\s-]*(\d+)/i);
    if (unitMatch) {
      unitNumber = unitMatch[1];
    } 
    
    // Try pattern: "UX" (e.g., "U8" for Unit 8)
    if (!unitNumber) {
      const shortUnitMatch = sheetName.match(/\bU(\d+)\b/i);
      if (shortUnitMatch) {
        unitNumber = shortUnitMatch[1];
      }
    }
    
    // Try looking for just a number in the sheet name (last resort)
    if (!unitNumber) {
      const justNumberMatch = sheetName.match(/\b(\d{1,2})\b/);
      if (justNumberMatch) {
        unitNumber = justNumberMatch[1];
      }
    }
    
    // Format unitId as "unitX"
    const unitId = unitNumber ? `unit${unitNumber}` : '';
    
    if (unitNumber) {
      console.log(`✅ Successfully extracted unit number ${unitNumber} from sheet name: ${sheetName}`);
    } else {
      console.log(`⚠️ Could not extract unit number from sheet name: ${sheetName}`);
    }
    
    console.log(`Processing sheet ${sheetName} with unitId: ${unitId || 'NONE'}`);
    
    // Process the Excel file manually to properly handle the specific structure
    // Visual English Excel files have:
    // Column A: Filename
    // Column B: Question
    // Column C: Answer
    
    let rowIndex = 1;
    let processedRows = 0;
    
    while (true) {
      const filenameCell = worksheet['A' + rowIndex];
      const questionCell = worksheet['B' + rowIndex];
      const answerCell = worksheet['C' + rowIndex];
      
      // Break when we reach the end of data
      if (!filenameCell) {
        break;
      }
      
      rowIndex++;
      
      // Skip rows without question/answer
      if (!questionCell || !answerCell) {
        continue;
      }
      
      const filename = filenameCell.v.toString();
      let question = questionCell.v.toString();
      let answer = answerCell.v.toString();
      
      // Remove quotation marks if present
      question = question.replace(/^"(.+)"$/, '$1');
      answer = answer.replace(/^"(.+)"$/, '$1');
      
      processedRows++;
      
      // Extract code pattern from filename
      const codePattern = extractCodePattern(filename);
      
      // Skip if filename doesn't have a proper code pattern
      if (!codePattern) {
        continue;
      }
      
      // Add to mapping using code as key, including unitId
      mapping[codePattern] = {
        question,
        answer,
        codePattern,
        unitId: unitId || undefined   // Include unitId when available
      };
      
      // Also add formatted variants for better matching
      const formattedCode = codePattern.trim().replace(/\s+/g, ' ');
      if (formattedCode !== codePattern) {
        mapping[formattedCode] = {
          question,
          answer,
          codePattern,
          unitId: unitId || undefined   // Include unitId when available
        };
      }
      
      // Add lowercase variant for case-insensitive matching
      mapping[codePattern.toLowerCase()] = {
        question,
        answer,
        codePattern,
        unitId: unitId || undefined   // Include unitId when available
      };
    }
    
    console.log(`Processed ${processedRows} rows in sheet ${sheetName}`);
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
 * @param currentUnitId Optional unitId to filter matches by unit
 * @returns The matching Q&A or undefined if no match
 */
export function findMatchingQA(filename: string, currentUnitId?: string): QuestionAnswer | undefined {
  console.log(`Looking for Q&A mapping for: ${filename}${currentUnitId ? ` (unit: ${currentUnitId})` : ''}`);
  
  // Create a filtered mappings object that only includes entries for this unit
  let filteredMappings: Record<string, QuestionAnswer> = {};
  
  if (currentUnitId) {
    // Filter mappings to only include those from the current unit or with no unit
    Object.entries(questionAnswerMapping).forEach(([key, qa]) => {
      if (!qa.unitId || qa.unitId === currentUnitId) {
        filteredMappings[key] = qa;
      }
    });
    
    console.log(`Filtered mappings to ${Object.keys(filteredMappings).length} entries matching unit ${currentUnitId}`);
  } else {
    // If no unitId provided, use all mappings
    filteredMappings = questionAnswerMapping;
  }
  
  // First, try an exact match with filtered mappings
  if (filteredMappings[filename]) {
    console.log("Found exact match for:", filename);
    return filteredMappings[filename];
  }
  
  // If no exact match, try to find a match by cleaning up the filename
  const cleanedFilename = filename
    .replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '') // Remove file extensions
    .trim();
    
  if (filteredMappings[cleanedFilename]) {
    console.log("Found match for cleaned filename:", cleanedFilename);
    return filteredMappings[cleanedFilename];
  }
  
  // Try to match by exact code pattern from Excel (like "01 I A")
  const codePattern = extractCodePattern(filename);
  if (codePattern) {
    console.log("Extracted code pattern:", codePattern, "from filename:", filename);
    
    // First, try exact pattern match
    if (filteredMappings[codePattern]) {
      console.log("Found exact code pattern match:", codePattern);
      return filteredMappings[codePattern];
    }
    
    // Try normalized code pattern (lowercase)
    const normalizedCodePattern = codePattern.toLowerCase();
    if (filteredMappings[normalizedCodePattern]) {
      console.log("Found normalized code pattern match:", normalizedCodePattern);
      return filteredMappings[normalizedCodePattern];
    }
    
    // Look for partial matches based on the code pattern
    for (const [key, qa] of Object.entries(filteredMappings)) {
      // Check if the key contains the code pattern at the beginning
      if (key.toLowerCase().startsWith(normalizedCodePattern.toLowerCase()) ||
          key.toLowerCase().includes(normalizedCodePattern.toLowerCase())) {
        console.log("Found partial code pattern match:", key);
        return qa;
      }
    }
  }
  
  // If still no match, try if any key is a substring of filename
  for (const [key, qa] of Object.entries(filteredMappings)) {
    if (filename.includes(key)) {
      console.log("Found substring match:", key, "in filename:", filename);
      return qa;
    }
  }
  
  // Try the reverse - if filename is a substring of any key
  for (const [key, qa] of Object.entries(filteredMappings)) {
    if (key.includes(cleanedFilename)) {
      console.log("Found filename as substring in key:", key);
      return qa;
    }
  }
  
  // No match found
  console.log("No mapping match found for:", filename);
  return undefined;
}