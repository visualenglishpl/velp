/**
 * Book 1, Unit 8: Shapes - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 8.
 */

import { book1Unit8Resources } from './book1-unit8-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 8
export const getBook1Unit8Resources = () => book1Unit8Resources;

// Generate lesson plans for Book 1, Unit 8
export const generateUnit8LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit8-lesson1",
      title: "Basic Shapes Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Identify and name four basic shapes: circle, square, triangle, and rectangle",
        "Recognize shapes in everyday objects",
        "Use simple sentences to describe shapes"
      ],
      materials: [
        "Shape flashcards",
        "Shape cutouts in different colors",
        "Objects with different shapes",
        "Drawing paper and crayons",
        "The Shape Song #1 video from Video Resources"
      ],
      steps: [
        {
          title: "Warm-up: Shape Song",
          duration: "5 minutes",
          description: "Play 'The Shape Song #1' video from Super Simple Songs. Have students mimic the shapes with their hands as they watch."
        },
        {
          title: "Shape Introduction",
          duration: "10 minutes",
          description: "Introduce each basic shape (circle, square, triangle, rectangle) using flashcards. Show the shape, say its name clearly, and have students repeat. Discuss simple characteristics of each shape."
        },
        {
          title: "Tactile Shape Practice",
          duration: "8 minutes",
          description: "Give students shape cutouts to touch and trace. Have them trace shapes with their fingers and practice saying 'This is a [shape name].'"
        },
        {
          title: "Shape Hunt Game",
          duration: "10 minutes",
          description: "Play a 'shape hunt' game in the classroom. Students identify and point to objects of different shapes. Ask 'What shape is this?' and encourage full sentence responses."
        },
        {
          title: "Collaborative Shape Collage",
          duration: "7 minutes",
          description: "In small groups, students create a collaborative shape collage with pre-cut shapes. They name each shape as they add it to their group artwork."
        },
        {
          title: "Favorite Shape Drawing",
          duration: "5 minutes",
          description: "Students draw their favorite shape and color it. They share with the class and explain why they like this shape using the phrase 'I like the [shape] because...'"
        }
      ]
    },
    {
      id: "book1-unit8-lesson2",
      title: "Shape Attributes and Patterns",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Describe shape attributes (sides, corners)",
        "Create and identify simple patterns using shapes",
        "Use shape vocabulary in context"
      ],
      materials: [
        "Shape pattern cards",
        "Shape stamps and ink pads",
        "Pattern worksheets",
        "Shape sorting trays",
        "Learn Shapes video from Video Resources"
      ],
      steps: [
        {
          title: "Warm-up: Simon Says with Shapes",
          duration: "5 minutes",
          description: "Play 'Simon Says' using shape movements. For example: 'Simon says make a circle with your arms,' 'Simon says draw a square in the air.'"
        },
        {
          title: "Shape Attributes Introduction",
          duration: "10 minutes",
          description: "Watch part of the 'Learn Shapes' video. Then, teach shape attributes using visual aids. Count sides and corners together, comparing different shapes."
        },
        {
          title: "Shape Comparison Activity",
          duration: "8 minutes",
          description: "Students compare different shapes in pairs, describing their attributes. One student describes a shape without naming it, the other guesses which shape it is."
        },
        {
          title: "Pattern Introduction",
          duration: "10 minutes",
          description: "Demonstrate simple shape patterns (circle-square-circle-square). Show several examples and have students identify 'what comes next' in the pattern sequence."
        },
        {
          title: "Pattern Creation",
          duration: "7 minutes",
          description: "Students create their own patterns using shape stamps or cutouts. Encourage them to make at least two different patterns and explain their patterns to a partner."
        },
        {
          title: "Shape Sorting Game & Display",
          duration: "5 minutes",
          description: "Play a quick sorting game where students group objects by shape. Finish by creating a classroom display of student-made shape patterns with proper labels."
        }
      ]
    }
  ];
};