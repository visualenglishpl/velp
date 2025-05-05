// Implementation file for Book 3 Unit 7 (Solar System)

import type { TeacherResource } from '../components/TeacherResources';
import type { LessonPlan } from '../components/LessonPlanTemplate';
import book3Unit7SolarResources from './book3-unit7-solar-resources';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '7';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'THE SOLAR SYSTEM';

// Redirect to the Solar System version of Unit 7
export const getBook3Unit7Resources = (): TeacherResource[] => book3Unit7SolarResources;

// Export additional getter for solar resources
export const getBook3Unit7SolarResources = (): TeacherResource[] => book3Unit7SolarResources;

// Generate specific lesson plans for this unit
export function generateBook3Unit7LessonPlans(): LessonPlan[] {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to the solar system', 'Identify and name planets in order', 'Understand basic features of planets'],
      materials: ['Planet flashcards', 'Solar system poster', 'Small planet models or balls', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students what they know about space and our solar system. Write responses on board.'
        },
        {
          title: 'Solar System Introduction',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to the solar system using flashcards and visual aids.',
          instructions: [
            'Show images of the sun, planets, stars, moon, etc.',
            'Have students repeat each word and practice pronunciation.'
          ]
        },
        {
          title: 'Planet Order Song',
          duration: '8 minutes',
          description: 'Play the Planets Song video and have students sing along.',
          teacherNotes: 'Use the "Planets Song - Solar System Song" from the resources. Encourage students to memorize the order.'
        },
        {
          title: 'Planet Characteristics',
          duration: '10 minutes',
          description: 'Discuss basic features of each planet using simple sentences.',
          instructions: [
            'Mercury is small and hot.',
            'Jupiter is very big.',
            'Saturn has rings.',
            'Earth has water.'
          ]
        },
        {
          title: 'Human Solar System',
          duration: '7 minutes',
          description: 'Create a human model of the solar system in class.',
          instructions: [
            'Assign students to be different planets and the sun.',
            'Have them stand in the correct order and orbit around the "sun".'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review planet names and order with a quick quiz game.'
        }
      ],
      assessmentTips: 'Check for proper pronunciation of planet names and basic understanding of their order from the sun.',
      homeworkIdeas: ['Draw and label the planets in their correct order.', 'Create a fact card about your favorite planet.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare sizes and features of planets', 'Use adjectives to describe planets', 'Create a solar system model'],
      materials: ['Planet size comparison chart', 'Art supplies', 'Paper plates or cardboard circles', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review planet names with a quick game of planet charades.'
        },
        {
          title: 'Planet Comparisons',
          duration: '8 minutes',
          description: 'Teach comparison adjectives using planets as examples.',
          instructions: [
            'Jupiter is bigger than Earth.',
            'Mercury is closer to the Sun than Venus.',
            'Neptune is farther from the Sun than Uranus.'
          ]
        },
        {
          title: 'Size Comparison Video',
          duration: '7 minutes',
          description: 'Watch the "Planets & Stars Size Comparison" video.',
          teacherNotes: 'Pause at key moments to emphasize the vast differences in size.'
        },
        {
          title: 'Planet Description Practice',
          duration: '10 minutes',
          description: 'Students work in pairs to create sentences describing and comparing planets.',
          instructions: [
            'Provide sentence frames such as "_______ is bigger/smaller than _______"',
            'Have students share their sentences with the class.'
          ]
        },
        {
          title: 'Solar System Craft',
          duration: '10 minutes',
          description: 'Students create a simple solar system model.',
          instructions: [
            'Use different-sized paper circles to represent planets.',
            'Have students arrange and glue them in the correct order.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students present their solar system models and describe at least one planet using a comparison.'
        }
      ],
      assessmentTips: 'Evaluate correct use of comparison adjectives and understanding of relative planet sizes and positions.',
      homeworkIdeas: ['Research and write three interesting facts about Mars or Jupiter.', 'Complete a planets vocabulary worksheet.']
    }
  ];
}

// Export additional getter for solar lesson plans
export const generateBook3Unit7SolarLessonPlans = generateBook3Unit7LessonPlans;
