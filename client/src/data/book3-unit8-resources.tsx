import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit8Resources: TeacherResource[] = [
  // Videos
  {
    title: '10 to 100 Song by ELF Learning',
    description: 'Song teaching numbers from 10 to 100 for shopping',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Kn05P3da9hw'
    }
  },
  {
    title: 'How Much Is It? - RAP Song',
    description: 'Rap song teaching how to ask and answer about prices',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'MLyFZyh7mM0'
    }
  },
  {
    title: 'How Much! Classroom Skit',
    description: 'Classroom skit demonstrating shopping conversations',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'lkUVY8BJr-4'
    }
  },
  {
    title: 'The Big Numbers Song',
    description: 'Song for learning bigger numbers for shopping',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'e0dJWfQHF8Y'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Numbers 10 - Tens',
    description: 'Game for practicing counting by tens',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/38b043ed6bc04bdca87b01461e3452f7?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Numbers 10 - 100',
    description: 'Interactive game for learning numbers from 10 to 100',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/fdb7d185bcb24b23b99b889de4f0b70e?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - How Much Is It?',
    description: 'Practice asking and answering about prices',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/dcf9609f4690435197e1171ce2b68c39?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
