import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 2 - GADGETS
 */

const unitNumber = '2';
const unitTitle = 'GADGETS';

// Videos for Unit 2
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Technology Video`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/08BoI6zFDTw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/08BoI6zFDTw?si=02JYO8AjPFDcph4g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: '08BoI6zFDTw'
    }
  }
];

// Games for Unit 2
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Gadgets Game 1`,
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
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Gadgets Game 2`,
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
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Gadgets Game 3`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/96418a9e2fce4091844ac3f35a855add',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// External resources for Unit 2
export const externalResources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-external-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Find the Technology`,
    resourceType: 'other',
    provider: 'ABCya',
    sourceUrl: 'https://www.abcya.com/games/find_the_tech',
    embedCode: '<a href="https://www.abcya.com/games/find_the_tech" target="_blank">Play Find the Technology game</a>',
    content: {
      type: 'link',
      embedUrl: 'https://www.abcya.com/games/find_the_tech'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games, ...externalResources];

// Main export for backward compatibility
export const book4Unit2Resources = resources;
