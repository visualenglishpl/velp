/**
 * Book 1 Unit 18 game resources
 * 
 * Interactive games for Action Verbs
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 18 (Action Verbs)
 */
export const book1Unit18GameResources: TeacherResource[] = [
  createBook1GameResource(
    '18',
    'game-1',
    'Emotions Vocabulary Game',
    'Emotions Vocabulary Game - Interactive activity for Unit 18',
    'https://wordwall.net/resource/52054/english/feelings-emotions',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/52054/english/feelings-emotions" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit18GameResources;
