/**
 * Book 1 - Unit 1 (Greetings) Resources
 */

import { TeacherResource } from '@/types/resources';

const resources: TeacherResource[] = [
  {
    id: '1',
    title: 'Good Morning PINKFONG',
    description: 'Cheerful morning greetings song for young learners',
    resourceType: 'video',
    bookId: '1',
    unitId: '1',
    provider: 'PINKFONG',
    youtubeVideoId: 'CuI_p7a9VGs',
    isYoutubeVideo: true,
    sourceUrl: 'https://www.youtube.com/watch?v=CuI_p7a9VGs'
  },
  {
    id: '2',
    title: 'Good Morning, Good Night - LITTLE FOX',
    description: 'Animation showing morning and evening greetings',
    resourceType: 'video',
    bookId: '1',
    unitId: '1',
    provider: 'Little Fox',
    youtubeVideoId: 'eUXkj6j6Ezw',
    isYoutubeVideo: true,
    sourceUrl: 'https://www.youtube.com/watch?v=eUXkj6j6Ezw'
  },
  {
    id: '3',
    title: 'The Greetings Song - MAPLE LEAF',
    description: 'Fun song teaching various greetings',
    resourceType: 'video',
    bookId: '1',
    unitId: '1',
    provider: 'Maple Leaf Learning',
    youtubeVideoId: 'gVIFEVLzP4o',
    isYoutubeVideo: true,
    sourceUrl: 'https://www.youtube.com/watch?v=gVIFEVLzP4o'
  },
  {
    id: '4',
    title: 'Greetings Flashcards',
    description: 'Printable flashcards with common greetings',
    resourceType: 'pdf',
    bookId: '1',
    unitId: '1',
    provider: 'Visual English Materials',
    pdfUrl: 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/teacher%20resources/book1/unit1/greetings_flashcards.pdf'
  },
  {
    id: '5',
    title: 'Greetings Matching Game',
    description: 'Match greetings with appropriate times of day',
    resourceType: 'game',
    bookId: '1',
    unitId: '1',
    provider: 'Wordwall',
    wordwallGameId: '8924571',
    isWordwallGame: true,
    sourceUrl: 'https://wordwall.net/resource/8924571/greetings'
  }
];

export default resources;