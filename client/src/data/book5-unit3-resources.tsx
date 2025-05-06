import { TeacherResource } from '@/components/TeacherResources';
import { BOOK5_UNIT_TITLES } from './book5-resources-common';

/**
 * Book 5 Unit 3 - HOBBIES AND LEISURE
 * Resources including videos and games
 */

const unitNumber = '3';
const unitTitle = BOOK5_UNIT_TITLES[unitNumber];

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book5-unit${unitNumber}-video-1`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Hobbies Video`,
    description: 'Educational video about hobbies and leisure activities',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/N0YJpQKlRVs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/N0YJpQKlRVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://www.youtube.com/embed/N0YJpQKlRVs'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book5-unit${unitNumber}-game-1`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Gaming Vocabulary Game`,
    description: 'Interactive game to practice gaming vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e4c95330e95040728ac8cee60b69ec5f',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e4c95330e95040728ac8cee60b69ec5f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/e4c95330e95040728ac8cee60b69ec5f?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book5-unit${unitNumber}-game-2`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Gaming Tools Vocabulary`,
    description: 'Practice gaming tools vocabulary with an interactive game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8a3d7e16b671463f86b3dfa6f0cf2100',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 5 Unit 3
 * @returns Array of teacher resources
 */
export function getBook5Unit3Resources(): TeacherResource[] {
  return resources;
}

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;
