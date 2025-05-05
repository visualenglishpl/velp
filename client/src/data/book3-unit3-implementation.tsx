// Implementation file for Book 3 Unit 3

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit3Resources } from './book3-unit3-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '3';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit3Resources = (): TeacherResource[] => book3Unit3Resources;

// Generate lesson plans for this unit
export const generateUnit3LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to fairy tales', 'Identify fairy tale characters and settings', 'Practice storytelling elements'],
      materials: ['Fairy tale character flashcards', 'Story sequence cards', 'Simple fairy tale books', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students about their favorite fairy tales. What characters do they know?'
        },
        {
          title: 'Fairy Tale Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to fairy tales using flashcards.',
          instructions: [
            'Present words like "princess", "castle", "dragon", "witch", "forest", etc.',
            'Have students repeat and mime characters.'
          ]
        },
        {
          title: 'Fairy Tale Elements',
          duration: '8 minutes',
          description: 'Discuss basic elements of fairy tales: characters, setting, problem, solution.',
          teacherNotes: 'Use a simple chart to categorize elements from a familiar tale like Cinderella or Little Red Riding Hood.'
        },
        {
          title: 'Story Sequencing',
          duration: '10 minutes',
          description: 'Give students sequence cards from a simple fairy tale and have them arrange in order.',
          instructions: [
            'Divide class into small groups.',
            'Each group arranges their set of cards in the correct sequence of the story.'
          ]
        },
        {
          title: 'Mini-Reading',
          duration: '7 minutes',
          description: 'Read a simplified version of a fairy tale and ask students to identify the main elements.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play a quick game where students must guess the fairy tale from clues given.'
        }
      ],
      assessmentTips: 'Monitor comprehension of fairy tale vocabulary and story structure elements.',
      homeworkIdeas: ['Draw your favorite fairy tale character and write 3 sentences about them.', 'Complete a story map worksheet for a fairy tale.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Practice retelling a simple fairy tale', 'Use past tense for storytelling', 'Create a fairy tale mini-book'],
      materials: ['Story structure templates', 'Art supplies', 'Mini-book templates', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review fairy tale vocabulary from the previous lesson with a quick matching game.'
        },
        {
          title: 'Past Tense for Stories',
          duration: '8 minutes',
          description: 'Introduce simple past tense for storytelling.',
          instructions: [
            'Model sentences like "The princess lived in a castle" or "The wolf ran into the forest."',
            'Provide examples of regular and common irregular past tense verbs.'
          ]
        },
        {
          title: 'Story Retelling',
          duration: '10 minutes',
          description: 'In pairs, students practice retelling a familiar fairy tale using past tense.',
          teacherNotes: 'Provide sentence starters and key vocabulary to support students.'
        },
        {
          title: 'Story Planning',
          duration: '7 minutes',
          description: 'Students plan their own simple fairy tale using a story structure template.',
          instructions: [
            'Guide students to choose characters, setting, problem, and solution.',
            'Emphasize the use of past tense in their planning.'
          ]
        },
        {
          title: 'Mini-Book Creation',
          duration: '10 minutes',
          description: 'Students create a mini-book based on their story plan.',
          instructions: [
            'Provide folded paper booklets for students to illustrate and write their stories.',
            'Include space for a title page and 4-6 story pages.'
          ]
        },
        {
          title: 'Story Sharing',
          duration: '5 minutes',
          description: 'Students share their mini-books with a partner or small group.'
        }
      ],
      assessmentTips: 'Check for appropriate use of past tense verbs and inclusion of fairy tale elements in student stories.',
      homeworkIdeas: ['Finish your fairy tale mini-book if not completed in class.', 'Read your story to a family member and ask for their feedback.']
    }
  ];
};
