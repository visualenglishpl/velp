/**
 * Visual English Book 1, Unit 15: Parts of the Body
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 15
export const book1Unit15VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    15, 1,
    "Parts of the Body - Super Simple Songs",
    "SUt8q0EKbms",
    "A fun sing-along song about body parts for beginners"
  ),
  createBook1VideoResource(
    15, 2,
    "Head, Shoulders, Knees & Toes - CoComelon",
    "RuqvGiEq_g4",
    "The classic head, shoulders, knees and toes song with actions"
  ),
  createBook1VideoResource(
    15, 3,
    "My Face - Maple Leaf Learning",
    "QFAqoJzzCP0",
    "Learn vocabulary for parts of the face"
  ),
  createBook1VideoResource(
    15, 4,
    "Body Parts Song - English Singsing",
    "j6g_OPGVQus",
    "A comprehensive song about body parts with pictures"
  )
];

// Game resources for Unit 15
export const book1Unit15GameResources: TeacherResource[] = [
  createBook1GameResource(
    15, 1,
    "Parts of the Body - Matching",
    "f16e44cb7c52424998aeaae1bcd9bf9c",
    "1", "3", "0",
    "Match the parts of the body to their names"
  ),
  createBook1GameResource(
    15, 2,
    "Parts of the Face - Quiz",
    "2b2f0ff0d1644d25bcaa08c15a5ab54f",
    "1", "5", "0",
    "A quiz about parts of the face"
  )
];

// Combined resources for Unit 15
export const book1Unit15Resources: TeacherResource[] = [
  ...book1Unit15VideoResources,
  ...book1Unit15GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit15Resources = () => book1Unit15Resources;

export default book1Unit15Resources;
