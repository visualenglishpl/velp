/**
 * Implementation for Book 4 Unit 6 - Collections
 * 
 * This file contains the implementation logic for Book 4 Unit 6 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit6Resources, getBook4Unit6LessonPlans } from "./book4-unit6-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";

/**
 * Get teacher resources for Book 4 Unit 6
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit6Resources();
}

/**
 * Get lesson plans for Book 4 Unit 6
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return getBook4Unit6LessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 6
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "6",
    title: "COLLECTIONS",
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