/**
 * Book 1 Unit 12 lesson plans
 * 
 * Lesson plans for My Body
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 12 (My Body)
 */
export const book1Unit12LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '12',
    'lesson-1',
    'Months of the Year Lesson',
    'Learn months of the year',
    'main'
  ),
];

export default book1Unit12LessonPlans;
