import { TeacherResource } from '@/components/TeacherResources';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

/**
 * Resources for Book 1 Unit 14: Animals
 * 
 * This file contains video and game resources for teaching
 * animals vocabulary and related expressions
 */

export const book1Unit14Resources: TeacherResource[] = [
  // Videos
  createBook1VideoResource(
    14, 1,
    'Animals Song for Kids',
    'CA6Mofzh7jo',
    'A catchy song about animals with colorful visuals'
  ),
  createBook1VideoResource(
    14, 2,
    'Animals Vocabulary',
    '25_u1GzruQM',
    'Learn animals vocabulary with clear pronunciation'
  ),
  createBook1VideoResource(
    14, 3,
    'Animals in Action',
    'p5qwOxlvyhk',
    'See animals used in real-life contexts'
  ),
  createBook1VideoResource(
    14, 4,
    'Animals Story Time',
    '_z3B3UT1Ezs',
    'A story featuring animals vocabulary'
  ),
  
  // Games
  createBook1GameResource(
    14, 1,
    'Animals Matching Game',
    'https://wordwall.net/embed/7afa4fc4c63a4dc29d81b6a3f2c0cc76',
    'Match animals pictures with their English names'
  ),
  createBook1GameResource(
    14, 2,
    'Animals Spelling Practice',
    'https://wordwall.net/embed/1a5d80f5fa7844cb99629abf20a92484',
    'Practice spelling animals vocabulary'
  ),
  createBook1GameResource(
    14, 3,
    'Animals Quiz',
    'https://wordwall.net/embed/9f3e7ff7fb954ce9aa68f1b1a57d7b66',
    'Test knowledge of animals vocabulary through an interactive quiz'
  ),
  createBook1GameResource(
    14, 4,
    'Animals Groups',
    'https://wordwall.net/embed/c77cb1c4b0ff453299ef3ade19c7795f',
    'Sort animals into different categories'
  )
];

// Export video and game resource arrays separately for filtering
export const book1Unit14VideoResources = book1Unit14Resources.filter(resource => resource.resourceType === 'video');
export const book1Unit14GameResources = book1Unit14Resources.filter(resource => resource.resourceType === 'game');
