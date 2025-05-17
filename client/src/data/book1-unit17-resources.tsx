/**
 * Book 1 Unit 17 resources
 * 
 * Combined resources for Hobbies
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit17VideoResources from './book1-unit17-video-resources';
import book1Unit17GameResources from './book1-unit17-game-resources';
import book1Unit17PdfResources from './book1-unit17-pdf-resources';
import book1Unit17LessonPlans from './book1-unit17-lesson-plans';

/**
 * All resources for Book 1 Unit 17 (Hobbies)
 */
export const book1Unit17Resources: TeacherResource[] = [
  ...book1Unit17VideoResources,
  ...book1Unit17GameResources,
  ...book1Unit17PdfResources,
  ...book1Unit17LessonPlans,
];

export default book1Unit17Resources;
