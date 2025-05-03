import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 11: Weather
 * 
 * This file contains video and game resources for teaching
 * weather vocabulary and related expressions
 */

export const book1Unit11Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    11, 1,
    'Weather Song for Kids',
    'tfAB4BXSHOA',
    'A catchy song about weather with colorful visuals'
  ),
  createBook1VideoResource(
    11, 2,
    'Weather Vocabulary',
    'XcW9Ct000yY',
    'Learn weather vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    11, 3,
    'Weather in Action',
    'CXKj7bm4Ops',
    'See weather used in real-life contexts'
  ),
  createBook1VideoResource(
    11, 4,
    'Weather Story Time',
    'Jn7uAsLWXpk',
    'A story featuring weather vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    11, 1,
    'Weather Matching Game',
    'https://wordwall.net/embed/7a39dce09d8d458c85c2db984b22a0ee',
    'Match weather pictures with their English names'
  ),
  createBook1GameResource(
    11, 2,
    'Weather Spelling Practice',
    'https://wordwall.net/embed/4ae6d80611714a7b921ce17b6d4a51d9',
    'Practice spelling weather vocabulary'
  ),
  createBook1GameResource(
    11, 3,
    'Weather Quiz',
    'https://wordwall.net/embed/4e2a07e30e6b48c4b4f79bc67e8d3ef9',
    'Test knowledge of weather vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    11, 4,
    'Weather Groups',
    'https://wordwall.net/embed/5eb9efaa13664e6d9d32be1a2e92dc28',
    'Sort weather into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit11VideoResources = book1Unit11Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit11GameResources = book1Unit11Resources.filter(resource => resource.resourceType === 'game');
