import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
// Import resources directly
import book3Unit10Resources from './book3-unit10-resources';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '10';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'MY FAVOURITE SUBJECT';

// Export resources getter function
export const getBook3Unit10Resources = (): TeacherResource[] => {
  return book3Unit10Resources;
};

// Generate specific lesson plans for this unit
export const generateBook3Unit10LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for school subjects', 'Ask and answer about favorite subjects', 'Express preferences'],
      materials: ['School subjects flashcards', 'Visual English 3 textbook', 'School timetable template', 'Colored pencils'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Show pictures of different school subjects and elicit names.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Teach key school subject vocabulary.',
          instructions: [
            'Present flashcards with different subjects: math, science, art, music, etc.',
            'Model pronunciation and have students repeat.',
            'Ask students to mimic actions related to each subject (drawing for art, calculating for math).'
          ]
        },
        {
          title: 'Video: What\'s Your Favorite Subject',
          duration: '8 minutes',
          description: 'Watch the "What\'s Your Favorite Subject" video.',
          instructions: [
            'Play the video once through.',
            'Play again, pausing to practice the question and answers.',
            'Have students repeat key phrases from the video.'
          ],
          teacherNotes: 'This video introduces the target question structure in a natural context.'
        },
        {
          title: 'Question & Answer Practice',
          duration: '7 minutes',
          description: 'Practice asking and answering about favorite subjects.',
          instructions: [
            'Model: "What\'s your favorite subject?" "My favorite subject is..."',
            'Practice in pairs, then as whole class in a chain drill.',
            'Extend by asking "Why?" and teaching simple responses like "It\'s fun/interesting/easy."'
          ]
        },
        {
          title: 'School Timetable Activity',
          duration: '10 minutes',
          description: 'Students create their ideal school timetable.',
          instructions: [
            'Give each student a blank timetable template.',
            'Students fill in their dream schedule with favorite subjects.',
            'Encourage them to add some unusual subjects like "dinosaur studies" or "chocolate making."',
            'Students color and decorate their timetables.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play the Wordwall School Subjects game to reinforce vocabulary.'
        }
      ],
      assessmentTips: 'Check students\' ability to correctly identify and name school subjects. Observe their use of "What\'s your favorite subject?" and appropriate responses.',
      homeworkIdeas: ['Complete the school subjects matching worksheet.', 'Ask family members about their favorite subjects and report findings.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Review school subject vocabulary', 'Discuss reasons for subject preferences', 'Conduct a class survey about favorite subjects'],
      materials: ['Chart paper', 'Sticky notes', 'Visual English 3 textbook', 'Subject survey handout'],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Play a quick memory game with school subjects vocabulary.'
        },
        {
          title: 'Video: School Subjects Song',
          duration: '7 minutes',
          description: 'Watch the "School Subjects Song" video.',
          teacherNotes: 'This song helps reinforce vocabulary in a catchy way. Encourage students to sing along.'
        },
        {
          title: 'Reasons & Opinions',
          duration: '10 minutes',
          description: 'Expand vocabulary for expressing opinions about subjects.',
          instructions: [
            'Teach useful phrases: "It\'s interesting/boring/difficult/easy/fun."',
            'Create a simple mind map on the board with reasons for liking different subjects.',
            'Model giving reasons: "I like art because it\'s creative."',
            'Have students practice giving reasons for their preferences.'
          ]
        },
        {
          title: 'Class Survey',
          duration: '15 minutes',
          description: 'Students conduct a favorite subject survey.',
          instructions: [
            'Give each student a survey sheet with classmates\' names and subject options.',
            'Students circulate, asking "What\'s your favorite subject? Why?"',
            'They record answers on their sheets.',
            'After the survey, create a class graph showing the most popular subjects.',
            'Discuss the results as a class.'
          ]
        },
        {
          title: 'This is Britain Video',
          duration: '5 minutes',
          description: 'Watch segments of the "This is Britain - School" video to compare schools.',
          teacherNotes: 'Pause to discuss similarities and differences with schools in your country.'
        },
        {
          title: 'Wrap-up Activity',
          duration: '3 minutes',
          description: 'Play the second Wordwall game to consolidate learning.'
        }
      ],
      assessmentTips: 'Evaluate students\' ability to express preferences with reasons. Check their comfort in asking survey questions and recording information.',
      homeworkIdeas: ['Design a poster about your favorite subject explaining why you like it.', 'Complete the online Wordwall activities about school subjects.']
    }
  ];
};
