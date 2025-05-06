/**
 * Visual English Book 4, Unit 13 - AT THE PLAYGROUND
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit13-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit13Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
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
        'Students will learn vocabulary related to playground equipment',
        'Students will practice action verbs associated with playground activities',
        'Students will identify and describe playground objects'
      ],
      materials: ['Flashcards with playground equipment', 'Pictures of playground scenes', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to playground vocabulary',
          instructions: ['Show students pictures of a playground', 'Ask if they can name any playground equipment in English']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for common playground equipment',
          materials: ['Flashcards with playground equipment'],
          instructions: [
            'Show flashcards one by one: slide, swing, seesaw, monkey bars, sandbox, etc.',
            'Introduce each piece of equipment and associated verbs',
            'Practice pronunciation of new vocabulary',
            'Watch the Playground Vocabulary video'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Playground action mime game',
          instructions: [
            'Students mime playground actions: sliding, swinging, climbing',
            'Other students guess which equipment they are using',
            'Students take turns describing what they can do at a playground'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the Playground Vocabulary Game from Wordwall',
          instructions: [
            'Open the Playground Vocabulary Game on the interactive board',
            'Students take turns matching vocabulary to pictures',
            'Discuss any challenging vocabulary'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show playground equipment pictures and have students name them',
            'Play the At The Playground Song video'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify common playground equipment and describe actions associated with them.',
      homeworkIdeas: ['Draw your favorite playground equipment and write what you can do with it', 'Complete playground vocabulary matching worksheet']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn about playground safety rules',
        'Students will practice giving and following instructions',
        'Students will create their ideal playground design'
      ],
      materials: ['Chart paper for safety rules', 'Art supplies for playground design', 'Pictures of various playgrounds'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review playground vocabulary from previous lesson.',
          instructions: ['Show equipment and have students name and mime the actions']
        },
        {
          title: 'Playground Safety',
          duration: '15 minutes',
          description: 'Discuss playground safety rules and instructions',
          materials: ['Chart paper for safety rules'],
          instructions: [
            'Introduce safety vocabulary: careful, safe, dangerous, wait, take turns',
            'Create a list of playground safety rules with the class',
            'Practice giving and following instructions: "Wait your turn on the slide"',
            'Role-play safe playground behavior'
          ]
        },
        {
          title: 'Creative Activity',
          duration: '15 minutes',
          description: 'Design Your Dream Playground',
          materials: ['Art supplies for playground design'],
          instructions: [
            'Students work in pairs to design their ideal playground',
            'Students must include labels for at least 5 pieces of equipment',
            'Students write 3 safety rules for their playground',
            'Pairs present their designs to the class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive game',
          instructions: [
            'Play the Playground Activities Match Wordwall game',
            'Discuss what students learned about playground vocabulary and safety',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can correctly use playground-related vocabulary and give clear safety instructions.',
      homeworkIdeas: ['Write 5 safety rules for the playground', 'Complete a worksheet on playground vocabulary and actions']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit13LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit13LessonPlans = (): LessonPlan[] => lessonPlans;