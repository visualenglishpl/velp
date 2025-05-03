import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit15Resources } from './book6-unit15-resources';
import { BOOK6_UNIT_TITLES, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 15 - Are You A Survivor?
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit15Content(bookId: string): TeacherResource[] {
  return generateBook6Unit15Resources(bookId);
}

/**
 * Lesson plans for Unit 15 - Are You A Survivor?
 */
export function generateUnit15LessonPlans(): LessonPlan[] {
  const unitId = '15';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Get the default lesson plans for this unit
  const lessonPlans = generateDefaultBook6UnitLessonPlans(unitId, unitTitle);
  
  // Add any unit-specific modifications here if needed
  // For example, lessons focused on survival vocabulary and scenarios
  
  return lessonPlans;
}
