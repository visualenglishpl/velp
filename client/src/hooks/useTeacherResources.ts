/**
 * useTeacherResources Hook
 * 
 * This hook abstracts the loading and management of teacher resources for a specific book and unit.
 * It supports special cases like Book 3 Unit 16 with multiple versions (sports/chores).
 */

import { useState, useEffect, useCallback } from 'react';
import { TeacherResource } from '@/types/resources';
import { BookId, UnitId } from '@/types/content';
import { 
  loadResources, 
  hasResources,
  getRegisteredBookIds, 
  getRegisteredUnitIds,
  SPORTS_VERSION,
  CHORES_VERSION
} from '@/lib/resourceRegistry';

// Type for unit version selection
export type UnitVersion = typeof SPORTS_VERSION | typeof CHORES_VERSION | undefined;

// Type for hook return value
interface UseTeacherResourcesReturn {
  resources: TeacherResource[];
  loading: boolean;
  error: Error | null;
  filteredResources: (type: string) => TeacherResource[];
  hasResourceType: (type: string) => boolean;
  reload: () => Promise<void>;
  availableBooks: BookId[];
  availableUnits: UnitId[];
}

/**
 * Hook to load and manage teacher resources
 * 
 * @param bookId The selected book ID
 * @param unitId The selected unit ID
 * @param version Optional version for multi-version units
 * @returns Object with resources and helper functions
 */
export function useTeacherResources(
  bookId: BookId | undefined,
  unitId: UnitId | undefined,
  version: UnitVersion = undefined
): UseTeacherResourcesReturn {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Get all available books with resources
  const availableBooks = getRegisteredBookIds();
  
  // Get all available units for the selected book
  const availableUnits = bookId ? getRegisteredUnitIds(bookId) : [];

  /**
   * Filter resources by type
   * 
   * @param type Resource type to filter by
   * @returns Filtered resources
   */
  const filteredResources = useCallback((type: string): TeacherResource[] => {
    return resources.filter(resource => resource.resourceType === type);
  }, [resources]);

  /**
   * Check if resources of a specific type exist
   * 
   * @param type Resource type to check
   * @returns True if resources of that type exist
   */
  const hasResourceType = useCallback((type: string): boolean => {
    return resources.some(resource => resource.resourceType === type);
  }, [resources]);

  /**
   * Load resources for the selected book and unit
   */
  const loadResourcesForBookUnit = useCallback(async () => {
    // Clear resources if no book or unit selected
    if (!bookId || !unitId) {
      setResources([]);
      return;
    }
    
    // Check if resources are available
    if (!hasResources(bookId, unitId)) {
      setResources([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Book 3 Unit 16 is special case with multiple versions
      const loadedResources = await loadResources(bookId, unitId) || [];
      setResources(loadedResources);
    } catch (err) {
      console.error('Error loading teacher resources:', err);
      setError(err as Error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [bookId, unitId, version]);

  /**
   * Reload resources
   */
  const reload = useCallback(async () => {
    await loadResourcesForBookUnit();
  }, [loadResourcesForBookUnit]);

  // Load resources when book, unit, or version changes
  useEffect(() => {
    loadResourcesForBookUnit();
  }, [loadResourcesForBookUnit]);

  return {
    resources,
    loading,
    error,
    filteredResources,
    hasResourceType,
    reload,
    availableBooks,
    availableUnits
  };
}

/**
 * Check if a book/unit combination has multiple versions
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns True if the unit has multiple versions
 */
export function isMultiVersionUnit(bookId: BookId, unitId: UnitId): boolean {
  // Currently only Book 3 Unit 16 has multiple versions
  return bookId === '3' && unitId === '16';
}

/**
 * Get available versions for a multi-version unit
 * 
 * @param bookId The book ID
 * @param unitId The unit ID
 * @returns Array of available versions or empty array
 */
export function getMultiVersionOptions(bookId: BookId, unitId: UnitId): string[] {
  if (bookId === '3' && unitId === '16') {
    return [SPORTS_VERSION, CHORES_VERSION];
  }
  
  return [];
}