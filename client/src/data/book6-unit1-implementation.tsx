// This file imports and exports the resources and lesson plans for Book 6, Unit 1

import React from 'react';
import { book6Unit1Resources, jobsOccupationsLessonPlan, jobSkillsLessonPlan } from './book6-unit1-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Function to get lesson plans for this unit
export const getBook6Unit1LessonPlans = (): LessonPlan[] => {
  return [
    jobsOccupationsLessonPlan,
    jobSkillsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit1Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit1Resources.map(resource => ({
    id: `book6-unit1-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit1Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  jobsOccupationsLessonPlan,
  jobSkillsLessonPlan
];
