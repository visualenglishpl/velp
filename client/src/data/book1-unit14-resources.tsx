/**
 * Visual English Book 1, Unit 14: Toys
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 14
export const book1Unit14VideoResources: TeacherResource[] = [
  {
    id: "book1-unit14-video1",
    bookId: "1",
    unitId: "14",
    title: "Toys Song - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=aMTIm-D1l54",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/aMTIm-D1l54" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and catchy song teaching children vocabulary about different toys."
  },
  {
    id: "book1-unit14-video2",
    bookId: "1",
    unitId: "14",
    title: "I Like to Play - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=8b_vZm7mNd8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8b_vZm7mNd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song about different toys and the phrase 'I like to play with...'"
  },
  {
    id: "book1-unit14-video3",
    bookId: "1",
    unitId: "14",
    title: "My Toys - Learning Toys Vocabulary",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=RjRbX4UTOG8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RjRbX4UTOG8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A clear video teaching toy vocabulary with visual aids and simple sentences."
  }
];

// Game resources for Unit 14
export const book1Unit14GameResources: TeacherResource[] = [
  {
    id: "book1-unit14-game1",
    bookId: "1",
    unitId: "14",
    title: "Wordwall - Toys Vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/toys-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dcf42b1f7aed42c09c72bcd2e6c984e1?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching toys with their names."
  },
  {
    id: "book1-unit14-game2",
    bookId: "1",
    unitId: "14",
    title: "Wordwall - My Favorite Toys",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/favorite-toys",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a83b6e1c7b8245c2a98b6d1d7fa92a30?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game connecting toys with descriptive words and phrases."
  }
];

// Combined resources for Unit 14
export const book1Unit14Resources: TeacherResource[] = [
  ...book1Unit14VideoResources,
  ...book1Unit14GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit14Resources = () => book1Unit14Resources;

export default book1Unit14Resources;