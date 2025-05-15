/**
 * Visual English Book 1, Unit 15: Transport
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 15
export const book1Unit15VideoResources: TeacherResource[] = [
  {
    id: "book1-unit15-video1",
    bookId: "1",
    unitId: "15",
    title: "The Wheels on the Bus - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=yWirdnSDsV4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yWirdnSDsV4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A classic children's song about a bus, perfect for introducing transport vocabulary."
  },
  {
    id: "book1-unit15-video2",
    bookId: "1",
    unitId: "15",
    title: "Transportation Song - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Ut-HbauKzDw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ut-HbauKzDw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song teaching various means of transportation with clear visuals."
  },
  {
    id: "book1-unit15-video3",
    bookId: "1",
    unitId: "15",
    title: "Transport Vocabulary - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=biX7NNxw_w8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/biX7NNxw_w8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A detailed video introducing various transportation methods with clear pronunciation."
  }
];

// Game resources for Unit 15
export const book1Unit15GameResources: TeacherResource[] = [
  {
    id: "book1-unit15-game1",
    bookId: "1",
    unitId: "15",
    title: "Wordwall - Transport Vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/transport-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a47d8a73d0f4e199ca18266fc8c29ac?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching different modes of transportation."
  },
  {
    id: "book1-unit15-game2",
    bookId: "1",
    unitId: "15",
    title: "Wordwall - Transport Sorting",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/transport-sorting",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ed33b566d5a74ac58df9ddef6c4c7cd5?themeId=1&templateId=8" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A sorting game where students categorize different types of transport (land, air, water)."
  }
];

// Combined resources for Unit 15
export const book1Unit15Resources: TeacherResource[] = [
  ...book1Unit15VideoResources,
  ...book1Unit15GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit15Resources = () => book1Unit15Resources;

export default book1Unit15Resources;