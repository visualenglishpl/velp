// Implementation file for Book 6, Unit 10 - Are You Tech Savvy?

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
  book6Unit10Resources,
  technologyVocabularyLessonPlan,
  digitalLiteracyLessonPlan
} from './book6-unit10-resources';

// Function to get lesson plans for this unit
export const getBook6Unit10LessonPlans = (): LessonPlan[] => {
  return [
    technologyVocabularyLessonPlan,
    digitalLiteracyLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit10Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit10Resources.map(resource => ({
    id: `book6-unit10-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit10Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  technologyVocabularyLessonPlan,
  digitalLiteracyLessonPlan
];
