/**
 * Book 1, Unit 18: Countries - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 18.
 */

import { book1Unit18Resources } from './book1-unit18-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 18
export const getBook1Unit18Resources = () => book1Unit18Resources;

// Also export the resources directly to match different import patterns
export const resources = book1Unit18Resources;
export const videos = book1Unit18Resources.filter(r => r.resourceType === 'video');
export const games = book1Unit18Resources.filter(r => r.resourceType === 'game');

// Generate lesson plans for Book 1, Unit 18
export const generateUnit18LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit18-lesson1",
      title: "Countries and Flags Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for common countries and their flags",
        "Use 'This is...' to identify countries on a map",
        "Begin to understand the concept of different countries and cultures"
      ],
      materials: [
        "Countries of the World Song video from Video Resources",
        "World map or globe",
        "Country and flag flashcards",
        "Flag coloring templates",
        "Coloring supplies",
        "Blue tack or pins for map activities"
      ],
      steps: [
        {
          title: "Warm-up: Countries Song",
          duration: "5 minutes",
          description: "Play the 'Countries of the World Song' video. Have students watch first, then play again and encourage them to join in with simple movements like pointing to the countries mentioned."
        },
        {
          title: "Country Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce vocabulary for 5-6 key countries relevant to your students (e.g., USA, UK, Poland, China, Japan, Brazil). Show each country on a map and its flag, saying 'This is (country)' and 'This is the flag of (country).' Have students repeat."
        },
        {
          title: "Map Exploration",
          duration: "8 minutes",
          description: "Using a world map or globe, point out the countries introduced. Discuss simple facts like big/small countries, those with oceans or mountains. Have students take turns placing name cards on the correct countries."
        },
        {
          title: "Flag Identification",
          duration: "7 minutes",
          description: "Show flag flashcards and have students identify the country. Practice the pattern: 'What country is this flag from?' 'It is from (country).' Students can take turns asking and answering."
        },
        {
          title: "Flag Coloring Activity",
          duration: "10 minutes",
          description: "Give students templates of 2-3 simple flags (e.g., Japan, Poland, USA) to color. While coloring, review the country names and simple facts about each. When finished, students hold up their flags and say 'This is the flag of (country).'"
        },
        {
          title: "Country Memory Game",
          duration: "5 minutes",
          description: "Play a simple memory game with pairs of country names and their flags. Students turn over cards to find matches, saying the country name when they find a match."
        }
      ]
    },
    {
      id: "book1-unit18-lesson2",
      title: "Where Are You From?",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn to ask and answer 'Where are you from?'",
        "Connect countries with simple cultural elements",
        "Practice basic greetings in different languages"
      ],
      materials: [
        "Where Are You From? video from Video Resources",
        "Hello in Different Languages video from Video Resources",
        "Country and nationality flashcards",
        "Cultural item pictures (foods, landmarks, costumes)",
        "World map with stickers",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: Where Are You From?",
          duration: "5 minutes",
          description: "Play the 'Where Are You From?' video. Focus on the question and answer pattern. Practice asking and answering 'Where are you from?' 'I am from (country).'"
        },
        {
          title: "Country and Nationality",
          duration: "8 minutes",
          description: "Introduce simple nationality words for the countries learned: American, British, Polish, Chinese, Japanese, Brazilian. Show flashcards with people and flags, saying 'He/She is (nationality). He/She is from (country).'"
        },
        {
          title: "Role-play: Meeting New Friends",
          duration: "7 minutes",
          description: "Students practice simple dialogues in pairs: 'Hello! What's your name?' 'My name is ___.' 'Where are you from?' 'I am from ___.' They can use country cards to pretend they are from different places."
        },
        {
          title: "Hello in Different Languages",
          duration: "10 minutes",
          description: "Watch the 'Hello in Different Languages' video. Practice saying hello in 3-4 different languages. Connect each greeting with its country on the map. Students can greet each other using different languages."
        },
        {
          title: "Cultural Connections",
          duration: "10 minutes",
          description: "Show pictures of simple cultural elements from the countries studied (foods, landmarks, traditional clothes). For each item, say 'This is from (country).' Students then match cultural items to their countries."
        },
        {
          title: "Countries and Flags Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Countries and Flags' game as a class. Students take turns matching countries with their flags or identifying countries from clues."
        }
      ]
    }
  ];
};