import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit12Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Describing People - Who Is It ESL',
    description: 'Learning to describe people with visual examples',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'YsDfuAiIzDE'
    }
  },
  {
    title: 'Describing People Song',
    description: 'Song by Planet Pop for describing people\'s appearances',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'vihFVjXGv-Y'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Describing a Person (1)',
    description: 'Interactive game for describing people\'s appearance',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/35cf87e7a749442cb411eccf267de0a5?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Describing a Person - Anagram (1)',
    description: 'Anagram game with vocabulary for describing people',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/31c82d13f7eb4e6ba92de04172cdd2f0?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Describing a Person (2)',
    description: 'Additional practice for describing appearance vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/0ad1a35ddfd144828247d74b0bef4e02?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'Avatar Maker',
    description: 'Create your own character with specific appearance features',
    resourceType: 'game',
    provider: 'External',
    sourceUrl: 'https://avatarmaker.com/female/'
  },
  {
    title: 'Wimpy Yourself',
    description: 'Create a Diary of a Wimpy Kid style character of yourself',
    resourceType: 'game',
    provider: 'External',
    sourceUrl: 'https://wimpykid.com/wimpyourself/'
  },
];
