import { book3Unit16Resources } from './book3-unit16-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 16 - HOUSE CHORES
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit16Resources = (): TeacherResource[] => book3Unit16Resources;

// Generate lesson plans for this unit
export const generateBook3Unit16LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('16', 'House Chores');
};
