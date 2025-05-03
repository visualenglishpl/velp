/**
 * Implementation file for Book 1 Unit 8: Vegetables
 *
 * This unit focuses on teaching vegetables vocabulary and healthy eating
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit8Resources } from './book1-unit8-resources';

// Export a function to get resources for this unit
export const getBook1Unit8Resources = (): TeacherResource[] => {
  return book1Unit8Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit8LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Vegetable Vocabulary (45 minutes)
    {
      id: 'book1-unit8-lesson1',
      title: 'Vegetable Vocabulary - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify common vegetables (carrot, potato, tomato, broccoli, corn, cucumber)',
        'Use the structures "I like..." and "I don\'t like..." with vegetables',
        'Talk about healthy eating habits'
      ],
      materials: [
        'Visual English Book 1 - Unit 8 slides',
        'Vegetable flashcards',
        'Vegetable song video from resources section',
        'Plastic vegetable models or real vegetables (if available)',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of vegetables. Show vegetable flashcards one by one and ask "What is this?". Students respond with the vegetable name.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the Vegetable Song video. Pause at different points to reinforce vocabulary. Introduce the idea of healthy eating and vegetables being good for us.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students take turns asking "Do you like [vegetable]?" using the flashcards. Partner responds with "Yes, I like [vegetable]" or "No, I don\'t like [vegetable]". Teacher monitors and provides feedback.'
        },
        {
          title: 'Production',
          duration: '10 minutes',
          description: 'Students draw their favorite and least favorite vegetables. They present to a small group saying "I like [vegetable]" and "I don\'t like [vegetable]". Teacher encourages students to say why they like or don\'t like each vegetable.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Review vegetable vocabulary with a quick game: teacher shows a vegetable flashcard and asks "Is this healthy?". Students respond "Yes, it is" or "No, it isn\'t". Assign homework: make a list of vegetables they eat at home.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper use of "I like/don\'t like" structures. Check for correct vegetable identification in drawings.',
      homeworkIdeas: [
        'Make a list of vegetables they eat at home',
        'Draw and label 5 vegetables they can find in their kitchen'
      ],
      additionalResources: [
        {
          title: 'The Vegetable Song - Super Simple Songs',
          url: 'https://www.youtube.com/watch?v=RE5tvaveVak'
        },
        {
          title: 'Eat Your Vegetables Song - Dream English',
          url: 'https://www.youtube.com/watch?v=yLkz1scO3BQ'
        }
      ]
    },
    
    // Lesson Plan 2 - Vegetables and Healthy Eating (45 minutes)
    {
      id: 'book1-unit8-lesson2',
      title: 'Vegetables and Healthy Eating - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand vegetable vocabulary',
        'Learn to describe vegetables (color, size, taste)',
        'Talk about healthy meals with vegetables'
      ],
      materials: [
        'Visual English Book 1 - Unit 8 slides',
        'Vegetable flashcards and pictures',
        'Wordwall vegetable games',
        'Paper plates and craft materials for healthy meal activity'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Review vegetable vocabulary with a quick sorting game. Students take turns sorting vegetable cards by color or size.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Introduce descriptive words for vegetables (green, orange, big, small, crunchy, etc.). Show different vegetables and describe them. Introduce the concept of a healthy meal with different vegetables.'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Group activity: Students create a "Healthy Plate" using paper plates and drawings of vegetables. They must include at least 3 vegetables and be ready to name them. Teacher helps with vocabulary as needed.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use one of the Wordwall vegetable games for interactive practice. Students take turns identifying vegetables and describing them while the class helps.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Circle time: Each student presents their "Healthy Plate" saying "On my healthy plate, I have [vegetables].". Review all vocabulary learned and discuss the importance of vegetables for health.'
        }
      ],
      assessmentTips: 'Check student understanding through the healthy plate activity. Monitor use of descriptive language during presentations.',
      homeworkIdeas: [
        'Draw their favorite meal that includes vegetables',
        'Help prepare a vegetable dish at home and be ready to talk about it'
      ],
      additionalResources: [
        {
          title: 'Vegetable Flashcards - Printable Resource',
          url: 'https://supersimple.com/free-printable/vegetable-flashcards/'
        },
        {
          title: 'Cooking Vegetables with Gus - Watts English',
          url: 'https://www.youtube.com/watch?v=5OFrSNOqpOk'
        }
      ]
    }
  ];
};