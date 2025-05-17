/**
 * Book 1 Unit 1 video resources
 * 
 * Videos for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common.ts';

/**
 * Video resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '1',
    'video-1',
    'Good Morning PINKFONG',
    'Good Morning song by PINKFONG - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/7CuZr1Dz3sk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
  createBook1VideoResource(
    '1',
    'video-2',
    'Good Morning, Good Night LITTLE FOX',
    'Good Morning, Good Night by LITTLE FOX - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/7CuZr1Dz3sk',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
  createBook1VideoResource(
    '1',
    'video-3',
    'The Greetings Song MAPLE LEAF',
    'The Greetings Song by MAPLE LEAF - Visual English Book 1 Unit 1',
    'https://www.youtube.com/embed/gVIFEVLzP4o',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  ),
];

export default book1Unit1VideoResources;
