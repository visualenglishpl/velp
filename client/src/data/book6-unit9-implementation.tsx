// Book 6 Unit 9 implementation file - Present Perfect: What Has Just Happened

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book6Unit9Resources, book6Unit9LessonPlans } from './book6-unit9-resources';

// Function to get resources for this unit
export function getBook6Unit9Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit9Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit9LessonPlans(): LessonPlan[] {
  return book6Unit9LessonPlans;
}
