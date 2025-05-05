import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 13 - AT THE PLAYGROUND
 */

const unitNumber = '13';
const unitTitle = 'AT THE PLAYGROUND';

export const book4Unit13Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-playground-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - AT THE PLAYGROUND GAME 1`,
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
    id: `book4-unit${unitNumber}-playground-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - AT THE PLAYGROUND GAME 2`,
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

// Getter function for backward compatibility
export function getBook4Unit13Resources(): TeacherResource[] {
  return book4Unit13Resources;
}
