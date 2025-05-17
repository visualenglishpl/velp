/**
 * Book 1 Unit 12 video resources
 * 
 * Videos for My Body
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 12 (My Body)
 */
export const book1Unit12VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '12',
    'video-1',
    'Months of the Year Song',
    'Months of the Year Song - Visual English Book 1 Unit 12',
    'https://www.youtube.com/embed/Fe9bnYRzFvk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/Fe9bnYRzFvk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit12VideoResources;
