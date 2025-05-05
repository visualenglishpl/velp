import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 7 - LET'S GO SHOPPING
 * Resources including videos and games based on the DOCX attachment
 */

const unitNumber = '7';
const unitTitle = 'LET\'S GO SHOPPING';

export const book3Unit7ShoppingResources: TeacherResource[] = [
  // Videos
  {
    id: `book3-unit${unitNumber}-shopping-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Let's Go Shopping Song 1`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/zXEq-QO3xTg',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zXEq-QO3xTg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-shopping-video-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - 10 to 100 Song by ELF Learning`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/50-GjHYdKHs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/50-GjHYdKHs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
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
