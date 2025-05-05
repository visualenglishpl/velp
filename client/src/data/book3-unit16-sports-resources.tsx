/**
 * Book 3 Unit 16 - SPORTS
 * Resources including videos and games for the sports theme
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book3Unit16Resources: TeacherResource[] = [
  {
    id: 'book3-unit16-sports-video1',
    title: 'What Sport is This? Guessing Song for Kids',
    resourceType: 'video',
    description: 'Fun video that helps kids learn different sports through a guessing game format.',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zacKA0JYaiA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'zacKA0JYaiA',
      embedUrl: 'https://www.youtube.com/embed/zacKA0JYaiA'
    },
    bookId: '3',
    unitId: '16'
  },
  {
    id: 'book3-unit16-sports-game1',
    title: 'WORDWALL - SPORTS (1)',
    resourceType: 'game',
    description: 'Interactive game to practice sports vocabulary.',
    embedCode: '<iframe style="max-width:100%;" src="https://wordwall.net/embed/b76f6a4c2e6145e1a56d2f10de12c33c" width="580" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/b76f6a4c2e6145e1a56d2f10de12c33c'
    },
    bookId: '3',
    unitId: '16'
  },
  {
    id: 'book3-unit16-sports-game2',
    title: 'WORDWALL - SPORTS (2)',
    resourceType: 'game',
    description: 'Match sports with their equipment.',
    embedCode: '<iframe style="max-width:100%;" src="https://wordwall.net/embed/da77d7f73c2346b58f6c9eb46c4ec8e6" width="580" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/da77d7f73c2346b58f6c9eb46c4ec8e6'
    },
    bookId: '3',
    unitId: '16'
  },
  {
    id: 'book3-unit16-sports-video2',
    title: 'What Sports Do You Like?',
    resourceType: 'video',
    description: 'Song about different sports and expressing preferences.',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/sSeDl3jqD74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'sSeDl3jqD74',
      embedUrl: 'https://www.youtube.com/embed/sSeDl3jqD74'
    },
    bookId: '3',
    unitId: '16'
  }
];

// Export default for backwards compatibility
export default book3Unit16Resources;
