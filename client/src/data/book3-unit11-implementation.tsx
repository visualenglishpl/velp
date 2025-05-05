import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit11Resources from './book3-unit11-resources';

/**
 * Book 3 Unit 11 - GET WELL SOON
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '11';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Export resources getter function
export const getBook3Unit11Resources = (): TeacherResource[] => book3Unit11Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit11LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to illnesses', 'Ask and answer "What\'s the matter?"', 'Express sympathy with "I\'m sorry to hear that."'],
      materials: ['Illness flashcards', 'Get well cards', 'Visual English 3 textbook', 'Bandages and pretend medical kit (optional)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Discuss times when students have been sick and what happened.'
        },
        {
          title: 'Illness Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary for common illnesses using flashcards.',
          instructions: [
            'Show each flashcard with images of symptoms.',
            'Introduce phrases like "I have a headache/cold/fever/cough."',
            'Students repeat and mime each condition.'
          ]
        },
        {
          title: 'What\'s the Matter?',
          duration: '8 minutes',
          description: 'Practice the question "What\'s the matter?" and responses.',
          instructions: [
            'Model dialogue: "What\'s the matter?" "I have a sore throat."',
            'Practice in pairs with different symptoms.',
            'Add sympathy: "I\'m sorry to hear that."'
          ]
        },
        {
          title: 'Doctor Role Play',
          duration: '10 minutes',
          description: 'Students role-play doctor and patient interactions.',
          instructions: [
            'Set up a simple doctor\'s office.',
            'Patient explains symptoms, doctor responds with sympathy and advice.',
            'Optional: Use props like bandages or thermometers.'
          ]
        },
        {
          title: 'Get Well Card',
          duration: '7 minutes',
          description: 'Students create a simple get well card for a "sick" classmate.',
          instructions: [
            'Provide paper and coloring supplies.',
            'Have students write a short message with "Get well soon" and "I\'m sorry to hear that you have a..."',
            'Exchange cards with partners.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play a quick "What\'s wrong?" guessing game using mime.'
        }
      ],
      assessmentTips: 'Check for correct use of illness vocabulary and sympathy expressions.',
      homeworkIdeas: ['Create an illustrated mini-dictionary of illnesses and remedies.', 'Write a short dialogue between a doctor and a patient.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for remedies and treatments', 'Give advice using "You should..."', 'Create a health poster'],
      materials: ['Medicine/remedy flashcards', 'Poster paper', 'Art supplies', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review illness vocabulary from previous lesson with a quick matching game.'
        },
        {
          title: 'Remedy Vocabulary',
          duration: '8 minutes',
          description: 'Introduce vocabulary for common remedies and treatments.',
          instructions: [
            'Show flashcards with remedies: medicine, rest, drink water, etc.',
            'Teach phrases like "take medicine," "get some rest," "drink plenty of water."',
            'Students repeat and match remedies to illnesses.'
          ]
        },
        {
          title: 'Giving Advice',
          duration: '10 minutes',
          description: 'Practice giving advice using "You should..." for different illnesses.',
          instructions: [
            'Model: "I have a headache." "You should take an aspirin and rest."',
            'Students work in pairs giving advice for different symptoms.',
            'Create advice chains around the class.'
          ]
        },
        {
          title: 'Wordwall Activities',
          duration: '7 minutes',
          description: 'Play interactive games using the Wordwall resources.',
          teacherNotes: 'Use the "Get Well Soon" and "Remedies" Wordwall games from the resources section.'
        },
        {
          title: 'Health Poster',
          duration: '10 minutes',
          description: 'Create a health advice poster in small groups.',
          instructions: [
            'Assign each group a different illness.',
            'Groups create a poster showing the symptoms and advice.',
            'Include at least 3 "You should..." sentences on each poster.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Groups present their health posters to the class.'
        }
      ],
      assessmentTips: 'Evaluate correct matching of remedies to illnesses and proper use of "You should..." for giving advice.',
      homeworkIdeas: ['Interview a family member about what they do when they have a cold or headache.', 'Create a health advice brochure with remedies for common illnesses.']
    }
  ];
};
