/**
 * Book 1 Unit 1 video resources
 * 
 * Videos for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '1',
    'video-1',
    'Hello Song',
    'Hello Song - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/tVlcKp3bWH8',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/tVlcKp3bWH8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
  createBook1VideoResource(
    '1',
    'video-2',
    'Good Morning Song',
    'Good Morning Song - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/CuI_p7a9VGs',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/CuI_p7a9VGs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit1VideoResources;
