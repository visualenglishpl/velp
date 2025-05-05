import book3Unit7SolarResources from './book3-unit7-solar-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 7 - THE SOLAR SYSTEM
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit7SolarResources = (): TeacherResource[] => book3Unit7SolarResources;

// Generate lesson plans for this unit
export const generateBook3Unit7SolarLessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('7', 'THE SOLAR SYSTEM');
};
