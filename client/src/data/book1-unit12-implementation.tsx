/**
 * Book 1, Unit 12: Rooms in the House - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 12.
 */

import { book1Unit12Resources } from './book1-unit12-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 12
export const getBook1Unit12Resources = () => book1Unit12Resources;

// Generate lesson plans for Book 1, Unit 12
export const generateUnit12LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit12-lesson1",
      title: "Rooms in the House Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for different rooms in a house (living room, bedroom, bathroom, kitchen)",
        "Use 'This is the...' to identify rooms",
        "Match furniture with the appropriate rooms"
      ],
      materials: [
        "Rooms of the House Song - Planet Pop video from Video Resources",
        "House Vocabulary video from Video Resources",
        "Flashcards with rooms and furniture",
        "House poster or diagram",
        "Room labels",
        "Room matching worksheet"
      ],
      steps: [
        {
          title: "Warm-up: House Song",
          duration: "5 minutes",
          description: "Play the 'Rooms of the House Song' video. Have students listen first, then join in with gestures for each room mentioned."
        },
        {
          title: "Room Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: living room, bedroom, bathroom, kitchen, dining room, garden. Use flashcards, pictures, or a house poster. For each room, say 'This is the (room name)' and have students repeat."
        },
        {
          title: "House Vocabulary Video",
          duration: "7 minutes",
          description: "Watch part of the 'House Vocabulary' video, focusing on room names. After watching, show flashcards and have students name the rooms shown in the video."
        },
        {
          title: "Room Label Activity",
          duration: "8 minutes",
          description: "Using a large house diagram or poster, students take turns placing room name labels in the correct locations. When placing a label, they say 'This is the (room name).'"
        },
        {
          title: "Furniture-Room Matching",
          duration: "10 minutes",
          description: "Show pictures of furniture items (bed, sofa, toilet, stove) and have students identify which room each belongs in. Practice sentences like 'The bed is in the bedroom.' or 'The sofa is in the living room.'"
        },
        {
          title: "My Favorite Room",
          duration: "5 minutes",
          description: "Students draw their favorite room in a house and write or say 'My favorite room is the (room name).' They can add simple details about what's in the room."
        }
      ]
    },
    {
      id: "book1-unit12-lesson2",
      title: "Where Is It? - Locations in the House",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Review room vocabulary",
        "Learn prepositions of place (in, on, under, next to)",
        "Practice asking and answering 'Where is it?' questions"
      ],
      materials: [
        "Where is it? - Maple Leaf Learning video from Video Resources",
        "House diagram or doll house",
        "Small toy objects or pictures",
        "Preposition flashcards",
        "Hide and seek picture cards",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: Room Review",
          duration: "5 minutes",
          description: "Quick review of room vocabulary with flashcards. Students name each room. Add a simple TPR element by having students move to different corners of the classroom representing different rooms."
        },
        {
          title: "Where is it? Video",
          duration: "8 minutes",
          description: "Watch the 'Where is it?' video. Focus on the question 'Where is it?' and answers using prepositions. After watching, practice the question and answers from the video."
        },
        {
          title: "Prepositions Introduction",
          duration: "8 minutes",
          description: "Teach prepositions: in, on, under, next to. Use a real object (like a pencil) and a box to demonstrate each preposition. Have students repeat the phrases: 'It's in the box.' 'It's on the box.' etc."
        },
        {
          title: "House Location Practice",
          duration: "10 minutes",
          description: "Using a house diagram or doll house, place objects in different locations. Ask 'Where is the (object)?' Students respond with complete sentences using prepositions: 'It's in the kitchen.' 'It's under the table.'"
        },
        {
          title: "Hide and Seek Game",
          duration: "9 minutes",
          description: "Hide small objects around the classroom in relation to room pictures (next to the bedroom, under the kitchen, etc.). Students take turns asking 'Where is the (object)?' and others answer with the location."
        },
        {
          title: "Rooms in a House Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Rooms in a House' game as a class. Students take turns matching rooms with their names or identifying objects in different rooms."
        }
      ]
    }
  ];
};