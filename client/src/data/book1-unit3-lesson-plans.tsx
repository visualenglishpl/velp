/**
 * Book 1 Unit 3 lesson plans
 * 
 * Lesson plans for Food
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 3 (Food)
 */
export const book1Unit3LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '3',
    'lesson-1',
    'Food Vocabulary Lesson',
    'Learn food vocabulary',
    'main'
  ),
];

export default book1Unit3LessonPlans;
