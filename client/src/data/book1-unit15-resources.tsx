import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 15: Food and Drinks
 * 
 * This file contains video and game resources for teaching
 * food and drinks vocabulary and related expressions
 */

export const book1Unit15Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    15, 1,
    'Food and Drinks Song for Kids',
    'mVE9pYdwX-I',
    'A catchy song about food and drinks with colorful visuals'
  ),
  createBook1VideoResource(
    15, 2,
    'Food and Drinks Vocabulary',
    'ddDN30evKPc',
    'Learn food and drinks vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    15, 3,
    'Food and Drinks in Action',
    'O0C1R2e9FYY',
    'See food and drinks used in real-life contexts'
  ),
  createBook1VideoResource(
    15, 4,
    'Food and Drinks Story Time',
    '-mPFNGXUxmI',
    'A story featuring food and drinks vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    15, 1,
    'Food and Drinks Matching Game',
    'https://wordwall.net/embed/c8e95ca1b9844ce9b0f44d1df5c10d99',
    'Match food and drinks pictures with their English names'
  ),
  createBook1GameResource(
    15, 2,
    'Food and Drinks Spelling Practice',
    'https://wordwall.net/embed/9ad613c5cb87464c9e09cf17f54c6bc0',
    'Practice spelling food and drinks vocabulary'
  ),
  createBook1GameResource(
    15, 3,
    'Food and Drinks Quiz',
    'https://wordwall.net/embed/4fc8c25a51e242a5ae63d8f0b5ffb31c',
    'Test knowledge of food and drinks vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    15, 4,
    'Food and Drinks Groups',
    'https://wordwall.net/embed/ea2ff94eb8b24157ae5b67ca7df1c5ac',
    'Sort food and drinks into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit15VideoResources = book1Unit15Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit15GameResources = book1Unit15Resources.filter(resource => resource.resourceType === 'game');
