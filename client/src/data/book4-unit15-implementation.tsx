/**
 * Visual English Book 4, Unit 15 - AT THE CIRCUS
 * Implementation file for unit resources and lesson plans
 * 
 * This unit follows the standardized pattern with clear separation of
 * resources and implementation logic
 */

import { TeacherResource } from '@/types/teacher-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { resources } from './book4-unit15-resources';
import { BOOK4_TITLE } from './book4-resources-common';

// Flag for showing blank for unmapped Q&A
export const showBlankIfUnmapped = true;

// Function to get resources for this unit (for backward compatibility)
export function getBook4Unit15Resources(): TeacherResource[] {
  return resources;
}

// Generate lesson plans for this unit based on standard template
export function generateBook4Unit15LessonPlans(): LessonPlan[] {
  const unitNumber = '15';
  const unitTitle = 'AT THE CIRCUS';
  
  return [
    {
      id: `book4-unit${unitNumber}-lesson-1`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 1`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn circus vocabulary',
        'Students will identify different circus performers and their roles',
        'Students will practice describing circus performances'
      ],
      materials: ['Circus performer flashcards', 'Circus animal cards', 'Circus poster or images'],
      steps: [
        {
          title: 'Warm-up Song',
          duration: '5 minutes',
          description: 'Begin with a fun circus-themed song',
          instructions: ['Play the Circus Song for Kids', 'Have students follow along with actions']
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Present essential circus vocabulary with visual aids',
          materials: ['Circus performer flashcards'],
          instructions: [
            'Introduce circus performer vocabulary: clown, acrobat, ringmaster, juggler, lion tamer, etc.',
            'Have students repeat new words and match them to images',
            'Watch the Circus Vocabulary Video'
          ]
        },
        {
          title: 'Circus Animal Vocabulary',
          duration: '10 minutes',
          description: 'Learn about animals commonly found at the circus',
          materials: ['Circus animal cards'],
          instructions: [
            'Introduce circus animal vocabulary: elephant, lion, tiger, horse, etc.',
            'Discuss actions these animals perform: jump through hoops, stand on hind legs, etc.',
            'Have students mime the animals and their actions'
          ]
        },
        {
          title: 'Describing Circus Performances',
          duration: '10 minutes',
          description: 'Practice describing circus performances',
          materials: ['Circus poster or images'],
          instructions: [
            'Show images of circus performances',
            'Model describing sentences: "The acrobat is swinging on the trapeze."',
            'Have students practice describing different circus acts'
          ]
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Review circus vocabulary with interactive game',
          instructions: [
            'Play the Circus Vocabulary Wordwall game',
            'Discuss any challenging vocabulary'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use circus vocabulary correctly and form descriptive sentences',
      homeworkIdeas: ['Draw your favorite circus performer and write 3 sentences describing what they do', 'Create a mini circus poster labeling different performers and animals']
    },
    {
      id: `book4-unit${unitNumber}-lesson-2`,
      title: `${BOOK4_TITLE} - Unit ${unitNumber} - ${unitTitle} - Lesson 2`,
      duration: '45 minutes',
      level: 'Elementary to Pre-Intermediate',
      objectives: [
        'Students will learn circus action verbs',
        'Students will practice describing circus skills with present continuous tense',
        'Students will create a circus performance dialogue'
      ],
      materials: ['Action verb cards', 'Circus scene pictures', 'Mini circus props (optional)'],
      steps: [
        {
          title: 'Review Activity',
          duration: '5 minutes',
          description: 'Review previously learned circus vocabulary',
          instructions: ['Quiz students on circus performers and animals', 'Have students recall key vocabulary from the previous lesson']
        },
        {
          title: 'Circus Action Verbs',
          duration: '10 minutes',
          description: 'Introduce verbs associated with circus performances',
          materials: ['Action verb cards'],
          instructions: [
            'Teach action verbs: juggle, balance, swing, tame, perform, etc.',
            'Demonstrate actions where possible',
            'Have students match verbs to circus performers'
          ]
        },
        {
          title: 'Present Continuous Practice',
          duration: '10 minutes',
          description: 'Practice using present continuous to describe circus actions',
          materials: ['Circus scene pictures'],
          instructions: [
            'Show pictures of circus performances',
            'Model sentences: "The clown is juggling balls. The acrobat is swinging on the trapeze."',
            'Have students create their own sentences about the pictures'
          ]
        },
        {
          title: 'Circus Performance Role-play',
          duration: '15 minutes',
          description: 'Create and act out circus performance scenarios',
          materials: ['Mini circus props (optional)'],
          instructions: [
            'Divide class into small groups',
            'Each group creates a short circus performance with dialogue',
            'Groups present their performances to the class',
            'Encourage use of circus vocabulary and present continuous tense'
          ]
        },
        {
          title: 'Interactive Activities',
          duration: '5 minutes',
          description: 'Review circus vocabulary with fun games',
          instructions: [
            'Play the Circus Vocabulary Match or Circus Animals Game',
            'Review key vocabulary and phrases from the lesson'
          ]
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use present continuous tense to describe circus actions and their participation in role-play activities',
      homeworkIdeas: ['Write a short paragraph about a visit to the circus', 'Create a set of 5 sentences describing what different circus performers are doing']
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
export function getBook4Unit15LessonPlans(): LessonPlan[] {
  return generateBook4Unit15LessonPlans();
}