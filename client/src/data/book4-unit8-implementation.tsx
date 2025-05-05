import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit8Resources, getBook4Unit8Resources } from './book4-unit8-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 8 - ENJOY YOUR MEAL
 */

const unitNumber = '8';
const unitTitle = 'ENJOY YOUR MEAL';

// Generate lesson plans
export const book4Unit8LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit8Resources };

// Getter functions for backward compatibility
export function getBook4Unit8LessonPlans(): LessonPlan[] {
  return book4Unit8LessonPlans;
}
