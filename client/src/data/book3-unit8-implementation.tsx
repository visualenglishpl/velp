import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit8Resources from './book3-unit8-resources';

/**
 * Book 3 Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '8';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Export resources getter function
export const getBook3Unit8Resources = (): TeacherResource[] => book3Unit8Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit8LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to shopping', 'Practice asking and answering about prices', 'Count by tens from 10-100'],
      materials: ['Play money', 'Price tags', 'Flashcards of shop items', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review numbers 1-100 with a counting activity.'
        },
        {
          title: 'Shopping Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to shopping using flashcards.',
          instructions: [
            'Show images of common shop items with prices.',
            'Have students repeat each word and practice pronunciation.'
          ]
        },
        {
          title: 'Number Song',
          duration: '5 minutes',
          description: 'Play the "10 to 100 Song" video and have students sing along.',
          teacherNotes: 'Focus on tens (10, 20, 30, etc.) to prepare for price activities.'
        },
        {
          title: 'Price Question Practice',
          duration: '10 minutes',
          description: 'Model and practice the question "How much is it?" with different items.',
          instructions: [
            'Hold up an item with a price tag and ask "How much is it?"',
            'Guide students to answer "It\'s (price)."',
            'Have students take turns asking and answering.'
          ]
        },
        {
          title: 'Shopping Role Play',
          duration: '10 minutes',
          description: 'Students practice shopping dialogues in pairs.',
          instructions: [
            'Provide simple dialogue template: "Can I help you? Yes, please. How much is this? It\'s $X."',
            'Distribute play money and price tags for realism.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play a quick price guessing game with classroom objects.'
        }
      ],
      assessmentTips: 'Check for correct pronunciation of prices and understanding of the question "How much is it?"',
      homeworkIdeas: ['Create price tags for 5 items at home.', 'Practice number sequences by counting by tens from 10 to 100.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare prices using "cheaper" and "more expensive"', 'Practice shopping dialogues', 'Calculate simple costs'],
      materials: ['Shopping items with price tags', 'Play money', 'Shopping worksheet', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review previous lesson with a quick "How much is it?" activity.'
        },
        {
          title: 'Price Comparison',
          duration: '8 minutes',
          description: 'Introduce comparing prices using "cheaper than" and "more expensive than".',
          instructions: [
            'Display pairs of items with different prices.',
            'Model sentences like "The pencil is cheaper than the book" and "The book is more expensive than the pencil."'
          ]
        },
        {
          title: 'Shopping Video',
          duration: '7 minutes',
          description: 'Watch the "How Much is it?" song video.',
          teacherNotes: 'Pause to practice dialogues from the video.'
        },
        {
          title: 'Market Day Activity',
          duration: '15 minutes',
          description: 'Set up a class market where students buy and sell items.',
          instructions: [
            'Divide class into shopkeepers and customers.',
            'Customers have a shopping list and budget.',
            'Shopkeepers try to sell their products using target language.',
            'Students swap roles halfway through.'
          ]
        },
        {
          title: 'Shopping Math',
          duration: '5 minutes',
          description: 'Students calculate total costs for simple shopping problems.',
          instructions: [
            'Example: "If you buy 2 notebooks for $10 each, how much is it altogether?"',
            'Focus on adding multiples of 10.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students share what they "bought" during Market Day and how much they spent.'
        }
      ],
      assessmentTips: 'Evaluate correct use of "How much is it?" and price comparison terms during the Market Day activity.',
      homeworkIdeas: ['Create a shopping list with 5 items and prices.', 'Compare prices of similar items from different stores using "cheaper than" and "more expensive than".']
    }
  ];
};
