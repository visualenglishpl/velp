/**
 * Visual English Book 1, Unit 12: Home Sweet Home
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 12
export const book1Unit12VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    12, 1,
    "Rooms Of The House Song - Planet Pop",
    "168xwPpHF-s",
    "A catchy song about different rooms in a house by Planet Pop"
  ),
  createBook1VideoResource(
    12, 2,
    "Rooms in the House - Watts English",
    "mV-TnrvUJ9Q",
    "A story about rooms in the house by Watts English"
  ),
  createBook1VideoResource(
    12, 3,
    "Rooms of the House Game",
    "kIg__488rCs",
    "Interactive quiz game for learning house vocabulary"
  )
];

// Game resources for Unit 12
export const book1Unit12GameResources: TeacherResource[] = [
  createBook1GameResource(
    12, 1,
    "Rooms in the House - Match Game",
    "64037ab981484c46a7fdd820ecbe0ca1",
    "1", "38", "0",
    "Match the rooms in the house with their names"
  ),
  createBook1GameResource(
    12, 2,
    "Rooms in the House - Group Sort",
    "f80c09de5f2a431ba2eadc93b12cac3c",
    "1", "22", "0",
    "Sort items into their correct rooms"
  ),
  createBook1GameResource(
    12, 3,
    "Rooms in the House - Image Match",
    "a2e9207ad2234b8d8ab2daf8c9e439c5",
    "1", "38", "0",
    "Match images with the correct room names"
  ),
  createBook1GameResource(
    12, 4,
    "Rooms in the House - Quiz",
    "62517d93002d490d8ede52bb5c748ebc",
    "23", "46", "0",
    "Test your knowledge about rooms in the house"
  )
];

// Combined resources for Unit 12
export const book1Unit12Resources: TeacherResource[] = [
  ...book1Unit12VideoResources,
  ...book1Unit12GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit12Resources = () => book1Unit12Resources;

export default book1Unit12Resources;
