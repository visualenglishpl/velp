/**
 * Visual English Book 1, Unit 6: Classroom Objects
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 6
export const book1Unit6VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    6, 1,
    "School Supplies Song - Super Simple Songs",
    "vjBxqdOvxPM",
    "Learn vocabulary for classroom objects and school supplies"
  ),
  createBook1VideoResource(
    6, 2,
    "Classroom Objects - The Singing Walrus",
    "taoCF1cKZfc",
    "A fun song about different classroom objects"
  ),
  createBook1VideoResource(
    6, 3,
    "School Supplies - English Singsing",
    "Kl097Xz6dFo",
    "Learn about classroom objects with this educational song"
  ),
  createBook1VideoResource(
    6, 4,
    "What's in My Backpack - Maple Leaf Learning",
    "1BZc0qF30_U",
    "Song about school supplies and classroom objects"
  )
];

// Game resources for Unit 6
export const book1Unit6GameResources: TeacherResource[] = [
  createBook1GameResource(
    6, 1,
    "Classroom Objects - Matching Game",
    "6c9c0b738fb14d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match the classroom objects to their names"
  ),
  createBook1GameResource(
    6, 2,
    "School Supplies - Quiz",
    "7af436c86f2a44ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of classroom vocabulary"
  )
];

// Combined resources for Unit 6
export const book1Unit6Resources: TeacherResource[] = [
  ...book1Unit6VideoResources,
  ...book1Unit6GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit6Resources = () => book1Unit6Resources;

export default book1Unit6Resources;
