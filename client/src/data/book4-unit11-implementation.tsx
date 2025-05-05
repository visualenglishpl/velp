import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit11Resources, getBook4Unit11Resources } from './book4-unit11-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 11 - DAILY ROUTINES
 */

const unitNumber = '11';
const unitTitle = 'DAILY ROUTINES';

// Generate lesson plans
export const book4Unit11LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit11Resources };

// Getter functions for backward compatibility
export function getBook4Unit11LessonPlans(): LessonPlan[] {
  return book4Unit11LessonPlans;
}
