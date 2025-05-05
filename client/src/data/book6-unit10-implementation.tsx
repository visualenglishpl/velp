// Book 6 Unit 10 implementation file - Are You Tech Savvy

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book6Unit10Resources, book6Unit10LessonPlans } from './book6-unit10-resources';

// Function to get resources for this unit
export function getBook6Unit10Resources(): TeacherResource[] {
  // Return resources with proper typing and ensure all properties are set
  return book6Unit10Resources.map(resource => ({
    ...resource,
    id: resource.id || `book6-unit10-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '10'
  }));
}

// Function to get lesson plans for this unit
export function getBook6Unit10LessonPlans(): LessonPlan[] {
  return book6Unit10LessonPlans;
}
