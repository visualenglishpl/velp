// Book 6 Unit 15 - Are You A Survivor - Implementation

// Import functions from resources file
import { getBook6Unit15Resources as importedGetResources, getBook6Unit15LessonPlans as importedGetLessonPlans } from './book6-unit15-resources';

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';

// Function to get resources for this unit
export function getBook6Unit15Resources(bookId: string, unitId: string): TeacherResource[] {
  return importedGetResources(bookId, unitId);
}

// Function to get lesson plans for this unit
export function getBook6Unit15LessonPlans(): LessonPlan[] {
  return importedGetLessonPlans();
}

// Export the lesson plans for backward compatibility
export const lessonPlans = importedGetLessonPlans();

// Export empty array for backward compatibility
export const unitResources: TeacherResource[] = [];

// Export special survival-specific lesson plans (if needed in the future)
export const survivalLessonPlan = lessonPlans[0];
