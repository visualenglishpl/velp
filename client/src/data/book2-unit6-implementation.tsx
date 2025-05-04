/**
 * Visual English Book 2, Unit 6: LET'S GO TO THE ZOO
 * Implementation file for unit resources and lesson plans
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book2Unit6Resources } from './book2-resources';

// Function to get resources for this unit
export function getBook2Unit6Resources(): TeacherResource[] {
  return book2Unit6Resources;
}

// Generate 45-minute lesson plans for this unit
export function generateUnit6LessonPlans(): LessonPlan[] {
  return [
    {
      id: 'book2-unit6-lesson1',
      title: 'Zoo Animals - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will learn vocabulary for common zoo animals',
        'Students will practice describing animals using simple adjectives',
        'Students will ask and answer questions about animals'
      ],
      materials: [
        'Visual English Book 2 Unit 6 slides',
        'Zoo animal flashcards or toys',
        'Video: Let\'s Go to the Zoo Song',
        'Animal sounds audio'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play animal sounds and ask students to guess which animal makes each sound.'
        },
        {
          title: 'Introducing Zoo Animals',
          duration: '10 minutes',
          description: 'Show flashcards of different zoo animals. Say the name of each animal clearly and have students repeat. Write the names on the board.'
        },
        {
          title: 'Let\'s Go to the Zoo Song',
          duration: '8 minutes',
          description: 'Play the "Let\'s Go to the Zoo" song. First, have students listen, then play it again and encourage them to sing along and do the actions.'
        },
        {
          title: 'Visual English Slides',
          duration: '10 minutes',
          description: 'Go through Unit 6 slides showing different zoo animals and related activities.'
        },
        {
          title: 'Animal Description Game',
          duration: '10 minutes',
          description: 'Model describing an animal: "It\'s big. It\'s gray. It has a long trunk. What is it?" Students guess the animal. Then have students play in pairs.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Quick review game: teacher says an animal name and students must make the appropriate animal movement or sound.'
        }
      ],
      assessmentTips: 'Observe students\'s participation in activities and their ability to identify and name animals correctly.',
      homeworkIdeas: [
        'Draw and label 5 zoo animals',
        'Complete a zoo animals worksheet'
      ]
    },
    {
      id: 'book2-unit6-lesson2',
      title: 'Zoo Animals - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Students will practice zoo animal vocabulary in context',
        'Students will learn to express likes and dislikes about animals',
        'Students will develop speaking skills through role-play'
      ],
      materials: [
        'Visual English Book 2 Unit 6 slides',
        'Zoo map handout',
        'Wordwall online games from Unit 6 resources',
        'Art supplies for animal masks'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Quick review of zoo animals with flashcards or by singing the "Let\'s Go to the Zoo" song again.'
        },
        {
          title: 'Zoo Map Activity',
          duration: '10 minutes',
          description: 'Distribute zoo maps. Teach prepositions of place (next to, between, across from) by asking students to locate animals on the map.'
        },
        {
          title: 'Likes and Dislikes',
          duration: '10 minutes',
          description: 'Teach the phrases "I like..." and "I don\'t like..." with animal names. Model examples and have students share their likes/dislikes.'
        },
        {
          title: 'Zoo Role-play',
          duration: '12 minutes',
          description: 'Students work in pairs with one as a zookeeper and one as a visitor. They practice dialogue about animals using target vocabulary.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall games from the Unit 6 resources to review and reinforce zoo animal vocabulary.'
        },
        {
          title: 'Closure',
          duration: '5 minutes',
          description: 'Class discussion: "If you could be any zoo animal, which would you be and why?"'
        }
      ],
      assessmentTips: 'Evaluate students\' use of target vocabulary during role-play activities and games.',
      homeworkIdeas: [
        'Write 5 sentences about zoo animals you like/don\'t like',
        'Create a simple zoo animal fact book'
      ],
      additionalResources: [
        {
          title: 'Let\'s Go to the Zoo Song',
          url: 'https://www.youtube.com/watch?v=OwRmivbNgQk'
        }
      ]
    }
  ];
}

export default {
  getBook2Unit6Resources,
  generateUnit6LessonPlans
};