/**
 * Visual English Book 1, Unit 6: My Favourite Colour
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit6VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit6-video1',
    bookId: '1',
    unitId: '6',
    title: 'I See Something Blue - Super Simple Songs',
    description: 'A fun interactive song to teach colors and color recognition through identifying blue objects',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=jYAWf8Y91hA',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jYAWf8Y91hA?si=b9qEwXN-0LtJVkre" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit6-video2',
    bookId: '1',
    unitId: '6',
    title: 'I See Something Pink - Super Simple Songs',
    description: 'A fun interactive song to teach colors and color recognition through identifying pink objects',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=Asb8N0nz9OI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Asb8N0nz9OI?si=5Oh9ii42PJzsv7mc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit6-video3',
    bookId: '1',
    unitId: '6',
    title: 'What colour is it?',
    description: 'Educational video teaching basic color names and identification',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=NUquLTPhMwg',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NUquLTPhMwg?si=6GQoDS1m4JvkT-gj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit6-video4',
    bookId: '1',
    unitId: '6',
    title: 'What\'s Your Favorite Color - Super Simple Song',
    description: 'A catchy song that introduces the question "What\'s your favorite color?" and responses',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=zxIpA5nF_LY',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/zxIpA5nF_LY?si=MItpQRQKiUxtWmg_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit6-video5',
    bookId: '1',
    unitId: '6',
    title: 'Colour Spelling',
    description: 'Educational video teaching how to spell color names in English',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=0LNuoKsAtN8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0LNuoKsAtN8?si=FM5PFJceDGSdGIW6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit6GameResources: TeacherResource[] = [
  {
    id: 'book1-unit6-game1',
    bookId: '1',
    unitId: '6',
    title: 'WORDWALL - COLOURS (1)',
    description: 'Interactive game to practice identifying and naming colors',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/54d466d5a13948c6acbafc5729e6d887',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/54d466d5a13948c6acbafc5729e6d887?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit6-game2',
    bookId: '1',
    unitId: '6',
    title: 'WORDWALL - COLOURS (2)',
    description: 'Practice matching color words with their corresponding colors',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/360776cf889d4170872d084aa81d3995',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/360776cf889d4170872d084aa81d3995?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit6Resources: TeacherResource[] = [
  ...book1Unit6VideoResources,
  ...book1Unit6GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit6Resources = () => book1Unit6Resources;

export default book1Unit6Resources;
