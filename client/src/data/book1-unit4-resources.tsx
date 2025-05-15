/**
 * Visual English Book 1, Unit 4: How Are You?
 * Resources including videos and games about emotions
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 4
export const book1Unit4VideoResources: TeacherResource[] = [
  {
    id: "book1-unit4-video1",
    bookId: "1",
    unitId: "4",
    title: "How Are You Today? - Maple Leaf Learning",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=teMU8dHLqSI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/teMU8dHLqSI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children different emotions with fun animations."
  },
  {
    id: "book1-unit4-video2",
    bookId: "1",
    unitId: "4",
    title: "Are You Hungry? - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Qm4Io3lUlMY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Qm4Io3lUlMY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song about feeling hungry and thirsty with cute characters."
  },
  {
    id: "book1-unit4-video3",
    bookId: "1",
    unitId: "4",
    title: "Are You Thirsty, Hungry and Sick? - Watts English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=zzR1mTdLYSU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/zzR1mTdLYSU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A video teaching vocabulary about different feelings and states with colorful visuals."
  },
  {
    id: "book1-unit4-video4",
    bookId: "1",
    unitId: "4",
    title: "Are You Happy, Sad, Hot or Cold? - Watts English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=iEUUA3SO9uc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/iEUUA3SO9uc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A comprehensive video covering multiple emotions with fun animations and songs."
  }
];

// Game resources for Unit 4
export const book1Unit4GameResources: TeacherResource[] = [
  {
    id: "book1-unit4-game1",
    bookId: "1",
    unitId: "4",
    title: "Wordwall - How Are You? Emotions",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/emotions-feelings",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5e3fdecdfbd945af91d3faf67f0aa8d1?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "An interactive game for matching emotions with their English names and pictures."
  },
  {
    id: "book1-unit4-game2",
    bookId: "1",
    unitId: "4",
    title: "Wordwall - How Are You? How is the Dog?",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/how-are-you-matching",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c9cd9b3a31a342809bcd9a51f7c43421?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game where students connect emotion words with corresponding images."
  }
];

// Combined resources for Unit 4
export const book1Unit4Resources: TeacherResource[] = [
  ...book1Unit4VideoResources,
  ...book1Unit4GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit4Resources = () => book1Unit4Resources;

export default book1Unit4Resources;