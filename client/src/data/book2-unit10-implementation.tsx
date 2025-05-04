/**
 * Visual English Book 2, Unit 10: MONTHS AND SEASONS
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit10Resources } from './book2-unit10-resources';

// Function to get resources for this unit
export function getBook2Unit10Resources(): TeacherResource[] {
  return book2Unit10Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit10LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit10-lesson1',
      title: 'Months and Seasons - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for the 12 months of the year',
        'Students will practice pronouncing months in the correct order',
        'Students will identify months associated with each season'
      ],
      materials: [
        'Visual English Book 2 Unit 10 slides',
        'Months of the Year song videos',
        'Calendar with months labeled',
        'Month flashcards',
        'Wordwall games about months'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students a calendar and introduce the concept of months. Ask students if they know any month names in English.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present each month with flashcards showing the written month and an image representing that month (e.g., January with snow, July with beach). Practice pronunciation with the whole class.'
        },
        {
          title: 'Months Song',
          duration: '8 minutes',
          description: 'Play "The Months of the Year Song" video. First, have students listen, then play it again and encourage them to sing along.'
        },
        {
          title: 'Sequencing Activity',
          duration: '10 minutes',
          description: 'Divide students into small groups and give each group a set of month cards. Have them arrange the months in the correct order as quickly as possible. Check their arrangements.'
        },
        {
          title: 'Months and Seasons',
          duration: '10 minutes',
          description: 'Introduce the four seasons and which months belong to each season. Create a table on the board with four columns for the seasons and have students help you place each month in the correct season.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "Months and Seasons" Wordwall game as a class activity to reinforce the connection between months and their seasons.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of month names and observe students\' ability to sequence months in the correct order.',
      homeworkIdeas: [
        'Create a simple calendar page for your birth month',
        'Write three sentences about activities you do in different seasons'
      ]
    },
    {
      id: 'book2-unit10-lesson2',
      title: 'Months and Seasons - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will practice using months in context',
        'Students will learn to ask and answer "When is your birthday?"',
        'Students will create a classroom birthday calendar'
      ],
      materials: [
        'Visual English Book 2 Unit 10 slides',
        'Planet Pop months song video',
        'Large calendar for classroom display',
        'Birthday cake pictures/flashcards',
        'Months vocabulary games'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of months vocabulary using month flashcards or by singing the months song again.'
        },
        {
          title: 'Birthday Vocabulary',
          duration: '8 minutes',
          description: 'Teach the question "When is your birthday?" and the response structure "My birthday is in [month]." Model with several examples using pictures of birthday celebrations.'
        },
        {
          title: 'Planet Pop Song',
          duration: '7 minutes',
          description: 'Play the "Months of the Year ESL Song" by Planet Pop. Have students listen first, then sing along focusing on correct pronunciation.'
        },
        {
          title: 'Birthday Interviews',
          duration: '10 minutes',
          description: 'Have students walk around the classroom asking classmates "When is your birthday?" Each student should collect at least 5 classmates\' birthday months.'
        },
        {
          title: 'Class Birthday Calendar',
          duration: '10 minutes',
          description: 'Create a class birthday calendar by having each student add their name to the appropriate month on a large calendar displayed in the classroom.'
        },
        {
          title: 'Months Quiz Game',
          duration: '8 minutes',
          description: 'Play the "Months Quiz" Wordwall game to assess and reinforce students\' knowledge of months vocabulary and sequence.'
        }
      ],
      assessmentTips: 'Observe students\' ability to ask and respond to the birthday question correctly. Check for proper pronunciation and accurate use of months vocabulary.',
      homeworkIdeas: [
        "Write down family members' birthdays using the structure 'My [family member]\'s birthday is in [month]'",
        'Complete a months of the year worksheet'
      ],
      additionalResources: [
        {
          title: "Months of the Year Game",
          url: 'https://www.turtlediary.com/game/months-of-the-year.html'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit10Resources,
  generateUnit10LessonPlans
};