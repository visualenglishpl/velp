/**
 * Visual English Book 4, Unit 15 - AT THE CIRCUS
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit15-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit15Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit15LessonPlans(): LessonPlan[] {
  const unitNumber = '15';
  const unitTitle = 'AT THE CIRCUS';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to circus performers and acts',
        'Students will practice describing circus performances',
        'Students will identify different circus roles and acts'
      ],
      materials: ['Flashcards with circus performers', 'Pictures of circus acts', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to circus vocabulary',
          instructions: ['Show students pictures of a circus', 'Ask if they have been to a circus or what they know about circuses']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for circus performers and acts',
          materials: ['Flashcards with circus performers'],
          instructions: [
            'Show flashcards one by one: clown, acrobat, juggler, ringmaster, tightrope walker, etc.',
            'Introduce each performer and what they do',
            'Practice pronunciation of new vocabulary',
            'Watch the Circus Song for Kids video'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Circus role-play',
          instructions: [
            'Students mime different circus acts',
            'Other students guess which performer they are portraying',
            'Students practice saying "I can see a..." with the circus vocabulary'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the Circus Vocabulary Game from Wordwall',
          instructions: [
            'Open the Circus Vocabulary Game on the interactive board',
            'Students take turns matching vocabulary to pictures',
            'Discuss any challenging vocabulary'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show circus performer pictures and have students name them',
            'Review what each performer does'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify circus performers and describe what they do.',
      homeworkIdeas: ['Draw your favorite circus performer and write what they do', 'Complete circus vocabulary matching worksheet']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn about circus animals and their tricks',
        'Students will practice describing circus performances in detail',
        'Students will create their own circus program'
      ],
      materials: ['Circus animal pictures', 'Art supplies for circus program creation', 'Video clips of circus performances'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review circus vocabulary from previous lesson.',
          instructions: ['Show pictures of circus performers and have students name them and what they do']
        },
        {
          title: 'Circus Animals',
          duration: '15 minutes',
          description: 'Introduce vocabulary related to circus animals and their tricks',
          materials: ['Circus animal pictures'],
          instructions: [
            'Introduce vocabulary: elephant, lion, tiger, seal, monkey, etc.',
            'Discuss what tricks each animal might perform',
            'Play the Circus Animals Game',
            'Watch the Circus Vocabulary Video'
          ]
        },
        {
          title: 'Creative Activity',
          duration: '15 minutes',
          description: 'Create a Circus Program',
          materials: ['Art supplies for circus program creation'],
          instructions: [
            'Students work in small groups to create a circus program',
            'Each program must include at least 5 acts with appropriate performers',
            'Students must write short descriptions of each act',
            'Groups present their circus program to the class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive game',
          instructions: [
            'Play the Circus Vocabulary Match game',
            'Discuss what students learned about circuses',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can correctly use circus-related vocabulary and describe circus performances in detail.',
      homeworkIdeas: ['Write a short story about a day at the circus', 'Complete a worksheet on circus animals and their tricks']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit15LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit15LessonPlans = (): LessonPlan[] => lessonPlans;