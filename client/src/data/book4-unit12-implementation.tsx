import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit12Resources, getBook4Unit12Resources } from './book4-unit12-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 12 - AT THE FARM
 */

const unitNumber = '12';
const unitTitle = 'AT THE FARM';

// Generate lesson plans
export const book4Unit12LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit12Resources };

// Getter functions for backward compatibility
export function getBook4Unit12LessonPlans(): LessonPlan[] {
  return book4Unit12LessonPlans;
}
