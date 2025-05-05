/**
 * Types and interfaces for teacher resources
 */

/**
 * Type of teaching resource
 */
export type ResourceType = 
  | 'video'    // YouTube or embedded video
  | 'game'     // Interactive game (like Wordwall)
  | 'lesson'   // Lesson plan
  | 'pdf'      // PDF document
  | 'other';   // Other resource type

/**
 * Lesson plan structure
 */
export interface LessonPlan {
  title: string;
  objectives: string[];
  materials: string[];
  warmUp: string;
  mainActivities: string[];
  extension: string;
  assessment: string;
  conclusion: string;
}

/**
 * Structure for teacher resources
 */
export interface TeacherResource {
  id: string;
  bookId?: string;
  unitId?: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  content: {
    type: string;
    embedId?: string;
    embedUrl?: string;
  };
  fileUrl?: string;
  lessonPlan?: LessonPlan;
}