/**
 * Pattern System
 * 
 * This module serves as the integration layer between pattern definitions and the pattern engine.
 * It provides utilities for registering, managing, and matching patterns.
 */

import { patternCollections } from './patternRegistry';

export type PatternMatch = {
  question: string;
  answer: string;
  category: string;
  source?: string;
};

export type DirectPattern = {
  id: string;
  regex: RegExp;
  question: string;
  answer: string;
  category: string;
};

export type TemplatePattern = {
  id: string;
  regex: RegExp;
  questionTemplate: string;
  answerTemplate: string;
  category: string;
};

export type Pattern = DirectPattern | TemplatePattern;

export type PatternCollection = {
  id: string;
  description: string;
  patterns: Pattern[];
};

// Internal store for pattern collections
let registeredCollections: PatternCollection[] = [...patternCollections];

/**
 * Find a matching pattern for a given filename
 * @param filename The filename to match
 * @param unitId Optional unit ID to restrict search to specific unit patterns
 * @returns The matched pattern result or null if no match
 */
export function findPatternMatch(filename: string, unitId: string = '', debug: boolean = false): PatternMatch | null {
  const cleanedFilename = filename.toLowerCase();
  
  // Extract any book ID from the unitId if provided in format "book4-unit1"
  const unitBookMatch = unitId.match(/^book(\d+)[a-c]?-unit(\d+)$/i);
  const bookId = unitBookMatch ? unitBookMatch[1] : '1'; // Default to book 1 if not specified
  
  if (debug) {
    console.log(`DEBUG (Pattern System): Attempting to match "${filename}" for book ${bookId}, unit ${unitId}`);
  }
  
  // Helper function to check if a pattern should be applied based on unitId
  const shouldApplyPattern = (pattern: Pattern) => {
    // If no unitId provided, apply all patterns
    if (!unitId) return true;
    
    // Handle unitId which might include "unit" prefix
    const normalizedUnitId = unitId.replace(/^unit/i, '');
    
    // Category-specific mappings for units
    const unitCategoryMap: Record<string, string[]> = {
      '1': ['greetings', 'daily-routine'],                // Unit 1 - Time of day greetings
      '2': ['school-objects'],                           // Unit 2 - School objects
      '3': ['fruits', 'vegetables'],                     // Unit 3 - Fruits and vegetables
      '4': ['colors'],                                   // Unit 4 - Colors
      '5': ['family'],                                   // Unit 5 - Family
      '6': ['favorite-color'],                           // Unit 6 - My favorite color
      '7': ['animals'],                                  // Unit 7 - Animals
      '8': ['toys', 'plurals'],                          // Unit 8 - Toys
      '9': ['clothes'],                                  // Unit 9 - Clothes
      '10': ['food'],                                    // Unit 10 - Food
      '11': ['home', 'rooms', 'furniture'],              // Unit 11 - My home
      '12': ['daily-activities', 'routine'],             // Unit 12 - Daily activities
      '13': ['weather'],                                 // Unit 13 - Weather
      '14': ['sports', 'hobbies'],                       // Unit 14 - Sports and hobbies
      '15': ['places', 'prepositions'],                  // Unit 15 - Places
      '16': ['vehicles', 'transportation'],              // Unit 16 - Vehicles
      '17': ['world', 'countries'],                      // Unit 17 - Around the world
      '18': ['review']                                   // Unit 18 - Review
    };
    
    // Extract any book ID from the unitId if provided in format "book4-unit1"
    const bookMatch = unitId.match(/^book(\d+)[a-c]?-unit(\d+)$/i);
    const bookId = bookMatch ? bookMatch[1] : '1'; // Default to book 1 if not specified
    
    // Determine if pattern is meant for a particular book
    const patternBookMatch = 'id' in pattern && pattern.id.match(/^book(\d+)[a-c]?-unit/i);
    const patternBookId = patternBookMatch ? patternBookMatch[1] : '1';
    
    // If pattern is for a specific book different from current book context, don't apply
    if (patternBookMatch && patternBookId !== bookId) {
      return false;
    }
    
    // Technology patterns for Book 4 Unit 2
    if (bookId === '4' && normalizedUnitId === '2' && pattern.category === 'technology') {
      return true;
    }
    
    // Nationality patterns for Book 4 Unit 1
    if (bookId === '4' && normalizedUnitId === '1' && pattern.category === 'nationalities') {
      return true;
    }
    
    // Home patterns for Book 4 Unit 3
    if (bookId === '4' && normalizedUnitId === '3' && pattern.category === 'home') {
      return true;
    }
    
    // Body parts patterns for Book 4 Unit 4
    if (bookId === '4' && normalizedUnitId === '4' && pattern.category === 'body') {
      return true;
    }
    
    // Films/Movies patterns for Book 7 Unit 1
    if (bookId === '7' && normalizedUnitId === '1' && 
        (pattern.category === 'films' || pattern.category === 'film-crew')) {
      return true;
    }
    
    // Appearance/Piercings patterns for Book 7 Unit 2
    if (bookId === '7' && normalizedUnitId === '2' && 
        (pattern.category === 'piercings' || pattern.category === 'hairstyles')) {
      return true;
    }
    
    // Check if the pattern's category belongs to the current unit
    if (unitCategoryMap[normalizedUnitId] && 
        unitCategoryMap[normalizedUnitId].includes(pattern.category)) {
      return true;
    }
    
    // Unit prefix matching in pattern category
    if (pattern.category.includes(`unit${normalizedUnitId}`) || 
        pattern.category.includes(`book${bookId}-unit${normalizedUnitId}`)) {
      return true;
    }
    
    // Collection ID matching for book-specific unit patterns
    if ('id' in pattern && 
        (pattern.id.includes(`book${bookId}-unit${normalizedUnitId}`) ||
         pattern.id.includes(`unit${normalizedUnitId}`))) {
      return true;
    }
    
    // Generic patterns should apply to all units
    if (pattern.category === 'generic') {
      return true;
    }
    
    // Patterns with unitId tags matching the current unit
    const unitTagsMatch = (collection: PatternCollection) => {
      return collection.id.includes(`book1-unit${normalizedUnitId}`) || 
             collection.id.includes(`unit${normalizedUnitId}`);
    };
    
    // By default, don't apply unit-specific patterns to other units
    return false;
  };
  
  // Search through all collections and patterns for a match
  for (const collection of registeredCollections) {
    if (debug) {
      console.log(`[PATTERN SYSTEM] Checking collection: ${collection.id}`);
    }
    
    for (const pattern of collection.patterns) {
      if (!shouldApplyPattern(pattern)) {
        if (debug) {
          console.log(`[PATTERN SYSTEM] Skipping pattern: ${pattern.id} - not applicable to unit ${unitId}`);
        }
        continue;
      }
      
      if (debug) {
        console.log(`[PATTERN SYSTEM] Testing pattern: ${pattern.id} with regex: ${pattern.regex}`);
      }
      
      if (pattern.regex.test(cleanedFilename)) {
        if (debug) {
          console.log(`[PATTERN SYSTEM] ✅ MATCH FOUND! Pattern ${pattern.id} matched filename`);
        }
        
        // Handle direct patterns
        if ('question' in pattern && 'answer' in pattern) {
          return {
            question: pattern.question,
            answer: pattern.answer,
            category: pattern.category,
            source: `pattern-${collection.id}`
          };
        }
        
        // Handle template patterns (not implemented yet, for future extension)
        if ('questionTemplate' in pattern && 'answerTemplate' in pattern) {
          // TODO: Implement template pattern matching
          // This would extract values from regex groups and substitute them in templates
          console.warn('Template pattern matching not yet implemented');
        }
      } else {
        console.log(`  ❌ No match for pattern: ${pattern.id}`);
      }
    }
  }
  
  console.log(`No matching pattern found for: "${filename}"`);
  
  
  return null;
}

/**
 * Get all patterns for a specific unit or category
 * @param unitOrCategory The unit ID or category to filter by
 * @returns Array of matching patterns
 */
export function getPatternsForUnit(unitOrCategory: string): Pattern[] {
  const result: Pattern[] = [];
  
  for (const collection of registeredCollections) {
    for (const pattern of collection.patterns) {
      if (
        pattern.category === unitOrCategory || 
        pattern.category.startsWith(`unit${unitOrCategory}-`) ||
        collection.id.includes(`unit${unitOrCategory}`)
      ) {
        result.push(pattern);
      }
    }
  }
  
  return result;
}

/**
 * Add a new pattern to an existing collection
 * @param collectionId The collection ID to add the pattern to
 * @param pattern The pattern to add
 * @returns True if successfully added, false if collection not found
 */
export function addPattern(collectionId: string, pattern: Pattern): boolean {
  const collectionIndex = registeredCollections.findIndex(c => c.id === collectionId);
  if (collectionIndex === -1) return false;
  
  registeredCollections[collectionIndex].patterns.push(pattern);
  return true;
}

/**
 * Create a new pattern collection
 * @param collection The collection to add
 * @returns True if successfully added, false if collection with same ID already exists
 */
export function addPatternCollection(collection: PatternCollection): boolean {
  if (registeredCollections.some(c => c.id === collection.id)) return false;
  
  registeredCollections.push(collection);
  return true;
}

/**
 * Get a specific pattern collection by ID
 * @param collectionId The collection ID to retrieve
 * @returns The pattern collection or undefined if not found
 */
export function getPatternCollection(collectionId: string): PatternCollection | undefined {
  return registeredCollections.find(c => c.id === collectionId);
}

/**
 * Check if a filename matches any registered pattern
 * @param filename The filename to check
 * @returns True if the filename matches any pattern, false otherwise
 */
export function hasPatternMatch(filename: string): boolean {
  return findPatternMatch(filename) !== null;
}