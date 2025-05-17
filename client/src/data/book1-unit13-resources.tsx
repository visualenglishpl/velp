/**
 * Book 1 Unit 13 resources
 * 
 * Combined resources for Clothes
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit13VideoResources from './book1-unit13-video-resources';
import book1Unit13GameResources from './book1-unit13-game-resources';
import book1Unit13PdfResources from './book1-unit13-pdf-resources';
import book1Unit13LessonPlans from './book1-unit13-lesson-plans';

/**
 * All resources for Book 1 Unit 13 (Clothes)
 */
export const book1Unit13Resources: TeacherResource[] = [
  ...book1Unit13VideoResources,
  ...book1Unit13GameResources,
  ...book1Unit13PdfResources,
  ...book1Unit13LessonPlans,
];

export default book1Unit13Resources;
