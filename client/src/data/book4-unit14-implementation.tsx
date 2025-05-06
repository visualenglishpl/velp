/**
 * Visual English Book 4, Unit 14 - WHAT CAN YOU DO
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit14-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit14Resources(): TeacherResource[] {
  return resources;
}

// Function with standardized name for component compatibility
export function getTeacherResources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
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
        'Students will learn to use "can" to talk about abilities',
        'Students will identify different action verbs',
        'Students will practice asking and answering about abilities'
      ],
      materials: ['Action verb flashcards', 'Ability worksheet', 'Sentence strip cards'],
      steps: [
        {
          title: 'Warm-up Song',
          duration: '5 minutes',
          description: 'Begin with a song related to abilities',
          instructions: ['Play the "I Can Sing a Rainbow" song', 'Have students follow along with actions']
        },
        {
          title: 'Grammar Introduction',
          duration: '10 minutes',
          description: 'Introduce the modal verb "can" for abilities',
          materials: ['Action verb flashcards'],
          instructions: [
            'Model the structure: "I can" + verb',
            'Demonstrate examples: "I can swim", "I can dance", "I can sing"',
            'Introduce the question form: "Can you...?" and answers "Yes, I can." / "No, I can\'t."'
          ]
        },
        {
          title: 'Action Verb Practice',
          duration: '10 minutes',
          description: 'Practice different action verbs with "can"',
          materials: ['Action verb flashcards'],
          instructions: [
            'Show flashcards of different actions',
            'Have students say "I can" + the action shown',
            'Practice pronunciation and intonation'
          ]
        },
        {
          title: 'Guided Practice Activity',
          duration: '10 minutes',
          description: 'Practice asking and answering about abilities',
          materials: ['Ability worksheet'],
          instructions: [
            'Distribute worksheets with images of various activities',
            'Model the dialogue: "Can you swim?" "Yes, I can." / "No, I can\'t."',
            'Have students practice in pairs, asking and answering about the pictures'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Review ability verbs with interactive game',
          instructions: [
            'Play the I Can Verbs Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to correctly use "can" to express abilities and form questions',
      homeworkIdeas: ['Write 5 sentences about things you can do', 'Draw pictures of 3 things you can do and 3 things you can\'t do']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will expand their use of ability expressions',
        'Students will practice talking about talents and skills',
        'Students will create a class talent survey'
      ],
      materials: ['Talent survey template', 'Ability chart', 'Sentence strips with "can" sentences'],
      steps: [
        {
          title: 'Review Activity',
          duration: '5 minutes',
          description: 'Review previously learned ability expressions',
          instructions: ['Review "can" and "can\'t" expressions', 'Have students share some abilities they discussed in the previous lesson']
        },
        {
          title: 'Expanding Ability Vocabulary',
          duration: '10 minutes',
          description: 'Introduce more complex ability expressions',
          materials: ['Ability chart'],
          instructions: [
            'Introduce new verbs: play (an instrument), speak (a language), cook, draw, etc.',
            'Use adverbs with abilities: "I can run fast", "She can sing beautifully"',
            'Have students practice new vocabulary in pairs'
          ]
        },
        {
          title: 'Sentence Building Activity',
          duration: '10 minutes',
          description: 'Practice building complete sentences about abilities',
          materials: ['Sentence strip cards'],
          instructions: [
            'Divide class into small groups',
            'Give each group sentence strip cards with subjects, "can"/"can\'t", and verbs',
            'Have groups create and read aloud grammatically correct sentences'
          ]
        },
        {
          title: 'Class Talent Survey',
          duration: '15 minutes',
          description: 'Create and conduct a class survey about abilities',
          materials: ['Talent survey template'],
          instructions: [
            'Distribute survey templates with questions like "Can you ride a bike?"',
            'Have students circulate and ask each other questions',
            'Students record classmates\' responses',
            'Discuss the results as a class: "Five students can swim"'
          ]
        },
        {
          title: 'Interactive Activity',
          duration: '5 minutes',
          description: 'Practice matching ability expressions with images',
          instructions: [
            'Play the I Can Verbs Match Wordwall game',
            'Review key vocabulary and phrases from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use a variety of verbs with "can" and form accurate questions during the survey activity',
      homeworkIdeas: ['Create a "My Family Abilities" poster showing what different family members can do', 'Write a short paragraph about something you want to learn to do']
    }
  ];
};

// Legacy function for compatibility with TeacherResources component
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  return {
    id: resource.id || '',
    title: resource.title || '',
    duration: resource.lessonPlan?.duration || '45 minutes',
    level: resource.lessonPlan?.level || 'Elementary to Pre-Intermediate',
    objectives: resource.lessonPlan?.objectives || [],
    materials: resource.lessonPlan?.materials || [],
    steps: resource.lessonPlan?.steps || [],
    assessmentTips: resource.lessonPlan?.assessmentTips || '',
    homeworkIdeas: resource.lessonPlan?.homeworkIdeas || []
  };
}

// Function to get lesson plans (for backward compatibility)
export function getBook4Unit14LessonPlans(): LessonPlan[] {
  return generateBook4Unit14LessonPlans();
}

// Function with standardized name for component compatibility
export function getUnitLessonPlans(): LessonPlan[] {
  return generateBook4Unit14LessonPlans();
}