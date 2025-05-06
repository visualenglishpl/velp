import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 15 - AT THE CIRCUS
 * Resources including videos and games
 */

const unitNumber = '15';
const unitTitle = 'AT THE CIRCUS';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Circus Song for Kids`,
    description: 'Fun song introducing circus vocabulary and performers',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=K7uZZcyysP8',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/K7uZZcyysP8?si=qRNRVyaeo7BU8gMd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'K7uZZcyysP8'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Circus Vocabulary Video`,
    description: 'Educational video teaching circus-related vocabulary',
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/856546',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/856546" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/856546'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Circus Vocabulary Game`,
    description: 'Interactive game to practice circus vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/94c4f083575e4321bd59f57bc024dbd3',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/94c4f083575e4321bd59f57bc024dbd3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/94c4f083575e4321bd59f57bc024dbd3?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Circus Vocabulary Match`,
    description: 'Match circus-related words with their pictures',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6c0d9d6d5b1d40b78d0d23df4539e1e1',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6c0d9d6d5b1d40b78d0d23df4539e1e1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6c0d9d6d5b1d40b78d0d23df4539e1e1?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Circus Animals Game`,
    description: 'Learn about animals commonly found in the circus',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1c724495ff684609895ed535379cbec0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1c724495ff684609895ed535379cbec0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/1c724495ff684609895ed535379cbec0?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 15
 * @returns Array of teacher resources
 */
export function getBook4Unit15Resources(): TeacherResource[] {
  return resources;
}

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;
