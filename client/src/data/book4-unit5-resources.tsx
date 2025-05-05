import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 5 - PERSONALITY
 * Resources including videos and games
 */

const unitNumber = '5';
const unitTitle = 'PERSONALITY';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Traits`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=wXJPMf5ZuMw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wXJPMf5ZuMw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'wXJPMf5ZuMw'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Types`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=D7ZjMjfasfU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/D7ZjMjfasfU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'D7ZjMjfasfU'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PERSONALITY TRAITS`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6bcdbdd1f33a4700968fcc126d42c323',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PERSONALITY GAME 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/339ab9a507314c98aa8ad268f9dbd2fc',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PERSONALITY GAME 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c6d609be7c0a4370adf35d199dd1001d',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 5
 * @returns Array of teacher resources
 */
export function getBook4Unit5Resources(): TeacherResource[] {
  return resources;
}
