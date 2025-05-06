import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 14 - WHAT CAN YOU DO
 * Resources including videos and games
 */

const unitNumber = '14';
const unitTitle = 'WHAT CAN YOU DO';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I Can Sing a Rainbow`,
    description: 'Fun song teaching children about abilities and actions',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=radrRGGe-J0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/radrRGGe-J0?si=ndOXJYESeEbYT_kX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'radrRGGe-J0'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I Can Verbs Game`,
    description: 'Interactive game to practice "I can" with different verbs',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cb60e7edbea74d8d81417cd3eeef28ed',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cb60e7edbea74d8d81417cd3eeef28ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/cb60e7edbea74d8d81417cd3eeef28ed?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I Can Verbs Match`,
    description: 'Match "I can" phrases with their corresponding images',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/29b2dad99a9d447f8ea8823024d19216',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/29b2dad99a9d447f8ea8823024d19216?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/29b2dad99a9d447f8ea8823024d19216?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 14
 * @returns Array of teacher resources
 */
export function getBook4Unit14Resources(): TeacherResource[] {
  return resources;
}

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;
