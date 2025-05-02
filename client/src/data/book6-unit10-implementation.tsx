// Book 6 Unit 10 implementation file - Are You Tech Savvy

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book6Unit10Resources, book6Unit10LessonPlans } from './book6-unit10-resources';

// Function to get resources for this unit
export function getBook6Unit10Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit10Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit10LessonPlans(): LessonPlan[] {
  return book6Unit10LessonPlans;
}
