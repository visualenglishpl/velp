import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit15Resources from './book3-unit15-resources';

/**
 * Book 3 Unit 15 - BUGS
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '15';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'BUGS';

// Export resources getter function
export const getBook3Unit15Resources = (): TeacherResource[] => {
  return book3Unit15Resources;
};

// Generate specific lesson plans for this unit
export const generateBook3Unit15LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for common bugs/insects', 'Identify different bugs by their characteristics', 'Use descriptive language to talk about insects'],
      materials: ['Visual English 3 textbook', 'Bug/insect picture cards', 'Insect fact cards', 'Drawing paper and colored pencils'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to bugs vocabulary with pictures.',
          instructions: [
            'Show flashcards of different bugs/insects.',
            'Ask students to name any bugs they know in English.',
            'Introduce key vocabulary: ant, bee, butterfly, ladybug, spider, fly, mosquito, etc.'
          ]
        },
        {
          title: 'Vocabulary Development',
          duration: '10 minutes',
          description: 'Teach and practice insect vocabulary.',
          instructions: [
            'Present each insect card with its name.',
            'Practice pronunciation as a class.',
            'Ask simple questions: "Is a butterfly big or small? What color is it?"',
            'Have students repeat sentences: "The butterfly is colorful."'
          ]
        },
        {
          title: '"What Do You See" Video',
          duration: '8 minutes',
          description: 'Watch the insect video and practice identification.',
          instructions: [
            'Play the "What Do You See (Insects)" video.',
            'Pause after each insect is shown and have students identify it.',
            'Practice the phrase: "I see a _____."',
            'Ask follow-up questions about each insect.'
          ],
          teacherNotes: 'Encourage students to use full sentences when responding.'
        },
        {
          title: 'Insect Description Game',
          duration: '10 minutes',
          description: 'Students practice describing insects.',
          instructions: [
            'Divide students into pairs.',
            'Give each pair a set of insect cards face down.',
            'Student A picks a card without showing it and describes the insect.',
            'Student B guesses which insect it is.',
            'Students switch roles and continue.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '8 minutes',
          description: 'Play the Wordwall BUGS game as a class.',
          instructions: [
            'Display the Wordwall BUGS game on the board.',
            'Have students take turns matching insects to their names or descriptions.',
            'Award points for correct matches.'
          ]
        },
        {
          title: 'Wrap-up Activity',
          duration: '4 minutes',
          description: 'Review vocabulary through a quick drawing activity.',
          instructions: [
            'Call out an insect name.',
            'Students quickly draw it on their paper.',
            'Show drawings and name the insects together.'
          ]
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name common bugs. Listen for proper pronunciation and sentence structure when describing insects.',
      homeworkIdeas: ['Draw and label your favorite insect.', 'Find pictures of three insects in magazines or online and write their names.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn about insect body parts', 'Describe insects using simple sentences', 'Compare different insects'],
      materials: ['Visual English 3 textbook', 'Insect diagrams', 'Craft materials (pipe cleaners, paper, etc.)', 'Caterpillar Shoes story video'],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of insect vocabulary from previous lesson.',
          instructions: [
            'Show flashcards of insects from the previous lesson.',
            'Students call out the names quickly.',
            'Ask: "Who remembers what a butterfly looks like?"'
          ]
        },
        {
          title: 'Insect Body Parts',
          duration: '10 minutes',
          description: 'Teach vocabulary for insect body parts.',
          instructions: [
            'Show diagrams of insects with labeled parts.',
            'Introduce vocabulary: head, thorax, abdomen, wings, legs, antennae.',
            'Have students point to each part as you name it.',
            'Practice simple sentences: "A butterfly has two antennae. A spider has eight legs."'
          ]
        },
        {
          title: 'Caterpillar Shoes Story',
          duration: '8 minutes',
          description: 'Watch the Caterpillar Shoes story video.',
          instructions: [
            'Play the video, pausing occasionally to ask comprehension questions.',
            'Ask about the different insects in the story.',
            'Discuss how many legs each insect has.'
          ]
        },
        {
          title: 'Compare Insects Activity',
          duration: '10 minutes',
          description: 'Students practice comparing different insects.',
          instructions: [
            'Display pictures of two different insects side by side.',
            'Guide students to compare them: "The butterfly has wings, but the ant doesn\'t."',
            'Have students work in pairs to compare two other insects.',
            'Share comparisons with the class.'
          ],
          teacherNotes: 'Focus on the structures: "has/have" and "can/can\'t"'
        },
        {
          title: 'Bug Craft Activity',
          duration: '8 minutes',
          description: 'Create simple bug crafts while practicing vocabulary.',
          instructions: [
            'Provide materials for students to create an insect of their choice.',
            'As they work, ask them to name the parts they are adding.',
            'Have students present their bugs: "This is my butterfly. It has two antennae and four wings."'
          ]
        },
        {
          title: 'Closing Game',
          duration: '4 minutes',
          description: 'Play Wordwall BUGS (2) or (3) game to reinforce learning.',
          instructions: [
            'Use one of the remaining Wordwall games not played in the first lesson.',
            'Play as a whole class, with students taking turns.'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to name and identify insect body parts. Check their use of "has/have" when describing insects.',
      homeworkIdeas: ['Complete one of the Wordwall activities online.', 'Make a fact sheet about your favorite insect with at least three facts.']
    }
  ];
};
