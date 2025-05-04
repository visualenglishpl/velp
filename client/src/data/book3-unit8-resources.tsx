import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit8Resources: TeacherResource[] = [
  // Videos
  {
    title: 'ELF Learning - 10 to 100 Song',
    description: 'Learn to count by tens from 10 to 100 with this catchy song',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '8WWHpBs2iiw'
    }
  },
  {
    title: 'Let\'s Go Shopping Song',
    description: 'A fun song teaching shopping phrases and vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'dlGjV_c0H7I'
    }
  },
  {
    title: 'Money Song - Bills and Coins',
    description: 'Learn about different money denominations through a catchy song',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'vs0-3iKWOWg'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Shopping Vocabulary',
    description: 'Interactive game to learn shopping vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/cb1fd923ebdd47758e9975979a0a61b9?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - How Much Is It?',
    description: 'Practice asking and answering about prices',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/b183f9de92e749deb12db1c9c8ba89da?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Money and Prices',
    description: 'Match prices with the correct items',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/7ffb0bc66ed04f22bc7a60dae4bb7b0e?themeId=1&templateId=11&fontStackId=0'
    }
  },
];
