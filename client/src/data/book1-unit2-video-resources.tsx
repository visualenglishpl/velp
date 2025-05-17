/**
 * Book 1 Unit 2 video resources
 * 
 * Videos for My School
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 2 (My School)
 */
export const book1Unit2VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '2',
    'video-1',
    'School Objects Song',
    'School Objects Song - Visual English Book 1 Unit 2',
    'https://www.youtube.com/embed/g7kK989HiRQ',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/g7kK989HiRQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit2VideoResources;
