/**
 * Resources for Book 4 Unit 9 - Camping
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 9
 */

import { TeacherResource } from '@/types/teacher-resources';

/**
 * Resources for Book 4 Unit 9 (Camping)
 */
export const book4Unit9Resources: TeacherResource[] = [
  // Videos
  {
    id: 'book4-unit9-video1',
    bookId: '4',
    unitId: '9',
    title: 'Introduction to Camping',
    description: 'Learn camping basics and essential outdoor skills',
    resourceType: 'video',
    categories: ['tutorial'],
    tags: ['camping', 'outdoor', 'survival skills'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'YouTube',
    dateAdded: '2023-08-10',
    content: {
      type: 'youtube',
      embedId: 'H9hqzIx43_0',
    },
    thumbnailUrl: 'https://img.youtube.com/vi/H9hqzIx43_0/mqdefault.jpg',
  },
  
  // Games
  {
    id: 'book4-unit9-game1',
    bookId: '4',
    unitId: '9',
    title: 'Camping Verbs Game',
    description: 'Learn and practice verbs related to camping activities',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['camping', 'verbs', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-08-15',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit9-game2',
    bookId: '4',
    unitId: '9',
    title: 'Camping Vocabulary Game',
    description: 'Interactive game to practice camping-related vocabulary',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['camping', 'equipment', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-08-20',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
];

/**
 * Lesson plans for Book 4 Unit 9
 */
export const book4Unit9LessonPlans: TeacherResource[] = [
  {
    id: 'book4-unit9-lesson1',
    bookId: '4',
    unitId: '9',
    title: 'Introduction to Camping',
    description: 'A 45-minute lesson on camping essentials and vocabulary',
    resourceType: 'lesson',
    categories: ['activity', 'tutorial'],
    tags: ['camping', 'outdoor skills', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: 'book4-unit9-lesson1-plan',
      title: 'Introduction to Camping',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Learn essential camping vocabulary',
        'Understand camping equipment and uses',
        'Develop conversation skills related to outdoor activities'
      ],
      materials: [
        'Camping equipment pictures',
        'Vocabulary cards',
        'Camping site diagram'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about outdoor experiences',
          instructions: [
            'Ask students if they have ever been camping',
            'Discuss what they know about camping activities'
          ]
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential camping vocabulary with visual aids',
          materials: ['Camping equipment pictures'],
          instructions: [
            'Show pictures of tent, sleeping bag, backpack, compass, flashlight, etc.',
            'Have students repeat new words and match them to images'
          ]
        },
        {
          title: 'Camping Equipment Activity',
          duration: '15 minutes',
          description: 'Practice identifying equipment and its uses',
          materials: ['Vocabulary cards'],
          instructions: [
            'Divide students into pairs',
            'Distribute vocabulary cards with equipment names and uses',
            'Have students match equipment to its function'
          ]
        },
        {
          title: 'Setting Up Camp Simulation',
          duration: '10 minutes',
          description: 'Learn the sequence of setting up a campsite',
          materials: ['Camping site diagram'],
          instructions: [
            'Present a diagram of a campsite',
            'Discuss the ideal locations for tent, fire pit, food storage',
            'Have students describe the process of setting up camp using sequence words'
          ]
        },
        {
          title: 'Closing Activity',
          duration: '5 minutes',
          description: 'Review key vocabulary and concepts',
          instructions: [
            'Play a quick game of camping vocabulary bingo',
            'Summarize key safety points for camping'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\'vocabulary retention through participation in activities'
    }
  },
  {
    id: 'book4-unit9-lesson2',
    bookId: '4',
    unitId: '9',
    title: 'Camping Safety and Survival Skills',
    description: 'A 45-minute lesson on staying safe during camping trips',
    resourceType: 'lesson',
    categories: ['lesson'],
    tags: ['camping safety', 'survival', 'outdoor education'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: 'book4-unit9-lesson2-plan',
      title: 'Camping Safety and Survival Skills',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Learn basic camping safety rules',
        'Understand emergency procedures for outdoor activities',
        'Develop vocabulary related to safety and survival'
      ],
      materials: [
        'Safety rules poster',
        'First aid kit items',
        'Compass and map',
        'Emergency scenario cards'
      ],
      steps: [
        {
          title: 'Safety Introduction',
          duration: '5 minutes',
          description: 'Discuss the importance of safety in outdoor settings',
          instructions: [
            'Ask students why safety is important when camping',
            'Brainstorm potential risks during camping trips'
          ]
        },
        {
          title: 'Safety Rules Presentation',
          duration: '10 minutes',
          description: 'Present essential camping safety guidelines',
          materials: ['Safety rules poster'],
          instructions: [
            'Review rules about fire safety, wildlife encounters, weather precautions',
            'Discuss the "buddy system" and staying together'
          ]
        },
        {
          title: 'First Aid Basics',
          duration: '10 minutes',
          description: 'Introduce basic first aid concepts for camping',
          materials: ['First aid kit items'],
          instructions: [
            'Show items in a basic first aid kit',
            'Discuss common minor injuries and appropriate treatments',
            'Teach vocabulary: bandage, antiseptic, splint, etc.'
          ]
        },
        {
          title: 'Navigation Skills',
          duration: '10 minutes',
          description: 'Learn basic navigation to avoid getting lost',
          materials: ['Compass and map'],
          instructions: [
            'Demonstrate how to use a compass',
            'Explain how to read basic map features',
            'Discuss what to do if lost in the wilderness'
          ]
        },
        {
          title: 'Emergency Scenarios',
          duration: '10 minutes',
          description: 'Practice responding to camping emergencies',
          materials: ['Emergency scenario cards'],
          instructions: [
            'Divide students into small groups',
            'Assign each group a scenario card with a camping emergency',
            'Have groups discuss and present their response plan'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' understanding of safety procedures through scenario responses',
      homeworkIdeas: [
        'Create a personal camping safety checklist',
        'Research local wildlife safety guidelines'
      ]
    }
  }
];

/**
 * Get all resources for Book 4 Unit 9
 * @returns Array of teacher resources
 */
export function getBook4Unit9Resources(): TeacherResource[] {
  return book4Unit9Resources;
}

/**
 * Get lesson plans for Book 4 Unit 9
 * @returns Array of lesson plan resources
 */
export function getBook4Unit9LessonPlans(): TeacherResource[] {
  return book4Unit9LessonPlans;
}