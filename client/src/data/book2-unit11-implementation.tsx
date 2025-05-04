// Implementation file for Book 2 Unit 11

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit11Resources } from './book2-unit11-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '11';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit11Resources = (): TeacherResource[] => book2Unit11Resources;

// Generate lesson plans for this unit
export const generateUnit11LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Identify rooms in a house', 'Name common household items', 'Use prepositions to describe locations'],
      materials: ['Flashcards of rooms and furniture', 'House poster or diagram', 'Mini furniture items (optional)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play "Simon Says" with house-related actions (e.g., "Simon says sit on the chair", "Simon says open the door").'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce vocabulary for different rooms using flashcards. Show the house poster and have students identify each room.',
          instructions: [
            'Show flashcards one by one and have students repeat the names.',
            'Point to rooms on the house poster and ask "What room is this?"'
          ]
        },
        {
          title: 'Item Introduction',
          duration: '10 minutes',
          description: 'Introduce furniture and household items for each room. Practice saying "This is a ___" with each item.',
          materials: ['Furniture flashcards']
        },
        {
          title: 'Memory Game',
          duration: '5 minutes',
          description: 'Play a memory game where students must remember what items are in each room.'
        },
        {
          title: 'Pair Practice',
          duration: '10 minutes',
          description: 'In pairs, students take turns asking "Where is the ___?" and the partner responds with "It\'s in the ___" using prepositions of place.'
        },
        {
          title: 'Drawing Activity',
          duration: '10 minutes',
          description: 'Students draw their own house or room and then describe it to the class using the new vocabulary.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the vocabulary with a quick game where you say an item and students must say which room it belongs in.'
        }
      ],
      assessmentTips: 'Monitor students during pair work and presentation activities for correct use of vocabulary and prepositions.',
      homeworkIdeas: ['Home assignment: Students label rooms and items in their own home using sticky notes (with parental permission).']
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Ask and answer questions about locations in a house', 'Describe a room in detail', 'Use adjectives to describe household items'],
      materials: ['Pictures of different styles of rooms', 'Worksheet with house layout', 'Small objects to place on a house map'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of unusual or luxurious rooms and have students identify items and say what they like.'
        },
        {
          title: 'Vocabulary Review',
          duration: '5 minutes',
          description: 'Review room and furniture vocabulary from the previous lesson.'
        },
        {
          title: 'Adjective Introduction',
          duration: '10 minutes',
          description: 'Introduce adjectives to describe rooms and items (big, small, clean, messy, etc.). Model describing a room using full sentences and adjectives.',
          instructions: [
            'Present adjective flashcards and have students repeat.',
            'Model sentences: "This is a big bedroom. The bed is comfortable."'
          ]
        },
        {
          title: 'Adjective Practice',
          duration: '5 minutes',
          description: 'Have students add adjectives to previously learned nouns.'
        },
        {
          title: 'Barrier Game',
          duration: '10 minutes',
          description: 'Play a barrier game where students place objects in their house layout and describe the location to a partner who must replicate it.',
          materials: ['House layout worksheets', 'Small paper furniture pieces']
        },
        {
          title: 'Dream House Design',
          duration: '10 minutes',
          description: 'In small groups, students design their dream house, labeling each room and describing special features.'
        },
        {
          title: 'Presentations',
          duration: '5 minutes',
          description: 'Each group presents their dream house design to the class.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key vocabulary and structures from the lesson.'
        }
      ],
      assessmentTips: 'Check worksheet accuracy and listen for proper use of prepositions and adjectives during presentations.',
      homeworkIdeas: ['Students can create a video tour of their home (with permission) using the vocabulary learned.']
    }
  ];
};
