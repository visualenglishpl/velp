import { useState, useEffect, useCallback } from 'react';
// Simplified imports - no longer using pattern matching engines

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
          const data = importedModule.default || {};
          if (Object.keys(data).length > 0) {
            console.log(`Successfully loaded ${Object.keys(data).length} Q&A entries from JSON file for ${normalizedBookId}`);
            
            // Save to cache and state
            loadedMappings[normalizedBookId] = data;
            setMappings(data);
            return;
          }
        } catch (importError) {
          // Silently handle import errors and try API fallback
          
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
        console.warn(`Could not load mappings for ${normalizedBookId}, using fallback`);
        setError(null); // Don't set error, just use fallback
        setMappings({});
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadMappings().catch(err => {
      console.warn('Async loading error handled:', err);
      setMappings({});
      setIsLoading(false);
    });
  }, [normalizedBookId]);

  const findMatchingQA = useCallback((filename: string, currentUnitId?: string): QuestionAnswer | undefined => {
    // Debug level: 0=none, 1=important, 2=details
    const debugLevel = 0;
    
    // Helper function to log with debug level
    const logDebug = (message: string, level: number = 1) => {
      if (level <= debugLevel) {
        console.log(message);
      }
    };
    
    // Clean up filename for better matching
    const cleanFilename = (name: string): string => {
      // Extract just the filename without path
      const filenameOnly = name.split('/').pop() || name;
      // Remove extension
      return filenameOnly.replace(/\.(png|jpg|jpeg|gif|webp|mp4|pdf|swf)$/i, '').trim();
    };
    
    // Extract the cleaned filename for better matching
    const cleanedFilename = cleanFilename(filename);
    logDebug(`Processing: "${cleanedFilename}" (original: "${filename}")`, 2);
    
    if (Object.keys(mappings).length === 0) {
      logDebug(`No mappings available for ${normalizedBookId}, leaving blank for ${filename}`);
      return undefined;
    }

    // Debug the filename for better understanding
    logDebug(`Looking for match for filename: ${filename}`, 2);
    
    // Create a filtered mappings object that only includes entries for this unit
    const filteredMappings: QAMapping = {};
    
    if (currentUnitId) {
      // Filter mappings to only include those from the current unit or with no unit
      Object.entries(mappings).forEach(([key, qa]) => {
        if (!qa.unitId || qa.unitId === currentUnitId) {
          filteredMappings[key] = qa;
        }
      });
      
      logDebug(`Filtered mappings to ${Object.keys(filteredMappings).length} entries matching unit ${currentUnitId}`, 2);
    } else {
      // If no unitId provided, use all mappings
      Object.entries(mappings).forEach(([key, qa]) => {
        filteredMappings[key] = qa;
      });
    }
    
    // STRATEGY 1: Direct exact match with the complete cleaned filename
    if (filteredMappings[cleanedFilename]) {
      logDebug(`✅ FOUND MATCH (exact filename) for: ${cleanedFilename}`, 1);
      return filteredMappings[cleanedFilename];
    }
    
    // STRATEGY 2: Case-insensitive exact match with complete filename
    const lowerCleanedFilename = cleanedFilename.toLowerCase();
    for (const [key, qa] of Object.entries(filteredMappings)) {
      if (key.toLowerCase() === lowerCleanedFilename) {
        logDebug(`✅ FOUND MATCH (case-insensitive filename) for: ${cleanedFilename}`, 1);
        return qa;
      }
    }

    // If no exact filename match found, only extract Q&A from filenames that contain dash patterns
    const dashMatch = filename.match(/([^-–]+)\s*[-–]\s*(.+?)(\.(png|jpg|jpeg|gif|webp|mp4)|$)/i);
    if (dashMatch && dashMatch[1] && dashMatch[2]) {
      const question = dashMatch[1].trim();
      const answer = dashMatch[2].trim();
      
      if (question && answer) {
        logDebug(`✅ EXTRACTED Q&A from dash pattern in filename: Q: "${question}", A: "${answer}"`, 1);
        return {
          question: question.endsWith('?') ? question : question + '?',
          answer: answer.endsWith('.') ? answer : answer + '.',
          generatedBy: 'filename-extraction'
        };
      }
    }
    
    // NO MATCH FOUND - Leave blank as requested
    logDebug(`No match found for: ${filename} - leaving blank`, 1);
    return undefined;
  }, [mappings, normalizedBookId]);

  return { mappings, isLoading, error, findMatchingQA };
}

