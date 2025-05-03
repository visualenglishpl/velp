/**
 * Visual English Book 1, Unit 1: Hello and Goodbye
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit1LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Greetings (45 minutes)
    {
      id: 'book1-unit1-lesson1',
      title: 'Introduction to Greetings',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and practice basic greeting expressions (hello, hi, good morning, good afternoon)',
        'Introduce oneself using simple expressions',
        'Recognize appropriate greetings for different times of day'
      ],
      materials: [
        'Visual English Book 1 - Unit 1 (slides 1-15)',
        'Flashcards with greeting expressions',
        'Name tags',
        'Hello song video (from Video Resources)'
      ],
      steps: [
        {
          title: 'Greeting Circle',
          duration: '5 minutes',
          description: 'Have students stand in a circle. Teacher demonstrates by walking to different students, shaking hands and saying "Hello, I\'m [name]." Students practice greeting each other and introducing themselves.'
        },
        {
          title: 'Time-based Greetings',
          duration: '10 minutes',
          description: 'Using Visual English Book 1 slides 3-8, introduce greetings for different times of day (good morning, good afternoon, good evening, good night). Have students practice each greeting with appropriate gestures.'
        },
        {
          title: 'Hello Song',
          duration: '10 minutes',
          description: 'Play the "Hello! - Super Simple Songs" video. First viewing: students watch and listen. Second viewing: students join in with actions. Third viewing: students sing along with the video.'
        },
        {
          title: 'Greeting Flashcard Practice',
          duration: '10 minutes',
          description: 'Show flashcards with different greeting expressions. Students practice saying the greetings aloud. For added challenge, show pictures indicating different times of day, and students must respond with the appropriate greeting.'
        },
        {
          title: 'Role Play Greetings',
          duration: '7 minutes',
          description: 'In pairs, students practice short dialogues using greetings and introductions. Example: "Good morning! I\'m Lisa. What\'s your name?" "Hello! I\'m Tom. Nice to meet you."'
        },
        {
          title: 'Greeting Ball Toss',
          duration: '3 minutes',
          description: 'Students stand in a circle. Teacher tosses a soft ball to a student and greets them. The student catches, responds, then tosses to another student with a greeting. Continue until all students have had a turn.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of greetings. Observe participation in the greeting circle and ball toss activities.',
      homeworkIdeas: [
        'Create greeting cards for family members, practicing the expressions at home.',
        'For advanced students: Add "How are you?" and responses to their greeting dialogues.'
      ],
      additionalResources: [
        {
          title: 'Hello! - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=tVlcKp3bWH8'
        }
      ]
    },
    
    // Lesson Plan 2 - Saying Goodbye (45 minutes)
    {
      id: 'book1-unit1-lesson2',
      title: 'Saying Goodbye',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and practice goodbye expressions (goodbye, bye-bye, see you later, see you tomorrow)',
        'Use appropriate leave-taking expressions in different contexts',
        'Practice basic conversation patterns including both greetings and farewells'
      ],
      materials: [
        'Visual English Book 1 - Unit 1 (slides 16-30)',
        'Goodbye song video (from Video Resources)',
        'Dialogue cards with greeting and farewell scenarios',
        'Paper for drawing activities'
      ],
      steps: [
        {
          title: 'Goodbye Actions',
          duration: '5 minutes',
          description: 'Teach students different actions for saying goodbye (waving, handshake, high-five). Practice each action while saying the corresponding expression ("Goodbye!", "See you later!", "See you tomorrow!").'
        },
        {
          title: 'Goodbye Expressions',
          duration: '10 minutes',
          description: 'Using Visual English Book 1 slides 16-22, introduce different ways to say goodbye. For each expression, discuss when it would be appropriate to use (formal vs. informal, time of day, etc.).'
        },
        {
          title: 'Goodbye Song',
          duration: '10 minutes',
          description: 'Play the "Goodbye Song - The Singing Walrus" video. First viewing: students watch and listen. Second viewing: students join in with actions. Third viewing: students sing along with the video.'
        },
        {
          title: 'Complete the Dialogue',
          duration: '10 minutes',
          description: 'Show incomplete dialogues on the board (with greetings and farewells missing). In pairs, students take turns completing the dialogues with appropriate expressions, then practice reading them aloud.'
        },
        {
          title: 'Greeting and Farewell Role Plays',
          duration: '7 minutes',
          description: 'Students work in pairs with scenario cards (e.g., "Meeting a friend in the morning, saying goodbye until tomorrow", "Greeting a teacher in the afternoon, saying goodbye at the end of class"). Each pair prepares and performs their dialogue.'
        },
        {
          title: 'Circle of Goodbyes',
          duration: '3 minutes',
          description: 'Standing in a circle, each student says goodbye to the class using a different expression learned in the lesson. Encourage students to use appropriate gestures with their goodbyes.'
        }
      ],
      assessmentTips: 'Listen for appropriate use of goodbye expressions during role plays. Check understanding through the "Complete the Dialogue" activity.',
      homeworkIdeas: [
        'Create greeting and goodbye cards for family members, practicing the expressions at home.'
      ],
      additionalResources: [
        {
          title: 'Goodbye Song - The Singing Walrus',
          url: 'https://www.youtube.com/watch?v=STMl4yjPnPk'
        }
      ]
    }
  ];
};

export default { generateUnit1LessonPlans };
