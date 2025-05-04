/**
 * Export all Book 2 resources
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES, generateBook2UnitResources } from './book2-resources-common';

// Import individual unit resources
import book2Unit1Resources from './book2-unit1-resources';
import book2Unit2Resources from './book2-unit2-resources';
import book2Unit3Resources from './book2-unit3-resources';
import book2Unit4Resources from './book2-unit4-resources';
import book2Unit5Resources from './book2-unit5-resources';
import book2Unit6Resources from './book2-unit6-resources';
import book2Unit8Resources from './book2-unit8-resources';
import book2Unit10Resources from './book2-unit10-resources';
import book2Unit13Resources from './book2-unit13-resources';
import book2Unit16Resources from './book2-unit16-resources';

// Create a mapping of all available resources by unit
export const book2ResourcesByUnit: Record<string, TeacherResource[]> = {
  '1': book2Unit1Resources,
  '2': book2Unit2Resources,
  '3': book2Unit3Resources,
  '4': book2Unit4Resources,
  '5': book2Unit5Resources,
  '6': book2Unit6Resources,
  '8': book2Unit8Resources,
  '10': book2Unit10Resources,
  '13': book2Unit13Resources,
  '16': book2Unit16Resources,
};

// For additional units (6-7, 9, 11-12, 14-15, 17-18), we need to create similar resource files,
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
  book2Unit3Resources,
  book2Unit4Resources,
  book2Unit5Resources,
  book2Unit6Resources,
  book2Unit8Resources,
  book2Unit10Resources,
  book2Unit13Resources,
  book2Unit16Resources,
};
