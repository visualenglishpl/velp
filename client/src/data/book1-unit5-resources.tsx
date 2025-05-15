/**
 * Visual English Book 1, Unit 5: Family
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 5
export const book1Unit5VideoResources: TeacherResource[] = [
  {
    id: "book1-unit5-video1",
    bookId: "1",
    unitId: "5",
    title: "The Finger Family",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=1EyrquyRg5s",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/1EyrquyRg5s?si=3Zq8IQRNRyPxT6CU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun, catchy song about family members using fingers to represent different family roles."
  },
  {
    id: "book1-unit5-video2",
    bookId: "1",
    unitId: "5",
    title: "My Family - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=VvrG4JguNQk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An engaging video teaching vocabulary about family members and relationships."
  },
  {
    id: "book1-unit5-video3",
    bookId: "1",
    unitId: "5",
    title: "Baby Shark Dance - PINKFONG",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=XqZsoesa55w",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "The worldwide hit song introducing family members (baby shark, mommy shark, daddy shark, etc.)."
  },
  {
    id: "book1-unit5-video4",
    bookId: "1",
    unitId: "5",
    title: "Baby Shark - SUPER SIMPLE SONGS",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=GR2o6k8aPlI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Another version of the Baby Shark song, ideal for learning family vocabulary."
  },
  {
    id: "book1-unit5-video5",
    bookId: "1",
    unitId: "5",
    title: "Family - ENGLISH TREE",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=d_WQEw13TCo",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A educational video introducing family vocabulary through clear illustrations and pronunciation."
  }
];

// Game resources for Unit 5
export const book1Unit5GameResources: TeacherResource[] = [
  {
    id: "book1-unit5-game1",
    bookId: "1",
    unitId: "5",
    title: "WORDWALL - FAMILY - Game 1",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/e5f62afa86814cc98336327469ce1554",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "An interactive game to practice family member vocabulary."
  },
  {
    id: "book1-unit5-game2",
    bookId: "1",
    unitId: "5",
    title: "WORDWALL - FAMILY - Game 2",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/d1bc1e8629a445468a696f03f372e5e9",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Another fun game to reinforce family vocabulary."
  },
  {
    id: "book1-unit5-game3",
    bookId: "1",
    unitId: "5",
    title: "WORDWALL - FAMILY - Game 3",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/1c606c6af00643d692fc0199a60c2b2c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A third interactive game for practicing family vocabulary."
  }
];

// Combined resources for Unit 5
export const book1Unit5Resources: TeacherResource[] = [
  ...book1Unit5VideoResources,
  ...book1Unit5GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit5Resources = () => book1Unit5Resources;

export default book1Unit5Resources;