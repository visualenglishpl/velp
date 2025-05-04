import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 2 - MY DAILY ROUTINE
 * Resources including videos and games
 */

const unitNumber = '2';
const unitTitle = 'MY DAILY ROUTINE';

export const book3Unit2Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Kids Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/z9DTNWzunw0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/z9DTNWzunw0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Daily Routines Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/zQOW-7tp9pE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zQOW-7tp9pE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MY DAILY ROUTINE (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/845b843e0198431893fd75db2f629ca8',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/845b843e0198431893fd75db2f629ca8?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MY DAILY ROUTINE (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0c715f5188af4ce48f9a438754451c63',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0c715f5188af4ce48f9a438754451c63?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MY DAILY ROUTINE (3)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ac822d89694c4f84b8197473578aa1a9',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ac822d89694c4f84b8197473578aa1a9?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT TIME IS IT? (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f77c368e89954bdc88c8e08e1b0a76b7',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f77c368e89954bdc88c8e08e1b0a76b7?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-5`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT TIME IS IT? (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/848d1d2c5eda466b86b8aab12ac1871e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/848d1d2c5eda466b86b8aab12ac1871e?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-6`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHAT TIME IS IT? (3)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ef31aea5a46a4920a657ade8bc365ccc',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ef31aea5a46a4920a657ade8bc365ccc?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-7`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - DAILY ROUTINES GAME`,
    resourceType: 'game',
    provider: 'Games to Learn English',
    sourceUrl: 'https://www.gamestolearnenglish.com/daily-routines/',
    embedCode: '<a href="https://www.gamestolearnenglish.com/daily-routines/" target="_blank" class="external-game-link">Open Daily Routines Game</a>'
  }
];

export default book3Unit2Resources;