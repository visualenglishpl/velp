// Implementation file for Book 0a Unit 12

import { TeacherResource } from '@/components/TeacherResources';
import { resources } from './book0a-unit12-resources';

import { LessonPlan } from '@/components/LessonPlanTemplate';

// Lesson plans for Unit 12
const vocabularyLessonPlan: LessonPlan = {
  id: `book0a-unit12-vocabulary-lesson`,
  title: `VISUAL 0A Unit 12 - Vocabulary Development`,
  duration: '45 minutes',
  level: 'Beginner',
  objectives: [
    'Learn key vocabulary related to the unit theme',
    'Practice using new vocabulary in context',
    'Develop listening and speaking skills'
  ],
  materials: [
    `VISUAL 0A Unit 12 slides`,
    'Wordwall vocabulary games',
    'Flashcards and handouts'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: 'Introduce theme with visual aids',
      instructions: ['Show unit theme visuals', 'Ask eliciting questions', 'Build interest in the topic']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Use slides to present new words',
      materials: ['Visual English slides', 'Vocabulary list handout'],
      instructions: ['Present new vocabulary items', 'Model pronunciation', 'Have students repeat', 'Explain meanings with visuals']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive Wordwall games',
      materials: ['Wordwall game access', 'Devices for access'],
      instructions: ['Demonstrate game access', 'Have students play in pairs or small groups', 'Monitor and assist as needed']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Role-play or conversation activity',
      instructions: ['Assign conversation scenarios', 'Have students practice in pairs', 'Ask volunteers to present']
    }
  ],
  assessmentTips: 'Observe student participation in activities. Check vocabulary recognition through game scores. Evaluate pronunciation and usage during production activities.',
  homeworkIdeas: [
    'Create a mini-project related to the unit theme',
    'Research and present additional vocabulary in the topic area',
    'Complete online practice activities'
  ]
};

const activitiesLessonPlan: LessonPlan = {
  id: `book0a-unit12-activities-lesson`,
  title: `VISUAL 0A Unit 12 - Interactive Activities`,
  duration: '45 minutes',
  level: 'Beginner',
  objectives: [
    'Practice using vocabulary in fun, interactive activities',
    'Develop communication skills through games',
    'Build confidence in using new language'
  ],
  materials: [
    `VISUAL 0A Unit 12 slides`,
    'Video resources',
    'Game materials'
  ],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of previous vocabulary',
      instructions: ['Ask questions using vocabulary from previous lesson', 'Elicit responses from students']
    },
    {
      title: 'Video Activity',
      duration: '15 minutes',
      description: 'Watch thematic video and complete tasks',
      materials: ['Unit video', 'Activity worksheet'],
      instructions: ['Play the video', 'Students complete worksheet activities', 'Review answers as a class']
    },
    {
      title: 'Interactive Games',
      duration: '15 minutes',
      description: 'Play vocabulary reinforcement games',
      materials: ['Wordwall games', 'Game materials'],
      instructions: ['Explain game rules', 'Organize students into teams', 'Conduct games with supervision']
    },
    {
      title: 'Wrap-up Activity',
      duration: '10 minutes',
      description: 'Consolidation activity',
      instructions: ['Students create a mind map of vocabulary', 'Share with partners', 'Class discussion of key concepts']
    }
  ],
  assessmentTips: 'Monitor participation in games. Check understanding through worksheet answers. Assess vocabulary usage in mind maps.',
  homeworkIdeas: [
    'Complete related online games',
    'Watch additional thematic videos',
    'Create personal vocabulary flashcards'
  ]
};

// Export lesson plans for this unit
export const lessonPlans = [vocabularyLessonPlan, activitiesLessonPlan];

// Function to get lesson plans for this unit
export const getBook0aUnit12LessonPlans = () => lessonPlans;

// Function to get resources for this unit
export const getBook0aUnit12Resources = (): TeacherResource[] => resources;
