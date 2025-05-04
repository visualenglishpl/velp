import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 14 - MY TOWN - EXCUSE ME WHERE IS THE?
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit14Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Welcome to my town - Song',
    description: 'Engaging song about places in town',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'MB2iBFjKRQo'
    }
  },
  {
    title: 'Go Left - Go Right - Go Straight Song',
    description: 'Song teaching directions vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Who2jztho0U'
    }
  },
  {
    title: 'Video Quiz - Between, Next To, Opposite',
    description: 'Interactive quiz on prepositions of place',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'rQTgRHwTt5c'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Places in the Town',
    description: 'Interactive game for learning town vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/cd0147c3f73b4e48a9e987d05b417882?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Where Is',
    description: 'Practice asking and answering about locations',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/481081b962d1415584156c01ed0957d8?themeId=1&templateId=5&fontStackId=0'
    }
  },
];
