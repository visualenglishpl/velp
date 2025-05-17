/**
 * Book 1 Unit 3 resources
 * 
 * Combined resources for Food
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit3VideoResources from './book1-unit3-video-resources';
import book1Unit3GameResources from './book1-unit3-game-resources';
import book1Unit3PdfResources from './book1-unit3-pdf-resources';
import book1Unit3LessonPlans from './book1-unit3-lesson-plans';

/**
 * All resources for Book 1 Unit 3 (Food)
 */
export const book1Unit3Resources: TeacherResource[] = [
  ...book1Unit3VideoResources,
  ...book1Unit3GameResources,
  ...book1Unit3PdfResources,
  ...book1Unit3LessonPlans,
];

export default book1Unit3Resources;
