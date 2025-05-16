/**
 * Visual English Book 1, Unit 7: How Old Are You?
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 7
export const book1Unit7VideoResources: TeacherResource[] = [
  {
    id: "book1-unit7-video1",
    bookId: "1",
    unitId: "7",
    title: "Number Zoo 1-10",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=nsDanlM8_3c",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nsDanlM8_3c?si=owcKnsCijJfHmIWz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun video teaching numbers 1-10 with animated animals."
  },
  {
    id: "book1-unit7-video2",
    bookId: "1",
    unitId: "7",
    title: "Number Spelling 1-10 - Salamander",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=HG361wJyDY0",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HG361wJyDY0?si=-d2LBkehBjfjOKYC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Learn to spell numbers from 1 to 10 in English."
  },
  {
    id: "book1-unit7-video3",
    bookId: "1",
    unitId: "7",
    title: "How Old Are You - English Tree",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=JooOjnzWv3E",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JooOjnzWv3E?si=bqiXPFN_AS0j-2dw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song teaching children how to ask and answer about age."
  }
];

// Game resources for Unit 7
export const book1Unit7GameResources: TeacherResource[] = [
  {
    id: "book1-unit7-game1",
    bookId: "1",
    unitId: "7",
    title: "Wordwall - Numbers 1-10",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/43666156c96d455686dc6620f025c979",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/43666156c96d455686dc6620f025c979?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game to learn numbers from 1 to 10."
  },
  {
    id: "book1-unit7-game2",
    bookId: "1",
    unitId: "7",
    title: "Wordwall - Numbers 1-10 (2)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/6b732e25ee5641e38bdb2785e4fe390b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6b732e25ee5641e38bdb2785e4fe390b?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game for numbers 1-10 with visual representations."
  },
  {
    id: "book1-unit7-game3",
    bookId: "1",
    unitId: "7",
    title: "Wordwall - Numbers 1-10 (3)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/a0ac3f124ba146bda184a6fe30e24d5b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a0ac3f124ba146bda184a6fe30e24d5b?themeId=26&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A third interactive game for reinforcing number vocabulary from 1 to 10."
  }
];

// Combined resources for Unit 7
export const book1Unit7Resources: TeacherResource[] = [
  ...book1Unit7VideoResources,
  ...book1Unit7GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit7Resources = () => book1Unit7Resources;

export default book1Unit7Resources;