/**
 * Visual English Book 1, Unit 1: Good Morning
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 1
export const book1Unit1VideoResources: TeacherResource[] = [
  {
    id: "book1-unit1-video1",
    bookId: "1",
    unitId: "1",
    title: "Good Morning - PINKFONG",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=7CuZr1Dz3sk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and energetic animation teaching children how to say 'Good Morning' in English."
  },
  {
    id: "book1-unit1-video2",
    bookId: "1",
    unitId: "1",
    title: "Good Morning, Good Night - LITTLE FOX",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=eUXkj6j6Ezw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/eUXkj6j6Ezw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An adorable animated video teaching children greetings for different times of the day."
  }
];

// No games listed for Unit 1 in the provided document
export const book1Unit1GameResources: TeacherResource[] = [];

// Combined resources for Unit 1
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit1Resources = () => book1Unit1Resources;

export default book1Unit1Resources;