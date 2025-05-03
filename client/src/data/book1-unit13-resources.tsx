/**
 * Visual English Book 1, Unit 13: Do You Have a Pet
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 13
export const book1Unit13VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    13, 1,
    "I Have A Pet Animal Song - Super Simple Songs",
    "pWepfJ-8XU0",
    "A fun and catchy animal song about pets by Super Simple Songs"
  ),
  createBook1VideoResource(
    13, 2,
    "Pet Song for Kids - Dream Kids",
    "RAObh4cLDAI",
    "A beginner-friendly song about different kinds of pets"
  ),
  createBook1VideoResource(
    13, 3,
    "At the Pet Store - Watts English",
    "6BK49n2UWA0",
    "A story about visiting a pet store with Watts English"
  ),
  createBook1VideoResource(
    13, 4,
    "For the Birds - Short Film",
    "BT39vDpfI5s",
    "An animated short film about birds"
  ),
  createBook1VideoResource(
    13, 5,
    "Guess Pet Sounds",
    "AkZrk8KL76c",
    "An interactive game to identify animals by their sounds"
  ),
  createBook1VideoResource(
    13, 6,
    "Pets Hidden Pictures Game",
    "hmVYCS_hJk0",
    "A fun hidden pictures game featuring pets"
  )
];

// Game resources for Unit 13
export const book1Unit13GameResources: TeacherResource[] = [
  createBook1GameResource(
    13, 1,
    "Pets - Quiz",
    "55c7caefb2fe48feb7798940327e0197",
    "1", "46", "0",
    "Interactive quiz for learning pet vocabulary"
  ),
  createBook1GameResource(
    13, 2,
    "Pets - Matching Game",
    "ef14eb2bd2254ff8b01d8e376ff7165e",
    "1", "46", "0",
    "Match the pet names to pictures"
  )
];

// Combined resources for Unit 13
export const book1Unit13Resources: TeacherResource[] = [
  ...book1Unit13VideoResources,
  ...book1Unit13GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit13Resources = () => book1Unit13Resources;

export default book1Unit13Resources;
