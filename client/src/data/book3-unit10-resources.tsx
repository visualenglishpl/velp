import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Resources including videos and games
 */

const unitNumber = '10';
const unitTitle = 'MY FAVOURITE SUBJECT';

export const book3Unit10Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What's Your Favorite Subject?`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/tt2_2EP7TE8',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/tt2_2EP7TE8?si=k12loaQZvdWYfyr7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'tt2_2EP7TE8',
      embedUrl: 'https://www.youtube.com/embed/tt2_2EP7TE8'
    }
  },
  {
    id: `book3-unit${unitNumber}-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - School Subjects Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/Ow_gbuqQC-k',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ow_gbuqQC-k?si=C5oiYeK8aU2sXVpv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'Ow_gbuqQC-k',
      embedUrl: 'https://www.youtube.com/embed/Ow_gbuqQC-k'
    }
  },
  {
    id: `book3-unit${unitNumber}-video-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - This is Britain - School`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/yMUJKH1fFF0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/yMUJKH1fFF0?si=BYMeFNXOO4OcD5nx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'yMUJKH1fFF0',
      embedUrl: 'https://www.youtube.com/embed/yMUJKH1fFF0'
    }
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SCHOOL SUBJECTS (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ab50864505224481860ed6886ac6de89',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - SCHOOL SUBJECTS (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ab50864505224481860ed6886ac6de89',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

export default book3Unit10Resources;
