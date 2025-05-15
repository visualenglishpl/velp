/**
 * Visual English Book 1, Unit 10: Hair/Appearance
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 10
export const book1Unit10VideoResources: TeacherResource[] = [
  {
    id: "book1-unit10-video1",
    bookId: "1",
    unitId: "10",
    title: "Hair - Pancake Manor",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=PxKuyP1xgOk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PxKuyP1xgOk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about different hair types and styles."
  },
  {
    id: "book1-unit10-video2",
    bookId: "1",
    unitId: "10",
    title: "Funny Haircut - Watts English",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=VLvITQJ_f_M",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VLvITQJ_f_M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A fun video showing different haircuts with vocabulary for describing appearance."
  },
  {
    id: "book1-unit10-video3",
    bookId: "1",
    unitId: "10",
    title: "Body Parts Song - English Singsing",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=SUt8q0EKbms",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/SUt8q0EKbms" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A song that includes facial features and appearance vocabulary with colorful animations."
  }
];

// Game resources for Unit 10
export const book1Unit10GameResources: TeacherResource[] = [
  {
    id: "book1-unit10-game1",
    bookId: "1",
    unitId: "10",
    title: "Wordwall - Hair and Appearance",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/hair-appearance",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b42defd41cf24fd49f65be88dec8b842?themeId=1&templateId=11" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Interactive game for learning vocabulary related to hair and appearance."
  },
  {
    id: "book1-unit10-game2",
    bookId: "1",
    unitId: "10",
    title: "Wordwall - Describe People",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/describe-people",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/76fc0a53cad442689c9b87dbfb3c1c82?themeId=1&templateId=5" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "A matching game where students connect appearance descriptions with corresponding images."
  }
];

// Combined resources for Unit 10
export const book1Unit10Resources: TeacherResource[] = [
  ...book1Unit10VideoResources,
  ...book1Unit10GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit10Resources = () => book1Unit10Resources;

export default book1Unit10Resources;