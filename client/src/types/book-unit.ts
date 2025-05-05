/**
 * Types and interfaces for book units
 */

import { TeacherResource } from "./teacher-resources";

/**
 * BookUnit interface for standardized unit configuration
 */
export interface BookUnit {
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