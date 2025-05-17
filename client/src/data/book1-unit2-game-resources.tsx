/**
 * Book 1 Unit 2 game resources
 * 
 * Interactive games for My School
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 2 (My School)
 */
export const book1Unit2GameResources: TeacherResource[] = [
  createBook1GameResource(
    '2',
    'game-1',
    'School Objects Matching',
    'School Objects Matching - Interactive activity for Unit 2',
    'https://wordwall.net/resource/37342291/classroom-objects',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/37342291/classroom-objects" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit2GameResources;
