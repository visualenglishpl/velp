import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 18: Leisure Activities
 * 
 * This file contains video and game resources for teaching
 * leisure activities vocabulary and related expressions
 */

export const book1Unit18Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    18, 1,
    'Leisure Activities Song for Kids',
    '7F7K2t0mMYA',
    'A catchy song about leisure activities with colorful visuals'
  ),
  createBook1VideoResource(
    18, 2,
    'Leisure Activities Vocabulary',
    'N_bvB70gIzQ',
    'Learn leisure activities vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    18, 3,
    'Leisure Activities in Action',
    'wuTowqXQBTQ',
    'See leisure activities used in real-life contexts'
  ),
  createBook1VideoResource(
    18, 4,
    'Leisure Activities Story Time',
    'DYq_79OiVxg',
    'A story featuring leisure activities vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    18, 1,
    'Leisure Activities Matching Game',
    'https://wordwall.net/embed/e7c2702ee98b40249fd4ce5c05fbd3c6',
    'Match leisure activities pictures with their English names'
  ),
  createBook1GameResource(
    18, 2,
    'Leisure Activities Spelling Practice',
    'https://wordwall.net/embed/6dbfdafea41c4febb37b07d5ab92ce3f',
    'Practice spelling leisure activities vocabulary'
  ),
  createBook1GameResource(
    18, 3,
    'Leisure Activities Quiz',
    'https://wordwall.net/embed/d5e10cfb43314e5c987bbf33d7ca1dce',
    'Test knowledge of leisure activities vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    18, 4,
    'Leisure Activities Groups',
    'https://wordwall.net/embed/1cb5f1e4b83c4e7795343bc20d8f0a1c',
    'Sort leisure activities into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit18VideoResources = book1Unit18Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit18GameResources = book1Unit18Resources.filter(resource => resource.resourceType === 'game');
