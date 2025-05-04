import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Resources including videos and games based on the provided content
 */

export const book3Unit10Resources: TeacherResource[] = [
  // Videos
  {
    id: 'book3-unit10-video-1',
    bookId: '3',
    unitId: '10',
    title: 'GENKI - What\'s Your Favorite Subject',
    description: 'Engaging song teaching about school subjects vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/tt2_2EP7TE8',
    content: {
      type: 'youtube',
      embedId: 'tt2_2EP7TE8'
    }
  },
  {
    id: 'book3-unit10-video-2',
    bookId: '3',
    unitId: '10',
    title: 'School Subjects - Song',
    description: 'Song helping students learn different school subjects',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/Ow_gbuqQC-k',
    content: {
      type: 'youtube',
      embedId: 'Ow_gbuqQC-k'
    }
  },
  {
    id: 'book3-unit10-video-3',
    bookId: '3',
    unitId: '10',
    title: 'This is Britain - School',
    description: 'Informational video about schools in Britain',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/yMUJKH1fFF0',
    content: {
      type: 'youtube',
      embedId: 'yMUJKH1fFF0'
    }
  },
  
  // Games
  {
    id: 'book3-unit10-game-1',
    bookId: '3',
    unitId: '10',
    title: 'WORDWALL - SCHOOL SUBJECTS (1)',
    description: 'Interactive game for practicing school subject vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ab50864505224481860ed6886ac6de89',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: 'book3-unit10-game-2',
    bookId: '3',
    unitId: '10',
    title: 'WORDWALL - SCHOOL SUBJECTS (2)',
    description: 'Additional practice game for school subjects',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/ab50864505224481860ed6886ac6de89',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  }
];
