import { TeacherResource } from '@/components/TeacherResources';
import { BOOK6_UNIT_TITLES, generateBook6UnitResources } from './book6-resources-common';

/**
 * Generate resources specific to Book 6 Unit 15 (Are You A Survivor)
 * This extends the common resources with additional specific content
 */
export function generateBook6Unit15Resources(bookId: string): TeacherResource[] {
  // Get the standard resources first
  const resources = generateBook6UnitResources(bookId, '15');
  
  return resources;
}
