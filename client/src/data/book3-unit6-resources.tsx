import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 6 - WHEN IS YOUR BIRTHDAY
 * Resources including videos and games
 */

const unitNumber = '6';
const unitTitle = 'WHEN IS YOUR BIRTHDAY';

export const book3Unit6Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Days of The Week DREAM KIDS ENGLISH`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/36n93jvjkDs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/36n93jvjkDs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Birthdays Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/26gvR2GYMJ4',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/26gvR2GYMJ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DAYS OF THE WEEK - ANAGRAM`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/da5beb5765f94a33bd386a9342aa0363',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/da5beb5765f94a33bd386a9342aa0363?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS OF THE YEAR - ANAGRAM`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/248b359b2606474e9a4ddea4e239229b',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/248b359b2606474e9a4ddea4e239229b?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS OF THE YEAR`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/260a8ea6c0cd498d852ff45b78a94cc9',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/260a8ea6c0cd498d852ff45b78a94cc9?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - MONTHS OF THE YEAR`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ca775b04bdaa447c868c823b3683f13c',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ca775b04bdaa447c868c823b3683f13c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit6Resources;