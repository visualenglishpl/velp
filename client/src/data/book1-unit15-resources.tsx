/**
 * Book 1 Unit 15 resources
 * 
 * Combined resources for Jobs
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit15VideoResources from './book1-unit15-video-resources';
import book1Unit15GameResources from './book1-unit15-game-resources';
import book1Unit15PdfResources from './book1-unit15-pdf-resources';
import book1Unit15LessonPlans from './book1-unit15-lesson-plans';

/**
 * All resources for Book 1 Unit 15 (Jobs)
 */
export const book1Unit15Resources: TeacherResource[] = [
  ...book1Unit15VideoResources,
  ...book1Unit15GameResources,
  ...book1Unit15PdfResources,
  ...book1Unit15LessonPlans,
];

export default book1Unit15Resources;
