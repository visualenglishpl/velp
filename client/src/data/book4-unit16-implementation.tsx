/**
 * Visual English Book 4, Unit 16 - FREE TIME ACTIVITIES
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit16-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit16Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on the standard template
export function generateBook4Unit16LessonPlans(): LessonPlan[] {
  const unitNumber = '16';
  const unitTitle = 'FREE TIME ACTIVITIES';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to hobbies and free time activities',
        'Students will practice talking about what they like to do in their free time',
        'Students will identify and describe various leisure activities'
      ],
      materials: ['Flashcards with free time activities', 'Pictures of hobbies', 'Interactive board'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to free time activities vocabulary',
          instructions: ['Show students pictures of people doing different hobbies', 'Ask what they like to do in their free time']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '15 minutes',
          description: 'Teach vocabulary for common hobbies and free time activities',
          materials: ['Flashcards with free time activities'],
          instructions: [
            'Show flashcards one by one: reading, swimming, playing sports, watching TV, etc.',
            'Introduce each activity and discuss when people do these activities',
            'Practice pronunciation of new vocabulary',
            'Watch the Free Time Activities Video'
          ]
        },
        {
          title: 'Practice Activity',
          duration: '15 minutes',
          description: 'Free time activities survey',
          instructions: [
            'Students create a simple survey sheet with 5 free time activities',
            'Students ask classmates "Do you like...?" and record answers',
            'Students report back: "Maria likes swimming but she doesn\'t like playing video games."'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Play the Free Time Activities Game from Wordwall',
          instructions: [
            'Open the Free Time Activities Game on the interactive board',
            'Students take turns matching activities to pictures',
            'Discuss any challenging vocabulary'
          ]
        },
        {
          title: 'Plenary',
          duration: '5 minutes',
          description: 'Review of key vocabulary through quick quiz',
          instructions: [
            'Show hobby pictures and have students express them using "I like..."',
            'Review any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Students can correctly identify and talk about free time activities using appropriate vocabulary.',
      homeworkIdeas: ['Write about your favorite hobby', 'Complete free time activities matching worksheet']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn to express preferences about free time activities',
        'Students will practice using "like" and "don\'t like" with different activities',
        'Students will create a class graph showing favorite free time activities'
      ],
      materials: ['Chart paper for preference graph', 'Free time activity cards', 'Art supplies'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review free time activities vocabulary from previous lesson.',
          instructions: ['Show pictures of activities and have students name them']
        },
        {
          title: 'Expressing Preferences',
          duration: '15 minutes',
          description: 'Practice expressing likes and dislikes for different activities',
          materials: ['Free time activity cards'],
          instructions: [
            'Introduce structures: "I like...", "I don\'t like...", "I prefer...", "I enjoy..."',
            'Students practice in pairs using activity cards',
            'Play "Find Someone Who Likes" game where students circulate asking about preferences',
            'Share findings with the class'
          ]
        },
        {
          title: 'Collaborative Activity',
          duration: '15 minutes',
          description: 'Create a Class Activity Preference Graph',
          materials: ['Chart paper for preference graph', 'Art supplies'],
          instructions: [
            'Select 8-10 common free time activities',
            'Create a bar graph on chart paper',
            'Each student adds their vote for their favorite activity',
            'Class discusses the results and identifies most/least popular activities',
            'Students write sentences about the graph: "Most students like..."'
          ]
        },
        {
          title: 'Plenary',
          duration: '10 minutes',
          description: 'Review activity with interactive game',
          instructions: [
            'Play the Free Time Activities Match Wordwall game',
            'Discuss cultural differences in free time activities around the world',
            'Address any remaining questions'
          ]
        }
      ],
      assessmentTips: 'Students can correctly express preferences about free time activities and understand other\'s preferences.',
      homeworkIdeas: ['Interview family members about their favorite free time activities', 'Create a weekly schedule showing when you do different free time activities']
    }
  ];
};

// Generate lesson plans for this unit
const lessonPlans = generateBook4Unit16LessonPlans();

// Direct exports for consistent importing
export const unitResources = resources;
export { lessonPlans };

// Getter functions for backward compatibility
export const getBook4Unit16LessonPlans = (): LessonPlan[] => lessonPlans;