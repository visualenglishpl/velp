import { book3Unit16SportsResources } from './book3-unit16-sports-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 16 - SPORTS
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit16SportsResources = (): TeacherResource[] => book3Unit16SportsResources;

// Generate lesson plans for this unit
export const generateBook3Unit16SportsLessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('16', 'Sports');
};
