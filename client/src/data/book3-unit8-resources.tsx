import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Resources including videos and games based on the DOCX attachment
 */

const unitNumber = '8';
const unitTitle = "LET'S GO SHOPPING - HOW MUCH IS IT?";

export const book3Unit8Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - 10 to 100 Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/Kn05P3da9hw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Kn05P3da9hw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - How Much Is It?`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/MLyFZyh7mM0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MLyFZyh7mM0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Classroom Skit: How Much!`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/lkUVY8BJr-4',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/lkUVY8BJr-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - The Big Numbers Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/e0dJWfQHF8Y',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/e0dJWfQHF8Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 10 - TENS`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/38b043ed6bc04bdca87b01461e3452f7',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/38b043ed6bc04bdca87b01461e3452f7?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - NUMBERS 10 - 100`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/fdb7d185bcb24b23b99b889de4f0b70e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/fdb7d185bcb24b23b99b889de4f0b70e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - HOW MUCH IS IT?`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/dcf9609f4690435197e1171ce2b68c39',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/dcf9609f4690435197e1171ce2b68c39?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit8Resources;
