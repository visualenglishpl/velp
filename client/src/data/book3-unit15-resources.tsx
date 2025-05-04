import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 15 - BUGS
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit15Resources: TeacherResource[] = [
  // Videos
  {
    title: 'What Do You See - Insects Song (1)',
    description: 'Song about different types of insects and bugs',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'bn8QLdWJYl8'
    }
  },
  {
    title: 'What Do You See - Insects Song (2)',
    description: 'Additional song for learning insect vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'llZwHR_Y_Es'
    }
  },
  {
    title: 'Caterpillar Shoes - Story',
    description: 'Animated story about a caterpillar meeting different insects',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'tYa6OLQHrEc'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Bugs (1)',
    description: 'Interactive vocabulary game for learning about bugs',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/8d16140de3bc4f18b01da41ab409b8b3?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Bugs (2)',
    description: 'Match bugs with their names',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/f49aa2731b464239bc342f74b3b9db68?themeId=1&templateId=46&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Bugs (3)',
    description: 'Additional practice for insect vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/76a1a0d4a10d486680c6d0614236085c?themeId=1&templateId=46&fontStackId=0'
    }
  },
];
