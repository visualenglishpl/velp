import { book3Unit12Resources } from './book3-unit12-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 12 - WHAT DO YOU LOOK LIKE
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit12Resources = (): TeacherResource[] => book3Unit12Resources;

// Generate lesson plans for this unit
export const generateBook3Unit12LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('12', BOOK3_UNIT_TITLES[11]);
};
