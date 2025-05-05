// Implementation file for Book 4 Unit 15 - AT THE CIRCUS

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, lessons } from './book4-unit15-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit15Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit15Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit15Games = (): TeacherResource[] => games;

// Function to get lessons for this unit
export const getBook4Unit15Lessons = (): TeacherResource[] => lessons;

// Get the unit title
export const getBook4Unit15Title = (): string => {
  return BOOK4_UNIT_TITLES['15'] || 'AT THE CIRCUS';
};

// Get lesson plans for this unit
export const getBook4Unit15LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('15', 'AT THE CIRCUS');
};

// Default export for backward compatibility
export default resources;
