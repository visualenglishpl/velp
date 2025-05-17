/**
 * Book 1 Unit 5 lesson plans
 * 
 * Lesson plans for Pets and Animals
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 5 (Pets and Animals)
 */
export const book1Unit5LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '5',
    'lesson-1',
    'Pets Vocabulary Lesson',
    'Learn pet vocabulary',
    'main'
  ),
];

export default book1Unit5LessonPlans;
