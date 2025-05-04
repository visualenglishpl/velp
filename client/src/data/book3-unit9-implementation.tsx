/**
 * Visual English Book 3, Unit 9 - LET'S EAT OUT
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 */

import { TeacherResource } from '@/components/TeacherResources';
import book3Unit9Resources from './book3-unit9-resources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

// Function to get resources for this unit
export const getBook3Unit9Resources = (): TeacherResource[] => book3Unit9Resources;

// Generate lesson plans for this unit
export const generateBook3Unit9LessonPlans = () => {
  return generateDefaultBook3UnitLessonPlans('9', BOOK3_UNIT_TITLES[8]);
};
