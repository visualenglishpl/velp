/**
 * Book 1 Unit 6 video resources
 * 
 * Videos for My Favourite Colour
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 6 (My Favourite Colour)
 */
export const book1Unit6VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '6',
    'video-1',
    'Colors Song',
    'Colors Song - Visual English Book 1 Unit 6',
    'https://www.youtube.com/embed/ybt2jhCQ3lA',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/ybt2jhCQ3lA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit6VideoResources;
