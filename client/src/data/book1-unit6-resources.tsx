/**
 * Visual English Book 1, Unit 6: My Favourite Colour
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 6
export const book1Unit6VideoResources: TeacherResource[] = [
  {
    id: "book1-unit6-video1",
    bookId: "1",
    unitId: "6",
    title: "I See Something Blue - SUPER SIMPLE SONGS",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=jYAWf8Y91hA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jYAWf8Y91hA?si=b9qEwXN-0LtJVkre" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun song about identifying blue objects, helping children learn both colors and observation skills."
  },
  {
    id: "book1-unit6-video2",
    bookId: "1",
    unitId: "6",
    title: "I See Something Pink - SUPER SIMPLE SONGS",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=Asb8N0nz9OI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Asb8N0nz9OI?si=5Oh9ii42PJzsv7mc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Another color song focused on pink objects, part of the 'I See Something' series."
  },
  {
    id: "book1-unit6-video3",
    bookId: "1",
    unitId: "6",
    title: "What Colour Is It?",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=NUquLTPhMwg",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NUquLTPhMwg?si=6GQoDS1m4JvkT-gj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A interactive video teaching children to identify different colors."
  },
  {
    id: "book1-unit6-video4",
    bookId: "1",
    unitId: "6",
    title: "What's Your Favorite Color - SUPER SIMPLE SONG",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=zxIpA5nF_LY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/zxIpA5nF_LY?si=MItpQRQKiUxtWmg_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song that helps children express their color preferences."
  }
];

// Game resources for Unit 6
export const book1Unit6GameResources: TeacherResource[] = [
  {
    id: "book1-unit6-game1",
    bookId: "1",
    unitId: "6",
    title: "WORDWALL - COLOURS - Game 1",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/54d466d5a13948c6acbafc5729e6d887",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/54d466d5a13948c6acbafc5729e6d887?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "An interactive game to practice identifying different colors."
  },
  {
    id: "book1-unit6-game2",
    bookId: "1",
    unitId: "6",
    title: "WORDWALL - COLOURS - Game 2",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/360776cf889d4170872d084aa81d3995",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/360776cf889d4170872d084aa81d3995?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Another fun game to practice color vocabulary and recognition."
  }
];

// Combined resources for Unit 6
export const book1Unit6Resources: TeacherResource[] = [
  ...book1Unit6VideoResources,
  ...book1Unit6GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit6Resources = () => book1Unit6Resources;

export default book1Unit6Resources;