/**
 * Visual English Book 1, Unit 1: Hello and Goodbye
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 1
export const book1Unit1VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    1, 1,
    "Good Morning - PINKFONG",
    "7CuZr1Dz3sk",
    "A cheerful Good Morning song for beginners learning morning greetings. Perfect for young ESL learners to start the day with positive energy."
  ),
  createBook1VideoResource(
    1, 2,
    "Good Morning, Good Night - LITTLE FOX",
    "CXUm9wQQ9iU",
    "Learn to say good morning and good night with this delightful song from Little Fox. Clear pronunciation and engaging visuals for young learners."
  ),
  createBook1VideoResource(
    1, 3,
    "Hello! - Super Simple Songs",
    "tVlcKp3bWH8",
    "A fun hello song for beginners learning introductions. This catchy song introduces basic greetings with simple lyrics and engaging visuals, perfect for young ESL learners."
  ),
  createBook1VideoResource(
    1, 4,
    "Goodbye Song - The Singing Walrus",
    "STMl4yjPnPk",
    "A catchy goodbye song with simple vocabulary. This song teaches different ways to say goodbye with fun animations and clear pronunciation."
  )
];

// Game resources for Unit 1
export const book1Unit1GameResources: TeacherResource[] = [
  {
    id: "book1-unit1-game1",
    bookId: "1",
    unitId: "1",
    title: "Greetings - Matching Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/18358781/hello-and-goodbye",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/18358781/hello-and-goodbye?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Practice common greetings and farewells with this matching game."
  },
  {
    id: "book1-unit1-game2",
    bookId: "1",
    unitId: "1",
    title: "Hello and Goodbye - Interactive Quiz",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/25994784/hello-goodbye",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/25994784/hello-goodbye?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    description: "Test your knowledge of basic greetings and farewells with this interactive quiz."
  }
];

// Combined resources for Unit 1
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit1Resources = () => book1Unit1Resources;

export default book1Unit1Resources;
