import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 11 - SHOPPING
 * Resources including videos and games
 */

const unitNumber = '11';
const unitTitle = 'SHOPPING';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: 'Shopping Vocabulary',
    description: 'Essential vocabulary for shopping in English',
    resourceType: 'video',
    content: {
      type: 'youtube',
      embedId: 'placeholder'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: 'Shopping Vocabulary Game',
    description: 'Interactive game to practice shopping vocabulary',
    resourceType: 'game',
    content: {
      type: 'iframe',
      embedUrl: 'placeholder'
    }
  }
];

// Lesson plans for this unit
export const lessonPlans: TeacherResource[] = [];

// Combine all resources for this unit
export const resources: TeacherResource[] = [...videos, ...games];

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;

/**
 * Get all resources for this unit
 * @returns Array of teacher resources
 */
export function getResources(): TeacherResource[] {
  return resources;
}

/**
 * Get lesson plans for this unit
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return lessonPlans;
}

// Default export for backward compatibility
export default resources;