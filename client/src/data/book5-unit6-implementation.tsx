// This file imports and exports the resources and lesson plans for Book 5, Unit 6

import { book5Unit6Resources, countriesNationalitiesLessonPlan, culturalDiversityLessonPlan } from './book5-unit6-resources';

// Use type definition directly since importing from components can cause circular dependencies
type TeacherResource = {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
  lessonPlan?: any; // Using any to avoid circular import issues
};

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan as ImportedLessonPlan } from '@/components/LessonPlanTemplate';

// Use imported type to ensure compatibility
type LessonPlan = ImportedLessonPlan;

// Function to get lesson plans for this unit
export const getBook5Unit6LessonPlans = (): LessonPlan[] => {
  return [
    countriesNationalitiesLessonPlan,
    culturalDiversityLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook5Unit6Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book5Unit6Resources.map(resource => ({
    id: `book5-unit6-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book5Unit6Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  countriesNationalitiesLessonPlan,
  culturalDiversityLessonPlan
];
