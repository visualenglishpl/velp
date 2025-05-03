/**
 * Visual English Book 1, Unit 11: Seasons of the Year
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 11
export const book1Unit11VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    11, 1,
    "Season Song - Pancake Manor",
    "EHnO_LpfsIg",
    "A fun and educational song about the four seasons by Pancake Manor"
  ),
  createBook1VideoResource(
    11, 2,
    "Seasons - Pete the Cat",
    "7OUYAQttqdg",
    "Pete the Cat explores the four seasons of the year"
  ),
  createBook1VideoResource(
    11, 3,
    "Four Seasons Tree Craft",
    "hexM3GaE2J4",
    "A craft activity showing how to create a four seasons tree"
  ),
  createBook1VideoResource(
    11, 4,
    "Short Story - The Lazy Bear",
    "sXcs_4ez8-M",
    "A short story about a lazy bear and the changing seasons"
  ),
  createBook1VideoResource(
    11, 5,
    "The Seasons Song - Maple Leaf",
    "VS9qBeInJ0U",
    "A seasonal song with maple leaf imagery"
  ),
  createBook1VideoResource(
    11, 6,
    "Four Seasons - StoryBots",
    "NavWWM2iTEw",
    "StoryBots explain the four seasons with catchy music"
  ),
  createBook1VideoResource(
    11, 7,
    "Seasons Word Songs - Pinkfong",
    "Wrjqz2GTzzI",
    "Word power songs about seasons by Pinkfong"
  ),
  createBook1VideoResource(
    11, 8,
    "Four Seasons - Dream English",
    "TBLFMXU8FLI",
    "A song about the four seasons by Dream English"
  ),
  createBook1VideoResource(
    11, 9,
    "Seasonal Activities Quiz",
    "MtA9Ni-wxUI",
    "Interactive quiz about activities in different seasons"
  )
];

// Game resources for Unit 11
export const book1Unit11GameResources: TeacherResource[] = [
  createBook1GameResource(
    11, 1,
    "Seasons - Match and Sort",
    "7b81d9ee5f4f450fa1f807d3c0caf204",
    "1", "38", "0",
    "Match and sort activity for learning seasons vocabulary"
  ),
  createBook1GameResource(
    11, 2,
    "Seasons - Quiz Game",
    "c9bf24cc7b5a4ec888974e540da1a160",
    "1", "46", "0",
    "Interactive quiz about the four seasons"
  )
];

// Combined resources for Unit 11
export const book1Unit11Resources: TeacherResource[] = [
  ...book1Unit11VideoResources,
  ...book1Unit11GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit11Resources = () => book1Unit11Resources;

export default book1Unit11Resources;
