// Implementation file for Book 6, Unit 9 - Present Perfect: What Has Just Happened

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
  lessonPlan?: LessonPlan; // Using imported LessonPlan type
};

// Import the resources and lesson plans
import { 
  book6Unit9Resources, 
  presentPerfectStructureLessonPlan, 
  presentPerfectVsPastSimpleLessonPlan 
} from './book6-unit9-resources';

/**
 * Get Book 6 Unit 9 resources - Present Perfect: What Has Just Happened
 */
export function getBook6Unit9Resources(): TeacherResource[] {
  return book6Unit9Resources.map(resource => ({
    ...resource,
    id: `book6-unit9-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '9'
  }));
}

/**
 * Get Book 6 Unit 9 lesson plans
 */
export function getBook6Unit9LessonPlans(): LessonPlan[] {
  return [
    presentPerfectStructureLessonPlan,
    presentPerfectVsPastSimpleLessonPlan
  ];
}

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit9Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  presentPerfectStructureLessonPlan,
  presentPerfectVsPastSimpleLessonPlan
];
