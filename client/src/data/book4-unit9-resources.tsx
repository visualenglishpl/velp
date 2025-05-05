import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 9 - AT THE CAMPSITE
 */

const unitNumber = '9';
const unitTitle = 'AT THE CAMPSITE';

export const book4Unit9Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-camping-verbs`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - CAMPING VERBS`,
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
    id: `book4-unit${unitNumber}-camping-vocabulary`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - CAMPING VOCABULARY`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6433e17ad3f84d538f1d5e9eb5d6b4e0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-camping-video`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Camping Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=H9hqzIx43_0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/H9hqzIx43_0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'H9hqzIx43_0'
    }
  }
];

// Getter function for backward compatibility
export function getBook4Unit9Resources(): TeacherResource[] {
  return book4Unit9Resources;
}
