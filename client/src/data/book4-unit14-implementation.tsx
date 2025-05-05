import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit14Resources, getBook4Unit14Resources } from './book4-unit14-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 14 - WHAT CAN YOU DO
 */

const unitNumber = '14';
const unitTitle = 'WHAT CAN YOU DO';

// Generate lesson plans
export const book4Unit14LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit14Resources };

// Getter functions for backward compatibility
export function getBook4Unit14LessonPlans(): LessonPlan[] {
  return book4Unit14LessonPlans;
}
