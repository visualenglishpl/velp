/**
 * Visual English Book 1, Unit 12: Home Sweet Home
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit12VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit12-video1',
    bookId: '1',
    unitId: '12',
    title: 'Rooms Of The House Song - Planet Pop',
    description: 'A catchy song teaching children about different rooms in a house.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=168xwPpHF-s',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/168xwPpHF-s?si=thx8KCVtfHFs4fIZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit12-video2',
    bookId: '1',
    unitId: '12',
    title: 'VIDEO STORY Rooms in the House WATTS ENGLISH',
    description: 'A story-based video teaching vocabulary related to different rooms in a house.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=mV-TnrvUJ9Q',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mV-TnrvUJ9Q?si=_1RwYaFCYbP1Yccb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit12-video3',
    bookId: '1',
    unitId: '12',
    title: 'VIDEO QUIZ - Rooms of the House Game',
    description: 'An interactive quiz to test knowledge of rooms in the house vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=kIg__488rCs',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kIg__488rCs?si=IIi8t6dHhBKJB8Dq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit12GameResources: TeacherResource[] = [
  {
    id: 'book1-unit12-game1',
    bookId: '1',
    unitId: '12',
    title: 'WORDWALL - ROOMS IN THE HOUSE (1)',
    description: 'Interactive game to practice identifying and naming different rooms in a house.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/64037ab981484c46a7fdd820ecbe0ca1',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/64037ab981484c46a7fdd820ecbe0ca1?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit12-game2',
    bookId: '1',
    unitId: '12',
    title: 'WORDWALL - ROOMS IN THE HOUSE (2)',
    description: 'A matching game for rooms in the house vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/f80c09de5f2a431ba2eadc93b12cac3c',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f80c09de5f2a431ba2eadc93b12cac3c?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit12-game3',
    bookId: '1',
    unitId: '12',
    title: 'WORDWALL - ROOMS IN THE HOUSE (3)',
    description: 'Another interactive game focusing on house vocabulary.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a2e9207ad2234b8d8ab2daf8c9e439c5',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a2e9207ad2234b8d8ab2daf8c9e439c5?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit12-game4',
    bookId: '1',
    unitId: '12',
    title: 'WORDWALL - ROOMS IN THE HOUSE (4)',
    description: 'A colorful game to consolidate learning about rooms in the house.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/62517d93002d490d8ede52bb5c748ebc',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/62517d93002d490d8ede52bb5c748ebc?themeId=23&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit12Resources: TeacherResource[] = [
  ...book1Unit12VideoResources,
  ...book1Unit12GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit12Resources = () => book1Unit12Resources;

export default book1Unit12Resources;
