/**
 * Visual English Book 2, Unit 13
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book2Unit13VideoResources: TeacherResource[] = [
  {
    id: 'book2-unit13-video1',
    bookId: '2',
    unitId: '13',
    title: 'Video 1',
    description: 'Educational video for unit 13 vocabulary practice.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=HrHqq8xJiU4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HrHqq8xJiU4?si=wUO6e3XKEspoQKUL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit13-video2',
    bookId: '2',
    unitId: '13',
    title: 'Video 2',
    description: 'Another learning video for unit 13 vocabulary and concepts.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=jeZ40aFoJPw',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jeZ40aFoJPw?si=20WgAQ6eCZN2bGUz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit13-video3',
    bookId: '2',
    unitId: '13',
    title: 'Video 3',
    description: 'Third educational video for unit 13 lessons.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=AhL6LZjRgKI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AhL6LZjRgKI?si=ksdEIdz-IX1IWFA1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book2Unit13GameResources: TeacherResource[] = [
  {
    id: 'book2-unit13-game1',
    bookId: '2',
    unitId: '13',
    title: 'WORDWALL GAME 1',
    description: 'Interactive game for practicing unit 13 vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/9b2894f2dd12456cae7777ab904c0ab7',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9b2894f2dd12456cae7777ab904c0ab7?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book2-unit13-game2',
    bookId: '2',
    unitId: '13',
    title: 'WORDWALL GAME 2',
    description: 'Second game activity for unit 13 vocabulary practice.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/de1ddb02eff54d04a39272e4347a55ee',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/de1ddb02eff54d04a39272e4347a55ee?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit13Resources: TeacherResource[] = [
  ...book2Unit13VideoResources,
  ...book2Unit13GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit13Resources = () => book2Unit13Resources;

export default book2Unit13Resources;