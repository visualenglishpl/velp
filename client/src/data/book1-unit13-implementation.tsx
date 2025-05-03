/**
 * Implementation file for Book 1 Unit 13: Body Parts
 *
 * This unit focuses on teaching body parts vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit13Resources } from './book1-unit13-resources';

// Export a function to get resources for this unit
export const getBook1Unit13Resources = (): TeacherResource[] => {
  return book1Unit13Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit13LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Body Parts (45 minutes)
    {
      id: 'book1-unit13-lesson1',
      title: 'Introduction to Body Parts - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic body parts vocabulary',
        'Identify different body parts items',
        'Use simple sentences with body parts vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 13 slides',
        'Body Parts flashcards',
        'Body Parts videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of body parts. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Body Parts vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to body parts.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to body parts vocabulary.'
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
        'Draw and label body parts items learned in class'
      ],
      additionalResources: [
        {
          title: 'Body Parts Resources',
          url: 'https://esl-kids.com/bodyparts'
        }
      ]
    },
    
    // Lesson Plan 2 - Body Parts In Practice (45 minutes)
    {
      id: 'book1-unit13-lesson2',
      title: 'Body Parts In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand body parts vocabulary',
        'Practice using body parts in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 13 slides',
        'Interactive body parts games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review body parts vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to body parts. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to body parts. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall body parts games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about body parts today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to body parts',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Body Parts Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
