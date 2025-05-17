/**
 * Book 1 Unit 12 resources
 * 
 * Combined resources for My Body
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit12VideoResources from './book1-unit12-video-resources';
import book1Unit12GameResources from './book1-unit12-game-resources';
import book1Unit12PdfResources from './book1-unit12-pdf-resources';
import book1Unit12LessonPlans from './book1-unit12-lesson-plans';

/**
 * All resources for Book 1 Unit 12 (My Body)
 */
export const book1Unit12Resources: TeacherResource[] = [
  ...book1Unit12VideoResources,
  ...book1Unit12GameResources,
  ...book1Unit12PdfResources,
  ...book1Unit12LessonPlans,
];

export default book1Unit12Resources;
