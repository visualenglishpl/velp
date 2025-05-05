/**
 * Visual English Book 4, Unit 4 - MY FAMILY
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources, videos, games, externalResources } from './book4-unit4-resources';
import { BOOK4_TITLE, generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit4Resources(): TeacherResource[] {
  return resources;
}

// Function to get videos for this unit
export function getBook4Unit4Videos(): TeacherResource[] {
  return videos;
}

// Function to get games for this unit
export function getBook4Unit4Games(): TeacherResource[] {
  return games;
}

// Function to get external resources for this unit
export function getBook4Unit4ExternalResources(): TeacherResource[] {
  return externalResources;
}

// Get lesson plans for this unit
export function getBook4Unit4LessonPlans(): LessonPlan[] {
  return generateDefaultBook4UnitLessonPlans('4', 'MY FAMILY');
}

// Generate lesson plans for this unit
const lessonPlans = getBook4Unit4LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Default export for backward compatibility
export default resources;
