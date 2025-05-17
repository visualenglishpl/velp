/**
 * Book 1 Unit 16 game resources
 * 
 * Interactive games for Sports
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 16 (Sports)
 */
export const book1Unit16GameResources: TeacherResource[] = [
  createBook1GameResource(
    '16',
    'game-1',
    'Hobbies Vocabulary Game',
    'Hobbies Vocabulary Game - Interactive activity for Unit 16',
    'https://wordwall.net/resource/10258944/hobbies',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/10258944/hobbies" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit16GameResources;
