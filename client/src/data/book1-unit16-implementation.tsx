/**
 * Implementation file for Book 1 Unit 16: Community Helpers
 *
 * This unit focuses on teaching community helpers vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit16Resources } from './book1-unit16-resources';

// Export a function to get resources for this unit
export const getBook1Unit16Resources = (): TeacherResource[] => {
  return book1Unit16Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit16LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Community Helpers (45 minutes)
    {
      id: 'book1-unit16-lesson1',
      title: 'Introduction to Community Helpers - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic community helpers vocabulary',
        'Identify different community helpers items',
        'Use simple sentences with community helpers vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 16 slides',
        'Community Helpers flashcards',
        'Community Helpers videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of community helpers. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Community Helpers vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to community helpers.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to community helpers vocabulary.'
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
        'Draw and label community helpers items learned in class'
      ],
      additionalResources: [
        {
          title: 'Community Helpers Resources',
          url: 'https://esl-kids.com/communityhelpers'
        }
      ]
    },
    
    // Lesson Plan 2 - Community Helpers In Practice (45 minutes)
    {
      id: 'book1-unit16-lesson2',
      title: 'Community Helpers In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand community helpers vocabulary',
        'Practice using community helpers in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 16 slides',
        'Interactive community helpers games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review community helpers vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to community helpers. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to community helpers. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall community helpers games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about community helpers today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to community helpers',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Community Helpers Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
