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
    "Hello! - Super Simple Songs",
    "tVlcKp3bWH8",
    "A fun hello song for beginners learning introductions. This catchy song introduces basic greetings with simple lyrics and engaging visuals, perfect for young ESL learners."
  ),
  createBook1VideoResource(
    1, 2,
    "Goodbye Song - The Singing Walrus",
    "STMl4yjPnPk",
    "A catchy goodbye song with simple vocabulary. This song teaches different ways to say goodbye with fun animations and clear pronunciation."
  ),
  createBook1VideoResource(
    1, 3,
    "Hello Hello! Can You Clap Your Hands - Super Simple Songs",
    "fN1Cyr0ZK9M",
    "Interactive hello song with actions for young learners. This song combines greetings with physical movements to engage kinesthetic learners."
  ),
  createBook1VideoResource(
    1, 4,
    "Good Morning, Good Afternoon, Good Night - Maple Leaf Learning",
    "TFVjU-AZoqs",
    "Learn greetings for different times of day. This educational video teaches children when to use different time-specific greetings through colorful visuals and repetition."
  )
];

// Game resources for Unit 1
export const book1Unit1GameResources: TeacherResource[] = [
  createBook1GameResource(
    1, 1,
    "Greetings and Farewells - Matching Game",
    "1ed82c92dabc4dfe8b8afaedcafd7aae",
    "1", "3", "0",
    "Match different greetings and farewells to the correct situations. Students learn when to use different expressions like 'good morning', 'hello', 'goodbye', and 'see you later'."
  ),
  createBook1GameResource(
    1, 2,
    "Hello and Goodbye - Interactive Quiz",
    "5c19e5bc4efa4a99b9bc9f1a7ce9d5f5",
    "1", "5", "0",
    "Test your knowledge of basic greetings and farewells with this interactive quiz. Features audio pronunciation and visual cues for beginning English learners."
  )
];

// Combined resources for Unit 1
export const book1Unit1Resources: TeacherResource[] = [
  ...book1Unit1VideoResources,
  ...book1Unit1GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit1Resources = () => book1Unit1Resources;

export default book1Unit1Resources;
