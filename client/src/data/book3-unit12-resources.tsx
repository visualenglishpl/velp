import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Resources including videos and games
 */

const unitNumber = '12';
const unitTitle = 'WHAT DO YOU LOOK LIKE';

export const book3Unit12Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People: Who is it?`,
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
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/35cf87e7a749442cb411eccf267de0a5',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/35cf87e7a749442cb411eccf267de0a5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON - ANAGRAM (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/31c82d13f7eb4e6ba92de04172cdd2f0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/31c82d13f7eb4e6ba92de04172cdd2f0?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Avatar Maker`,
    resourceType: 'game',
    provider: 'External Site',
    sourceUrl: 'https://avatarmaker.com/female/',
    embedCode: '<a href="https://avatarmaker.com/female/" target="_blank" class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">Open Avatar Maker</a>'
  },
  {
    id: `book3-unit${unitNumber}-game-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Wimpy Yourself`,
    resourceType: 'game',
    provider: 'External Site',
    sourceUrl: 'https://wimpykid.com/wimpyourself/',
    embedCode: '<a href="https://wimpykid.com/wimpyourself/" target="_blank" class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">Open Wimpy Yourself</a>'
  },
  {
    id: `book3-unit${unitNumber}-game-5`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON - ANAGRAM (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0ad1a35ddfd144828247d74b0bef4e02',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0ad1a35ddfd144828247d74b0bef4e02?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

export default book3Unit12Resources;