/**
 * Implementation for Book 4 Unit 15 - At The Circus
 * 
 * This file contains the implementation logic for Book 4 Unit 15 content,
 * including Q&A mappings and teaching resources.
 */

import { BookUnit } from '../types/book-content';
import { LessonPlan, TeacherResource } from '@/types/teacher-resources';
import { getResources, getLessonPlans as getResourceLessonPlans } from './book4-unit15-resources';

/**
 * Convert legacy lesson plan format to the new LessonPlan format
 * @param resource Teacher resource containing a legacy lesson plan
 * @returns A properly formatted LessonPlan object
 */
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  if (!resource.lessonPlan) {
    return {
      id: `${resource.id}-plan`,
      title: resource.title,
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [],
      materials: [],
      steps: [],
    };
  }
  return resource.lessonPlan;
}

/**
 * Get teacher resources for Book 4 Unit 15
 * @returns Array of teacher resources
 */
export function getTeacherResources(): TeacherResource[] {
  return getResources();
}

/**
 * Get lesson plans for Book 4 Unit 15
 * @returns Array of teacher resources with lesson plans
 */
export function getUnitLessonPlans(): TeacherResource[] {
  return getResourceLessonPlans();
}

/**
 * Get unit configuration for Book 4 Unit 15
 * @returns BookUnit configuration object
 */
export function getUnitConfig(): BookUnit {
  return {
    id: '15',
    bookId: '4',
    title: 'AT THE CIRCUS',
    description: 'Learn vocabulary and expressions related to circus performers, animals, and activities.',
    tags: ['circus', 'performers', 'acrobats', 'animals', 'entertainment']
  };
}
