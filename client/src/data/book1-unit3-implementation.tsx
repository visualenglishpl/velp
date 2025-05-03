/**
 * Visual English Book 1, Unit 3: Colors
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit3LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Colors (45 minutes)
    {
      id: 'book1-unit3-lesson1',
      title: 'Introduction to Colors',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify 8 basic colors (red, blue, green, yellow, orange, purple, black, white)',
        'Practice color identification through interactive activities',
        'Develop listening skills through color-based songs'
      ],
      materials: [
        'Visual English Book 1 - Unit 3 (slides 1-15)',
        'Colored flashcards',
        'Real objects in different colors',
        'Color songs from Video Resources',
        'Crayons/colored pencils'
      ],
      steps: [
        {
          title: 'Color Song Introduction',
          duration: '5 minutes',
          description: 'Play the "I See Something Blue - Super Simple Songs" video. Have students watch and listen first time, then encourage them to point to things of each color when mentioned in the song.'
        },
        {
          title: 'Color Flashcards',
          duration: '10 minutes',
          description: 'Introduce each color using flashcards. Hold up a color card, say the color name clearly, have students repeat. Practice with: red, blue, green, yellow, orange, purple, black, white.'
        },
        {
          title: 'Color Hunt',
          duration: '8 minutes',
          description: 'Say a color and have students point to or touch something of that color in the classroom. Example: "Find something blue!" Students quickly touch something blue and say "This is blue."'
        },
        {
          title: 'What Color Is It?',
          duration: '10 minutes',
          description: 'Using Visual English Book 1 slides 5-10, practice the question "What color is it?" and the answer "It is [color]." Show various colored objects, ask the question, and have students respond.'
        },
        {
          title: 'Color Sorting Activity',
          duration: '7 minutes',
          description: 'Place various colored objects in the center of class. Students take turns selecting an object, naming its color, and placing it in the correct color group.'
        },
        {
          title: 'Rainbow Colors Song',
          duration: '5 minutes',
          description: 'Play the "Rainbow Colors Song - KidsTV123" video. Have students sing along and make rainbow motions with their arms.'
        }
      ]
    },
    // Lesson Plan 2 - Colors in Our World (45 minutes)
    {
      id: 'book1-unit3-lesson2',
      title: 'Colors in Our World',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and consolidate colors vocabulary',
        'Learn to describe objects using colors',
        'Practice asking "What color is the [object]?" questions'
      ],
      materials: [
        'Visual English Book 1 - Unit 3 (slides 16-30)',
        'Colored objects from around the classroom',
        'Wordwall game on colors (from Game Resources)',
        'Paper and colored pencils/crayons for drawing activity'
      ],
      steps: [
        {
          title: 'Colors Song Review',
          duration: '5 minutes',
          description: 'Play the "Colors Song - The Singing Walrus" video. Students sing along and point to colors as they are mentioned.'
        },
        {
          title: 'Color Vocabulary Review',
          duration: '7 minutes',
          description: 'Hold up colored flashcards for quick review. Then show colored objects and ask "What color is it?" Students respond with "It is [color]."'
        },
        {
          title: 'What Color Is The...?',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 16-20, introduce the question "What color is the [object]?" and the answer "The [object] is [color]." Practice with classroom objects.'
        },
        {
          title: 'Color Detective',
          duration: '10 minutes',
          description: 'Students work in pairs. Student A chooses an object in the classroom without pointing to it, and describes it using color: "I spy something green." Student B must guess the object.'
        },
        {
          title: 'Wordwall Color Game',
          duration: '7 minutes',
          description: 'Play the "What Color Is It? - Quiz" game from Game Resources. Have students come to the board to match colors to objects or answer color questions.'
        },
        {
          title: 'My Rainbow Picture',
          duration: '8 minutes',
          description: 'Students draw a simple picture using at least 5 different colors. In pairs, they then describe their pictures: "This is a [color] [object]." For example: "This is a blue sky. This is a green tree."'
        }
      ]
    }
  ];
};

export default generateUnit3LessonPlans;
