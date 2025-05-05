import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit8Resources from './book3-unit8-resources';

/**
 * Book 3 Unit 8 - LET'S GO SHOPPING - HOW MUCH IS IT?
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '8';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'LET\'S GO SHOPPING - HOW MUCH IS IT?';

// Export resources getter function
export function getBook3Unit8Resources(): TeacherResource[] {
  return book3Unit8Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit8-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '8'
  }));
}

// Generate specific lesson plans for this unit
export const generateBook3Unit8LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for numbers 10-100', 'Ask and answer "How much is it?"', 'Use money expressions in a shopping context'],
      materials: ['Number flashcards (10-100)', 'Play money', 'Price tags', 'Visual English 3 textbook', 'Shopping items pictures'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review numbers 1-10 and introduce tens (10, 20, 30...)'
        },
        {
          title: 'Numbers 10-100 Song',
          duration: '7 minutes',
          description: 'Watch the "10 to 100 Song" video.',
          instructions: [
            'Play the video once through.',
            'Play again, pausing to practice counting by tens.',
            'Have students sing along with the video.'
          ]
        },
        {
          title: 'Numbers Practice',
          duration: '8 minutes',
          description: 'Teach numbers in multiples of 10 and practice counting.',
          instructions: [
            'Display flashcards with numbers 10-100 (by tens).',
            'Model pronunciation and have students repeat.',
            'Play a quick number recognition game.'
          ]
        },
        {
          title: 'Shopping Vocabulary',
          duration: '10 minutes',
          description: 'Introduce shopping-related phrases and vocabulary.',
          instructions: [
            'Teach: "How much is it?" "It\'s ___ dollars/euros."',
            'Show pictures of items with price tags.',
            'Model dialogue and have students practice in pairs.'
          ],
          teacherNotes: 'Use play money to make the activity more engaging.'
        },
        {
          title: 'Shopping Role-play',
          duration: '10 minutes',
          description: 'Students practice shopping dialogues.',
          instructions: [
            'Set up a simple store with items and price tags.',
            'Have students take turns being shopkeeper and customer.',
            'Encourage use of "How much is it?" and appropriate responses.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play the Wordwall "Numbers 10-Tens" game to reinforce vocabulary.'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and say numbers from 10-100. Observe their use of "How much is it?" in shopping dialogues.',
      homeworkIdeas: ['Practice numbers 10-100 with the online Wordwall game.', 'Create 5 price tags for items at home and write how much each item costs.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Practice using numbers in real shopping scenarios', 'Expand shopping dialogue vocabulary', 'Role-play shopping interactions'],
      materials: ['Play money', 'Shopping items with price tags', 'Shopping dialogue cards', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of numbers and shopping phrases with flashcards.'
        },
        {
          title: 'Video: How Much Is It?',
          duration: '7 minutes',
          description: 'Watch the "How Much Is It?" song/conversation video.',
          teacherNotes: 'Pause the video at key moments to practice the phrases together.'
        },
        {
          title: 'Extended Shopping Dialogues',
          duration: '10 minutes',
          description: 'Teach additional shopping phrases.',
          instructions: [
            'Introduce: "Can I help you?" "I would like..." "Here you are." "Thank you."',
            'Model a complete shopping dialogue with a volunteer.',
            'Have students practice extended dialogues in pairs.'
          ]
        },
        {
          title: 'Market Day Game',
          duration: '15 minutes',
          description: 'Students create a class marketplace.',
          instructions: [
            'Divide class into shopkeepers and customers.',
            'Give customers play money in different amounts.',
            'Shopkeepers set up "stores" with items and prices.',
            'Customers must buy at least 3 items, using proper dialogues.',
            'Switch roles halfway through.'
          ]
        },
        {
          title: 'Numbers Challenge',
          duration: '5 minutes',
          description: 'Play the Wordwall "HOW MUCH IS IT?" game as a class.'
        },
        {
          title: 'Wrap-up',
          duration: '3 minutes',
          description: 'Students share what they "bought" during Market Day and how much they spent.'
        }
      ],
      assessmentTips: 'Evaluate students\' fluency in using shopping phrases and correct number usage in context. Check their ability to navigate a complete shopping dialogue.',
      homeworkIdeas: ['Write a shopping dialogue with 5 exchanges.', 'Complete the online Wordwall activities about prices and numbers.']
    }
  ];
};
