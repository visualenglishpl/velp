// Implementation file for Book 3 Unit 1

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit1Resources } from './book3-unit1-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '1';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit1Resources = (): TeacherResource[] => book3Unit1Resources;

// Generate lesson plans for this unit
export const generateUnit1LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn school objects vocabulary', 'Practice classroom language', 'Identify and describe classroom items'],
      materials: ['School objects flashcards', 'Real classroom objects', 'Vocabulary worksheet', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students a school bag and ask them what they think is inside. Pull out school items one by one.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce school objects vocabulary using flashcards and real objects.',
          instructions: [
            'Show each object, say its name, and have students repeat.',
            'Practice pronunciation and attach meaning to each item by demonstrating its use.'
          ]
        },
        {
          title: 'TPR Activity',
          duration: '5 minutes',
          description: 'Give commands using the new vocabulary.',
          teacherNotes: 'Examples: "Touch your pencil", "Show me your eraser", "Put your book on the desk"'
        },
        {
          title: 'Memory Game',
          duration: '10 minutes',
          description: 'Place school objects on a tray, show students for 30 seconds, then cover and see how many they remember.'
        },
        {
          title: 'Classroom Questions',
          duration: '5 minutes',
          description: 'Practice questions like "What\'s this?" and "Can I borrow your...?"'
        },
        {
          title: 'Categorization',
          duration: '5 minutes',
          description: 'Students sort classroom objects by categories (writing tools, books, art supplies, etc.).'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play a quick game of "I spy" using the school objects vocabulary.'
        }
      ],
      assessmentTips: 'Check for recognition and recall of school objects vocabulary. Note pronunciation difficulties.',
      homeworkIdeas: ['Complete a school objects worksheet', 'Draw and label 5 objects in your school bag.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Practice asking and answering about school objects', 'Learn possessive adjectives with school items', 'Create a classroom poster'],
      materials: ['School objects', 'Colored paper and art supplies', 'Sentence pattern cards', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review school objects vocabulary with a quick flashcard activity.'
        },
        {
          title: 'Possessive Adjectives',
          duration: '8 minutes',
          description: 'Introduce my, your, his, her, our, their with school objects.',
          instructions: [
            'Model sentences like "This is my pencil" or "That is her notebook."',
            'Have students practice with their own items and by pointing to classmates\' items.'
          ]
        },
        {
          title: 'Question Practice',
          duration: '7 minutes',
          description: 'Practice asking "Whose pencil is this?" and answering "It\'s my/his/her pencil."',
          teacherNotes: 'Collect some items from students (with permission) to use for this activity.'
        },
        {
          title: 'Pair Work: Interviews',
          duration: '10 minutes',
          description: 'Students interview each other about school objects they have and need.',
          instructions: [
            'Provide question prompts like "Do you have a...?" and "What color is your...?"',
            'Students record their partner\'s answers.'
          ]
        },
        {
          title: 'Classroom Poster',
          duration: '10 minutes',
          description: 'In small groups, students create a poster about classroom objects with labels and sentences.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Groups present their posters to the class using the vocabulary and structures learned.'
        }
      ],
      assessmentTips: 'Evaluate students\' use of possessive adjectives and question forms during pair work and presentations.',
      homeworkIdeas: ['Make a list of all the school objects you use for different subjects.', 'Draw your ideal school bag and label all the items inside with possessive adjectives.']
    }
  ];
};
