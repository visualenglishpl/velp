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
export const getBook3Unit11Resources = (): TeacherResource[] => {
  return book3Unit11Resources.map((resource: TeacherResource) => ({
    ...resource,
    id: resource.id || `book3-unit11-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '11',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
};

// Generate specific lesson plans for this unit
export const generateBook3Unit11LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to illnesses and remedies', 'Practice phrases for asking about someone\'s health', 'Develop understanding of basic health-related vocabulary'],
      materials: ['Visual English 3 textbook', 'Flashcards with illness vocabulary', 'Simple first aid kit props (optional)', 'Wordwall games on projector'],
      steps: [
        {
          title: 'Warm-up Discussion',
          duration: '5 minutes',
          description: 'Introduction to health and illness vocabulary.',
          instructions: [
            'Ask: "Have you ever been sick? What happened?"',
            'Show pictures of common illnesses (cold, fever, headache, etc.).',
            'Introduce key vocabulary: sick, ill, headache, stomachache, cold, cough, fever, etc.'
          ]
        },
        {
          title: 'Vocabulary Development',
          duration: '10 minutes',
          description: 'Teach and practice illness and remedy vocabulary.',
          instructions: [
            'Show flashcards with different illnesses and remedies.',
            'Practice pronunciation as a class.',
            'Use expressions such as "I have a headache", "I have a sore throat", etc.',
            'Introduce remedies: "You should take medicine", "You should see a doctor", etc.'
          ]
        },
        {
          title: 'Get Well Soon Expressions',
          duration: '8 minutes',
          description: 'Practice expressions for wishing someone to get better.',
          instructions: [
            'Teach expressions: "Get well soon!", "I hope you feel better!", "Take care!"',
            'Students practice dialogues in pairs:',
            'A: "I don\'t feel well. I have a headache."',
            'B: "I\'m sorry to hear that. Get well soon!"'
          ],
          teacherNotes: 'Encourage students to use different illness vocabulary in their dialogues.'
        },
        {
          title: 'Wordwall Game',
          duration: '10 minutes',
          description: 'Play the Wordwall Get Well Soon games.',
          instructions: [
            'Display the first Wordwall Game on the board.',
            'Divide the class into teams.',
            'Teams take turns solving the anagrams related to illnesses and remedies.',
            'Award points for correct answers.'
          ]
        },
        {
          title: 'Doctor and Patient Role Play',
          duration: '8 minutes',
          description: 'Students practice dialogues between doctor and patient.',
          instructions: [
            'Divide students into pairs - one is the doctor, one is the patient.',
            'Patient should explain their symptoms, doctor should suggest remedies.',
            'Example:',
            'Patient: "I have a stomachache. It hurts here."',
            'Doctor: "I\'m sorry to hear that. You should rest and drink water."',
            'Have students switch roles after 3-4 minutes.'
          ]
        },
        {
          title: 'Wrap-up Activity',
          duration: '4 minutes',
          description: 'Review the key vocabulary and expressions learned.',
          instructions: [
            'Show flashcards quickly, students identify the illness or remedy.',
            'As a class, create a list of "Health Tips" for staying healthy.',
            'Review the expression "Get well soon!" and when to use it.'
          ]
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify illnesses and remedies. Note if they can express health problems and suggest solutions using proper sentence structure.',
      homeworkIdeas: ['Draw pictures of 3 illnesses and write sentences about each one.', 'Write a get-well-soon card to an imaginary sick friend, explaining what they should do to feel better.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for different remedies', 'Practice asking and offering help', 'Develop comprehension of health advice'],
      materials: ['Visual English 3 textbook', 'Remedy flashcards', 'Simple first aid kit items (bandages, tissues, etc.)', 'Wordwall games'],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of illness vocabulary from the previous lesson.',
          instructions: [
            'Show flashcards of different illnesses.',
            'Students call out the names quickly.',
            'Ask: "What should we say to someone who is sick?" (Get well soon!)'
          ]
        },
        {
          title: 'Remedy Vocabulary',
          duration: '10 minutes',
          description: 'Teach vocabulary for different remedies and treatments.',
          instructions: [
            'Introduce vocabulary: medicine, pill, bandage, rest, doctor, hospital, nurse.',
            'Show real items or pictures when possible.',
            'Practice sentences: "Take this medicine.", "Put on a bandage.", "You should rest."',
            'Ask comprehension questions: "What do you do when you have a cold?", "Who helps sick people?"'
          ]
        },
        {
          title: 'Wordwall Games',
          duration: '8 minutes',
          description: 'Play the Wordwall Remedies games.',
          instructions: [
            'Display the Wordwall Remedies game.',
            'This time, focus on matching remedies to illnesses.',
            'Students take turns matching appropriate remedies to each health problem.'
          ]
        },
        {
          title: 'Helping a Sick Friend',
          duration: '10 minutes',
          description: 'Students practice offering help to someone who is sick.',
          instructions: [
            'Introduce phrases: "Can I help you?", "What can I do for you?", "Let me help you."',
            'Students work in pairs to create short dialogues offering help to a sick friend.',
            'Example:',
            'A: "I don\'t feel well. I have a fever."',
            'B: "I\'m sorry. Can I help you? I can bring you some water."',
            'Have students switch roles and perform for the class.'
          ],
          teacherNotes: 'Focus on polite offers of help and appropriate responses.'
        },
        {
          title: 'Health Advice Game',
          duration: '8 minutes',
          description: 'Students practice giving health advice.',
          instructions: [
            'Create a set of situation cards (e.g., "Your friend has a cold", "Your brother has a headache").',
            'Students take turns picking a card and giving appropriate advice.',
            'The class votes on whether the advice is good or not.',
            'Encourage use of "should" and "shouldn\'t" in advice.'
          ]
        },
        {
          title: 'Final Wordwall Game',
          duration: '4 minutes',
          description: 'Play one more Wordwall game to reinforce learning.',
          instructions: [
            'Use the People and Places Wordwall game as a closing activity.',
            'Have students take turns or play as a whole class.',
            'Discuss where people go when they are very sick (hospital) and who helps them (doctor, nurse).'
          ]
        }
      ],
      assessmentTips: 'Observe students\' ability to use remedy vocabulary correctly. Note their comfort level with offering help and their ability to give appropriate health advice.',
      homeworkIdeas: ['Create a small first aid guide with pictures and descriptions of common remedies.', 'Write a dialogue between a sick person and someone helping them.']
    }
  ];
};

// Export default functions to maintain consistency with other units
export default {
  getBook3Unit11Resources,
  generateBook3Unit11LessonPlans
};
