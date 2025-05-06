/**
 * Type definitions for book content data model
 */

/**
 * BookUnit represents a unit of content within a book
 */
export interface BookUnit {
  id: string;
  bookId: string;
  title: string;
  description: string;
  tags: string[];
}

/**
 * BookContent represents the full content of a book including units
 */
export interface BookContent {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  units: BookUnit[];
}

/**
 * BookContentAccess represents a user's access level to a book
 */
export interface BookContentAccess {
  bookId: string;
  accessLevel: 'full' | 'preview' | 'none';
  expiresAt?: Date;
}
