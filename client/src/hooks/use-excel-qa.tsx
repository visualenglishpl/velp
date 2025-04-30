import { useState, useEffect, useCallback } from 'react';
import { getQuestionAnswer } from '@/lib/qa-pattern-engine';

export interface QuestionAnswer {
  question: string;
  answer: string;
  codePattern?: string;
  generatedBy?: string;
  source?: string;
  unitId?: string;  // Add unitId to track which unit this Q&A belongs to
  bookId?: string;  // Add bookId to track which book this Q&A belongs to
  filename?: string; // Original filename this Q&A is associated with
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
  const [mappings, setMappings] = useState<QAMapping>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Normalize bookId to handle formats like "book3" or just "3"
  const normalizedBookId = bookId.startsWith('book') ? bookId : `book${bookId}`;

  useEffect(() => {
    async function loadMappings() {
      try {
        // If already in cache, use it
        if (loadedMappings[normalizedBookId]) {
          console.log(`Using cached mappings for ${normalizedBookId} with ${Object.keys(loadedMappings[normalizedBookId]).length} entries`);
          setMappings(loadedMappings[normalizedBookId]);
          setIsLoading(false);
          return;
        }

        // Try to dynamically load the JSON file
        try {
          const importedModule = await import(`../data/qa-mapping-${normalizedBookId}.json`);
          const data = importedModule.default;
          console.log(`Successfully loaded ${Object.keys(data).length} Q&A entries from JSON file for ${normalizedBookId}`);
          
          // Save to cache and state
          loadedMappings[normalizedBookId] = data;
          setMappings(data);
        } catch (importError) {
          console.warn(`Error importing JSON file for ${normalizedBookId}:`, importError);
          
          // Try fetching from the API directly
          try {
            const response = await fetch(`/api/direct/${normalizedBookId}/json-qa`);
            if (response.ok) {
              const result = await response.json();
              
              if (result.success && result.mappings) {
                console.log(`Successfully loaded ${result.mappingCount} Q&A mappings from direct JSON API for ${normalizedBookId}`);
                
                // Save to cache and state
                loadedMappings[normalizedBookId] = result.mappings;
                setMappings(result.mappings);
              } else {
                console.warn(`JSON API endpoint returned success=false for ${normalizedBookId}:`, result.error);
                setMappings({});
              }
            } else {
              console.warn(`JSON API request failed for ${normalizedBookId}: ${response.status} ${response.statusText}`);
              setMappings({});
            }
          } catch (apiError) {
            console.error(`API error for ${normalizedBookId}:`, apiError);
            setMappings({});
          }
        }
      } catch (err) {
        console.error(`Error loading mappings for ${normalizedBookId}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setMappings({});
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadMappings();
  }, [normalizedBookId]);

  const findMatchingQA = useCallback((filename: string, currentUnitId?: string): QuestionAnswer | undefined => {
    if (Object.keys(mappings).length === 0) {
      console.log(`No mappings available for ${normalizedBookId}, using pattern engine for ${filename} in ${currentUnitId}`);
      return getQuestionAnswer(filename, currentUnitId, normalizedBookId);
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
      Object.entries(mappings).forEach(([key, qa]) => {
        filteredMappings[key] = qa;
      });
    }
    
    // Try direct match with the filename
    if (filteredMappings[filename]) {
      console.log(`✅ FOUND MATCH using enhanced JSON-based mapping for:`, filename);
      return filteredMappings[filename];
    }

    // Try with the filename without extension
    const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '').trim();
    if (filteredMappings[filenameWithoutExt]) {
      console.log(`✅ FOUND MATCH using enhanced JSON-based mapping for:`, filename);
      return filteredMappings[filenameWithoutExt];
    }

    // Try extracting a code pattern from the filename
    const codePattern = extractCodePatternFromFilename(filename);
    if (codePattern) {
      console.log(`Searching for match with extracted code pattern: "${codePattern}"`);
      
      // Direct match with code pattern
      if (filteredMappings[codePattern]) {
        console.log(`✅ FOUND MATCH using enhanced JSON-based mapping for:`, filename);
        return filteredMappings[codePattern];
      }
      
      // Try to match with just the main section (e.g., "01 N" from "01 N A")
      const mainSection = codePattern.split(' ').slice(0, 2).join(' ');
      
      // Find all entries with this main section
      const matchingEntries = Object.entries(filteredMappings).filter(([_, value]) => {
        if (value.codePattern) {
          return value.codePattern.startsWith(mainSection);
        }
        return false;
      });
      
      if (matchingEntries.length > 0) {
        // Log the matching entries' patterns
        console.log(`Entries matched with main section "${mainSection}":`, matchingEntries.map(([_, value]) => value.codePattern));
        
        // Use the first match
        console.log(`✅ FOUND MATCH using enhanced JSON-based mapping for:`, filename);
        return matchingEntries[0][1];
      } else {
        console.log(`No entries matched the code pattern "${codePattern}"`);
      }
    }

    // Fall back to pattern engine if no match is found
    console.log(`❌ No match found using enhanced JSON-based mapping for:`, filename);
    
    // Extract simplified code pattern for debugging
    const simplifiedPattern = extractSimplifiedPattern(filename);
    console.log(`Extracted simplified code pattern:`, simplifiedPattern, `from filename:`, filename);
    
    // List some available patterns for debugging
    const availablePatterns = Object.values(filteredMappings)
      .map(qa => qa.codePattern)
      .filter(Boolean)
      .slice(0, 30)
      .join(", ");
    console.log(`Available code patterns:`, availablePatterns);
    
    return getQuestionAnswer(filename, currentUnitId, normalizedBookId);
  }, [mappings, normalizedBookId]);

  return { mappings, isLoading, error, findMatchingQA };
}

/**
 * Extract a code pattern from a filename
 */
function extractCodePatternFromFilename(filename: string): string | null {
  // Remove file extension
  const filenameWithoutExt = filename.replace(/\.(png|jpg|jpeg|gif|webp|mp4)$/i, '');
  
  // Debug log to see what we're working with
  console.log(`DEBUG: First 10 chars of filename: "${filenameWithoutExt.slice(0, 10)}"`);
  
  // Pattern: Standard section code "01 N A"
  const standardPattern = filenameWithoutExt.match(/^(\d{2})\s*([A-Za-z])\s*([A-Za-z])/);
  if (standardPattern) {
    return `${standardPattern[1]} ${standardPattern[2].toUpperCase()} ${standardPattern[3].toUpperCase()}`;
  }
  
  // Pattern: Simple section code "01 N"
  const simplePattern = filenameWithoutExt.match(/^(\d{2})\s*([A-Za-z])/);
  if (simplePattern) {
    console.log(`DEBUG: Extracted section pattern ${simplePattern[1]} ${simplePattern[2].toLowerCase()}`);
    return `${simplePattern[1]} ${simplePattern[2].toUpperCase()}`;
  }
  
  return null;
}

/**
 * Extract a simplified pattern for debugging
 */
function extractSimplifiedPattern(filename: string): string | null {
  // Remove file extension and extract any digit-letter pattern
  const match = filename.replace(/\.[^.]+$/, '').match(/(\d+)\s*([A-Za-z])/);
  return match ? `${match[1]} ${match[2]}` : null;
}