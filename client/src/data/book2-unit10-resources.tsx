/**
 * Visual English Book 2, Unit 10: MONTHS AND SEASONS
 * Resources including videos and games about months and seasons
 */

import { TeacherResource } from '@/components/TeacherResources';

// Video resources for this unit
export const book2Unit10VideoResources: TeacherResource[] = [
  {
    title: 'The Months of the Year Song',
    description: 'Catchy song teaching all 12 months of the year with animation',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '-4s-ut7N0jQ'
    }
  },
  {
    title: 'Months of the Year ESL Song',
    description: 'Planet Pop presents a fun months of the year song for ESL students',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '26gvR2GYMJ4'
    }
  }
];

// Game resources for this unit
export const book2Unit10GameResources: TeacherResource[] = [
  {
    title: 'Months Game - GamesToLearn',
    description: 'Interactive game to practice the months of the year',
    resourceType: 'game',
    provider: 'GamesToLearn',
    sourceUrl: 'https://www.gamestolearnenglish.com/months-game/'
  },
  {
    title: 'Months - Wordwall',
    description: 'Interactive matching game for months vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '07a8802120a84ba4b20b0e962e0abea2'
    }
  },
  {
    title: 'Months and Seasons - Wordwall',
    description: 'Match months with their corresponding seasons',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: 'f57988beef3c45abaf56f437166d60da'
    }
  },
  {
    title: 'Months Quiz - Wordwall',
    description: 'Fun quiz game to practice months vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'wordwall',
      embedId: '947229a373254e199d8894dab724a595'
    }
  },
  {
    title: 'Months of the Year - Turtle Diary',
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
