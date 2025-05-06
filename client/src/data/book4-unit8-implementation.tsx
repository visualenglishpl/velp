/**
 * Implementation for Book 4 Unit 8 - Enjoy Your Meal
 * 
 * This file contains the implementation logic for Book 4 Unit 8 content,
 * including Q&A mappings and teaching resources.
 */

import { resources as unitResources } from "./book4-unit8-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { generateDefaultBook4UnitLessonPlans } from "./book4-resources-common";

/**
 * Legacy function maintained for compatibility
 * @deprecated Use the standardized lesson plan generators instead
 */
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  return {
    id: resource.id || '',
    title: resource.title || '',
    duration: resource.lessonPlan?.duration || '45 minutes',
    level: resource.lessonPlan?.level || 'Elementary to Pre-Intermediate',
    objectives: resource.lessonPlan?.objectives || [],
    materials: resource.lessonPlan?.materials || [],
    steps: resource.lessonPlan?.steps || [],
    assessmentTips: resource.lessonPlan?.assessmentTips || '',
    homeworkIdeas: resource.lessonPlan?.homeworkIdeas || []
  };
}

/**
 * Get teacher resources for Book 4 Unit 8
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return unitResources;
}

/**
 * Get lesson plans for Book 4 Unit 8
 * @returns Array of teacher resources with lesson plans
 */
export function getLessonPlans(): TeacherResource[] {
  // Convert lesson plans to TeacherResource format
  const lessonPlans = generateDefaultBook4UnitLessonPlans('8', 'ENJOY YOUR MEAL');
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
 * Get unit configuration for Book 4 Unit 8
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    bookId: "4",
    unitId: "8",
    title: "ENJOY YOUR MEAL",
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
