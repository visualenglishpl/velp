import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit14Resources from './book3-unit14-resources';

/**
 * Book 3 Unit 14 - MY TOWN - EXCUSE ME WHERE IS THE
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '14';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'MY TOWN - EXCUSE ME WHERE IS THE';

// Export resources getter function
export const getBook3Unit14Resources = (): TeacherResource[] => book3Unit14Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit14LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for places in town', 'Ask and answer "Where is the...?"', 'Follow and give simple directions'],
      materials: ['Town map handouts', 'Place flashcards', 'Visual English 3 textbook', 'Direction flashcards (left, right, straight)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of different places in a town and elicit vocabulary.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach key places in town vocabulary.',
          instructions: [
            'Present flashcards with different town places: supermarket, post office, library, etc.',
            'Model pronunciation and have students repeat.',
            'Play a quick memory game with the flashcards.'
          ]
        },
        {
          title: 'Video: Welcome to my town',
          duration: '8 minutes',
          description: 'Watch the "Welcome to my town" video.',
          instructions: [
            'Play the video once through.',
            'Play again, pausing to have students identify places shown.',
            'Ask students which places they like to visit in their town.'
          ],
          teacherNotes: 'Pause the video at key moments to highlight vocabulary and check understanding.'
        },
        {
          title: '"Where is the...?" Practice',
          duration: '10 minutes',
          description: 'Practice asking and answering about locations.',
          instructions: [
            'Model dialogue: "Excuse me, where is the library?" "It\'s next to the park."',
            'Distribute town maps to pairs of students.',
            'Students take turns asking and answering about locations on their maps.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '7 minutes',
          description: 'Play the Wordwall Places in Town game together.',
          teacherNotes: 'Use the classroom projector to play the game as a whole class activity.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review key places vocabulary and the question "Where is the...?"'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify places in town and ask/answer "Where is the...?" questions.',
      homeworkIdeas: ['Draw a simple map of your neighborhood and label 5 places.', 'Complete the places in town matching worksheet.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Use prepositions of place (next to, between, opposite)', 'Give and follow directions', 'Create a town map following directions'],
      materials: ['Direction flashcards (left, right, straight ahead)', 'Town grid paper', 'Visual English 3 textbook', 'Small toy car (optional)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review places in town vocabulary with quick flashcard drill.'
        },
        {
          title: 'Prepositions Practice',
          duration: '8 minutes',
          description: 'Teach prepositions of place for describing locations.',
          instructions: [
            'Introduce: next to, between, opposite, behind, in front of.',
            'Use real classroom objects to demonstrate: "The book is next to the pencil."',
            'Students practice with small objects at their desks.'
          ]
        },
        {
          title: 'Video: Between Next To Opposite',
          duration: '7 minutes',
          description: 'Watch the video about prepositions.',
          teacherNotes: 'Encourage students to repeat key phrases during the video.'
        },
        {
          title: 'Directions Practice',
          duration: '10 minutes',
          description: 'Learn and practice giving directions.',
          instructions: [
            'Teach direction vocabulary: "Turn left/right, go straight, stop."',
            'Watch the "Go left - go right - go straight" video.',
            'Practice giving directions around the classroom.',
            'Optional: Use a small toy car on a simple map to demonstrate.'
          ]
        },
        {
          title: 'Town Planner Activity',
          duration: '10 minutes',
          description: 'Students create town maps based on directions.',
          instructions: [
            'Provide grid paper to students.',
            'Read directions like: "Draw a school. Next to the school, draw a park."',
            'Continue with more complex directions using prepositions.',
            'Students then compare their maps with partners.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play the second Wordwall game (Where Is) to review key concepts.'
        }
      ],
      assessmentTips: 'Evaluate students\' understanding of prepositions and direction vocabulary through their town maps and ability to follow directions.',
      homeworkIdeas: ['Complete online Wordwall activities about town places.', 'Write directions from your home to your school or another important place.']
    }
  ];
};
