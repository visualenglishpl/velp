// This file imports and exports the resources and lesson plans for Book 6, Unit 8

import { book6Unit8Resources, pastTenseVerbsLessonPlan, talkingAboutPastActivitiesLessonPlan } from './book6-unit8-resources';

// Use type definition directly to avoid circular dependencies
type TeacherResource = {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
  lessonPlan?: any; // Using any to avoid circular import issues
};

// Use type definition directly to avoid circular dependencies
type LessonPlan = {
  id: string;
  title: string;
  duration: string;
  level: string;
  objectives: string[];
  materials: string[];
  steps: {
    title: string;
    duration: string;
    description: string;
    materials?: string[];
    instructions: string[];
  }[];
  assessmentTips: string;
  homeworkIdeas: string[];
  additionalResources?: {
    title: string;
    url: string;
  }[];
};

// Function to get lesson plans for this unit
export const getBook6Unit8LessonPlans = (): LessonPlan[] => {
  return [
    pastTenseVerbsLessonPlan,
    talkingAboutPastActivitiesLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit8Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit8Resources.map(resource => ({
    id: `book6-unit8-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit8Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  pastTenseVerbsLessonPlan,
  talkingAboutPastActivitiesLessonPlan
];
