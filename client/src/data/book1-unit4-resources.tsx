/**
 * Book 1 Unit 4 resources
 * 
 * Combined resources for My House
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit4VideoResources from './book1-unit4-video-resources';
import book1Unit4GameResources from './book1-unit4-game-resources';
import book1Unit4PdfResources from './book1-unit4-pdf-resources';
import book1Unit4LessonPlans from './book1-unit4-lesson-plans';

/**
 * All resources for Book 1 Unit 4 (My House)
 */
export const book1Unit4Resources: TeacherResource[] = [
  ...book1Unit4VideoResources,
  ...book1Unit4GameResources,
  ...book1Unit4PdfResources,
  ...book1Unit4LessonPlans,
];

export default book1Unit4Resources;
