import { useState, useEffect } from 'react';
import { apiRequest } from "@/lib/queryClient";

interface QuestionAnswer {
  question: string;
  answer: string;
  codePattern?: string;
}

interface QAMapping {
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
   * @returns The matching QA or undefined if no match found
   */
  function findMatchingQA(filename: string): QuestionAnswer | undefined {
    if (!mappings || Object.keys(mappings).length === 0) {
      return undefined;
    }

    // Start with exact match
    if (mappings[filename]) {
      return mappings[filename];
    }

    // Try with the filename without extension
    const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '').trim();
    if (mappings[filenameWithoutExt]) {
      return mappings[filenameWithoutExt];
    }

    // Try extracting a code pattern like "01 A B" from the filename
    const codePattern = extractCodePatternFromFilename(filename);
    if (codePattern && mappings[codePattern]) {
      return mappings[codePattern];
    }

    // Try with code pattern variants
    if (codePattern) {
      const variants = generateCodePatternVariants(codePattern);
      for (const variant of variants) {
        if (mappings[variant]) {
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
      return bestMatch;
    }

    // No match found
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