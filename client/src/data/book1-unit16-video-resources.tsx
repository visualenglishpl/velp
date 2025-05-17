/**
 * Book 1 Unit 16 video resources
 * 
 * Videos for Sports
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 16 (Sports)
 */
export const book1Unit16VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '16',
    'video-1',
    'Hobbies Song',
    'Hobbies Song - Visual English Book 1 Unit 16',
    'https://www.youtube.com/embed/N1w-hDiJ4dM',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/N1w-hDiJ4dM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit16VideoResources;
