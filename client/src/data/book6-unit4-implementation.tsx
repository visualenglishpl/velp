// This file imports and exports the resources and lesson plans for Book 6, Unit 4

import React from 'react';
import { book6Unit4Resources, animalClassificationLessonPlan, animalAdaptationsLessonPlan } from './book6-unit4-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Function to get lesson plans for this unit
export const getBook6Unit4LessonPlans = (): LessonPlan[] => {
  return [
    animalClassificationLessonPlan,
    animalAdaptationsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit4Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit4Resources.map(resource => ({
    id: `book6-unit4-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit4Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  animalClassificationLessonPlan,
  animalAdaptationsLessonPlan
];
