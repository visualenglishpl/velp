import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';
import { book3Unit18Resources } from './book3-unit18-resources';

/**
 * Book 3 Unit 18 - MOVIES & FILMS
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit18Resources = (): TeacherResource[] => book3Unit18Resources;

// Generate lesson plans for this unit
export const generateBook3Unit18LessonPlans = (): LessonPlan[] => {
  return generateDefaultBook3UnitLessonPlans('18', 'Movies & Films');
};
