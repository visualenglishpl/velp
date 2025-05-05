import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 5 - PERSONALITY
 */

const unitNumber = '5';
const unitTitle = 'PERSONALITY';

// Videos for Unit 5
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Traits Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/D7ZjMjfasfU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/D7ZjMjfasfU?si=YuakoxXmTV3PKBHP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'D7ZjMjfasfU'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Character Traits ESL Lesson`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/JGn9tPb_9ZI',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JGn9tPb_9ZI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'JGn9tPb_9ZI'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing Personality Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/QxQb0jZKatY',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/QxQb0jZKatY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'QxQb0jZKatY'
    }
  }
];

// Games for Unit 5
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Traits Matching`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/339ab9a507314c98aa8ad268f9dbd2fc',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Quiz`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c6d609be7c0a4370adf35d199dd1001d',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

// External resources for Unit 5
export const externalResources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-external-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Traits Worksheet`,
    resourceType: 'pdf',
    provider: 'ESL Library',
    sourceUrl: 'https://eslflow.com/wp-content/uploads/2022/11/Personality-Adjectives-matching-and-discussion-worksheet.pdf',
    embedCode: '<a href="https://eslflow.com/wp-content/uploads/2022/11/Personality-Adjectives-matching-and-discussion-worksheet.pdf" target="_blank">Download Personality Traits Worksheet</a>',
    content: {
      type: 'link',
      embedUrl: 'https://eslflow.com/wp-content/uploads/2022/11/Personality-Adjectives-matching-and-discussion-worksheet.pdf'
    }
  },
  {
    id: `book4-unit${unitNumber}-external-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Personality Adjectives Quiz`,
    resourceType: 'other',
    provider: 'ESL Games',
    sourceUrl: 'https://www.eslgamesplus.com/personality-adjectives-esl-interactive-grammar-vocabulary-game/',
    embedCode: '<a href="https://www.eslgamesplus.com/personality-adjectives-esl-interactive-grammar-vocabulary-game/" target="_blank">Play Personality Adjectives Quiz</a>',
    content: {
      type: 'link',
      embedUrl: 'https://www.eslgamesplus.com/personality-adjectives-esl-interactive-grammar-vocabulary-game/'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games, ...externalResources];

// Main export for backward compatibility
export const book4Unit5Resources = resources;
