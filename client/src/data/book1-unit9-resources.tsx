/**
 * Book 1 Unit 9 resources
 * 
 * Combined resources for My Family
 */
import { TeacherResource } from '@/types/TeacherResource';
import book1Unit9VideoResources from './book1-unit9-video-resources';
import book1Unit9GameResources from './book1-unit9-game-resources';
import book1Unit9PdfResources from './book1-unit9-pdf-resources';
import book1Unit9LessonPlans from './book1-unit9-lesson-plans';

/**
 * All resources for Book 1 Unit 9 (My Family)
 */
export const book1Unit9Resources: TeacherResource[] = [
  ...book1Unit9VideoResources,
  ...book1Unit9GameResources,
  ...book1Unit9PdfResources,
  ...book1Unit9LessonPlans,
];

export default book1Unit9Resources;
