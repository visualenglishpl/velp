// Implementation file for Book 3 Unit 17

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit17Resources } from './book3-unit17-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '17';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit17Resources = (): TeacherResource[] => book3Unit17Resources;

// Generate lesson plans for this unit
export const generateBook3Unit17LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn to use "going to" for future plans', 'Express future intentions', 'Ask and answer questions about future plans'],
      materials: ['Future tense flashcards', 'Planning worksheets', 'Calendar template', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students what they will do after school/on the weekend. Note their responses on the board.'
        },
        {
          title: 'Future Plans Introduction',
          duration: '8 minutes',
          description: 'Introduce the "going to" future structure using simple examples.',
          instructions: [
            'Present the structure "I am going to..." with visual aids.',
            'Show examples like "I am going to play football" while miming the action.'
          ]
        },
        {
          title: 'Grammar Practice',
          duration: '7 minutes',
          description: 'Practice forming "going to" sentences with different subjects.',
          teacherNotes: 'Write examples with different subjects (I am, you are, he/she is, we are, they are) going to...'
        },
        {
          title: 'Future Plans Calendar',
          duration: '10 minutes',
          description: 'Students complete a weekly calendar with activities they are going to do.'
        },
        {
          title: 'Pair Interview',
          duration: '8 minutes',
          description: 'Students interview each other about their future plans using "What are you going to do...?"'
        },
        {
          title: 'Class Survey',
          duration: '5 minutes',
          description: 'Students walk around the classroom asking what others are going to do on the weekend.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Share interesting findings from the class survey. Highlight common future plans.'
        }
      ],
      assessmentTips: 'Monitor for correct formation of "going to" future tense. Check question formation and responses.',
      homeworkIdeas: ['Write 5 sentences about what you and your family are going to do next weekend.', 'Draw and label pictures of 3 activities you are going to do tomorrow.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Distinguish between present and future tenses', 'Make predictions using "going to"', 'Create a future plans presentation'],
      materials: ['Weather flashcards', 'Future prediction cards', 'Art supplies for posters', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review the "going to" future structure with a quick activity.'
        },
        {
          title: 'Weather Predictions',
          duration: '8 minutes',
          description: 'Use weather forecasts to practice "It is going to rain/snow/be sunny" etc.',
          instructions: [
            'Show weather symbols and model predictions.',
            'Students practice making weather predictions using "going to".'
          ]
        },
        {
          title: 'Present vs. Future',
          duration: '7 minutes',
          description: 'Contrast present simple and "going to" future.',
          teacherNotes: 'Show examples like "I play football every Saturday" vs. "I am going to play football tomorrow"'
        },
        {
          title: 'Crystal Ball Activity',
          duration: '8 minutes',
          description: 'Students make predictions about their partners using a pretend crystal ball.',
          instructions: [
            'One student pretends to look into a crystal ball.',
            'They make predictions like "You are going to travel to a new place" or "You are going to make a new friend".'
          ]
        },
        {
          title: 'Future Plans Poster',
          duration: '12 minutes',
          description: 'Students create posters about their future plans for the summer holidays.'
        },
        {
          title: 'Poster Presentations',
          duration: '5 minutes',
          description: 'Students share their future plans posters with the class.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key points about the "going to" future and address any questions.'
        }
      ],
      assessmentTips: 'Evaluate posters for correct usage of "going to" future. Check comprehension during the crystal ball activity.',
      homeworkIdeas: ['Interview a family member about what they are going to do next month and write 5 sentences.', 'Create a comic strip showing your plans for next weekend using "going to".']
    }
  ];
};
