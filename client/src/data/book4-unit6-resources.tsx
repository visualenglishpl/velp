import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 6 - COLLECTIONS
 * Resources including videos and games
 */

const unitNumber = '6';
const unitTitle = 'COLLECTIONS';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Coin Collections`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=DMKcEdjZKEs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DMKcEdjZKEs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'DMKcEdjZKEs'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Stamp Collecting`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=fXUsuyvtT0c',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/fXUsuyvtT0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'fXUsuyvtT0c'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - COLLECTIONS GAME`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/5329387/collections',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e4ce3183f5944e87823d6fef00f3f7b3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/e4ce3183f5944e87823d6fef00f3f7b3?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - COLLECTING THINGS`,
    resourceType: 'game',
    provider: 'Kahoot',
    sourceUrl: 'https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300',
    embedCode: '<iframe src="https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'external',
      embedUrl: 'https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 6
 * @returns Array of teacher resources
 */
export function getBook4Unit6Resources(): TeacherResource[] {
  return resources;
}
