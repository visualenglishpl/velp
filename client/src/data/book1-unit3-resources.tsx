/**
 * Visual English Book 1, Unit 3: Colors
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 3
export const book1Unit3VideoResources: TeacherResource[] = [
  {
    id: "book1-unit3-video1",
    bookId: "1",
    unitId: "3",
    title: "I See Something Blue - Super Simple Songs",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=jYAWf8Y91hA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jYAWf8Y91hA?si=QgYzcRmMWS_x6zTN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun and engaging song that helps children learn colors by identifying objects of different colors."
  },
  {
    id: "book1-unit3-video2",
    bookId: "1",
    unitId: "3",
    title: "Colors Song - The Singing Walrus",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=xEUPr0ELQok",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xEUPr0ELQok?si=pWKR2B8q9M1T-FeZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song that teaches children about colors with clear visuals and repetitive lyrics."
  },
  {
    id: "book1-unit3-video3",
    bookId: "1",
    unitId: "3",
    title: "Rainbow Colors Song - KidsTV123",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=SLZcWGQQsmg",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/SLZcWGQQsmg?si=jhGnV3jU_6FvjwsW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Learn the colors of the rainbow with this simple and melodic song that helps children remember color vocabulary."
  },
  {
    id: "book1-unit3-video4",
    bookId: "1",
    unitId: "3",
    title: "What Color Is It? - Dream English Kids",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=tQASh8bbkUY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tQASh8bbkUY?si=v4Qr_O2MJm-2FwJd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An interactive song that asks 'What color is it?' and helps children practice identifying colors with everyday objects."
  }
];

// Game resources for Unit 3
export const book1Unit3GameResources: TeacherResource[] = [
  {
    id: "book1-unit3-game1",
    bookId: "1",
    unitId: "3",
    title: "WORDWALL - COLORS (1)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/29970061/colours",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29970061/colours?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Match color words to their corresponding colored objects in this interactive game."
  },
  {
    id: "book1-unit3-game2",
    bookId: "1",
    unitId: "3",
    title: "WORDWALL - COLORS (2)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/1896724/colours-what-colour",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1896724/colours-what-colour?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Test your knowledge of colors with this interactive quiz that asks 'What color is it?'"
  },
  {
    id: "book1-unit3-game3",
    bookId: "1",
    unitId: "3",
    title: "WORDWALL - COLORS (3)",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/1232028/colours",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1232028/colours?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Pop the balloons that match the color word in this fun and engaging game."
  }
];

// Combined resources for Unit 3
export const book1Unit3Resources: TeacherResource[] = [
  ...book1Unit3VideoResources,
  ...book1Unit3GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit3Resources = () => book1Unit3Resources;

export default book1Unit3Resources;
