/**
 * Book 1 Unit 11 resources
 * 
 * Combined resources for Weather
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit11VideoResources from './book1-unit11-video-resources';
import book1Unit11GameResources from './book1-unit11-game-resources';
import book1Unit11PdfResources from './book1-unit11-pdf-resources';
import book1Unit11LessonPlans from './book1-unit11-lesson-plans';

/**
 * All resources for Book 1 Unit 11 (Weather)
 */
export const book1Unit11Resources: TeacherResource[] = [
  ...book1Unit11VideoResources,
  ...book1Unit11GameResources,
  ...book1Unit11PdfResources,
  ...book1Unit11LessonPlans,
];

export default book1Unit11Resources;
