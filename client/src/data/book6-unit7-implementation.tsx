// Book 6 Unit 7 implementation file - What Your Body Can Do

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { bodyActionsLessonPlan, physicalAbilitiesLessonPlan, book6Unit7Resources } from './book6-unit7-resources';

// Function to get lesson plans for this unit
export function getBook6Unit7LessonPlans(): LessonPlan[] {
  return [
    bodyActionsLessonPlan,
    physicalAbilitiesLessonPlan
  ];
}

// Function to get additional resources for the unit
export function getBook6Unit7Resources(): TeacherResource[] {
  // Return resources with proper typing for TeacherResource
  return book6Unit7Resources.map(resource => ({
    ...resource,
    id: `book6-unit7-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '7'
  }));
}
