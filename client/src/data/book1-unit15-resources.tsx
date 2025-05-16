/**
 * Visual English Book 1, Unit 15: Fruit
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
    title: "Fruit Song for Kids - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=mfReSbQ7jzE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mfReSbQ7jzE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song by The Singing Walrus introducing various fruits with colorful animations."
  },
  {
    id: "book1-unit15-video2",
    bookId: "1",
    unitId: "15",
    title: "Fruit Salad - Watts English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=q780dw-1QE8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/q780dw-1QE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun video showing how to make a fruit salad while learning fruit vocabulary."
  },
  {
    id: "book1-unit15-video3",
    bookId: "1",
    unitId: "15",
    title: "Apples Are Yummy - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=oBF-_ZMkuH8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/oBF-_ZMkuH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A simple song about apples, perfect for very young learners."
  },
  {
    id: "book1-unit15-video4",
    bookId: "1",
    unitId: "15",
    title: "Fruit Song - Dream English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=QQZ03_v3K6Y",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/QQZ03_v3K6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A lively song from Dream English that helps children learn fruit vocabulary."
  },
  {
    id: "book1-unit15-video5",
    bookId: "1",
    unitId: "15",
    title: "Fruit Guessing Game for Kids",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=mVE9pYdwX-I",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mVE9pYdwX-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An interactive guessing game video where children identify different fruits."
  },
  {
    id: "book1-unit15-video6",
    bookId: "1",
    unitId: "15",
    title: "I Like Apples - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=wTTz2dL0jb8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/wTTz2dL0jb8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song about expressing likes with fruits, focusing on simple sentence patterns."
  }
];

// Game resources for Unit 15
export const book1Unit15GameResources: TeacherResource[] = [
  {
    id: "book1-unit15-game1",
    bookId: "1",
    unitId: "15",
    title: "Wordwall - Fruit Vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/bcf4964f6d694547a72d3909fd32d86c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bcf4964f6d694547a72d3909fd32d86c?themeId=1&templateId=46" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning and matching different fruits with their English names."
  },
  {
    id: "book1-unit15-game2",
    bookId: "1",
    unitId: "15",
    title: "Wordwall - Fruit Quiz",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/96231f6b6a204fb887b683064b6ac962",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/96231f6b6a204fb887b683064b6ac962?themeId=1&templateId=46" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A quiz to test knowledge of fruit vocabulary with colorful images."
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