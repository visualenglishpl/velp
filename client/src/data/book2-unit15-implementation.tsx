// Implementation file for Book 2 Unit 15

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit15Resources } from './book2-unit15-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '15';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit15Resources = (): TeacherResource[] => book2Unit15Resources;

// Generate lesson plans for this unit
export const generateUnit15LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Name farm animals and their sounds', 'Use present simple to describe animals', 'Ask and answer questions about farm animals'],
      materials: ['Farm animal flashcards', 'Farm scene poster', 'Animal sound recordings'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play animal sounds and have students guess which animal makes each sound.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce farm animals vocabulary using flashcards.',
          instructions: [
            'Show each animal card and practice pronunciation.',
            'For each animal, teach both the noun (cow, pig) and the sound it makes (moo, oink).'
          ]
        },
        {
          title: 'Question Practice',
          duration: '5 minutes',
          description: 'Model questions about farm animals: "What is this?" "It is a cow." "What does it say?" "It says moo."'
        },
        {
          title: 'Farm Charades',
          duration: '10 minutes',
          description: 'Students take turns acting like different farm animals while others guess.',
          teacherNotes: 'Encourage students to use full sentences: "I think it is a chicken."'
        },
        {
          title: 'Farm Scene Activity',
          duration: '10 minutes',
          description: 'Using a farm poster, ask students to identify animals and their locations.',
          instructions: [
            'Point to different animals and ask "What is this?"',
            'Ask "Where is the [animal]?" to practice prepositions (in the barn, under the tree, etc.)'
          ]
        },
        {
          title: 'Farm Song',
          duration: '5 minutes',
          description: 'Teach students a simple song about farm animals and their sounds.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review the vocabulary with a quick game of "I spy a..." focused on farm animals.'
        }
      ],
      assessmentTips: 'Monitor students during activities for correct pronunciation and use of vocabulary.',
      homeworkIdeas: ['Students can draw their favorite farm animal and write three facts about it.']
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare different farm animals', 'Use descriptive adjectives for animals', 'Create a simple farm story'],
      materials: ['Animal comparison worksheets', 'Farm animal pictures', 'Story template handouts'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play a quick review game where students name as many farm animals as they can remember.'
        },
        {
          title: 'Animal Description',
          duration: '10 minutes',
          description: 'Teach adjectives for describing animals (big, small, fast, slow, etc.).',
          instructions: [
            'Show pictures of farm animals and model descriptions.',
            'Practice sentences like "The cow is big. The chick is small."'
          ]
        },
        {
          title: 'Comparison Activity',
          duration: '10 minutes',
          description: 'Students compare different animals using comparative forms.',
          instructions: [
            'Model sentences: "The horse is bigger than the sheep."',
            'Have students work in pairs to create comparison sentences.'
          ]
        },
        {
          title: 'Farm Animal Roles',
          duration: '5 minutes',
          description: 'Discuss what each animal does on a farm (cows give milk, chickens lay eggs, etc.).'
        },
        {
          title: 'Story Creation',
          duration: '10 minutes',
          description: 'In small groups, students create a simple story about animals on a farm using the vocabulary learned.',
          materials: ['Story template worksheets']
        },
        {
          title: 'Story Sharing',
          duration: '5 minutes',
          description: 'Groups share their stories with the class.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Class discusses what they have learned about farm animals.'
        }
      ],
      assessmentTips: 'Evaluate students\'s use of descriptive language and animal vocabulary in their stories.',
      homeworkIdeas: ['Students can research and write about an unusual farm animal not covered in class.']
    }
  ];
};
