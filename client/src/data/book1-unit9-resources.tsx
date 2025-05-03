import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 9: Family
 * 
 * This file contains video and game resources for teaching
 * family vocabulary and talking about family members
 */

export const book1Unit9Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    9, 1,
    'The Family Song - Super Simple Songs',
    'GiRUF7hvWuM',
    'A catchy song introducing family vocabulary'
  ),
  createBook1VideoResource(
    9, 2,
    'Family Members Song - English Tree TV',
    'FHaObkHEkHQ',
    'Educational video showing different family members with clear pronunciation'
  ),
  createBook1VideoResource(
    9, 3,
    'My Family - Maple Leaf Learning',
    'foptl0BeXnY',
    'Simple song for young learners about family members'
  ),
  createBook1VideoResource(
    9, 4,
    'My Family Your Family - Sesame English',
    'pGO_F3T3aD4',
    'Video showing different families and family structures for kids'
  ),
  
  // Games
  createBook1GameResource(
    9, 1,
    'Family Vocabulary Matching Game',
    'https://wordwall.net/embed/6fd4e1ea731c4cb4ae4e5ab5fcbf08dc',
    'Match family member pictures with their English names'
  ),
  createBook1GameResource(
    9, 2,
    'Family Members Quiz',
    'https://wordwall.net/embed/24ea4ac8c8e94533a82ea50eb4f84400',
    'Test knowledge of family vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    9, 3,
    'Family Tree Game',
    'https://wordwall.net/embed/be62e6ed55774c23904bc3b2b0e1a49c',
    'Place family members in the correct positions on a family tree'
  ),
  createBook1GameResource(
    9, 4,
    'My/Your Family Practice',
    'https://wordwall.net/embed/f9c6a0eb87e342afa98b1fd1e5368e8a',
    'Practice using possessive adjectives with family vocabulary'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit9VideoResources = book1Unit9Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit9GameResources = book1Unit9Resources.filter(resource => resource.resourceType === 'game');
