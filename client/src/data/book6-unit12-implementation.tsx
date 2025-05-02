// Implementation file for Book 6, Unit 12 - Are You Eco: Environment

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
  book6Unit12Resources,
  environmentalIssuesLessonPlan,
  sustainabilityLessonPlan
} from './book6-unit12-resources';

// Function to get lesson plans for this unit
export const getBook6Unit12LessonPlans = (): LessonPlan[] => {
  return [
    environmentalIssuesLessonPlan,
    sustainabilityLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit12Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit12Resources.map(resource => ({
    id: `book6-unit12-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit12Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  environmentalIssuesLessonPlan,
  sustainabilityLessonPlan
];
