import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Resources including videos and games
 */

const unitNumber = '12';
const unitTitle = 'WHAT DO YOU LOOK LIKE';

export const book3Unit12Resources: TeacherResource[] = [
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/35cf87e7a749442cb411eccf267de0a5',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/35cf87e7a749442cb411eccf267de0a5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/35cf87e7a749442cb411eccf267de0a5?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON - ANAGRAM`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/31c82d13f7eb4e6ba92de04172cdd2f0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/31c82d13f7eb4e6ba92de04172cdd2f0?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/31c82d13f7eb4e6ba92de04172cdd2f0?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - DESCRIBING A PERSON (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0ad1a35ddfd144828247d74b0bef4e02',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0ad1a35ddfd144828247d74b0bef4e02?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/0ad1a35ddfd144828247d74b0bef4e02?themeId=1&templateId=3&fontStackId=0'
    }
  },
  
  // External website resources
  {
    id: `book3-unit${unitNumber}-website-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Avatar Maker`,
    resourceType: 'other',
    provider: 'Avatar Maker',
    sourceUrl: 'https://avatarmaker.com/female/',
    embedCode: '<a href="https://avatarmaker.com/female/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Visit Avatar Maker Website</a>',
    content: {
      type: 'external-website',
      embedUrl: 'https://avatarmaker.com/female/'
    }
  },
  {
    id: `book3-unit${unitNumber}-website-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Wimpy Yourself`,
    resourceType: 'other',
    provider: 'Wimpy Kid',
    sourceUrl: 'https://wimpykid.com/wimpyourself/',
    embedCode: '<a href="https://wimpykid.com/wimpyourself/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Visit Wimpy Yourself Website</a>',
    content: {
      type: 'external-website',
      embedUrl: 'https://wimpykid.com/wimpyourself/'
    }
  },
  
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People: Who is it? ESL`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/YsDfuAiIzDE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/YsDfuAiIzDE?si=DL0nuZqttRyE-KGO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'YsDfuAiIzDE'
    }
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People Song | Planet Pop`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/vihFVjXGv-Y',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/vihFVjXGv-Y?si=meleODkIunjdq67D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'vihFVjXGv-Y'
    }
  }
];

export default book3Unit12Resources;
