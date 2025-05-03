/**
 * Visual English Book 1, Unit 10: My School
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 10
export const book1Unit10VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    10, 1,
    "This Is My School - Dream English",
    "2i4CbCINjWA",
    "A fun song introducing school vocabulary"
  ),
  createBook1VideoResource(
    10, 2,
    "School Song - The Singing Walrus",
    "hft6uJQIF4g",
    "Learn vocabulary for different places in a school"
  ),
  createBook1VideoResource(
    10, 3,
    "At School Song - Kids Learning Tube",
    "n1bvEZVX20I",
    "Educational song about different rooms and areas in a school"
  ),
  createBook1VideoResource(
    10, 4,
    "Let's Go to School - Maple Leaf Learning",
    "1Ts5d4do8TU",
    "Simple vocabulary lesson about going to school"
  )
];

// Game resources for Unit 10
export const book1Unit10GameResources: TeacherResource[] = [
  createBook1GameResource(
    10, 1,
    "School Places - Matching Game",
    "h29c0b738fb64d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match the school locations to their names"
  ),
  createBook1GameResource(
    10, 2,
    "School Vocabulary - Quiz",
    "h3f436c86f2044ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of school-related vocabulary"
  )
];

// Combined resources for Unit 10
export const book1Unit10Resources: TeacherResource[] = [
  ...book1Unit10VideoResources,
  ...book1Unit10GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit10Resources = () => book1Unit10Resources;

export default book1Unit10Resources;
