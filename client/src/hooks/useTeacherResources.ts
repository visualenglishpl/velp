/**
 * useTeacherResources Hook
 * 
 * This hook provides access to teacher resources for a specific book and unit,
 * with filtering and state management capabilities.
 */

import { useState, useEffect, useCallback } from 'react';
import { BookId, UnitId } from '@/types/content';
import { TeacherResource, ResourceType, ResourceFilter } from '@/types/resources';
import { loadResources, SPORTS_VERSION, CHORES_VERSION } from '@/lib/resourceRegistry';

interface UseTeacherResourcesOptions {
  initialBookId?: BookId;
  initialUnitId?: UnitId;
  initialFilter?: ResourceFilter;
}

interface UseTeacherResourcesResult {
  resources: TeacherResource[];
  filteredResources: TeacherResource[];
  bookId: BookId | null;
  unitId: UnitId | null;
  setBookId: (bookId: BookId | null) => void;
  setUnitId: (unitId: UnitId | null) => void;
  isLoading: boolean;
  error: Error | null;
  filter: ResourceFilter;
  setFilter: (filter: ResourceFilter) => void;
  setResourceTypeFilter: (type: ResourceType | 'all') => void;
  setSearchQuery: (query: string) => void;
  getResourceById: (id: string) => TeacherResource | undefined;
  updateResource: (resource: TeacherResource) => void;
  removeResource: (id: string) => void;
  addResource: (resource: TeacherResource) => void;
  version: string | null;
  setVersion: (version: string) => void;
  hasMultipleVersions: boolean;
}

/**
 * Hook for working with teacher resources
 */
export function useTeacherResources({
  initialBookId = null,
  initialUnitId = null,
  initialFilter = { resourceType: 'all', searchQuery: '' }
}: UseTeacherResourcesOptions = {}): UseTeacherResourcesResult {
  // State for book and unit selection
  const [bookId, setBookId] = useState<BookId | null>(initialBookId);
  const [unitId, setUnitId] = useState<UnitId | null>(initialUnitId);
  
  // State for resource data
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<ResourceFilter>(initialFilter);
  
  // Special case for Book 3 Unit 16 with multiple versions
  const [version, setVersion] = useState<string | null>(null);
  const hasMultipleVersions = bookId === '3' && unitId === '16';
  
  // Fetch resources when book or unit changes
  useEffect(() => {
    async function fetchResources() {
      if (!bookId || !unitId) {
        setResources([]);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Special case for Book 3 Unit 16 with multiple versions
        if (bookId === '3' && unitId === '16') {
          if (!version) {
            setVersion(SPORTS_VERSION);
            return; // Wait for version to be set
          }
        }
        
        const loadedResources = await loadResources(bookId, unitId);
        setResources(loadedResources || []);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError(err instanceof Error ? err : new Error('Failed to load resources'));
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchResources();
  }, [bookId, unitId, version]);
  
  // Filter resources based on filter criteria
  const filteredResources = resources.filter(resource => {
    // Filter by resource type
    if (filter.resourceType && filter.resourceType !== 'all') {
      if (resource.resourceType !== filter.resourceType) {
        return false;
      }
    }
    
    // Filter by search query
    if (filter.searchQuery) {
      const searchLower = filter.searchQuery.toLowerCase();
      const titleMatch = resource.title.toLowerCase().includes(searchLower);
      const descMatch = resource.description.toLowerCase().includes(searchLower);
      const providerMatch = resource.provider?.toLowerCase().includes(searchLower) || false;
      
      if (!titleMatch && !descMatch && !providerMatch) {
        return false;
      }
    }
    
    // Filter by provider
    if (filter.provider) {
      if (resource.provider !== filter.provider) {
        return false;
      }
    }
    
    return true;
  });
  
  // Set resource type filter
  const setResourceTypeFilter = useCallback((type: ResourceType | 'all') => {
    setFilter(prev => ({ ...prev, resourceType: type }));
  }, []);
  
  // Set search query filter
  const setSearchQuery = useCallback((query: string) => {
    setFilter(prev => ({ ...prev, searchQuery: query }));
  }, []);
  
  // Get resource by ID
  const getResourceById = useCallback((id: string) => {
    return resources.find(resource => resource.id === id);
  }, [resources]);
  
  // Update resource
  const updateResource = useCallback((updatedResource: TeacherResource) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
  }, []);
  
  // Remove resource
  const removeResource = useCallback((id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  }, []);
  
  // Add resource
  const addResource = useCallback((newResource: TeacherResource) => {
    setResources(prev => [...prev, newResource]);
  }, []);
  
  return {
    resources,
    filteredResources,
    bookId,
    unitId,
    setBookId,
    setUnitId,
    isLoading,
    error,
    filter,
    setFilter,
    setResourceTypeFilter,
    setSearchQuery,
    getResourceById,
    updateResource,
    removeResource,
    addResource,
    version,
    setVersion,
    hasMultipleVersions
  };
}