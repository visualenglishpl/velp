/**
 * Book 1 Unit 9 video resources
 * 
 * Videos for My Family
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 9 (My Family)
 */
export const book1Unit9VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '9',
    'video-1',
    'Family Members Song',
    'Family Members Song - Visual English Book 1 Unit 9',
    'https://www.youtube.com/embed/FHaObkHEkHQ',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/FHaObkHEkHQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit9VideoResources;
