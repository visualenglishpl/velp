/**
 * Book 1 Unit 2 lesson plans
 * 
 * Lesson plans for My School
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 2 (My School)
 */
export const book1Unit2LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '2',
    'lesson-1',
    'Classroom Objects Lesson',
    'Learn classroom vocabulary',
    'main'
  ),
];

export default book1Unit2LessonPlans;
