/**
 * Visual English Book 1, Unit 13: Clothes
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 13
export const book1Unit13VideoResources: TeacherResource[] = [
  {
    id: "book1-unit13-video1",
    bookId: "1",
    unitId: "13",
    title: "Clothes Song - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=KFQxBCvgx70",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/KFQxBCvgx70" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about different clothing items."
  },
  {
    id: "book1-unit13-video2",
    bookId: "1",
    unitId: "13",
    title: "Put On Your Shoes - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=jvUSwAai0-k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jvUSwAai0-k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song about getting dressed and putting on different clothing items."
  },
  {
    id: "book1-unit13-video3",
    bookId: "1",
    unitId: "13",
    title: "What Are You Wearing? - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=jNg3KuUFkxU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jNg3KuUFkxU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A video teaching the question 'What are you wearing?' and clothing vocabulary."
  }
];

// Game resources for Unit 13
export const book1Unit13GameResources: TeacherResource[] = [
  {
    id: "book1-unit13-game1",
    bookId: "1",
    unitId: "13",
    title: "Wordwall - Clothes Vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/clothes-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/15fc9e2c18e94155a7ec518ba3a5a8bd?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching clothing vocabulary with images."
  },
  {
    id: "book1-unit13-game2",
    bookId: "1",
    unitId: "13",
    title: "Wordwall - Weather and Clothes",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/weather-clothes",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/baae8544adcc48fc97ef8a5fc8293c32?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game connecting different weather conditions with appropriate clothing."
  }
];

// Combined resources for Unit 13
export const book1Unit13Resources: TeacherResource[] = [
  ...book1Unit13VideoResources,
  ...book1Unit13GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit13Resources = () => book1Unit13Resources;

export default book1Unit13Resources;