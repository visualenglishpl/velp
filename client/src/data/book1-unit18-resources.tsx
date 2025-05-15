/**
 * Visual English Book 1, Unit 18: Countries
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 18
export const book1Unit18VideoResources: TeacherResource[] = [
  {
    id: "book1-unit18-video1",
    bookId: "1",
    unitId: "18",
    title: "Countries of the World Song - Kids Learning Tube",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=2nKNhNifp6M",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2nKNhNifp6M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song introducing countries around the world with colorful animations of their flags."
  },
  {
    id: "book1-unit18-video2",
    bookId: "1",
    unitId: "18",
    title: "Where Are You From? - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=v9LBKgnABgw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v9LBKgnABgw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A video teaching how to ask and answer questions about where people are from."
  },
  {
    id: "book1-unit18-video3",
    bookId: "1",
    unitId: "18",
    title: "Hello in Different Languages - Rock 'n Learn",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=472AnCrHYVs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/472AnCrHYVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun video showing how to say hello in different languages from around the world."
  }
];

// Game resources for Unit 18
export const book1Unit18GameResources: TeacherResource[] = [
  {
    id: "book1-unit18-game1",
    bookId: "1",
    unitId: "18",
    title: "Wordwall - Countries and Flags",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/countries-flags",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/17fc67d2be3d44fba8b52ef527f5b2c2?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for matching countries with their flags."
  },
  {
    id: "book1-unit18-game2",
    bookId: "1",
    unitId: "18",
    title: "Wordwall - Where Are You From?",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/where-are-you-from",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c83b5c2546eb450dbb4d47fa7a17f0b1?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game practicing country names, flags, and nationalities."
  }
];

// Combined resources for Unit 18
export const book1Unit18Resources: TeacherResource[] = [
  ...book1Unit18VideoResources,
  ...book1Unit18GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit18Resources = () => book1Unit18Resources;

export default book1Unit18Resources;