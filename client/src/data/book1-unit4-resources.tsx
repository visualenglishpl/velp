/**
 * Visual English Book 1, Unit 4: How Are You?
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 4
export const book1Unit4VideoResources: TeacherResource[] = [
  {
    id: "book1-unit4-video1",
    bookId: "1",
    unitId: "4",
    title: "Are You Happy Sad Hot Cold - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=5su1M6NdG-I",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/5su1M6NdG-I?si=VDPLCxtaD7jlbp6l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and engaging video about different feelings and physical states, perfect for teaching emotions vocabulary."
  },
  {
    id: "book1-unit4-video2",
    bookId: "1",
    unitId: "4",
    title: "Are you Thirsty Hungry and Sick - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=iztRyiYIwUs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/iztRyiYIwUs?si=fVLZihbWVRUgpwXt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Learn about physical states like being hungry, thirsty, or sick with this interactive video."
  },
  {
    id: "book1-unit4-video3",
    bookId: "1",
    unitId: "4",
    title: "Are You Hungry Kids - SUPER SIMPLE SONGS",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=ykTR0uFGwE0",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ykTR0uFGwE0?si=Y5Ty39bwGYrdD-W6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song about being hungry and different foods children like to eat."
  },
  {
    id: "book1-unit4-video4",
    bookId: "1",
    unitId: "4",
    title: "How Are You Today - MAPLE LEAF",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=teMU8dHLqSI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/teMU8dHLqSI?si=QuGLh_wOKnY8LR2k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A cheerful song teaching children how to ask and answer about feelings in English."
  },
  {
    id: "book1-unit4-video5",
    bookId: "1",
    unitId: "4",
    title: "SKIT How Are You Today - MAPLE LEAF",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=kR6Qcqx2fJE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kR6Qcqx2fJE?si=ZhzOtIlzF8guQFDx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A helpful skit demonstrating how to use 'How are you?' in everyday conversations."
  }
];

// Game resources for Unit 4
export const book1Unit4GameResources: TeacherResource[] = [
  {
    id: "book1-unit4-game1",
    bookId: "1",
    unitId: "4",
    title: "WORDWALL - HOW ARE YOU - HOW IS THE DOG",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/cc9df848c6a94c99b8dcf9c9b65caeb4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cc9df848c6a94c99b8dcf9c9b65caeb4?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Practice asking and answering 'How are you?' questions with different characters."
  },
  {
    id: "book1-unit4-game2",
    bookId: "1",
    unitId: "4",
    title: "WORDWALL - HOW ARE YOU",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/61576e9315e949fd9a89477f5807ce46",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/61576e9315e949fd9a89477f5807ce46?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An interactive game to practice different feelings and states."
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
