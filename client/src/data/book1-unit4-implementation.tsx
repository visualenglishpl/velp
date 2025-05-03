/**
 * Visual English Book 1, Unit 4: Shapes
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const generateUnit4LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to Basic Shapes (45 minutes)
    {
      id: 'book1-unit4-lesson1',
      title: 'Introduction to Basic Shapes',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn and identify 6 basic shapes (circle, square, triangle, rectangle, star, heart)',
        'Practice shape vocabulary through hands-on activities',
        'Develop listening and speaking skills through shape-based songs and games'
      ],
      materials: [
        'Visual English Book 1 - Unit 4 (slides 1-15)',
        'Shape flashcards',
        'Shape cutouts in different colors',
        'The Shapes Song video from Video Resources',
        'Drawing paper and pencils'
      ],
      steps: [
        {
          title: 'Shapes Song Introduction',
          duration: '5 minutes',
          description: 'Play "The Shapes Song - Super Simple Songs" video. Have students watch and listen first time, then encourage them to make the shape outlines with their hands during the second viewing.'
        },
        {
          title: 'Shape Flashcards Introduction',
          duration: '10 minutes',
          description: 'Introduce each shape using flashcards. Hold up a shape card, say the shape name clearly, have students repeat. Practice with: circle, square, triangle, rectangle, star, heart. Describe each shape\'s characteristics (e.g., "A square has 4 equal sides").'
        },
        {
          title: 'Shape Hunt Classroom Activity',
          duration: '7 minutes',
          description: 'Students look around the classroom to find real objects with different shapes. When they find one, they raise their hand and say "I found a [shape]. The [object] is a [shape]." Example: "I found a rectangle. The door is a rectangle."'
        },
        {
          title: 'What Shape Is It?',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 5-10, practice the question "What shape is it?" and the answer "It is a [shape]." Show various shapes, ask the question, and have students respond.'
        },
        {
          title: 'Shape Sorting Game',
          duration: '10 minutes',
          description: 'Divide students into small groups. Give each group a pile of mixed shape cutouts. Students take turns picking a shape, naming it, and placing it in the correct pile. Groups can compete to see who sorts their shapes correctly first.'
        },
        {
          title: 'Review and Shape Drawing',
          duration: '5 minutes',
          description: 'Review all shapes learned. Then give students drawing paper and have them draw and label each shape. Early finishers can color their shapes.'
        }
      ]
    },
    // Lesson Plan 2 - Shapes in Our World (45 minutes)
    {
      id: 'book1-unit4-lesson2',
      title: 'Shapes in Our World',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Review and consolidate shape vocabulary',
        'Learn to describe objects using shapes',
        'Create artwork using different shapes',
        'Introduce 3D shapes (cube, sphere, cylinder)'
      ],
      materials: [
        'Visual English Book 1 - Unit 4 (slides 16-30)',
        'Shape flashcards (2D and 3D)',
        'Colorful construction paper, scissors, glue',
        '3D shapes video from Video Resources',
        'Real 3D objects (ball, box, can)'
      ],
      steps: [
        {
          title: 'Shape Song Review',
          duration: '5 minutes',
          description: 'Play the "Shapes Song - The Singing Walrus" video. Students sing along and make shape gestures with their hands.'
        },
        {
          title: '2D Shape Vocabulary Review',
          duration: '7 minutes',
          description: 'Quick review of 2D shapes using flashcards. Then play a quick game of "Simon Says" with shapes. Example: "Simon says touch your head if you hear a square." Then say different shape words.'
        },
        {
          title: 'Introduction to 3D Shapes',
          duration: '8 minutes',
          description: 'Using Visual English Book 1 slides 16-20 and real objects, introduce three basic 3D shapes: cube (box), sphere (ball), and cylinder (can). Practice the question "What shape is this?" and answer "This is a [3D shape]."'
        },
        {
          title: '3D Shapes Video',
          duration: '5 minutes',
          description: 'Play the "3D Shapes I Know - Dream English" video to reinforce 3D shape vocabulary.'
        },
        {
          title: 'Shape Art Project',
          duration: '15 minutes',
          description: 'Students create a picture using only shapes cut from colored construction paper. Examples: a house made of a square and triangle, a robot made of rectangles and circles, etc. Students then present their artwork using the sentence "I used a [shape] for the [part of picture]."'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '5 minutes',
          description: 'Play the "Shapes - Memory Match" game from Game Resources. Have students come to the board to match shapes to their names.'
        }
      ]
    }
  ];
};

export default generateUnit4LessonPlans;
