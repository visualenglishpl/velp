/**
 * Implementation file for Book 1 Unit 12: Clothing
 *
 * This unit focuses on teaching clothing vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit12Resources } from './book1-unit12-resources';

// Export a function to get resources for this unit
export const getBook1Unit12Resources = (): TeacherResource[] => {
  return book1Unit12Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit12LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Clothing (45 minutes)
    {
      id: 'book1-unit12-lesson1',
      title: 'Introduction to Clothing - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic clothing vocabulary',
        'Identify different clothing items',
        'Use simple sentences with clothing vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 12 slides',
        'Clothing flashcards',
        'Clothing videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of clothing. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Clothing vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to clothing.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to clothing vocabulary.'
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
        'Draw and label clothing items learned in class'
      ],
      additionalResources: [
        {
          title: 'Clothing Resources',
          url: 'https://esl-kids.com/clothing'
        }
      ]
    },
    
    // Lesson Plan 2 - Clothing In Practice (45 minutes)
    {
      id: 'book1-unit12-lesson2',
      title: 'Clothing In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand clothing vocabulary',
        'Practice using clothing in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 12 slides',
        'Interactive clothing games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review clothing vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to clothing. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to clothing. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall clothing games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about clothing today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to clothing',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Clothing Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
