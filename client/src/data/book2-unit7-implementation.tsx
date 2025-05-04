/**
 * Visual English Book 2, Unit 7: WHAT DO YOU WANT TO BE
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit7Resources } from './book2-unit7-resources';

// Function to get resources for this unit
export function getBook2Unit7Resources(): TeacherResource[] {
  return book2Unit7Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit7LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit7-lesson1',
      title: 'Jobs and Occupations - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common jobs and occupations',
        'Students will practice asking and answering "What do you want to be?"',
        'Students will be able to name and describe at least 10 different jobs'
      ],
      materials: [
        'Visual English Book 2 Unit 7 slides',
        'Jobs flashcards',
        'Jobs Song - Dream English video',
        'Wordwall games about jobs'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show students pictures of people in different occupations and ask them to guess what job each person has.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce job vocabulary with flashcards. Show each card, say the job name, and have students repeat. Write job names on the board.'
        },
        {
          title: 'Jobs Song',
          duration: '8 minutes',
          description: 'Play the "Jobs Song - Dream English" video. First, have students listen, then play it again and encourage them to sing along. Point to job names on the board as they appear in the song.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 7 slides showing different jobs and occupations. For each slide, ask "What does he/she want to be?" and guide students to answer with "He/She wants to be a/an..."'
        },
        {
          title: 'Practice Dialogue',
          duration: '10 minutes',
          description: 'Model a dialogue: "What do you want to be?" "I want to be a doctor." Then pair students to practice the dialogue with different occupations.'
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play a quick Wordwall game about jobs to reinforce vocabulary learned in the lesson.'
        }
      ],
      assessmentTips: 'Listen for correct pronunciation of job names and proper sentence structure when answering "What do you want to be?"',
      homeworkIdeas: [
        'Draw a picture of what you want to be when you grow up',
        'Complete a job vocabulary worksheet'
      ]
    },
    {
      id: 'book2-unit7-lesson2',
      title: 'Jobs and Occupations - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will deepen their understanding of job vocabulary',
        'Students will practice describing what people do in different jobs',
        'Students will perform a short role-play about different occupations'
      ],
      materials: [
        'Visual English Book 2 Unit 7 slides',
        'Jobs ESL Classroom Game - Telepathy Game video',
        'Props or small costume items for different jobs (optional)',
        'Jobs Wordwall games'
      ],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of job vocabulary using flashcards or by singing the Jobs Song again.'
        },
        {
          title: 'Job Actions',
          duration: '10 minutes',
          description: 'Teach verbs associated with different jobs (e.g., "A doctor helps sick people", "A teacher teaches students"). Model an action for each job and have students guess the occupation.'
        },
        {
          title: 'Telepathy Game',
          duration: '10 minutes',
          description: 'Play the "Jobs ESL Classroom Game - Telepathy Game" video and have students participate by guessing the jobs shown.'
        },
        {
          title: 'Job Role-plays',
          duration: '12 minutes',
          description: 'Divide students into small groups. Each group chooses a job and prepares a short role-play demonstrating what people with that job do. Other students guess the occupation.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall job games from the Unit 7 resources to reinforce vocabulary and job descriptions.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Ask each student to share what they want to be when they grow up and why they chose that job.'
        }
      ],
      assessmentTips: 'Observe students\'s participation in role-plays and their ability to correctly name and describe jobs.',
      homeworkIdeas: [
        'Interview a family member about their job',
        'Research and write 3 sentences about an interesting job'
      ],
      additionalResources: [
        {
          title: 'Jobs Song - Dream English',
          url: 'https://www.youtube.com/watch?v=2nesqKP9-5c'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit7Resources,
  generateUnit7LessonPlans
};