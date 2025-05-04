import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit10Resources: TeacherResource[] = [
  // Videos
  {
    title: 'GENKI - What\'s your favorite subject?',
    description: 'Engaging song about school subjects with clear visuals',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'W_tb1U_Tlow'
    }
  },
  {
    title: 'Learn School Subjects Vocabulary',
    description: 'Vocabulary introduction to different school subjects',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'aHixmxhKsYk'
    }
  },
  {
    title: 'School Subjects with Peppa Pig',
    description: 'Peppa Pig shows different school subjects in a fun way',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'cmqyQSz5RVA'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - School Subjects Match-Up',
    description: 'Match school subjects with their descriptions',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/5c55e4a1d1124a87b9dc99d09a17a7dc?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Favourite School Subjects Quiz',
    description: 'A quiz to test knowledge about school subjects vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ccd09d0b7e5a479ab57519cd51d9faba?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - School Subjects Word Search',
    description: 'Find the names of different school subjects in this word search puzzle',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/b1fd8daf18c04e16bacc6b6f0cad9a1c?themeId=1&templateId=46&fontStackId=0'
    }
  },
];
