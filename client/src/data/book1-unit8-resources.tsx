/**
 * Visual English Book 1, Unit 8: Shapes
 * Resources including videos and games
 */

import { TeacherResource } from '@/types/resources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 8
export const book1Unit8VideoResources: TeacherResource[] = [
  {
    id: "book1-unit8-video1",
    bookId: "1",
    unitId: "8",
    title: "The Shape Song #1 - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=TJhfl5vdxp4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/TJhfl5vdxp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about basic shapes like circle, square, triangle, and rectangle."
  },
  {
    id: "book1-unit8-video2",
    bookId: "1",
    unitId: "8",
    title: "The Shape Song #2 - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=03pyY9C2Pm8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/03pyY9C2Pm8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A follow-up song about shapes with more complex shapes and engaging visuals."
  },
  {
    id: "book1-unit8-video3",
    bookId: "1",
    unitId: "8",
    title: "Shapes - Pinkfong",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=WTeqUejf3D0",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WTeqUejf3D0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A colorful animation from Pinkfong teaching shapes with lively characters."
  },
  {
    id: "book1-unit8-video4",
    bookId: "1",
    unitId: "8", 
    title: "Shapes Song - English Tree",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=RrOiZ5KVw_E",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RrOiZ5KVw_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An English Tree production featuring a catchy shapes song for young learners."
  },
  {
    id: "book1-unit8-video5",
    bookId: "1",
    unitId: "8",
    title: "Shapes - Pinkfong Kids Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=vRNa_7-hhKw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/vRNa_7-hhKw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Another Pinkfong video about shapes with different characters and animations."
  },
  {
    id: "book1-unit8-video6",
    bookId: "1",
    unitId: "8",
    title: "Shapes - Pancake Manor",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=9GFEjNL0XXw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9GFEjNL0XXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and interactive shapes song featuring the Pancake Manor puppets."
  },
  {
    id: "book1-unit8-video7",
    bookId: "1",
    unitId: "8",
    title: "What Shape Is It? - Dream Kids",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=dsR0h50BiFQ",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dsR0h50BiFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An interactive video that helps children identify different shapes in real objects."
  }
];

// Game resources for Unit 8
export const book1Unit8GameResources: TeacherResource[] = [
  {
    id: "book1-unit8-game1",
    bookId: "1",
    unitId: "8",
    title: "Wordwall - Shapes Match",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/shapes-matching",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/64cf99ec01fa4bd3abd60e4d8622e9f1?themeId=1&templateId=2" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for matching shapes with their English names."
  },
  {
    id: "book1-unit8-game2",
    bookId: "1",
    unitId: "8",
    title: "Wordwall - Shapes Quiz",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/26566/english/shapes",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/26566/english/shapes?themeId=1&templateId=3" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A quiz to test knowledge of basic shape names and recognition."
  },
  {
    id: "book1-unit8-game3",
    bookId: "1",
    unitId: "8",
    title: "Interactive Shapes Game",
    resourceType: "game",
    provider: "TurtleDiary",
    sourceUrl: "https://www.turtlediary.com/game/shapes-identification.html",
    description: "A fun interactive game where children identify different shapes in a playful environment."
  }
];

// Combined resources for Unit 8
export const book1Unit8Resources: TeacherResource[] = [
  ...book1Unit8VideoResources,
  ...book1Unit8GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit8Resources = () => book1Unit8Resources;

export default book1Unit8Resources;