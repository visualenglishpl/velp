import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 6 - MY COLLECTIONS
 */

const unitNumber = '6';
const unitTitle = 'MY COLLECTIONS';

// Videos for Unit 6
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Collecting Things`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/DMKcEdjZKEs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DMKcEdjZKEs?si=68WHVhE0bMoXilik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'DMKcEdjZKEs'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Types of Collections Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/fXUsuyvtT0c',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/fXUsuyvtT0c?si=VHWRzH7593etblNS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'fXUsuyvtT0c'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Collectibles Vocabulary`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/kQkZeXHfgww',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kQkZeXHfgww" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'kQkZeXHfgww'
    }
  }
];

// Games for Unit 6
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Collections Vocabulary Game`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6bcdbdd1f33a4700968fcc126d42c323',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// External resources for Unit 6
export const externalResources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-external-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Kahoot Collections Quiz`,
    resourceType: 'other',
    provider: 'Kahoot',
    sourceUrl: 'https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300',
    embedCode: '<a href="https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300" target="_blank">Play Collections Kahoot Quiz</a>',
    content: {
      type: 'link',
      embedUrl: 'https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300'
    }
  },
  {
    id: `book4-unit${unitNumber}-external-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Collections Vocabulary Worksheet`,
    resourceType: 'pdf',
    provider: 'ESL Printables',
    sourceUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/hobbies/collecting-things/74046',
    embedCode: '<a href="https://en.islcollective.com/english-esl-worksheets/vocabulary/hobbies/collecting-things/74046" target="_blank">Download Collections Vocabulary Worksheet</a>',
    content: {
      type: 'link',
      embedUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/hobbies/collecting-things/74046'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games, ...externalResources];

// Main export for backward compatibility
export const book4Unit6Resources = resources;
