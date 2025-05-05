/**
 * Implementation for Book 4 Unit 3 - Home Sweet Home
 * 
 * This file contains the implementation logic for Book 4 Unit 3 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit3Resources, getBook4Unit3LessonPlans } from "./book4-unit3-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";

/**
 * Get teacher resources for Book 4 Unit 3
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit3Resources();
}

/**
 * Get lesson plans for Book 4 Unit 3
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return getBook4Unit3LessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 3
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "3",
    title: "HOME SWEET HOME",
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