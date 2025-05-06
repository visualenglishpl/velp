/**
 * Visual English Book 4, Unit 10 - DIGITAL TECHNOLOGY
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit10-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit10Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
export function generateBook4Unit10LessonPlans(): LessonPlan[] {
  const unitNumber = '10';
  const unitTitle = 'DIGITAL TECHNOLOGY';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn essential digital technology vocabulary',
        'Students will understand basic computer components and their functions',
        'Students will develop conversation skills related to technology'
      ],
      materials: ['Technology flashcards', 'Computer device images', 'Technology vocabulary worksheet'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about technology experiences',
          instructions: ['Ask students what technology devices they use', 'Discuss how technology helps in daily life']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential technology vocabulary with visual aids',
          materials: ['Technology flashcards'],
          instructions: [
            'Show pictures of computer, smartphone, tablet, keyboard, mouse, etc.',
            'Have students repeat new words and match them to images',
            'Watch the Introduction to Digital Technology video'
          ]
        },
        {
          title: 'Device Components Activity',
          duration: '15 minutes',
          description: 'Practice identifying computer components and their functions',
          materials: ['Computer device images'],
          instructions: [
            'Divide students into pairs',
            'Distribute images of various devices and their components',
            'Have students match components to their functions'
          ]
        },
        {
          title: 'Technology in Daily Life',
          duration: '10 minutes',
          description: 'Discuss how we use technology in everyday situations',
          instructions: [
            'Present different scenarios (work, school, home)',
            'Ask students to describe what technology they would use in each situation'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '5 minutes',
          description: 'Review key vocabulary with interactive game',
          instructions: [
            'Play the Technology Vocabulary Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\'s vocabulary retention through participation in activities',
      homeworkIdeas: ['Research and describe how technology is used at home', 'Draw and label computer components']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn vocabulary related to digital communication',
        'Students will understand different methods of online communication',
        'Students will practice writing basic digital messages'
      ],
      materials: ['Communication tools flashcards', 'Message template worksheets', 'Digital etiquette handout'],
      steps: [
        {
          title: 'Introduction to Digital Communication',
          duration: '5 minutes',
          description: 'Discuss the importance of digital communication today',
          instructions: ['Ask students how they communicate with friends and family', 'Discuss the advantages of digital communication']
        },
        {
          title: 'Communication Tools Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to digital communication',
          materials: ['Communication tools flashcards'],
          instructions: [
            'Present vocabulary: email, messaging app, video call, social media, etc.',
            'Discuss the purpose of each communication method',
            'Watch the Digital Communication Tools video'
          ]
        },
        {
          title: 'Message Writing Practice',
          duration: '15 minutes',
          description: 'Practice writing basic digital messages',
          materials: ['Message template worksheets'],
          instructions: [
            'Review email and message formats',
            'Have students practice writing short emails and text messages',
            'Discuss appropriate language for different contexts'
          ]
        },
        {
          title: 'Digital Etiquette Discussion',
          duration: '10 minutes',
          description: 'Learn about appropriate behavior in digital communication',
          materials: ['Digital etiquette handout'],
          instructions: [
            'Discuss digital etiquette rules',
            'Present examples of appropriate and inappropriate messages',
            'Talk about privacy and security in digital communication'
          ]
        },
        {
          title: 'Interactive Activity',
          duration: '5 minutes',
          description: 'Practice digital communication concepts with game',
          instructions: [
            'Play the Digital Communication Matching game',
            'Review key concepts from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students on their ability to write appropriate digital messages for different contexts',
      homeworkIdeas: ['Write a formal email to a teacher', 'Create a digital communication etiquette guide']
    }
  ];
}

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
export function getBook4Unit10LessonPlans(): LessonPlan[] {
  return generateBook4Unit10LessonPlans();
}
