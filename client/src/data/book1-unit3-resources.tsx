/**
 * Visual English Book 1, Unit 3: Numbers 1-10
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 3
export const book1Unit3VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    3, 1,
    "Count to 10 - Kids Learning Tube",
    "DR-cfDsHCGA",
    "Learn to count from 1 to 10 with this catchy song"
  ),
  createBook1VideoResource(
    3, 2,
    "Numbers Song - Super Simple Songs",
    "pZw9veQ76fo",
    "A fun song to teach numbers from 1 to 10"
  ),
  createBook1VideoResource(
    3, 3,
    "Counting 1 to 10 - The Singing Walrus",
    "85M1yxIcHpw",
    "Interactive counting song with visuals for young learners"
  ),
  createBook1VideoResource(
    3, 4,
    "Number Train 1-10 - Maple Leaf Learning",
    "4LvMCTgpd4c",
    "Count from 1 to 10 with a fun train animation"
  )
];

// Game resources for Unit 3
export const book1Unit3GameResources: TeacherResource[] = [
  createBook1GameResource(
    3, 1,
    "Numbers 1-10 - Matching Game",
    "e6c20f97e8c245b8a893bf4c24ccdee2",
    "1", "3", "0",
    "Match the numbers to their written forms"
  ),
  createBook1GameResource(
    3, 2,
    "Counting Objects - Quiz",
    "59b5de1a88bd4a15bd11c7ea67bab742",
    "1", "5", "0",
    "Count objects and select the correct number"
  )
];

// Combined resources for Unit 3
export const book1Unit3Resources: TeacherResource[] = [
  ...book1Unit3VideoResources,
  ...book1Unit3GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit3Resources = () => book1Unit3Resources;

export default book1Unit3Resources;
