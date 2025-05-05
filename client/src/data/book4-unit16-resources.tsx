import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 16 - FREE TIME ACTIVITIES
 */

const unitNumber = '16';
const unitTitle = 'FREE TIME ACTIVITIES';

export const book4Unit16Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-free-time-activities-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FREE TIME ACTIVITIES GAME 1`,
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
    id: `book4-unit${unitNumber}-free-time-activities-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - FREE TIME ACTIVITIES GAME 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9d97f106652e47cd86c4416269c4fd86',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9d97f106652e47cd86c4416269c4fd86?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9d97f106652e47cd86c4416269c4fd86?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-lesson`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video Lesson`,
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

// Getter function for backward compatibility
export function getBook4Unit16Resources(): TeacherResource[] {
  return book4Unit16Resources;
}
