import { TeacherResource } from '@/components/TeacherResources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Resources for Book 4 Unit 4 - MY FAMILY
 */

const unitNumber = '4';
const unitTitle = 'MY FAMILY';

// Videos for Unit 4
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Vocabulary Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/FHaObkHEkHQ',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FHaObkHEkHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'FHaObkHEkHQ'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Members`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/dX1nlYuPDg8',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dX1nlYuPDg8?si=bbwDSdIAL-ZbvomL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'dX1nlYuPDg8'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Vocabulary ESL`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/YsDfuAiIzDE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/YsDfuAiIzDE?si=THw27J_krnTJVFBR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'YsDfuAiIzDE'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-4`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Relatives Song`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/vihFVjXGv-Y',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/vihFVjXGv-Y?si=1st4CxxtWwScmWNS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'vihFVjXGv-Y'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-5`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - My Family Tree`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/GhHbh9SVtVE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/GhHbh9SVtVE?si=VuOZSu1yEWzCrz4o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'GhHbh9SVtVE'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-6`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing Family Members`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/RpuF57cIltw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RpuF57cIltw?si=9Mprs6oiiuUv3YyI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'RpuF57cIltw'
    }
  }
];

// Games for Unit 4
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Types of Hair`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0268bf9e65734957a7b291700fc07eee',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0268bf9e65734957a7b291700fc07eee?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/0268bf9e65734957a7b291700fc07eee?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Describing People`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6c610a5d0f4e4b72be38e5deebf55425',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6c610a5d0f4e4b72be38e5deebf55425?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6c610a5d0f4e4b72be38e5deebf55425?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Vocabulary Game`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/1373ff4429454b2c8c63824e64176643',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1373ff4429454b2c8c63824e64176643?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/1373ff4429454b2c8c63824e64176643?themeId=1&templateId=38&fontStackId=0'
    }
  }
];

// External resources for Unit 4
export const externalResources: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-external-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ISL Collective Family Lesson`,
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/19368',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/19368" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/19368'
    }
  },
  {
    id: `book4-unit${unitNumber}-external-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Tree Creator`,
    resourceType: 'other',
    provider: 'ESL Games',
    sourceUrl: 'https://www.esl-lounge.com/student/grammar/1g9-family-tree.php',
    embedCode: '<a href="https://www.esl-lounge.com/student/grammar/1g9-family-tree.php" target="_blank">Create a Family Tree Activity</a>',
    content: {
      type: 'link',
      embedUrl: 'https://www.esl-lounge.com/student/grammar/1g9-family-tree.php'
    }
  },
  {
    id: `book4-unit${unitNumber}-external-3`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Family Vocabulary Worksheet`,
    resourceType: 'pdf',
    provider: 'ISL Collective',
    sourceUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/family/family-vocabulary-matching-exercise/1407',
    embedCode: '<a href="https://en.islcollective.com/english-esl-worksheets/vocabulary/family/family-vocabulary-matching-exercise/1407" target="_blank">Download Family Vocabulary Worksheet</a>',
    content: {
      type: 'link',
      embedUrl: 'https://en.islcollective.com/english-esl-worksheets/vocabulary/family/family-vocabulary-matching-exercise/1407'
    }
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games, ...externalResources];

// Main export for backward compatibility
export const book4Unit4Resources = resources;
