/**
 * Book 1, Unit 3: Classroom Rules - Implementation
 * 
 * This module provides lesson plans and resources for Book 1, Unit 3
 */

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { book1Unit3Resources } from './book1-unit3-resources';

/**
 * Generates lesson plans for Book 1, Unit 3: Classroom Rules
 * 
 * @returns An array of lesson plans
 */
export function generateUnit3LessonPlans(): LessonPlan[] {
  return [
    {
      title: 'Classroom Rules - Introduction and Commands',
      objectives: [
        'Learn and practice common classroom commands',
        'Understand basic classroom rules',
        'Follow instructions in English'
      ],
      materials: [
        'Visual English Book 1, Unit 3',
        'Flashcards with classroom commands',
        'Video resources: "Stand Up Sit Down" song'
      ],
      warmUp: {
        title: 'Simon Says',
        description: 'Play a game of "Simon Says" using classroom commands like "stand up," "sit down," "open your book," "close your book," etc.',
        duration: '5-7 minutes'
      },
      mainActivities: [
        {
          title: 'Classroom Commands Introduction',
          description: 'Introduce classroom commands using Visual English Book 1, Unit 3 images. Demonstrate each command physically and have students repeat and perform the actions.',
          duration: '10 minutes'
        },
        {
          title: 'Stand Up, Sit Down Song',
          description: 'Play the "Stand Up, Sit Down" song video and have students perform the actions while singing along.',
          duration: '5 minutes',
          resources: ['video-1', 'video-2']
        },
        {
          title: 'Command Practice',
          description: 'Practice commands in pairs where one student gives a command and the other performs it, then they switch roles.',
          duration: '10 minutes'
        }
      ],
      extension: {
        title: 'Classroom Rules Poster',
        description: 'Students create a poster illustrating classroom rules with images and simple English phrases.'
      },
      assessment: 'Observe students following commands during activities. Check understanding by giving random commands throughout the class and observing responses.',
      homework: 'Practice classroom commands at home with family members.'
    },
    {
      title: 'Open and Close - Classroom Objects',
      objectives: [
        'Learn vocabulary related to opening and closing objects',
        'Practice following instructions with classroom objects',
        'Use simple present tense verbs for classroom actions'
      ],
      materials: [
        'Visual English Book 1, Unit 3',
        'Real classroom objects (books, pencil cases, windows, doors)',
        'Video resources: "Open Shut Them" songs'
      ],
      warmUp: {
        title: 'Open Shut Them Song',
        description: 'Teach the "Open Shut Them" song with hand actions.',
        duration: '5 minutes',
        resources: ['video-3', 'video-4']
      },
      mainActivities: [
        {
          title: 'Open/Close Practice',
          description: 'Show images from the book and practice "open your book," "close your pencil case," etc. with real objects.',
          duration: '10 minutes'
        },
        {
          title: 'Action Chain',
          description: 'Create a chain of commands where each student performs an action and gives a new command to the next student.',
          duration: '10 minutes'
        },
        {
          title: 'Open/Close Game',
          description: 'In teams, students race to correctly perform open/close commands with various classroom objects.',
          duration: '10 minutes'
        }
      ],
      extension: {
        title: 'Open/Close Mime Game',
        description: 'Students mime opening or closing different objects while others guess what they are doing.'
      },
      assessment: 'Monitor students during the games and activities to assess their comprehension and correct usage of open/close vocabulary.',
      homework: 'Draw pictures of 5 things that can be opened and closed at home.'
    },
    {
      title: 'Classroom Rules and Cleanup',
      objectives: [
        'Understand and follow classroom cleanup rules',
        'Practice imperative verbs related to classroom tidiness',
        'Work cooperatively to maintain classroom order'
      ],
      materials: [
        'Visual English Book 1, Unit 3',
        'Classroom objects to organize',
        'Video resource: "Clean Up Song"',
        'Wordwall games on classroom rules'
      ],
      warmUp: {
        title: 'Clean Up Song',
        description: 'Teach the "Clean Up Song" and practice it while cleaning up a deliberately messy area.',
        duration: '5 minutes',
        resources: ['video-5']
      },
      mainActivities: [
        {
          title: 'Classroom Rules Discussion',
          description: 'Using book images, discuss why each classroom rule is important.',
          duration: '10 minutes'
        },
        {
          title: 'Rules Role-Play',
          description: 'Students role-play scenarios showing good and bad classroom behavior, and others identify which rules are being followed or broken.',
          duration: '10 minutes'
        },
        {
          title: 'Classroom Rules Game',
          description: 'Play Wordwall games to reinforce understanding of classroom rules.',
          duration: '10 minutes',
          resources: ['game-1', 'game-2']
        }
      ],
      extension: {
        title: 'Classroom Helper Roles',
        description: 'Assign classroom helper roles with specific responsibilities for maintaining classroom order.'
      },
      assessment: 'Observe student participation in cleanup activities and their understanding of classroom rules during discussions and games.',
      homework: 'Create a list of rules for keeping their bedroom or study area clean and organized.'
    }
  ];
}

/**
 * Gets all resources for Book 1, Unit 3
 * 
 * @returns An array of teacher resources
 */
export function getBook1Unit3Resources() {
  return book1Unit3Resources;
}

export default {
  getLessonPlans: generateUnit3LessonPlans,
  getTeacherResources: getBook1Unit3Resources
};