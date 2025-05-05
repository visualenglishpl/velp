/**
 * Export all Book 3 resources
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitResources } from './book3-resources-common';

// Import individual unit resources
import book3Unit1Resources from './book3-unit1-resources';
import book3Unit2Resources from './book3-unit2-resources';
import book3Unit3Resources from './book3-unit3-resources';
import book3Unit4Resources from './book3-unit4-resources';
import book3Unit5Resources from './book3-unit5-resources';
import book3Unit6Resources from './book3-unit6-resources';
// Import unit resources using getter functions for consistent implementation
import { getBook3Unit7Resources, getBook3Unit7SolarResources } from './book3-unit7-implementation';
import { book3Unit7ShoppingResources } from './book3-unit7-shopping-resources';
import { getBook3Unit8Resources } from './book3-unit8-implementation';
import { getBook3Unit10Resources } from './book3-unit10-implementation';
import { getBook3Unit11Resources } from './book3-unit11-implementation';
import { getBook3Unit12Resources } from './book3-unit12-implementation';
import book3Unit8Resources from './book3-unit8-resources';
import book3Unit9Resources from './book3-unit9-resources';
import book3Unit10Resources from './book3-unit10-resources';
import book3Unit11Resources from './book3-unit11-resources';
import book3Unit12Resources from './book3-unit12-resources';
import book3Unit13Resources from './book3-unit13-resources';
import book3Unit14Resources from './book3-unit14-resources';
import book3Unit15Resources from './book3-unit15-resources';
import { getBook3Unit16SportsResources } from './book3-unit16-sports-implementation';
import { book3Unit17Resources } from './book3-unit17-resources';
import { book3Unit18Resources } from './book3-unit18-resources';

// Store references to getter function results for consistency
const unit7Resources = getBook3Unit7Resources();
const unit7SolarResources = getBook3Unit7SolarResources();
const unit8Resources = getBook3Unit8Resources();
const unit10Resources = getBook3Unit10Resources();
const unit11Resources = getBook3Unit11Resources();
const unit16SportsResources = getBook3Unit16SportsResources();

// Create a mapping of all available resources by unit
export const book3ResourcesByUnit: Record<string, TeacherResource[]> = {
  '1': book3Unit1Resources,
  '2': book3Unit2Resources,
  '3': book3Unit3Resources,
  '4': book3Unit4Resources,
  '5': book3Unit5Resources,
  '6': book3Unit6Resources,
  '7': unit7SolarResources, // Solar System theme (correct theme for Unit 7)
  '7-solar': unit7SolarResources,
  '7-shopping': book3Unit7ShoppingResources,
  '8': unit8Resources,
  '9': book3Unit9Resources,
  '10': unit10Resources,
  '11': unit11Resources,
  '12': book3Unit12Resources,
  '13': book3Unit13Resources,
  '14': book3Unit14Resources,
  '15': book3Unit15Resources,
  '16': unit16SportsResources,
  '16-sports': unit16SportsResources,
  '17': book3Unit17Resources, // Empty resources as per requirement
  '18': book3Unit18Resources, // Empty resources as per requirement
};

// Function to get resources for a specific unit, or generate default ones if not available
export function getBook3UnitResources(unitId: string): TeacherResource[] {
  if (book3ResourcesByUnit[unitId]) {
    return book3ResourcesByUnit[unitId];
  }
  
  // If no specific resources are available, generate default ones
  return generateDefaultBook3UnitResources('3', unitId);
}

// Export constants and individual unit resources
export {
  BOOK3_TITLE,
  BOOK3_UNIT_TITLES,
  book3Unit1Resources,
  book3Unit2Resources,
  book3Unit3Resources,
  book3Unit4Resources,
  book3Unit5Resources,
  book3Unit6Resources,
  unit7Resources,
  unit7SolarResources,
  book3Unit7ShoppingResources,
  unit8Resources,
  book3Unit8Resources,
  getBook3Unit8Resources,
  book3Unit9Resources,
  unit10Resources,
  book3Unit10Resources,
  getBook3Unit10Resources,
  unit11Resources,
  book3Unit11Resources,
  getBook3Unit11Resources,
  book3Unit12Resources,
  book3Unit13Resources,
  book3Unit14Resources,
  book3Unit15Resources,
  unit16SportsResources,
  getBook3Unit16SportsResources,
  book3Unit17Resources,
  book3Unit18Resources,
};
