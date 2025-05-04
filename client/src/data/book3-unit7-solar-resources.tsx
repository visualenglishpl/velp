import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 7 - THE SOLAR SYSTEM
 * Resources including videos and games based on the provided attachment
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
      embedId: 'stnU6xfbjew'
    }
  },
  {
    title: 'STORYBOTS - The Planet Rap',
    description: 'Fun rap song about planets in our solar system',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'ZHAqT4hXnMw'
    }
  },
  {
    title: 'How Big is the Solar System',
    description: 'Educational video about the scale of our solar system',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'MK5E_7hOi-k'
    }
  },
  {
    title: "STORYBOTS - I'm So Hot (The Sun)",
    description: 'Fun animated song about the Sun',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 't-kzdR93bqw'
    }
  },
  {
    title: "STORYBOTS - I'm A Star",
    description: 'Animated video teaching about stars',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '7t3aXb3LpWg'
    }
  },
  {
    title: 'Planets & Stars Size Comparison',
    description: 'Visual comparison of planets and stars sizes',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: '7T1LO6nOUdw'
    }
  },
  {
    title: "Zoom Zoom Zoom, We're Going to the Moon",
    description: 'Fun song about traveling to the moon',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'DEHBrmZxAf8'
    }
  },
  {
    title: 'Mr. President and Aliens - Short Film',
    description: 'Short film about aliens and the president',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'mLVmocdbJbw'
    }
  },
  {
    title: 'Space Shuttle Launch Audio',
    description: 'Real audio from a space shuttle launch',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'OnoNITE-CLc'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - PLANETS',
    description: 'Interactive game for learning about planets',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/ddfca3c6dd424a038b16104c109e2585?themeId=1&templateId=5&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - PLANETS LABEL (1)',
    description: 'Label the planets in our solar system',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6848de723c0541a7aa4ec961768efba7?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - PLANETS LABEL (2)',
    description: 'Another planet labeling activity',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/7eebe178fe2c476eabd9ca6c428ffbdb?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - PLANETS QUIZ',
    description: 'Test your knowledge about planets',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/275c9bfc53e84633b4340bedb8e966ed?themeId=1&templateId=3&fontStackId=0'
    }
  }
];
