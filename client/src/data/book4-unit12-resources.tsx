import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 12 - AT THE FARM
 * Resources including videos and games
 */

const unitNumber = '12';
const unitTitle = 'AT THE FARM';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Old MacDonald Had A Farm`,
    description: 'Classic children\'s song about farm animals and the sounds they make',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ryzNlBQC1oQ',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ryzNlBQC1oQ?si=HX9eymfIK_ICYGTb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'ryzNlBQC1oQ'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals and Their Sounds`,
    description: 'Learn about different farm animals and the sounds they make',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=OXd_r7wSwuM',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/OXd_r7wSwuM?si=jokXI9rf9NIul_xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'OXd_r7wSwuM'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals for Kids`,
    description: 'Educational video teaching children about different farm animals',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=rN1QjWFx5VQ',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/rN1QjWFx5VQ?si=tGUybY0SMlUlCeE1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'rN1QjWFx5VQ'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - A Day at the Farm`,
    description: 'Learn about daily activities and routines on a farm',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=cgzAmpIDXp8',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/cgzAmpIDXp8?si=VrVzOG2X3oy8H_73" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'cgzAmpIDXp8'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-5`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Song`,
    description: 'Fun song teaching children about farm animals',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=acZfmL4SUIc',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/acZfmL4SUIc?si=zDV5u3t8jmcJyu9v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'acZfmL4SUIc'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-6`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Vocabulary`,
    description: 'Learn English vocabulary related to farm animals',
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
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Game`,
    description: 'Interactive game to practice farm animal vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9ac6bf8c618248c894a6ffaf6747f79f',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9ac6bf8c618248c894a6ffaf6747f79f?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9ac6bf8c618248c894a6ffaf6747f79f?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Match`,
    description: 'Match farm animals with their pictures',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c4c0f4a82d1e4fafa10a6cad72b201be',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c4c0f4a82d1e4fafa10a6cad72b201be?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c4c0f4a82d1e4fafa10a6cad72b201be?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Farm Animals Verbs`,
    description: 'Learn verbs associated with farm animals',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cdbb6e247e6049c0a53ab06a8ede7a00',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cdbb6e247e6049c0a53ab06a8ede7a00?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/cdbb6e247e6049c0a53ab06a8ede7a00?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 12
 * @returns Array of teacher resources
 */
export function getBook4Unit12Resources(): TeacherResource[] {
  return resources;
}
