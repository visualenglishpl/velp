/**
 * Implementation file for Book 1 Unit 14: Animals
 *
 * This unit focuses on teaching animals vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit14Resources } from './book1-unit14-resources';

// Export a function to get resources for this unit
export const getBook1Unit14Resources = (): TeacherResource[] => {
  return book1Unit14Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit14LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Animals (45 minutes)
    {
      id: 'book1-unit14-lesson1',
      title: 'Introduction to Animals - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic animals vocabulary',
        'Identify different animals items',
        'Use simple sentences with animals vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 14 slides',
        'Animals flashcards',
        'Animals videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of animals. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Animals vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to animals.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to animals vocabulary.'
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
        'Draw and label animals items learned in class'
      ],
      additionalResources: [
        {
          title: 'Animals Resources',
          url: 'https://esl-kids.com/animals'
        }
      ]
    },
    
    // Lesson Plan 2 - Animals In Practice (45 minutes)
    {
      id: 'book1-unit14-lesson2',
      title: 'Animals In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand animals vocabulary',
        'Practice using animals in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 14 slides',
        'Interactive animals games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review animals vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to animals. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to animals. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall animals games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about animals today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to animals',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Animals Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
