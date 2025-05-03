/**
 * Visual English Book 1, Unit 5: Toys and Games
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 5
export const book1Unit5VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    5, 1,
    "My Toys - Super Simple Songs",
    "8-SWdNn5Nkk",
    "Learn vocabulary for different toys in this fun song"
  ),
  createBook1VideoResource(
    5, 2,
    "Toys Song - Kids Learning Tube",
    "jA-dDnbOTOo",
    "A catchy song about different types of toys"
  ),
  createBook1VideoResource(
    5, 3,
    "Toys and Games - The Singing Walrus",
    "vlhEzOB23nk",
    "Learn about toys and games with this educational song"
  ),
  createBook1VideoResource(
    5, 4,
    "Toy Words for Kids - ELF Learning",
    "RZFNRhxLrhE",
    "Simple vocabulary introduction to common toys"
  )
];

// Game resources for Unit 5
export const book1Unit5GameResources: TeacherResource[] = [
  createBook1GameResource(
    5, 1,
    "Toys - Matching Game",
    "5b7da14cb49146c5b50f83e0ecc18d94",
    "1", "3", "0",
    "Match the toys to their names in this fun game"
  ),
  createBook1GameResource(
    5, 2,
    "Toys and Games - Quiz",
    "b0c934edcf0841d59e77e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of toys and games vocabulary"
  )
];

// Combined resources for Unit 5
export const book1Unit5Resources: TeacherResource[] = [
  ...book1Unit5VideoResources,
  ...book1Unit5GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit5Resources = () => book1Unit5Resources;

export default book1Unit5Resources;
