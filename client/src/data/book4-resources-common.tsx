import { TeacherResource } from '@/types/teacher-resources';

/**
 * Common resource definitions for Book 4
 */

// Book title
export const BOOK4_TITLE = 'VISUAL ENGLISH 4';

// Unit titles - used by TeacherResources.tsx
export const BOOK4_UNIT_TITLES: Record<string, string> = {
  '1': 'NATIONALITIES',
  '2': 'DAILY ROUTINE',
  '3': 'NATURE',
  '4': 'HEALTH PROBLEMS',
  '5': 'APPEARANCE',
  '6': 'MOVIES',
  '7': 'JOBS AND WORK',
  '8': 'ENJOY YOUR MEAL',
  '9': 'CAMPING',
  '10': 'DIGITAL TECHNOLOGY',
  '11': 'SHOPPING',
  '12': 'HOLIDAYS',
  '13': 'SPORTS',
  '14': 'TOURISM',
  '15': 'FUTURE',
  '16': 'ENTERTAINMENT'
};

// Book metadata
export const book4Metadata = {
  id: '4',
  title: BOOK4_TITLE,
  unitCount: 16,
  ageGroup: 'teens',
  level: 'intermediate',
};

// Book-wide resources that apply to all units
export const commonResources: TeacherResource[] = [
  // Add any book-level resources here
];

/**
 * Generate resources for a Book 4 unit
 * This function is used by TeacherResources.tsx
 */
export function generateBook4UnitResources(unitId: string): TeacherResource[] {
  return [];
}

/**
 * Generate default lesson plans for a Book 4 unit
 * This function is used by TeacherResources.tsx
 */
export function generateDefaultBook4UnitLessonPlans(unitId: string): TeacherResource[] {
  return [];
}

export default commonResources;
