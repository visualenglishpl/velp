// Implementation file for Book 2 Unit 13

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit13Resources } from './book2-unit13-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '13';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit13Resources = (): TeacherResource[] => book2Unit13Resources;

// Generate lesson plans for this unit
export const generateUnit13LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Use present continuous tense to describe ongoing actions', 'Ask and answer "What are you doing?"', 'Identify and name common activities'],
      materials: ['Action flashcards', 'Present continuous verb cards', 'Activity picture worksheets'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play "Simon Says" with action commands that students must perform.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce action vocabulary with flashcards and mime the actions.',
          instructions: [
            'Show each action card and demonstrate the action.',
            'Have students repeat the word and mime the action together.'
          ]
        },
        {
          title: 'Grammar Introduction',
          duration: '8 minutes',
          description: 'Teach present continuous structure: subject + am/is/are + verb+ing.',
          teacherNotes: 'Write examples on the board with different subjects (I, you, he/she, we, they)'
        },
        {
          title: 'Question Practice',
          duration: '5 minutes',
          description: 'Model "What are you doing?" and responses "I am ___ing".'
        },
        {
          title: 'Verb Formation',
          duration: '5 minutes',
          description: 'Practice verb formations by adding -ing to base verbs.'
        },
        {
          title: 'Matching Activity',
          duration: '5 minutes',
          description: 'Students match action pictures with present continuous sentences.'
        },
        {
          title: 'Mime and Guess',
          duration: '10 minutes',
          description: 'In pairs, students take turns miming actions while partners guess "Are you ___ing?" until they identify the correct action.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play a quick game where students must say what various classmates are doing at that moment.'
        }
      ],
      assessmentTips: 'Monitor pair work for correct question formation and present continuous usage.',
      homeworkIdeas: ['Students create a mini-book with drawings of themselves performing different actions with present continuous captions.', 'Students observe family members at home and record 5 actions using present continuous sentences.']
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Contrast present simple and present continuous tenses', 'Describe daily routines vs. current activities', 'Create and perform a skit using both tenses'],
      materials: ['Daily routine and current activity picture cards', 'Tense comparison chart', 'Skit planning worksheets'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of people doing various activities and ask students to guess what they are doing right now.'
        },
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Review present continuous from previous lesson.'
        },
        {
          title: 'Tense Comparison',
          duration: '10 minutes',
          description: 'Compare present simple (I eat breakfast every day) with present continuous (I am eating breakfast now).',
          instructions: [
            'Create a two-column chart on the board with "Every day" and "Right now" headings.',
            'Provide multiple examples of each tense and discuss the differences.'
          ]
        },
        {
          title: 'Sorting Activity',
          duration: '5 minutes',
          description: 'Sort activity cards into "usually/every day" vs. "right now" categories.'
        },
        {
          title: 'Sentence Conversion',
          duration: '5 minutes',
          description: 'Practice converting sentences from present simple to present continuous.'
        },
        {
          title: 'Skit Planning',
          duration: '5 minutes',
          description: 'In small groups, students create a skit that includes both tenses.'
        },
        {
          title: 'Skit Performance',
          duration: '10 minutes',
          description: 'Groups perform their skits for the class, emphasizing the contrast between regular activities and current actions.'
        },
        {
          title: 'Discussion and Wrap-up',
          duration: '5 minutes',
          description: 'Class discusses the performances and identifies examples of both tenses used in the skits.'
        }
      ],
      assessmentTips: 'Evaluate skits for appropriate use of both tenses and check worksheet accuracy.',
      homeworkIdeas: ['Students create a daily routine poster with both "Every day I..." and "Right now I am..." sections.']
    }
  ];
};
