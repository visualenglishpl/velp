import { book3Unit15Resources } from './book3-unit15-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 15 - BUGS
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit15Resources = (): TeacherResource[] => book3Unit15Resources;

// Generate lesson plans for this unit
export const generateBook3Unit15LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('15', 'Bugs');
};
