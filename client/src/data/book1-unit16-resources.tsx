/**
 * Visual English Book 1, Unit 16: VEGETABLES
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit16VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit16-video1',
    bookId: '1',
    unitId: '16',
    title: 'Vegetable Song - The Singing Walrus',
    description: 'A fun, animated song teaching vegetable vocabulary with colorful visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=RE5tvaveVak',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RE5tvaveVak?si=wY7QM0TuJxXvjKTm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit16-video2',
    bookId: '1',
    unitId: '16',
    title: 'Cooking Vegetables - WATTS ENGLISH',
    description: 'Video showing how to prepare vegetables with relevant vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=cd8HE9HCl-c',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/cd8HE9HCl-c?si=Nlv4Oqfzv5_eEhfi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit16-video3',
    bookId: '1',
    unitId: '16',
    title: 'Vegetable Names Song - ENGLISH TREE',
    description: 'Educational song teaching different vegetable names with clear pictures.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=g2GjP8Heqjw',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g2GjP8Heqjw?si=2nHJJaTESd0wOPKG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit16-video4',
    bookId: '1',
    unitId: '16',
    title: 'Guess the Vegetable - Interactive Game',
    description: 'Interactive video showing vegetables gradually and asking children to guess them.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=pdIZH2Zk_G0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pdIZH2Zk_G0?si=pa6mntZr1xX0G3rg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit16-video5',
    bookId: '1',
    unitId: '16',
    title: 'Vegetable Guessing Game for Kids',
    description: 'Another fun game where children try to identify vegetables from clues.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=98dEG7WjF1M',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/98dEG7WjF1M?si=ega62rKVe-7R4qVZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit16GameResources: TeacherResource[] = [
  {
    id: 'book1-unit16-game1',
    bookId: '1',
    unitId: '16',
    title: 'WORDWALL - VEGETABLES (1)',
    description: 'Interactive game to practice identifying and naming vegetables.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/4dd9de248dbb4b1e930c461ee3f5a6a5',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4dd9de248dbb4b1e930c461ee3f5a6a5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit16-game2',
    bookId: '1',
    unitId: '16',
    title: 'WORDWALL - VEGETABLES (2)',
    description: 'Another vegetable vocabulary game with different formats and interactions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/295589dd42e442228956c9fa7365aa96',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/295589dd42e442228956c9fa7365aa96?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit16Resources: TeacherResource[] = [
  ...book1Unit16VideoResources,
  ...book1Unit16GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit16Resources = () => book1Unit16Resources;

export default book1Unit16Resources;
