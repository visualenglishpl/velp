import { TeacherResource } from '@/components/TeacherResources';

/**
 * Resources for Book 0a Unit 9
 */

// Videos for Unit 9
export const videos: TeacherResource[] = [
  {
    id: `book0a-unit9-video-1`,
    bookId: '0a',
    unitId: '9',
    title: 'VISUAL 0A Unit 9 Video 1',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/placeholder',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: `book0a-unit9-video-2`,
    bookId: '0a',
    unitId: '9',
    title: 'VISUAL 0A Unit 9 Video 2',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/placeholder',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  }
];

// Games for Unit 9
export const games: TeacherResource[] = [
  {
    id: `book0a-unit9-game-1`,
    bookId: '0a',
    unitId: '9',
    title: 'VISUAL 0A Unit 9 Game 1',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/placeholder',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: `book0a-unit9-game-2`,
    bookId: '0a',
    unitId: '9',
    title: 'VISUAL 0A Unit 9 Game 2',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/placeholder',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/placeholder" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// Combined resources for this unit
export const resources: TeacherResource[] = [...videos, ...games];

// Main export for backward compatibility
export const book0aUnit9Resources = resources;
