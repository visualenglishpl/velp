/**
 * Visual English Book 1, Unit 2: Colors and Shapes
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 2
export const book1Unit2VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    2, 1,
    "I See Something Blue - Super Simple Songs",
    "jYAWf8Y91hA",
    "A song about identifying different colors"
  ),
  createBook1VideoResource(
    2, 2,
    "The Shapes Song - The Singing Walrus",
    "Umu58RxNL7I",
    "Learn about different shapes with this fun song"
  ),
  createBook1VideoResource(
    2, 3,
    "What Color Is It? - ELF Learning",
    "tRNy2i75tCc",
    "A simple song teaching basic colors vocabulary"
  ),
  createBook1VideoResource(
    2, 4,
    "The Shape Song #1 - Super Simple Songs",
    "TJhfl5vdxp4",
    "Learn about circles, squares, triangles and more"
  )
];

// Game resources for Unit 2
export const book1Unit2GameResources: TeacherResource[] = [
  createBook1GameResource(
    2, 1,
    "Colors - Memory Match",
    "09ed3c7b2f1e409ab0a3a80e5ad11d42",
    "1", "3", "0",
    "Match the colors to their names in this memory game"
  ),
  createBook1GameResource(
    2, 2,
    "Shapes - Quiz",
    "7b7da14cb49446c5b50f83e0ecc18d94",
    "1", "5", "0",
    "Test your knowledge of basic shapes"
  )
];

// Combined resources for Unit 2
export const book1Unit2Resources: TeacherResource[] = [
  ...book1Unit2VideoResources,
  ...book1Unit2GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit2Resources = () => book1Unit2Resources;

export default book1Unit2Resources;
