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
  initialBookId?: BookId | undefined;
  initialUnitId?: UnitId | undefined;
  initialFilter?: ResourceFilter;
}

interface UseTeacherResourcesResult {
  resources: TeacherResource[];
  filteredResources: TeacherResource[];
  bookId: BookId | undefined;
  unitId: UnitId | undefined;
  setBookId: (bookId: BookId | undefined) => void;
  setUnitId: (unitId: UnitId | undefined) => void;
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

// Mock resources for demo/testing purposes
const mockResources: Record<string, TeacherResource[]> = {
  '1-1': [
    {
      id: '1',
      title: 'Good Morning PINKFONG',
      description: 'Cheerful morning greetings song for young learners',
      resourceType: 'video',
      bookId: '1' as BookId,
      unitId: '1' as UnitId,
      provider: 'PINKFONG',
      youtubeVideoId: 'CuI_p7a9VGs',
      isYoutubeVideo: true,
      sourceUrl: 'https://www.youtube.com/watch?v=CuI_p7a9VGs'
    },
    {
      id: '2',
      title: 'Good Morning, Good Night - LITTLE FOX',
      description: 'Animation showing morning and evening greetings',
      resourceType: 'video',
      bookId: '1' as BookId,
      unitId: '1' as UnitId,
      provider: 'Little Fox',
      youtubeVideoId: 'eUXkj6j6Ezw',
      isYoutubeVideo: true,
      sourceUrl: 'https://www.youtube.com/watch?v=eUXkj6j6Ezw'
    },
    {
      id: '3',
      title: 'Greetings Flashcards',
      description: 'Printable flashcards with common greetings',
      resourceType: 'pdf',
      bookId: '1' as BookId,
      unitId: '1' as UnitId,
      provider: 'Visual English Materials',
      pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book1/unit1/greetings_flashcards.pdf'
    }
  ],
  '3-16-sports': [
    {
      id: '4',
      title: 'Sports Vocabulary Flashcards',
      description: 'Printable flashcards with sports vocabulary',
      resourceType: 'pdf',
      bookId: '3' as BookId,
      unitId: '16' as UnitId,
      provider: 'Visual English Materials',
      pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/sports_flashcards.pdf'
    },
    {
      id: '5',
      title: 'Sports Activities - Interactive Game',
      description: 'Match sports with actions',
      resourceType: 'game',
      bookId: '3' as BookId,
      unitId: '16' as UnitId,
      provider: 'Wordwall',
      wordwallGameId: '16354982',
      isWordwallGame: true,
      sourceUrl: 'https://wordwall.net/resource/16354982/sports-activities'
    }
  ],
  '3-16-chores': [
    {
      id: '6',
      title: 'House Chores Vocabulary Flashcards',
      description: 'Printable flashcards with household chores vocabulary',
      resourceType: 'pdf',
      bookId: '3' as BookId,
      unitId: '16' as UnitId,
      provider: 'Visual English Materials',
      pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book3/unit16/household_chores_flashcards.pdf'
    },
    {
      id: '7',
      title: 'Household Chores - Interactive Game',
      description: 'Match chores with rooms in the house',
      resourceType: 'game',
      bookId: '3' as BookId,
      unitId: '16' as UnitId,
      provider: 'Wordwall',
      wordwallGameId: '9275631',
      isWordwallGame: true,
      sourceUrl: 'https://wordwall.net/resource/9275631/household-chores'
    }
  ]
};

/**
 * Hook for working with teacher resources
 */
export function useTeacherResources({
  initialBookId,
  initialUnitId,
  initialFilter = { resourceType: 'all', searchQuery: '' }
}: UseTeacherResourcesOptions = {}): UseTeacherResourcesResult {
  // State for book and unit selection
  const [bookId, setBookId] = useState<BookId | undefined>(initialBookId);
  const [unitId, setUnitId] = useState<UnitId | undefined>(initialUnitId);
  
  // State for resource data
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<ResourceFilter>(initialFilter);
  
  // Special case for Book 3 Unit 16 with multiple versions
  const [version, setVersion] = useState<string | null>(SPORTS_VERSION);
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
        // For demo, use mock resources instead of actual loading
        // This is temporary and will be replaced with actual loading in production
        if (bookId === '1' && unitId === '1') {
          setResources(mockResources['1-1']);
        } else if (bookId === '3' && unitId === '16') {
          if (version === SPORTS_VERSION) {
            setResources(mockResources['3-16-sports']);
          } else {
            setResources(mockResources['3-16-chores']);
          }
        } else {
          // For other combinations, create empty array for demo
          setResources([]);
        }
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