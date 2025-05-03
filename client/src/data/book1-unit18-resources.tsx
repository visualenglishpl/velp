/**
 * Visual English Book 1, Unit 18: Animals at the Zoo
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 18
export const book1Unit18VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    18, 1,
    "Walking in the Jungle - Super Simple Songs",
    "GoSq-iCbsSY",
    "A fun song about jungle animals"
  ),
  createBook1VideoResource(
    18, 2,
    "Zoo Song - Kids Music Mania",
    "G-ACF_YToFU",
    "A catchy song about different zoo animals"
  ),
  createBook1VideoResource(
    18, 3,
    "Let's Go to the Zoo - Bounce Patrol",
    "OwRmivbNgQk",
    "An energetic song about a trip to the zoo"
  ),
  createBook1VideoResource(
    18, 4,
    "Zoo Animals - Maple Leaf Learning",
    "W7DpAUoZm2A",
    "Learn vocabulary for various zoo animals"
  )
];

// Game resources for Unit 18
export const book1Unit18GameResources: TeacherResource[] = [
  createBook1GameResource(
    18, 1,
    "Zoo Animals - Matching Game",
    "c94c7a75b5fe4ca9be42dc8ca5b78b6d",
    "1", "3", "0",
    "Match the zoo animal pictures to their names"
  ),
  createBook1GameResource(
    18, 2,
    "Wild Animals - Quiz",
    "d7f436c86f20444ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of wild animals"
  )
];

// Combined resources for Unit 18
export const book1Unit18Resources: TeacherResource[] = [
  ...book1Unit18VideoResources,
  ...book1Unit18GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit18Resources = () => book1Unit18Resources;

export default book1Unit18Resources;
