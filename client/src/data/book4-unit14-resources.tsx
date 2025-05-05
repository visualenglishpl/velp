import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 14 - WHAT CAN YOU DO
 */

const unitNumber = '14';
const unitTitle = 'WHAT CAN YOU DO';

export const book4Unit14Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-i-can-verbs-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I CAN VERBS GAME 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cb60e7edbea74d8d81417cd3eeef28ed',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cb60e7edbea74d8d81417cd3eeef28ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/cb60e7edbea74d8d81417cd3eeef28ed?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-i-can-verbs-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I CAN VERBS GAME 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/29b2dad99a9d447f8ea8823024d19216',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/29b2dad99a9d447f8ea8823024d19216?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/29b2dad99a9d447f8ea8823024d19216?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-i-can-video`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - I Can Actions Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=radrRGGe-J0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/radrRGGe-J0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'radrRGGe-J0'
    }
  }
];

// Getter function for backward compatibility
export function getBook4Unit14Resources(): TeacherResource[] {
  return book4Unit14Resources;
}
