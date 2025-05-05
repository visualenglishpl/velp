// Implementation file for Book 3 Unit 9

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit9Resources } from './book3-unit9-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '9';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit9Resources = (): TeacherResource[] => book3Unit9Resources;

// Generate lesson plans for this unit
export const generateBook3Unit9LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to restaurants and eating out', 'Practice ordering food and drinks', 'Role-play restaurant scenarios'],
      materials: ['Restaurant menu flashcards', 'Food and drink pictures', 'Role-play props (menus, play money)', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students about their favorite restaurants and foods. What do they like to eat when dining out?'
        },
        {
          title: 'Restaurant Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to restaurants and dining.',
          instructions: [
            'Present words like "menu", "waiter/waitress", "order", "bill/check", etc.',
            'Show pictures of different restaurant settings and staff.'
          ]
        },
        {
          title: 'Food and Drink Review',
          duration: '5 minutes',
          description: 'Review food and drink vocabulary with flashcards.',
          teacherNotes: 'Focus on common restaurant menu items.'
        },
        {
          title: 'Dialogue Practice',
          duration: '10 minutes',
          description: 'Introduce and practice basic restaurant dialogues.',
          instructions: [
            'Model dialogues between waiter and customer.',
            'Practice phrases like "Can I take your order?", "I would like...", "How much is it?", etc.'
          ]
        },
        {
          title: 'Menu Reading',
          duration: '5 minutes',
          description: 'Students read a simple restaurant menu and identify items they would like to order.'
        },
        {
          title: 'Restaurant Role-play',
          duration: '10 minutes',
          description: 'In pairs, students take turns being waiter/waitress and customer, practicing ordering dialogues.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key vocabulary and expressions learned in the lesson.'
        }
      ],
      assessmentTips: 'Monitor role-play activities for appropriate use of restaurant vocabulary and dialogue patterns.',
      homeworkIdeas: ['Create a menu for your own imaginary restaurant with at least 5 food items and 3 drinks.', 'Write a dialogue between a waiter and a customer ordering food.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn to express food preferences', 'Practice asking for and paying the bill', 'Learn about restaurant etiquette'],
      materials: ['Food preference cards', 'Play money', 'Restaurant scenario cards', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review restaurant vocabulary from the previous lesson with a quick game.'
        },
        {
          title: 'Food Preferences',
          duration: '8 minutes',
          description: 'Practice expressing food likes and dislikes.',
          instructions: [
            'Model sentences like "I like pizza", "I don\'t like seafood", "I love ice cream", etc.',
            'Students share their food preferences with partners.'
          ]
        },
        {
          title: 'Asking for the Bill',
          duration: '7 minutes',
          description: 'Teach expressions for asking for and paying the bill.',
          teacherNotes: 'Include phrases like "Can I have the bill, please?", "How much is it?", "Do you accept credit cards?"'
        },
        {
          title: 'Restaurant Etiquette',
          duration: '5 minutes',
          description: 'Discuss polite behavior in restaurants and cultural differences in dining.'
        },
        {
          title: 'Restaurant Simulation',
          duration: '15 minutes',
          description: 'Set up a restaurant scenario in the classroom where students practice the entire dining experience.',
          instructions: [
            'Assign roles: waiters/waitresses, customers, chef, cashier.',
            'Customers order food, eat (pretend), and pay the bill.',
            'Rotate roles so everyone gets practice in different roles.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Discuss the restaurant simulation and review key language points.'
        }
      ],
      assessmentTips: 'Observe students during the restaurant simulation for appropriate language use and role fulfillment.',
      homeworkIdeas: ['Write about your favorite restaurant experience.', 'Create a restaurant review for an imaginary restaurant, including descriptions of the food, service, and atmosphere.']
    }
  ];
};
