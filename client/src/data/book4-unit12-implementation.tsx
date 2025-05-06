/**
 * Visual English Book 4, Unit 12 - AT THE FARM
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit12-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit12Resources(): TeacherResource[] {
  return resources;
}

// Function with standardized name for component compatibility
export function getTeacherResources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit12LessonPlans(): LessonPlan[] {
  const unitNumber = '12';
  const unitTitle = 'AT THE FARM';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to farm animals',
        'Students will practice animal sounds and movements',
        'Students will identify common farm animals and their activities'
      ],
      materials: ['Flashcards with farm animals', 'Animal sound recordings', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to farm animals vocabulary',
          instructions: ['Show students pictures of various farm animals', 'Ask if they can name any animals in English']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for common farm animals',
          materials: ['Flashcards with farm animals'],
          instructions: [
            'Show animal flashcards one by one',
            'Introduce animal names and their sounds',
            'Practice pronunciation of animal names',
            'Play the Old MacDonald song video'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Animal sounds game',
          materials: ['Animal sound recordings'],
          instructions: [
            'Play animal sound recordings',
            'Students guess which animal makes each sound',
            'Students mimic the sounds and movements of the animals'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the Farm Animals Game from Wordwall',
          instructions: [
            'Open the Farm Animals Game on the interactive board',
            'Students take turns matching animals to their names',
            'Discuss any challenging vocabulary'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show farm animal pictures and have students name them',
            'Review animal sounds and movements'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify common farm animals and make their sounds.',
      homeworkIdeas: ['Draw your favorite farm animal and write 3 facts about it', 'Complete farm animals matching worksheet']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn about farm activities and verbs',
        'Students will practice describing what happens on a farm',
        'Students will create a farm scene with animals and activities'
      ],
      materials: ['Farm scene backdrop', 'Animal cutouts', 'Farm activity flashcards', 'Art supplies'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review farm animals from previous lesson with quick game.',
          instructions: ['Show animals and have students call out their names and sounds']
        },
        {
          title: 'Farm Activities',
          duration: '15 minutes',
          description: 'Introduce verbs and activities related to farm life',
          materials: ['Farm activity flashcards'],
          instructions: [
            'Introduce verbs: feed, milk, collect, plant, harvest',
            'Show pictures of farm activities',
            'Watch the "A Day at the Farm" video',
            'Discuss what happens on a farm'
          ]
        },
        {
          title: 'Group Activity',
          duration: '15 minutes',
          description: 'Create a farm scene',
          materials: ['Farm scene backdrop', 'Animal cutouts', 'Art supplies'],
          instructions: [
            'Divide class into small groups',
            'Each group creates a farm scene with animals and activities',
            'Students describe their scene using the new vocabulary',
            'Groups present their farm to the class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive game',
          instructions: [
            'Play the Farm Animals Verbs Wordwall game',
            'Discuss what students learned about farm activities',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can correctly use farm-related verbs and describe farm activities.',
      homeworkIdeas: ['Write 5 sentences about farm activities', 'Complete farm verbs vocabulary exercise']
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
export function getBook4Unit12LessonPlans(): LessonPlan[] {
  return generateBook4Unit12LessonPlans();
}

// Function with standardized name for component compatibility
export function getUnitLessonPlans(): LessonPlan[] {
  return generateBook4Unit12LessonPlans();
}