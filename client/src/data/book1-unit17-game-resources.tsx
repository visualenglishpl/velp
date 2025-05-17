/**
 * Book 1 Unit 17 game resources
 * 
 * Interactive games for Hobbies
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 17 (Hobbies)
 */
export const book1Unit17GameResources: TeacherResource[] = [
  createBook1GameResource(
    '17',
    'game-1',
    'Sports Vocabulary Game',
    'Sports Vocabulary Game - Interactive activity for Unit 17',
    'https://wordwall.net/resource/37264/english/sports',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/37264/english/sports" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit17GameResources;
