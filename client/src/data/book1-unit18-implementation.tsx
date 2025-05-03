/**
 * Implementation file for Book 1 Unit 18: Leisure Activities
 *
 * This unit focuses on teaching leisure activities vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit18Resources } from './book1-unit18-resources';

// Export a function to get resources for this unit
export const getBook1Unit18Resources = (): TeacherResource[] => {
  return book1Unit18Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit18LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Leisure Activities (45 minutes)
    {
      id: 'book1-unit18-lesson1',
      title: 'Introduction to Leisure Activities - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic leisure activities vocabulary',
        'Identify different leisure activities items',
        'Use simple sentences with leisure activities vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 18 slides',
        'Leisure Activities flashcards',
        'Leisure Activities videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of leisure activities. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Leisure Activities vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to leisure activities.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to leisure activities vocabulary.'
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
        'Draw and label leisure activities items learned in class'
      ],
      additionalResources: [
        {
          title: 'Leisure Activities Resources',
          url: 'https://esl-kids.com/leisureactivities'
        }
      ]
    },
    
    // Lesson Plan 2 - Leisure Activities In Practice (45 minutes)
    {
      id: 'book1-unit18-lesson2',
      title: 'Leisure Activities In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand leisure activities vocabulary',
        'Practice using leisure activities in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 18 slides',
        'Interactive leisure activities games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review leisure activities vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to leisure activities. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to leisure activities. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall leisure activities games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about leisure activities today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to leisure activities',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Leisure Activities Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
