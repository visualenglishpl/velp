import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit10Resources, getBook4Unit10Resources } from './book4-unit10-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 10 - MOTHER NATURE
 */

const unitNumber = '10';
const unitTitle = 'MOTHER NATURE';

// Generate lesson plans
export const book4Unit10LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit10Resources };

// Getter functions for backward compatibility
export function getBook4Unit10LessonPlans(): LessonPlan[] {
  return book4Unit10LessonPlans;
}
