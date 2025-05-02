import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { book6Unit8Resources, pastSimpleVerbsLessonPlan, freeTimeActivitiesLessonPlan } from './book6-unit8-resources';

/**
 * Get Book 6 Unit 8 resources - Free Time - Past Simple
 */
export function getBook6Unit8Resources(): TeacherResource[] {
  return book6Unit8Resources.map(resource => ({
    ...resource,
    bookId: "6",
    unitId: "8"
  }));
}

/**
 * Get Book 6 Unit 8 lesson plans
 */
export function getBook6Unit8LessonPlans(): LessonPlan[] {
  return [
    pastSimpleVerbsLessonPlan,
    freeTimeActivitiesLessonPlan
  ];
}
