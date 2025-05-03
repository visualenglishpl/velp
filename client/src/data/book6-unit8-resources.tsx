import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// At The Gym - Unit 8 Resources
// Export empty arrays for these resources as they are now fully defined in the implementation file
export const book6Unit8Resources: TeacherResource[] = [];
export const book6Unit8LessonPlans: LessonPlan[] = [];

// These functions are kept for backward compatibility but the implementation is now in the implementation file
export function getBook6Unit8Resources(bookId: string, unitId: string): TeacherResource[] {
  return [];
}

export function getBook6Unit8LessonPlans(): LessonPlan[] {
  return [];
}
