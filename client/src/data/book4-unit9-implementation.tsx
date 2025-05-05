import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK4_TITLE } from './book4-resources-common';
import { book4Unit9Resources, getBook4Unit9Resources } from './book4-unit9-resources';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

/**
 * Implementation for Book 4 Unit 9 - AT THE CAMPSITE
 */

const unitNumber = '9';
const unitTitle = 'AT THE CAMPSITE';

// Generate lesson plans
export const book4Unit9LessonPlans: LessonPlan[] = generateDefaultBook4UnitLessonPlans(unitNumber, unitTitle);

// Add any additional implementation-specific code here

// Direct exports for consistent importing
export { book4Unit9Resources };

// Getter functions for backward compatibility
export function getBook4Unit9LessonPlans(): LessonPlan[] {
  return book4Unit9LessonPlans;
}
