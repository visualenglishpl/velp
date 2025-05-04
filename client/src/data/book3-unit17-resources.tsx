import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 17 - HOUSE CHORES
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit17Resources: TeacherResource[] = [
  // Videos
  {
    title: 'House Chores Song for Kids',
    description: 'A fun song teaching children about different household chores',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Ot53mer1xIk'
    }
  },
  {
    title: 'Do the Chores',
    description: 'Interactive vocabulary video about house chores',
    resourceType: 'video',
    provider: 'ISL Collective',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/193628'
    }
  },
  {
    title: 'Household Chores ESL Vocabulary',
    description: 'Learn vocabulary related to household tasks',
    resourceType: 'video',
    provider: 'YouTube',
    content: {
      type: 'youtube',
      embedId: 'Kke9CnYEOGc'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - House Chores (1)',
    description: 'Interactive game for learning house chore vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/60508097a6234699b83aa543998513b5?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - House Chores (2)',
    description: 'Additional practice for house chore vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6e52398f1a794e8b8b2e8c952cb3e967?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - House Chores (3)',
    description: 'More practice activities for house chore vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6bf5a510ebb649b7824c72039a167e6c?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
