/**
 * Implementation file for Book 1 Unit 15: Food and Drinks
 *
 * This unit focuses on teaching food and drinks vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit15Resources } from './book1-unit15-resources';

// Export a function to get resources for this unit
export const getBook1Unit15Resources = (): TeacherResource[] => {
  return book1Unit15Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit15LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Food and Drinks (45 minutes)
    {
      id: 'book1-unit15-lesson1',
      title: 'Introduction to Food and Drinks - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic food and drinks vocabulary',
        'Identify different food and drinks items',
        'Use simple sentences with food and drinks vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 15 slides',
        'Food and Drinks flashcards',
        'Food and Drinks videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of food and drinks. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Food and Drinks vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to food and drinks.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to food and drinks vocabulary.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the vocabulary learned today. Play a quick game to reinforce learning. Assign simple homework related to the topic.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of vocabulary. Check worksheet completion for understanding.',
      homeworkIdeas: [
        'Complete a related worksheet',
        'Draw and label food and drinks items learned in class'
      ],
      additionalResources: [
        {
          title: 'Food and Drinks Resources',
          url: 'https://esl-kids.com/foodanddrinks'
        }
      ]
    },
    
    // Lesson Plan 2 - Food and Drinks In Practice (45 minutes)
    {
      id: 'book1-unit15-lesson2',
      title: 'Food and Drinks In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand food and drinks vocabulary',
        'Practice using food and drinks in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 15 slides',
        'Interactive food and drinks games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review food and drinks vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to food and drinks. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to food and drinks. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall food and drinks games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about food and drinks today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to food and drinks',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Food and Drinks Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
