// Book 6 Unit 16 - Fashion Accessories - Implementation

// Import functions from resources file
import { getBook6Unit16Resources as importedGetResources, getBook6Unit16LessonPlans as importedGetLessonPlans } from './book6-unit16-resources';

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';

// Function to get resources for this unit
export function getBook6Unit16Resources(bookId: string, unitId: string): TeacherResource[] {
  return importedGetResources(bookId, unitId);
}

// Function to get lesson plans for this unit
export function getBook6Unit16LessonPlans(): LessonPlan[] {
  return importedGetLessonPlans();
}

// Export the lesson plans for backward compatibility
export const lessonPlans = importedGetLessonPlans();

// Export empty array for backward compatibility
export const unitResources: TeacherResource[] = [];

// Export special fashion-specific lesson plans (if needed in the future)
export const fashionAccessoriesLessonPlan = lessonPlans[0];
