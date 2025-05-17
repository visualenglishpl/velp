/**
 * Book 1 Unit 4 game resources
 * 
 * Interactive games for My House
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 4 (My House)
 */
export const book1Unit4GameResources: TeacherResource[] = [
  createBook1GameResource(
    '4',
    'game-1',
    'Rooms in the House Game',
    'Rooms in the House Game - Interactive activity for Unit 4',
    'https://wordwall.net/resource/14083613/rooms-house',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/14083613/rooms-house" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit4GameResources;
