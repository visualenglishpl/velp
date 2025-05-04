import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit10Resources: TeacherResource[] = [
  // Videos
  {
    title: 'What\'s Your Favorite Subject - GENKI Song',
    description: 'Engaging song teaching about school subjects vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'tt2_2EP7TE8'
    }
  },
  {
    title: 'School Subjects - Song',
    description: 'Song helping students learn different school subjects',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Ow_gbuqQC-k'
    }
  },
  {
    title: 'This is Britain - School',
    description: 'Informational video about schools in Britain',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'yMUJKH1fFF0'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - School Subjects (1)',
    description: 'Interactive game for practicing school subject vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - School Subjects (2)',
    description: 'Additional practice game for school subjects',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ab50864505224481860ed6886ac6de89?themeId=1&templateId=5&fontStackId=0'
    }
  },
];
