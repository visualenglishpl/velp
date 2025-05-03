// Book 6 Unit 14 - At The Airport - Implementation

// Import functions from resources file
import { getBook6Unit14Resources as importedGetResources, getBook6Unit14LessonPlans as importedGetLessonPlans } from './book6-unit14-resources';

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';

// Function to get resources for this unit
export function getBook6Unit14Resources(bookId: string, unitId: string): TeacherResource[] {
  return importedGetResources(bookId, unitId);
}

// Function to get lesson plans for this unit
export function getBook6Unit14LessonPlans(): LessonPlan[] {
  return importedGetLessonPlans();
}

// Export the lesson plans for backward compatibility
export const lessonPlans = importedGetLessonPlans();

// Export empty array for backward compatibility
export const unitResources: TeacherResource[] = [];

// Export special airport-specific lesson plans (if needed in the future)
export const airportLessonPlan = lessonPlans[0];
