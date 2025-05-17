/**
 * Book 1 Unit 6 resources
 * 
 * Combined resources for My Favourite Colour
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit6VideoResources from './book1-unit6-video-resources';
import book1Unit6GameResources from './book1-unit6-game-resources';
import book1Unit6PdfResources from './book1-unit6-pdf-resources';
import book1Unit6LessonPlans from './book1-unit6-lesson-plans';

/**
 * All resources for Book 1 Unit 6 (My Favourite Colour)
 */
export const book1Unit6Resources: TeacherResource[] = [
  ...book1Unit6VideoResources,
  ...book1Unit6GameResources,
  ...book1Unit6PdfResources,
  ...book1Unit6LessonPlans,
];

export default book1Unit6Resources;
