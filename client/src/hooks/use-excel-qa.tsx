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
    const debugLevel = 2;
    
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
    
    // STRATEGY 8: Try any keyword match based on the content
    // Important patterns to look for
    const contentKeywords = [
      // Book 1 Unit 2 (School Objects)
      { keyword: 'scissors', question: "What are they?", answer: "They are scissors." },
      { keyword: 'pencil', question: "What is it?", answer: "It is a pencil." },
      { keyword: 'ruler', question: "What is it?", answer: "It is a ruler." },
      { keyword: 'sharpener', question: "What is it?", answer: "It is a sharpener." },
      { keyword: 'pen', question: "What is it?", answer: "It is a pen." },
      { keyword: 'book', question: "What is it?", answer: "It is a book." },
      { keyword: 'notebook', question: "What is it?", answer: "It is a notebook." },
      { keyword: 'eraser', question: "What is it?", answer: "It is an eraser." },
      { keyword: 'pencil case', question: "What is it?", answer: "It is a pencil case." },
      { keyword: 'school bag', question: "What is it?", answer: "It is a school bag." },
      { keyword: 'lego pen', question: "Do you have a Lego pen?", answer: "Yes, I have a Lego pen." },
      { keyword: 'black pen', question: "Do you have a black pen?", answer: "Yes, I have a black pen." }
    ];
    
    for (const {keyword, question, answer} of contentKeywords) {
      if (filename.toLowerCase().includes(keyword)) {
        logDebug(`✅ FOUND MATCH (keyword: ${keyword}) for: ${filename}`, 1);
        return { question, answer, generatedBy: 'keyword-match' };
      }
    }

    // STRATEGY 9: For images with section codes like "01 R" (country images), generate specific questions
    const sectionMatch = filename.match(/^(\d{2})\s*([A-Za-z])/i);
    if (sectionMatch) {
      const sectionNum = sectionMatch[1];
      const sectionCode = sectionMatch[2].toUpperCase();
      
      if (sectionCode === 'R' || filename.toLowerCase().includes('poland')) {
        logDebug(`✅ FOUND MATCH (R section - Poland) for: ${filename}`, 1);
        return {
          question: "What country is this?",
          answer: "It is Poland.",
          generatedBy: 'section-code-match'
        };
      } else if (sectionCode === 'N' || filename.toLowerCase().includes('britain') || filename.toLowerCase().includes('uk')) {
        logDebug(`✅ FOUND MATCH (N section - Britain/UK) for: ${filename}`, 1);
        return {
          question: "What country is this?", 
          answer: "It is Britain/UK.",
          generatedBy: 'section-code-match'
        };
      }
    }

    // Try our new modular pattern system first
    try {
      const patternMatch = findPatternMatch(filename, currentUnitId);
      if (patternMatch) {
        logDebug(`✅ PATTERN SYSTEM: Found match in modular pattern system for ${filename}`, 1);
        return {
          question: patternMatch.question,
          answer: patternMatch.answer,
          generatedBy: 'pattern-system',
          source: patternMatch.source || patternMatch.category
        };
      }
    } catch (error) {
      console.error("Pattern system error:", error);
      // Continue to legacy pattern engine if pattern system fails
    }
    
    // FALLBACK: Use the legacy pattern engine to generate a question based on the content
    logDebug(`⚠️ Using fallback pattern engine for: ${filename}`, 1);
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