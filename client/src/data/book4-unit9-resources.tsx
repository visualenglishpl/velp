import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 9 - CAMPING
 * Resources including videos and games
 */

const unitNumber = '9';
const unitTitle = 'CAMPING';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Introduction to Camping`,
    description: 'Learn camping basics and essential outdoor skills',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=H9hqzIx43_0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/H9hqzIx43_0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'H9hqzIx43_0'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Camping Safety Tips`,
    description: 'Learn essential safety tips for camping trips',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=xx0U66Z7nLU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xx0U66Z7nLU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'xx0U66Z7nLU'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Camping Verbs Game`,
    description: 'Learn and practice verbs related to camping activities',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/26789cf0b8d648709a7ac5457a9bbfa6',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Camping Vocabulary Game`,
    description: 'Interactive game to practice camping-related vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6433e17ad3f84d538f1d5e9eb5d6b4e0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;

/**
 * Get all resources for Book 4 Unit 9
 * @returns Array of teacher resources
 */
export function getBook4Unit9Resources(): TeacherResource[] {
  return resources;
}