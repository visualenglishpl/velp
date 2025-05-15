/**
 * Visual English Book 1, Unit 16: Jobs
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 16
export const book1Unit16VideoResources: TeacherResource[] = [
  {
    id: "book1-unit16-video1",
    bookId: "1",
    unitId: "16",
    title: "Jobs Song - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=ckKQclquAXU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ckKQclquAXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and engaging song introducing common jobs and occupations for young learners."
  },
  {
    id: "book1-unit16-video2",
    bookId: "1",
    unitId: "16",
    title: "People Work - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=R6vXphKya8A",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/R6vXphKya8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A video showcasing different professions and what each job involves."
  },
  {
    id: "book1-unit16-video3",
    bookId: "1",
    unitId: "16",
    title: "What Do You Do? - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=ckFuk2U-2Sw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ckFuk2U-2Sw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song teaching how to ask and answer questions about jobs and occupations."
  }
];

// Game resources for Unit 16
export const book1Unit16GameResources: TeacherResource[] = [
  {
    id: "book1-unit16-game1",
    bookId: "1",
    unitId: "16",
    title: "Wordwall - Jobs and Occupations",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/jobs-occupations",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dfa73c3ca62d4c9a824fe5c5cc92c2bd?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching different jobs and occupations."
  },
  {
    id: "book1-unit16-game2",
    bookId: "1",
    unitId: "16",
    title: "Wordwall - What Do They Do?",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/what-do-they-do",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/26a66bbea04f495abef34d6a7f8c5e88?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game connecting job titles with their activities and responsibilities."
  }
];

// Combined resources for Unit 16
export const book1Unit16Resources: TeacherResource[] = [
  ...book1Unit16VideoResources,
  ...book1Unit16GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit16Resources = () => book1Unit16Resources;

export default book1Unit16Resources;