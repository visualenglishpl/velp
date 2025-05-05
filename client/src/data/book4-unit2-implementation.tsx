/**
 * Implementation for Book 4 Unit 2 - Gadgets
 * 
 * This file contains the implementation logic for Book 4 Unit 2 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit2Resources, getBook4Unit2LessonPlans } from "./book4-unit2-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";

/**
 * Get teacher resources for Book 4 Unit 2
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit2Resources();
}

/**
 * Get lesson plans for Book 4 Unit 2
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return getBook4Unit2LessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 2
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "2",
    title: "Gadgets",
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
