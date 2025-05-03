/**
 * Visual English Book 1, Unit 15: FRUIT
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit15VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit15-video1',
    bookId: '1',
    unitId: '15',
    title: 'Fruit Song for Kids - The Singing Walrus',
    description: 'A fun, catchy song teaching fruit vocabulary with colorful animations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mfReSbQ7jzE',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mfReSbQ7jzE?si=fPhoba2ZpENDJRGP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-video2',
    bookId: '1',
    unitId: '15',
    title: 'Fruit Salad - WATTS ENGLISH',
    description: 'A story-based video showing how to make a fruit salad with English vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=q780dw-1QE8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/q780dw-1QE8?si=dT_3hgy5BSjWGVyX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-video3',
    bookId: '1',
    unitId: '15',
    title: 'Apples are Yummy',
    description: 'A simple song about apples with gestures and clear pronunciation.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=oBF-_ZMkuH8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/oBF-_ZMkuH8?si=oToH0tA2-9oi4PpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-video4',
    bookId: '1',
    unitId: '15',
    title: 'Fruit Song - DREAM ENGLISH',
    description: 'An energetic fruit song with repetitive vocabulary and hand gestures.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=QQZ03_v3K6Y',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/QQZ03_v3K6Y?si=Ib98yH7bpFpYuJOM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-video5',
    bookId: '1',
    unitId: '15',
    title: 'Fruit Guessing Game for Kids',
    description: 'An interactive video game that helps children identify fruit through visual clues.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mVE9pYdwX-I',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mVE9pYdwX-I?si=ySYZmqRnuBIVekbp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-video6',
    bookId: '1',
    unitId: '15',
    title: 'I Like Apples Song',
    description: 'A song about liking different fruits with focus on simple sentence patterns.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=wTTz2dL0jb8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wTTz2dL0jb8?si=4hKNHVY0MTdmes-l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit15GameResources: TeacherResource[] = [
  {
    id: 'book1-unit15-game1',
    bookId: '1',
    unitId: '15',
    title: 'WORDWALL - FRUIT (1)',
    description: 'Interactive game to practice identifying and naming fruits.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/bcf4964f6d694547a72d3909fd32d86c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bcf4964f6d694547a72d3909fd32d86c?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit15-game2',
    bookId: '1',
    unitId: '15',
    title: 'WORDWALL - FRUIT (2)',
    description: 'Another fruit vocabulary game with different formats and interactions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/96231f6b6a204fb887b683064b6ac962',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/96231f6b6a204fb887b683064b6ac962?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit15Resources: TeacherResource[] = [
  ...book1Unit15VideoResources,
  ...book1Unit15GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit15Resources = () => book1Unit15Resources;

export default book1Unit15Resources;
