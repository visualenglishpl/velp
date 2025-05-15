/**
 * Book 1, Unit 17: Sports - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 17.
 */

import { book1Unit17Resources } from './book1-unit17-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 17
export const getBook1Unit17Resources = () => book1Unit17Resources;

// Also export the resources directly to match different import patterns
export const resources = book1Unit17Resources;
export const videos = book1Unit17Resources.filter(r => r.resourceType === 'video');
export const games = book1Unit17Resources.filter(r => r.resourceType === 'game');

// Generate lesson plans for Book 1, Unit 17
export const generateUnit17LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit17-lesson1",
      title: "Sports Vocabulary Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for common sports (soccer, basketball, swimming, etc.)",
        "Use 'I play/do...' to talk about sports",
        "Identify different sports equipment"
      ],
      materials: [
        "Sports Song - Maple Leaf Learning video from Video Resources",
        "Sports Vocabulary video from Video Resources",
        "Sports flashcards",
        "Sports equipment pictures",
        "Ball or soft sports equipment (if available)",
        "Drawing paper and coloring supplies"
      ],
      steps: [
        {
          title: "Warm-up: Sports Song",
          duration: "5 minutes",
          description: "Play the 'Sports Song' video. Have students watch first, then join in with actions mimicking each sport during the second viewing."
        },
        {
          title: "Sports Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: soccer/football, basketball, swimming, running, tennis, baseball, cycling. Show flashcards. For each sport, say 'I play/do (sport)' and have students repeat with appropriate actions."
        },
        {
          title: "Sports Vocabulary Video",
          duration: "7 minutes",
          description: "Watch sections of the 'Sports Vocabulary' video. After watching, review the sports from the video and have students mime playing each sport as you say its name."
        },
        {
          title: "Sports and Equipment Matching",
          duration: "8 minutes",
          description: "Display sports equipment pictures (ball, racket, bicycle, swimming goggles). Students match equipment to sports, saying 'You need a (equipment) to play/do (sport).'"
        },
        {
          title: "Action Verbs for Sports",
          duration: "10 minutes",
          description: "Teach action verbs associated with sports: kick a ball, shoot a basket, hit a ball, swim, run. Students practice the actions and related sentences: 'In soccer, you kick the ball.'"
        },
        {
          title: "My Favorite Sport",
          duration: "5 minutes",
          description: "Students draw themselves playing their favorite sport and write or say a simple sentence: 'I like to play/do (sport).' They can add what equipment they need for that sport."
        }
      ]
    },
    {
      id: "book1-unit17-lesson2",
      title: "Sports Skills and Abilities",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn to use 'I can...' to express sports abilities",
        "Practice asking and answering 'Can you...?' questions",
        "Connect sports with specific movements and skills"
      ],
      materials: [
        "I Can Run video from Video Resources",
        "Sports ability cards",
        "Action verb flashcards",
        "Space for movement activities",
        "Sports survey worksheet",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: I Can Run",
          duration: "5 minutes",
          description: "Play the 'I Can Run' video. Have students follow along with the actions, focusing on the 'I can...' language pattern."
        },
        {
          title: "Sports Abilities",
          duration: "8 minutes",
          description: "Teach the structure 'I can (verb)' with sports actions: 'I can run fast.' 'I can swim well.' 'I can kick a ball.' Demonstrate each action and have students repeat the sentences."
        },
        {
          title: "Can You...? Questions",
          duration: "10 minutes",
          description: "Introduce question and answer pattern: 'Can you play basketball?' 'Yes, I can.' / 'No, I can't.' Students practice asking and answering in pairs using sports flashcards."
        },
        {
          title: "Sports Movements Game",
          duration: "7 minutes",
          description: "Students take turns picking a sports action card (e.g., 'shoot a basket,' 'kick a ball'). They demonstrate the action while others guess the sport and ask 'Can you play (sport)?' The student responds appropriately."
        },
        {
          title: "Class Sports Survey",
          duration: "10 minutes",
          description: "Students conduct a simple survey, asking 5 classmates 'Can you play/do (sport)?' and recording yes/no answers. After collecting responses, they can report: 'Three friends can play soccer.'"
        },
        {
          title: "Sports Vocabulary Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Sports Vocabulary' game as a class. Students match sports with pictures or identify sports based on equipment shown."
        }
      ]
    }
  ];
};