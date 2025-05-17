/**
 * Book 1 Unit 8 video resources
 * 
 * Videos for Numbers
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 8 (Numbers)
 */
export const book1Unit8VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '8',
    'video-1',
    'Clothing Song',
    'Clothing Song - Visual English Book 1 Unit 8',
    'https://www.youtube.com/embed/taoCF1cKZSY',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/taoCF1cKZSY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit8VideoResources;
