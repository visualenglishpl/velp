/**
 * Visual English Book 1, Unit 10: My Crazy Hair
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit10VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit10-video1',
    bookId: '1',
    unitId: '10',
    title: 'Hair - PANCAKE MANOR',
    description: 'A fun and catchy song about hair for young learners.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=z2ucP1_EmO0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/z2ucP1_EmO0?si=9ILvDAnO-4yMbGvw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit10-video2',
    bookId: '1',
    unitId: '10',
    title: 'Funny Haircut - WATTS ENGLISH',
    description: 'A humorous video about getting a haircut, ideal for teaching hair-related vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=gEQOtbi7SbI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gEQOtbi7SbI?si=XsIxiKcJJefH0j34" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit10GameResources: TeacherResource[] = [
  {
    id: 'book1-unit10-game1',
    bookId: '1',
    unitId: '10',
    title: 'WORDWALL - MY CRAZY HAIR (1)',
    description: 'Interactive game to practice hair-related vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/0cafad4a8bd34df08bc5c773341708c3',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0cafad4a8bd34df08bc5c773341708c3?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit10-game2',
    bookId: '1',
    unitId: '10',
    title: 'WORDWALL - MY CRAZY HAIR (2)',
    description: 'Fun game to reinforce vocabulary related to hair and hairstyles.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/86601794244d4f05896b54f10ea16442',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/86601794244d4f05896b54f10ea16442?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit10-game3',
    bookId: '1',
    unitId: '10',
    title: 'WORDWALL - MY CRAZY HAIR (3)',
    description: 'Another interactive game focusing on hair descriptions and vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/16380f32f8d4405baf763ba85cd19368',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/16380f32f8d4405baf763ba85cd19368?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit10Resources: TeacherResource[] = [
  ...book1Unit10VideoResources,
  ...book1Unit10GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit10Resources = () => book1Unit10Resources;

export default book1Unit10Resources;
