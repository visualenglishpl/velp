// Implementation file for Book 2 Unit 12

import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit12Resources } from './book2-unit12-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '12';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook2Unit12Resources = (): TeacherResource[] => book2Unit12Resources;

// Generate lesson plans for this unit
export const generateUnit12LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book2-unit${unitNumber}-lesson1`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Identify common health problems', 'Ask and answer questions about health', 'Role-play doctor-patient conversations'],
      materials: ['Flashcards with health problems', 'Doctor props (toy stethoscope, thermometer, etc.)', 'Health problem worksheets'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play charades with students acting out different health problems for others to guess.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce vocabulary for common health problems using flashcards.',
          instructions: [
            'Show flashcards one by one and have students repeat each word.',
            'Demonstrate symptoms with actions where possible.'
          ]
        },
        {
          title: 'Question Practice',
          duration: '8 minutes',
          description: 'Teach the question "What\'s the matter?" and responses "I have a ___".',
          teacherNotes: 'Emphasize correct pronunciation and intonation'
        },
        {
          title: 'Doctor Role-play Demo',
          duration: '5 minutes',
          description: 'Demonstrate doctor-patient role-play with a volunteer student.'
        },
        {
          title: 'Pair Practice',
          duration: '10 minutes',
          description: 'Practice dialogues in pairs with one student as doctor and one as patient. Teach and practice useful phrases like "Open your mouth", "Take this medicine", etc.'
        },
        {
          title: 'Worksheet Activity',
          duration: '5 minutes',
          description: 'Students complete a worksheet matching health problems to appropriate treatments.'
        },
        {
          title: 'Dialogue Creation',
          duration: '10 minutes',
          description: 'In pairs, students create their own doctor-patient dialogue and perform it for the class.'
        },
        {
          title: 'Wrap-up',
          duration: '2 minutes',
          description: 'Play a quick review game where the teacher says a symptom and students suggest what the doctor might say.'
        }
      ],
      assessmentTips: 'Monitor students during role-play activities for correct use of vocabulary and question forms.',
      homeworkIdeas: ['Students create a health advice poster for the classroom.']
    },
    {
      id: `book2-unit${unitNumber}-lesson2`,
      title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Discuss preventive health measures', 'Give health advice using should/shouldn\'t', 'Create a health advice booklet'],
      materials: ['Pictures showing healthy and unhealthy habits', 'Health advice card templates', 'Art supplies for booklet creation'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of healthy and unhealthy behaviors and have students sort them into two groups.'
        },
        {
          title: 'Vocabulary Review',
          duration: '5 minutes',
          description: 'Review health problem vocabulary from the previous lesson.'
        },
        {
          title: 'Advice Structures',
          duration: '10 minutes',
          description: 'Introduce should/shouldn\'t for giving advice ("You should rest", "You shouldn\'t eat too much candy").',
          instructions: [
            'Model the structures clearly on the board.',
            'Have students repeat after you with different examples.'
          ]
        },
        {
          title: 'Health Measures Discussion',
          duration: '5 minutes',
          description: 'Discuss preventive health measures (eating fruits and vegetables, exercising, sleeping well).'
        },
        {
          title: 'Advice Practice',
          duration: '5 minutes',
          description: 'Practice giving advice for different scenarios ("If you have a headache, you should...").'
        },
        {
          title: 'Advice Cards',
          duration: '5 minutes',
          description: 'Students create health advice cards for different problems.'
        },
        {
          title: 'Booklet Creation',
          duration: '10 minutes',
          description: 'Students create a mini health advice booklet with drawings and advice for common health problems.'
        },
        {
          title: 'Sharing and Wrap-up',
          duration: '5 minutes',
          description: 'Students share their booklets and explain their health advice to the class.'
        }
      ],
      assessmentTips: 'Check booklets for appropriate use of health vocabulary and advice structures.',
      homeworkIdeas: ['Students interview family members about home remedies for common health problems.']
    }
  ];
};
