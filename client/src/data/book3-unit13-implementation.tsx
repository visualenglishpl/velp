import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit13Resources from './book3-unit13-resources';

/**
 * Book 3 Unit 13 - ANIMAL BODY PARTS
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '13';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'ANIMAL BODY PARTS';

// Export resources getter function
export const getBook3Unit13Resources = (): TeacherResource[] => {
  return book3Unit13Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit13-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '13',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
};

// Generate specific lesson plans for this unit
export const generateBook3Unit13LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for animal body parts', 'Identify and name parts of animals', 'Compare animal body parts with human body parts'],
      materials: ['Flashcards with animal pictures', 'Visual English 3 textbook', 'Animal body parts worksheet', 'Pictures of different animals'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review human body parts vocabulary.',
          instructions: [
            'Point to different parts of your body and have students name them.',
            'Ask students if they can name any animal body parts.'
          ]
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach vocabulary for animal body parts.',
          instructions: [
            'Present flashcards with animal body parts: tail, wing, beak, paw, claw, whiskers, etc.',
            'Model pronunciation and have students repeat.',
            'Show pictures of different animals and identify their body parts.',
            'Write new vocabulary on the board.'
          ]
        },
        {
          title: 'Compare and Contrast',
          duration: '8 minutes',
          description: 'Compare human body parts with animal body parts.',
          instructions: [
            'Ask students: "Do humans have tails? Do birds have arms?"',
            'Create a simple chart on the board comparing humans, birds, and cats.',
            'Fill in the chart with students\'input.',
            'Teach phrases: "Birds have wings. Cats have whiskers."'
          ],
          teacherNotes: 'Emphasize the use of "have" when describing body parts.'
        },
        {
          title: 'Animal Body Parts Game',
          duration: '10 minutes',
          description: 'Play the Wordwall game as a class activity.',
          instructions: [
            'Display the Wordwall Animal Body Parts game on the board.',
            'Divide class into teams.',
            'Teams take turns matching animal body parts to pictures.',
            'Award points for correct answers.'
          ]
        },
        {
          title: 'Animal Drawing Activity',
          duration: '8 minutes',
          description: 'Students practice identifying and labeling animal body parts.',
          instructions: [
            'Give students worksheets with animal outlines.',
            'Students label the body parts of the animals.',
            'Check answers as a class.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '4 minutes',
          description: 'Review vocabulary with quick flashcard drill.',
          instructions: [
            'Show flashcards of animal body parts quickly.',
            'Students call out the correct vocabulary word.'
          ]
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name animal body parts. Listen for proper sentence structure when describing animals using "have."',
      homeworkIdeas: ['Complete the animal body parts labeling worksheet.', 'Draw a made-up animal and label its body parts.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Describe animal features and capabilities', 'Use verbs to talk about what animals can do', 'Compare different animals'],
      materials: ['Visual English 3 textbook', 'Animal movement pictures', 'Colored paper for crafts', 'Scissors and glue'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of animal body parts vocabulary.',
          instructions: [
            'Show pictures of animals with visible body parts.',
            'Students call out the body parts they can identify.',
            'Write key vocabulary on the board for reference during the lesson.'
          ]
        },
        {
          title: 'Animal Actions',
          duration: '10 minutes',
          description: 'Teach verbs associated with animal body parts.',
          instructions: [
            'Introduce action verbs: fly (wings), swim (fins), climb (claws), etc.',
            'Use pictures and gestures to demonstrate meaning.',
            'Practice the structure: "Birds can fly with their wings."',
            'Have students create sentences about what animals can do.'
          ]
        },
        {
          title: 'Advanced Wordwall Game',
          duration: '8 minutes',
          description: 'Play the Wordwall Animal Body Parts Landscapes game.',
          instructions: [
            'This game focuses on animal habitat connections.',
            'Play as a whole class, discussing answers together.'
          ],
          teacherNotes: 'Make connections between animal body parts and their habitats (e.g., fins for water, wings for air).'
        },
        {
          title: 'ISL Video Lesson',
          duration: '10 minutes',
          description: 'Watch the ISL Collective video lesson about animal body parts.',
          instructions: [
            'Play the video, pausing at key moments.',
            'Ask comprehension questions during pauses.',
            'Have students repeat key phrases.'
          ]
        },
        {
          title: 'Animal Craft Activity',
          duration: '8 minutes',
          description: 'Create paper animals with movable body parts.',
          instructions: [
            'Provide templates for simple animal shapes.',
            'Students cut out animals and add movable parts with paper fasteners.',
            'While creating, students must name each body part they add.',
            'Students present their animals to a partner, describing the body parts.'
          ]
        },
        {
          title: 'Wrap-up: Animal Body Parts Song',
          duration: '4 minutes',
          description: 'Teach a simple song or chant about animal body parts.',
          instructions: [
            'Create a simple chant like: "Wings to fly, tails to swim, paws to walk, beaks to eat."',
            'Have students perform actions while singing.'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to connect animal body parts with their functions. Check their use of "can" with action verbs.',
      homeworkIdeas: ['Complete the online Wordwall activities about animal body parts.', 'Find pictures of three unusual animals and write sentences about their body parts and what they can do.']
    }
  ];
};
