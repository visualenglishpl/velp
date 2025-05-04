/**
 * Visual English Book 2, Unit 3: WHAT IS YOUR TELEPHONE NUMBERS 1-20
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit3Resources } from './book2-unit3-resources';

// Function to get resources for this unit
export function getBook2Unit3Resources(): TeacherResource[] {
  return book2Unit3Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit3LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit3-lesson1',
      title: 'Numbers 1-20 - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn numbers 1-20',
        'Students will be able to count from 1 to 20',
        'Students will recognize written and spoken forms of numbers 1-20'
      ],
      materials: [
        'Visual English Book 2 Unit 3 slides',
        'Number cards 1-20',
        'Video: Learn to Count 1 to 10 with Number Zoo',
        'Video: Learn to Count 10 to 20 with Number Zoo',
        'Worksheets with number activities'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin class by counting together from 1 to 10. Ask students if they can go further.'
        },
        {
          title: 'Introducing Numbers 1-10',
          duration: '8 minutes',
          description: 'Show number cards 1-10. Say each number clearly and have students repeat. Write each number on the board.'
        },
        {
          title: 'Number Zoo Video 1-10',
          duration: '7 minutes',
          description: 'Play the "Learn to Count 1 to 10 with Number Zoo" video. First, have students listen, then play again and encourage them to count along.'
        },
        {
          title: 'Introducing Numbers 11-20',
          duration: '8 minutes',
          description: 'Show number cards 11-20. Say each number clearly and have students repeat. Write each number on the board.'
        },
        {
          title: 'Number Zoo Video 10-20',
          duration: '7 minutes',
          description: 'Play the "Learn to Count 10 to 20 with Number Zoo" video. First, have students listen, then play again and encourage them to count along.'
        },
        {
          title: 'Count and Touch',
          duration: '8 minutes',
          description: 'Ask students to count and touch objects in the classroom (e.g., "Count 5 pencils", "Touch 8 chairs").'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Play a quick counting game: students count from 1 to 20, and clap on multiples of 5.'
        }
      ],
      assessmentTips: 'Observe students\'s participation in counting activities. Check ability to identify numbers when shown randomly.',
      homeworkIdeas: [
        'Complete a numbers 1-20 worksheet',
        'Practice writing numbers in words'
      ]
    },
    {
      id: 'book2-unit3-lesson2',
      title: 'Telephone Numbers - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn to ask and say telephone numbers',
        'Students will practice numbers in real-life context',
        'Students will develop listening skills with numbers'
      ],
      materials: [
        'Visual English Book 2 Unit 3 slides',
        'Video: What\'s Your Telephone Number',
        'Wordwall online games from Unit 3 resources',
        'Toy telephones or telephone number cards'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Quick review of numbers 1-20. Ask students to count forwards and backwards.'
        },
        {
          title: 'Telephone Number Song',
          duration: '8 minutes',
          description: 'Play the "What\'s Your Telephone Number" video. Discuss how telephone numbers are spoken (often in pairs or individually).'
        },
        {
          title: 'Telephone Number Practice',
          duration: '12 minutes',
          description: 'Model the question "What\'s your telephone number?" and answer with a made-up number. Have students practice in pairs using toy phones or number cards.'
        },
        {
          title: 'Telephone Directory',
          duration: '10 minutes',
          description: 'Students create a simple telephone directory with classmates\' names and made-up telephone numbers.'
        },
        {
          title: 'Interactive Numbers Game',
          duration: '8 minutes',
          description: 'Use one of the Wordwall games from the Unit 3 resources to practice numbers 1-20 in a fun way.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Students play "Telephone Number Whispers" - whisper a number to the first student who passes it along. Last student says it aloud.'
        }
      ],
      assessmentTips: 'Observe participation in telephone role-plays. Check number recognition in games.',
      homeworkIdeas: [
        'Write and practice reading phone numbers',
        'Create number flashcards 1-20'
      ],
      additionalResources: [
        {
          title: 'Learn to Count 1 to 10 with Number Zoo',
          url: 'https://www.youtube.com/watch?v=nsDanlM8_3c'
        },
        {
          title: 'What\'s Your Telephone Number',
          url: 'https://www.youtube.com/watch?v=HEym20_e84M'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit3Resources,
  generateUnit3LessonPlans
};
