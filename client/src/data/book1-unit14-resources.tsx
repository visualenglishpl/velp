/**
 * Visual English Book 1, Unit 14: Rooms in a House
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 14
export const book1Unit14VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    14, 1,
    "Rooms of the House Song - Planet Pop",
    "mYzWJjeeukU",
    "A fun song about different rooms in a house"
  ),
  createBook1VideoResource(
    14, 2,
    "Where Is It? - Maple Leaf Learning",
    "8F0NYBBKdMU",
    "Learn about different rooms and locations in a house"
  ),
  createBook1VideoResource(
    14, 3,
    "House Song - DreamEnglish",
    "R9intHqlzhc",
    "A catchy song about rooms in a house by Dream English"
  ),
  createBook1VideoResource(
    14, 4,
    "Parts of a House Vocabulary",
    "qWcU7Y6YeDQ",
    "Learn vocabulary related to different parts of a house"
  )
];

// Game resources for Unit 14
export const book1Unit14GameResources: TeacherResource[] = [
  createBook1GameResource(
    14, 1,
    "Rooms in a House - Matching",
    "9b0d55f9a27a43da8c10d4b33d46df77",
    "1", "3", "0",
    "Match the rooms in a house to their names"
  ),
  createBook1GameResource(
    14, 2,
    "Furniture and Rooms - Quiz",
    "e50d5711eea742eeb1c9b26a8b0a4de0",
    "1", "5", "0",
    "A quiz about furniture and which rooms they belong in"
  )
];

// Combined resources for Unit 14
export const book1Unit14Resources: TeacherResource[] = [
  ...book1Unit14VideoResources,
  ...book1Unit14GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit14Resources = () => book1Unit14Resources;

export default book1Unit14Resources;
