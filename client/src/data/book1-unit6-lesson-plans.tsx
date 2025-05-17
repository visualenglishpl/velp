/**
 * Book 1 Unit 6 lesson plans
 * 
 * Lesson plans for My Favourite Colour
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 6 (My Favourite Colour)
 */
export const book1Unit6LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '6',
    'lesson-1',
    'Colors Vocabulary Lesson',
    'Learn color vocabulary',
    'main'
  ),
];

export default book1Unit6LessonPlans;
