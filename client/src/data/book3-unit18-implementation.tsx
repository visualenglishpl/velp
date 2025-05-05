// Implementation file for Book 3 Unit 18

import { TeacherResource } from '@/components/TeacherResources';
import { book3Unit18Resources } from './book3-unit18-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '18';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber];

// Function to get resources for this unit
export const getBook3Unit18Resources = (): TeacherResource[] => book3Unit18Resources;

// Generate lesson plans for this unit
export const generateBook3Unit18LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary related to movies and films', 'Express movie preferences', 'Describe different film genres'],
      materials: ['Movie genre flashcards', 'Film poster images', 'Movie review worksheet', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Ask students about their favorite movies. What genres do they enjoy watching?'
        },
        {
          title: 'Movie Vocabulary',
          duration: '10 minutes',
          description: 'Introduce vocabulary related to movies and film genres.',
          instructions: [
            'Present words like "comedy", "action", "animation", "science fiction", etc.',
            'Show examples of movie posters for each genre.'
          ]
        },
        {
          title: 'Movie Preferences',
          duration: '8 minutes',
          description: 'Practice expressing movie preferences using "I like" and "I don\'t like".',
          teacherNotes: 'Model sentences like "I like comedies" or "I don\'t like horror movies"'
        },
        {
          title: 'Genre Sorting',
          duration: '7 minutes',
          description: 'Students sort movie titles or images into different genre categories.'
        },
        {
          title: 'Movie Review',
          duration: '10 minutes',
          description: 'Students complete a simple movie review worksheet about their favorite film.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Students share their movie reviews with a partner.'
        }
      ],
      assessmentTips: 'Check for correct genre vocabulary usage and ability to express preferences.',
      homeworkIdeas: ['Draw a poster for your favorite movie and label the genre.', 'Write 3-5 sentences about a movie you watched recently.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary about people who work in films', 'Practice describing movie plots', 'Create a simple movie scene'],
      materials: ['Film crew role cards', 'Short movie clips', 'Scene planning worksheet', 'Visual English 3 textbook'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review movie vocabulary from the previous lesson with a quick game.'
        },
        {
          title: 'Film Industry Roles',
          duration: '8 minutes',
          description: 'Introduce vocabulary for people who work in movies.',
          instructions: [
            'Present words like "actor", "actress", "director", "producer", etc.',
            'Discuss what each person does in making a film.'
          ]
        },
        {
          title: 'Movie Plot Description',
          duration: '7 minutes',
          description: 'Practice describing movie plots using simple present tense.',
          teacherNotes: 'Model descriptions like "The main character goes to a new school. He makes friends with..."'
        },
        {
          title: 'Famous Films',
          duration: '5 minutes',
          description: 'Show images from famous children\'s films and ask students to describe what they see.'
        },
        {
          title: 'Movie Scene Planning',
          duration: '10 minutes',
          description: 'In small groups, students plan a simple movie scene.',
          instructions: [
            'Groups decide on characters, setting, and a simple plot.',
            'They assign film crew roles to each group member.'
          ]
        },
        {
          title: 'Scene Performance',
          duration: '8 minutes',
          description: 'Groups act out their movie scenes for the class.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Discuss which scenes were most interesting and what made them effective.'
        }
      ],
      assessmentTips: 'Evaluate scene performances for creativity and appropriate use of film vocabulary.',
      homeworkIdeas: ['Create a comic strip showing a scene from your favorite movie.', 'Make a list of 5 film industry jobs and write what each person does.']
    }
  ];
};
