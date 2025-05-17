/**
 * Book 1 Unit 7 game resources
 * 
 * Interactive games for Toys
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 7 (Toys)
 */
export const book1Unit7GameResources: TeacherResource[] = [
  createBook1GameResource(
    '7',
    'game-1',
    'Body Parts Matching',
    'Body Parts Matching - Interactive activity for Unit 7',
    'https://wordwall.net/resource/15729036/body-parts',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/15729036/body-parts" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit7GameResources;
