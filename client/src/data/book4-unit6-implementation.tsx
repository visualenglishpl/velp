/**
 * Implementation for Book 4 Unit 6 - Collections
 * 
 * This file contains the implementation logic for Book 4 Unit 6 content,
 * including Q&A mappings and teaching resources.
 */

import { getBook4Unit6Resources, getBook4Unit6LessonPlans } from "./book4-unit6-resources";
import { TeacherResource } from "@/types/teacher-resources";
import { BookUnit } from "@/types/book-unit";
import { LessonPlan, LessonStep } from "@/components/LessonPlanTemplate";

/**
 * Convert legacy lesson plan format to the new LessonPlan format
 * @param resource Teacher resource containing a legacy lesson plan
 * @returns A properly formatted LessonPlan object
 */
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  const legacyPlan = resource.lessonPlan;
  if (!legacyPlan) {
    throw new Error(`No lesson plan found in resource: ${resource.id}`);
  }

  // Create steps from legacy format
  const steps: LessonStep[] = [];
  
  // Add warm-up step
  if (legacyPlan.warmUp) {
    steps.push({
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: legacyPlan.warmUp,
      instructions: []
    });
  }
  
  // Add main activity steps
  if (legacyPlan.mainActivities && legacyPlan.mainActivities.length > 0) {
    legacyPlan.mainActivities.forEach((activity, index) => {
      steps.push({
        title: `Activity ${index + 1}`,
        duration: '10-15 minutes',
        description: activity,
        instructions: []
      });
    });
  }
  
  // Add extension step
  if (legacyPlan.extension) {
    steps.push({
      title: 'Extension',
      duration: '10 minutes',
      description: legacyPlan.extension,
      instructions: []
    });
  }
  
  // Add assessment step
  if (legacyPlan.assessment) {
    steps.push({
      title: 'Assessment',
      duration: '5-10 minutes',
      description: legacyPlan.assessment,
      instructions: []
    });
  }
  
  // Add conclusion step
  if (legacyPlan.conclusion) {
    steps.push({
      title: 'Conclusion',
      duration: '5 minutes',
      description: legacyPlan.conclusion,
      instructions: []
    });
  }

  // Create new LessonPlan
  return {
    id: resource.id || `book4-unit6-${legacyPlan.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: legacyPlan.title,
    duration: '45 minutes',
    level: 'Elementary to Pre-Intermediate',
    objectives: legacyPlan.objectives || [],
    materials: legacyPlan.materials || [],
    steps: steps,
    assessmentTips: legacyPlan.assessment,
    homeworkIdeas: [
      'Review vocabulary from the lesson',
      'Complete exercises in the workbook',
      'Prepare a short presentation for next class'
    ]
  };
}

/**
 * Get teacher resources for Book 4 Unit 6
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getBook4Unit6Resources();
}

/**
 * Get lesson plans for Book 4 Unit 6
 * @returns Array of teacher resources with lesson plans
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