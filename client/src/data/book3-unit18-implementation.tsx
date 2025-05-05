// This file imports and exports the resources and lesson plans for Book 3, Unit 18 - MOVIES & FILMS

import { book3Unit18Resources } from './book3-unit18-resources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES } from './book3-resources-common';

const unitNumber = '18';
const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'MOVIES & FILMS';

// Define lesson plans directly in the implementation file
const moviesVocabularyLessonPlan: LessonPlan = {
  id: `book3-unit${unitNumber}-lesson1`,
  title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
  duration: '45 minutes',
  level: 'Elementary',
  objectives: ['Learn vocabulary related to movies and films', 'Identify different types of movies', 'Express likes and dislikes about movie genres'],
  materials: ['Visual English 3 textbook', 'Movie genre flashcards', 'Movie poster images', 'Laptop/projector for Wordwall games'],
  steps: [
    {
      title: 'Warm-up Discussion',
      duration: '5 minutes',
      description: 'Introduction to movie types and preferences.',
      instructions: [
        'Ask: "Do you like watching movies?"',
        'Show pictures of different movie genres (animation, comedy, action, etc.).',
        'Introduce key vocabulary: movie, film, actor, actress, director, comedy, action, etc.'
      ]
    },
    {
      title: 'Vocabulary Development',
      duration: '10 minutes',
      description: 'Teach and practice movie-related vocabulary.',
      instructions: [
        'Show flashcards with different movie genres and movie-related words.',
        'Practice pronunciation as a class.',
        'Ask: "What type of movie is this?" while showing images from different films.',
        'Have students practice the structure: "It is a/an ____ movie."'
      ]
    },
    {
      title: 'Movie Preferences',
      duration: '8 minutes',
      description: 'Students share their movie preferences.',
      instructions: [
        'Model: "I like comedy movies. I don\'t like horror movies."',
        'Ask students to share their preferences using the same structure.',
        'Create a simple chart on the board tallying the most popular movie types in class.',
        'Introduce question form: "Do you like ____ movies?"'
      ],
      teacherNotes: 'Encourage students to use full sentences when responding.'
    },
    {
      title: 'Wordwall Game 1',
      duration: '10 minutes',
      description: 'Play the Wordwall Movies & Films game.',
      instructions: [
        'Display the Wordwall Movies & Films game on the board.',
        'Divide the class into teams.',
        'Teams take turns matching movie vocabulary to definitions or images.',
        'Award points for correct matches.'
      ]
    },
    {
      title: 'Movie Poster Activity',
      duration: '8 minutes',
      description: 'Students analyze and describe movie posters.',
      instructions: [
        'Show 3-4 different movie posters.',
        'In pairs, students describe what they see: "There is a superhero." "It looks like an action movie."',
        'For each poster, ask: "What kind of movie is this?" "Would you like to watch it? Why?"'
      ]
    },
    {
      title: 'Wrap-up Activity',
      duration: '4 minutes',
      description: 'Brief class survey about movie preferences.',
      instructions: [
        'Ask students to vote for their favorite movie type.',
        'Create a simple bar chart on the board with results.',
        'Announce the class\'s favorite movie genre.'
      ]
    }
  ],
  assessmentTips: 'Check students\' ability to correctly identify different movie genres. Note if they can express likes and dislikes using proper sentence structure.',
  homeworkIdeas: ['Draw a poster for your favorite movie and write 3 sentences about it.', 'Write about a movie you watched recently: What type was it? Did you like it? Why or why not?']
};

const movieRolesLessonPlan: LessonPlan = {
  id: `book3-unit${unitNumber}-lesson2`,
  title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
  duration: '45 minutes',
  level: 'Elementary',
  objectives: ['Learn vocabulary for people in movies (actor, director, etc.)', 'Practice asking and answering questions about movies', 'Develop speaking skills through role-play'],
  materials: ['Visual English 3 textbook', 'Role cards for movie-making simulation', 'Simple movie scene script', 'Props for movie-making activity (optional)'],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of movie genres from the previous lesson.',
      instructions: [
        'Show flashcards of different movie genres.',
        'Students call out the types quickly.',
        'Ask: "Who remembers what kind of movies we like in our class?"'
      ]
    },
    {
      title: 'People in Movies',
      duration: '10 minutes',
      description: 'Teach vocabulary for people who work in movies.',
      instructions: [
        'Introduce vocabulary: actor, actress, director, cameraman, producer, stunt performer.',
        'Show pictures of each role and explain what they do.',
        'Practice sentences: "An actor plays a character in a movie."',
        'Ask comprehension questions: "Who directs the movie?", "Who acts in the movie?"'
      ]
    },
    {
      title: 'Wordwall Game 2',
      duration: '8 minutes',
      description: 'Play the second Wordwall Movies & Films game.',
      instructions: [
        'Display Wordwall Movies & Films game (2).',
        'This time, focus on identifying people who work in movies.',
        'Students match job titles to their definitions or images.'
      ]
    },
    {
      title: 'Movie Interview Activity',
      duration: '10 minutes',
      description: 'Students practice interviewing in a movie context.',
      instructions: [
        'Pair students up - one is an interviewer, one is a movie star.',
        'Provide simple question prompts: "What movies have you been in?", "What type of movies do you like to make?"',
        'Have students switch roles after a few minutes.',
        'Ask a few pairs to perform their interviews for the class.'
      ],
      teacherNotes: 'Focus on proper question formation and appropriate responses.'
    },
    {
      title: 'Make a Mini-Movie',
      duration: '8 minutes',
      description: 'Students work in groups to plan a simple movie scene.',
      instructions: [
        'Divide the class into groups of 4-5 students.',
        'Assign roles: director, actors, camera person.',
        'Give each group a simple scenario (e.g., ordering food, meeting a friend).',
        'Groups plan their scene and practice it.',
        'If time permits, allow 1-2 groups to perform their scenes.'
      ]
    },
    {
      title: 'Wordwall Game 3',
      duration: '4 minutes',
      description: 'Play the third Wordwall Movies & Films game.',
      instructions: [
        'Use the remaining Wordwall game as a closing activity.',
        'Have students take turns or play as a whole class.'
      ]
    }
  ],
  assessmentTips: 'Observe students\' ability to use movie vocabulary correctly. Note their comfort level with role-playing and their ability to work collaboratively on the mini-movie activity.',
  homeworkIdeas: ['Write a short description of your favorite actor or actress.', 'Create a simple storyboard for a short movie scene with 4-6 panels.']
};

// Use type definition directly since importing from components can cause circular dependencies
type TeacherResource = {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
  content?: any;
  showBlankIfUnmapped?: boolean;
};

// Function to get lesson plans for this unit
export const generateBook3Unit18LessonPlans = (): LessonPlan[] => {
  return [
    moviesVocabularyLessonPlan,
    movieRolesLessonPlan
  ];
};

// Function to get resources for this unit
export const getBook3Unit18Resources = (): TeacherResource[] => {
  return book3Unit18Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit18-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '18',
    showBlankIfUnmapped: true
  }));
};

// Export the resources for this unit
export const unitResources = getBook3Unit18Resources();

// Export the lesson plans for this unit
export const lessonPlans = [
  moviesVocabularyLessonPlan,
  movieRolesLessonPlan
];
