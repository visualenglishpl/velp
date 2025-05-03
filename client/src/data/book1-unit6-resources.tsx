import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 6: My Favourite Colour
 * 
 * This file contains video and game resources for teaching
 * colors and favorite color expressions
 */

export const book1Unit6Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    6, 1,
    'I See Something Blue - Super Simple Songs',
    'jYAWf8Y91hA',
    'A fun interactive song to teach colors and color recognition through identifying blue objects'
  ),
  createBook1VideoResource(
    6, 2,
    'I See Something Pink - Super Simple Songs',
    'Asb8N0nz9OI',
    'A fun interactive song to teach colors and color recognition through identifying pink objects'
  ),
  createBook1VideoResource(
    6, 3,
    'What colour is it?',
    'NUquLTPhMwg',
    'Educational video teaching basic color names and identification'
  ),
  createBook1VideoResource(
    6, 4,
    'What\'s Your Favorite Color - Super Simple Song',
    'zxIpA5nF_LY',
    'A catchy song that introduces the question "What\'s your favorite color?" and responses'
  ),
  createBook1VideoResource(
    6, 5,
    'Colour Spelling', 
    '0LNuoKsAtN8',
    'Educational video teaching how to spell color names in English'
  ),
  
  // Games
  createBook1GameResource(
    6, 1,
    'Favorite Colors Game',
    'https://wordwall.net/embed/92f7c8fdb37f472baa73c78e62f0bfcb?themeId=1&templateId=46&fontStackId=0',
    'Interactive game to practice identifying and naming colors'
  ),
  createBook1GameResource(
    6, 2,
    'My Favorite Color Is...',
    'https://wordwall.net/embed/f384aee9d4cc4e69a6ef1d26e3fa18e7?themeId=1&templateId=3&fontStackId=0',
    'Practice expressing color preferences with "My favorite color is..."'
  ),
  createBook1GameResource(
    6, 3,
    'Color Matching Game',
    'https://wordwall.net/embed/d9d1e5c848ea4adbb6724f5a56af9d4c?themeId=1&templateId=5&fontStackId=0',
    'A fun game to match color words with their corresponding colors'
  )
];
