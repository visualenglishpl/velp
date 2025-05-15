/**
 * Visual English Book 1, Unit 9: My Face
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 9
export const book1Unit9VideoResources: TeacherResource[] = [
  {
    id: "book1-unit9-video1",
    bookId: "1",
    unitId: "9",
    title: "Face Parts Song - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=_JVQbgSQhQU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_JVQbgSQhQU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song teaching children about different parts of the face with colorful animations."
  },
  {
    id: "book1-unit9-video2",
    bookId: "1",
    unitId: "9",
    title: "Make a Face - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=wdGP0N9BdNE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wdGP0N9BdNE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An interactive video where children learn to identify and name different parts of the face."
  },
  {
    id: "book1-unit9-video3",
    bookId: "1",
    unitId: "9",
    title: "Make A Robot Face - Watts English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=9uvKZZ2hPmU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9uvKZZ2hPmU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A creative video where students learn face parts by creating a robot face."
  }
];

// Game resources for Unit 9
export const book1Unit9GameResources: TeacherResource[] = [
  {
    id: "book1-unit9-game1",
    bookId: "1",
    unitId: "9",
    title: "Wordwall - Parts of the Face",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/face-parts",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1a3c1c1c8bee41be969e1f15358d9b32?themeId=1&templateId=46" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning the names of different parts of the face."
  }
];

// Combined resources for Unit 9
export const book1Unit9Resources: TeacherResource[] = [
  ...book1Unit9VideoResources,
  ...book1Unit9GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit9Resources = () => book1Unit9Resources;

export default book1Unit9Resources;