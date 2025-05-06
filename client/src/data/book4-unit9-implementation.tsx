/**
 * Implementation for Book 4 Unit 9 - Camping
 * 
 * This file contains the implementation logic for Book 4 Unit 9 content,
 * including Q&A mappings and teaching resources.
 */

import { resources as unitResources } from "./book4-unit9-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { generateDefaultBook4UnitLessonPlans } from "./book4-resources-common";

/**
 * Legacy function maintained for compatibility
 * @deprecated Use the standardized lesson plan generators instead
 */
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  console.warn('convertLegacyLessonPlan is deprecated. Use standardized lesson plans instead.');
  throw new Error('This function is deprecated. Please use the standardized lesson plan generators.');
}

/**
 * Get teacher resources for Book 4 Unit 9
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return unitResources;
}

/**
 * Get lesson plans for Book 4 Unit 9
 * @returns Array of teacher resources with lesson plans
 */
export function getLessonPlans(): TeacherResource[] {
  // Convert lesson plans to TeacherResource format
  const lessonPlans = generateDefaultBook4UnitLessonPlans('9', 'CAMPING');
  return lessonPlans.map(plan => ({
    id: plan.id,
    title: plan.title,
    resourceType: 'lesson' as const,
    content: {
      type: 'lessonPlan'
    },
    lessonPlan: plan
  }));
}

/**
 * Get unit configuration for Book 4 Unit 9
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "9",
    title: "CAMPING",
    hasTeacherResources: true,
    hasMappedContent: true,
    slides: {
      // The Q&A mappings will be loaded from the centralized JSON file
      // This approach uses the pattern-based system for efficiency
      mappingSource: "json",
      showBlankIfUnmapped: true
    },
    getTeacherResources,
    getLessonPlans
  };
}

export default getUnitConfig;