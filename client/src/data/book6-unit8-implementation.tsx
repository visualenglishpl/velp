// Book 6 Unit 8 implementation file - Baking & Cooking

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book6Unit8Resources, book6Unit8LessonPlans } from './book6-unit8-resources';

// Function to get resources for this unit
export function getBook6Unit8Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit8Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit8LessonPlans(): LessonPlan[] {
  return book6Unit8LessonPlans;
}
