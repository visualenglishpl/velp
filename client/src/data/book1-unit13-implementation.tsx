/**
 * Book 1, Unit 13: Clothes - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 13.
 */

import { book1Unit13Resources } from './book1-unit13-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 13
export const getBook1Unit13Resources = () => book1Unit13Resources;

// Generate lesson plans for Book 1, Unit 13
export const generateUnit13LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit13-lesson1",
      title: "Clothing Items Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for basic clothing items (shirt, pants, shoes, hat, etc.)",
        "Use 'I'm wearing...' to describe clothes",
        "Identify colors of clothing items"
      ],
      materials: [
        "Clothes Song - Super Simple Songs video from Video Resources",
        "Clothing item flashcards",
        "Real clothing items (if possible)",
        "Paper dolls with clothing cutouts",
        "Color flashcards",
        "Drawing paper and coloring supplies"
      ],
      steps: [
        {
          title: "Warm-up: Clothes Song",
          duration: "5 minutes",
          description: "Play the 'Clothes Song' video. Have students watch first, then join in with gestures for each clothing item mentioned during the second viewing."
        },
        {
          title: "Clothing Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key clothing vocabulary: shirt, pants/trousers, shoes, socks, hat, jacket, dress. Show flashcards or real items. For each item, say 'This is a/are (clothing item)' and have students repeat."
        },
        {
          title: "What Are You Wearing?",
          duration: "8 minutes",
          description: "Teach the phrase 'I'm wearing a/an (clothing item)' using yourself as an example. Point to items of clothing you're wearing. Have students take turns saying what they're wearing."
        },
        {
          title: "Colors and Clothes",
          duration: "7 minutes",
          description: "Review colors and combine with clothing items: 'I'm wearing a blue shirt.' 'She's wearing red shoes.' Show flashcards with colored clothing items and have students describe them."
        },
        {
          title: "Paper Doll Activity",
          duration: "10 minutes",
          description: "Students dress paper dolls with different clothing cutouts and describe what their doll is wearing using complete sentences: 'He/She is wearing a (color) (clothing item).'"
        },
        {
          title: "Draw and Describe",
          duration: "5 minutes",
          description: "Students draw a picture of themselves wearing their favorite clothes. Then they write or say a simple sentence: 'I'm wearing a (color) (clothing item).'"
        }
      ]
    },
    {
      id: "book1-unit13-lesson2",
      title: "Getting Dressed",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for additional clothing items",
        "Practice 'Put on' and 'Take off' actions",
        "Connect clothing with appropriate weather"
      ],
      materials: [
        "Put On Your Shoes video from Video Resources",
        "What Are You Wearing? video from Video Resources",
        "Weather and clothing flashcards",
        "Clothing picture cards",
        "Seasonal clothing sorting cards",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: Put On Your Shoes",
          duration: "5 minutes",
          description: "Play the 'Put On Your Shoes' video. Have students mimic putting on each clothing item mentioned in the song."
        },
        {
          title: "Action Verbs - Put On/Take Off",
          duration: "8 minutes",
          description: "Teach the action verbs 'put on' and 'take off' using TPR (Total Physical Response). Model sentences: 'Put on your hat.' 'Take off your jacket.' Students follow the instructions with real or pretend actions."
        },
        {
          title: "What Are You Wearing? Video",
          duration: "7 minutes",
          description: "Watch the 'What Are You Wearing?' video. After watching, practice the question and answer format with students. 'What are you wearing?' 'I'm wearing a (clothing item).'"
        },
        {
          title: "Weather and Clothing",
          duration: "10 minutes",
          description: "Show different weather flashcards (rainy, sunny, snowy, windy) and discuss appropriate clothing for each. Model sentences: 'It's raining. I'm wearing a raincoat.' Students practice with weather cards."
        },
        {
          title: "Dressing for the Seasons Game",
          duration: "10 minutes",
          description: "Divide class into teams. Call out a season or weather condition, and teams race to collect appropriate clothing picture cards. Teams describe their choices: 'It's winter. We're wearing jackets, hats, and gloves.'"
        },
        {
          title: "Clothes Vocabulary Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Clothes Vocabulary' game as a class. Students take turns matching clothing items with their names or sorting clothes by types or colors."
        }
      ]
    }
  ];
};