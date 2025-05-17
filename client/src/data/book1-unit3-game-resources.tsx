/**
 * Book 1 Unit 3 game resources
 * 
 * Interactive games for Food
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 3 (Food)
 */
export const book1Unit3GameResources: TeacherResource[] = [
  createBook1GameResource(
    '3',
    'game-1',
    'Food Vocabulary Game',
    'Food Vocabulary Game - Interactive activity for Unit 3',
    'https://wordwall.net/resource/29897132/food',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/29897132/food" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit3GameResources;
