// This file imports and exports the resources and lesson plans for Book 6, Unit 2

import React from 'react';
import { book6Unit2Resources, householdAppliancesLessonPlan, appliancesEnergyLessonPlan } from './book6-unit2-resources';
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Function to get lesson plans for this unit
export const getBook6Unit2LessonPlans = (): LessonPlan[] => {
  return [
    householdAppliancesLessonPlan,
    appliancesEnergyLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit2Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit2Resources.map(resource => ({
    id: `book6-unit2-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit2Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  householdAppliancesLessonPlan,
  appliancesEnergyLessonPlan
];
