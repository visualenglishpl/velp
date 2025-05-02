// This file imports and exports the resources and lesson plans for Book 5, Unit 11

import { book5Unit11Resources, prepositionsOfPlaceLessonPlan, prepositionsOfMovementLessonPlan } from './book5-unit11-resources';

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
export const getBook5Unit11LessonPlans = (): LessonPlan[] => {
  return [
    prepositionsOfPlaceLessonPlan,
    prepositionsOfMovementLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook5Unit11Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book5Unit11Resources.map(resource => ({
    id: `book5-unit11-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book5Unit11Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  prepositionsOfPlaceLessonPlan,
  prepositionsOfMovementLessonPlan
];
