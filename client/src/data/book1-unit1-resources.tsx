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

// Games for Unit 1 - Good Morning/Greetings theme
export const book1Unit1GameResources: TeacherResource[] = [
  {
    id: "book1-unit1-game1",
    bookId: "1",
    unitId: "1",
    title: "Greetings Matching Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/17380539/english/greetings",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/9c5d2e9bccdf4bd19f3cee383d75d0cc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Match different greeting expressions with the appropriate situations."
  },
  {
    id: "book1-unit1-game2",
    bookId: "1",
    unitId: "1",
    title: "Good Morning Good Night Quiz",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/31086766/good-morning-good-night",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/d4d48a8aafea416fa8ceedc8b5f84b8d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive quiz about greetings for different times of day."
  },
  {
    id: "book1-unit1-game3",
    bookId: "1",
    unitId: "1",
    title: "Greetings and Farewells",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/47045902/greetings-and-farewells",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/1b5d9b49e2a14c95a63c9f65cbde51c7?themeId=44&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive activity to practice different ways to say hello and goodbye."
  }
];

// Combined resources for Unit 1
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit1Resources = () => book1Unit1Resources;

export default book1Unit1Resources;