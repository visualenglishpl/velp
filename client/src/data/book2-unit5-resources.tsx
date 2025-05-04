/**
 * Visual English Book 2, Unit 5: WHAT DO YOU WANT TO EAT
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book2Unit5VideoResources: TeacherResource[] = [
  {
    id: 'book2-unit5-video1',
    bookId: '2',
    unitId: '5',
    title: 'What Do You Want To Eat? - DREAM KIDS ENGLISH',
    description: 'Educational video teaching food vocabulary and how to ask for what you want to eat.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=yUw3-im44qY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yUw3-im44qY?si=OkO3llAl0TJmeNRB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit5-video2',
    bookId: '2',
    unitId: '5',
    title: 'What Do You Want To Eat? 2 - DREAM KIDS ENGLISH',
    description: 'Second part of the food vocabulary series with more examples.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_ctPAlJVDQk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_ctPAlJVDQk?si=LXM-caCAjzaIOpnq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit5-video3',
    bookId: '2',
    unitId: '5',
    title: 'What Do You Want To Drink? - DREAM KIDS ENGLISH',
    description: 'Educational video about beverage vocabulary and how to ask about drinks.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=8kBbNmd8i-s',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8kBbNmd8i-s?si=HoBo7YC0mhSb50EP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit5-video4',
    bookId: '2',
    unitId: '5',
    title: 'Do You Like Broccoli Ice Cream? - Super Simple Songs',
    description: 'Fun song about liking and disliking foods with silly combinations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=frN3nvhIHUk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/frN3nvhIHUk?si=QFb_-3eQSoSffL9z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit5GameResources: TeacherResource[] = [
  {
    id: 'book2-unit5-game1',
    bookId: '2',
    unitId: '5',
    title: 'WORDWALL - CRAZY FOOD',
    description: 'Interactive game about food likes and dislikes with crazy combinations.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/06164e7e3475449591de546d6651f0d7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/06164e7e3475449591de546d6651f0d7?themeId=1&templateId=86&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit5-game2',
    bookId: '2',
    unitId: '5',
    title: 'WORDWALL - FOOD AND DRINKS',
    description: 'Practice identifying different foods and drinks in this matching game.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/31242/english/food-and-drinks',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/31242/english/food-and-drinks?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit5Resources: TeacherResource[] = [
  ...book2Unit5VideoResources,
  ...book2Unit5GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit5Resources = () => book2Unit5Resources;

export default book2Unit5Resources;