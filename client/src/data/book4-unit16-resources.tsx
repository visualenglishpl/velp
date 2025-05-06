import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 16 - FREE TIME ACTIVITIES
 * Resources including videos and games
 */

const unitNumber = '16';
const unitTitle = 'FREE TIME ACTIVITIES';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Free Time Activities Video`,
    description: 'Educational video teaching vocabulary related to free time and hobbies',
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/692775',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/692775" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/692775'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Free Time Activities Game`,
    description: 'Interactive game to practice free time activity vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ba588163d9c4497d9f86c6aca1479354',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ba588163d9c4497d9f86c6aca1479354?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/ba588163d9c4497d9f86c6aca1479354?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Free Time Activities Match`,
    description: 'Match free time activities with their corresponding images',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9d97f106652e47cd86c4416269c4fd86',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9d97f106652e47cd86c4416269c4fd86?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9d97f106652e47cd86c4416269c4fd86?themeId=1&templateId=38&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 16
 * @returns Array of teacher resources
 */
export function getBook4Unit16Resources(): TeacherResource[] {
  return resources;
}

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;
