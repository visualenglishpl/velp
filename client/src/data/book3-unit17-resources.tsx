import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE } from './book3-resources-common';

/**
 * Book 3 Unit 17 - HOUSE CHORES
 * Resources moved from previous Unit 16 House Chores
 */

// Define Unit 17 resources as house chores content
export const book3Unit17Resources: TeacherResource[] = [
  // Videos for Unit 17 - House Chores
  {
    id: 'book3-unit17-video-1',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - Clean up song',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=bVu7Sps7EBA',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bVu7Sps7EBA?si=F4RPwpWkP0hKBLte" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'bVu7Sps7EBA'
    }
  },
  {
    id: 'book3-unit17-video-2',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - Household Chores',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=Z2ppOux48xQ',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Z2ppOux48xQ?si=m6bwzr-sWz7thkfi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'Z2ppOux48xQ'
    }
  },
  {
    id: 'book3-unit17-video-3',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - islcollective.com',
    resourceType: 'video',
    provider: 'islcollective',
    sourceUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/193628',
    embedCode: '<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/193628" width="800" height="600" frameborder="0" allowfullscreen style="max-width: inherit !important; max-height: inherit !important;"></iframe>',
    content: {
      type: 'custom',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/193628'
    }
  },
  
  // Game Resources
  {
    id: 'book3-unit17-game-1',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - Household Chores (1)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/44511773/household-chores',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/44511773/household-chores?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/44511773/household-chores?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: 'book3-unit17-game-2',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - Chores Word Match',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/11419290/household-chores',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/11419290/household-chores?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/11419290/household-chores?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: 'book3-unit17-game-3',
    bookId: '3',
    unitId: '17',
    title: 'VISUAL 3 - UNIT 17 - HOUSE CHORES - Household Chores Matching',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/46370566/household-chores',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/46370566/household-chores?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/46370566/household-chores?themeId=1&templateId=3&fontStackId=0'
    }
  }
];
