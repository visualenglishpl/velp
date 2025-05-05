import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit12Resources from './book3-unit12-resources';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '12';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'WHAT DO YOU LOOK LIKE';

// Export resources getter function
export const getBook3Unit12Resources = (): TeacherResource[] => book3Unit12Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit12LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for physical descriptions', 'Describe people\'s appearances', 'Practice using "has/have" with physical features'],
      materials: ['Pictures of people with different appearances', 'Mirrors (small, if available)', 'Visual English 3 textbook', 'Physical description flashcards'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of people and elicit basic descriptions.'
        },
        {
          title: 'Physical Description Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary for describing physical appearance.',
          instructions: [
            'Present flashcards with different hair types, eye colors, height, etc.',
            'Model sentences: "She has long hair. He has blue eyes."',
            'Students repeat and practice the vocabulary.'
          ]
        },
        {
          title: 'Mirror Activity',
          duration: '7 minutes',
          description: 'Students look in mirrors and describe themselves.',
          instructions: [
            'Hand out small mirrors (if available) or have students use phone cameras.',
            'Model: "I have brown hair. I have brown eyes."',
            'Students write 3-4 sentences describing themselves.'
          ]
        },
        {
          title: 'Video: Describing People',
          duration: '8 minutes',
          description: 'Watch the "Describing People: Who is it?" video.',
          teacherNotes: 'Pause the video at key points to reinforce vocabulary and practice pronunciation.'
        },
        {
          title: 'Guess Who Game',
          duration: '10 minutes',
          description: 'Play a guessing game using physical descriptions.',
          instructions: [
            'Prepare pictures of famous people or classmates.',
            'One student describes a person without naming them.',
            'Others guess who is being described.',
            'Encourage the use of has/have with different physical attributes.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key vocabulary and structures from the lesson.'
        }
      ],
      assessmentTips: 'Check for correct use of has/have with physical features and appropriate descriptive vocabulary.',
      homeworkIdeas: ['Draw and describe a family member or friend.', 'Complete the physical description matching worksheet.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Compare and contrast people\'s appearances', 'Ask and answer "What does he/she look like?"', 'Create avatar descriptions'],
      materials: ['Laptop/tablets for online avatar creators', 'Comparison pictures (tall/short, etc.)', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review physical description vocabulary with quick flashcards.'
        },
        {
          title: 'Comparisons',
          duration: '10 minutes',
          description: 'Teach comparing physical descriptions.',
          instructions: [
            'Show pictures of people with contrasting features (tall/short, etc.).',
            'Model sentences: "Tom is tall. Sara is short." "Tom has black hair. Sara has blonde hair."',
            'Practice with different pictures and features.'
          ]
        },
        {
          title: 'What Does He/She Look Like?',
          duration: '8 minutes',
          description: 'Practice asking and answering about appearances.',
          instructions: [
            'Model dialogue: "What does she look like?" "She has long brown hair and blue eyes."',
            'Students practice in pairs with different pictures.',
            'Change partners and repeat with new pictures.'
          ]
        },
        {
          title: 'Online Avatar Creator',
          duration: '12 minutes',
          description: 'Use online avatar creators to design characters.',
          instructions: [
            'Demonstrate how to use Avatar Maker or Wimpy Yourself websites.',
            'Students create avatars and write descriptions of their creations.',
            'Share avatars with partners who must describe them using proper vocabulary.'
          ],
          teacherNotes: 'Ensure all computers/tablets are set up in advance. Have backup printed activities if technology is unavailable.'
        },
        {
          title: 'Song Activity',
          duration: '5 minutes',
          description: 'Watch and sing along with the "Describing People Song".',
          teacherNotes: 'Encourage students to point to the features mentioned in the song.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students present their avatar descriptions to small groups or the class.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to ask and answer "What does he/she look like?" with appropriate vocabulary.',
      homeworkIdeas: ['Create a "wanted poster" for an imaginary person with a detailed description.', 'Complete online Wordwall activities about describing people.']
    }
  ];
};
