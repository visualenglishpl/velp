/**
 * Book 1 Unit 7 lesson plans
 * 
 * Lesson plans for Toys
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 7 (Toys)
 */
export const book1Unit7LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '7',
    'lesson-1',
    'Body Parts Vocabulary Lesson',
    'Learn body parts vocabulary',
    'main'
  ),
];

export default book1Unit7LessonPlans;
