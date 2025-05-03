/**
 * Visual English Book 1, Unit 9: Clothes
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 9
export const book1Unit9VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    9, 1,
    "Put On Your Shoes - Super Simple Songs",
    "_jZJo-qCk-c",
    "A fun song about getting dressed and clothing items"
  ),
  createBook1VideoResource(
    9, 2,
    "Clothes Song - The Singing Walrus",
    "KFQGvBxrsBU",
    "Learn vocabulary for different clothing items"
  ),
  createBook1VideoResource(
    9, 3,
    "Getting Dressed Song - English Singsing",
    "q_Wt_JS0GRE",
    "Learn about clothing with context of dressing for the weather"
  ),
  createBook1VideoResource(
    9, 4,
    "What Are You Wearing? - Maple Leaf Learning",
    "xB8JJNTvuIU",
    "Simple vocabulary lesson about clothing items"
  )
];

// Game resources for Unit 9
export const book1Unit9GameResources: TeacherResource[] = [
  createBook1GameResource(
    9, 1,
    "Clothes - Matching Game",
    "gc9c0b738fb64d91a63e97d20a9cbb04",
    "1", "3", "0",
    "Match the clothing items to their names"
  ),
  createBook1GameResource(
    9, 2,
    "Clothing Vocabulary - Quiz",
    "g3f436c86f2044ca47e7e7a7ac9bd57",
    "1", "5", "0",
    "Test your knowledge of clothes vocabulary"
  )
];

// Combined resources for Unit 9
export const book1Unit9Resources: TeacherResource[] = [
  ...book1Unit9VideoResources,
  ...book1Unit9GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit9Resources = () => book1Unit9Resources;

export default book1Unit9Resources;
