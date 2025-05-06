/**
 * Visual English Book 4, Unit 14 - WHAT CAN YOU DO
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit14-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit14Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit14LessonPlans(): LessonPlan[] {
  const unitNumber = '14';
  const unitTitle = 'WHAT CAN YOU DO';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn to express abilities using "can"',
        'Students will practice action verbs for different skills',
        'Students will identify and describe various abilities'
      ],
      materials: ['Flashcards with action verbs', 'Pictures of people performing different activities', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to abilities vocabulary',
          instructions: ['Show students pictures of people doing different activities', 'Ask what activities they can do']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for common abilities and action verbs',
          materials: ['Flashcards with action verbs'],
          instructions: [
            'Show flashcards one by one: run, jump, swim, sing, dance, etc.',
            'Introduce the structure "I can..." with each verb',
            'Practice pronunciation of new vocabulary',
            'Watch the "I Can Sing a Rainbow" video'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Abilities survey',
          instructions: [
            'Students create a simple survey sheet with 5 abilities',
            'Students ask classmates "Can you...?" and record answers',
            'Students report back: "Maria can swim but she can\'t ride a bike."'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the I Can Verbs Game from Wordwall',
          instructions: [
            'Open the I Can Verbs Game on the interactive board',
            'Students take turns matching abilities to pictures',
            'Discuss any challenging vocabulary'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show action pictures and have students express them using "I can..."',
            'Review any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Students can correctly use "can" to express abilities and use action verbs appropriately.',
      homeworkIdeas: ['Write 5 sentences about what you can do and 5 about what you can\'t do', 'Complete abilities matching worksheet']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will ask and answer questions about abilities',
        'Students will compare abilities with classmates',
        'Students will create a talent show presentation'
      ],
      materials: ['Question and answer cards', 'Chart paper for talent show', 'Art supplies'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review abilities vocabulary from previous lesson.',
          instructions: ['Play a quick mime game where students act out abilities and others guess "Can you...?"']
        },
        {
          title: 'Question Practice',
          duration: '15 minutes',
          description: 'Practice forming questions about abilities',
          materials: ['Question and answer cards'],
          instructions: [
            'Introduce question form: "Can you...?" and short answers "Yes, I can." / "No, I can\'t."',
            'Students practice in pairs using question cards',
            'Play "Find Someone Who Can" game where students circulate to find classmates with specific abilities',
            'Share findings with the class'
          ]
        },
        {
          title: 'Creative Activity',
          duration: '15 minutes',
          description: 'Class Talent Show',
          materials: ['Chart paper for talent show', 'Art supplies'],
          instructions: [
            'Students work in small groups to create a talent show poster',
            'Each student must contribute one ability they can perform',
            'Groups create illustrations and descriptions for each talent',
            'Groups present their talent show to the class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive game',
          instructions: [
            'Play the I Can Verbs Match Wordwall game',
            'Discuss what new abilities students would like to learn',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can correctly ask and answer questions about abilities using "can" and "can\'t".',
      homeworkIdeas: ['Interview a family member about their abilities', 'Complete a worksheet on abilities questions and answers']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit14LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit14LessonPlans = (): LessonPlan[] => lessonPlans;