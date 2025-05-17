/**
 * Book 1 Unit 8 resources
 * 
 * Combined resources for Numbers
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit8VideoResources from './book1-unit8-video-resources';
import book1Unit8GameResources from './book1-unit8-game-resources';
import book1Unit8PdfResources from './book1-unit8-pdf-resources';
import book1Unit8LessonPlans from './book1-unit8-lesson-plans';

/**
 * All resources for Book 1 Unit 8 (Numbers)
 */
export const book1Unit8Resources: TeacherResource[] = [
  ...book1Unit8VideoResources,
  ...book1Unit8GameResources,
  ...book1Unit8PdfResources,
  ...book1Unit8LessonPlans,
];

export default book1Unit8Resources;
