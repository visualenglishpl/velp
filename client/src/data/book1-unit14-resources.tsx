/**
 * Visual English Book 1, Unit 14: WHERE IS THE SPIDER?
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit14VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit14-video1',
    bookId: '1',
    unitId: '14',
    title: 'On In Under By Song',
    description: 'A fun, engaging song teaching prepositions of place with clear visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=DHb4-CCif7U',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DHb4-CCif7U?si=AE38i0me0bPmftZA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit14-video2',
    bookId: '1',
    unitId: '14',
    title: 'In Front Of, Behind, Between',
    description: 'Learn more prepositions of place with clear examples and animations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=xERTESWbqhU',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xERTESWbqhU?si=BLasKYQEggRu8nb7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit14-video3',
    bookId: '1',
    unitId: '14',
    title: 'Where is the Ball - WATTS ENGLISH',
    description: 'A story-based video using prepositions of place in context with a ball.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ftLIV92ovgk',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ftLIV92ovgk?si=JRdU59bWMrgeXudt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit14GameResources: TeacherResource[] = [
  {
    id: 'book1-unit14-game1',
    bookId: '1',
    unitId: '14',
    title: 'WORDWALL - WHERE IS THE SPIDER (1)',
    description: 'Interactive game to practice identifying where the spider is using prepositions of place.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e297e5091ade4d4fab9a92c15491343e',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e297e5091ade4d4fab9a92c15491343e?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit14-game2',
    bookId: '1',
    unitId: '14',
    title: 'WORDWALL - WHERE IS THE SPIDER (2)',
    description: 'Another interactive game focusing on prepositions and spatial relationships.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/886c609003c149f1b21d1a89d83700c4',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/886c609003c149f1b21d1a89d83700c4?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit14Resources: TeacherResource[] = [
  ...book1Unit14VideoResources,
  ...book1Unit14GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit14Resources = () => book1Unit14Resources;

export default book1Unit14Resources;
