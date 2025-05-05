/**
 * Implementation for Book 4 Unit 4 - Family - Describing People
 * 
 * This file contains the implementation logic for Book 4 Unit 4 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit4Resources, getBook4Unit4LessonPlans } from "./book4-unit4-resources";
import { TeacherResource } from "@/types/teacher-resources";

// BookUnit interface
interface BookUnit {
  bookId: string;
  unitId: string;
  title: string;
  hasTeacherResources: boolean;
  hasMappedContent: boolean;
  slides: {
    mappingSource: 'inline' | 'json' | 'pattern';
    showBlankIfUnmapped?: boolean;
    mappings?: Record<string, { question: string; answer: string }>;
  };
  getTeacherResources?: () => TeacherResource[];
  getLessonPlans?: () => TeacherResource[];
}

/**
 * Get teacher resources for Book 4 Unit 4
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit4Resources();
}

/**
 * Get lesson plans for Book 4 Unit 4
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return getBook4Unit4LessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 4
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "4",
    title: "FAMILY - DESCRIBING PEOPLE",
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