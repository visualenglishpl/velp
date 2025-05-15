/**
 * Visual English Book 1, Unit 12: Rooms in the House
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 12
export const book1Unit12VideoResources: TeacherResource[] = [
  {
    id: "book1-unit12-video1",
    bookId: "1",
    unitId: "12",
    title: "Rooms of the House Song - Planet Pop",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=F1oY0c4Vy0g",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/F1oY0c4Vy0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song teaching children the names of different rooms in a house."
  },
  {
    id: "book1-unit12-video2",
    bookId: "1",
    unitId: "12",
    title: "Where is it? - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=8F0NYBBKczM",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8F0NYBBKczM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A video teaching prepositions and location vocabulary that can be used with rooms in a house."
  },
  {
    id: "book1-unit12-video3",
    bookId: "1",
    unitId: "12",
    title: "House Vocabulary - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=R9intHqlzhc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/R9intHqlzhc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A detailed video showing rooms in a house and the furniture/items typically found in each room."
  }
];

// Game resources for Unit 12
export const book1Unit12GameResources: TeacherResource[] = [
  {
    id: "book1-unit12-game1",
    bookId: "1",
    unitId: "12",
    title: "Wordwall - Rooms in a House",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/rooms-house",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/fc8c91dc23da4b00a9ab59d74e47e8cb?themeId=1&templateId=46" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning the names of different rooms in a house."
  },
  {
    id: "book1-unit12-game2",
    bookId: "1",
    unitId: "12",
    title: "Wordwall - Furniture and Rooms Match",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/furniture-rooms",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dbc86a8af3ef46b8a4e93c88f520c8c3?themeId=1&templateId=2" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game where students connect furniture with the appropriate room."
  }
];

// Combined resources for Unit 12
export const book1Unit12Resources: TeacherResource[] = [
  ...book1Unit12VideoResources,
  ...book1Unit12GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit12Resources = () => book1Unit12Resources;

export default book1Unit12Resources;