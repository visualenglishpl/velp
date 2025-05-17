/**
 * Book 1 Unit 5 resources
 * 
 * Combined resources for Pets and Animals
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit5VideoResources from './book1-unit5-video-resources';
import book1Unit5GameResources from './book1-unit5-game-resources';
import book1Unit5PdfResources from './book1-unit5-pdf-resources';
import book1Unit5LessonPlans from './book1-unit5-lesson-plans';

/**
 * All resources for Book 1 Unit 5 (Pets and Animals)
 */
export const book1Unit5Resources: TeacherResource[] = [
  ...book1Unit5VideoResources,
  ...book1Unit5GameResources,
  ...book1Unit5PdfResources,
  ...book1Unit5LessonPlans,
];

export default book1Unit5Resources;
