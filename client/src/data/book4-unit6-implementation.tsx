// Implementation file for Book 4 Unit 6 - MY COLLECTIONS

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, externalResources } from './book4-unit6-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit6Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit6Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit6Games = (): TeacherResource[] => games;

// Function to get external resources for this unit
export const getBook4Unit6ExternalResources = (): TeacherResource[] => externalResources;

// Get the unit title
export const getBook4Unit6Title = (): string => {
  return BOOK4_UNIT_TITLES['6'] || 'MY COLLECTIONS';
};

// Get lesson plans for this unit
export const getBook4Unit6LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('6', 'MY COLLECTIONS');
};

// Default export for backward compatibility
export default resources;
