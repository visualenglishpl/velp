/**
 * Export all Book 3 resources
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateBook3UnitResources } from './book3-resources-common';

// Import individual unit resources
import book3Unit1Resources from './book3-unit1-resources';
import book3Unit2Resources from './book3-unit2-resources';
import book3Unit3Resources from './book3-unit3-resources';
import book3Unit5Resources from './book3-unit5-resources';
import book3Unit6Resources from './book3-unit6-resources';
import book3Unit7Resources from './book3-unit7-resources';
import { book3Unit8Resources } from './book3-unit8-resources';
import { book3Unit10Resources } from './book3-unit10-resources';

// Create a mapping of all available resources by unit
export const book3ResourcesByUnit: Record<string, TeacherResource[]> = {
  '1': book3Unit1Resources,
  '2': book3Unit2Resources,
  '3': book3Unit3Resources,
  '5': book3Unit5Resources,
  '6': book3Unit6Resources,
  '7': book3Unit7Resources,
  '8': book3Unit8Resources,
  '10': book3Unit10Resources,
};

// Function to get resources for a specific unit, or generate default ones if not available
export function getBook3UnitResources(unitId: string): TeacherResource[] {
  if (book3ResourcesByUnit[unitId]) {
    return book3ResourcesByUnit[unitId];
  }
  
  // If no specific resources are available, generate default ones
  return generateBook3UnitResources('3', unitId);
}

// Export constants and individual unit resources
export {
  BOOK3_TITLE,
  BOOK3_UNIT_TITLES,
  book3Unit1Resources,
  book3Unit2Resources,
  book3Unit3Resources,
  book3Unit5Resources,
  book3Unit6Resources,
  book3Unit7Resources,
  book3Unit8Resources,
  book3Unit10Resources,
};
