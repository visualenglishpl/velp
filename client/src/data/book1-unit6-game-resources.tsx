/**
 * Book 1 Unit 6 game resources
 * 
 * Interactive games for My Favourite Colour
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 6 (My Favourite Colour)
 */
export const book1Unit6GameResources: TeacherResource[] = [
  createBook1GameResource(
    '6',
    'game-1',
    'Colors Matching Game',
    'Colors Matching Game - Interactive activity for Unit 6',
    'https://wordwall.net/resource/9551478/colors',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/9551478/colors" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit6GameResources;
