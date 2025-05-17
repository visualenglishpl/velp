/**
 * useTeacherResources Hook
 * 
 * This hook provides access to teacher resources for a specific book and unit,
 * with filtering and state management capabilities.
 */

import { useState, useEffect, useCallback } from 'react';
import { BookId, UnitId } from '@/types/content';
import { TeacherResource, ResourceType, ResourceFilter, ResourceFilterType } from '@/types/TeacherResource';
import { loadResources } from '@/lib/resourceRegistry';

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
}

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
        // Special case for Book 1 Unit 1
        if (bookId === '1' && unitId === '1') {
          console.log('Special case: Using hardcoded resources for Book 1 Unit 1');
          
          const book1Unit1Resources: TeacherResource[] = [
            // Video Resources
            {
              id: 'b1u1-video-1',
              title: 'Good Morning PINKFONG',
              description: 'Good Morning song by PINKFONG - Visual English Book 1 Unit 1',
              resourceType: 'video',
              bookId: '1',
              unitId: '1',
              provider: 'YouTube',
              sourceUrl: 'https://www.youtube.com/embed/7CuZr1Dz3sk',
              embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
              isYoutubeVideo: true
            },
            {
              id: 'b1u1-video-2',
              title: 'Good Morning, Good Night LITTLE FOX',
              description: 'Good Morning, Good Night by LITTLE FOX - Visual English Book 1 Unit 1',
              resourceType: 'video',
              bookId: '1',
              unitId: '1',
              provider: 'YouTube',
              sourceUrl: 'https://www.youtube.com/embed/7CuZr1Dz3sk',
              embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
              isYoutubeVideo: true
            },
            {
              id: 'b1u1-video-3',
              title: 'The Greetings Song MAPLE LEAF',
              description: 'The Greetings Song by MAPLE LEAF - Visual English Book 1 Unit 1',
              resourceType: 'video',
              bookId: '1',
              unitId: '1',
              provider: 'YouTube',
              sourceUrl: 'https://www.youtube.com/embed/gVIFEVLzP4o',
              embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
              isYoutubeVideo: true
            },
            // Game Resources
            {
              id: 'b1u1-game-1',
              title: 'WORDWALL - GREETINGS',
              description: 'Greetings Matching - Interactive activity for Unit 1',
              resourceType: 'game',
              bookId: '1',
              unitId: '1',
              provider: 'Wordwall',
              sourceUrl: 'https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2',
              embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
              isWordwallGame: true
            },
            {
              id: 'b1u1-game-2',
              title: 'WORDWALL - TIMES OF THE DAY',
              description: 'Times of the Day Matching - Interactive activity for Unit 1',
              resourceType: 'game',
              bookId: '1',
              unitId: '1',
              provider: 'Wordwall',
              sourceUrl: 'https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d',
              embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
              isWordwallGame: true
            },
            // PDF Resource
            {
              id: 'b1u1-pdf-1',
              title: 'Unit 1: Hello - PDF',
              description: 'PDF lesson materials for Unit 1',
              resourceType: 'pdf',
              bookId: '1',
              unitId: '1',
              provider: 'Visual English',
              sourceUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf',
              pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf'
            },
            // Lesson Plan
            {
              id: 'b1u1-lesson-1',
              title: 'Greetings Lesson Plan',
              description: 'Learn basic greetings in English',
              resourceType: 'lessonPlan',
              bookId: '1',
              unitId: '1',
              provider: 'Visual English',
              content: {
                type: 'lesson-plan',
              },
              lessonPlan: {
                id: 'book1-unit1-lesson-1',
                title: 'Greetings Lesson Plan',
                duration: "45 minutes",
                level: "Beginner",
                objectives: ["Learn basic greetings in English"],
                materials: ["Visual English Book 1 digital or printed materials", "Interactive whiteboard or projector", "Optional: flashcards, props"],
                warmUp: "Use greetings with each student. Practice saying hello and goodbye.",
                mainActivities: ["Introduce greetings vocabulary", "Practice dialogues with partners", "Role-play different greeting scenarios"],
                assessment: "Monitor student participation and correct pronunciation.",
                extension: "Create greeting cards or role-play additional scenarios.",
                type: 'main'
              }
            }
          ];
          
          console.log(`Successfully loaded ${book1Unit1Resources.length} hardcoded resources for Book 1 Unit 1`);
          setResources(book1Unit1Resources);
          return;
        }
        
        // Regular handling for other units
        const loadedResources = await loadResources(bookId, unitId);
        let filteredResources = loadedResources || [];
        
        // Ensure we have resources even if loadResources returns undefined
        if (!filteredResources || filteredResources.length === 0) {
          console.warn(`No resources found for Book ${bookId} Unit ${unitId}, using fallbacks.`);
          
          // For Book 1, try to get PDF resources from the global collection
          if (bookId === '1') {
            import('@/data/book1-pdf-resources')
              .then(module => {
                if (module.book1PdfResourcesByUnit && module.book1PdfResourcesByUnit[unitId]) {
                  const pdfResources = module.book1PdfResourcesByUnit[unitId];
                  setResources(prevResources => [...prevResources, ...pdfResources]);
                }
              })
              .catch(err => console.error('Error loading PDF resources:', err));
            
            // Also try to get lesson plans
            import('@/data/book1-lesson-plans')
              .then(module => {
                if (module.book1LessonPlansByUnit && module.book1LessonPlansByUnit[unitId]) {
                  const lessonPlans = module.book1LessonPlansByUnit[unitId];
                  setResources(prevResources => [...prevResources, ...lessonPlans]);
                }
              })
              .catch(err => console.error('Error loading lesson plans:', err));
          }
        }
        
        setResources(filteredResources);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError(err instanceof Error ? err : new Error('Failed to load resources'));
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchResources();
  }, [bookId, unitId]);
  
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
      const descMatch = resource.description ? resource.description.toLowerCase().includes(searchLower) : false;
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
  const setResourceTypeFilter = useCallback((type: ResourceFilterType) => {
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
    addResource
  };
}