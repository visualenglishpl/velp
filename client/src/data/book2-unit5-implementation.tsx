// Implementation file for Book 2 Unit 5

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit5Resources } from './book2-unit5-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_UNIT_TITLES } from './book2-resources-common';

// Define lesson plans directly in the implementation file
const foodVocabularyLessonPlan: LessonPlan = {
  id: 'book2-unit5-food-vocabulary-lesson',
  title: 'Food Vocabulary',
  duration: '45 minutes',
  level: 'Elementary',
  objectives: [
    'Learn vocabulary related to common food items',
    'Practice asking and answering "What do you want to eat?"',
    'Develop speaking skills through food preference discussions'
  ],
  materials: [
    'Visual English Book 2 Unit 5 slides',
    'Food flashcards',
    'Food preference worksheet'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: 'Introduce food vocabulary with visual aids',
      instructions: ['Show images of various food items', 'Ask students if they like these foods', 'Build initial vocabulary list']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Present key food vocabulary',
      materials: ['Food flashcards', 'Visual English slides'],
      instructions: ['Present food vocabulary', 'Practice pronunciation of food items', 'Have students categorize foods (fruits, vegetables, main dishes, etc.)']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive food vocabulary activities',
      materials: ['Wordwall games', 'Food preference worksheets'],
      instructions: ['Have students match food names with images', 'Complete vocabulary games', 'Practice asking "What do you want to eat?" in pairs']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Food preference role-play',
      instructions: ['Students practice ordering food from a menu', 'Ask and answer about food preferences', 'Role-play restaurant or food stall scenarios']
    }
  ],
  assessmentTips: 'Monitor accurate use of food vocabulary. Check comprehension of food-related questions. Evaluate fluency in role-play activities.',
  homeworkIdeas: [
    'Create a menu with favorite foods',
    'Write a dialogue between a customer and server in a restaurant',
    'Complete a food vocabulary worksheet'
  ],
  additionalResources: [
    {
      title: 'Teaching note: Use real food items or realistic images for increased engagement. For lower-level students, focus on basic food items.'
    }
  ]
};

const restaurantDialogueLessonPlan: LessonPlan = {
  id: 'book2-unit5-restaurant-dialogue-lesson',
  title: 'Restaurant Dialogues',
  duration: '45 minutes',
  level: 'Elementary',
  objectives: [
    'Learn common restaurant expressions and dialogues',
    'Practice ordering food in a restaurant setting',
    'Develop conversational skills through role-play'
  ],
  materials: [
    'Visual English Book 2 Unit 5 slides',
    'Restaurant menu handouts',
    'Dialogue cards'
  ],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of food vocabulary',
      instructions: ['Review food vocabulary from previous lesson', 'Connect to today\'s topic of restaurant dialogues']
    },
    {
      title: 'Restaurant Expressions',
      duration: '15 minutes',
      description: 'Present expressions used in restaurants',
      materials: ['Expression flashcards', 'Visual English slides'],
      instructions: ['Present key restaurant expressions', 'Demonstrate waiter and customer dialogues', 'Introduce ordering patterns']
    },
    {
      title: 'Menu Activity',
      duration: '15 minutes',
      description: 'Practice with restaurant menus',
      materials: ['Sample menus', 'Dialogue worksheets'],
      instructions: ['Examine sample restaurant menus', 'Practice ordering dialogues in pairs', 'Complete dialogue gap-fill activities']
    },
    {
      title: 'Restaurant Role-play',
      duration: '10 minutes',
      description: 'Full restaurant role-play activity',
      instructions: ['Set up mock restaurant in the classroom', 'Students take turns being waiters and customers', 'Practice realistic restaurant interactions']
    }
  ],
  assessmentTips: 'Evaluate correct use of restaurant expressions. Check comprehension of menu items. Monitor role-play activities for realistic language use.',
  homeworkIdeas: [
    'Write a complete restaurant dialogue',
    'Create a menu for a restaurant',
    'Record a practice dialogue with a family member'
  ],
  additionalResources: [
    {
      title: 'Teaching note: Include cultural elements of dining out from different countries. For advanced students, introduce more complex menu items and special requests.'
    }
  ]
};

// Function to get resources for this unit
export const getBook2Unit5Resources = (): TeacherResource[] => book2Unit5Resources;

// Function to get lesson plans for this unit
export const generateUnit5LessonPlans = (): LessonPlan[] => {
  return [
    foodVocabularyLessonPlan,
    restaurantDialogueLessonPlan
  ];
};
