/**
 * Visual English Book 1, Unit 3: Classroom Rules
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
    title: "Stand Up Sit Down - FUN KIDS ENGLISH",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=WsiRSWthV1k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An energetic song teaching standing up and sitting down actions perfect for classroom management."
  },
  {
    id: "book1-unit3-video2",
    bookId: "1",
    unitId: "3",
    title: "Stand Up - Sit Down - TDDONGTV",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=DiXMZJi_2NU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DiXMZJi_2NU?si=UQ4Gw6Tmux2TgAIG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "Another fun song for teaching stand up and sit down commands in the classroom."
  },
  {
    id: "book1-unit3-video3",
    bookId: "1",
    unitId: "3",
    title: "Open Close! Open Shut Them Song - MAPLE LEAF LEARNING",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=E_VcSQn73do",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A catchy song teaching children about opening and closing actions."
  },
  {
    id: "book1-unit3-video4",
    bookId: "1",
    unitId: "3",
    title: "Open Close! Open Shut Them Song - SUPER SIMPLE",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=RNUZBHlRH4Y",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "An animated version of the classic 'Open, Shut Them' song for young learners."
  },
  {
    id: "book1-unit3-video5",
    bookId: "1",
    unitId: "3",
    title: "Clean Up Song - Kids Song for Tidying Up - SUPER SIMPLE SONGS",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=SFE0mMWbA-Y",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    description: "A helpful song to encourage cleaning up in the classroom."
  }
];

// Game resources for Unit 3
export const book1Unit3GameResources: TeacherResource[] = [
  {
    id: "book1-unit3-game1",
    bookId: "1",
    unitId: "3",
    title: "WORDWALL - CLASSROOM RULES - Game 1",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/94341df31881431a8e6bb5e707557a42",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "An interactive game to practice classroom rules."
  },
  {
    id: "book1-unit3-game2",
    bookId: "1",
    unitId: "3",
    title: "WORDWALL - CLASSROOM RULES - Game 2",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/c95d7edfe0e64b77be765f3289a7c3e3",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c95d7edfe0e64b77be765f3289a7c3e3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Another interactive game to reinforce classroom rules vocabulary."
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