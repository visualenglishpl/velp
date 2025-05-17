/**
 * Book 1 Unit 7 resources
 * 
 * Combined resources for Toys
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit7VideoResources from './book1-unit7-video-resources';
import book1Unit7GameResources from './book1-unit7-game-resources';
import book1Unit7PdfResources from './book1-unit7-pdf-resources';
import book1Unit7LessonPlans from './book1-unit7-lesson-plans';

/**
 * All resources for Book 1 Unit 7 (Toys)
 */
export const book1Unit7Resources: TeacherResource[] = [
  ...book1Unit7VideoResources,
  ...book1Unit7GameResources,
  ...book1Unit7PdfResources,
  ...book1Unit7LessonPlans,
];

export default book1Unit7Resources;
