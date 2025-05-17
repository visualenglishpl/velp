/**
 * Book 1 Unit 14 resources
 * 
 * Combined resources for Daily Routine
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit14VideoResources from './book1-unit14-video-resources';
import book1Unit14GameResources from './book1-unit14-game-resources';
import book1Unit14PdfResources from './book1-unit14-pdf-resources';
import book1Unit14LessonPlans from './book1-unit14-lesson-plans';

/**
 * All resources for Book 1 Unit 14 (Daily Routine)
 */
export const book1Unit14Resources: TeacherResource[] = [
  ...book1Unit14VideoResources,
  ...book1Unit14GameResources,
  ...book1Unit14PdfResources,
  ...book1Unit14LessonPlans,
];

export default book1Unit14Resources;
