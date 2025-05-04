import { TeacherResource } from '@/components/TeacherResources';

/**
 * Common configuration and resource helpers for Book 3
 */

export const BOOK3_TITLE = 'VISUAL 3';

// Unit titles for reference
export const BOOK3_UNIT_TITLES = [
  'BACK TO SCHOOL - SCHOOL OBJECTS',        // 1
  'MY DAILY ROUTINE',                       // 2
  'FAIRY TALES',                           // 3
  'FREE TIME - HOBBIES',                   // 4
  'SEVEN CONTINENTS',                      // 5
  'WHEN IS YOUR BIRTHDAY',                 // 6
  'THE SOLAR SYSTEM / LET\'S GO SHOPPING', // 7 (dual unit)
  'LET\'S GO SHOPPING - HOW MUCH IS IT?',   // 8
  'LET\'S EAT OUT',                         // 9
  'MY FAVOURITE SUBJECT',                  // 10
  'GET WELL SOON',                         // 11
  'WHAT DO YOU LOOK LIKE',                 // 12
  'ANIMAL BODY PARTS',                     // 13
  'MY TOWN - EXCUSE ME WHERE IS THE?',     // 14
  'BUGS',                                  // 15
  'HOUSE CHORES',                          // 16
  'MUSIC INSTRUMENTS',                     // 17
  'MOVIES - FILMS',                        // 18
];

// Helper function to generate basic lesson plan structure based on unit information
export const generateDefaultBook3UnitLessonPlans = (unitId: string, unitTitle: string) => {
  return [
    {
      id: `book3-unit${unitId}-lesson-plan-1`,
      title: `${BOOK3_TITLE} - UNIT ${unitId} - ${unitTitle} - Lesson Plan 1`,
      objectives: ['To understand main vocabulary', 'To recognize and use key phrases', 'To practice conversation skills'],
      materials: ['Visual English Book 3', 'Flashcards', 'Wordwall games', 'Handouts'],
      warmUpActivity: 'Review previous vocabulary with a quick game of charades.',
      mainActivities: [
        'Introduce new vocabulary using flashcards and real objects.',
        'Practice pronunciation with choral and individual repetition.',
        'Pair students to practice short dialogues using the new vocabulary.'
      ],
      coolDownActivity: 'Play a quick Wordwall game to reinforce learning.',
      assessment: 'Monitor student participation and pronunciation during activities.',
      homework: 'Complete workbook exercises related to today\'s lesson.'
    },
    {
      id: `book3-unit${unitId}-lesson-plan-2`,
      title: `${BOOK3_TITLE} - UNIT ${unitId} - ${unitTitle} - Lesson Plan 2`,
      objectives: ['To review and practice vocabulary', 'To develop reading and writing skills', 'To engage in collaborative activities'],
      materials: ['Visual English Book 3', 'Activity worksheets', 'Art supplies', 'Digital resources'],
      warmUpActivity: 'Quick vocabulary review using a memory game.',
      mainActivities: [
        'Read a short story or dialogue incorporating the unit vocabulary.',
        'Complete a worksheet with fill-in-the-blank or matching exercises.',
        'Create a mini-project related to the unit theme in small groups.'
      ],
      coolDownActivity: 'Share group work and provide positive feedback.',
      assessment: 'Collect worksheets to check comprehension and review as needed.',
      homework: 'Prepare a brief presentation using the vocabulary for next class.'
    }
  ];
};
