/**
 * Visual English Book 1, Unit 2: School Objects
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 2
export const book1Unit2VideoResources: TeacherResource[] = [
  {
    id: "book1-unit2-video1",
    bookId: "1",
    unitId: "2",
    title: "School Objects - ENGLISH TREE",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=41cJ0mqWses",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/41cJ0mqWses" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    description: "Learn essential school objects vocabulary with this clear educational video."
  },
  {
    id: "book1-unit2-video2",
    bookId: "1",
    unitId: "2",
    title: "Magic Crayons - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Ix4dSjKqwvc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ix4dSjKqwvc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    description: "A fun story about magic crayons that introduces school supplies vocabulary in a creative way."
  },
  {
    id: "book1-unit2-video3",
    bookId: "1",
    unitId: "2",
    title: "PPAP Pen Pineapple Apple Pen - PIKOTARO",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Ct6BUPvE2sM",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ct6BUPvE2sM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    description: "The viral song that helps students remember the word 'pen' in a catchy and memorable way."
  },
  {
    id: "book1-unit2-video4",
    bookId: "1",
    unitId: "2",
    title: "What is In Your Bag Song - DREAM ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=JLMsm-D7kjk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JLMsm-D7kjk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    description: "A song that teaches school supplies vocabulary in the context of what students carry in their bags."
  },
  {
    id: "book1-unit2-video5",
    bookId: "1",
    unitId: "2",
    title: "Back to School Mix - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=F9OdB53UGmA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/F9OdB53UGmA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    description: "A fun mix of back to school themed content to review school supplies vocabulary."
  }
];

// Game resources for Unit 2
export const book1Unit2GameResources: TeacherResource[] = [
  {
    id: "book1-unit2-game1",
    bookId: "1",
    unitId: "2",
    title: "School Objects - Matching Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/db3feb02d90048c794504e2a408ef901",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Match school objects to their names in this interactive matching game."
  },
  {
    id: "book1-unit2-game2",
    bookId: "1",
    unitId: "2",
    title: "School Objects - Recognition Quiz",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5282ddaa503a4c5e9875ee2426934081",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Test students' recognition of school objects with this interactive quiz."
  },
  {
    id: "book1-unit2-game3",
    bookId: "1",
    unitId: "2",
    title: "School Objects - Vocabulary Practice",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5ce51d4acf1e41058c70f1b6d1951f8a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5ce51d4acf1e41058c70f1b6d1951f8a?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Practice school objects vocabulary with this interactive activity."
  }
];

// Combined resources for Unit 2
export const book1Unit2Resources: TeacherResource[] = [
  ...book1Unit2VideoResources,
  ...book1Unit2GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit2Resources = () => book1Unit2Resources;

export default book1Unit2Resources;
