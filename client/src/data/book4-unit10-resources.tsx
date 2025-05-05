import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 10 - MOTHER NATURE
 */

const unitNumber = '10';
const unitTitle = 'MOTHER NATURE';

export const book4Unit10Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-weather-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WEATHER GAME 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e01b844b81f34deca0222f6548d2b19a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e01b844b81f34deca0222f6548d2b19a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/e01b844b81f34deca0222f6548d2b19a?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-weather-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WEATHER GAME 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/584b1bd4ad394131b887c4787bf869a3',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/584b1bd4ad394131b887c4787bf869a3?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/584b1bd4ad394131b887c4787bf869a3?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-weather-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WEATHER GAME 3`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/531c7ba221c44e3389dc009f2ec114f8',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/531c7ba221c44e3389dc009f2ec114f8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/531c7ba221c44e3389dc009f2ec114f8?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-mother-nature`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - MOTHER NATURE GAME`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9c1af9a866eb4251a65afc8696916d4d',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9c1af9a866eb4251a65afc8696916d4d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9c1af9a866eb4251a65afc8696916d4d?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-lesson-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video Lesson 1`,
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/507429',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/507429" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/507429'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-lesson-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video Lesson 2`,
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/194638',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/194638" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/194638'
    }
  }
];

// Getter function for backward compatibility
export function getBook4Unit10Resources(): TeacherResource[] {
  return book4Unit10Resources;
}
