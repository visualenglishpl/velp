import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 16 - SPORTS (Redirected)
 * This file now redirects to book3-unit16-sports-resources.tsx
 * House Chores content has been moved to Unit 17
 */

/**
 * This file now defines Unit 16 as Sports content for Book 3
 * Unit 16 content has been directly imported here from the Sports implementation
 */

import { TeacherResource } from '@/components/TeacherResources';

// Define Unit 16 directly as sports resources
export const book3Unit16Resources: TeacherResource[] = [
  {
    id: 'book3-unit16-video-1',
    bookId: '3',
    unitId: '16',
    title: 'VISUAL 3 - UNIT 16 - SPORTS - What Sport is This - Guessing Song for Kids',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=JLnycPtolfw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JLnycPtolfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    id: 'book3-unit16-game-1',
    bookId: '3',
    unitId: '16',
    title: 'WORDWALL - Sports (1)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/29450551/sports',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ad8c9add12e34ca0a3348cff94bc7ed9?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: 'book3-unit16-game-2',
    bookId: '3',
    unitId: '16',
    title: 'WORDWALL - Sports (2)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/50452/english/sports',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3d18c5efc7844a9b89e7ff5e90cc1d3f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: 'book3-unit16-game-3',
    bookId: '3',
    unitId: '16',
    title: 'WORDWALL - Sports (3)',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/3532456/sports',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1a3edd4fd0a74830bcaad2b7fe198a3c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];
