import { book3Unit10Resources } from './book3-unit10-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 10 - MY FAVOURITE SUBJECT
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit10Resources = (): TeacherResource[] => book3Unit10Resources;

// Generate lesson plans for this unit
export const generateBook3Unit10LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('10', BOOK3_UNIT_TITLES[9]);
};
