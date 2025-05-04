/**
 * Visual English Book 2, Unit 4: WEATHER
 * Implementation file for unit resources and lesson plans
 * 
 * Note: This unit handles slides without questions by leaving them blank
 */

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit4Resources } from './book2-unit4-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '4';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit4Resources = (): TeacherResource[] => book2Unit4Resources;

// Generate lesson plans for this unit (formatted to match Book 2 Unit 13 structure)
export const generateUnit4LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        'Learn vocabulary related to different weather conditions',
        'Practice asking and answering about weather conditions',
        'Connect weather vocabulary with appropriate clothing items'
      ],
      materials: [
        'Visual English Book 2 Unit 4 slides',
        'Weather flashcards',
        'Weather chart'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduce weather vocabulary with visual aids',
          instructions: [
            'Show images of various weather conditions',
            'Ask students about today\'s weather',
            'Build initial vocabulary list'
          ]
        },
        {
          title: 'Vocabulary Presentation',
          duration: '10 minutes',
          description: 'Present key weather vocabulary',
          instructions: [
            'Present weather vocabulary with images',
            'Practice pronunciation of weather terms',
            'Have students repeat and mimic weather conditions'
          ]
        },
        {
          title: 'Weather Questions',
          duration: '8 minutes',
          description: 'Teach "What\'s the weather like today?" and example responses',
          teacherNotes: 'Model different weather responses: "It\'s sunny/rainy/windy/cloudy/snowy"'
        },
        {
          title: 'Weather Patterns',
          duration: '7 minutes',
          description: 'Discuss weather patterns across seasons and locations.'
        },
        {
          title: 'Practice Activities',
          duration: '10 minutes',
          description: 'Interactive weather vocabulary activities',
          instructions: [
            'Have students match weather terms with images',
            'Complete vocabulary games',
            'Practice asking "What\'s the weather like today?" in pairs'
          ]
        },
        {
          title: 'Weather Report',
          duration: '5 minutes',
          description: 'Students create simple weather reports describing current and tomorrow\'s weather.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key weather vocabulary and phrases learned in the lesson.'
        }
      ],
      assessmentTips: 'Monitor accurate use of weather vocabulary. Check comprehension of weather-related questions. Evaluate fluency in weather report presentations.',
      homeworkIdeas: [
        'Create a weekly weather chart for their hometown',
        'Draw and label different weather conditions',
        'Complete a weather vocabulary worksheet'
      ]
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        'Connect weather conditions with appropriate clothing choices',
        'Practice clothing vocabulary in context of weather',
        'Develop decision-making skills about what to wear'
      ],
      materials: [
        'Visual English Book 2 Unit 4 slides',
        'Clothing and weather flashcards',
        'Paper dolls with clothing options'
      ],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of weather vocabulary from previous lesson.'
        },
        {
          title: 'Weather and Clothing Connection',
          duration: '10 minutes',
          description: 'Present clothing items appropriate for different weather conditions.',
          instructions: [
            'Present clothing vocabulary',
            'Match clothing items to weather conditions',
            'Ask "What do you wear when it\'s...?"'
          ]
        },
        {
          title: 'Seasonal Clothing',
          duration: '8 minutes',
          description: 'Discuss how clothing changes with each season.',
          teacherNotes: 'Focus on winter vs. summer clothing differences'
        },
        {
          title: 'Paper Doll Activity',
          duration: '10 minutes',
          description: 'Dress paper dolls for different weather conditions.',
          instructions: [
            'Distribute paper dolls and clothing options',
            'Call out weather conditions',
            'Students dress dolls appropriately and explain their choices'
          ]
        },
        {
          title: 'Weather Forecast Role-play',
          duration: '7 minutes',
          description: 'Create and present weather forecasts with clothing advice.',
          instructions: [
            'Students work in pairs to create mini weather forecasts',
            'Include clothing recommendations for the forecast'
          ]
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play "What\'s the Weather" wordwall game to reinforce vocabulary.'
        }
      ],
      assessmentTips: 'Evaluate appropriate matching of clothing to weather conditions. Check comprehension of clothing vocabulary. Monitor proper use of weather-related expressions.',
      homeworkIdeas: [
        'Create a picture dictionary of weather and clothing',
        'Draw outfits for different weather conditions',
        'Write a short weather forecast with clothing advice'
      ]
    }
  ];
};

export default {
  getBook2Unit4Resources,
  generateUnit4LessonPlans
};

