import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 13: Body Parts
 * 
 * This file contains video and game resources for teaching
 * body parts vocabulary and related expressions
 */

export const book1Unit13Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    13, 1,
    'Body Parts Song for Kids',
    'SUt8q0EKbms',
    'A catchy song about body parts with colorful visuals'
  ),
  createBook1VideoResource(
    13, 2,
    'Body Parts Vocabulary',
    'QkHQ0CYwjaI',
    'Learn body parts vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    13, 3,
    'Body Parts in Action',
    'rhwWJ6xB-m4',
    'See body parts used in real-life contexts'
  ),
  createBook1VideoResource(
    13, 4,
    'Body Parts Story Time',
    'h4eueDYPTIg',
    'A story featuring body parts vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    13, 1,
    'Body Parts Matching Game',
    'https://wordwall.net/embed/9c4a8b55d52f43569c0050e12ddaaec2',
    'Match body parts pictures with their English names'
  ),
  createBook1GameResource(
    13, 2,
    'Body Parts Spelling Practice',
    'https://wordwall.net/embed/4e3f5767a9d2450fa90d57f10e8d47af',
    'Practice spelling body parts vocabulary'
  ),
  createBook1GameResource(
    13, 3,
    'Body Parts Quiz',
    'https://wordwall.net/embed/2e0cea9cae854e2fa5b5242b20f6b89d',
    'Test knowledge of body parts vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    13, 4,
    'Body Parts Groups',
    'https://wordwall.net/embed/47bf9c5be40b4c0d82f72d2825b0d143',
    'Sort body parts into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit13VideoResources = book1Unit13Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit13GameResources = book1Unit13Resources.filter(resource => resource.resourceType === 'game');
