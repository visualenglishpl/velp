// Implementation file for Book 4 Unit 2 - GADGETS

import { TeacherResource } from '@/components/TeacherResources';
import { resources, videos, games, externalResources } from './book4-unit2-resources';
import { BOOK4_UNIT_TITLES } from './book4-resources-common';
import { generateDefaultBook4UnitLessonPlans } from './book4-resources-common';

// Function to get all resources for this unit
export const getBook4Unit2Resources = (): TeacherResource[] => resources;

// Function to get videos for this unit
export const getBook4Unit2Videos = (): TeacherResource[] => videos;

// Function to get games for this unit
export const getBook4Unit2Games = (): TeacherResource[] => games;

// Function to get external resources for this unit
export const getBook4Unit2ExternalGames = (): TeacherResource[] => externalResources;

// Get the unit title
export const getBook4Unit2Title = (): string => {
  return BOOK4_UNIT_TITLES['2'] || 'GADGETS';
};

// Get lesson plans for this unit
export const getBook4Unit2LessonPlans = () => {
  return generateDefaultBook4UnitLessonPlans('2', 'GADGETS');
};

// Default export for backward compatibility
export default resources;
