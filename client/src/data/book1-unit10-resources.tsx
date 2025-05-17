/**
 * Book 1 Unit 10 resources
 * 
 * Combined resources for Transport
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit10VideoResources from './book1-unit10-video-resources';
import book1Unit10GameResources from './book1-unit10-game-resources';
import book1Unit10PdfResources from './book1-unit10-pdf-resources';
import book1Unit10LessonPlans from './book1-unit10-lesson-plans';

/**
 * All resources for Book 1 Unit 10 (Transport)
 */
export const book1Unit10Resources: TeacherResource[] = [
  ...book1Unit10VideoResources,
  ...book1Unit10GameResources,
  ...book1Unit10PdfResources,
  ...book1Unit10LessonPlans,
];

export default book1Unit10Resources;
