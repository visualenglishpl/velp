/**
 * Content Types
 * 
 * This module contains type definitions for content-related functionality
 */

/**
 * Book IDs supported by the system
 */
export type BookId = 
  | '0a' | '0b' | '0c'  // Starter books
  | '1' | '2' | '3'     // Elementary level
  | '4' | '5' | '6' | '7'; // Intermediate level

/**
 * Unit IDs (1-20)
 * Note: Books 0a/0b/0c have 20 units
 *       Books 1-3 have 18 units
 *       Books 4-7 have 16 units
 */
export type UnitId = 
  | '1' | '2' | '3' | '4' | '5' 
  | '6' | '7' | '8' | '9' | '10' 
  | '11' | '12' | '13' | '14' | '15' 
  | '16' | '17' | '18' | '19' | '20';

/**
 * Book information
 */
export interface Book {
  id: BookId;
  title: string;
  description: string;
  color: string;
  level: string;
  unitCount: number;
  thumbnail?: string;
}

/**
 * Unit information
 */
export interface Unit {
  id: UnitId;
  bookId: BookId;
  title: string;
  description: string;
  slideCount: number;
  hasResource: boolean;
}

/**
 * Content item in a unit (slide, question, etc.)
 */
export interface ContentItem {
  id: string;
  bookId: BookId;
  unitId: UnitId;
  filename: string;
  question?: string;
  answer?: string;
  index: number;
  category?: string;
  isPreview: boolean;
}