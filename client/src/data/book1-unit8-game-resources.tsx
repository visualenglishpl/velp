/**
 * Book 1 Unit 8 game resources
 * 
 * Interactive games for Numbers
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 8 (Numbers)
 */
export const book1Unit8GameResources: TeacherResource[] = [
  createBook1GameResource(
    '8',
    'game-1',
    'Clothing Items Game',
    'Clothing Items Game - Interactive activity for Unit 8',
    'https://wordwall.net/resource/27889088/clothes',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/27889088/clothes" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit8GameResources;
