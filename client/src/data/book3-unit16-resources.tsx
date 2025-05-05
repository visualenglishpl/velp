import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 16 - SPORTS 
 * This file now contains the consolidated Sports resources for Unit 16
 * House Chores content has been moved to Unit 17
 */

// Define Unit 16 directly as sports resources
export const book3Unit16Resources: TeacherResource[] = [
  // Video Resources
  {
    id: 'book3-unit16-sports-video1',
    bookId: '3',
    unitId: '16',
    title: 'What Sport is This? Guessing Song for Kids',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=zacKA0JYaiA',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zacKA0JYaiA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'zacKA0JYaiA',
      embedUrl: 'https://www.youtube.com/embed/zacKA0JYaiA'
    }
  },
  {
    id: 'book3-unit16-sports-video2',
    bookId: '3',
    unitId: '16',
    title: 'What Sports Do You Like?',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=sSeDl3jqD74',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/sSeDl3jqD74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'sSeDl3jqD74',
      embedUrl: 'https://www.youtube.com/embed/sSeDl3jqD74'
    }
  },
  {
    id: 'book3-unit16-video-3',
    bookId: '3',
    unitId: '16',
    title: 'VISUAL 3 - UNIT 16 - SPORTS - Sports Vocabulary - English Vocabulary Games',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mHwf5wMG2pU',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mHwf5wMG2pU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'mHwf5wMG2pU'
    }
  },
  
  // Game Resources
  {
    id: 'book3-unit16-sports-game1',
    bookId: '3',
    unitId: '16',
    title: 'WORDWALL - SPORTS (1)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/b76f6a4c2e6145e1a56d2f10de12c33c',
    embedCode: '<iframe style="max-width:100%;" src="https://wordwall.net/embed/b76f6a4c2e6145e1a56d2f10de12c33c" width="580" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/b76f6a4c2e6145e1a56d2f10de12c33c'
    }
  },
  {
    id: 'book3-unit16-sports-game2',
    bookId: '3',
    unitId: '16',
    title: 'WORDWALL - SPORTS (2)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/da77d7f73c2346b58f6c9eb46c4ec8e6',
    embedCode: '<iframe style="max-width:100%;" src="https://wordwall.net/embed/da77d7f73c2346b58f6c9eb46c4ec8e6" width="580" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/da77d7f73c2346b58f6c9eb46c4ec8e6'
    }
  },
  {
    id: 'book3-unit16-game-3',
    bookId: '3',
    unitId: '16',
    title: 'VISUAL 3 - UNIT 16 - SPORTS - WORDWALL - SPORTS (3)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/13af43954e62474b8d3d40b7c169783a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/13af43954e62474b8d3d40b7c169783a?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/13af43954e62474b8d3d40b7c169783a?themeId=1&templateId=54&fontStackId=0'
    }
  }
];

// Export default for consistency
export default book3Unit16Resources;
