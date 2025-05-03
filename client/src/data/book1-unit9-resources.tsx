/**
 * Visual English Book 1, Unit 9: My Face
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit9VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit9-video1',
    bookId: '1',
    unitId: '9',
    title: 'Make a Robot Face - WATTS ENGLISH',
    description: 'A creative activity teaching face parts by creating a robot face.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=N6C8QueZdIc',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/N6C8QueZdIc?si=6aZJNoGxC67PcSVF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit9-video2',
    bookId: '1',
    unitId: '9',
    title: 'Make a Monster Face - WATTS ENGLISH',
    description: 'Fun activity creating monster faces while learning face vocabulary.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=YxARpdWQGpo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YxARpdWQGpo?si=5exwxWN_ncDJEwWW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit9-video3',
    bookId: '1',
    unitId: '9',
    title: 'Eyes Nose Mouth Ears Song - MAPLE LEAF',
    description: 'Catchy song about face parts with clear visuals and repetition.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=B2pmcJPQW3Q',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/B2pmcJPQW3Q?si=ycr9TZzcHG2UAiga" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit9-video4',
    bookId: '1',
    unitId: '9',
    title: 'Make a Face - Animation',
    description: 'Animated video showing how to create and describe different faces.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_QvqsubsAPI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_QvqsubsAPI?si=9VWxwCq7z-FbErWD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit9GameResources: TeacherResource[] = [
  {
    id: 'book1-unit9-game1',
    bookId: '1',
    unitId: '9',
    title: 'WORDWALL - FACE PARTS (1)',
    description: 'Interactive game to practice identifying and naming parts of the face.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/2e3ccaa1b8614ecb9bb246f5d3ce31a9',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2e3ccaa1b8614ecb9bb246f5d3ce31a9?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit9-game2',
    bookId: '1',
    unitId: '9',
    title: 'WORDWALL - FACE PARTS (2)',
    description: 'Match parts of the face with their correct English names.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/3fbe82aeba6d4d6586414339c30a9daa',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3fbe82aeba6d4d6586414339c30a9daa?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit9-game3',
    bookId: '1',
    unitId: '9',
    title: 'WORDWALL - FACE PARTS (3)',
    description: 'Quiz to test knowledge of face vocabulary in English.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/d6fd09fecf304eb7932f34e1272ee44f',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d6fd09fecf304eb7932f34e1272ee44f?themeId=26&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit9Resources: TeacherResource[] = [
  ...book1Unit9VideoResources,
  ...book1Unit9GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit9Resources = () => book1Unit9Resources;

export default book1Unit9Resources;
