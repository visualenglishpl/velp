/**
 * Visual English Book 1, Unit 17: Sports
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 17
export const book1Unit17VideoResources: TeacherResource[] = [
  {
    id: "book1-unit17-video1",
    bookId: "1",
    unitId: "17",
    title: "Sports Song - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=tgUSHk6JaTY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tgUSHk6JaTY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and engaging song introducing common sports activities for young learners."
  },
  {
    id: "book1-unit17-video2",
    bookId: "1",
    unitId: "17",
    title: "I Can Run - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=hft6uJQIF4g",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hft6uJQIF4g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song about different sports-related actions and movements with the phrase 'I can...'"
  },
  {
    id: "book1-unit17-video3",
    bookId: "1",
    unitId: "17",
    title: "Sports Vocabulary - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=4ZQQKGaXafs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/4ZQQKGaXafs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A detailed video showcasing different sports with clear pronunciation and visuals."
  }
];

// Game resources for Unit 17
export const book1Unit17GameResources: TeacherResource[] = [
  {
    id: "book1-unit17-game1",
    bookId: "1",
    unitId: "17",
    title: "Wordwall - Sports Vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/sports-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f5d97ea32b0a40738ce02a4c69d09a47?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching different sports activities."
  },
  {
    id: "book1-unit17-game2",
    bookId: "1",
    unitId: "17",
    title: "Wordwall - Sports Equipment Match",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/sports-equipment",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d14f21e2d7844e97a21243b6e9cac45c?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game connecting sports with the equipment needed to play them."
  }
];

// Combined resources for Unit 17
export const book1Unit17Resources: TeacherResource[] = [
  ...book1Unit17VideoResources,
  ...book1Unit17GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit17Resources = () => book1Unit17Resources;

export default book1Unit17Resources;