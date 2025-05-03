// This file imports and exports the resources and lesson plans for Book 6, Unit 5

import { book6Unit5Resources } from './book6-unit5-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Define lesson plans directly in the implementation file
const themeParkAttractionsLessonPlan: LessonPlan = {
  id: 'book6-unit5-theme-park-attractions-lesson',
  title: 'Theme Park Attractions',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to theme park attractions',
    'Practice using descriptive language for rides and attractions',
    'Develop speaking skills discussing preferences for different attractions'
  ],
  materials: [
    'Visual English Book 6 Unit 5 slides',
    'Theme park images and flashcards',
    'Attraction description worksheet'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: 'Introduce theme park vocabulary with visual aids',
      instructions: ['Show images of various theme park attractions', 'Ask students if they have visited theme parks', 'Build initial vocabulary list']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Present key attraction vocabulary',
      materials: ['Theme park flashcards', 'Visual English slides'],
      instructions: ['Present attraction vocabulary', 'Discuss features of different rides', 'Have students categorize attractions by type (thrill rides, family rides, etc.)']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive attraction matching activities',
      materials: ['Wordwall games', 'Description worksheets'],
      instructions: ['Have students match attraction names with descriptions', 'Complete vocabulary games', 'Practice describing attractions in pairs']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Theme park planning activity',
      instructions: ['Students design their ideal day at a theme park', 'Describe which attractions they would visit and why', 'Present their plan to a partner or small group']
    }
  ],
  assessmentTips: 'Monitor accurate use of attraction vocabulary. Check comprehension of ride descriptions. Evaluate fluency in theme park planning activity.',
  homeworkIdeas: [
    'Research a famous theme park and its main attractions',
    'Write a review of a theme park attraction they have experienced or would like to try',
    'Create a simple map of an imaginary theme park with labeled attractions'
  ],
  notes: 'Use videos of rides if available to increase engagement. For advanced students, discuss the physics and engineering behind different attractions.'
};

const themeParkStallsLessonPlan: LessonPlan = {
  id: 'book6-unit5-theme-park-stalls-lesson',
  title: 'Theme Park Food and Game Stalls',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to theme park food and game stalls',
    'Practice ordering food and asking about prices',
    'Develop speaking skills through role-play activities'
  ],
  materials: [
    'Visual English Book 6 Unit 5 slides',
    'Food and game stall flashcards',
    'Menu and price list handouts'
  ],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of theme park attraction vocabulary',
      instructions: ['Review attraction vocabulary from previous lesson', 'Connect to today\'s topic of food and game stalls']
    },
    {
      title: 'Stall Vocabulary',
      duration: '15 minutes',
      description: 'Present vocabulary for different types of stalls',
      materials: ['Stall flashcards', 'Visual English slides'],
      instructions: ['Present key food stall vocabulary', 'Discuss game stall vocabulary', 'Introduce pricing and ordering expressions']
    },
    {
      title: 'Menu Activity',
      duration: '15 minutes',
      description: 'Practice with theme park menus',
      materials: ['Sample menus', 'Price lists', 'Ordering worksheet'],
      instructions: ['Examine sample theme park menus', 'Practice ordering dialogues in pairs', 'Complete price calculation activities']
    },
    {
      title: 'Role-play',
      duration: '10 minutes',
      description: 'Food stall and game stall role-play',
      instructions: ['Set up mock stalls in the classroom', 'Students take turns being vendors and customers', 'Practice realistic theme park interactions']
    }
  ],
  assessmentTips: 'Evaluate correct use of food and game vocabulary. Check comprehension of pricing expressions. Monitor role-play activities for realistic language use.',
  homeworkIdeas: [
    'Design a menu for a theme park food stall',
    'Create rules and prices for a theme park game stall',
    'Write a dialogue between a customer and vendor at a theme park'
  ],
  notes: 'Include cultural elements of theme park food from different countries. For lower-level students, focus on basic ordering expressions.'
};

// Use type definition directly since importing from components can cause circular dependencies
type TeacherResource = {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
  lessonPlan?: any; // Using any to avoid circular import issues
};

// Import types from LessonPlanTemplate to ensure compatibility
import { LessonPlan as ImportedLessonPlan } from '@/components/LessonPlanTemplate';

// Use imported type to ensure compatibility
type LessonPlan = ImportedLessonPlan;

// Function to get lesson plans for this unit
export const getBook6Unit5LessonPlans = (): LessonPlan[] => {
  return [
    themeParkAttractionsLessonPlan,
    themeParkStallsLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook6Unit5Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit5Resources.map(resource => ({
    id: `book6-unit5-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId,
    unitId,
    ...resource
  }));
};

// Export the resources for this unit (for backward compatibility)
export const unitResources = book6Unit5Resources;

// Export the lesson plans for this unit (for backward compatibility)
export const lessonPlans = [
  themeParkAttractionsLessonPlan,
  themeParkStallsLessonPlan
];
