/**
 * Book 1 Unit 11 game resources
 * 
 * Interactive games for Weather
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 11 (Weather)
 */
export const book1Unit11GameResources: TeacherResource[] = [
  createBook1GameResource(
    '11',
    'game-1',
    'Days of the Week Game',
    'Days of the Week Game - Interactive activity for Unit 11',
    'https://wordwall.net/resource/46518/english/days-week',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/46518/english/days-week" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit11GameResources;
