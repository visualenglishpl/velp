/**
 * Visual English Book 1, Unit 8: Fruits and Vegetables
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 8
export const book1Unit8VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    8, 1,
    "Fruit Song - The Singing Walrus",
    "mfReSbQ7jzE",
    "A fun song about different fruits"
  ),
  createBook1VideoResource(
    8, 2,
    "The Vegetable Song - Kids Learning Tube",
    "RE5tvaveVak",
    "Learn vocabulary for different vegetables"
  ),
  createBook1VideoResource(
    8, 3,
    "Fruits and Vegetables - English Singsing",
    "utwgf_G91Eo",
    "Vocabulary lesson for fruits and vegetables with pictures"
  ),
  createBook1VideoResource(
    8, 4,
    "Do You Like Broccoli Ice Cream? - Super Simple Songs",
    "frN3nvhIHUk",
    "A fun song about food preferences featuring fruits and vegetables"
  )
];

// Game resources for Unit 8
export const book1Unit8GameResources: TeacherResource[] = [
  createBook1GameResource(
    8, 1,
    "Fruits - Matching Game",
    "fc9c0b738fb64d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match the fruit pictures to their names"
  ),
  createBook1GameResource(
    8, 2,
    "Vegetables - Quiz",
    "f3f436c86f2044ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of vegetables vocabulary"
  )
];

// Combined resources for Unit 8
export const book1Unit8Resources: TeacherResource[] = [
  ...book1Unit8VideoResources,
  ...book1Unit8GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit8Resources = () => book1Unit8Resources;

export default book1Unit8Resources;
