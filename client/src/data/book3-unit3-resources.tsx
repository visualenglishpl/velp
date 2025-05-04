import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 3 - FAIRY TALES
 * Resources including videos and games
 */

const unitNumber = '3';
const unitTitle = 'FAIRY TALES';

export const book3Unit3Resources: TeacherResource[] = [
  // Video Resources
  {
    id: `book3-unit${unitNumber}-video-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Fairy Tale Collection`,
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/AvDdVUb4zSA',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/AvDdVUb4zSA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  
  // Game Resources
  {
    id: `book3-unit${unitNumber}-game-1`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FAIRY TALES - BOOK IMAGES`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/4aa2a4d9bf3046b688396207c3fb7610',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4aa2a4d9bf3046b688396207c3fb7610?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-2`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FAIRY TALES - REAL IMAGES`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/46246342bd744f5bbc1fcc23c1667d4e',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/46246342bd744f5bbc1fcc23c1667d4e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-3`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FAIRY TALES - GENERAL QUIZ`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/96975091eeb84f7ca875de89aee63301',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/96975091eeb84f7ca875de89aee63301?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-4`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FAIRY TALES (1)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d15943a871c4489aa906b10cd02b0eb0',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/d15943a871c4489aa906b10cd02b0eb0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-5`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - FAIRY TALES (2)`,
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/20c8e344b9ed47eab8644a7640ee7f92',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/20c8e344b9ed47eab8644a7640ee7f92?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book3-unit${unitNumber}-game-6`,
    bookId: '3',
    unitId: unitNumber,
    title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - PBS KIDS - STORY CREATOR`,
    resourceType: 'game',
    provider: 'PBS KIDS',
    sourceUrl: 'https://pbskids.org/xavier/games/xavier-story-creator',
    embedCode: '<a href="https://pbskids.org/xavier/games/xavier-story-creator" target="_blank" class="external-game-link">Open PBS Kids Story Creator</a>'
  }
];

export default book3Unit3Resources;