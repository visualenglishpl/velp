import { TeacherResource } from '@/types/teacher-resources';

/**
 * Common resource definitions for Book 4
 */

// Book title
export const BOOK4_TITLE = 'VISUAL ENGLISH 4';

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

export default commonResources;
