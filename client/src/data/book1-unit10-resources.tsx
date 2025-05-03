import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 10: House and Home
 * 
 * This file contains video and game resources for teaching
 * house and home vocabulary and related expressions
 */

export const book1Unit10Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    10, 1,
    'House and Home Song for Kids',
    'L36PTOcJP6Y',
    'A catchy song about house and home with colorful visuals'
  ),
  createBook1VideoResource(
    10, 2,
    'House and Home Vocabulary',
    'PXV7PIpdby8',
    'Learn house and home vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    10, 3,
    'House and Home in Action',
    '37w9JjUUmms',
    'See house and home used in real-life contexts'
  ),
  createBook1VideoResource(
    10, 4,
    'House and Home Story Time',
    'qJzXoXshOV8',
    'A story featuring house and home vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    10, 1,
    'House and Home Matching Game',
    'https://wordwall.net/embed/93d6a7f5b97d4a5bad4a4cc97fae1b31',
    'Match house and home pictures with their English names'
  ),
  createBook1GameResource(
    10, 2,
    'House and Home Spelling Practice',
    'https://wordwall.net/embed/e2b92f5d7d2c4254b36f79f35dc1ef4c',
    'Practice spelling house and home vocabulary'
  ),
  createBook1GameResource(
    10, 3,
    'House and Home Quiz',
    'https://wordwall.net/embed/ada1baeb96954a4e8a992a48c01be67e',
    'Test knowledge of house and home vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    10, 4,
    'House and Home Groups',
    'https://wordwall.net/embed/3662e9e40a7743d6852f61a621e4eee8',
    'Sort house and home into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit10VideoResources = book1Unit10Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit10GameResources = book1Unit10Resources.filter(resource => resource.resourceType === 'game');
