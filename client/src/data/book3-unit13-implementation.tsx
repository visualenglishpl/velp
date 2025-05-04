import { book3Unit13Resources } from './book3-unit13-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 13 - ANIMAL BODY PARTS
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit13Resources = (): TeacherResource[] => book3Unit13Resources;

// Generate lesson plans for this unit
export const generateBook3Unit13LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('13', 'Animal Body Parts');
};
