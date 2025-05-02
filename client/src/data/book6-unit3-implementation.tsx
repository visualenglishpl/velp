// This file imports and exports the resources and lesson plans for Book 6, Unit 3

import { book6Unit3Resources, futureTenseLessonPlan, futurePlansLessonPlan } from './book6-unit3-resources';

// Use type definition directly to avoid circular dependencies
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
export const getBook6Unit3LessonPlans = (): LessonPlan[] => {
  return [
    futureTenseLessonPlan,
    futurePlansLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit3Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit3Resources.map(resource => ({
    id: `book6-unit3-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit3Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  futureTenseLessonPlan,
  futurePlansLessonPlan
];
