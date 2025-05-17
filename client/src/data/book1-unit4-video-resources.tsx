/**
 * Book 1 Unit 4 video resources
 * 
 * Videos for My House
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 4 (My House)
 */
export const book1Unit4VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '4',
    'video-1',
    'House Tour Song',
    'House Tour Song - Visual English Book 1 Unit 4',
    'https://www.youtube.com/embed/qZyJPZxsmZk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/qZyJPZxsmZk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit4VideoResources;
