// Book 6 Unit 9 implementation file - Present Perfect - What Has Just Happened

// Implementation for Present Perfect - What Has Just Happened
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book6Unit9Resources, book6Unit9LessonPlans } from './book6-unit9-resources';

// Function to get resources for this unit
export function getBook6Unit9Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit9Resources.map(resource => ({
    ...resource,
    id: resource.id || `book6-unit9-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '9',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
}

// Function to get lesson plans for this unit
export function getBook6Unit9LessonPlans(): LessonPlan[] {
  return book6Unit9LessonPlans;
}
