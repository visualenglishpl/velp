/**
 * Book 1 Unit 10 game resources
 * 
 * Interactive games for Transport
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 10 (Transport)
 */
export const book1Unit10GameResources: TeacherResource[] = [
  createBook1GameResource(
    '10',
    'game-1',
    'Weather Vocabulary Game',
    'Weather Vocabulary Game - Interactive activity for Unit 10',
    'https://wordwall.net/resource/10404323/weather',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/10404323/weather" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit10GameResources;
