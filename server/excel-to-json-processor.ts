import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export interface QuestionAnswer {
  question: string;
  answer: string;
  codePattern?: string;
}

export interface QAMapping {
  [key: string]: QuestionAnswer;
}

/**
 * Process an Excel file and generate JSON mapping
 * @param excelFilePath Path to the Excel file to process
 * @param outputPath Path to save the generated JSON file (optional)
 * @returns Record<string, {question: string, answer: string, codePattern?: string}>
 */
export function processExcelToJson(
  excelFilePath: string, 
  outputPath?: string
): QAMapping {
  console.log(`Processing Excel file from: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  
  // Process all sheets in the workbook
  const allMappings: QAMapping = {};
  
  for (const sheetName of workbook.SheetNames) {
    console.log(`Processing sheet: ${sheetName}`);
    const worksheet = workbook.Sheets[sheetName];
    
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
      const codePattern = extractCodePatternFromFilename(filename);
      
      // Skip if filename doesn't have a proper code pattern
      if (!codePattern) {
        continue;
      }
      
      // If we found a code pattern, use it as the key
      if (codePattern) {
        // Create various formats of the code pattern to increase match likelihood
        const patterns = generateCodePatternVariants(codePattern);
        
        for (const pattern of patterns) {
          allMappings[pattern] = {
            question,
            answer,
            codePattern: pattern
          };
        }
      }
      
      // Also map by the question itself for direct matching
      if (question) {
        allMappings[question] = {
          question,
          answer,
          codePattern: codePattern || ''
        };
      }
    }
  }
  
  console.log(`Generated mapping with ${Object.keys(allMappings).length} total entries`);
  
  // Save to JSON file if path is provided
  if (outputPath) {
    const jsonString = JSON.stringify(allMappings, null, 2);
    fs.writeFileSync(outputPath, jsonString);
    console.log(`Saved mapping to ${outputPath}`);
  }
  
  return allMappings;
}

/**
 * Generate variants of a code pattern to increase matching likelihood
 * @param codePattern The original code pattern (e.g., "01 A B")
 * @returns Array of variants
 */
function generateCodePatternVariants(codePattern: string): string[] {
  const variants = new Set<string>();
  
  // Add the original pattern
  variants.add(codePattern);
  
  // Normalize spacing (replace multiple spaces with single space)
  const normalizedPattern = codePattern.replace(/\s+/g, ' ').trim();
  variants.add(normalizedPattern);
  
  // Remove all spaces
  const noSpacesPattern = codePattern.replace(/\s+/g, '');
  variants.add(noSpacesPattern);
  
  // Add hyphenated version (e.g., "01-A-B")
  const hyphenatedPattern = normalizedPattern.replace(/\s/g, '-');
  variants.add(hyphenatedPattern);
  
  // Add lowercase and uppercase variants
  variants.add(codePattern.toLowerCase());
  variants.add(codePattern.toUpperCase());
  
  // Add variants with only first letter uppercase for each segment
  const segments = normalizedPattern.split(' ');
  if (segments.length > 1) {
    const capitalizedSegments = segments.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
    variants.add(capitalizedSegments.join(' '));
    variants.add(capitalizedSegments.join(''));
    variants.add(capitalizedSegments.join('-'));
  }
  
  return Array.from(variants);
}

/**
 * Extract a code pattern from a filename with improved accuracy
 * @param filename The filename to extract a code pattern from
 * @returns The extracted code pattern or null if no pattern found
 */
export function extractCodePatternFromFilename(filename: string): string | null {
  // Remove file extension
  const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '');
  
  // Try different regex patterns to extract codes
  
  // Pattern: "01 A B" or "01 A B What is this thing"
  const standardPattern = filenameWithoutExt.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])/i);
  if (standardPattern) {
    return `${standardPattern[1]} ${standardPattern[2].toUpperCase()} ${standardPattern[3].toUpperCase()}`;
  }
  
  // Pattern: "01A" or "01-A" (no third letter)
  const simplePattern = filenameWithoutExt.match(/(\d{2})[\s-]*([A-Za-z])/i);
  if (simplePattern) {
    return `${simplePattern[1]} ${simplePattern[2].toUpperCase()}`;
  }
  
  // Just get the number if available
  const numberPattern = filenameWithoutExt.match(/^(\d{2})/);
  if (numberPattern) {
    return numberPattern[1];
  }
  
  return null;
}

/**
 * Find the best matching question and answer for a given filename
 * @param filename The filename to match
 * @param mappings The QA mappings to search through
 * @returns The matching Q&A or undefined if no match found
 */
export function findMatchingQA(filename: string, mappings: QAMapping): QuestionAnswer | undefined {
  if (!filename || !mappings || Object.keys(mappings).length === 0) {
    return undefined;
  }
  
  console.log(`Looking for Q&A mapping for: ${filename}`);
  
  // Try exact match first
  if (mappings[filename]) {
    console.log(`Found exact filename match for: ${filename}`);
    return mappings[filename];
  }
  
  // Try with the filename without extension
  const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '').trim();
  if (mappings[filenameWithoutExt]) {
    console.log(`Found match for filename without extension: ${filenameWithoutExt}`);
    return mappings[filenameWithoutExt];
  }
  
  // Extract code pattern and try to match
  const codePattern = extractCodePatternFromFilename(filename);
  if (codePattern && mappings[codePattern]) {
    console.log(`Found match using extracted code pattern: ${codePattern}`);
    return mappings[codePattern];
  }
  
  // Try matching with code pattern variants
  if (codePattern) {
    const variants = generateCodePatternVariants(codePattern);
    for (const variant of variants) {
      if (mappings[variant]) {
        console.log(`Found match using code pattern variant: ${variant}`);
        return mappings[variant];
      }
    }
  }
  
  // Try partial matches
  // Look through all mappings and find the best match
  let bestMatch: QuestionAnswer | undefined = undefined;
  let bestMatchScore = 0;
  
  for (const [key, qa] of Object.entries(mappings)) {
    // Skip empty keys
    if (!key) continue;
    
    // Check if the key is a substring of the filename
    if (filename.includes(key)) {
      const matchScore = key.length; // Longer matches are better
      if (matchScore > bestMatchScore) {
        bestMatchScore = matchScore;
        bestMatch = qa;
      }
    }
    
    // Check if the filename is a substring of the key
    else if (key.includes(filenameWithoutExt) && filenameWithoutExt.length > 3) {
      const matchScore = filenameWithoutExt.length / 2; // Half score for reverse matches
      if (matchScore > bestMatchScore) {
        bestMatchScore = matchScore;
        bestMatch = qa;
      }
    }
    
    // Try matching by code pattern if available
    if (qa.codePattern && codePattern) {
      if (qa.codePattern.includes(codePattern) || codePattern.includes(qa.codePattern)) {
        const matchScore = Math.min(qa.codePattern.length, codePattern.length);
        if (matchScore > bestMatchScore) {
          bestMatchScore = matchScore;
          bestMatch = qa;
        }
      }
    }
  }
  
  if (bestMatch) {
    console.log(`Found partial match with score ${bestMatchScore}`);
    return bestMatch;
  }
  
  // No match found
  console.log(`No mapping match found for: ${filename}`);
  return undefined;
}