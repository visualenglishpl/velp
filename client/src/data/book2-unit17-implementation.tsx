/**
 * Visual English Book 2, Unit 17: WHERE ARE YOU FROM?
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 */

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit17Resources } from './book2-unit17-resources';

const unitNumber = '17';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export function getBook2Unit17Resources(): TeacherResource[] {
  return book2Unit17Resources;
}

// Generate 45-minute lesson plans for this unit (formatted to match Book 2 Unit 13 structure)
export function generateUnit17LessonPlans(): LessonPlan[] {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn vocabulary for common countries and their nationalities',
        'Practice saying country names and nationalities correctly',
        'Identify various country flags'
      ],
      materials: [
        'Visual English Book 2 Unit 17 slides',
        'World map with country names',
        'Country and nationality flashcards',
        'Country flag pictures',
        'Nationality song videos'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students a world map and point to various countries. Ask if they know the English names of any countries.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present common countries with their flags and corresponding nationalities.',
          instructions: [
            'Practice pronunciation with the whole class',
            'Focus on nationality suffixes (-ish, -ian, -ese, etc.)',
            'Connect countries to their flags visually'
          ]
        },
        {
          title: 'Where Are You From? Song',
          duration: '8 minutes',
          description: 'Use the nationality song to reinforce vocabulary.',
          teacherNotes: 'First have students listen, then play again and encourage them to sing along'
        },
        {
          title: 'Country-Nationality Matching',
          duration: '10 minutes',
          description: 'Divide the class into pairs for matching activity.',
          instructions: [
            'Give each pair cards with country names and nationalities',
            'Have them match countries with the correct nationalities',
            'Check answers as a class'
          ]
        },
        {
          title: 'Flag Identification',
          duration: '7 minutes',
          description: 'Show students various country flags and have them identify the country and nationality.'
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the "Where Are You From? - Wordwall" game as a class activity to reinforce country and nationality vocabulary.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of country names and nationality forms. Check students\' ability to match countries with their nationalities.',
      homeworkIdeas: [
        'Draw and color three country flags and write the country name and nationality for each',
        'Write a list of five countries you would like to visit and why'
      ]
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn to ask and answer "Where are you from?"',
        'Practice saying "I am from [country]. I am [nationality]."',
        'Create a class map of nationalities'
      ],
      materials: [
        'Visual English Book 2 Unit 17 slides',
        'Nationality rap video',
        'World map',
        'Small flags or flag stickers',
        'Nationality wordwall games'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of country and nationality vocabulary using flashcards or by singing one of the nationality songs again.'
        },
        {
          title: 'Dialogue Introduction',
          duration: '8 minutes',
          description: 'Teach conversation patterns for discussing nationality.',
          instructions: [
            'Introduce "Where are you from?"',
            'Practice "I am from [country]. I am [nationality]."',
            'Model with several examples using the world map'
          ]
        },
        {
          title: 'Nationality Rap',
          duration: '7 minutes',
          description: 'Use the "What\'s Your Nationality?" rap video to reinforce question-answer patterns.',
          teacherNotes: 'Have students listen first, then play again with focus on the language patterns'
        },
        {
          title: 'Interview Activity',
          duration: '10 minutes',
          description: 'Role-play conversations about nationality.',
          instructions: [
            'Give students identities from different countries',
            'Have them mingle asking "Where are you from?"',
            'Students respond with their assigned identities'
          ]
        },
        {
          title: 'Class Nationality Map',
          duration: '10 minutes',
          description: 'Create a visual representation of students\'s chosen nationalities on a world map.'
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play the "Countries and Nationalities" Wordwall game to assess and reinforce learning.'
        }
      ],
      assessmentTips: 'Observe students\' ability to ask and respond to "Where are you from?" correctly. Check for proper pronunciation of country names and nationalities.',
      homeworkIdeas: [
        'Interview a family member about which countries they have visited or would like to visit',
        'Create a "passport" with information about yourself, including your pretend nationality'
      ],
      additionalResources: [
        {
          title: "What is your Nationality? Song",
          url: 'https://www.youtube.com/watch?v=LIUWCSD11MM'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit17Resources,
  generateUnit17LessonPlans
};