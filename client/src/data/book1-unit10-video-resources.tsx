/**
 * Book 1 Unit 10 video resources
 * 
 * Videos for Transport
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 10 (Transport)
 */
export const book1Unit10VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '10',
    'video-1',
    'Weather Song',
    'Weather Song - Visual English Book 1 Unit 10',
    'https://www.youtube.com/embed/XcW9Ct000yY',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/XcW9Ct000yY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit10VideoResources;
