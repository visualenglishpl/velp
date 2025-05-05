/**
 * Implementation file for Book 4 Unit 7 - Fashion Crazy
 * 
 * This file imports and re-exports resources for Book 4 Unit 7
 */

import { TeacherResource } from "../types/teacher-resources";
import { 
  book4Unit7Resources,
  getBook4Unit7Resources,
  book4Unit7LessonPlans,
  getBook4Unit7LessonPlans 
} from "./book4-unit7-resources";

/**
 * Re-export resources and functions for Book 4 Unit 7
 */
export {
  book4Unit7Resources,
  getBook4Unit7Resources,
  book4Unit7LessonPlans,
  getBook4Unit7LessonPlans
};

/**
 * Get all teaching resources for Book 4 Unit 7 (combined resources and lesson plans)
 * @returns Combined array of all teaching resources
 */
export function getAllBook4Unit7Resources(): TeacherResource[] {
  return [...book4Unit7Resources, ...book4Unit7LessonPlans];
}
