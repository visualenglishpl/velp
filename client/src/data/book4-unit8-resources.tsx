import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 8 - ENJOY YOUR MEAL
 * Resources including videos and games
 */

const unitNumber = '8';
const unitTitle = 'ENJOY YOUR MEAL';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - British Breakfast`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qLtTUd6FPOs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qLtTUd6FPOs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'qLtTUd6FPOs'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Food Groups`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=g9-8qQkIh5k',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/g9-8qQkIh5k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'g9-8qQkIh5k'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Healthy Foods`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=pD9mk0Y_pyo',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/pD9mk0Y_pyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'pD9mk0Y_pyo'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Food Pyramid`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=nCKwUB8EVbc',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nCKwUB8EVbc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'nCKwUB8EVbc'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - BRITISH BREAKFAST`,
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
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FOOD GROUPS 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9cf0155f43aa4ff8821070d9f084aa4e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FOOD GROUPS 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9899470993214165a255330753bdd0ff',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9899470993214165a255330753bdd0ff?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9899470993214165a255330753bdd0ff?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - DRINKS VOCABULARY`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9cf0155f43aa4ff8821070d9f084aa4e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-5`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - BERRIES VOCABULARY`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a6ff7af2a86047cfbc2bc3fa0e940c96',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a6ff7af2a86047cfbc2bc3fa0e940c96?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/a6ff7af2a86047cfbc2bc3fa0e940c96?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-6`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - NUTS VOCABULARY`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/08c1c6a3d58a46419a654d194ffd9af0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/08c1c6a3d58a46419a654d194ffd9af0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/08c1c6a3d58a46419a654d194ffd9af0?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-7`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FOOD PYRAMID`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c19d7fb0540e4e269de458c2184b6624',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c19d7fb0540e4e269de458c2184b6624?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c19d7fb0540e4e269de458c2184b6624?themeId=1&templateId=22&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 8
 * @returns Array of teacher resources
 */
export function getBook4Unit8Resources(): TeacherResource[] {
  return resources;
}
