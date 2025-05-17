/**
 * Book 1 Unit 1 resources
 * 
 * Combined resources for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit1VideoResources from './book1-unit1-video-resources';
import book1Unit1GameResources from './book1-unit1-game-resources';
import book1Unit1PdfResources from './book1-unit1-pdf-resources';
import book1Unit1LessonPlans from './book1-unit1-lesson-plans';

/**
 * All resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources,
  ...book1Unit1PdfResources,
  ...book1Unit1LessonPlans,
];

export default book1Unit1Resources;
