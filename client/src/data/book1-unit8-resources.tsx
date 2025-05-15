/**
 * Visual English Book 1, Unit 8: Shapes
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 8
export const book1Unit8VideoResources: TeacherResource[] = [
  {
    id: "book1-unit8-video1",
    bookId: "1",
    unitId: "8",
    title: "The Shape Song #1 - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=TJhfl5vdxp4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/TJhfl5vdxp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about basic shapes like circle, square, triangle, and rectangle."
  },
  {
    id: "book1-unit8-video2",
    bookId: "1",
    unitId: "8",
    title: "Learn Shapes - Super Simple",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=zUfqgRtvaYQ",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/zUfqgRtvaYQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An animated video showing children how to identify and draw basic shapes."
  },
  {
    id: "book1-unit8-video3",
    bookId: "1",
    unitId: "8",
    title: "Shapes Song - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=N6kPcQSSsEY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/N6kPcQSSsEY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song by The Singing Walrus teaching various shapes with vivid animations."
  }
];

// Game resources for Unit 8
export const book1Unit8GameResources: TeacherResource[] = [
  {
    id: "book1-unit8-game1",
    bookId: "1",
    unitId: "8",
    title: "Wordwall - Shapes",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/shapes-matching",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/64cf99ec01fa4bd3abd60e4d8622e9f1?themeId=1&templateId=2" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for matching shapes with their English names."
  }
];

// Combined resources for Unit 8
export const book1Unit8Resources: TeacherResource[] = [
  ...book1Unit8VideoResources,
  ...book1Unit8GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit8Resources = () => book1Unit8Resources;

export default book1Unit8Resources;