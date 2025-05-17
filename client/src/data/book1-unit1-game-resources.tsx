/**
 * Book 1 Unit 1 game resources
 * 
 * Interactive games for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common.ts';

/**
 * Game resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1GameResources: TeacherResource[] = [
  createBook1GameResource(
    '1',
    'game-1',
    'WORDWALL - GREETINGS',
    'Greetings Matching - Interactive activity for Unit 1',
    'https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2',
    `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  ),
  createBook1GameResource(
    '1',
    'game-2',
    'WORDWALL - TIMES OF THE DAY',
    'Times of the Day Matching - Interactive activity for Unit 1',
    'https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d',
    `<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit1GameResources;
