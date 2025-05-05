import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit13Resources from './book3-unit13-resources';

/**
 * Book 3 Unit 13 - ANIMAL BODY PARTS
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '13';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'ANIMAL BODY PARTS';

// Export resources getter function
export const getBook3Unit13Resources = (): TeacherResource[] => book3Unit13Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit13LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for animal body parts', 'Describe different animals using correct body part vocabulary', 'Understand the function of different animal body parts'],
      materials: ['Pictures of various animals', 'Animal body parts flashcards', 'Visual English 3 textbook', 'Scissors and glue for craft activity'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of animals and elicit what students know about their body parts.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce key animal body part vocabulary.',
          instructions: [
            'Display flashcards with different animal body parts: beak, trunk, tail, whiskers, etc.',
            'Model pronunciation and have students repeat.',
            'Point to your own body parts when possible to make connections (e.g. "We have arms, elephants have trunks.")'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '8 minutes',
          description: 'Play the Wordwall Animal Body Parts game together.',
          instructions: [
            'Use the class computer/projector to open the Wordwall game.',
            'Have students take turns matching animal body parts with the correct animals.',
            'Review any difficult vocabulary.'
          ]
        },
        {
          title: 'Animal Function Game',
          duration: '10 minutes',
          description: 'Students learn why animals have specific body parts.',
          instructions: [
            'Divide class into small groups.',
            'Each group receives cards with animal body parts and function cards.',
            'Students match body parts to functions (e.g., "Wings - for flying", "Claws - for catching prey").'
          ]
        },
        {
          title: 'Create-an-Animal Activity',
          duration: '7 minutes',
          description: 'Students create their own unique animal with different body parts.',
          instructions: [
            'Provide animal body part cutouts or have students draw.',
            'Students combine different animal parts to create a new creature.',
            'They must name their animal and describe its body parts.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key vocabulary and have students share their creations.'
        }
      ],
      assessmentTips: 'Observe students\' ability to correctly identify and name animal body parts. Check for understanding of body part functions.',
      homeworkIdeas: ['Complete the animal body parts worksheet.', 'Find and cut out pictures of animals from magazines. Label 3 body parts for each animal found.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare animal body parts', 'Use has/have with animal body parts', 'Create descriptions of animals using body part vocabulary'],
      materials: ['ISL Collective video lessons', 'Animal comparison chart', 'Visual English 3 textbook', 'Animal body part puzzle pieces'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of animal body parts vocabulary with flashcards.'
        },
        {
          title: 'ISL Collective Video Lesson',
          duration: '10 minutes',
          description: 'Watch the first ISL Collective video lesson on animal body parts.',
          teacherNotes: 'Pause the video at important points to check understanding and emphasize key vocabulary.'
        },
        {
          title: 'Sentence Building',
          duration: '8 minutes',
          description: 'Practice using "has/have" with animal body parts.',
          instructions: [
            'Model sentences: "The elephant has a trunk. Birds have wings."',
            'Display pictures of animals and have students create sentences.',
            'Write sentences on the board and highlight the verb structure.'
          ]
        },
        {
          title: 'Animal Comparison Activity',
          duration: '10 minutes',
          description: 'Students compare different animals\' body parts.',
          instructions: [
            'Provide a chart with different animals.',
            'Students work in pairs to fill in what body parts each animal has.',
            'Then create comparative sentences: "Elephants have trunks, but giraffes have long necks."'
          ]
        },
        {
          title: 'Who Am I? Game',
          duration: '7 minutes',
          description: 'Students describe animals for others to guess.',
          instructions: [
            'One student chooses an animal card but doesn\'t show others.',
            'The student describes the animal using body part vocabulary: "I have a trunk and big ears..."',
            'Other students guess the animal.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play the second ISL Collective video as reinforcement and review key concepts.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to form sentences with has/have and animal body parts. Check for correct pronunciation of key vocabulary.',
      homeworkIdeas: ['Complete online Wordwall activities on animal body parts.', 'Draw and label your favorite animal with at least 5 body parts.']
    }
  ];
};
