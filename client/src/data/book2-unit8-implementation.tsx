/**
 * Visual English Book 2, Unit 8: LET'S GO SHOPPING
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit8Resources } from './book2-unit8-resources';

// Function to get resources for this unit
export function getBook2Unit8Resources(): TeacherResource[] {
  return book2Unit8Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit8LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit8-lesson1',
      title: 'Shopping - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common shops and shopping items',
        'Students will practice asking and answering "Where can I buy...?"',
        'Students will sing along with shopping-themed songs'
      ],
      materials: [
        'Visual English Book 2 Unit 8 slides',
        'Shop and item flashcards',
        "Let's Go Shopping songs",
        'Wordwall games about types of shops'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students pictures of different shops and ask if they know what each shop is called and what they sell.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce shop vocabulary with flashcards. Show each card, say the shop name, and have students repeat. Include: supermarket, bakery, toy shop, clothes shop, bookstore, etc.'
        },
        {
          title: 'Shopping Song',
          duration: '8 minutes',
          description: 'Play the "Let\'s Go Shopping Song 1" video. First, have students listen, then play it again and encourage them to sing along.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 8 slides showing different shops and items. For each item, ask "Where can I buy this?" and guide students to answer with "You can buy it at the..."'
        },
        {
          title: 'Shopping Dialogue',
          duration: '10 minutes',
          description: 'Model a dialogue: "Where can I buy bread?" "You can buy bread at the bakery." Then pair students to practice with different items.'
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play a Wordwall game about types of shops to reinforce vocabulary learned in the lesson.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of shop names and proper sentence structure when answering "Where can I buy...?"',
      homeworkIdeas: [
        'Draw a map of shops in your neighborhood',
        'Complete a shops and items matching worksheet'
      ]
    },
    {
      id: 'book2-unit8-lesson2',
      title: 'Shopping - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will practice shopping dialogues',
        'Students will learn to use "How much is/are...?"',
        'Students will role-play shopping scenarios'
      ],
      materials: [
        'Visual English Book 2 Unit 8 slides',
        'Play money (optional)',
        'Shopping items (real or pictures)',
        'Wordwall games about shops'
      ],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of shop vocabulary using flashcards or by singing the Let\'s Go Shopping song again.'
        },
        {
          title: 'Price Expressions',
          duration: '10 minutes',
          description: 'Teach "How much is/are...?" and responses like "It\'s 5 dollars/euros." Write example dialogues on the board and practice pronunciation.'
        },
        {
          title: 'Shopping Role-play Preparation',
          duration: '10 minutes',
          description: 'Set up "shops" around the classroom with items and price tags. Divide students into shopkeepers and customers. Teach useful phrases like "Can I help you?" and "I would like to buy..."'
        },
        {
          title: 'Shopping Role-plays',
          duration: '12 minutes',
          description: 'Students role-play shopping scenarios in pairs or small groups. Customers ask for items and prices, shopkeepers respond appropriately. Rotate roles so everyone gets to practice both parts.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use another Wordwall game from the Unit 8 resources to practice matching items to the correct shops.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Class discussion: "What did you buy today? How much was it? Where did you buy it?"'
        }
      ],
      assessmentTips: 'Observe students\' ability to use correct shop vocabulary and price expressions during role-plays.',
      homeworkIdeas: [
        'Create a shopping list with 5 items and the shops where you can buy them',
        'Make a price list for 10 common items'
      ],
      additionalResources: [
        {
          title: "Let's Go Shopping Song",
          url: 'https://www.youtube.com/watch?v=YSC9Etw0ZHQ'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit8Resources,
  generateUnit8LessonPlans
};