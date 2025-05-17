/**
 * Book 1 Unit 12 game resources
 * 
 * Interactive games for My Body
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 12 (My Body)
 */
export const book1Unit12GameResources: TeacherResource[] = [
  createBook1GameResource(
    '12',
    'game-1',
    'Months of the Year Game',
    'Months of the Year Game - Interactive activity for Unit 12',
    'https://wordwall.net/resource/29456/english/months-year',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/29456/english/months-year" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit12GameResources;
