import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6Unit16Resources } from './book6-unit16-resources';
import { BOOK6_UNIT_TITLES, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

/**
 * Implementation of resources for Book 6 Unit 16 - Fashion Accessories
 * This function generates all teaching resources for this unit
 */
export function generateBook6Unit16Content(bookId: string): TeacherResource[] {
  // Get unit-specific resources with the extra game
  return generateBook6Unit16Resources(bookId);
}

/**
 * Lesson plans for Unit 16 - Fashion Accessories
 */
export function generateUnit16LessonPlans(): LessonPlan[] {
  const unitId = '16';
  const unitTitle = BOOK6_UNIT_TITLES[unitId];
  
  // Get the default lesson plans for this unit
  const lessonPlans = generateDefaultBook6UnitLessonPlans(unitId, unitTitle);
  
  // Add any unit-specific modifications here if needed
  // Example: modify vocabulary objectives, add fashion-specific activities, etc.
  
  return lessonPlans;
}
