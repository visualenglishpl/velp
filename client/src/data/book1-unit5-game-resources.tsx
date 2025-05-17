/**
 * Book 1 Unit 5 game resources
 * 
 * Interactive games for Pets and Animals
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 5 (Pets and Animals)
 */
export const book1Unit5GameResources: TeacherResource[] = [
  createBook1GameResource(
    '5',
    'game-1',
    'Pet Animals Game',
    'Pet Animals Game - Interactive activity for Unit 5',
    'https://wordwall.net/resource/10965215/pets',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/10965215/pets" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit5GameResources;
