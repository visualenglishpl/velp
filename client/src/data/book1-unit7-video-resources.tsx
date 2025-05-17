/**
 * Book 1 Unit 7 video resources
 * 
 * Videos for Toys
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 7 (Toys)
 */
export const book1Unit7VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '7',
    'video-1',
    'Body Parts Song',
    'Body Parts Song - Visual English Book 1 Unit 7',
    'https://www.youtube.com/embed/QkHQ0CYwjaI',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/QkHQ0CYwjaI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
  createBook1VideoResource(
    '7',
    'video-2',
    'Head Shoulders Knees and Toes',
    'Head Shoulders Knees and Toes - Visual English Book 1 Unit 7',
    'https://www.youtube.com/embed/h4eueDYPTIg',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/h4eueDYPTIg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit7VideoResources;
