import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit12Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Describing People - Appearance Vocabulary',
    description: 'Learn vocabulary for describing people\'s physical appearance',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'OcpJYBMzpak'
    }
  },
  {
    title: 'What Do They Look Like? - ELF Learning',
    description: 'Fun song about describing physical appearance',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '1pF7JpyC9sc'
    }
  },
  {
    title: 'Physical Description Song',
    description: 'Catchy song to remember words for describing people',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'QkHQ0CYwjaI'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Describing People',
    description: 'Practice vocabulary for physical descriptions',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/d0d0ea8a5c8c40f5852ecb5c9f9eeafc?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Physical Appearance Quiz',
    description: 'Test your knowledge of appearance vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/7193c0f7f240499c9e05ec57e6d11c59?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Match Physical Descriptions',
    description: 'Match physical descriptions with corresponding images',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/3f33d8f11a2a40cdbfea6b54d02e4e9a?themeId=1&templateId=46&fontStackId=0'
    }
  },
];
