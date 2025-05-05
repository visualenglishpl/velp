// Implementation file for Book 4 Unit 4 - MY FAMILY

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, externalResources } from './book4-unit4-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit4Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit4Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit4Games = (): TeacherResource[] => games;

// Function to get external resources for this unit
export const getBook4Unit4ExternalResources = (): TeacherResource[] => externalResources;

// Get the unit title
export const getBook4Unit4Title = (): string => {
  return BOOK4_UNIT_TITLES['4'] || 'MY FAMILY';
};

// Get lesson plans for this unit
export const getBook4Unit4LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('4', 'MY FAMILY');
};

// Default export for backward compatibility
export default resources;
