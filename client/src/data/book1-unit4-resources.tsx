/**
 * Visual English Book 1, Unit 4: My Family
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 4
export const book1Unit4VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    4, 1,
    "The Family Song - The Singing Walrus",
    "d_WQEUzS-mY",
    "Learn family vocabulary with this catchy song"
  ),
  createBook1VideoResource(
    4, 2,
    "My Family - Kids Educational Songs",
    "FHaObkHEkHQ",
    "A fun song about family members"
  ),
  createBook1VideoResource(
    4, 3,
    "Family Finger Song - Super Simple Songs",
    "bxl-kAUWRuo",
    "A finger play song about family members"
  ),
  createBook1VideoResource(
    4, 4,
    "Where Is My Family - Maple Leaf Learning",
    "GkJSc9A1KwI",
    "Learn to identify family members in this simple song"
  )
];

// Game resources for Unit 4
export const book1Unit4GameResources: TeacherResource[] = [
  createBook1GameResource(
    4, 1,
    "Family Members - Matching Game",
    "4c9c0b738fb64d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match pictures of family members to their names"
  ),
  createBook1GameResource(
    4, 2,
    "My Family - Quiz",
    "d3f436c86f2044ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of family vocabulary"
  )
];

// Combined resources for Unit 4
export const book1Unit4Resources: TeacherResource[] = [
  ...book1Unit4VideoResources,
  ...book1Unit4GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit4Resources = () => book1Unit4Resources;

export default book1Unit4Resources;
