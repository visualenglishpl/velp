// Implementation file for Book 4 Unit 5 - PERSONALITY

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, externalResources } from './book4-unit5-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit5Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit5Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit5Games = (): TeacherResource[] => games;

// Function to get external resources for this unit
export const getBook4Unit5ExternalResources = (): TeacherResource[] => externalResources;

// Get the unit title
export const getBook4Unit5Title = (): string => {
  return BOOK4_UNIT_TITLES['5'] || 'PERSONALITY';
};

// Get lesson plans for this unit
export const getBook4Unit5LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('5', 'PERSONALITY');
};

// Default export for backward compatibility
export default resources;
