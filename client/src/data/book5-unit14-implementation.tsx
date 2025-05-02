// This file imports and exports the resources and lesson plans for Book 5, Unit 14

import { book5Unit14Resources, movieVocabularyLessonPlan, movieReviewsLessonPlan } from './book5-unit14-resources';

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
export const getBook5Unit14LessonPlans = (): LessonPlan[] => {
  return [
    movieVocabularyLessonPlan,
    movieReviewsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook5Unit14Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book5Unit14Resources.map(resource => ({
    id: `book5-unit14-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book5Unit14Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  movieVocabularyLessonPlan,
  movieReviewsLessonPlan
];
