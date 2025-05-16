/**
 * Resource Registry
 * 
 * This module provides a centralized mapping of book/unit combinations to resource files.
 * It allows for lazy-loading resources based on book and unit selection.
 */

import { BookId, UnitId } from '@/types/content';
import { TeacherResource } from '@/types/resources';

// Helper types
type ResourceLoader = () => Promise<TeacherResource[]>;
type ResourceMap = Record<string, Record<string, ResourceLoader>>;

// Version constants for multi-version units
export const SPORTS_VERSION = 'sports';
export const CHORES_VERSION = 'chores';

// Registry for resource loaders
const resourceRegistry: ResourceMap = {};

/**
 * Registers a resource loader for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @param loader Function that loads the resources
 */
export function registerResourceLoader(
  bookId: BookId,
  unitId: UnitId,
  loader: ResourceLoader
): void {
  if (!resourceRegistry[bookId]) {
    resourceRegistry[bookId] = {};
  }
  
  resourceRegistry[bookId][unitId] = loader;
}

/**
 * Gets a resource loader for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns The resource loader or undefined if not found
 */
export function getResourceLoader(
  bookId: BookId,
  unitId: UnitId
): ResourceLoader | undefined {
  return resourceRegistry[bookId]?.[unitId];
}

/**
 * Loads resources for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Promise resolving to the resources or undefined if not found
 */
export async function loadResources(
  bookId: BookId,
  unitId: UnitId
): Promise<TeacherResource[] | undefined> {
  const loader = getResourceLoader(bookId, unitId);
  
  if (loader) {
    try {
      return await loader();
    } catch (error) {
      console.error(`Error loading resources for Book ${bookId} Unit ${unitId}:`, error);
      return [];
    }
  }
  
  return undefined;
}

/**
 * Checks if resources are available for a specific book and unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns True if resources are available
 */
export function hasResources(bookId: BookId, unitId: UnitId): boolean {
  return !!getResourceLoader(bookId, unitId);
}

/**
 * Gets all book IDs that have registered resources
 * 
 * @returns Array of book IDs
 */
export function getRegisteredBookIds(): BookId[] {
  return Object.keys(resourceRegistry) as BookId[];
}

/**
 * Gets all unit IDs that have registered resources for a specific book
 * 
 * @param bookId The book ID
 * @returns Array of unit IDs or empty array if book not found
 */
export function getRegisteredUnitIds(bookId: BookId): UnitId[] {
  if (!resourceRegistry[bookId]) {
    return [];
  }
  
  return Object.keys(resourceRegistry[bookId]) as UnitId[];
}

/**
 * Special handler for Book 3 Unit 16 which has different versions
 * 
 * @param version The version to load (sports or chores)
 * @returns Promise resolving to the resources
 */
export async function getBook3Unit16Resources(version: string = SPORTS_VERSION): Promise<TeacherResource[]> {
  try {
    if (version === SPORTS_VERSION) {
      const { sportsVersionResources, commonResources } = await import('@/data/book3-unit16');
      return [...commonResources, ...sportsVersionResources];
    } else if (version === CHORES_VERSION) {
      const { choresVersionResources, commonResources } = await import('@/data/book3-unit16');
      return [...commonResources, ...choresVersionResources];
    }
    
    return [];
  } catch (error) {
    console.error('Error loading Book 3 Unit 16 resources:', error);
    return [];
  }
}

// Register commonly used book/unit combinations
// These will be expanded based on actual application data
// Example registrations:
registerResourceLoader('1', '1', async () => {
  const { default: resources } = await import('@/data/book1-unit1-resources');
  return resources;
});

registerResourceLoader('3', '16', async () => {
  // Special case for Book 3 Unit 16 with multiple versions
  return getBook3Unit16Resources();
});