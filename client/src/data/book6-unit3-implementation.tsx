// This file imports and exports the resources and lesson plans for Book 6, Unit 3

import React from 'react';
import { book6Unit3Resources, futureTenseLessonPlan, futurePlansLessonPlan } from './book6-unit3-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Function to get lesson plans for this unit
export const getBook6Unit3LessonPlans = (): LessonPlan[] => {
  return [
    futureTenseLessonPlan,
    futurePlansLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit3Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit3Resources.map(resource => ({
    id: `book6-unit3-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit3Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  futureTenseLessonPlan,
  futurePlansLessonPlan
];
