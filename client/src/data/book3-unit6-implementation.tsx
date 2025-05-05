/**
 * Visual English Book 3, Unit 6 - WHEN IS YOUR BIRTHDAY
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit6Resources from './book3-unit6-resources';

const unitNumber = '6';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'WHEN IS YOUR BIRTHDAY';

// Function to get resources for this unit
export const getBook3Unit6Resources = (): TeacherResource[] => {
  return book3Unit6Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit6-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '6',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
};
