import { book3Unit7ShoppingResources } from './book3-unit7-shopping-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 7 - LET'S GO SHOPPING
 * Implementation file for the shopping variant of unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit7ShoppingResources = (): TeacherResource[] => book3Unit7ShoppingResources;

// Generate lesson plans for this unit
export const generateBook3Unit7ShoppingLessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('7', 'LET\'S GO SHOPPING');
};
