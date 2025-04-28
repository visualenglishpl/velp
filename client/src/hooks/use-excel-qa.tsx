import { useState, useEffect } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { getQuestionAnswer } from '@/lib/qa-pattern-engine';

export interface QuestionAnswer {
  question: string;
  answer: string;
  codePattern?: string;
  generatedBy?: string;
  source?: string;
  unitId?: string;  // Add unitId to track which unit this Q&A belongs to
}

export interface QAMapping {
  [key: string]: QuestionAnswer;
}

// Cache of loaded mappings
const loadedMappings: Record<string, QAMapping> = {};

/**
 * Hook to load and use the Excel QA mappings from JSON files
 * @param bookId The book ID
 * @returns The QA mappings and loading state
 */
export function useExcelQA(bookId: string) {
  const [mappings, setMappings] = useState<QAMapping | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMappings() {
      try {
        // If already in cache, use it
        if (loadedMappings[bookId]) {
          setMappings(loadedMappings[bookId]);
          setIsLoading(false);
          return;
        }

        // Try to load from the JSON file
        const jsonFilePath = `/src/data/qa-mapping-book${bookId}.json`;
        
        try {
          const response = await fetch(jsonFilePath);
          
          if (response.ok) {
            const data = await response.json();
            
            // Save to cache and state
            loadedMappings[bookId] = data;
            setMappings(data);
          } else {
            console.error(`Failed to load QA mappings JSON for book ${bookId}: ${response.status} ${response.statusText}`);
            setError(new Error(`Failed to load QA mappings for book ${bookId}`));
            
            // Fallback to the API
            await loadFromAPI();
          }
        } catch (fetchError) {
          console.error(`Error loading QA mappings JSON for book ${bookId}:`, fetchError);
          
          // Fallback to the API
          await loadFromAPI();
        }
      } finally {
        setIsLoading(false);
      }
    }

    async function loadFromAPI() {
      try {
        console.log(`Loading QA mappings from API for book ${bookId}`);
        
        // First try our new direct JSON-based API endpoint (most reliable)
        try {
          const jsonApiResponse = await fetch(`/api/direct/${bookId}/json-qa`);
          
          if (jsonApiResponse.ok) {
            const jsonData = await jsonApiResponse.json();
            
            if (jsonData.success && jsonData.mappings) {
              console.log(`Successfully loaded ${jsonData.mappingCount} QA mappings from direct JSON API for book ${bookId}`);
              
              // Save to cache and state
              loadedMappings[bookId] = jsonData.mappings;
              setMappings(jsonData.mappings);
              return;
            } else {
              console.warn(`JSON API endpoint returned success=false for book ${bookId}:`, jsonData.error);
            }
          } else {
            console.warn(`JSON API request failed for book ${bookId}: ${jsonApiResponse.status} ${jsonApiResponse.statusText}`);
          }
        } catch (jsonApiError) {
          console.warn(`Error using direct JSON API for book ${bookId}:`, jsonApiError);
        }
        
        // If the new endpoint fails, fall back to the old processing endpoint
        console.log(`Falling back to Excel processing API for book ${bookId}`);
        const response = await apiRequest("GET", `/api/direct/process-qa-excel?bookId=${bookId}`);
        const result = await response.json();

        if (result.success) {
          console.log(`Successfully processed QA Excel for book ${bookId} with ${result.mappingCount} entries`);
          
          // Now try to load the JSON file again
          const jsonFilePath = `/src/data/qa-mapping-book${bookId}.json`;
          const jsonResponse = await fetch(jsonFilePath);
          
          if (jsonResponse.ok) {
            const data = await jsonResponse.json();
            
            // Save to cache and state
            loadedMappings[bookId] = data;
            setMappings(data);
          } else {
            throw new Error(`Failed to load QA mappings after processing: ${jsonResponse.status} ${jsonResponse.statusText}`);
          }
        } else {
          throw new Error(result.error || "Failed to process QA Excel");
        }
      } catch (apiError) {
        console.error(`Error loading QA mappings from API for book ${bookId}:`, apiError);
        setError(apiError instanceof Error ? apiError : new Error(String(apiError)));
      }
    }

    loadMappings();
  }, [bookId]);

  /**
   * Find a matching QA for a filename using the improved algorithm
   * @param filename The filename to match
   * @param currentUnitId Optional unitId to filter matches by unit
   * @returns The matching QA or undefined if no match found
   */
  function findMatchingQA(filename: string, currentUnitId?: string): QuestionAnswer | undefined {
    if (!mappings || Object.keys(mappings).length === 0) {
      return undefined;
    }

    // Debug the filename for better understanding
    console.log(`Looking for match for filename: ${filename}`);
    
    // Create a filtered mappings object that only includes entries for this unit
    const filteredMappings: QAMapping = {};
    
    if (currentUnitId) {
      // Filter mappings to only include those from the current unit or with no unit
      Object.entries(mappings).forEach(([key, qa]) => {
        if (!qa.unitId || qa.unitId === currentUnitId) {
          filteredMappings[key] = qa;
        }
      });
      
      console.log(`Filtered mappings to ${Object.keys(filteredMappings).length} entries matching unit ${currentUnitId}`);
    } else {
      // If no unitId provided, use all mappings
      Object.assign(filteredMappings, mappings);
    }
    
    // Use the filtered mappings for matching
    
    // Start with exact match
    if (filteredMappings[filename]) {
      console.log(`Found exact match for:`, filename);
      return filteredMappings[filename];
    }

    // Try with the filename without extension
    const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '').trim();
    if (filteredMappings[filenameWithoutExt]) {
      console.log(`Found match without extension for:`, filenameWithoutExt);
      return filteredMappings[filenameWithoutExt];
    }

    // Special handling for Unit 6 "What Colour is" patterns
    if (filename.includes("What Colour is") || filename.includes("What Color is")) {
      // Look through available entries to find a color match
      const allEntries = Object.values(filteredMappings);
      
      // Try to find the object type from the filename
      // For example, extract "Ice Cream" from "02 F e What Colour is the Ice Cream – is the Picture Fake or Real.jpg"
      const objectMatch = filenameWithoutExt.match(/What\s+Colou?r\s+is\s+the\s+([^–\?\.]+)/i);
      
      if (objectMatch && objectMatch[1]) {
        const objectName = objectMatch[1].trim().toLowerCase();
        console.log(`Found color question about:`, objectName);
        
        // Look for entries with similar question patterns
        for (const entry of allEntries) {
          if (entry.question.toLowerCase().includes("what colour is") ||
              entry.question.toLowerCase().includes("what color is")) {
            console.log(`Found local Excel mapping for:`, filename);
            return entry;
          }
        }
      }
    }

    // Try extracting a code pattern like "01 A B" from the filename
    const codePattern = extractCodePatternFromFilename(filename);
    if (codePattern) {
      console.log(`Searching for match with extracted code pattern: "${codePattern}"`);
      
      // First try direct match with the code pattern
      if (filteredMappings[codePattern]) {
        console.log(`Found match with code pattern for:`, codePattern);
        return filteredMappings[codePattern];
      }
      
      // Then try to match with just the first part (section number and letter)
      // Example: if we have "02 F a" try to match with any entry that has "02 F"
      const mainSection = codePattern.split(' ').slice(0, 2).join(' ');
      
      // Find all entries with this main section
      const matchingEntries = Object.entries(filteredMappings).filter(([key, value]) => {
        if (value.codePattern) {
          return value.codePattern.startsWith(mainSection);
        }
        return false;
      });
      
      if (matchingEntries.length > 0) {
        // Log all the matching entries
        console.log(`Entries matched with main section "${mainSection}":`, matchingEntries.map(([key, value]) => value.codePattern));
        
        // Try to find the best match based on question patterns
        // For Unit 6, prioritize color-related questions
        if (filename.includes("Colour") || filename.includes("Color")) {
          const colorEntry = matchingEntries.find(([key, value]) => 
            value.question.includes("colour") || value.question.includes("color")
          );
          
          if (colorEntry) {
            console.log(`Found color-related entry:`, colorEntry[1].question);
            return colorEntry[1];
          }
        }
        
        // Return the first match if nothing better is found
        console.log(`Using first match from section:`, matchingEntries[0][1].question);
        return matchingEntries[0][1];
      } else {
        console.log(`No entries matched the code pattern "${codePattern}"`);
        
        // Log available patterns to help debugging
        const availablePatterns = Object.values(filteredMappings)
          .map(qa => qa.codePattern)
          .filter(Boolean)
          .join(", ");
        console.log(`Available code patterns:`, availablePatterns);
      }
      
      // Try with code pattern variants
      const variants = generateCodePatternVariants(codePattern);
      for (const variant of variants) {
        if (filteredMappings[variant]) {
          console.log(`Found match with variant "${variant}" for original pattern "${codePattern}"`);
          return filteredMappings[variant];
        }
      }
    }

    // Check if filename contains "What is It"
    if (filename.toLowerCase().includes("what is it")) {
      console.log(`Found question match in filename for:`, "What is it?");
      
      // Look for entries with this question
      for (const entry of Object.values(filteredMappings)) {
        if (entry.question.toLowerCase() === "what is it?") {
          console.log(`Using Excel entry:`, entry);
          return entry;
        }
      }
    }

    // Try partial matches as a last resort
    let bestMatch: QuestionAnswer | undefined = undefined;
    let bestMatchScore = 0;

    for (const [key, qa] of Object.entries(filteredMappings)) {
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
      console.log(`Found best partial match with score ${bestMatchScore}:`, bestMatch.question);
      return bestMatch;
    }

    // No match found
    console.log(`No match found for ${filename}`);
    return undefined;
  }

  return { mappings, isLoading, error, findMatchingQA };
}

/**
 * Extract a code pattern from a filename
 * @param filename The filename to extract a code pattern from
 * @returns The extracted code pattern or null if no pattern found
 */
export function extractCodePatternFromFilename(filename: string): string | null {
  // Remove file extension
  const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '');
  
  // Debug log to see what we're working with
  console.log(`DEBUG: First 10 chars of filename: "${filenameWithoutExt.slice(0, 10)}"`);
  
  // Try different regex patterns to extract codes
  
  // Pattern: "02 F a" - found in Unit 6 (pattern for colors)
  const colorPattern = filenameWithoutExt.match(/^(\d{2})\s*([A-Za-z])\s*([a-z])/i);
  if (colorPattern) {
    const pattern = `${colorPattern[1]} ${colorPattern[2].toUpperCase()} ${colorPattern[3].toLowerCase()}`;
    console.log(`DEBUG: Extracted section pattern ${pattern}`);
    return pattern;
  }
  
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
  
  // Pattern: for filenames like "02 F e What Colour is the Ice Cream – is the Picture Fake or Real.jpg"
  // Extract the question part
  const questionMatch = filenameWithoutExt.match(/What\s+Colour\s+is\s+the\s+([^–]+)/i);
  if (questionMatch) {
    console.log(`Found question match in filename for:`, "What is it?");
    return null; // We'll handle this in the findMatchingQA method
  }
  
  // Just get the number if available
  const numberPattern = filenameWithoutExt.match(/^(\d{2})/);
  if (numberPattern) {
    return numberPattern[1];
  }
  
  return null;
}

/**
 * Generate variants of a code pattern to increase matching likelihood
 * @param codePattern The original code pattern (e.g., "01 A B")
 * @returns Array of variants
 */
export function generateCodePatternVariants(codePattern: string): string[] {
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