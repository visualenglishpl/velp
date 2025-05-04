/**
 * Visual English Book 2, Unit 10: MONTHS AND SEASONS
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book2Unit10VideoResources: TeacherResource[] = [
  {
    id: 'book2-unit10-video1',
    bookId: '2',
    unitId: '10',
    title: 'The Months of the Year Song',
    description: 'Catchy song teaching the twelve months of the year.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=-4s-ut7N0jQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-4s-ut7N0jQ?si=NHTrLyS0iEOTw7CY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit10-video2',
    bookId: '2',
    unitId: '10',
    title: 'Months of the year ESL Songs for Kids - Planet Pop',
    description: 'Fun animated song about months of the year with different visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=26gvR2GYMJ4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/26gvR2GYMJ4?si=KcPXGXpu9ICUMFCm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit10GameResources: TeacherResource[] = [
  {
    id: 'book2-unit10-game1',
    bookId: '2',
    unitId: '10',
    title: 'GAMES TO LEARN - MONTHS',
    description: 'Interactive game for learning and practicing months of the year.',
    resourceType: 'game',
    provider: 'External Game',
    sourceUrl: 'https://www.gamestolearnenglish.com/months-game/',
    embedCode: `<a href="https://www.gamestolearnenglish.com/months-game/" target="_blank" class="external-game-link">Open Months Game</a>`
  },
  {
    id: 'book2-unit10-game2',
    bookId: '2',
    unitId: '10',
    title: 'WORDWALL - MONTHS',
    description: 'Interactive game to practice the twelve months of the year.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/07a8802120a84ba4b20b0e962e0abea2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/07a8802120a84ba4b20b0e962e0abea2?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit10-game3',
    bookId: '2',
    unitId: '10',
    title: 'WORDWALL - MONTHS AND SEASONS',
    description: 'Game connecting months with their corresponding seasons.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f57988beef3c45abaf56f437166d60da',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f57988beef3c45abaf56f437166d60da?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit10-game4',
    bookId: '2',
    unitId: '10',
    title: 'WORDWALL MONTHS',
    description: 'Another format of game for practicing months vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/947229a373254e199d8894dab724a595',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/947229a373254e199d8894dab724a595?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit10-game5',
    bookId: '2',
    unitId: '10',
    title: 'TURTLE DIARY - MONTHS',
    description: 'External game for practicing months of the year.',
    resourceType: 'game',
    provider: 'External Game',
    sourceUrl: 'https://www.turtlediary.com/game/months-of-the-year.html',
    embedCode: `<a href="https://www.turtlediary.com/game/months-of-the-year.html" target="_blank" class="external-game-link">Open Turtle Diary Months Game</a>`
  }
];

// Combined resources
export const book2Unit10Resources: TeacherResource[] = [
  ...book2Unit10VideoResources,
  ...book2Unit10GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit10Resources = () => book2Unit10Resources;

export default book2Unit10Resources;