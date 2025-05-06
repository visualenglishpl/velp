/**
 * Visual English Book 4, Unit 11 - SHOPPING
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit11-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit11Resources(): TeacherResource[] {
  return resources;
}

// Function with standardized name for component compatibility
export function getTeacherResources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
export function generateBook4Unit11LessonPlans(): LessonPlan[] {
  const unitNumber = '11';
  const unitTitle = 'SHOPPING';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn essential shopping vocabulary',
        'Students will identify common items found in shops',
        'Students will practice asking about prices and availability'
      ],
      materials: ['Shopping vocabulary flashcards', 'Price tag cards', 'Store catalogs or flyers'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about shopping experiences',
          instructions: ['Ask students where they like to shop', 'Discuss what kinds of shops they visit regularly']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential shopping vocabulary with visual aids',
          materials: ['Shopping vocabulary flashcards'],
          instructions: [
            'Show pictures of different shops and items',
            'Have students repeat new words and match them to images',
            'Watch the Shopping Vocabulary video'
          ]
        },
        {
          title: 'Price Inquiry Practice',
          duration: '15 minutes',
          description: 'Practice asking and answering about prices',
          materials: ['Price tag cards'],
          instructions: [
            'Demonstrate phrases like "How much is this?" and "How much does it cost?"',
            'Distribute price tag cards to students',
            'Have students practice asking and answering about prices in pairs'
          ]
        },
        {
          title: 'Shopping Role Play',
          duration: '10 minutes',
          description: 'Simulate shopping conversations',
          materials: ['Store catalogs or flyers'],
          instructions: [
            'Divide class into pairs - customer and shop assistant',
            'Distribute store catalogs for reference',
            'Have students role-play shopping conversations'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Review shopping vocabulary with interactive game',
          instructions: [
            'Play the Shopping Vocabulary Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use shopping vocabulary and phrases in role-play activities',
      homeworkIdeas: ['Create a shopping list in English', 'Write a short dialogue in a shop']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to supermarket shopping',
        'Students will understand how to ask for help in a shop',
        'Students will practice shopping conversation patterns'
      ],
      materials: ['Supermarket section flashcards', 'Shopping conversation worksheets', 'Product packaging or pictures'],
      steps: [
        {
          title: 'Supermarket Introduction',
          duration: '5 minutes',
          description: 'Discuss supermarket shopping and organization',
          instructions: ['Ask students how supermarkets are organized', 'Discuss different sections of a supermarket']
        },
        {
          title: 'Supermarket Sections Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to supermarket sections and products',
          materials: ['Supermarket section flashcards'],
          instructions: [
            'Present vocabulary for supermarket sections: produce, dairy, bakery, etc.',
            'Match products to their correct sections',
            'Watch the At the Supermarket video'
          ]
        },
        {
          title: 'Asking for Help Practice',
          duration: '10 minutes',
          description: 'Practice phrases for asking for assistance in shops',
          materials: ['Shopping conversation worksheets'],
          instructions: [
            'Teach phrases like "Excuse me, where can I find...?" and "Do you have...?"',
            'Have students practice asking for help finding specific items',
            'Discuss polite expressions to use when shopping'
          ]
        },
        {
          title: 'Product Description Activity',
          duration: '15 minutes',
          description: 'Practice describing products and comparing options',
          materials: ['Product packaging or pictures'],
          instructions: [
            'Show examples of similar products with different features',
            'Teach comparative language for shopping: cheaper, more expensive, larger, etc.',
            'Have students describe and compare products in pairs'
          ]
        },
        {
          title: 'Interactive Activity',
          duration: '5 minutes',
          description: 'Practice shopping conversation patterns',
          instructions: [
            'Play the Shopping Conversation Wordwall game',
            'Review key phrases and vocabulary from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to navigate shopping conversations and compare products',
      homeworkIdeas: ['Create a map of a supermarket with labeled sections', 'Write a conversation asking for help in a shop']
    }
  ];
};

// Legacy function for compatibility with TeacherResources component
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  return {
    id: resource.id || '',
    title: resource.title || '',
    duration: resource.lessonPlan?.duration || '45 minutes',
    level: resource.lessonPlan?.level || 'Elementary to Pre-Intermediate',
    objectives: resource.lessonPlan?.objectives || [],
    materials: resource.lessonPlan?.materials || [],
    steps: resource.lessonPlan?.steps || [],
    assessmentTips: resource.lessonPlan?.assessmentTips || '',
    homeworkIdeas: resource.lessonPlan?.homeworkIdeas || []
  };
}

// Function to get lesson plans (for backward compatibility)
export function getBook4Unit11LessonPlans(): LessonPlan[] {
  return generateBook4Unit11LessonPlans();
}

// Function with standardized name for component compatibility
export function getUnitLessonPlans(): LessonPlan[] {
  return generateBook4Unit11LessonPlans();
}