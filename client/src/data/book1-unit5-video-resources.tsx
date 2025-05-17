/**
 * Book 1 Unit 5 video resources
 * 
 * Videos for Pets and Animals
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 5 (Pets and Animals)
 */
export const book1Unit5VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '5',
    'video-1',
    'Animal Song',
    'Animal Song - Visual English Book 1 Unit 5',
    'https://www.youtube.com/embed/OwRmivbNgQk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/OwRmivbNgQk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit5VideoResources;
