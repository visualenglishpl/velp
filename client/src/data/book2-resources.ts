/**
 * Export all Book 2 resources
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES, generateBook2UnitResources } from './book2-resources-common';

// Import individual unit resources
import book2Unit1Resources from './book2-unit1-resources';
import book2Unit2Resources from './book2-unit2-resources';

// Create a mapping of all available resources by unit
export const book2ResourcesByUnit: Record<string, TeacherResource[]> = {
  '1': book2Unit1Resources,
  '2': book2Unit2Resources,
};

// For additional units (3-18), we need to create similar resource files as units 1 and 2,
// and add them to the mapping above.

// Function to get resources for a specific unit, or generate default ones if not available
export function getBook2UnitResources(unitId: string): TeacherResource[] {
  if (book2ResourcesByUnit[unitId]) {
    return book2ResourcesByUnit[unitId];
  }
  
  // If no specific resources are available, generate default ones
  return generateBook2UnitResources(unitId);
}

// Export constants and individual unit resources
export {
  BOOK2_TITLE,
  BOOK2_UNIT_TITLES,
  book2Unit1Resources,
  book2Unit2Resources,
};
