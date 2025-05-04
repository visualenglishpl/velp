// Implementation file for Book 2 Unit 16

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit16Resources } from './book2-unit16-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '16';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit16Resources = (): TeacherResource[] => book2Unit16Resources;

// Generate lesson plans for this unit
export const generateUnit16LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Identify different types of transportation', 'Use appropriate vocabulary to name vehicles', 'Ask and answer questions about transportation'],
      materials: ['Transportation flashcards', 'Toy vehicles (optional)', 'Transport sorting worksheet'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play transportation sounds and have students guess which vehicle makes each sound.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce different types of transportation using flashcards.',
          instructions: [
            'Show each transport card and practice pronunciation.',
            'Group vehicles by type: land, water, and air transportation.'
          ]
        },
        {
          title: 'Question Practice',
          duration: '5 minutes',
          description: 'Model questions about transportation: "What is this?" "It is a bus." "How do you go to school?" "I go to school by bus."'
        },
        {
          title: 'Sorting Activity',
          duration: '10 minutes',
          description: 'Students sort different vehicles into categories (land, water, air).',
          teacherNotes: 'Use worksheets or a chart on the board for sorting.'
        },
        {
          title: 'Transportation Mime',
          duration: '5 minutes',
          description: 'Students take turns acting out different modes of transportation for others to guess.'
        },
        {
          title: 'Transport Song',
          duration: '5 minutes',
          description: 'Teach students the "We All Go Traveling By" song or another transportation-themed song.'
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play a quick matching game with transportation pictures and words.'
        }
      ],
      assessmentTips: 'Monitor students during activities for correct pronunciation and use of vocabulary.',
      homeworkIdeas: ['Students draw their favorite mode of transportation and write 3 sentences about it.']
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare different modes of transportation', 'Use prepositions with transportation vocabulary', 'Plan a journey using multiple forms of transport'],
      materials: ['City/journey map', 'Transportation flashcards', 'Journey planning worksheet'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review transportation vocabulary with a quick game of "I spy something that..."'
        },
        {
          title: 'Preposition Practice',
          duration: '10 minutes',
          description: 'Teach prepositions used with transportation: by bus, on a train, in a car, etc.',
          instructions: [
            'Show pictures of people using different transport.',
            'Practice sentences like "He goes to work by bus. She travels on a train."'
          ]
        },
        {
          title: 'Journey Planning',
          duration: '10 minutes',
          description: 'Using a simple map, students plan a journey that uses multiple forms of transportation.',
          instructions: [
            'Model a journey first: "I go from home to the park by bike, then I take a bus to the museum."',
            'Have students work in pairs to create their own journeys.'
          ]
        },
        {
          title: 'Journey Presentations',
          duration: '10 minutes',
          description: 'Students present their journeys to the class using transportation vocabulary and prepositions.'
        },
        {
          title: 'Transport Comparison',
          duration: '5 minutes',
          description: 'Discuss which transportation is fastest, slowest, biggest, smallest, etc.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Class discussion about students\' favorite ways to travel and why.'
        }
      ],
      assessmentTips: 'Evaluate students\' use of prepositions and transportation vocabulary in their journey presentations.',
      homeworkIdeas: ['Students can create a poster about an unusual form of transportation not covered in class.']
    }
  ];
};
