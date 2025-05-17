/**
 * Book 1 Unit 4 lesson plans
 * 
 * Lesson plans for My House
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1LessonPlanResource } from './book1-resources-common';

/**
 * Lesson plan resources for Book 1 Unit 4 (My House)
 */
export const book1Unit4LessonPlans: TeacherResource[] = [
  createBook1LessonPlanResource(
    '4',
    'lesson-1',
    'House Vocabulary Lesson',
    'Learn parts of the house',
    'main'
  ),
];

export default book1Unit4LessonPlans;
