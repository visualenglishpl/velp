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
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as Array<Record<string, any>>;
    
    console.log(`Found ${jsonData.length} rows in sheet ${sheetName}`);
    
    // Process each row and extract information
    for (const row of jsonData) {
      // Check the Excel structure. The main columns we're looking for are:
      // - A column with file code/pattern (might be called "Code", "__EMPTY", etc.)
      // - A column with the question (might be called "Question", "__EMPTY_1", etc.)
      // - A column with the answer (might be called "Answer", "__EMPTY_2", etc.)
      
      // Try to find the pattern in various formats
      let codePattern = null;
      for (const key of Object.keys(row)) {
        const value = row[key]?.toString() || '';
        // Check if this value looks like a code pattern (e.g., "01 A B", "02 N C", etc.)
        if (value.match(/^\d{2}\s*[A-Za-z]\s*[A-Za-z]/i)) {
          codePattern = value;
          break;
        }
      }
      
      // Look for question and answer in different column names
      let question = '';
      let answer = '';
      
      // Standard column names in Excel
      if (row['Question'] || row['question'] || row['QUESTION']) {
        question = row['Question'] || row['question'] || row['QUESTION'];
      }
      
      if (row['Answer'] || row['answer'] || row['ANSWER']) {
        answer = row['Answer'] || row['answer'] || row['ANSWER'];
      }
      
      // If not found with standard names, try looking at "__EMPTY_1" (often used for question) and "__EMPTY_2" (often used for answer)
      if (!question && row['__EMPTY_1']) {
        question = row['__EMPTY_1'];
      }
      
      if (!answer && row['__EMPTY_2']) {
        answer = row['__EMPTY_2'];
      }
      
      // If still no question/answer, try other fields
      const keys = Object.keys(row);
      if (!question && keys.length > 1) {
        question = row[keys[1]];
      }
      
      if (!answer && keys.length > 2) {
        answer = row[keys[2]];
      }
      
      // Skip if required fields are missing
      if (!question || !answer) {
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