/**
 * Visual English Book 4, Unit 16 - FREE TIME ACTIVITIES
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit16-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit16Resources(): TeacherResource[] {
  return resources;
}

// Function with standardized name for component compatibility
export function getTeacherResources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
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
        'Students will learn vocabulary related to free time activities',
        'Students will identify different hobbies and pastimes',
        'Students will practice talking about what they like to do in their free time'
      ],
      materials: ['Hobby flashcards', 'Free time activity worksheet', 'Like/dislike cards'],
      steps: [
        {
          title: 'Warm-up Discussion',
          duration: '5 minutes',
          description: 'Begin with a discussion about free time',
          instructions: ['Ask students what they like to do after school', 'Discuss the concept of "free time" and "hobbies"']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present free time activity vocabulary with visual aids',
          materials: ['Hobby flashcards'],
          instructions: [
            'Introduce vocabulary: playing sports, reading books, watching TV, playing video games, etc.',
            'Have students repeat new words and match them to images',
            'Watch the Free Time Activities Video'
          ]
        },
        {
          title: 'Like/Dislike Expressions',
          duration: '10 minutes',
          description: 'Learn expressions for talking about preferences',
          materials: ['Like/dislike cards'],
          instructions: [
            'Teach phrases: "I like...", "I love...", "I don\'t like...", "I hate..."',
            'Demonstrate using these phrases with free time activities',
            'Have students practice the expressions with different activities'
          ]
        },
        {
          title: 'Guided Practice Activity',
          duration: '10 minutes',
          description: 'Practice talking about free time activities',
          materials: ['Free time activity worksheet'],
          instructions: [
            'Distribute worksheets with images of various activities',
            'Students write sentences about which activities they like/dislike',
            'Have students share their sentences with partners'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Review free time vocabulary with interactive game',
          instructions: [
            'Play the Free Time Activities Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use free time vocabulary correctly and express preferences',
      homeworkIdeas: ['Create a poster showing your top 5 favorite free time activities', 'Write 5 sentences about what you like to do on weekends']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn to ask questions about free time activities',
        'Students will practice frequency expressions with hobbies',
        'Students will create a class survey about free time preferences'
      ],
      materials: ['Question prompt cards', 'Frequency expression cards', 'Free time survey template'],
      steps: [
        {
          title: 'Review Activity',
          duration: '5 minutes',
          description: 'Review previously learned free time vocabulary',
          instructions: ['Quiz students on free time vocabulary', 'Have students recall activities from the previous lesson']
        },
        {
          title: 'Question Formation',
          duration: '10 minutes',
          description: 'Practice forming questions about free time activities',
          materials: ['Question prompt cards'],
          instructions: [
            'Teach question patterns: "Do you like...?", "What do you do in your free time?"',
            'Model asking and answering questions about free time activities',
            'Have students practice asking and answering in pairs'
          ]
        },
        {
          title: 'Frequency Expressions',
          duration: '10 minutes',
          description: 'Learn expressions for how often activities are done',
          materials: ['Frequency expression cards'],
          instructions: [
            'Introduce frequency expressions: always, usually, sometimes, never, etc.',
            'Model sentences: "I always play soccer on Saturdays. I never watch horror movies."',
            'Have students create sentences using frequency expressions and free time activities'
          ]
        },
        {
          title: 'Class Survey Activity',
          duration: '15 minutes',
          description: 'Conduct a survey about free time preferences',
          materials: ['Free time survey template'],
          instructions: [
            'Distribute survey templates with questions about free time activities',
            'Students circulate and ask classmates questions',
            'Students record answers and frequency information',
            'Discuss results as a class: "Most students like playing video games"'
          ]
        },
        {
          title: 'Interactive Match Game',
          duration: '5 minutes',
          description: 'Practice matching free time vocabulary with images',
          instructions: [
            'Play the Free Time Activities Match Wordwall game',
            'Review key vocabulary and phrases from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to ask and answer questions about free time activities and use frequency expressions correctly',
      homeworkIdeas: ['Interview a family member about their free time activities', 'Create a weekly schedule showing your free time activities and how often you do them']
    }
  ];
};

// Legacy function for compatibility with TeacherResources component
export function convertLegacyLessonPlan(resource: TeacherResource): LessonPlan {
  return {
    id: resource.id || '',
    title: resource.title || '',
    duration: resource.lessonPlan?.duration || '45 minutes',
    level: resource.lessonPlan?.level || 'Elementary to Pre-Intermediate',
    objectives: resource.lessonPlan?.objectives || [],
    materials: resource.lessonPlan?.materials || [],
    steps: resource.lessonPlan?.steps || [],
    assessmentTips: resource.lessonPlan?.assessmentTips || '',
    homeworkIdeas: resource.lessonPlan?.homeworkIdeas || []
  };
}

// Function to get lesson plans (for backward compatibility)
export function getBook4Unit16LessonPlans(): LessonPlan[] {
  return generateBook4Unit16LessonPlans();
}

// Function with standardized name for component compatibility
export function getUnitLessonPlans(): LessonPlan[] {
  return generateBook4Unit16LessonPlans();
}