import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 12: Clothing
 * 
 * This file contains video and game resources for teaching
 * clothing vocabulary and related expressions
 */

export const book1Unit12Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    12, 1,
    'Clothing Song for Kids',
    'Q_EwuVHDb5U',
    'A catchy song about clothing with colorful visuals'
  ),
  createBook1VideoResource(
    12, 2,
    'Clothing Vocabulary',
    'KDE6wWByiRw',
    'Learn clothing vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    12, 3,
    'Clothing in Action',
    'taoCF1cKZSY',
    'See clothing used in real-life contexts'
  ),
  createBook1VideoResource(
    12, 4,
    'Clothing Story Time',
    '1GDp3sVBqDw',
    'A story featuring clothing vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    12, 1,
    'Clothing Matching Game',
    'https://wordwall.net/embed/c75f7bb2a4ff443b816d7faac2e219cc',
    'Match clothing pictures with their English names'
  ),
  createBook1GameResource(
    12, 2,
    'Clothing Spelling Practice',
    'https://wordwall.net/embed/2bef7060b8854a15b1b8bca4c9e32c70',
    'Practice spelling clothing vocabulary'
  ),
  createBook1GameResource(
    12, 3,
    'Clothing Quiz',
    'https://wordwall.net/embed/714f2e1e61144fd48fc48fca4c20bb0a',
    'Test knowledge of clothing vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    12, 4,
    'Clothing Groups',
    'https://wordwall.net/embed/f4c47b65e2c74ffca84ace36e7a10d2a',
    'Sort clothing into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit12VideoResources = book1Unit12Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit12GameResources = book1Unit12Resources.filter(resource => resource.resourceType === 'game');
