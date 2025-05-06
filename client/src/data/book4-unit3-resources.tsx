import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 3 - HOME SWEET HOME
 * Resources including videos and games
 */

const unitNumber = '3';
const unitTitle = 'HOME SWEET HOME';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Rooms of the House Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qZyJPZxsmZE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qZyJPZxsmZE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'qZyJPZxsmZE'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Types of Houses`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=j31XZfPBPvc',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/j31XZfPBPvc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'j31XZfPBPvc'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Furniture Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=LoJBRS0kiW0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/LoJBRS0kiW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'LoJBRS0kiW0'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - TYPES OF HOUSES 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cbcccb9fd6d94e119677fad59f266cb0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cbcccb9fd6d94e119677fad59f266cb0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/cbcccb9fd6d94e119677fad59f266cb0?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - TYPES OF HOUSES 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/b1e0d0a301514e3683d544934b5b6fc3',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b1e0d0a301514e3683d544934b5b6fc3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/b1e0d0a301514e3683d544934b5b6fc3?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ROOMS OF HOUSES`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/b9cc3e3556ad460887c4c142019276ea',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b9cc3e3556ad460887c4c142019276ea?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/b9cc3e3556ad460887c4c142019276ea?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - OFFICE`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/2c152aa804c24e4e93a02ffc82bd898e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2c152aa804c24e4e93a02ffc82bd898e?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/2c152aa804c24e4e93a02ffc82bd898e?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-5`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - BATHROOM`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/992ac1652f2449089965650466150410',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/992ac1652f2449089965650466150410?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/992ac1652f2449089965650466150410?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-6`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PARTS OF HOUSE`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/76146409a4de4fa59a6c364e43e4eee6',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/76146409a4de4fa59a6c364e43e4eee6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/76146409a4de4fa59a6c364e43e4eee6?themeId=1&templateId=22&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 4 Unit 3
 * @returns Array of teacher resources
 */
export function getBook4Unit3Resources(): TeacherResource[] {
  return resources;
}