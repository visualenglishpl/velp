import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';
import book3Unit10Resources from './book3-unit10-resources';

/**
 * Book 3 Unit 10 - MY FAVOURITE SUBJECT
 * Implementation file for unit resources and lesson plans
 */

const unitNumber = '10';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Export resources getter function
export const getBook3Unit10Resources = (): TeacherResource[] => book3Unit10Resources;

// Generate specific lesson plans for this unit
export const generateBook3Unit10LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for school subjects', 'Express likes and dislikes about subjects', 'Ask and answer about favorite subjects'],
      materials: ['School subject flashcards', 'Whiteboard', 'Visual English 3 textbook', 'Emoji faces (happy/neutral/sad)'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Have students name as many school subjects as they can.'
        },
        {
          title: 'Subject Vocabulary',
          duration: '10 minutes',
          description: 'Introduce or review school subject vocabulary with flashcards.',
          instructions: [
            'Hold up each flashcard and say the subject name.',
            'Have students repeat the pronunciation.',
            'Ask simple comprehension questions about each subject.'
          ]
        },
        {
          title: 'Video Song',
          duration: '8 minutes',
          description: 'Play the "What\'s Your Favorite Subject?" video song.',
          teacherNotes: 'Pause the video after each subject to have students repeat and point to the corresponding flashcard.'
        },
        {
          title: 'School Subject Likes',
          duration: '10 minutes',
          description: 'Practice expressing opinions about school subjects.',
          instructions: [
            'Model sentences: "I like math. I don\'t like history."',
            'Have students express their opinions about each subject using happy/neutral/sad emoji faces.',
            'Write sample sentences on the board.'
          ]
        },
        {
          title: 'Favorite Subject Survey',
          duration: '7 minutes',
          description: 'Students ask and answer about favorite subjects in pairs.',
          instructions: [
            'Model: "What\'s your favorite subject? My favorite subject is science."',
            'Students walk around asking each other about favorite subjects.',
            'They should talk to at least 5 classmates.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Create a class chart showing the most popular subjects based on the survey.'
        }
      ],
      assessmentTips: 'Check for correct pronunciation of subject names and proper use of "favorite" in questions and answers.',
      homeworkIdeas: ['Create a mini poster about your favorite subject.', 'Complete the subject vocabulary worksheet.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Use adjectives to describe school subjects', 'Give reasons for liking or disliking subjects', 'Create a school schedule'],
      materials: ['Subject flashcards', 'Adjective word cards', 'Blank schedule templates', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Quick review of subject vocabulary using flashcards.'
        },
        {
          title: 'Subject Adjectives',
          duration: '8 minutes',
          description: 'Teach adjectives for describing school subjects.',
          instructions: [
            'Introduce adjectives: interesting, boring, fun, difficult, easy, important.',
            'Model sentences: "Math is difficult. Art is fun."',
            'Practice using adjectives with different subjects.'
          ]
        },
        {
          title: 'School Subject Opinions',
          duration: '10 minutes',
          description: 'Students give reasons for liking or disliking subjects.',
          instructions: [
            'Model: "I like science because it\'s interesting." "I don\'t like history because it\'s boring."',
            'Students write three sentences about subjects they like or dislike with reasons.',
            'Share with a partner.'
          ]
        },
        {
          title: 'Video Activity',
          duration: '7 minutes',
          description: 'Watch the "This is Britain - School" video.',
          teacherNotes: 'Pause video at relevant points to discuss differences between British schools and local schools.'
        },
        {
          title: 'School Schedule',
          duration: '10 minutes',
          description: 'Students create their ideal school schedule.',
          instructions: [
            'Distribute blank schedule templates for Monday-Friday.',
            'Students fill in their ideal subjects for each day.',
            'Include at least 5 different subjects.',
            'Label each with an adjective.'
          ]
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students present their ideal schedules to the class or in small groups.'
        }
      ],
      assessmentTips: 'Evaluate correct use of adjectives to describe subjects and ability to give reasons for preferences.',
      homeworkIdeas: ['Interview a family member about their favorite school subject.', 'Create a comparison chart of your real schedule and your ideal schedule.']
    }
  ];
};
