import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Book 3 title
export const BOOK3_TITLE = 'Visual English 3';

// Book 3 unit titles
export const BOOK3_UNIT_TITLES: Record<string, string> = {
  '1': 'Back to School - School Objects',
  '2': 'My Daily Routine',
  '3': 'Fairy Tales',
  '4': 'Free Time - Hobbies',
  '5': 'Seven Continents',
  '6': 'When Is Your Birthday',
  '7': 'The Solar System',
  '8': 'Let\'s Go Shopping - How Much Is It?',
  '9': 'Let\'s Eat Out',
  '10': 'My Favourite Subject',
  '11': 'Get Well Soon',
  '12': 'What Do You Look Like',
  '13': 'Animal Body Parts',
  '14': 'My Town - Excuse Me Where Is The?',
  '15': 'Bugs',
  '16': 'Sports',
  '17': 'Future Tense - Going to',
  '18': 'Movies - Films'
};

// Function to generate default Book 3 unit resources
export const generateDefaultBook3UnitResources = (unitId: string, unitTitle?: string): TeacherResource[] => {
  const title = unitTitle || BOOK3_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  return [
    // Default video placeholder
    {
      title: `${title} - Video Introduction`,
      description: `Introduction video for ${BOOK3_TITLE} Unit ${unitId}`,
      resourceType: 'video',
      provider: 'YouTube',
      content: {
        type: 'youtube',
        embedId: 'dQw4w9WgXcQ' // Placeholder ID
      }
    },
    // Default game placeholder
    {
      title: `WORDWALL - ${title} (1)`,
      description: `Interactive vocabulary game for ${title}`,
      resourceType: 'game',
      provider: 'Wordwall',
      content: {
        type: 'iframe',
        embedUrl: 'https://wordwall.net/embed/random'
      }
    }
  ];
};

// Helper function to generate default lesson plans for Book 3 units
export const generateDefaultBook3UnitLessonPlans = (unitId: string, unitTitle?: string): LessonPlan[] => {
  const title = unitTitle || BOOK3_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  return [
    // First 45-minute lesson plan
    {
      id: `book3-unit${unitId}-lesson1`,
      title: `${title} - Vocabulary Focus`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        `Introduce key vocabulary related to ${title}`,
        'Practice pronunciation and spelling',
        'Develop listening and speaking skills'
      ],
      materials: [
        'Visual English 3 textbook',
        'Vocabulary flashcards',
        'Audio recordings',
        'Whiteboard and markers'
      ],
      steps: [
        {
          title: 'Warm-up Activity',
          duration: '5 minutes',
          description: `Show pictures related to ${title} and ask students to name what they see. Write their responses on the board.`
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: `Present new vocabulary items with visual aids. Have students repeat the words and practice pronunciation.`
        },
        {
          title: 'Listen and Point',
          duration: '7 minutes',
          description: 'Play audio recordings of vocabulary words. Students point to the corresponding pictures in their books.'
        },
        {
          title: 'Pair Practice',
          duration: '10 minutes',
          description: 'Students work in pairs to practice using the new vocabulary in simple dialogues.'
        },
        {
          title: 'Vocabulary Game',
          duration: '10 minutes',
          description: `Play a matching game where students connect words to pictures related to ${title}.`
        },
        {
          title: 'Review',
          duration: '3 minutes',
          description: 'Recap the vocabulary learned and preview what will be covered in the next lesson.'
        }
      ],
      assessmentTips: 'Monitor student participation during paired activities. Check pronunciation and vocabulary usage.',
      homeworkIdeas: ['Complete vocabulary worksheet and practice using new words in sentences.']
    },
    // Second 45-minute lesson plan
    {
      id: `book3-unit${unitId}-lesson2`,
      title: `${title} - Communication Practice`,
      duration: '45 minutes',
      level: 'Elementary',
      objectives: [
        'Apply vocabulary in context',
        'Practice asking and answering questions',
        'Develop reading and writing skills'
      ],
      materials: [
        'Visual English 3 textbook',
        'Worksheet with dialogue examples',
        'Colored pencils or markers',
        'Task cards'
      ],
      steps: [
        {
          title: 'Vocabulary Review',
          duration: '5 minutes',
          description: 'Quick review of previous vocabulary through a short game or flashcard activity.'
        },
        {
          title: 'Dialogue Practice',
          duration: '10 minutes',
          description: `Read through example dialogues related to ${title} and have students practice in pairs.`
        },
        {
          title: 'Guided Writing',
          duration: '10 minutes',
          description: 'Students complete a worksheet with fill-in-the-blank sentences using the vocabulary.'
        },
        {
          title: 'Role-play Activity',
          duration: '15 minutes',
          description: `Students create and perform short role-plays incorporating ${title}-related vocabulary and phrases.`
        },
        {
          title: 'Class Sharing',
          duration: '5 minutes',
          description: 'Selected pairs share their role-plays with the class.'
        }
      ],
      assessmentTips: 'Evaluate student performance during role-plays. Check completed worksheets for accuracy.',
      homeworkIdeas: ['Create a mini-book or poster illustrating five key words learned from the unit.']
    }
  ];
};
