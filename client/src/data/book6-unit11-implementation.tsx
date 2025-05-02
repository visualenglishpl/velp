// Implementation file for Book 6, Unit 11 - Extreme Sports

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan as ImportedLessonPlan } from '@/components/LessonPlanTemplate';

// Use imported type to ensure compatibility
type LessonPlan = ImportedLessonPlan;

// Type definition for teacher resources
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

// Import resources from the resources file
import {
  book6Unit11Resources,
  extremeSportsVocabularyLessonPlan,
  adventureSportsLessonPlan
} from './book6-unit11-resources';

// Function to get lesson plans for this unit
export const getBook6Unit11LessonPlans = (): LessonPlan[] => {
  return [
    extremeSportsVocabularyLessonPlan,
    adventureSportsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit11Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit11Resources.map(resource => ({
    id: `book6-unit11-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit11Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  extremeSportsVocabularyLessonPlan,
  adventureSportsLessonPlan
];
