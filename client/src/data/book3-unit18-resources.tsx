import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 18 - MOVIES - FILMS
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit18Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Movie Genres - Super Easy Learning',
    description: 'Learn vocabulary related to different movie genres',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Z2ppOux48xQ'
    }
  },
  {
    title: 'English Vocabulary: Movies & Films',
    description: 'Comprehensive vocabulary related to movies and cinema',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'bVu7Sps7EBA'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Movies - Films - Anagram',
    description: 'Anagram puzzle game with movies vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/254873d240b5431fa610be3b49627e47?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Movies - Films (1)',
    description: 'Interactive game for learning movie genre vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/872f689c7465402894baa253d4f2430c?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Movies - Films (2)',
    description: 'Additional practice for cinema and movie vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/61111ee5734e4a07bde0447c09765df2?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
