/**
 * Implementation file for Book 1 Unit 17: Transportation
 *
 * This unit focuses on teaching transportation vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit17Resources } from './book1-unit17-resources';

// Export a function to get resources for this unit
export const getBook1Unit17Resources = (): TeacherResource[] => {
  return book1Unit17Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit17LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Transportation (45 minutes)
    {
      id: 'book1-unit17-lesson1',
      title: 'Introduction to Transportation - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic transportation vocabulary',
        'Identify different transportation items',
        'Use simple sentences with transportation vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 17 slides',
        'Transportation flashcards',
        'Transportation videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of transportation. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Transportation vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to transportation.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to transportation vocabulary.'
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
        'Draw and label transportation items learned in class'
      ],
      additionalResources: [
        {
          title: 'Transportation Resources',
          url: 'https://esl-kids.com/transportation'
        }
      ]
    },
    
    // Lesson Plan 2 - Transportation In Practice (45 minutes)
    {
      id: 'book1-unit17-lesson2',
      title: 'Transportation In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand transportation vocabulary',
        'Practice using transportation in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 17 slides',
        'Interactive transportation games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review transportation vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to transportation. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to transportation. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall transportation games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about transportation today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to transportation',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Transportation Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
