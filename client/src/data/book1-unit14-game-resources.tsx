/**
 * Book 1 Unit 14 game resources
 * 
 * Interactive games for Daily Routine
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 14 (Daily Routine)
 */
export const book1Unit14GameResources: TeacherResource[] = [
  createBook1GameResource(
    '14',
    'game-1',
    'Clock Time Game',
    'Clock Time Game - Interactive activity for Unit 14',
    'https://wordwall.net/resource/32975/english/telling-time',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/32975/english/telling-time" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit14GameResources;
