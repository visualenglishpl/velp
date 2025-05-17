/**
 * Book 1 Unit 13 game resources
 * 
 * Interactive games for Clothes
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 13 (Clothes)
 */
export const book1Unit13GameResources: TeacherResource[] = [
  createBook1GameResource(
    '13',
    'game-1',
    'Seasons Vocabulary Game',
    'Seasons Vocabulary Game - Interactive activity for Unit 13',
    'https://wordwall.net/resource/38882/english/seasons',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/38882/english/seasons" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit13GameResources;
