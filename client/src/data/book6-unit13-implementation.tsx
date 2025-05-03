import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit13Resources } from './book6-unit13-resources';
import { BOOK6_UNIT_TITLES, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 13 - City Life
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit13Content(bookId: string): TeacherResource[] {
  return generateBook6Unit13Resources(bookId);
}

/**
 * Lesson plans for Unit 13 - City Life
 */
export function generateUnit13LessonPlans(): LessonPlan[] {
  const unitId = '13';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Get the default lesson plans for this unit
  const lessonPlans = generateDefaultBook6UnitLessonPlans(unitId, unitTitle);
  
  // Add any unit-specific modifications here if needed
  // For example, lessons focusing on city vocabulary, urban features, etc.
  
  return lessonPlans;
}
