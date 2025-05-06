import { TeacherResource } from '@/types/teacher-resources';
import { BOOK4_TITLE } from './book4-resources-common';

/**
 * Book 4 Unit 10 - DIGITAL TECHNOLOGY
 * Resources including videos and games
 */

const unitNumber = '10';
const unitTitle = 'DIGITAL TECHNOLOGY';

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-video-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Introduction to Digital Technology`,
    description: 'Learn about modern digital technology',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=krJkRJ4Lok4',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/krJkRJ4Lok4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 'krJkRJ4Lok4'
    }
  },
  {
    id: `book4-unit${unitNumber}-video-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Digital Communication Tools`,
    description: 'An overview of common digital communication tools and their uses',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=s6IbZYwjAcE',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/s6IbZYwjAcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'youtube',
      embedId: 's6IbZYwjAcE'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-game-1`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Technology Vocabulary`,
    description: 'Interactive game to practice vocabulary related to digital technology',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/6a45d9da12e948cca233bcc23a0edf59',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6a45d9da12e948cca233bcc23a0edf59?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6a45d9da12e948cca233bcc23a0edf59?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book4-unit${unitNumber}-game-2`,
    bookId: '4',
    unitId: unitNumber,
    title: `${BOOK4_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Digital Communication Matching`,
    description: 'Match digital communication tools with their functions',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8e1de0c8d90e478c9bbceac70e15f6e1',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8e1de0c8d90e478c9bbceac70e15f6e1?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/8e1de0c8d90e478c9bbceac70e15f6e1?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

// Lesson plans for this unit
export const lessonPlans: TeacherResource[] = [
  {
    id: `book4-unit${unitNumber}-lesson-1`,
    bookId: '4',
    unitId: unitNumber,
    title: 'Introduction to Digital Technology',
    description: 'A 45-minute lesson on digital technology basics and vocabulary',
    resourceType: 'lesson',
    categories: ['activity', 'tutorial'],
    tags: ['technology', 'digital', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: `book4-unit${unitNumber}-lesson-1-plan`,
      title: 'Introduction to Digital Technology',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Learn essential digital technology vocabulary',
        'Understand basic computer components and their functions',
        'Develop conversation skills related to technology'
      ],
      materials: [
        'Technology flashcards',
        'Computer device images',
        'Technology vocabulary worksheet'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about technology experiences',
          instructions: [
            'Ask students what technology devices they use',
            'Discuss how technology helps in daily life'
          ]
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential technology vocabulary with visual aids',
          materials: ['Technology flashcards'],
          instructions: [
            'Show pictures of computer, smartphone, tablet, keyboard, mouse, etc.',
            'Have students repeat new words and match them to images'
          ]
        },
        {
          title: 'Device Components Activity',
          duration: '15 minutes',
          description: 'Practice identifying computer components and their functions',
          materials: ['Computer device images'],
          instructions: [
            'Divide students into pairs',
            'Distribute images of various devices and their components',
            'Have students match components to their functions'
          ]
        },
        {
          title: 'Technology in Daily Life',
          duration: '10 minutes',
          description: 'Discuss how we use technology in everyday situations',
          instructions: [
            'Present different scenarios (work, school, home)',
            'Ask students to describe what technology they would use in each situation'
          ]
        },
        {
          title: 'Closing Activity',
          duration: '5 minutes',
          description: 'Review key vocabulary and concepts',
          materials: ['Technology vocabulary worksheet'],
          instructions: [
            'Complete a technology vocabulary matching exercise',
            'Discuss how technology will change in the future'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\'vocabulary retention through participation in activities'
    }
  },
  {
    id: `book4-unit${unitNumber}-lesson-2`,
    bookId: '4',
    unitId: unitNumber,
    title: 'Digital Communication Tools',
    description: 'A 45-minute lesson on digital communication methods and tools',
    resourceType: 'lesson',
    categories: ['activity', 'tutorial'],
    tags: ['digital communication', 'email', 'messaging'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: `book4-unit${unitNumber}-lesson-2-plan`,
      title: 'Digital Communication Tools',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Learn vocabulary related to digital communication',
        'Understand different methods of online communication',
        'Practice writing basic digital messages'
      ],
      materials: [
        'Communication tools flashcards',
        'Message template worksheets',
        'Digital etiquette handout'
      ],
      steps: [
        {
          title: 'Introduction to Digital Communication',
          duration: '5 minutes',
          description: 'Discuss the importance of digital communication today',
          instructions: [
            'Ask students how they communicate with friends and family',
            'Discuss the advantages of digital communication'
          ]
        },
        {
          title: 'Communication Tools Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to digital communication',
          materials: ['Communication tools flashcards'],
          instructions: [
            'Present vocabulary: email, messaging app, video call, social media, etc.',
            'Discuss the purpose of each communication method'
          ]
        },
        {
          title: 'Message Writing Practice',
          duration: '15 minutes',
          description: 'Practice writing basic digital messages',
          materials: ['Message template worksheets'],
          instructions: [
            'Review email and message formats',
            'Have students practice writing short emails and text messages',
            'Discuss appropriate language for different contexts'
          ]
        },
        {
          title: 'Digital Etiquette Discussion',
          duration: '10 minutes',
          description: 'Learn about appropriate behavior in digital communication',
          materials: ['Digital etiquette handout'],
          instructions: [
            'Discuss digital etiquette rules',
            'Present examples of appropriate and inappropriate messages',
            'Talk about privacy and security in digital communication'
          ]
        },
        {
          title: 'Communication Role Play',
          duration: '5 minutes',
          description: 'Practice digital communication scenarios',
          instructions: [
            'Divide students into pairs',
            'Assign communication scenarios (e.g., scheduling a meeting, asking for information)',
            'Have students role-play the scenarios using appropriate digital tools'
          ]
        }
      ],
      assessmentTips: 'Evaluate students on their ability to write appropriate digital messages for different contexts',
      homeworkIdeas: [
        'Write a formal email to a teacher',
        'Create a digital communication etiquette guide'
      ]
    }
  }
];

// Combine all resources for this unit
export const resources: TeacherResource[] = [...videos, ...games];

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;

/**
 * Get all resources for this unit
 * @returns Array of teacher resources
 */
export function getResources(): TeacherResource[] {
  return resources;
}

/**
 * Get lesson plans for this unit
 * @returns Array of lesson plan resources
 */
export function getLessonPlans(): TeacherResource[] {
  return lessonPlans;
}

// Default export for backward compatibility
export default resources;
