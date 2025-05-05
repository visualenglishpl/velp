import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 14 - MY TOWN - EXCUSE ME WHERE IS THE
 * Resources including videos and games
 */

const unitNumber = '14';
const unitTitle = 'MY TOWN - EXCUSE ME WHERE IS THE';

export const book3Unit14Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Welcome to my town`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/MB2iBFjKRQo',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MB2iBFjKRQo?si=ubg1PhldgkttYsWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'MB2iBFjKRQo'
    }
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Go left - go right - go straight`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/Who2jztho0U',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Who2jztho0U?si=EpHFn_-zf4iryw-R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'Who2jztho0U'
    }
  },
  {
    id: `book3-unit${unitNumber}-video-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Between Next To Opposite`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/rQTgRHwTt5c',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/rQTgRHwTt5c?si=t7J-X-2IRna6HRwQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'rQTgRHwTt5c'
    }
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - PLACES IN THE TOWN`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/cd0147c3f73b4e48a9e987d05b417882',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cd0147c3f73b4e48a9e987d05b417882?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'external-embed',
      embedUrl: 'https://wordwall.net/embed/cd0147c3f73b4e48a9e987d05b417882?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - WHERE IS`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/481081b962d1415584156c01ed0957d8',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/481081b962d1415584156c01ed0957d8?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'external-embed',
      embedUrl: 'https://wordwall.net/embed/481081b962d1415584156c01ed0957d8?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

export default book3Unit14Resources;
