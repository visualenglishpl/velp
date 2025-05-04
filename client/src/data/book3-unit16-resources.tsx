import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 16 - HOUSE CHORES
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit16Resources: TeacherResource[] = [
  // Videos
  {
    title: 'ISL Collective Video Lesson on House Chores',
    description: 'English lesson about household chores with examples and practice',
    resourceType: 'video',
    provider: 'ISL Collective',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/193628'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - House Chores (1)',
    description: 'Interactive game for learning household chore vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/60508097a6234699b83aa543998513b5?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - House Chores (2)',
    description: 'Match household chores with images',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6e52398f1a794e8b8b2e8c952cb3e967?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - House Chores (3)',
    description: 'Additional practice for household chore vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6bf5a510ebb649b7824c72039a167e6c?themeId=1&templateId=3&fontStackId=0'
    }
  },
];
