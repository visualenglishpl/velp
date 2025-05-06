/**
 * Visual English Book 4, Unit 13 - AT THE PLAYGROUND
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit13-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit13Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
export function generateBook4Unit13LessonPlans(): LessonPlan[] {
  const unitNumber = '13';
  const unitTitle = 'AT THE PLAYGROUND';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn playground vocabulary',
        'Students will identify different playground equipment',
        'Students will practice using playground action verbs'
      ],
      materials: ['Playground equipment flashcards', 'Action verb cards', 'Playground safety rules handout'],
      steps: [
        {
          title: 'Warm-up Discussion',
          duration: '5 minutes',
          description: 'Begin with a discussion about playground experiences',
          instructions: ['Ask students if they enjoy going to playgrounds', 'Discuss favorite playground activities']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential playground vocabulary with visual aids',
          materials: ['Playground equipment flashcards'],
          instructions: [
            'Introduce vocabulary: slide, swing, seesaw, monkey bars, sandbox, etc.',
            'Have students repeat new words and match them to images',
            'Watch the Playground Vocabulary video'
          ]
        },
        {
          title: 'Action Verb Practice',
          duration: '10 minutes',
          description: 'Practice action verbs associated with playground activities',
          materials: ['Action verb cards'],
          instructions: [
            'Teach verbs: slide, swing, climb, jump, dig, etc.',
            'Demonstrate actions and have students mimic',
            'Have students match verbs to playground equipment'
          ]
        },
        {
          title: 'Playground Safety Discussion',
          duration: '10 minutes',
          description: 'Learn about playground safety rules',
          materials: ['Playground safety rules handout'],
          instructions: [
            'Discuss importance of playground safety',
            'Introduce safety vocabulary: careful, wait your turn, hold on tight, etc.',
            'Watch the Playground Safety Video'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Review playground vocabulary with interactive game',
          instructions: [
            'Play the Playground Vocabulary Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to identify playground equipment and use related vocabulary correctly',
      homeworkIdeas: ['Draw your ideal playground and label the equipment', 'Write 5 sentences about activities you enjoy at the playground']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn playground conversation patterns',
        'Students will practice asking and responding to playground-related questions',
        'Students will create a playground-themed dialogue'
      ],
      materials: ['Conversation cue cards', 'Dialogue worksheet', 'Role-play scenario cards'],
      steps: [
        {
          title: 'Warm-up Song',
          duration: '5 minutes',
          description: 'Begin with a fun playground-themed song',
          instructions: ['Play the At The Playground Song', 'Have students follow along with actions']
        },
        {
          title: 'Conversation Patterns',
          duration: '10 minutes',
          description: 'Introduce common playground conversation patterns',
          materials: ['Conversation cue cards'],
          instructions: [
            'Teach phrases like "Can I have a turn?", "Will you play with me?", etc.',
            'Model conversations between children at a playground',
            'Have students practice the phrases in pairs'
          ]
        },
        {
          title: 'Guided Dialogue Practice',
          duration: '10 minutes',
          description: 'Work through a guided dialogue about playground activities',
          materials: ['Dialogue worksheet'],
          instructions: [
            'Distribute dialogue worksheets with playground conversations',
            'Practice the dialogue as a class',
            'Have students practice in pairs with different roles'
          ]
        },
        {
          title: 'Role-play Activity',
          duration: '15 minutes',
          description: 'Create and act out playground scenarios',
          materials: ['Role-play scenario cards'],
          instructions: [
            'Divide class into pairs or small groups',
            'Distribute scenario cards (e.g., asking to join a game, resolving a conflict over turns)',
            'Have groups create and perform short dialogues based on their scenarios'
          ]
        },
        {
          title: 'Interactive Activity',
          duration: '5 minutes',
          description: 'Practice playground activities vocabulary',
          instructions: [
            'Play the Playground Activities Match Wordwall game',
            'Review key vocabulary and phrases from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to create and perform appropriate playground dialogues',
      homeworkIdeas: ['Write a short dialogue between two friends at a playground', 'Create a list of playground rules in English']
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
export function getBook4Unit13LessonPlans(): LessonPlan[] {
  return generateBook4Unit13LessonPlans();
}