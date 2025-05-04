import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Resources including videos and games based on the DOCX attachment
 */

const unitNumber = '12';
const unitTitle = 'WHAT DO YOU LOOK LIKE';

export const book3Unit12Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People ESL Video`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/YsDfuAiIzDE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/YsDfuAiIzDE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/vihFVjXGv-Y',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/vihFVjXGv-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/35cf87e7a749442cb411eccf267de0a5',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/35cf87e7a749442cb411eccf267de0a5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON - ANAGRAM`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/31c82d13f7eb4e6ba92de04172cdd2f0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/31c82d13f7eb4e6ba92de04172cdd2f0?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME - Avatar Maker`,
    resourceType: 'game',
    provider: 'External',
    sourceUrl: 'https://avatarmaker.com/female/',
    embedCode: '<iframe style="max-width:100%" src="https://avatarmaker.com/female/" width="800" height="600" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0ad1a35ddfd144828247d74b0bef4e02',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0ad1a35ddfd144828247d74b0bef4e02?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit12Resources;
