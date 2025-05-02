/**
 * Resources for Book 6 Unit 11 - Extreme Sports
 */
import { TeacherResource, LessonPlan } from '@/components/TeacherResources';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 11
 * This uses the centralized resource management approach
 */
export function getBook6Unit11Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
