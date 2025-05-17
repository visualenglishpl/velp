/**
 * Book 1 Unit 15 game resources
 * 
 * Interactive games for Jobs
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 15 (Jobs)
 */
export const book1Unit15GameResources: TeacherResource[] = [
  createBook1GameResource(
    '15',
    'game-1',
    'Daily Routines Game',
    'Daily Routines Game - Interactive activity for Unit 15',
    'https://wordwall.net/resource/14244/english/daily-routines',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/14244/english/daily-routines" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit15GameResources;
