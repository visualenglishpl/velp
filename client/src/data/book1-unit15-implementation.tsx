/**
 * Implementation file for Book 1 Unit 15: FRUIT
 *
 * This unit focuses on teaching fruit vocabulary and expressions related to likes and preferences
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit15Resources } from './book1-unit15-resources';

// Export a function to get resources for this unit
export const getBook1Unit15Resources = (): TeacherResource[] => {
  return book1Unit15Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit15LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Fruit (45 minutes)
    {
      id: 'book1-unit15-lesson1',
      title: 'Introduction to Fruit - Lesson 1',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn basic fruit vocabulary (apple, banana, orange, etc.)',
        'Identify different fruits by name and color',
        'Use simple sentences with fruit vocabulary: "I like..."'
      ],
      materials: [
        'Visual English Book 1 - Unit 15 slides',
        'Fruit flashcards or real fruit',
        'Fruit Song videos from resources section',
        'Drawing paper and colored pencils'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Greet students and introduce the topic of fruit. If possible, bring real fruit or show flashcards one by one and ask students to repeat the vocabulary: "apple, banana, orange..."'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Play the "Fruit Song for Kids" video. Pause at different points to reinforce vocabulary. Introduce key expressions: "I like apples. Do you like bananas?"'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Pair activity: Students practice asking and answering "Do you like (fruit)?" "Yes, I do" or "No, I don\'t". Teacher monitors and provides feedback.'
        },
        {
          title: 'Activity',
          duration: '10 minutes',
          description: 'Draw and Color: Students draw their favorite fruits and label them. Then they present to a partner: "I like apples. They are red."'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Play "I Like Apples" song. Students sing along and mime eating the different fruits. Assign simple homework related to the topic.'
        }
      ],
      assessmentTips: 'Monitor students during pair work for proper pronunciation and use of vocabulary. Check drawings for accuracy in naming fruits.',
      homeworkIdeas: [
        'Complete a fruit matching worksheet',
        'Draw your favorite fruit salad and label all fruits'
      ],
      additionalResources: [
        {
          title: 'Fruit Vocabulary Resources',
          url: 'https://supersimple.com/articles/fruits-and-vegetables/'
        }
      ]
    },
    
    // Lesson Plan 2 - Fruit in Practice (45 minutes)
    {
      id: 'book1-unit15-lesson2',
      title: 'Fruit in Practice - Lesson 2',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and expand fruit vocabulary',
        'Learn to express preferences: "I like/I don\'t like"',
        'Develop vocabulary for describing fruit (sweet, sour, juicy)'
      ],
      materials: [
        'Visual English Book 1 - Unit 15 slides',
        'Interactive fruit games from Wordwall',
        'Paper plates and art supplies',
        'Fruit Salad video'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Play the "Fruit Guessing Game" video. Students try to guess the fruit before it\'s fully revealed.'
        },
        {
          title: 'Presentation',
          duration: '10 minutes',
          description: 'Watch the "Fruit Salad" video. Teach new adjectives to describe fruit: sweet, sour, juicy, delicious. Model: "Apples are sweet. Lemons are sour."'
        },
        {
          title: 'Practice',
          duration: '15 minutes',
          description: 'Paper Plate Fruit Salad: Students create a paper fruit salad using art supplies. They must include at least 5 different fruits and be able to name them all.'
        },
        {
          title: 'Interactive Game',
          duration: '10 minutes',
          description: 'Use the Wordwall FRUIT games for interactive practice. Students take turns identifying fruits and expressing preferences.'
        },
        {
          title: 'Wrap-up',
          duration: '5 minutes',
          description: 'Fruit Survey: Students ask 3 classmates "What\'s your favorite fruit?" and report back to the class: "[Name] likes [fruit]."'
        }
      ],
      assessmentTips: 'Observe students during the fruit salad activity to check vocabulary retention. Listen for proper use of "I like/don\'t like" structures during the survey.',
      homeworkIdeas: [
        'Write 5 sentences about fruits you like and don\'t like',
        'Draw a fruit tree with at least 6 different fruits and label them'
      ],
      additionalResources: [
        {
          title: 'Fruit Activities for Young Learners',
          url: 'https://www.eslkidstuff.com/blog/classroom-games/fruit-and-veggie-esl-activities-for-kids'
        }
      ]
    }
  ];
};
