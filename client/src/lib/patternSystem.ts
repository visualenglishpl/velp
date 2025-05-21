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
export function findPatternMatch(filename: string, unitId: string = ''): PatternMatch | null {
  const cleanedFilename = filename.toLowerCase();
  
  // Helper function to check if a pattern should be applied based on unitId
  const shouldApplyPattern = (pattern: Pattern) => {
    // If no unitId provided, apply all patterns
    if (!unitId) return true;
    
    // Handle unitId which might include "unit" prefix
    const normalizedUnitId = unitId.replace(/^unit/i, '');
    
    // Book 1, Unit 2 - special handling for school objects
    if (normalizedUnitId === '2' && pattern.category === 'school-objects') {
      return true;
    }
    
    // Book 1, Unit 3 - special handling for fruits and vegetables
    if (normalizedUnitId === '3' && (pattern.category === 'fruits' || pattern.category === 'vegetables')) {
      return true;
    }
    
    // Unit prefix matching (e.g., unit2-pens)
    if (pattern.category.includes(`unit${normalizedUnitId}`) || 
        pattern.category.includes(`book1-unit${normalizedUnitId}`)) {
      return true;
    }
    
    // Generic patterns should apply to all units
    if (pattern.category === 'generic') {
      return true;
    }
    
    // By default, don't apply unit-specific patterns to other units
    return false;
  };
  
  // Search through all collections and patterns for a match
  for (const collection of registeredCollections) {
    for (const pattern of collection.patterns) {
      if (!shouldApplyPattern(pattern)) continue;
      
      if (pattern.regex.test(cleanedFilename)) {
        // Handle direct patterns
        if ('question' in pattern && 'answer' in pattern) {
          return {
            question: pattern.question,
            answer: pattern.answer,
            category: pattern.category
          };
        }
        
        // Handle template patterns (not implemented yet, for future extension)
        if ('questionTemplate' in pattern && 'answerTemplate' in pattern) {
          // TODO: Implement template pattern matching
          // This would extract values from regex groups and substitute them in templates
          console.warn('Template pattern matching not yet implemented');
        }
      }
    }
  }
  
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