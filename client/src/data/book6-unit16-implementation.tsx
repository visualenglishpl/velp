// This file imports and exports the resources and lesson plans for Book 6, Unit 16

import { book6Unit16Resources, cityLifeVocabularyLessonPlan, urbanRuralLifeLessonPlan } from './book6-unit16-resources';

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
export const getBook6Unit16LessonPlans = (): LessonPlan[] => {
  return [
    cityLifeVocabularyLessonPlan,
    urbanRuralLifeLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit16Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit16Resources.map(resource => ({
    id: `book6-unit16-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit16Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  cityLifeVocabularyLessonPlan,
  urbanRuralLifeLessonPlan
];
