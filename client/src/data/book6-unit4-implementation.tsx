// This file imports and exports the resources and lesson plans for Book 6, Unit 4

import { book6Unit4Resources, animalClassificationLessonPlan, animalAdaptationsLessonPlan } from './book6-unit4-resources';

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
export const getBook6Unit4LessonPlans = (): LessonPlan[] => {
  return [
    animalClassificationLessonPlan,
    animalAdaptationsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit4Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit4Resources.map(resource => ({
    id: `book6-unit4-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit4Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  animalClassificationLessonPlan,
  animalAdaptationsLessonPlan
];
