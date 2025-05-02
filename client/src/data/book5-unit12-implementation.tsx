// This file imports and exports the resources and lesson plans for Book 5, Unit 12

import { book5Unit12Resources, transportVocabularyLessonPlan, transportTravelConversationsLessonPlan } from './book5-unit12-resources';

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
export const getBook5Unit12LessonPlans = (): LessonPlan[] => {
  return [
    transportVocabularyLessonPlan,
    transportTravelConversationsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook5Unit12Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book5Unit12Resources.map(resource => ({
    id: `book5-unit12-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book5Unit12Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  transportVocabularyLessonPlan,
  transportTravelConversationsLessonPlan
];
