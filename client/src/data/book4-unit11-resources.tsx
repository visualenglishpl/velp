import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 11 - DAILY ROUTINES
 */

const unitNumber = '11';
const unitTitle = 'DAILY ROUTINES';

export const book4Unit11Resources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-daily-routines-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - DAILY ROUTINES GAME 1`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/06b2e108c57843bc86f50245c245854a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/06b2e108c57843bc86f50245c245854a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/06b2e108c57843bc86f50245c245854a?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-daily-routines-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - DAILY ROUTINES GAME 2`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/459e14c3d21a459f9423a4eb7097e5fc',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/459e14c3d21a459f9423a4eb7097e5fc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/459e14c3d21a459f9423a4eb7097e5fc?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-daily-routines-video`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Daily Routines Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=z9DTNWzunw0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/z9DTNWzunw0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'z9DTNWzunw0'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-lesson`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Video Lesson`,
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/666270',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/666270" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/666270'
    }
  },
  {
    id: `book4-unit${unitNumber}-daily-routines-game`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Daily Routines Game`,
    resourceType: 'game',
    provider: 'Games to Learn English',
    sourceUrl: 'https://www.gamestolearnenglish.com/daily-routines/',
    embedCode: '<a href="https://www.gamestolearnenglish.com/daily-routines/" target="_blank">Daily Routines Game</a>',
    content: {
      type: 'link',
      embedUrl: 'https://www.gamestolearnenglish.com/daily-routines/'
    }
  }
];

// Getter function for backward compatibility
export function getBook4Unit11Resources(): TeacherResource[] {
  return book4Unit11Resources;
}
