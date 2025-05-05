import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit14Resources from './book3-unit14-resources';

/**
 * Book 3 Unit 14 - MY TOWN - EXCUSE ME WHERE IS THE
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '14';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'MY TOWN - EXCUSE ME WHERE IS THE';

// Export resources getter function
export const getBook3Unit14Resources = (): TeacherResource[] => {
  return book3Unit14Resources;
};

// Generate specific lesson plans for this unit
export const generateBook3Unit14LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for places in town', 'Ask and answer questions about locations', 'Use prepositions of place correctly'],
      materials: ['Visual English 3 textbook', 'Town map printouts', 'Place flashcards', 'Direction cards (left, right, straight)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduce places in town vocabulary with pictures.',
          instructions: [
            'Show flashcards of different places (bank, hospital, school, restaurant, etc.).',
            'Have students repeat the names of the places.',
            'Ask: "What places do you visit in your town?"'
          ]
        },
        {
          title: 'Introduction to Town Vocabulary',
          duration: '10 minutes',
          description: 'Present the key vocabulary for this unit.',
          instructions: [
            'Show a town map on the board.',
            'Point to different places and say: "This is a hospital. This is a bank."',
            'Practice the question: "Excuse me, where is the bank?"',
            'Practice the response: "It\'s next to the restaurant."',
            'Use prepositions: next to, across from, between, behind, in front of'
          ]
        },
        {
          title: 'Direction Words Practice',
          duration: '10 minutes',
          description: 'Teach giving directions using simple commands.',
          instructions: [
            'Show direction cards: go left, go right, go straight.',
            'Practice the phrases as a class with gestures.',
            'Play Simon Says with directions: "Simon says go left!"',
            'Demonstrate on the map: "To get to the bank, go straight, then turn right."'
          ],
          teacherNotes: 'Make sure students understand the difference between left and right.'
        },
        {
          title: 'Town Map Activity',
          duration: '10 minutes',
          description: 'Practice asking and answering about locations using a map.',
          instructions: [
            'Distribute town maps to pairs of students.',
            'Student A asks: "Excuse me, where is the hospital?"',
            'Student B answers: "It\'s between the park and the school."',
            'Have students take turns asking and answering.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '7 minutes',
          description: 'Play the Wordwall Places in Town game.',
          instructions: [
            'Display the game on the board.',
            'Divide the class into teams.',
            'Teams compete to identify places in town and match them to descriptions.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '3 minutes',
          description: 'Review key vocabulary and questions.',
          instructions: [
            'Ask students: "Where is the bank in our town map?"',
            'Have volunteers answer using prepositions.'
          ]
        }
      ],
      assessmentTips: 'Check students\' ability to correctly use prepositions of place and direction words. Evaluate their questions and answers about locations.',
      homeworkIdeas: ['Draw a simple map of your neighborhood and label 5 places.', 'Write 3 sentences describing where places are in your neighborhood using prepositions.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Give and follow directions', 'Use position words in context', 'Practice town vocabulary in conversation'],
      materials: ['Visual English 3 textbook', 'Large town map for demonstration', 'Direction cards', 'Small toy cars/figures (optional)'],
      steps: [
        {
          title: 'Warm-up: Town Vocabulary Review',
          duration: '5 minutes',
          description: 'Quick review of places in town.',
          instructions: [
            'Show pictures of places in town.',
            'Students race to call out the name of each place.',
            'Review the question: "Excuse me, where is the ___?"'
          ]
        },
        {
          title: 'Position Words Video',
          duration: '8 minutes',
          description: 'Watch the "Between Next To Opposite" video.',
          instructions: [
            'Play the video, pausing to practice key phrases.',
            'Have students repeat position words.',
            'Ask comprehension questions: "What is between the post office and the bank?"'
          ]
        },
        {
          title: 'Direction Giving Practice',
          duration: '10 minutes',
          description: 'Practice giving and following directions.',
          instructions: [
            'Use a large town map on the board.',
            'Teacher demonstrates: "To get to the library from the school, go straight, then turn left at the restaurant."',
            'Call on volunteers to give directions between different places.',
            'Use toy cars/figures to move along the routes (if available).'
          ],
          teacherNotes: 'Emphasize the sequence words: first, then, next, finally.'
        },
        {
          title: 'Direction Role-play',
          duration: '10 minutes',
          description: 'Students practice conversations about directions.',
          instructions: [
            'In pairs, students role-play a tourist and local.',
            'Tourist: "Excuse me, where is the hospital?"',
            'Local: "Go straight, then turn right at the bank. The hospital is next to the park."',
            'Have students switch roles and try different locations.'
          ]
        },
        {
          title: 'Wordwall "Where Is" Game',
          duration: '9 minutes',
          description: 'Practice prepositions with the Wordwall game.',
          instructions: [
            'Play the Wordwall "Where Is" game as a class.',
            'Students practice completing sentences with prepositions.',
            'Discuss correct answers as a class.'
          ]
        },
        {
          title: 'Closing Activity: Town Memory Game',
          duration: '3 minutes',
          description: 'Practice memory and town vocabulary.',
          instructions: [
            'Show the town map for 30 seconds.',
            'Hide the map and ask: "Where was the hospital?"',
            'Students answer from memory using prepositions.'
          ]
        }
      ],
      assessmentTips: 'Observe students\' ability to give clear directions using appropriate prepositions and sequence words. Check for accurate use of town vocabulary in context.',
      homeworkIdeas: ['Write directions from your home to school using the phrases learned in class.', 'Complete the online Wordwall activities about town places and directions.']
    }
  ];
};
