import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit11Resources from './book3-unit11-resources';

/**
 * Book 3 Unit 11 - GET WELL SOON
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '11';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'GET WELL SOON';

// Export resources getter function
export function getBook3Unit11Resources(): TeacherResource[] {
  return book3Unit11Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit11-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '11',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
}

// Generate specific lesson plans for this unit
export const generateBook3Unit11LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for common illness symptoms', 'Ask and answer "What\'s wrong?"', 'Express sympathy using "I\'m sorry to hear that"'],
      materials: ['Illness flashcards', 'Visual English 3 textbook', 'Band-aids (prop)', 'Thermometer (prop)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Mime different illness symptoms and have students guess.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach key illness vocabulary.',
          instructions: [
            'Present flashcards with different symptoms: headache, stomachache, cold, etc.',
            'Model pronunciation and have students repeat.',
            'Show props (thermometer, bandages) where appropriate.',
            'Students touch relevant body parts when learning words like "headache" or "sore throat".'
          ]
        },
        {
          title: 'Question & Answer Practice',
          duration: '8 minutes',
          description: 'Practice asking and answering about health problems.',
          instructions: [
            'Model dialogue: "What\'s wrong?" "I have a headache."',
            'Teach sympathy response: "I\'m sorry to hear that."',
            'Practice in pairs, using flashcards as prompts.',
            'Make a circle and practice as a class, passing a prop (like a small toy thermometer).'
          ],
          teacherNotes: 'Make sure students use appropriate facial expressions to show they don\'t feel well.'
        },
        {
          title: 'Game: Wordwall Anagram',
          duration: '7 minutes',
          description: 'Play the "Get Well Soon - Anagram" Wordwall game as a class.',
          instructions: [
            'Display the Wordwall game on the board.',
            'Divide class into teams.',
            'Teams take turns unscrambling the illness vocabulary words.',
            'Award points for correct answers.'
          ]
        },
        {
          title: 'Role-play: Doctor and Patient',
          duration: '10 minutes',
          description: 'Students practice dialogues about health problems.',
          instructions: [
            'Arrange students in pairs.',
            'One student plays the doctor, the other the patient.',
            'Doctor asks "What\'s wrong?" and patient describes symptoms.',
            'Doctor responds with "I\'m sorry to hear that" and suggests a remedy.',
            'Provide a simple worksheet with common remedies: "You should rest", "You should take medicine", etc.',
            'Switch roles and repeat.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review vocabulary with a quick matching game.'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name common illness symptoms. Observe their use of "What\'s wrong?" and "I\'m sorry to hear that" in dialogue practice.',
      homeworkIdeas: ['Complete the illness vocabulary matching worksheet.', 'Draw a picture of someone who is sick and write 2-3 sentences about what\'s wrong.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for common remedies', 'Give advice using "You should"', 'Create a health advice poster'],
      materials: ['Remedy pictures/flashcards', 'Visual English 3 textbook', 'Poster paper', 'Markers/colored pencils'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Play the Wordwall GET WELL SOON (1) game to review illness vocabulary from previous lesson.'
        },
        {
          title: 'Remedy Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary for common remedies.',
          instructions: [
            'Present pictures of remedies: medicine, rest, drink water, etc.',
            'Teach structure: "You should" + verb (rest, drink, take medicine).',
            'Model pronunciation and have students repeat.',
            'Create simple matching exercise on board - match problems with remedies.'
          ]
        },
        {
          title: 'Advice Chain',
          duration: '8 minutes',
          description: 'Practice giving health advice in a chain activity.',
          instructions: [
            'Start by saying a problem: "I have a headache."',
            'Student 1 gives advice: "You should take medicine."',
            'Student 1 then states a new problem, and Student 2 gives advice.',
            'Continue around the class.'
          ],
          teacherNotes: 'Encourage creativity with reasonable advice. Make sure students use proper "should" form.'
        },
        {
          title: 'Wordwall Games Practice',
          duration: '7 minutes',
          description: 'Play one of the REMEDIES Wordwall games to reinforce vocabulary.',
          instructions: [
            'Students can take turns or work in small groups.',
            'Focus on correctly matching remedies to health problems.'
          ]
        },
        {
          title: 'Health Advice Poster',
          duration: '10 minutes',
          description: 'Students create a health advice poster.',
          instructions: [
            'Divide students into groups of 3-4.',
            'Each group is assigned a different health problem.',
            'Groups create a colorful poster showing the problem and 3-4 remedies.',
            'Students write sentences using "You should..." structure.',
            'Groups present their posters briefly.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review lesson content with People and Places Wordwall game.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to match appropriate remedies to health problems. Check their use of the "You should" structure.',
      homeworkIdeas: ['Complete the online Wordwall activities about remedies.', 'Write a short dialogue between a sick person and a doctor.']
    }
  ];
};
