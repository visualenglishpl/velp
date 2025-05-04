import { book3Unit14Resources } from './book3-unit14-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 14 - MY TOWN - EXCUSE ME WHERE IS THE?
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit14Resources = (): TeacherResource[] => book3Unit14Resources;

// Generate lesson plans for this unit
export const generateBook3Unit14LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('14', 'My Town - Excuse Me Where Is The?');
};
