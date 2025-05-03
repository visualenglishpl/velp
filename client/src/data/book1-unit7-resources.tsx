import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 7: Fruit
 * 
 * This file contains video and game resources for teaching
 * fruit vocabulary and expressing preferences using "I like..." and "I don't like..."
 */

export const book1Unit7Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    7, 1,
    'Fruit Song for Kids - Super Simple Songs',
    'mfReSbQ7jzE',
    'A catchy song about fruits with colorful visuals'
  ),
  createBook1VideoResource(
    7, 2,
    'Do You Like Broccoli Ice Cream? - Super Simple Songs',
    'frN3nvhIHUk',
    'Fun song about food preferences to practice "Do you like...?"'
  ),
  createBook1VideoResource(
    7, 3,
    'Fruit Shop | English for Kids - English Tree TV',
    'cZP-BKY6LeM',
    'Learn fruit vocabulary in a shop setting'
  ),
  createBook1VideoResource(
    7, 4,
    'Fruits | Pre School | Learn English Words (Spelling) Video For Kids and Toddlers',
    'p0rACHlhpPc',
    'Educational video with fruit spelling and pronunciation'
  ),
  
  // Games
  createBook1GameResource(
    7, 1,
    'Fruit Matching Game',
    'https://wordwall.net/embed/a6e72c5f0a7a489a9b8a8af97c876dab',
    'Match fruit pictures with their English names'
  ),
  createBook1GameResource(
    7, 2,
    'Do You Like...? Fruits Practice',
    'https://wordwall.net/embed/3ea7b19f77b848a3975d89c5bff6b347',
    'Practice expressing preferences with fruits'
  ),
  createBook1GameResource(
    7, 3,
    'Fruit Vocabulary Quiz',
    'https://wordwall.net/embed/e3adb5b2a9d94d64842a4059fbdcbf9d',
    'Test your knowledge of fruit vocabulary'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit7VideoResources = book1Unit7Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit7GameResources = book1Unit7Resources.filter(resource => resource.resourceType === 'game');
