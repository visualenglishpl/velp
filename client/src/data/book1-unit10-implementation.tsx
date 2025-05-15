/**
 * Book 1, Unit 10: Hair/Appearance - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 10.
 */

import { book1Unit10Resources } from './book1-unit10-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 10
export const getBook1Unit10Resources = () => book1Unit10Resources;

// Generate lesson plans for Book 1, Unit 10
export const generateUnit10LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit10-lesson1",
      title: "Hair and Appearance Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for describing hair (long, short, curly, straight)",
        "Use simple sentences to describe people's appearance",
        "Practice asking and answering 'What does he/she look like?'"
      ],
      materials: [
        "Hair - Pancake Manor video from Video Resources",
        "Flashcards with different hair types and styles",
        "Pictures of people with different appearances",
        "Hand mirrors (optional)",
        "Drawing paper and colored pencils"
      ],
      steps: [
        {
          title: "Warm-up: Hair Song",
          duration: "5 minutes",
          description: "Play the 'Hair - Pancake Manor' video. Have students watch first, then join in with gestures during the second viewing, touching their hair when mentioned."
        },
        {
          title: "Hair Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: long hair, short hair, curly hair, straight hair, blonde hair, black hair, brown hair, red hair. Use flashcards and real examples in the classroom if possible."
        },
        {
          title: "Describing Hair Practice",
          duration: "8 minutes",
          description: "Model simple sentences: 'She has long hair.' 'He has short hair.' Have students repeat. Show pictures and have students describe the person's hair using complete sentences."
        },
        {
          title: "Mirror Activity",
          duration: "7 minutes",
          description: "If mirrors are available, have students look at their own hair and describe it: 'I have [length] [color] hair.' Then have them work in pairs to describe each other's hair."
        },
        {
          title: "What Does He/She Look Like?",
          duration: "10 minutes",
          description: "Teach the question 'What does he/she look like?' and practice responses using hair descriptions. Use pictures or point to classmates (respectfully) for examples."
        },
        {
          title: "Draw and Describe",
          duration: "5 minutes",
          description: "Students draw a simple picture of a person with distinctive hair. They then write or say a sentence describing the hair of the person they drew."
        }
      ]
    },
    {
      id: "book1-unit10-lesson2",
      title: "Expanded Appearance Descriptions",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Expand appearance vocabulary beyond hair (tall, short, big, small)",
        "Learn to combine multiple descriptors in a sentence",
        "Create and describe character appearances"
      ],
      materials: [
        "Body Parts Song video from Video Resources",
        "Funny Haircut video from Video Resources",
        "Picture cards with people of various appearances",
        "Appearance word cards",
        "Character creation templates",
        "Magazines with people pictures (optional)"
      ],
      steps: [
        {
          title: "Warm-up: Body Parts Review",
          duration: "5 minutes",
          description: "Play the 'Body Parts Song' video. Have students point to each body part as it's mentioned in the song."
        },
        {
          title: "New Appearance Vocabulary",
          duration: "8 minutes",
          description: "Introduce additional appearance vocabulary: tall/short (height), big/small (size), young/old (age). Use pictures and gestures to demonstrate each word."
        },
        {
          title: "Funny Haircut Video",
          duration: "7 minutes",
          description: "Watch 'Funny Haircut' video and discuss the different appearances shown. Ask students to describe what they see using the new vocabulary."
        },
        {
          title: "Combining Descriptions Practice",
          duration: "10 minutes",
          description: "Model combining descriptions: 'She has long blonde hair and she is tall.' Students practice with picture cards, trying to use at least two descriptors in each sentence."
        },
        {
          title: "Character Creation Activity",
          duration: "10 minutes",
          description: "Students create a character by selecting various appearance traits from word cards or by drawing. They then write 2-3 sentences describing their character's appearance."
        },
        {
          title: "Guess Who Game",
          duration: "5 minutes",
          description: "Play a simplified 'Guess Who' game where one student describes a classmate or a picture, and others try to guess who is being described based on appearance."
        }
      ]
    }
  ];
};