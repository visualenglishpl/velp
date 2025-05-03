import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 17: Transportation
 * 
 * This file contains video and game resources for teaching
 * transportation vocabulary and related expressions
 */

export const book1Unit17Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    17, 1,
    'Transportation Song for Kids',
    'kUv6XXG4hZU',
    'A catchy song about transportation with colorful visuals'
  ),
  createBook1VideoResource(
    17, 2,
    'Transportation Vocabulary',
    'YRk7-2XQoVs',
    'Learn transportation vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    17, 3,
    'Transportation in Action',
    'Ut-HbauKzDw',
    'See transportation used in real-life contexts'
  ),
  createBook1VideoResource(
    17, 4,
    'Transportation Story Time',
    'pf5R2A7B7GI',
    'A story featuring transportation vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    17, 1,
    'Transportation Matching Game',
    'https://wordwall.net/embed/7af9c359a30a4ad8a0ed55faaeed9cbc',
    'Match transportation pictures with their English names'
  ),
  createBook1GameResource(
    17, 2,
    'Transportation Spelling Practice',
    'https://wordwall.net/embed/f3af87cda823433ca33c42eb1fe7b23e',
    'Practice spelling transportation vocabulary'
  ),
  createBook1GameResource(
    17, 3,
    'Transportation Quiz',
    'https://wordwall.net/embed/538cfa80f86e459fa23b38c1cec5c111',
    'Test knowledge of transportation vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    17, 4,
    'Transportation Groups',
    'https://wordwall.net/embed/c0ec8c7d94d3435d9c0ef5d03c28c30d',
    'Sort transportation into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit17VideoResources = book1Unit17Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit17GameResources = book1Unit17Resources.filter(resource => resource.resourceType === 'game');
