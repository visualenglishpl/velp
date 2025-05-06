import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 2 - GADGETS
 * Resources including videos and games
 */

const unitNumber = '2';
const unitTitle = 'GADGETS';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Gadgets and Technology`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=08BoI6zFDTw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/08BoI6zFDTw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: '08BoI6zFDTw'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Technology Video`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=BsK4tX28Jcs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/BsK4tX28Jcs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'BsK4tX28Jcs'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - GADGETS 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9b778eef10ff453b8ef30da1d667dadb',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9b778eef10ff453b8ef30da1d667dadb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9b778eef10ff453b8ef30da1d667dadb?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - GADGETS 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/7543280a4eab4edf90f4cbbe14a8f771',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7543280a4eab4edf90f4cbbe14a8f771?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/7543280a4eab4edf90f4cbbe14a8f771?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - GADGETS 3`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/96418a9e2fce4091844ac3f35a855add',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FIND THE TECHNOLOGY`,
    resourceType: 'game',
    provider: 'ABCya',
    sourceUrl: 'https://www.abcya.com/games/find_the_tech',
    embedCode: '<iframe style="max-width:100%" src="https://www.abcya.com/games/find_the_tech" width="800" height="600" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'external',
      embedUrl: 'https://www.abcya.com/games/find_the_tech'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 2
 * @returns Array of teacher resources
 */
export function getBook4Unit2Resources(): TeacherResource[] {
  return resources;
}