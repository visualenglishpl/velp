import { book3Unit11Resources } from './book3-unit11-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 11 - GET WELL SOON
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit11Resources = (): TeacherResource[] => book3Unit11Resources;

// Generate lesson plans for this unit
export const generateBook3Unit11LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('11', 'Get Well Soon');
};
