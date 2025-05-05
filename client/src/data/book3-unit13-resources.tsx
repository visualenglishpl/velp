import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 13 - ANIMAL BODY PARTS
 * Resources including videos and games
 */

const unitNumber = '13';
const unitTitle = 'ANIMAL BODY PARTS';

export const book3Unit13Resources: TeacherResource[] = [
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ANIMAL BODY PARTS (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/57658f0b3d9b4515b8df3df9b939d23f',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/57658f0b3d9b4515b8df3df9b939d23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ANIMAL BODY PARTS (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6a89079f91e04dfa9ddef933b9f8bdef',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6a89079f91e04dfa9ddef933b9f8bdef?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - ANIMAL BODY PARTS - LANDSCAPES`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/3166dd8c0aca41c49e67c931b15f33e5',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3166dd8c0aca41c49e67c931b15f33e5?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  
  // ISL Collective Video Lessons
  {
    id: `book3-unit${unitNumber}-video-lesson-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ISL Collective Video Lesson 1`,
    resourceType: 'lesson',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/486113',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/486113" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-lesson-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ISL Collective Video Lesson 2`,
    resourceType: 'lesson',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/486106',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/486106" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>'
  }
];

export default book3Unit13Resources;
