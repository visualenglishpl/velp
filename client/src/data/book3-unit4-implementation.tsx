/**
 * Visual English Book 3, Unit 4 - FREE TIME - HOBBIES
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 * using the showBlankIfUnmapped flag
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import book3Unit4Resources from './book3-unit4-resources';
import { BOOK3_TITLE } from './book3-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit
export function getBook3Unit4Resources(): TeacherResource[] {
  return book3Unit4Resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook3Unit4LessonPlans(): LessonPlan[] {
  const unitNumber = '4';
  const unitTitle = 'FREE TIME - HOBBIES';
  
  return [
    {
      id: `book3-unit${unitNumber}-lesson-1`,
      title: `${BOOK3_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        'Students will learn vocabulary related to hobbies and free time activities.',
        'Students will identify and name common hobbies.',
        'Students will describe activities using simple sentences.'
      ],
      materials: ['Flashcards', 'Worksheets', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students about what activities they do in their free time.',
          instructions: ['Ask each student to name one thing they enjoy doing.']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Introduce vocabulary related to hobbies using visual aids',
          materials: ['Hobby flashcards'],
          instructions: [
            'Show flashcards one by one',
            'Have students repeat the names of activities',
            'Demonstrate actions for physical hobbies'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Students complete matching activities connecting hobbies to images',
          materials: ['Worksheets with hobby images'],
          instructions: [
            'Distribute worksheets with images of different hobbies',
            'Students work in pairs to match vocabulary words with images',
            'Check answers as a class'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review key vocabulary through a quick game of charades',
          instructions: [
            'Students take turns acting out hobbies',
            'Class guesses the hobby being acted out',
            'Review any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify and name common hobbies and explain what they enjoy doing.',
      homeworkIdeas: ['Students draw pictures of three hobbies they enjoy', 'Write sentences about each hobby']
    },
    {
      id: `book3-unit${unitNumber}-lesson-2`,
      title: `${BOOK3_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        'Students will practice asking and answering questions about hobbies.',
        'Students will use question forms correctly.',
        'Students will conduct a simple interview about hobbies.'
      ],
      materials: ['Survey templates', 'Conversation cards', 'Audio recordings'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play a quick memory game with hobby flashcards from previous lesson.',
          instructions: ['Show flashcards briefly and have students recall the hobby names']
        },
        {
          title: 'Question Forms Introduction',
          duration: '15 minutes',
          description: 'Introduce question forms for asking about hobbies',
          materials: ['Conversation cards'],
          instructions: [
            'Introduce the question "What do you like to do in your free time?"',
            'Model answers: "I like to..."',
            'Have students practice the questions and answers in pairs'
          ]
        },
        {
          title: 'Survey Activity',
          duration: '15 minutes',
          description: 'Students create a hobby survey and interview classmates',
          materials: ['Survey templates'],
          instructions: [
            'Distribute survey templates',
            'Demonstrate how to complete the survey',
            'Students move around the classroom interviewing each other'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Students share findings from their survey with the class.',
          instructions: [
            'Students report what they learned about their classmates',
            'Discuss the most popular hobbies in the class',
            'Review any challenging vocabulary or phrases'
          ]
        }
      ],
      assessmentTips: 'Students can confidently ask and answer questions about hobbies.',
      homeworkIdeas: ['Write 5 sentences about family members\'s hobbies', 'Create a poster about their favorite hobby']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook3Unit4LessonPlans();

// Direct exports for consistent importing
export const unitResources = book3Unit4Resources;
export const resources = book3Unit4Resources; // Alias for compatibility
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook3Unit4LessonPlans = (): LessonPlan[] => lessonPlans;
