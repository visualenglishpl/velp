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

// ResourceCategory is defined below

/**
 * Lesson step structure
 */
export interface LessonStep {
  title: string;
  duration: string;
  description: string;
  materials?: string[];
  instructions?: string[];
  teacherNotes?: string;
}

/**
 * Lesson plan structure
 */
export interface LessonPlan {
  id: string;
  title: string;
  duration: string;
  level: string;
  objectives: string[];
  materials: string[];
  steps: LessonStep[];
  assessmentTips?: string;
  homeworkIdeas?: string[];
  additionalResources?: {
    title: string;
    url?: string;
  }[];
  
  // Legacy fields for backward compatibility
  warmUp?: string;
  mainActivities?: string[];
  extension?: string;
  assessment?: string;
  conclusion?: string;
}

/**
 * Structure for teacher resources
 */
/**
 * Resource Category type for more fine-grained categorization
 */
export type ResourceCategory = 
  | 'activity'        // Interactive classroom activity
  | 'assessment'      // Assessments and quizzes
  | 'flashcard'       // Flashcard set
  | 'presentation'    // Slide presentation
  | 'printable'       // Printable worksheets
  | 'song'            // Educational songs
  | 'animation'       // Animated content
  | 'tutorial'        // How-to or step-by-step guides
  | 'exercise'        // Practice exercises
  | 'discussion';     // Discussion prompts or activities

export interface TeacherResource {
  id: string;
  bookId?: string;
  unitId?: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  categories?: ResourceCategory[];
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  ageGroup?: 'kids' | 'teens' | 'adults' | 'all';
  durationMinutes?: number;
  provider?: string;
  author?: string;
  dateAdded?: string;
  rating?: number;
  reviewCount?: number;
  sourceUrl?: string;
  embedCode?: string;
  thumbnailUrl?: string;
  content: {
    type: string;
    embedId?: string;
    embedUrl?: string;
  };
  fileUrl?: string;
  lessonPlan?: LessonPlan;
}