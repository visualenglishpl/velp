// This file contains implementation details for Book 6, Unit 6 (In the Kitchen)

import { LessonPlan } from "@/components/LessonPlanTemplate";
import { kitchenVocabularyLessonPlan, cookingVerbsLessonPlan, book6Unit6Resources } from "./book6-unit6-resources";

// Function to get the lesson plans for the unit
export function getBook6Unit6LessonPlans(): LessonPlan[] {
  // Return the two 45-minute lesson plans for this unit
  return [
    kitchenVocabularyLessonPlan,
    cookingVerbsLessonPlan
  ];
}

// Function to get additional resources for the unit
export function getBook6Unit6Resources() {
  // Return resources with proper typing for TeacherResource
  return book6Unit6Resources.map(resource => ({
    ...resource,
    id: `book6-unit6-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '6'
  }));
}
