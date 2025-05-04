/**
 * Visual English Book 2, Unit 2: IN THE CLASSROOM
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit2Resources } from './book2-resources';

// Function to get resources for this unit
export function getBook2Unit2Resources(): TeacherResource[] {
  return book2Unit2Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit2LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit2-lesson1',
      title: 'Classroom Objects - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common classroom objects',
        'Students will be able to identify classroom objects by name',
        'Students will ask and answer simple questions about classroom objects'
      ],
      materials: [
        'Visual English Book 2 Unit 2 slides',
        'Real classroom objects (pencil, pen, book, etc.)',
        'Video: Magic Classroom Objects - WATTS ENGLISH',
        'Worksheets with classroom object pictures'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin by showing various classroom objects and asking students if they know what they are called in English.'
        },
        {
          title: 'Introducing Classroom Objects',
          duration: '10 minutes',
          description: 'Hold up real classroom objects one by one. Say the name clearly and have students repeat. Write each word on the board.'
        },
        {
          title: 'Magic Classroom Objects Video',
          duration: '8 minutes',
          description: 'Play the "Magic Classroom Objects" video. First, have students watch, then play it again and encourage them to name the objects.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 2 slides showing different classroom objects and related activities.'
        },
        {
          title: '"What\'s This?" Practice',
          duration: '10 minutes',
          description: 'Model the question "What\'s this?" and answer "It\'s a pencil." Have students practice in pairs asking about different objects.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Play a quick game of "I Spy" using classroom objects. "I spy with my little eye something that is blue and we write with it."'
        }
      ],
      assessmentTips: 'Observe students\'s participation in naming activities and pair work. Check worksheet completion.',
      homeworkIdeas: [
        'Complete a classroom objects worksheet',
        'Draw and label 5 objects in your classroom'
      ]
    },
    {
      id: 'book2-unit2-lesson2',
      title: 'Classroom Objects - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will practice using classroom vocabulary in context',
        'Students will learn possessive forms with classroom objects',
        'Students will develop reading and writing skills with classroom vocabulary'
      ],
      materials: [
        'Visual English Book 2 Unit 2 slides',
        'Flashcards with classroom objects',
        'Wordwall online games from Unit 2 resources',
        'Worksheet with classroom scenes'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Quick review of classroom objects vocabulary with flashcards. Ask students to name objects you point to around the classroom.'
        },
        {
          title: 'Possessive Practice',
          duration: '12 minutes',
          description: 'Teach the phrases "This is my/your/his/her pencil." Model exchanges with students, then have them practice in pairs.'
        },
        {
          title: 'Classroom Scavenger Hunt',
          duration: '10 minutes',
          description: 'Give students a list of classroom objects to find. They must locate them and write a sentence about each one ("This is a pen. It is blue.").'
        },
        {
          title: 'Interactive Game',
          duration: '12 minutes',
          description: 'Use one of the Wordwall games from the Unit 2 resources to reinforce classroom vocabulary in a fun way.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Students write 3 sentences about classroom objects they have in their bag or desk.'
        }
      ],
      assessmentTips: 'Check scavenger hunt answers and sentences written during closure activity.',
      homeworkIdeas: [
        'Write 5 sentences about objects in your home using possessives',
        'Create a labeled drawing of your dream classroom'
      ],
      additionalResources: [
        {
          title: 'Magic Classroom Objects - WATTS ENGLISH',
          url: 'https://www.youtube.com/watch?v=XhKs634Y6KE'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit2Resources,
  generateUnit2LessonPlans
};
