import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit12Resources from './book3-unit12-resources';

/**
 * Book 3 Unit 12 - WHAT DO YOU LOOK LIKE
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '12';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'WHAT DO YOU LOOK LIKE';

// Export resources getter function
export function getBook3Unit12Resources(): TeacherResource[] {
  return book3Unit12Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit12-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '12'
  }));
}

// Generate specific lesson plans for this unit
export const generateBook3Unit12LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for describing physical appearance', 'Ask and answer "What do you look like?"', 'Describe people using simple adjectives'],
      materials: ['Flashcards with adjectives for appearance', 'Visual English 3 textbook', 'Mirror (optional)', 'Pictures of different people'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review basic adjectives students already know (big, small, long, short, etc.).',
          instructions: [
            'Show pictures and elicit adjectives students already know.',
            'Write these adjectives on the board.'
          ]
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach adjectives for describing appearance.',
          instructions: [
            'Present flashcards with adjectives: tall, short, thin, heavy, young, old, etc.',
            'Focus on hair descriptions: long hair, short hair, curly hair, straight hair, blonde, brown, black, red.',
            'Practice pronunciation and have students repeat.',
            'Demonstrate meaning with pictures or by pointing to examples in the classroom (including yourself).'
          ]
        },
        {
          title: 'Question & Answer Practice',
          duration: '8 minutes',
          description: 'Practice asking and answering about appearance.',
          instructions: [
            'Teach the question: "What do you look like?"',
            'Model answers: "I am tall. I have short black hair."',
            'Practice in pairs, describing themselves.',
            'Have some students share their descriptions with the class.'
          ],
          teacherNotes: 'Encourage students to use at least 2-3 adjectives in their descriptions.'
        },
        {
          title: 'Game: Wordwall - Describing a Person',
          duration: '7 minutes',
          description: 'Play the Wordwall game as a class activity.',
          instructions: [
            'Display the Wordwall game on the board.',
            'Divide class into teams.',
            'Teams take turns matching descriptions to pictures or solving the word puzzles.',
            'Award points for correct answers.'
          ]
        },
        {
          title: 'Guess Who? Activity',
          duration: '10 minutes',
          description: 'Students practice describing and identifying people.',
          instructions: [
            'Display 6-8 pictures of different people on the board.',
            'Number each picture.',
            'One student describes a person without saying the number.',
            'Other students guess which picture is being described.',
            'The student who guesses correctly gets to describe the next person.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review vocabulary with a quick matching game.',
          instructions: [
            'Show pictures of people with very distinct features.',
            'Students raise their hands and use the new vocabulary to describe each person.'
          ]
        }
      ],
      assessmentTips: 'Check students\' ability to correctly use adjectives to describe appearance. Listen for proper sentence structure when answering "What do you look like?"',
      homeworkIdeas: ['Draw a picture of yourself and write 3-4 sentences describing your appearance.', 'Find a photo of a family member and prepare to describe them in the next class.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Describe other people using third person', 'Compare physical appearances', 'Create a character description'],
      materials: ['Visual English 3 textbook', 'Pictures of famous people or cartoon characters', 'Avatar maker website access', 'Drawing paper and colored pencils'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Review vocabulary from previous lesson with a quick activity.',
          instructions: [
            'Show pictures of people with distinctive features.',
            'Students call out adjectives to describe them.',
            'Write key vocabulary on the board for reference during the lesson.'
          ]
        },
        {
          title: 'Third Person Descriptions',
          duration: '10 minutes',
          description: 'Teach describing others using he/she forms.',
          instructions: [
            'Show pictures of famous people or cartoon characters.',
            'Model sentences: "He is tall. She has long blonde hair."',
            'Point out the change from "I have" to "He/She has".',
            'Students practice in pairs, describing the pictures.'
          ]
        },
        {
          title: 'Comparing Appearances',
          duration: '8 minutes',
          description: 'Introduce comparative adjectives for describing people.',
          instructions: [
            'Show pairs of pictures with clear differences.',
            'Teach structure: "Person A is taller than Person B."',
            'Practice with common adjectives: taller/shorter, older/younger, etc.',
            'Students create their own comparison sentences in pairs.'
          ],
          teacherNotes: 'Keep comparatives simple. Focus only on basic forms, not irregular comparatives.'
        },
        {
          title: 'Digital Character Creation',
          duration: '12 minutes',
          description: 'Use digital tools to create and describe characters.',
          instructions: [
            'Demonstrate the Avatar Maker or Wimpy Yourself websites.',
            'Students create a character (either on devices if available, or teacher demonstrates on projector).',
            'Students write 3-4 sentences describing their character.',
            'Volunteers share their descriptions with the class.'
          ]
        },
        {
          title: 'My Dream Character',
          duration: '7 minutes',
          description: 'Students create their own dream character.',
          instructions: [
            'Students draw a simple picture of an imaginary friend or character.',
            'They write a short description using the vocabulary learned.',
            'Descriptions should include at least 4 physical features.'
          ]
        },
        {
          title: 'Wrap-up: Describing People Song',
          duration: '3 minutes',
          description: 'Watch the Planet Pop "Describing People Song" to review vocabulary in a fun way.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to use third person correctly when describing others. Check their written descriptions for proper vocabulary usage and sentence structure.',
      homeworkIdeas: ['Complete the online Wordwall activities about describing people.', 'Find pictures of two family members and write sentences comparing them.']
    }
  ];
};
