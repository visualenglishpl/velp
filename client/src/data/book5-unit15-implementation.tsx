// This file imports and exports the resources and lesson plans for Book 5, Unit 15

import { book5Unit15Resources, famousLandmarksLessonPlan, sightseeingTourismLessonPlan } from './book5-unit15-resources';

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
export const getBook5Unit15LessonPlans = (): LessonPlan[] => {
  return [
    famousLandmarksLessonPlan,
    sightseeingTourismLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook5Unit15Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book5Unit15Resources.map(resource => ({
    id: `book5-unit15-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book5Unit15Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  famousLandmarksLessonPlan,
  sightseeingTourismLessonPlan
];
