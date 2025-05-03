import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 16: Community Helpers
 * 
 * This file contains video and game resources for teaching
 * community helpers vocabulary and related expressions
 */

export const book1Unit16Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    16, 1,
    'Community Helpers Song for Kids',
    'I8GvLcKJnVY',
    'A catchy song about community helpers with colorful visuals'
  ),
  createBook1VideoResource(
    16, 2,
    'Community Helpers Vocabulary',
    'W5EXOTj0voE',
    'Learn community helpers vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    16, 3,
    'Community Helpers in Action',
    'F7-rW8PF9Wk',
    'See community helpers used in real-life contexts'
  ),
  createBook1VideoResource(
    16, 4,
    'Community Helpers Story Time',
    '2x1Y6vS3bhA',
    'A story featuring community helpers vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    16, 1,
    'Community Helpers Matching Game',
    'https://wordwall.net/embed/c3abb5d1cc2a46b4a72f8db4339cc8e1',
    'Match community helpers pictures with their English names'
  ),
  createBook1GameResource(
    16, 2,
    'Community Helpers Spelling Practice',
    'https://wordwall.net/embed/63ecf2a0fed047cfb32f90ae87feeef0',
    'Practice spelling community helpers vocabulary'
  ),
  createBook1GameResource(
    16, 3,
    'Community Helpers Quiz',
    'https://wordwall.net/embed/ab5a644d7c334ddcb4f0a8aa12200e2b',
    'Test knowledge of community helpers vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    16, 4,
    'Community Helpers Groups',
    'https://wordwall.net/embed/2c881c0c00e04aa490ee56d69db05cae',
    'Sort community helpers into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit16VideoResources = book1Unit16Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit16GameResources = book1Unit16Resources.filter(resource => resource.resourceType === 'game');
