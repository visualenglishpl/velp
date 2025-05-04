import { TeacherResource } from '@/components/TeacherResources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

/**
 * Book 3 Unit 13 - ANIMAL BODY PARTS
 * Resources including videos and games based on the DOCX attachment
 */

export const book3Unit13Resources: TeacherResource[] = [
  // Videos
  {
    title: 'Animal Body Parts Video Lesson',
    description: 'ISL Collective Video Lesson on Animal Body Parts',
    resourceType: 'video',
    provider: 'ISL Collective',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/486113'
    }
  },
  {
    title: 'Animal Body Parts Practice',
    description: 'ISL Collective Video Exercises for Animal Body Parts',
    resourceType: 'video',
    provider: 'ISL Collective',
    content: {
      type: 'iframe',
      embedUrl: 'https://en.islcollective.com/english-esl-video-lessons/embed/486106'
    }
  },
  
  // Games
  {
    title: 'WORDWALL - Animal Body Parts',
    description: 'Interactive game for learning animal body parts vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/57658f0b3d9b4515b8df3df9b939d23f?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Animal Body Parts (2)',
    description: 'Match animal body parts with pictures',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/6a89079f91e04dfa9ddef933b9f8bdef?themeId=1&templateId=22&fontStackId=0'
    }
  },
  {
    title: 'WORDWALL - Animal Body Parts - Landscapes',
    description: 'Animal body parts vocabulary in landscape game format',
    resourceType: 'game',
    provider: 'Wordwall',
    content: {
      type: 'iframe',
      embedUrl: 'https://wordwall.net/embed/3166dd8c0aca41c49e67c931b15f33e5?themeId=1&templateId=2&fontStackId=0'
    }
  },
];
