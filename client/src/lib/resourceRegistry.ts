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

// Register commonly used book/unit combinations
// These will be expanded based on actual application data

// Book 1, Unit 1 (Greetings)
registerResourceLoader('1', '1', async () => {
  const { default: resources } = await import('@/data/book1-unit1-resources');
  return resources;
});

// Book 1, Unit 2 (School Objects)
registerResourceLoader('1', '2', async () => {
  const { default: resources } = await import('@/data/book1-unit2-resources');
  return resources;
});

// Book 1, Unit 3 (Classroom Rules)
registerResourceLoader('1', '3', async () => {
  const { default: resources } = await import('@/data/book1-unit3-resources');
  return resources;
});

// Book 1, Unit 4 (How Are You?)
registerResourceLoader('1', '4', async () => {
  const { default: resources } = await import('@/data/book1-unit4-resources');
  return resources;
});

// Book 1, Unit 5 (My Family)
registerResourceLoader('1', '5', async () => {
  const { default: resources } = await import('@/data/book1-unit5-resources');
  return resources;
});

// Book 1, Unit 6 (My Favourite Colour)
registerResourceLoader('1', '6', async () => {
  const { default: resources } = await import('@/data/book1-unit6-resources');
  return resources;
});

// Book 1, Unit 7 (How Old Are You?)
registerResourceLoader('1', '7', async () => {
  const { default: resources } = await import('@/data/book1-unit7-resources');
  return resources;
});

// Book 1, Unit 8 (Shapes)
registerResourceLoader('1', '8', async () => {
  const { default: resources } = await import('@/data/book1-unit8-resources');
  return resources;
});

// Book 1, Unit 11 (Seasons of the Year)
registerResourceLoader('1', '11', async () => {
  const { default: resources } = await import('@/data/book1-unit11-resources');
  return resources;
});

// Book 1, Unit 15 (Fruit)
registerResourceLoader('1', '15', async () => {
  const { default: resources } = await import('@/data/book1-unit15-resources');
  return resources;
});

// Book 1, Unit 17 (How Is The Weather?)
registerResourceLoader('1', '17', async () => {
  const { default: resources } = await import('@/data/book1-unit17-resources');
  return resources;
});

// Book 1, Unit 18 (What Can You Do?)
registerResourceLoader('1', '18', async () => {
  const { default: resources } = await import('@/data/book1-unit18-resources');
  return resources;
});

// Book 3, Unit 16 (Sports)
registerResourceLoader('3', '16', async () => {
  const { sportsResources } = await import('@/data/book3-unit16');
  return sportsResources;
});

// Book 3, Unit 17 (Household Chores)
registerResourceLoader('3', '17', async () => {
  const { choresResources } = await import('@/data/book3-unit17');
  return choresResources;
});