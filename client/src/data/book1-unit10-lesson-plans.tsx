/**
 * Book 1 Unit 10 lesson plans
 * 
 * Lesson plans for Transport
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 10 (Transport)
 */
export const book1Unit10LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '10',
    'lesson-1',
    'Weather Vocabulary Lesson',
    'Learn weather vocabulary',
    'main'
  ),
];

export default book1Unit10LessonPlans;
