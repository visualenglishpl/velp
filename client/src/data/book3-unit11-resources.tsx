import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 11 - GET WELL SOON
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit11Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Health and Illness - Vocabulary',
    description: 'Learn vocabulary related to health conditions and illnesses',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Pz3K_frg4Lc'
    }
  },
  {
    title: 'Get Well Soon Song',
    description: 'Song about feeling sick and getting better',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'eP8DC9qMWyY'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Get Well Soon - Anagram',
    description: 'Anagram puzzle game with health and illness vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/b940a207bf454bccaad30f82607e433b?themeId=1&templateId=38&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Get Well Soon (1)',
    description: 'Interactive game for learning vocabulary about illnesses',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/895c1a67735143a38cc2e2290616faf6?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Get Well Soon (2)',
    description: 'Additional practice for illness and recovery vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/94fc809eca3c4ab3bbe9a065f484a827?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Get Well Soon (3)',
    description: 'More practice activities for health vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/99a4405b524642129e645b4bc7d249b8?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Get Well Soon - People and Places',
    description: 'Vocabulary game about people and places related to healthcare',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/fa6e068d9f8445ceabfa1efedaf6b54b?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Remedies (1)',
    description: 'Game teaching vocabulary for health remedies',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/d256baa493cc41a995c9b1cb4405e1bc?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Remedies (2)',
    description: 'Additional practice for health remedy vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/dd88b65b3b364d908619f07474da9e78?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
