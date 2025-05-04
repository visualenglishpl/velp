/**
 * Visual English Book 2, Unit 1: DAYS OF THE WEEK
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit1Resources } from './book2-resources';

// Function to get resources for this unit
export function getBook2Unit1Resources(): TeacherResource[] {
  return book2Unit1Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit1LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit1-lesson1',
      title: 'Days of the Week - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn the names of the days of the week',
        'Students will be able to recite the days of the week in order',
        'Students will ask and answer questions about days of the week'
      ],
      materials: [
        'Visual English Book 2 Unit 1 slides',
        'Days of the week flashcards',
        'Song: Days of the Week (Dream English Kids)',
        'Worksheets with days of the week'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin class by greeting students and asking what day it is today. Write the current day on the board.'
        },
        {
          title: 'Introducing the Days',
          duration: '10 minutes',
          description: 'Show flashcards with days of the week. Pronounce each day clearly and have students repeat.'
        },
        {
          title: 'Days of the Week Song',
          duration: '8 minutes',
          description: 'Play the "Days of the Week" song. First, have students listen, then encourage them to sing along.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 1 slides showing different days of the week with related activities.'
        },
        {
          title: 'Question and Answer Practice',
          duration: '10 minutes',
          description: 'Model the question "What day is it today?" and answer "It\'s Monday." Have students practice in pairs asking about different days.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Review the days of the week by having students tell you one thing they typically do on each day.'
        }
      ],
      assessmentTips: 'Observe students\'s participation in singing and pair activities. Check worksheet completion.',
      homeworkIdeas: [
        'Complete a days of the week worksheet',
        'Draw a weekly calendar with an activity for each day'
      ]
    },
    {
      id: 'book2-unit1-lesson2',
      title: 'Days of the Week - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will practice using days of the week in context',
        'Students will talk about their weekly routines',
        'Students will develop reading and writing skills with days of the week'
      ],
      materials: [
        'Visual English Book 2 Unit 1 slides',
        'Weekly schedule template',
        'Online games from Unit 1 resources',
        'Colored markers/pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Quick review of days of the week with the song from previous lesson. Ask students to recall what day comes after/before specific days.'
        },
        {
          title: 'My Weekly Schedule',
          duration: '12 minutes',
          description: 'Distribute weekly schedule templates. Model how to fill it in with daily activities. "On Monday, I go to school. On Tuesday, I play football."'
        },
        {
          title: 'Interview a Partner',
          duration: '10 minutes',
          description: 'Students work in pairs to ask each other "What do you do on (day)?" and note responses.'
        },
        {
          title: 'Interactive Game',
          duration: '12 minutes',
          description: 'Use one of the Wordwall games from the Unit 1 resources to reinforce learning in a fun way.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Students share one interesting thing they learned about their partner\'s weekly routine.'
        }
      ],
      assessmentTips: 'Check completed weekly schedules and listen to pair discussions to assess vocabulary use and comprehension.',
      homeworkIdeas: [
        'Write 5 sentences about your weekly routine using days of the week',
        'Create a personal schedule for the upcoming week'
      ],
      additionalResources: [
        {
          title: 'Days of the Week Song - Dream English Kids',
          url: 'https://www.youtube.com/watch?v=3tx0rvuXIRg'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit1Resources,
  generateUnit1LessonPlans
};
