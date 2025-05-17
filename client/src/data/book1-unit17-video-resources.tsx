/**
 * Book 1 Unit 17 video resources
 * 
 * Videos for Hobbies
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 17 (Hobbies)
 */
export const book1Unit17VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '17',
    'video-1',
    'Sports Song',
    'Sports Song - Visual English Book 1 Unit 17',
    'https://www.youtube.com/embed/X7R-Dz_XJrE',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/X7R-Dz_XJrE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit17VideoResources;
