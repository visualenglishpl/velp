/**
 * Visual English Book 1, Unit 4: Shapes
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
    title: "The Shapes Song - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=TJhfl5vdxp4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/TJhfl5vdxp4?si=vY8T6XncJ4BpR1oY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song that introduces basic shapes with clear animations and repetitive lyrics."
  },
  {
    id: "book1-unit4-video2",
    bookId: "1",
    unitId: "4",
    title: "Shapes Song - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=JsCn-pxZWzE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JsCn-pxZWzE?si=7PtaJERmVQl5BzPM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Learn basic geometric shapes with this engaging song that features clear visuals and catchy melody."
  },
  {
    id: "book1-unit4-video3",
    bookId: "1",
    unitId: "4",
    title: "Make a Robot Face - WATTS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=8hIq9fXSrfx",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8hIq9fXSrfx?si=ZCIzgT30a0vtFWw_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun creative activity that uses shapes to build a robot face, reinforcing shape vocabulary in a practical context."
  },
  {
    id: "book1-unit4-video4",
    bookId: "1",
    unitId: "4",
    title: "3D Shapes I Know - Dream English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=ZnZYK83utu0",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZnZYK83utu0?si=NdqhMpZ1wPfNJw6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "This song introduces 3D shapes like spheres, cylinders, and cubes with real-world examples."
  }
];

// Game resources for Unit 4
export const book1Unit4GameResources: TeacherResource[] = [
  {
    id: "book1-unit4-game1",
    bookId: "1",
    unitId: "4",
    title: "WORDWALL - SHAPES (1)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/42540/shapes-memory-match",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/42540/shapes-memory-match?themeId=1&templateId=11&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Match shape words with their corresponding images in this memory match game."
  },
  {
    id: "book1-unit4-game2",
    bookId: "1",
    unitId: "4",
    title: "WORDWALL - SHAPES (2)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/483357/shapes-quiz",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/483357/shapes-quiz?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Test your knowledge of basic shapes with this interactive quiz."
  },
  {
    id: "book1-unit4-game3",
    bookId: "1",
    unitId: "4",
    title: "WORDWALL - SHAPES (3)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/21986291/shapes",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/21986291/shapes?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Practice identifying different shapes with this fun interactive game."
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
