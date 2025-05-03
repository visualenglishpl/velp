/**
 * Implementation file for Book 1 Unit 11: Weather
 *
 * This unit focuses on teaching weather vocabulary and related expressions
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit11Resources } from './book1-unit11-resources';

// Export a function to get resources for this unit
export const getBook1Unit11Resources = (): TeacherResource[] => {
  return book1Unit11Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit11LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Weather (45 minutes)
    {
      id: 'book1-unit11-lesson1',
      title: 'Introduction to Weather - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic weather vocabulary',
        'Identify different weather items',
        'Use simple sentences with weather vocabulary'
      ],
      materials: [
        'Visual English Book 1 - Unit 11 slides',
        'Weather flashcards',
        'Weather videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of weather. Show flashcards one by one and ask students to repeat the vocabulary.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Weather vocabulary video. Pause at different points to reinforce vocabulary. Introduce key expressions related to weather.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice using the vocabulary in simple conversations. Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Students complete a worksheet or game related to weather vocabulary.'
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
        'Draw and label weather items learned in class'
      ],
      additionalResources: [
        {
          title: 'Weather Resources',
          url: 'https://esl-kids.com/weather'
        }
      ]
    },
    
    // Lesson Plan 2 - Weather In Practice (45 minutes)
    {
      id: 'book1-unit11-lesson2',
      title: 'Weather In Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand weather vocabulary',
        'Practice using weather in dialogues',
        'Develop communication skills through themed activities'
      ],
      materials: [
        'Visual English Book 1 - Unit 11 slides',
        'Interactive weather games',
        'Role-play cards',
        'Art supplies for craft activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review weather vocabulary from previous lesson with a quick game.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce new concepts related to weather. Show examples and model language patterns.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students work together on a task related to weather. Each group presents their work to the class.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall weather games for interactive practice. Students take turns playing while others help.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review all vocabulary and concepts learned. Students share one new thing they learned about weather today.'
        }
      ],
      assessmentTips: 'Check student understanding through game participation. Monitor use of language during the group activity.',
      homeworkIdeas: [
        'Create a project related to weather',
        'Practice vocabulary with family members'
      ],
      additionalResources: [
        {
          title: 'Weather Activity Ideas',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    }
  ];
};
