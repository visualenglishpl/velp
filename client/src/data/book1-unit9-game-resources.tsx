/**
 * Book 1 Unit 9 game resources
 * 
 * Interactive games for My Family
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1GameResource } from './book1-resources-common';

/**
 * Game resources for Book 1 Unit 9 (My Family)
 */
export const book1Unit9GameResources: TeacherResource[] = [
  createBook1GameResource(
    '9',
    'game-1',
    'Family Members Matching',
    'Family Members Matching - Interactive activity for Unit 9',
    'https://wordwall.net/resource/11322275/family-members',
    `<iframe style="width: 100%; height: 400px; max-width: 800px;" src="https://wordwall.net/resource/11322275/family-members" frameborder="0" allowfullscreen></iframe>`
  ),
];

export default book1Unit9GameResources;
