/**
 * Book 1 Unit 18 resources
 * 
 * Combined resources for Action Verbs
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit18VideoResources from './book1-unit18-video-resources';
import book1Unit18GameResources from './book1-unit18-game-resources';
import book1Unit18PdfResources from './book1-unit18-pdf-resources';
import book1Unit18LessonPlans from './book1-unit18-lesson-plans';

/**
 * All resources for Book 1 Unit 18 (Action Verbs)
 */
export const book1Unit18Resources: TeacherResource[] = [
  ...book1Unit18VideoResources,
  ...book1Unit18GameResources,
  ...book1Unit18PdfResources,
  ...book1Unit18LessonPlans,
];

export default book1Unit18Resources;
