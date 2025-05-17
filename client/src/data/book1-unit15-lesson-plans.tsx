/**
 * Book 1 Unit 15 lesson plans
 * 
 * Lesson plans for Jobs
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 15 (Jobs)
 */
export const book1Unit15LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '15',
    'lesson-1',
    'Daily Routines Lesson',
    'Learn daily routines vocabulary',
    'main'
  ),
];

export default book1Unit15LessonPlans;
