/**
 * Implementation for Book 4 Unit 5 - Personality
 * 
 * This file contains the implementation logic for Book 4 Unit 5 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit5Resources, getBook4Unit5LessonPlans } from "./book4-unit5-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";

/**
 * Get teacher resources for Book 4 Unit 5
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit5Resources();
}

/**
 * Get lesson plans for Book 4 Unit 5
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return getBook4Unit5LessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 5
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "5",
    title: "PERSONALITY",
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