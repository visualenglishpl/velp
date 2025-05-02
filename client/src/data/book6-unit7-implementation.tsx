// Book 6 Unit 7 implementation file - What Your Body Can Do

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { bodySystemsLessonPlan, healthAndIllnessLessonPlan, book6Unit7Resources, book6Unit7LessonPlans } from './book6-unit7-resources';

// Function to get lesson plans for this unit
export function getBook6Unit7LessonPlans(): LessonPlan[] {
  return book6Unit7LessonPlans;
}

// Function to get additional resources for the unit
export function getBook6Unit7Resources(bookId: string, unitId: string): TeacherResource[] {
  // Just return the resources directly since they already have the correct properties
  return book6Unit7Resources;
}
