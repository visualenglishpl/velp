/**
 * Book 1 Unit 1 lesson plans
 * 
 * Lesson plans for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '1',
    'lesson-1',
    'Greetings Lesson Plan',
    'Learn basic greetings in English',
    'main'
  ),
];

export default book1Unit1LessonPlans;
