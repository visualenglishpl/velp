// Implementation file for Book 4 Unit 7 - FASHION CRAZY

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, externalResources } from './book4-unit7-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit7Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit7Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit7Games = (): TeacherResource[] => games;

// Function to get external resources for this unit
export const getBook4Unit7ExternalResources = (): TeacherResource[] => externalResources;

// Get the unit title
export const getBook4Unit7Title = (): string => {
  return BOOK4_UNIT_TITLES['7'] || 'FASHION CRAZY';
};

// Get lesson plans for this unit
export const getBook4Unit7LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('7', 'FASHION CRAZY');
};

// Default export for backward compatibility
export default resources;
