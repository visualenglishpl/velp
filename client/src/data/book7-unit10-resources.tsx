import { TeacherResource } from '@/components/TeacherResources';

/**
 * Resources for Book 7 Unit 10
 */

// Videos for Unit 10
export const videos: TeacherResource[] = [
  {
    id: `book7-unit10-video-1`,
    bookId: '7',
    unitId: '10',
    title: 'VISUAL 7 Unit 10 Video 1',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/placeholder',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: `book7-unit10-video-2`,
    bookId: '7',
    unitId: '10',
    title: 'VISUAL 7 Unit 10 Video 2',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/placeholder',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  }
];

// Games for Unit 10
export const games: TeacherResource[] = [
  {
    id: `book7-unit10-game-1`,
    bookId: '7',
    unitId: '10',
    title: 'VISUAL 7 Unit 10 Game 1',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/placeholder',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book7-unit10-game-2`,
    bookId: '7',
    unitId: '10',
    title: 'VISUAL 7 Unit 10 Game 2',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/placeholder',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games];

// Main export for backward compatibility
export const book7Unit10Resources = resources;
