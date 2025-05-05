/**
 * Visual English Book 4, Unit 3 - HOME SWEET HOME
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit3-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit3Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit3LessonPlans(): LessonPlan[] {
  const unitNumber = '3';
  const unitTitle = 'HOME SWEET HOME';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to different types of houses',
        'Students will identify and name different rooms in a house',
        'Students will use prepositions of place to describe locations within a house'
      ],
      materials: ['Flashcards with house types', 'House floor plan diagram', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to different types of houses around the world',
          instructions: ['Show images of different house types', 'Ask students what they notice about each house']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for house types and rooms',
          materials: ['House flashcards', 'Room flashcards'],
          instructions: [
            'Introduce different house types (detached, semi-detached, apartment, cottage, etc.)',
            'Present vocabulary for different rooms in a house',
            'Have students repeat new vocabulary'
          ]
        },
        {
          title: 'Rooms of the House Activity',
          duration: '15 minutes',
          description: 'Interactive game using online Wordwall resources',
          materials: ['Interactive board with Wordwall games'],
          instructions: [
            'Play the "Rooms of Houses" game as a whole class',
            'Divide students into teams for the "Types of Houses" games',
            'Award points for correct answers'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review vocabulary through drawing activity',
          instructions: [
            'Students draw a simple floor plan of their own home',
            'Label each room in English',
            'Volunteers share their drawings with the class'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify common house types and rooms within a house.',
      homeworkIdeas: ['Complete house vocabulary worksheet', 'Label a house floor plan with the correct room names']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn about items found in different rooms',
        'Students will practice descriptions using "There is/There are"',
        'Students will conduct a dialogue about their homes'
      ],
      materials: ['Room flashcards', 'Furniture vocabulary cards', 'Handouts with dialogues'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review house vocabulary from previous lesson.',
          instructions: ['Show room flashcards and have students name them']
        },
        {
          title: 'Room-specific Vocabulary',
          duration: '15 minutes',
          description: 'Focus on specific rooms and their contents',
          materials: ['Wordwall games for specific rooms'],
          instructions: [
            'Divide class into groups',
            'Each group plays a different room-specific game (kitchen, bathroom, etc.)',
            'Groups report back the vocabulary they learned'
          ]
        },
        {
          title: 'There is/There are Practice',
          duration: '15 minutes',
          description: 'Practice describing room contents',
          materials: ['Pictures of room interiors'],
          instructions: [
            'Introduce the structure "There is/There are"',
            'Model examples: "There is a sofa in the living room"',
            'Students practice describing what they can see in picture'
          ]
        },
        {
          title: 'Dialogue Activity',
          duration: '10 minutes',
          description: 'Paired conversation practice',
          instructions: [
            'Students work in pairs to describe their homes to each other',
            'Provide conversation prompts: "How many rooms are there in your home?"',
            'Partners ask follow-up questions'
          ]
        }
      ],
      assessmentTips: 'Students can name items typically found in different rooms and use There is/There are correctly.',
      homeworkIdeas: ['Write a description of your favorite room', 'Complete the "Parts of the House" Wordwall game at home']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit3LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit3LessonPlans = (): LessonPlan[] => lessonPlans;
