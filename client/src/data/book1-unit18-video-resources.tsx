/**
 * Book 1 Unit 18 video resources
 * 
 * Videos for Action Verbs
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1VideoResource } from './book1-resources-common';

/**
 * Video resources for Book 1 Unit 18 (Action Verbs)
 */
export const book1Unit18VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '18',
    'video-1',
    'Emotions Song',
    'Emotions Song - Visual English Book 1 Unit 18',
    'https://www.youtube.com/embed/l4WNrvVjiTw',
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/l4WNrvVjiTw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  ),
];

export default book1Unit18VideoResources;
