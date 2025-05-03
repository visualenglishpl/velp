/**
 * Visual English Book 1, Unit 7: My Pets
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 7
export const book1Unit7VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    7, 1,
    "I Have a Pet - Super Simple Songs",
    "pWepfJ-8XU0",
    "A fun song about different pets and animals"
  ),
  createBook1VideoResource(
    7, 2,
    "My Pet - The Singing Walrus",
    "Bv4GKlgRQcM",
    "Learn about different pets with this catchy song"
  ),
  createBook1VideoResource(
    7, 3,
    "Pet Animals - English Singsing",
    "1DJKN4mITUM",
    "Learn vocabulary for common pet animals"
  ),
  createBook1VideoResource(
    7, 4,
    "What's Your Favorite Pet - Maple Leaf Learning",
    "25_E1-MFPVA",
    "A simple song about favorite pets and animals"
  )
];

// Game resources for Unit 7
export const book1Unit7GameResources: TeacherResource[] = [
  createBook1GameResource(
    7, 1,
    "Pets - Matching Game",
    "8c9c0b738fb64d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match the pets to their names in this fun game"
  ),
  createBook1GameResource(
    7, 2,
    "Pet Animals - Quiz",
    "e3f436c86f2044ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of pet animals vocabulary"
  )
];

// Combined resources for Unit 7
export const book1Unit7Resources: TeacherResource[] = [
  ...book1Unit7VideoResources,
  ...book1Unit7GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit7Resources = () => book1Unit7Resources;

export default book1Unit7Resources;
