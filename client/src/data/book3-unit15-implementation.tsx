import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit15Resources from './book3-unit15-resources';

/**
 * Book 3 Unit 15 - BUGS
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '15';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'BUGS';

// Export resources getter function
export const getBook3Unit15Resources = (): TeacherResource[] => book3Unit15Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit15LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for different bugs/insects', 'Identify and name common insects', 'Use basic descriptive language for bugs'],
      materials: ['Bug/insect flashcards', 'Visual English 3 textbook', 'Insect stickers or cutouts', 'Colored pencils/markers'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of different bugs and elicit what students know.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach key bug/insect vocabulary.',
          instructions: [
            'Present flashcards with different bugs: ant, bee, butterfly, ladybug, etc.',
            'Model pronunciation and have students repeat.',
            'Discuss basic features (wings, legs, antennae).'
          ]
        },
        {
          title: 'Video: What Do You See (Insects)',
          duration: '8 minutes',
          description: 'Watch the first "What Do You See (Insects)" video.',
          instructions: [
            'Play the video once through.',
            'Play again, pausing to review vocabulary.',
            'Encourage students to sing along with the song.'
          ],
          teacherNotes: 'The song has a simple pattern that students can easily follow. Use gestures to help reinforce vocabulary.'
        },
        {
          title: 'Bug Sorting Activity',
          duration: '10 minutes',
          description: 'Students categorize insects based on features.',
          instructions: [
            'Divide class into small groups.',
            'Give each group a set of insect pictures.',
            'Students sort them by features: insects with wings, insects with six legs, etc.',
            'Groups share their sorting criteria with the class.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '7 minutes',
          description: 'Play one of the Wordwall Bugs games together.',
          teacherNotes: 'Use the classroom projector to play as a whole class activity or allow students to play in pairs if devices are available.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key vocabulary with a quick memory game.'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name common insects. Observe their use of descriptive language for bugs.',
      homeworkIdeas: ['Draw and label your favorite insect.', 'Complete the insect matching worksheet.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Understand basic insect life cycles', 'Compare different insects', 'Create a bug-themed craft project'],
      materials: ['Life cycle diagrams (butterfly, ladybug)', 'Visual English 3 textbook', 'Construction paper, pipe cleaners, googly eyes for craft', 'Video: Caterpillar Shoes'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of bug vocabulary with flashcards.'
        },
        {
          title: 'Life Cycle Introduction',
          duration: '10 minutes',
          description: 'Teach about insect life cycles, focusing on butterflies.',
          instructions: [
            'Show images of butterfly life cycle stages: egg, caterpillar, chrysalis, butterfly.',
            'Teach vocabulary for each stage.',
            'Compare with one other insect life cycle (e.g., ladybug).'
          ]
        },
        {
          title: 'Video: Caterpillar Shoes',
          duration: '8 minutes',
          description: 'Watch the "Caterpillar Shoes" story video.',
          teacherNotes: 'This is a good opportunity to reinforce both insect vocabulary and life cycle concepts.'
        },
        {
          title: 'Bug Description Game',
          duration: '7 minutes',
          description: 'Practice describing insects.',
          instructions: [
            'Show pictures of insects one at a time.',
            'Students must describe each using at least 2-3 features.',
            'Example: "It has six legs. It has black and yellow stripes. It can fly. What is it?"'
          ]
        },
        {
          title: 'Bug Craft',
          duration: '10 minutes',
          description: 'Students create an insect craft.',
          instructions: [
            'Provide materials for students to create their own bug/insect.',
            'Encourage them to include the correct features (number of legs, wings, antennae).',
            'Students should be able to name the parts of their insect in English.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students present their bug crafts, describing the features using target vocabulary.'
        }
      ],
      assessmentTips: 'Evaluate students\' understanding of insect characteristics and life cycles through their craft projects and descriptions.',
      homeworkIdeas: ['Complete online Wordwall activities about bugs.', 'Record observations of bugs seen in your garden/park over the weekend (draw, name, and describe).'] 
    }
  ];
};
