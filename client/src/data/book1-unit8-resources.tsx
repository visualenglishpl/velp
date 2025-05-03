import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 8: Vegetables
 * 
 * This file contains video and game resources for teaching
 * vegetables vocabulary and healthy eating habits
 */

export const book1Unit8Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    8, 1,
    'The Vegetable Song - Super Simple Songs',
    'RE5tvaveVak',
    'Catchy song introducing different vegetables with colorful visuals'
  ),
  createBook1VideoResource(
    8, 2,
    'Oliver\s Vegetables - Vivian French',
    'UcCw2d_ybyo',
    'Story about a boy discovering different vegetables in his grandpa\'s garden'
  ),
  createBook1VideoResource(
    8, 3,
    'Cooking Vegetables with Gus - Watts English',
    '5OFrSNOqpOk',
    'Learn vegetables vocabulary while cooking a healthy dish'
  ),
  createBook1VideoResource(
    8, 4,
    'Vegetable Song for Kids - The Singing Walrus',
    'ddDN30evKPc',
    'Engaging song with vegetable vocabulary and visuals'
  ),
  
  // Games
  createBook1GameResource(
    8, 1,
    'Vegetable Matching Game',
    'https://wordwall.net/embed/7d0b4c6c8b1a43c09f9f982b9e59f4b1',
    'Match vegetable pictures with their English names'
  ),
  createBook1GameResource(
    8, 2,
    'Vegetables Spelling Practice',
    'https://wordwall.net/embed/d39f4ea7d4fc4e789e97d94a55fba36c',
    'Practice spelling vegetable vocabulary'
  ),
  createBook1GameResource(
    8, 3,
    'Vegetables Category Quiz',
    'https://wordwall.net/embed/5c92fb9dd8c54e6e9b5bfbc1fd1aa05f',
    'Sort vegetables by color and identify them'
  ),
  createBook1GameResource(
    8, 4,
    'Healthy Foods Sorting Game',
    'https://wordwall.net/embed/1c99d3e2e0ab4a1983f9d2ddf4b9f3a4',
    'Sort healthy and unhealthy foods with a focus on vegetables'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit8VideoResources = book1Unit8Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit8GameResources = book1Unit8Resources.filter(resource => resource.resourceType === 'game');
