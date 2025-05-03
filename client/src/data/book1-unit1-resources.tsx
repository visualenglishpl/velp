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
    "A fun hello song for beginners learning introductions"
  ),
  createBook1VideoResource(
    1, 2,
    "Goodbye Song - The Singing Walrus",
    "STMl4yjPnPk",
    "A catchy goodbye song with simple vocabulary"
  ),
  createBook1VideoResource(
    1, 3,
    "Hello Hello! Can You Clap Your Hands - Super Simple Songs",
    "fN1Cyr0ZK9M",
    "Interactive hello song with actions for young learners"
  ),
  createBook1VideoResource(
    1, 4,
    "Good Morning, Good Morning - Maple Leaf Learning",
    "TFVjU-AZoqs",
    "Learn greetings for different times of day"
  )
];

// Game resources for Unit 1
export const book1Unit1GameResources: TeacherResource[] = [
  createBook1GameResource(
    1, 1,
    "Greetings - Matching Game",
    "ab9c70a3a3ad475a9464c4bd6a318a9c",
    "1", "3", "0",
    "Match the greetings to the correct situations"
  ),
  createBook1GameResource(
    1, 2,
    "Hello and Goodbye - Quiz",
    "8cdf1feaf44b467a9ab3c41ad0da0e62",
    "1", "5", "0",
    "Test your knowledge of basic greetings"
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
