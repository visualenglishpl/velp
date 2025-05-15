/**
 * Visual English Book 1, Unit 11: Seasons
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 11
export const book1Unit11VideoResources: TeacherResource[] = [
  {
    id: "book1-unit11-video1",
    bookId: "1",
    unitId: "11",
    title: "Season Song - Pancake Manor",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=8ZjpI6fgYSY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZjpI6fgYSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about the four seasons and their characteristics."
  },
  {
    id: "book1-unit11-video2",
    bookId: "1",
    unitId: "11",
    title: "Weather Song - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=XcW9Ct000yY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XcW9Ct000yY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song teaching weather vocabulary related to different seasons."
  },
  {
    id: "book1-unit11-video3",
    bookId: "1",
    unitId: "11",
    title: "Four Seasons Song - Have Fun Teaching",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Iisj2kTZIFs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Iisj2kTZIFs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An educational song about the four seasons with clear visuals of seasonal activities and weather."
  }
];

// Game resources for Unit 11
export const book1Unit11GameResources: TeacherResource[] = [
  {
    id: "book1-unit11-game1",
    bookId: "1",
    unitId: "11",
    title: "Wordwall - Seasons Match",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/seasons-match",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ca65b95ea4b442c2a94ca9e15e81db42?themeId=1&templateId=22" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "An interactive matching game for learning seasons vocabulary and characteristics."
  },
  {
    id: "book1-unit11-game2",
    bookId: "1",
    unitId: "11",
    title: "Wordwall - Weather and Seasons",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/weather-seasons",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e75b7a2dd6a04f2e8761b8ebd8e7c82d?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A game connecting weather conditions with appropriate seasons."
  }
];

// Combined resources for Unit 11
export const book1Unit11Resources: TeacherResource[] = [
  ...book1Unit11VideoResources,
  ...book1Unit11GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit11Resources = () => book1Unit11Resources;

export default book1Unit11Resources;