import { book3Unit17Resources } from './book3-unit17-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 17 - HOUSE CHORES
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit17Resources = (): TeacherResource[] => book3Unit17Resources;

// Generate lesson plans for this unit
export const generateBook3Unit17LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('17', 'House Chores');
};
