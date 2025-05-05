/**
 * Visual English Book 4, Unit 1 - NATIONALITIES
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit1-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit1Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit1LessonPlans(): LessonPlan[] {
  const unitNumber = '1';
  const unitTitle = 'NATIONALITIES';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to different nationalities',
        'Students will practice asking and answering about nationalities',
        'Students will identify flags and countries of the United Kingdom'
      ],
      materials: ['Flashcards with flags', 'World map', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to countries and nationalities',
          instructions: ['Show students a world map', 'Point to different countries and ask if they know them']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for common nationalities',
          materials: ['Flashcards with national flags'],
          instructions: [
            'Show flag flashcards one by one',
            'Introduce nationality terms for each country',
            'Practice pronunciation of nationality words'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Q&A practice with nationality questions',
          materials: ['Handouts with conversation examples'],
          instructions: [
            'Model dialogues: "Where are you from?" "I am from..."',
            'Practice questions: "What nationality are you?" "I am..."',
            'Students work in pairs to practice conversations'
          ]
        },
        {
          title: 'UK Countries Focus',
          duration: '5 minutes',
          description: 'Introduction to the countries of the United Kingdom',
          instructions: [
            'Show map of the UK',
            'Identify England, Scotland, Wales, and Northern Ireland',
            'Discuss capitals and flags of each country'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show flags and have students name countries and nationalities',
            'Review any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify common nationalities and answer questions about where they are from.',
      homeworkIdeas: ['Complete nationality matching worksheet', 'Research and write 5 facts about a chosen country']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will understand the difference between countries and nationalities',
        'Students will learn about UK countries in more detail',
        'Students will create a brief presentation about a chosen nationality'
      ],
      materials: ['UK flags images', 'Handouts with nationality terms', 'Presentation materials'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review nationalities from previous lesson with quick game.',
          instructions: ['Show flags and have students call out nationalities']
        },
        {
          title: 'UK Focus',
          duration: '15 minutes',
          description: 'Deep dive into UK countries and nationalities',
          materials: ['UK map and flags'],
          instructions: [
            'Review English, Scottish, Welsh and Northern Irish nationalities',
            'Introduce key landmarks and cultural elements of each',
            'Play the UK Countries Wordwall game as a class'
          ]
        },
        {
          title: 'Group Activity',
          duration: '15 minutes',
          description: 'Create nationality profiles',
          materials: ['Paper, markers, reference materials'],
          instructions: [
            'Divide class into small groups',
            'Assign each group a different nationality to research',
            'Groups create a profile with key facts about their assigned nationality',
            'Present findings to the class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive quiz',
          instructions: [
            'Play the UK Capital Cities game',
            'Discuss what students learned about different nationalities',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can differentiate between countries and nationalities and identify UK countries correctly.',
      homeworkIdeas: ['Create a fact sheet about your favorite country', 'Complete nationality vocabulary exercises']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit1LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit1LessonPlans = (): LessonPlan[] => lessonPlans;
