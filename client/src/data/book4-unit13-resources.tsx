import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 13 - AT THE PLAYGROUND
 * Resources including videos and games
 */

const unitNumber = '13';
const unitTitle = 'AT THE PLAYGROUND';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Playground Vocabulary`,
    description: 'Learn English vocabulary related to playground equipment and activities',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_TkfQ3ditHU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_TkfQ3ditHU?si=B_2QP0CiPj-C7ZzS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: '_TkfQ3ditHU'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - At The Playground Song`,
    description: 'Fun song about playground activities for young learners',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=H76AjAVs-4A',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/H76AjAVs-4A?si=YdXx9-fxgx1d2Nh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'H76AjAVs-4A'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Playground Safety Video`,
    description: 'Educational video about playground safety rules for children',
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/749157',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/749157" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/749157'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animal Vocabulary`,
    description: 'Educational video teaching vocabulary related to farm animals',
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/433446',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/433446" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/433446'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Playground Vocabulary Game`,
    description: 'Interactive matching game for playground vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c50669484ab247c4ab66b98e3c94f4af',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c50669484ab247c4ab66b98e3c94f4af?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c50669484ab247c4ab66b98e3c94f4af?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Playground Activities Match`,
    description: 'Match playground activities with their corresponding images',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ca514af1b9ce49429181a2475142de6a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ca514af1b9ce49429181a2475142de6a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/ca514af1b9ce49429181a2475142de6a?themeId=1&templateId=38&fontStackId=0'
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
 * Get all resources for Book 4 Unit 13
 * @returns Array of teacher resources
 */
export function getBook4Unit13Resources(): TeacherResource[] {
  return resources;
}