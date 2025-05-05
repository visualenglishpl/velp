import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 7 - FASHION CRAZY
 */

const unitNumber = '7';
const unitTitle = 'FASHION CRAZY';

// Videos for Unit 7
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Fashion Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/ZkIzvwfvpGg',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZkIzvwfvpGg?si=9Y5BCyyYnKgw-iD2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'ZkIzvwfvpGg'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothing Patterns and Styles`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/ADXYVutW2k0',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ADXYVutW2k0?si=0g1OWrwUsI4NpP8C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'ADXYVutW2k0'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Fashion and Shopping Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/j0RxXRhw5fA',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/j0RxXRhw5fA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'j0RxXRhw5fA'
    }
  }
];

// Games for Unit 7
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothes Vocabulary`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/4b5921b195f2437b91adf882adb32d07',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4b5921b195f2437b91adf882adb32d07?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/4b5921b195f2437b91adf882adb32d07?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothes Patterns`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/31b10b47b8184627b05d45e372b69b62',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/31b10b47b8184627b05d45e372b69b62?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/31b10b47b8184627b05d45e372b69b62?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothing Quiz`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/87e2df1853c646db9f4a27d632cc9f48',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/87e2df1853c646db9f4a27d632cc9f48?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/87e2df1853c646db9f4a27d632cc9f48?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

// External resources for Unit 7
export const externalResources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-external-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Fashion Vocabulary Activity`,
    resourceType: 'pdf',
    provider: 'ESL Library',
    sourceUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/clothes-and-fashion/fashion-vocabulary/55126',
    embedCode: '<a href="https://en.islcollective.com/english-esl-worksheets/vocabulary/clothes-and-fashion/fashion-vocabulary/55126" target="_blank">Download Fashion Vocabulary Worksheet</a>',
    content: {
      type: 'link',
      embedUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/clothes-and-fashion/fashion-vocabulary/55126'
    }
  },
  {
    id: `book4-unit${unitNumber}-external-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Clothing Patterns Quiz`,
    resourceType: 'other',
    provider: 'ESL Games',
    sourceUrl: 'https://www.eslgamesplus.com/clothes-vocabulary-esl-interactive-board-game/',
    embedCode: '<a href="https://www.eslgamesplus.com/clothes-vocabulary-esl-interactive-board-game/" target="_blank">Play Clothing Vocabulary Game</a>',
    content: {
      type: 'link',
      embedUrl: 'https://www.eslgamesplus.com/clothes-vocabulary-esl-interactive-board-game/'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games, ...externalResources];

// Main export for backward compatibility
export const book4Unit7Resources = resources;
