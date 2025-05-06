/**
 * Visual English Book 5, Unit 3 - HOBBIES AND LEISURE
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book5-unit3-resources';
import { BOOK5_UNIT_TITLES } from './book5-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook5Unit3Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
export function generateBook5Unit3LessonPlans(): LessonPlan[] {
  const unitNumber = '3';
  const unitTitle = BOOK5_UNIT_TITLES[unitNumber];
  
  return [
    {
      id: `book5-unit${unitNumber}-lesson-1`,
      title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Intermediate',
      objectives: [
        'Students will learn vocabulary related to hobbies and leisure activities',
        'Students will identify different types of gaming and entertainment',
        'Students will practice talking about their free time activities'
      ],
      materials: ['Hobby flashcards', 'Gaming vocabulary cards', 'Activity worksheet'],
      steps: [
        {
          title: 'Warm-up Discussion',
          duration: '5 minutes',
          description: 'Begin with a discussion about hobbies and free time',
          instructions: ['Ask students about their favorite hobbies', 'Discuss the concept of leisure activities']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present hobby and leisure vocabulary with visual aids',
          materials: ['Hobby flashcards'],
          instructions: [
            'Introduce vocabulary: sports, reading, gaming, crafts, music, etc.',
            'Have students repeat new words and match them to images',
            'Watch the Hobbies and Leisure Video'
          ]
        },
        {
          title: 'Gaming Vocabulary Focus',
          duration: '10 minutes',
          description: 'Learn specific vocabulary related to gaming',
          materials: ['Gaming vocabulary cards'],
          instructions: [
            'Teach gaming terms: console, controller, level, character, etc.',
            'Demonstrate using these terms in context',
            'Have students practice the expressions with partners'
          ]
        },
        {
          title: 'Guided Practice Activity',
          duration: '10 minutes',
          description: 'Practice talking about leisure activities',
          materials: ['Activity worksheet'],
          instructions: [
            'Distribute worksheets with images of various hobbies',
            'Students write sentences about which activities they enjoy',
            'Have students share their preferences with partners'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Review gaming vocabulary with interactive game',
          instructions: [
            'Play the Gaming Vocabulary Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use hobby and gaming vocabulary correctly',
      homeworkIdeas: ['Create a poster showing your top 3 favorite hobbies', 'Write 5 sentences about gaming or other leisure activities']
    },
    {
      id: `book5-unit${unitNumber}-lesson-2`,
      title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Intermediate',
      objectives: [
        'Students will learn to discuss digital literacy and online safety',
        'Students will practice communicating about online activities',
        'Students will develop an understanding of appropriate online behavior'
      ],
      materials: ['Digital citizenship poster', 'Internet safety guidelines', 'Scenario cards'],
      steps: [
        {
          title: 'Review Activity',
          duration: '5 minutes',
          description: 'Review previously learned gaming vocabulary',
          instructions: ['Quiz students on gaming terms', 'Have students recall vocabulary from the previous lesson']
        },
        {
          title: 'Online Safety Discussion',
          duration: '10 minutes',
          description: 'Introduce concepts of digital literacy and internet safety',
          materials: ['Digital citizenship poster'],
          instructions: [
            'Present internet safety vocabulary: privacy, password, report, block, etc.',
            'Discuss guidelines for safe online interaction',
            'Have students share their experiences with online platforms'
          ]
        },
        {
          title: 'Digital Communication',
          duration: '10 minutes',
          description: 'Learn expressions for online communication',
          materials: ['Internet safety guidelines'],
          instructions: [
            'Introduce communication terminology: chat, message, video call, etc.',
            'Discuss positive and negative online behaviors',
            'Have students create guidelines for being respectful online'
          ]
        },
        {
          title: 'Scenario Role-play',
          duration: '15 minutes',
          description: 'Practice appropriate responses to online situations',
          materials: ['Scenario cards'],
          instructions: [
            'Divide students into pairs',
            'Distribute cards with online scenarios',
            'Students practice appropriate responses to each situation',
            'Volunteers perform their dialogues for the class'
          ]
        },
        {
          title: 'Interactive Vocabulary Game',
          duration: '5 minutes',
          description: 'Practice gaming tools vocabulary',
          instructions: [
            'Play the Gaming Tools Vocabulary Wordwall game',
            'Review key vocabulary and phrases from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' understanding of digital literacy concepts and ability to communicate about online safety',
      homeworkIdeas: ['Create a digital citizenship guideline poster', 'Write a dialogue demonstrating good online etiquette']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook5Unit3LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook5Unit3LessonPlans = (): LessonPlan[] => lessonPlans;