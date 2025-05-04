/**
 * Visual English Book 2, Unit 9: BODY
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit9Resources } from './book2-unit9-resources';

// Function to get resources for this unit
export function getBook2Unit9Resources(): TeacherResource[] {
  return book2Unit9Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit9LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit9-lesson1',
      title: 'Body Parts - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common body parts',
        'Students will practice identifying body parts through songs and games',
        'Students will follow TPR (Total Physical Response) commands related to body parts'
      ],
      materials: [
        'Visual English Book 2 Unit 9 slides',
        'Body parts flashcards',
        'Head, Shoulders, Knees and Toes song video',
        'Wordwall body parts games'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Use a puppet or stuffed animal to point to different body parts. Say each part clearly and have students repeat.'
        },
        {
          title: 'Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Introduce body part vocabulary with flashcards. Show each card, say the body part name, and have students point to that part on themselves.'
        },
        {
          title: 'Head, Shoulders, Knees and Toes Song',
          duration: '8 minutes',
          description: 'Play the "Head, Shoulders, Knees and Toes" video. First, demonstrate the actions, then have students join in, touching each body part as it is mentioned.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 9 slides showing different body parts. For each slide, ask "What\'s this?" and guide students to answer with "It\'s a/an..."'
        },
        {
          title: 'TPR Activity',
          duration: '10 minutes',
          description: 'Give commands like "Touch your nose", "Raise your arm", "Shake your leg". Gradually increase complexity by combining commands: "Touch your nose with your left hand."'
        },
        {
          title: 'Wrap-up Game',
          duration: '5 minutes',
          description: 'Play "Simon Says" using body part vocabulary learned in the lesson.'
        }
      ],
      assessmentTips: 'Observe students\' ability to correctly identify and name body parts. Check comprehension through TPR activity responses.',
      homeworkIdeas: [
        'Draw and label a person with at least 10 body parts',
        'Practice singing Head, Shoulders, Knees and Toes at home'
      ]
    },
    {
      id: 'book2-unit9-lesson2',
      title: 'Body Parts - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will deepen their understanding of body part vocabulary',
        'Students will learn to describe body parts using simple adjectives',
        'Students will create a monster/robot by describing body parts'
      ],
      materials: [
        'Visual English Book 2 Unit 9 slides',
        'Move Your Legs and Arms video',
        'Drawing paper and colored pencils/markers',
        'Robot body parts Wordwall games'
      ],
      steps: [
        {
          title: 'Warm-up Review',
          duration: '5 minutes',
          description: 'Quick review of body part vocabulary using flashcards or by singing the Head, Shoulders, Knees and Toes song again.'
        },
        {
          title: 'Body Part Descriptions',
          duration: '10 minutes',
          description: 'Teach simple adjectives to describe body parts: big, small, long, short, strong. Model sentences like "I have small ears" or "She has long arms."'
        },
        {
          title: 'Movement Activity',
          duration: '10 minutes',
          description: 'Play the "Move Your Legs and Arms" video and have students follow along with the movements. Pause occasionally to have students name the body parts they\'re moving.'
        },
        {
          title: 'Monster/Robot Creation',
          duration: '12 minutes',
          description: 'Students draw a monster or robot with unusual body parts. Guide them with prompts like "Draw a monster with three eyes" or "Give your robot long arms". Circulate and ask students to describe their creations.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Robot Body Parts Wordwall games from the Unit 9 resources to practice vocabulary in a fun context.'
        },
        {
          title: 'Presentatio  and Closure',
          duration: '5 minutes',
          description: 'Have a few volunteers show their monster/robot drawings and describe them using body part vocabulary and adjectives.'
        }
      ],
      assessmentTips: 'Evaluate students\' use of body part vocabulary during the monster/robot creation and presentation.',
      homeworkIdeas: [
        'Play the "Make a Robot" game on ABCYA.com',
        'Create a body part word search with 10 vocabulary words'
      ],
      additionalResources: [
        {
          title: 'Head, Shoulders, Knees and Toes Song',
          url: 'https://www.youtube.com/watch?v=h4eueDYPTIg'
        },
        {
          title: 'Make a Robot Game',
          url: 'https://www.abcya.com/games/make_a_robot'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit9Resources,
  generateUnit9LessonPlans
};