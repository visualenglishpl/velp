// Implementation file for Book 3 Unit 2

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit2Resources } from './book3-unit2-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '2';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit2Resources = (): TeacherResource[] => book3Unit2Resources;

// Generate lesson plans for this unit
export const generateUnit2LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for daily routine activities', 'Tell time in relation to daily activities', 'Sequence daily events in chronological order'],
      materials: ['Daily routine flashcards', 'Clock face', 'Timeline worksheet', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students what time they wake up, go to school, and go to bed. Note times on the board.'
        },
        {
          title: 'Daily Routine Vocabulary',
          duration: '10 minutes',
          description: 'Introduce daily routine vocabulary with actions and time expressions.',
          instructions: [
            'Show flashcards of routine activities (wake up, brush teeth, have breakfast, etc.).',
            'Model each action and have students mime the activities.'
          ]
        },
        {
          title: 'Clock Review',
          duration: '5 minutes',
          description: 'Review telling time using a clock face.',
          teacherNotes: 'Focus on o\'clock, half past, quarter past, and quarter to.'
        },
        {
          title: 'Time Matching',
          duration: '10 minutes',
          description: 'Students match times with daily routine activities.',
          instructions: [
            'Provide cards with different times and daily activities.',
            'Students work in pairs to match them logically.'
          ]
        },
        {
          title: 'My Day Timeline',
          duration: '10 minutes',
          description: 'Students create a visual timeline of their daily routine with times.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students share one activity from their routine with the class using correct time expressions.'
        }
      ],
      assessmentTips: 'Monitor for accurate use of time expressions and sequence words. Check pronunciation of routine verbs.',
      homeworkIdeas: ['Complete a daily routine sequencing worksheet.', 'Draw a comic strip showing your morning routine with times.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Use present simple tense to describe routines', 'Ask and answer questions about daily activities', 'Compare routines with a partner'],
      materials: ['Sentence pattern cards', 'Question word cards', 'Survey sheets', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review daily routine vocabulary with a quick mime game.'
        },
        {
          title: 'Present Simple Introduction',
          duration: '8 minutes',
          description: 'Teach present simple tense for routines.',
          instructions: [
            'Model sentences like "I wake up at 7 o\'clock" or "She has breakfast at 8 o\'clock."',
            'Highlight the use of third person -s.'
          ]
        },
        {
          title: 'Question Formation',
          duration: '7 minutes',
          description: 'Practice forming questions with "What time do you...?" and "When does he/she...?"',
          teacherNotes: 'Emphasize word order and auxiliary verbs for questions.'
        },
        {
          title: 'Routine Survey',
          duration: '10 minutes',
          description: 'Students interview classmates about their daily routines using a survey sheet.',
          instructions: [
            'Provide question prompts like "What time do you wake up?" and "When do you do your homework?"',
            'Students record their classmates\' answers.'
          ]
        },
        {
          title: 'Routine Comparison',
          duration: '10 minutes',
          description: 'Students compare their routines with a partner, noting similarities and differences.',
          instructions: [
            'Model comparison sentences like "We both wake up at 7:00" or "I go to bed earlier than you."',
            'Have students write 3-5 comparison sentences.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Discuss interesting findings from the survey. Who has the earliest/latest routines?'
        }
      ],
      assessmentTips: 'Evaluate question formation during the survey activity. Check for correct verb forms in present simple.',
      homeworkIdeas: ['Write a paragraph comparing your routine with a family member\'s routine.', 'Create a daily schedule for your ideal day, using time expressions and present simple.']
    }
  ];
};
