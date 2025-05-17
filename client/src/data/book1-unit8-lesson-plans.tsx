/**
 * Book 1 Unit 8 lesson plans
 * 
 * Lesson plans for Numbers
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 8 (Numbers)
 */
export const book1Unit8LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '8',
    'lesson-1',
    'Clothing Vocabulary Lesson',
    'Learn clothing vocabulary',
    'main'
  ),
];

export default book1Unit8LessonPlans;
