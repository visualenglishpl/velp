import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from './book3-resources-common';
import { book3Unit17Resources } from './book3-unit17-resources';

/**
 * Book 3 Unit 17 - HOUSE CHORES
 * Implementation file for unit resources and lesson plans
 * Content moved from previous Unit 16 House Chores implementation
 */

// Export resources getter function
export const getBook3Unit17Resources = (): TeacherResource[] => {
  return book3Unit17Resources.map(resource => ({
    ...resource,
    id: resource.id || `book3-unit17-${resource.title?.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '3',
    unitId: '17',
    // Flag for resources without QA mappings to render blank on content slides
    showBlankIfUnmapped: true
  }));
};

// Generate specific lesson plans for this unit
export const generateBook3Unit17LessonPlans = (): LessonPlan[] => {
  const unitNumber = '17';
  const unitTitle = BOOK3_UNIT_TITLES[unitNumber] || 'HOUSE CHORES';
  
  return [
    {
      id: `book3-unit${unitNumber}-lesson1`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 1`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Learn vocabulary for common household chores', 'Use present continuous tense to describe chores', 'Practice asking and answering questions about household responsibilities'],
      materials: ['Visual English 3 textbook', 'Flashcards showing different chores', 'Cleaning prop items (toy broom, duster, etc.)', 'Task cards for role-play activities'],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Introduction to house chores vocabulary with mime.',
          instructions: [
            'Mime different household chores (sweeping, washing dishes, etc.).',
            'Ask students to guess what you are doing.',
            'Introduce the phrase: "I am (sweeping the floor)."'
          ]
        },
        {
          title: 'Vocabulary Development',
          duration: '10 minutes',
          description: 'Teach and practice house chores vocabulary.',
          instructions: [
            'Show flashcards with different household chores.',
            'Say each chore and have students repeat.',
            'Practice the present continuous form: "He is washing the dishes."',
            'Have students match chore words to pictures.'
          ]
        },
        {
          title: 'Clean Up Song Video',
          duration: '8 minutes',
          description: 'Watch the "Clean Up Song" video and practice actions.',
          instructions: [
            'Play the "Clean Up Song" video.',
            'Have students stand up and mime the actions from the video.',
            'Pause occasionally to practice saying the chore phrases.',
            'After the video, ask students which chores they saw.'
          ],
          teacherNotes: 'Encourage students to use full sentences when responding.'
        },
        {
          title: 'Chore Charades',
          duration: '10 minutes',
          description: 'Students practice acting out and guessing house chores.',
          instructions: [
            'Divide students into small groups.',
            'One student acts out a chore without speaking.',
            'Others guess: "Are you (washing the windows)?"',
            'The student performing answers: "Yes, I am" or "No, I am not."',
            'Students take turns acting out different chores.'
          ]
        },
        {
          title: 'Wordwall Game',
          duration: '8 minutes',
          description: 'Play the Wordwall HOUSE CHORES game as a class.',
          instructions: [
            'Display the Wordwall HOUSE CHORES game on the board.',
            'Have students take turns matching chores to their images or descriptions.',
            'Award points for correct matches.'
          ]
        },
        {
          title: 'Wrap-up Activity',
          duration: '4 minutes',
          description: 'Review vocabulary through a quick survey activity.',
          instructions: [
            'Ask: "Who helps with chores at home?"',
            'Have students share: "I help my mom. I wash the dishes."',
            'Create a quick tally of the most common chores students do at home.'
          ]
        }
      ],
      assessmentTips: 'Check students\'s ability to correctly use the present continuous tense. Note if they can match the vocabulary to the correct actions.',
      homeworkIdeas: ['Draw a picture of yourself doing a household chore and write a sentence: "I am ____."', 'Make a list of five chores you do at home.']
    },
    {
      id: `book3-unit${unitNumber}-lesson2`,
      title: `${BOOK3_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Lesson Plan 2`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: ['Practice making sentences about household chores', 'Learn to express frequency of chores', 'Develop listening comprehension through household chores activities'],
      materials: ['Visual English 3 textbook', 'Picture cards of household chores', 'Frequency adverbs cards (always, sometimes, never, etc.)', 'Household Chores video'],
      steps: [
        {
          title: 'Review',
          duration: '5 minutes',
          description: 'Quick review of household chores vocabulary from previous lesson.',
          instructions: [
            'Show flashcards of chores from the previous lesson.',
            'Students call out the chores quickly.',
            'Ask: "What chore is this? What is she doing?"'
          ]
        },
        {
          title: 'Household Chores Video',
          duration: '10 minutes',
          description: 'Watch the Household Chores video.',
          instructions: [
            'Play the "Household Chores" video.',
            'Ask students to listen for chores they recognize.',
            'Pause after each chore and practice pronunciation.',
            'Discuss any new chores not covered in the previous lesson.'
          ]
        },
        {
          title: 'Frequency of Chores',
          duration: '8 minutes',
          description: 'Teach vocabulary for how often we do chores.',
          instructions: [
            'Introduce frequency adverbs: always, usually, sometimes, rarely, never.',
            'Model sentences: "I always make my bed. I sometimes wash the dishes."',
            'Have students create their own sentences about how often they do chores.',
            'Practice question form: "How often do you sweep the floor?"'
          ]
        },
        {
          title: 'Chores Survey',
          duration: '10 minutes',
          description: 'Students practice asking and answering about chore frequency.',
          instructions: [
            'Give students a chart with chores listed.',
            'Have them circulate and ask classmates: "How often do you ___?"',
            'Students record answers using frequency adverbs.',
            'After the activity, ask students to report: "Maria always helps her mother with cooking."'
          ],
          teacherNotes: 'Monitor for correct question formation and appropriate use of frequency adverbs.'
        },
        {
          title: 'Wordwall Game - Advanced',
          duration: '8 minutes',
          description: 'Play one of the more challenging Wordwall games.',
          instructions: [
            'Select Wordwall HOUSE CHORES (2) or (3) game.',
            'This time, focus on creating full sentences with the chores.',
            'For each match, students must say: "She is ___" or "He is ___."'
          ]
        },
        {
          title: 'Closing Activity',
          duration: '4 minutes',
          description: 'Create a class "chores chart."',
          instructions: [
            'Draw a simple chart on the board with days of the week.',
            'Ask students: "What chores do you do on Monday?"',
            'Fill in the chart based on student responses.',
            'Discuss patterns: "Many students help with dishes on weekends."'
          ]
        }
      ],
      assessmentTips: 'Observe students\' ability to use frequency adverbs correctly. Note if they can ask and answer questions about household responsibilities.',
      homeworkIdeas: ['Create a weekly chore chart for yourself with at least 5 chores.', 'Complete one of the Wordwall activities online and take a screenshot to share with the class.']
    }
  ];
};
