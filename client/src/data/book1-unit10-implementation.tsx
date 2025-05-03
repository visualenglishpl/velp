/**
 * Visual English Book 1, Unit 10: My Crazy Hair
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit10Resources } from './book1-unit10-resources';

// Export a function to get resources for this unit
export const getBook1Unit10Resources = (): TeacherResource[] => {
  return book1Unit10Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit10LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Hair Vocabulary (45 minutes)
    {
      id: 'book1-unit10-lesson1',
      title: 'Introduction to Hair Vocabulary',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic hair-related vocabulary (hair, long, short, curly, straight, etc.)',
        'Identify different hair styles and colors',
        'Use simple sentences to describe hair'
      ],
      materials: [
        'Visual English Book 1 - Unit 10 slides',
        'Hair vocabulary flashcards',
        'Hair - PANCAKE MANOR video from resources section',
        'Drawing paper and colored pencils',
        'Mirror for self-observation'
      ],
      steps: [
        {
          title: 'Hair Song Introduction',
          duration: '5 minutes',
          description: 'Play the "Hair - PANCAKE MANOR" video. Have students watch and listen first time, then encourage them to sing along during the second viewing.'
        },
        {
          title: 'Hair Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Use flashcards to introduce hair vocabulary: long, short, curly, straight, blonde, brown, black, red, etc. Have students repeat each word and touch their own hair when applicable.'
        },
        {
          title: 'Descriptive Hair Phrases',
          duration: '8 minutes',
          description: 'Teach simple phrases: "I have long hair", "She has curly hair", "He has short hair". Have students practice these phrases in pairs, describing each other\'s hair.'
        },
        {
          title: 'Crazy Hair Drawing Activity',
          duration: '15 minutes',
          description: 'Give students drawing paper and have them create a "crazy hair" character with unique hair (different colors, styles, etc.). Then have them describe their character using vocabulary learned.'
        },
        {
          title: 'Review and Game',
          duration: '7 minutes',
          description: 'Review the vocabulary using student drawings as examples. Play a quick "I spy" game: "I spy someone with short black hair" and students point to the appropriate drawing.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of hair vocabulary. Check drawings and descriptions for understanding.',
      homeworkIdeas: [
        'Find and cut out pictures of different hairstyles from magazines',
        'Draw family members and describe their hair'
      ],
      additionalResources: [
        {
          title: 'Hair Vocabulary Resources',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    },
    
    // Lesson Plan 2 - Hair Styles and Descriptions (45 minutes)
    {
      id: 'book1-unit10-lesson2',
      title: 'Hair Styles and Descriptions',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Expand hair vocabulary (ponytail, braid, bun, etc.)',
        'Practice describing hair in more detail',
        'Learn to ask and answer questions about hair'
      ],
      materials: [
        'Visual English Book 1 - Unit 10 slides',
        'Funny Haircut - WATTS ENGLISH video',
        'Pictures of different hairstyles',
        'Wordwall games from resources section',
        'Toy hairdressing props (optional)'
      ],
      steps: [
        {
          title: 'Review and Video',
          duration: '7 minutes',
          description: 'Review hair vocabulary from previous lesson. Then play the "Funny Haircut - WATTS ENGLISH" video, asking students to notice different hairstyles.'
        },
        {
          title: 'New Vocabulary Introduction',
          duration: '8 minutes',
          description: 'Introduce new hairstyle vocabulary: ponytail, braid, bun, bangs, etc. Show pictures or demonstrate on willing students or dolls if available.'
        },
        {
          title: 'Question Practice',
          duration: '10 minutes',
          description: 'Teach question forms: "What color is your hair?" "Is your hair long or short?" "Do you have curly hair?" Have students practice in pairs, asking and answering questions about their hair.'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '10 minutes',
          description: 'Use the "WORDWALL - MY CRAZY HAIR" games from the resources. Students take turns coming to the board to match hair vocabulary or complete hair-related activities.'
        },
        {
          title: 'Role Play Activity',
          duration: '10 minutes',
          description: 'Students role-play a hairdresser and customer scenario. The customer describes what kind of hairstyle they want, and the hairdresser responds appropriately. Use toy props if available.'
        }
      ],
      assessmentTips: 'Listen for correct use of descriptive vocabulary during role plays. Check comprehension through game participation.',
      homeworkIdeas: [
        'Create a "hair styles around the world" mini-poster',
        'Practice describing family members\' or friends\' hair'
      ],
      additionalResources: [
        {
          title: 'Hair Styles and Descriptions',
          url: 'https://en.islcollective.com/'
        }
      ]
    }
  ];
};

export default generateUnit10LessonPlans;
