import { useState, useEffect, useCallback } from 'react';
import { getQuestionAnswer } from '@/lib/qa-pattern-engine';
import { findPatternMatch } from '@/lib/patternSystem';

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
    // Debug level: 0=none, 1=important, 2=details
    const debugLevel = 1;
    
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
      logDebug(`No mappings available for ${normalizedBookId}, using pattern engine for ${filename} in ${currentUnitId}`);
      return getQuestionAnswer(filename, currentUnitId, normalizedBookId);
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
    
    // STRATEGY 1: Direct exact match with the cleaned filename
    if (filteredMappings[cleanedFilename]) {
      logDebug(`✅ FOUND MATCH (direct filename) for: ${cleanedFilename}`, 1);
      return filteredMappings[cleanedFilename];
    }
    
    // STRATEGY 2: Try with the original filename (legacy support)
    if (filteredMappings[filename]) {
      logDebug(`✅ FOUND MATCH (original filename) for: ${filename}`, 1);
      return filteredMappings[filename];
    }
    
    // STRATEGY 3: Try with just the filename without path or extension
    const filenameOnly = filename.split('/').pop() || filename;
    if (filteredMappings[filenameOnly]) {
      logDebug(`✅ FOUND MATCH (filename only) for: ${filenameOnly}`, 1);
      return filteredMappings[filenameOnly];
    }

    // STRATEGY 3.5: Try case-insensitive exact matches
    const lowerCleanedFilename = cleanedFilename.toLowerCase();
    for (const [key, qa] of Object.entries(filteredMappings)) {
      if (key.toLowerCase() === lowerCleanedFilename) {
        logDebug(`✅ FOUND MATCH (case-insensitive) for: ${cleanedFilename}`, 1);
        return qa;
      }
    }
    
    // STRATEGY 3.6: Try matching by extracting just the question part and comparing
    // Handle filenames like "01 I A What Do You Say in the Morning – Good Morning"
    const questionMatch = cleanedFilename.match(/^(\d+\s+[A-Z]+\s+[A-Z]+\s+)(.+?)(\s+–\s+.+)?$/i);
    if (questionMatch) {
      const codePrefix = questionMatch[1].trim(); // "01 I A"
      const questionPart = questionMatch[2].trim(); // "What Do You Say in the Morning"
      
      logDebug(`Extracted from filename: code="${codePrefix}", question="${questionPart}"`, 2);
      
      // Try to find a match with similar question content
      for (const [key, qa] of Object.entries(filteredMappings)) {
        if (key.toLowerCase().includes(questionPart.toLowerCase()) || 
            qa.question?.toLowerCase().includes(questionPart.toLowerCase())) {
          logDebug(`✅ FOUND MATCH (question content) for: ${cleanedFilename}`, 1);
          return qa;
        }
      }
    }

    // STRATEGY 3.7: Enhanced pattern matching for Book 1 Unit 1 specific issues
    // Map specific problematic filenames to their correct Q&A
    const specificMappings: Record<string, string> = {
      // Slide 5 mapping
      "05 C Draw the Sun or the Moon": "01 A What do you say in the morning",
      "05 c draw the sun or the moon": "01 A What do you say in the morning",
      // Slide 10 mapping
      "10 A Online Game Wordwall – Greetings": "01 E What do you drink in the morning", 
      "10 a online game wordwall – greetings": "01 E What do you drink in the morning",
      // Slide 11 mapping
      "10 C B Online Game Wordwall – Times of the Day": "01 F What do you eat in the morning",
      "10 c b online game wordwall – times of the day": "01 F What do you eat in the morning"
    };

    const specificKey = specificMappings[cleanedFilename] || specificMappings[cleanedFilename.toLowerCase()];
    if (specificKey && filteredMappings[specificKey]) {
      logDebug(`✅ FOUND MATCH (specific mapping) for: ${cleanedFilename} -> ${specificKey}`, 1);
      return filteredMappings[specificKey];
    }

    // STRATEGY 3: Try exact match with dash pattern in filename
    // Example: "What is it - It is a pencil" pattern
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

    // STRATEGY 4: Extract and try to match a code pattern 
    const codePattern = extractCodePatternFromFilename(filename);
    if (codePattern) {
      logDebug(`Extracted code pattern: "${codePattern}" from filename`, 2);
      
      // Direct match with code pattern
      if (filteredMappings[codePattern]) {
        logDebug(`✅ FOUND MATCH (exact code pattern) for: ${filename}`, 1);
        return filteredMappings[codePattern];
      }
      
      // STRATEGY 5: Try to match with just the main section (e.g., "01 N" from "01 N A")
      const mainSection = codePattern.split(' ').slice(0, 2).join(' ');
      
      // Direct match for main section code
      const mainSectionKey = Object.keys(filteredMappings).find(key => key === mainSection);
      if (mainSectionKey) {
        logDebug(`✅ FOUND MATCH (main section code) for: ${mainSection}`, 1);
        return filteredMappings[mainSectionKey];
      }
      
      // STRATEGY 6: Find entries that contain the main section in their pattern
      const matchingEntries = Object.entries(filteredMappings).filter(([_, value]) => {
        if (value.codePattern) {
          return value.codePattern.startsWith(mainSection) || 
                 value.codePattern.includes(mainSection);
        }
        return false;
      });
      
      if (matchingEntries.length > 0) {
        // Log the matching entries' patterns
        logDebug(`Entries matched with main section "${mainSection}": ${matchingEntries.map(([_, value]) => value.codePattern).join(', ')}`, 2);
        
        // Use the first match
        logDebug(`✅ FOUND MATCH (section-based) for: ${filename}`, 1);
        return matchingEntries[0][1];
      } else {
        logDebug(`No entries matched the code pattern "${codePattern}"`, 2);
      }
      
      // STRATEGY 7: Number pattern match (e.g., "12 K" to match with "12")
      const numericSection = codePattern.split(' ')[0]; // Get just the number
      if (numericSection && /^\d+$/.test(numericSection)) {
        const numericMatches = Object.entries(filteredMappings).filter(([_, value]) => {
          if (value.codePattern) {
            return value.codePattern.startsWith(numericSection + ' ');
          }
          return false;
        });
        
        if (numericMatches.length > 0) {
          logDebug(`✅ FOUND MATCH (numeric section) for: ${numericSection}`, 1);
          return numericMatches[0][1];
        }
      }
    }
    
    // NO FALLBACK: Only use Excel data, return undefined if no match found
    logDebug(`❌ No Excel match found for: ${filename}`, 1);
    return undefined;
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
  
  // Pattern: Try exact 2-character pattern first "01 C" (most common in Excel)
  const simplePattern = filenameWithoutExt.match(/^(\d{2})\s*([A-Za-z])(?:\s|$)/);
  if (simplePattern) {
    const pattern = `${simplePattern[1]} ${simplePattern[2].toUpperCase()}`;
    console.log(`DEBUG: Extracted 2-char pattern: "${pattern}"`);
    return pattern;
  }
  
  // Pattern: Extended 3-character pattern "01 N A" (fallback for specific cases)
  const standardPattern = filenameWithoutExt.match(/^(\d{2})\s*([A-Za-z])\s*([A-Za-z])/);
  if (standardPattern) {
    const pattern = `${standardPattern[1]} ${standardPattern[2].toUpperCase()} ${standardPattern[3].toUpperCase()}`;
    console.log(`DEBUG: Extracted 3-char pattern: "${pattern}"`);
    return pattern;
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