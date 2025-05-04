// Implementation file for Book 2 Unit 4 (WEATHER)

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit4Resources } from './book2-unit4-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_UNIT_TITLES } from './book2-resources-common';

// Define lesson plans directly in the implementation file
const weatherVocabularyLessonPlan: LessonPlan = {
  id: 'book2-unit4-weather-vocabulary-lesson',
  title: 'Weather Vocabulary',
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
      duration: '5-10 minutes',
      description: 'Introduce weather vocabulary with visual aids',
      instructions: ['Show images of various weather conditions', 'Ask students about today\'s weather', 'Build initial vocabulary list']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Present key weather vocabulary',
      materials: ['Weather flashcards', 'Visual English slides'],
      instructions: ['Present weather vocabulary with images', 'Practice pronunciation of weather terms', 'Have students repeat and mimic weather conditions']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive weather vocabulary activities',
      materials: ['Wordwall games', 'Weather chart worksheet'],
      instructions: ['Have students match weather terms with images', 'Complete vocabulary games', 'Practice asking "What\'s the weather like today?" in pairs']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Weather report role-play',
      instructions: ['Students create simple weather reports', 'Present weather forecasts to the class', 'Connect weather conditions with appropriate clothing']
    }
  ],
  assessmentTips: 'Monitor accurate use of weather vocabulary. Check comprehension of weather-related questions. Evaluate fluency in weather report presentations.',
  homeworkIdeas: [
    'Create a weekly weather chart for their hometown',
    'Draw and label different weather conditions',
    'Complete a weather vocabulary worksheet'
  ],
  additionalResources: [
    {
      title: 'Teaching note: Use weather apps or websites to show real-time weather in different locations around the world.'
    }
  ]
};

const weatherAndClothingLessonPlan: LessonPlan = {
  id: 'book2-unit4-weather-clothing-lesson',
  title: 'Weather and Clothing',
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
      description: 'Quick review of weather vocabulary',
      instructions: ['Review weather vocabulary from previous lesson', 'Connect to today\'s topic of clothing choices']
    },
    {
      title: 'Weather and Clothing Connections',
      duration: '15 minutes',
      description: 'Present clothing items appropriate for different weather',
      materials: ['Clothing flashcards', 'Weather cards', 'Visual English slides'],
      instructions: ['Present clothing vocabulary', 'Match clothing items to weather conditions', 'Ask "What do you wear when it\'s...?"']
    },
    {
      title: 'Paper Doll Activity',
      duration: '15 minutes',
      description: 'Dress paper dolls for different weather conditions',
      materials: ['Paper dolls', 'Clothing cutouts'],
      instructions: ['Distribute paper dolls and clothing options', 'Call out weather conditions', 'Students dress dolls appropriately and explain their choices']
    },
    {
      title: 'Weather Forecast Role-play',
      duration: '10 minutes',
      description: 'Create and present weather forecasts with clothing advice',
      instructions: ['Students work in pairs to create mini weather forecasts', 'Include clothing recommendations', 'Present to the class']
    }
  ],
  assessmentTips: 'Evaluate appropriate matching of clothing to weather conditions. Check comprehension of clothing vocabulary. Monitor proper use of weather-related expressions.',
  homeworkIdeas: [
    'Create a picture dictionary of weather and clothing',
    'Draw outfits for different weather conditions',
    'Write a short weather forecast with clothing advice'
  ],
  additionalResources: [
    {
      title: 'Teaching note: For more advanced students, discuss seasonal clothing and regional weather differences.'
    }
  ]
};

// Function to get resources for this unit
export const getBook2Unit4Resources = (): TeacherResource[] => book2Unit4Resources;

// Function to get lesson plans for this unit
export const generateUnit4LessonPlans = (): LessonPlan[] => {
  return [
    weatherVocabularyLessonPlan,
    weatherAndClothingLessonPlan
  ];
};
