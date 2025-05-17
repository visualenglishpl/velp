/**
 * Book 1 Unit 9 lesson plans
 * 
 * Lesson plans for My Family
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 9 (My Family)
 */
export const book1Unit9LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '9',
    'lesson-1',
    'Family Vocabulary Lesson',
    'Learn family vocabulary',
    'main'
  ),
];

export default book1Unit9LessonPlans;
