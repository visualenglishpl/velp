/**
 * Implementation file for Book 1 Unit 10: House and Home
 *
 * This unit focuses on teaching house and home vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit10Resources } from './book1-unit10-resources';

// Export a function to get resources for this unit
export const getBook1Unit10Resources = (): TeacherResource[] => {
  return book1Unit10Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit10LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to House and Home (45 minutes)
    {
      id: 'book1-unit10-lesson1',
      title: 'Introduction to House and Home - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic house and home vocabulary',
        'Identify different house and home items',
        'Use simple sentences with house and home vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 10 slides',
        'House and Home flashcards',
        'House and Home videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of house and home. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the House and Home vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to house and home.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to house and home vocabulary.'
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
        'Draw and label house and home items learned in class'
      ],
      additionalResources: [
        {
          title: 'House and Home Resources',
          url: 'https://esl-kids.com/houseandhome'
        }
      ]
    },
    
    // Lesson Plan 2 - House and Home In Practice (45 minutes)
    {
      id: 'book1-unit10-lesson2',
      title: 'House and Home In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand house and home vocabulary',
        'Practice using house and home in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 10 slides',
        'Interactive house and home games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review house and home vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to house and home. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to house and home. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall house and home games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about house and home today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to house and home',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'House and Home Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
