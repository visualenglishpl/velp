import { book3Unit8Resources } from './book3-unit8-resources';
import { TeacherResource, LessonPlan } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';

/**
 * Visual English Book 3, Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Implementation file for unit resources and lesson plans
 */

// Export resources getter function
export const getBook3Unit8Resources = (): TeacherResource[] => book3Unit8Resources;

// Generate lesson plans for this unit
export const generateBook3Unit8LessonPlans = (): LessonPlan[] => {
  return generateDefaultBook3UnitLessonPlans('8', 'Let\'s Go Shopping - How Much Is It?');
};

// Export lesson plans so they can be directly accessed
export const lessonPlans = generateBook3Unit8LessonPlans();
