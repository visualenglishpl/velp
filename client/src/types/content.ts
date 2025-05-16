/**
 * Content Types
 * 
 * This file defines types related to content organization and structure.
 */

/**
 * Book ID type - limited to valid book numbers
 */
export type BookId = 
  '0a' | '0b' | '0c' | 
  '1' | '2' | '3' | '4' | 
  '5' | '6' | '7';

/**
 * Unit ID type - limited to valid unit numbers
 */
export type UnitId = 
  '1' | '2' | '3' | '4' | '5' | 
  '6' | '7' | '8' | '9' | '10' | 
  '11' | '12' | '13' | '14' | '15' | 
  '16' | '17' | '18' | '19' | '20';

/**
 * Book metadata information
 */
export interface BookMetadata {
  id: BookId;
  title: string;
  description?: string;
  unitCount: number;
  color: string;
  thumbnailUrl?: string;
}

/**
 * Unit metadata information
 */
export interface UnitMetadata {
  id: UnitId;
  bookId: BookId;
  title: string;
  description?: string;
  slideCount: number;
  hasMultipleVersions?: boolean;
  thumbnailUrl?: string;
}