/**
 * Book 1 Unit 1 game resources
 * 
 * Interactive games for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1GameResources: TeacherResource[] = [
  createBook1GameResource(
    '1',
    'game-1',
    'Greetings Matching',
    'Greetings Matching - Interactive activity for Unit 1',
    'https://wordwall.net/resource/11837368/greetings',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/11837368/greetings" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit1GameResources;
