/**
 * Book 1 Unit 16 resources
 * 
 * Combined resources for Sports
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit16VideoResources from './book1-unit16-video-resources';
import book1Unit16GameResources from './book1-unit16-game-resources';
import book1Unit16PdfResources from './book1-unit16-pdf-resources';
import book1Unit16LessonPlans from './book1-unit16-lesson-plans';

/**
 * All resources for Book 1 Unit 16 (Sports)
 */
export const book1Unit16Resources: TeacherResource[] = [
  ...book1Unit16VideoResources,
  ...book1Unit16GameResources,
  ...book1Unit16PdfResources,
  ...book1Unit16LessonPlans,
];

export default book1Unit16Resources;
