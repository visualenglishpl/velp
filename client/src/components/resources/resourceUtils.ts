/**
 * Resource Utils - Helper functions for fetching and managing teacher resources
 */
import { TeacherResource } from '@/types/TeacherResource';
import { book1Unit1Resources } from '@/data/book1-unit1-resources';
import { book1Unit2Resources } from '@/data/book1-unit2-resources';
import { book1Unit3Resources } from '@/data/book1-unit3-resources';

// Mapping of resource getters by book and unit
const resourceGetters: Record<string, Record<string, TeacherResource[]>> = {
  '1': {
    '1': book1Unit1Resources || [],
    '2': book1Unit2Resources || [],
    '3': book1Unit3Resources || [],
  }
};

/**
 * Fetch all teacher resources for a specific book and unit
 */
export function fetchTeacherResources(bookId: string, unitId: string) {
  const resources = resourceGetters[bookId]?.[unitId] || [];
  
  return {
    videoResources: fetchVideoResources(bookId, unitId),
    wordwallGames: fetchWordwallGames(bookId, unitId),
    pdfResources: fetchPdfResources(bookId, unitId),
    lessonPlans: fetchLessonPlans(bookId, unitId),
  };
}

/**
 * Fetch video resources for a specific book and unit
 */
export function fetchVideoResources(bookId: string, unitId: string): TeacherResource[] {
  const resources = resourceGetters[bookId]?.[unitId] || [];
  return resources.filter(resource => resource.resourceType === 'video');
}

/**
 * Fetch Wordwall games for a specific book and unit
 */
export function fetchWordwallGames(bookId: string, unitId: string): TeacherResource[] {
  const resources = resourceGetters[bookId]?.[unitId] || [];
  return resources.filter(resource => 
    resource.resourceType === 'game' && 
    (resource.provider === 'Wordwall' || 
     (resource as any).embedUrl?.includes('wordwall.net'))
  );
}

/**
 * Fetch PDF resources for a specific book and unit
 */
export function fetchPdfResources(bookId: string, unitId: string): TeacherResource[] {
  const resources = resourceGetters[bookId]?.[unitId] || [];
  return resources.filter(resource => resource.resourceType === 'pdf');
}

/**
 * Fetch lesson plans for a specific book and unit
 */
export function fetchLessonPlans(bookId: string, unitId: string): TeacherResource[] {
  const resources = resourceGetters[bookId]?.[unitId] || [];
  return resources.filter(resource => resource.resourceType === 'lessonPlan' || resource.resourceType === 'lesson');
}