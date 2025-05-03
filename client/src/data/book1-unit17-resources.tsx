/**
 * Visual English Book 1, Unit 17: Weather and Seasons
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 17
export const book1Unit17VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    17, 1,
    "How's the Weather? - Super Simple Songs",
    "rD6FRDd9Hew",
    "A fun song about different weather conditions"
  ),
  createBook1VideoResource(
    17, 2,
    "Seasons Song - Have Fun Teaching",
    "8ZjpI6fgYSY",
    "An educational song about the four seasons"
  ),
  createBook1VideoResource(
    17, 3,
    "Weather Song - The Singing Walrus",
    "XcW9Ct000yY",
    "Learn vocabulary for different types of weather"
  ),
  createBook1VideoResource(
    17, 4,
    "Four Seasons Song - Pancake Manor",
    "ksGiLaIx39c",
    "A catchy and fun song about the four seasons"
  )
];

// Game resources for Unit 17
export const book1Unit17GameResources: TeacherResource[] = [
  createBook1GameResource(
    17, 1,
    "Weather Vocabulary - Matching",
    "a8d2a2b6d4724687aa997b8ab54bc3e6",
    "1", "3", "0",
    "Match the weather pictures to their names"
  ),
  createBook1GameResource(
    17, 2,
    "Seasons and Weather - Quiz",
    "b4c93edccf984d9ea25d4a8c5ab27c94",
    "1", "5", "0",
    "Test your knowledge of seasons and weather"
  )
];

// Combined resources for Unit 17
export const book1Unit17Resources: TeacherResource[] = [
  ...book1Unit17VideoResources,
  ...book1Unit17GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit17Resources = () => book1Unit17Resources;

export default book1Unit17Resources;
