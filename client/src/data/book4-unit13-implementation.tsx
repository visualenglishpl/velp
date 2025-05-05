import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit13Resources, getBook4Unit13Resources } from './book4-unit13-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 13 - AT THE PLAYGROUND
 */

const unitNumber = '13';
const unitTitle = 'AT THE PLAYGROUND';

// Generate lesson plans
export const book4Unit13LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit13Resources };

// Getter functions for backward compatibility
export function getBook4Unit13LessonPlans(): LessonPlan[] {
  return book4Unit13LessonPlans;
}
