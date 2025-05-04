import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 7 - LET'S GO SHOPPING
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit7ShoppingResources: TeacherResource[] = [
  // Videos
  {
    title: 'Let\'s Go Shopping Song 1',
    description: 'Fun animated song about shopping',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'zXEq-QO3xTg'
    }
  },
  {
    title: '10 to 100 Song by ELF Learning',
    description: 'Counting song to practice numbers used in shopping',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '50-GjHYdKHs'
    }
  },
  {
    title: 'How Much Is It? - English Conversation',
    description: 'Simple conversation examples for shopping dialogues',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'g83S9Z5GeWs'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Shopping Vocabulary',
    description: 'Interactive game for learning shopping vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/08a4d1f5b6a94dd4b5a4b4de5c2dcbe1?themeId=1&templateId=11&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Shopping Items and Prices',
    description: 'Match items with their prices',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/e9451cedc7cb4d15be0a1ac15a9de61a?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - How Much Is It?',
    description: 'Practice asking and answering about prices',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/dc5d49f0ad474d41add5c48a5f61f4a7?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
