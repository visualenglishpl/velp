/**
 * Book 1, Unit 14: Toys - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 14.
 */

import { book1Unit14Resources } from './book1-unit14-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 14
export const getBook1Unit14Resources = () => book1Unit14Resources;

// Generate lesson plans for Book 1, Unit 14
export const generateUnit14LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit14-lesson1",
      title: "Toys Vocabulary Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for common toys (doll, ball, car, teddy bear, etc.)",
        "Use 'This is a/an...' to identify toys",
        "Practice using possessive pronouns with toys (my, your)"
      ],
      materials: [
        "Toys Song - Super Simple Songs video from Video Resources",
        "My Toys video from Video Resources",
        "Real toys or toy flashcards",
        "Toy vocabulary picture cards",
        "Paper bags or box for 'mystery toy' activity",
        "Drawing paper and coloring supplies"
      ],
      steps: [
        {
          title: "Warm-up: Toys Song",
          duration: "5 minutes",
          description: "Play the 'Toys Song' video. Have students watch first, then join in with actions during the second viewing, pretending to play with each toy mentioned."
        },
        {
          title: "Toy Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: doll, ball, car, teddy bear, train, blocks, puzzle. Show real toys or flashcards. For each item, say 'This is a/an (toy)' and have students repeat."
        },
        {
          title: "My Toys Video",
          duration: "7 minutes",
          description: "Watch the 'My Toys' video, focusing on the toy vocabulary. After watching, review the toys from the video and have students identify them in pictures or among real toys."
        },
        {
          title: "My Toy/Your Toy Activity",
          duration: "8 minutes",
          description: "Teach possessive pronouns with toys: 'This is my ball.' 'That is your doll.' Practice exchanges where students pass toys to each other and use the appropriate possessive pronouns."
        },
        {
          title: "Mystery Toy Game",
          duration: "10 minutes",
          description: "Place toys in a bag or box. Students take turns feeling a toy without looking, describing it ('It's soft/hard/big/small'), and guessing what it is: 'I think it's a teddy bear.' Then they pull it out to confirm."
        },
        {
          title: "My Favorite Toy",
          duration: "5 minutes",
          description: "Students draw their favorite toy and write or say a simple sentence: 'This is my favorite toy. It is a (toy name).' They can share with a partner or the class."
        }
      ]
    },
    {
      id: "book1-unit14-lesson2",
      title: "Playing with Toys",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn expressions for playing with toys ('I like to play with...')",
        "Practice asking and answering questions about toys",
        "Use action verbs associated with different toys"
      ],
      materials: [
        "I Like to Play video from Video Resources",
        "Toys vocabulary flashcards",
        "Action cards (verbs like throw, push, build, hug)",
        "Toy-action matching cards",
        "Wordwall game from Game Resources",
        "Toy survey worksheet"
      ],
      steps: [
        {
          title: "Warm-up: I Like to Play",
          duration: "5 minutes",
          description: "Play the 'I Like to Play' video. Have students mimic playing with each toy shown in the video."
        },
        {
          title: "Play Expressions",
          duration: "8 minutes",
          description: "Teach the expression 'I like to play with...' using toy flashcards. Model sentences: 'I like to play with dolls.' 'I like to play with cars.' Students practice with their own preferences."
        },
        {
          title: "Toy Actions",
          duration: "10 minutes",
          description: "Introduce action verbs associated with toys: throw a ball, push a car, build with blocks, hug a teddy bear. Demonstrate each action with the corresponding toy and have students mime the actions."
        },
        {
          title: "Do You Like...? Questions",
          duration: "7 minutes",
          description: "Teach the question 'Do you like to play with (toy)?' and responses 'Yes, I do.' or 'No, I don't.' Students practice asking and answering in pairs using toy flashcards."
        },
        {
          title: "Toy Survey Activity",
          duration: "10 minutes",
          description: "Students conduct a simple survey, asking classmates 'Do you like to play with (toy)?' and recording yes/no answers on a worksheet. After collecting responses, they can report: 'Four friends like to play with cars.'"
        },
        {
          title: "Toys Vocabulary Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Toys Vocabulary' game as a class. Students take turns matching toys with their names or identifying toys based on descriptions."
        }
      ]
    }
  ];
};