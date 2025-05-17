/**
 * Type definitions for teacher resources
 * 
 * This file serves as a compatibility layer between different TeacherResource definitions
 * in the application. It re-exports the main TeacherResource type from resources.ts
 * to ensure all components using this import get the same interface.
 * 
 * This layer resolves conflicts between resources.ts and teacher-resources.ts
 * by providing a unified interface that works with both implementations.
 */

import { TeacherResource as MainTeacherResource, ResourceType as MainResourceType, ResourceFilterType, ResourceFilter } from './resources';

// Export lesson plan related types from teacher-resources.ts
import { LessonPlan, LessonStep, ResourceCategory, ResourceType as TeacherResourceType } from './teacher-resources';
export { LessonPlan, LessonStep, ResourceCategory };

// Combined ResourceType that includes all possible values from both files
export type ResourceType = MainResourceType | TeacherResourceType;

// Re-export the filter types
export { ResourceFilterType, ResourceFilter };

// Export the main TeacherResource type with our compatibility improvements
export type TeacherResource = MainTeacherResource;

// Utility functions for resource type checking
export function isVideoResource(resource: TeacherResource): boolean {
  return resource.resourceType === 'video';
}

export function isGameResource(resource: TeacherResource): boolean {
  return resource.resourceType === 'game';
}

export function isPdfResource(resource: TeacherResource): boolean {
  return resource.resourceType === 'pdf';
}

export function isLessonPlanResource(resource: TeacherResource): boolean {
  return resource.resourceType === 'lessonPlan' || resource.resourceType === 'lesson';
}