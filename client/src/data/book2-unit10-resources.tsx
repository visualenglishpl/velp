/**
 * Visual English Book 2, Unit 10: MONTHS AND SEASONS
 * Resources including videos and games about months and seasons
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '10';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Video resources for this unit
export const book2Unit10VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - The Months of the Year Song`,
    description: 'Catchy song teaching all 12 months of the year with animation',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=-4s-ut7N0jQ',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-4s-ut7N0jQ?si=NHTrLyS0iEOTw7CY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Months of the Year ESL Song`,
    description: 'Planet Pop presents a fun months of the year song for ESL students',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=26gvR2GYMJ4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/26gvR2GYMJ4?si=KcPXGXpu9ICUMFCm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Game resources for this unit
export const book2Unit10GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME- GAMESTOLEARN.COM - MONTHS`,
    description: 'Interactive game to practice the months of the year',
    resourceType: 'game',
    provider: 'GamesToLearn',
    sourceUrl: 'https://www.gamestolearnenglish.com/months-game/'
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME WORDWALL - MONTHS`,
    description: 'Interactive matching game for months vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/07a8802120a84ba4b20b0e962e0abea2',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/07a8802120a84ba4b20b0e962e0abea2?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME WORDWALL - MONTHS AND SEASONS`,
    description: 'Match months with their corresponding seasons',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f57988beef3c45abaf56f437166d60da',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f57988beef3c45abaf56f437166d60da?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME WORDWALL MONTHS`,
    description: 'Fun quiz game to practice months vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/947229a373254e199d8894dab724a595',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/947229a373254e199d8894dab724a595?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game5`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - ONLINE GAME- TURTLE DIARY - MONTHS`,
    description: 'Interactive game to learn months of the year',
    resourceType: 'game',
    provider: 'Turtle Diary',
    sourceUrl: 'https://www.turtlediary.com/game/months-of-the-year.html'
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
