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
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Shopping Vocabulary`,
    description: 'Essential vocabulary for shopping in English',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=aJGKNF4aBbI',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aJGKNF4aBbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'aJGKNF4aBbI'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - At the Supermarket`,
    description: 'Useful phrases for shopping at a supermarket',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=uSXzPBN7FIQ',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/uSXzPBN7FIQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'uSXzPBN7FIQ'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Shopping Vocabulary`,
    description: 'Interactive game to practice shopping vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cac34c1de73e48418252f6a0ec5fa53e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cac34c1de73e48418252f6a0ec5fa53e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/cac34c1de73e48418252f6a0ec5fa53e?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Shopping Conversation`,
    description: 'Practice shopping dialogue and phrases',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/559bfc50cfc14fe2916a6c2aa20ee41f',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/559bfc50cfc14fe2916a6c2aa20ee41f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/559bfc50cfc14fe2916a6c2aa20ee41f?themeId=1&templateId=3&fontStackId=0'
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