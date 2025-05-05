/**
 * Lazy Resource Loader
 * 
 * This utility provides controlled lazy loading of resource files,
 * preventing the application from overwhelming the server with
 * too many simultaneous imports.
 */

import { TeacherResource } from '@/components/TeacherResources';

// Cache loaded resources to prevent duplicate loading
const resourceCache = new Map<string, TeacherResource[]>();

/**
 * Load resources for a specific book and unit
 * @param bookId Book ID (e.g., '4')
 * @param unitId Unit ID (e.g., '4')
 * @returns Promise resolving to an array of TeacherResource objects
 */
export async function loadUnitResources(bookId: string, unitId: string): Promise<TeacherResource[]> {
  const cacheKey = `book${bookId}-unit${unitId}`;
  
  // Return from cache if available
  if (resourceCache.has(cacheKey)) {
    console.log(`Loading ${cacheKey} resources from cache`);
    return resourceCache.get(cacheKey) || [];
  }
  
  try {
    console.log(`Dynamically loading ${cacheKey} resources...`);
    
    // Dynamically import the specific resource file
    const resourceModule = await import(`./book${bookId}-unit${unitId}-resources.tsx`);
    
    // Check if the module has a resources export
    if (resourceModule.resources) {
      // Store in cache for future use
      resourceCache.set(cacheKey, resourceModule.resources);
      return resourceModule.resources;
    }
    
    // If no resources export, try the book-specific resource array
    const legacyKey = `book${bookId}Unit${unitId}Resources`;
    if (resourceModule[legacyKey]) {
      // Store in cache for future use
      resourceCache.set(cacheKey, resourceModule[legacyKey]);
      return resourceModule[legacyKey];
    }
    
    // If the direct lookup fails, try to get the resources from the implementation file
    const implementationModule = await import(`./book${bookId}-unit${unitId}-implementation.tsx`);
    const getResourcesFunc = implementationModule[`getBook${bookId}Unit${unitId}Resources`];
    
    if (typeof getResourcesFunc === 'function') {
      const resources = getResourcesFunc();
      resourceCache.set(cacheKey, resources);
      return resources;
    }
    
    // If all attempts fail, return empty array
    console.warn(`Could not find resources for ${cacheKey}`);
    return [];
  } catch (err: any) {
    console.error(`Error loading resources for ${cacheKey}:`, err);
    return [];
  }
}

/**
 * Preload a specific unit's resources in the background
 * This can be called when navigating to improve performance
 */
export function preloadUnitResources(bookId: string, unitId: string): void {
  // Don't wait for the promise to resolve
  loadUnitResources(bookId, unitId)
    .then(resources => {
      console.log(`Preloaded ${resources.length} resources for book${bookId}-unit${unitId}`);
    })
    .catch(err => {
      console.error(`Error preloading resources:`, err);
    });
}

/**
 * Clear the resource cache to free memory
 */
export function clearResourceCache(): void {
  resourceCache.clear();
  console.log('Resource cache cleared');
}
