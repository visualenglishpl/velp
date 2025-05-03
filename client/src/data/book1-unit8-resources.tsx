/**
 * Visual English Book 1, Unit 8: Shapes
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit8VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit8-video1',
    bookId: '1',
    unitId: '8',
    title: 'The Shape Song 1 - Super Simple Songs',
    description: 'A catchy song that introduces basic shapes with clear animations.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=TJhfl5vdxp4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/TJhfl5vdxp4?si=6rVtTBbIENScQqy-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit8-video2',
    bookId: '1',
    unitId: '8',
    title: 'The Shape Song 2 - Super Simple Songs',
    description: 'A continuation of the shape song with more advanced shapes.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=03pyY9C2Pm8',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/03pyY9C2Pm8?si=MIf13-bIxze2_vF_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit8-video3',
    bookId: '1',
    unitId: '8',
    title: 'Shapes - PINKFONG',
    description: 'A fun and colorful video teaching basic shapes through animation.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=0B6Ge0FzHG0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0B6Ge0FzHG0?si=pQL9a255hrzGG3Gv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit8-video4',
    bookId: '1',
    unitId: '8',
    title: 'Shapes Song - ENGLISH TREE',
    description: 'An educational song about different shapes with clear visuals.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=FOZLDVnvrZM',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FOZLDVnvrZM?si=1qm7XlmfoLJJrH0f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit8-video5',
    bookId: '1',
    unitId: '8',
    title: 'Shapes - PINKFONG (Alternate)',
    description: 'Another PINKFONG video about shapes with different examples and activities.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=lcl8uB2AWM0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/lcl8uB2AWM0?si=-SHyNKki0N2YVjkR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit8-video6',
    bookId: '1',
    unitId: '8',
    title: 'What Shape Is It - DREAM KIDS',
    description: 'An interactive video asking children to identify different shapes.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=9GFEjNL0XXw',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9GFEjNL0XXw?si=FADkhaPtpTyIi7au" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit8GameResources: TeacherResource[] = [
  {
    id: 'book1-unit8-game1',
    bookId: '1',
    unitId: '8',
    title: 'WORDWALL - SHAPES',
    description: 'Interactive game to practice identifying and naming different shapes.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a3dfd9e2aa764904a073828747936488',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a3dfd9e2aa764904a073828747936488?themeId=21&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit8Resources: TeacherResource[] = [
  ...book1Unit8VideoResources,
  ...book1Unit8GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit8Resources = () => book1Unit8Resources;

export default book1Unit8Resources;
