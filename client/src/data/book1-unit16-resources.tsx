/**
 * Visual English Book 1, Unit 16: My Favorite Foods
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 16
export const book1Unit16VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    16, 1,
    "Do You Like Broccoli Ice Cream? - Super Simple Songs",
    "frN3nvhIHUk",
    "A fun song about food preferences for beginners"
  ),
  createBook1VideoResource(
    16, 2,
    "Fruit Song - The Singing Walrus",
    "mfReSbQ7jzE",
    "A catchy song about different fruits"
  ),
  createBook1VideoResource(
    16, 3,
    "Vegetable Song - Kids Learning Tube",
    "RE5tvaveVak",
    "Learn about different vegetables in this educational song"
  ),
  createBook1VideoResource(
    16, 4,
    "I'm Hungry - Maple Leaf Learning",
    "vQ6qG0SBPdY",
    "A simple song about hunger and favorite foods"
  )
];

// Game resources for Unit 16
export const book1Unit16GameResources: TeacherResource[] = [
  createBook1GameResource(
    16, 1,
    "Food Vocabulary - Matching Game",
    "d5c9ab9fc16a49cfa2b7f508f5b4ce67",
    "1", "3", "0",
    "Match the food pictures to their names"
  ),
  createBook1GameResource(
    16, 2,
    "Fruits and Vegetables - Quiz",
    "32242b7e85ab4d94a94db3c55f45d6dd",
    "1", "5", "0",
    "Test your knowledge of fruits and vegetables"
  )
];

// Combined resources for Unit 16
export const book1Unit16Resources: TeacherResource[] = [
  ...book1Unit16VideoResources,
  ...book1Unit16GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit16Resources = () => book1Unit16Resources;

export default book1Unit16Resources;
