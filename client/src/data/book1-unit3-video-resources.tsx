/**
 * Book 1 Unit 3 video resources
 * 
 * Videos for Food
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 3 (Food)
 */
export const book1Unit3VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '3',
    'video-1',
    'Food Song for Kids',
    'Food Song for Kids - Visual English Book 1 Unit 3',
    'https://www.youtube.com/embed/RE5tvaveVak',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/RE5tvaveVak" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
  createBook1VideoResource(
    '3',
    'video-2',
    'Fruit Song',
    'Fruit Song - Visual English Book 1 Unit 3',
    'https://www.youtube.com/embed/mfReSbQ7jzE',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/mfReSbQ7jzE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit3VideoResources;
