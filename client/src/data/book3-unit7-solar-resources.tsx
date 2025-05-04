import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 7 - THE SOLAR SYSTEM
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit7SolarResources: TeacherResource[] = [
  // Videos
  {
    title: 'SINGING WALRUS - Planets Song (Solar System Song)',
    description: 'Engaging song about planets in our solar system with good visuals',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'ZHAqT4hXnMw'
    }
  },
  {
    title: 'STORYBOTS - The Sun Song',
    description: 'Fun animated video teaching about the Sun',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'hp_jbyhYE-0'
    }
  },
  {
    title: 'STORYBOTS - Moon Song',
    description: 'Animated video teaching about the Moon',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'v9n_LWL8_ws'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Solar System Vocabulary',
    description: 'Interactive game for learning solar system vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/e4b0acf6c3564f07bed17b6cc9cc2c36?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - The Solar System',
    description: 'Match up planets with their facts and characteristics',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/9e10b8cbe1ab4053a0b7e14e0d2c1fb2?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Planet Order Game',
    description: 'Put the planets in the correct order from the Sun',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ca0b2bddd77c4ea0a9387e1e69c9b35a?themeId=1&templateId=46&fontStackId=0'
    }
  },
];
