/**
 * Book 1, Unit 15: Transport - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 15.
 */

import { book1Unit15Resources } from './book1-unit15-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 15
export const getBook1Unit15Resources = () => book1Unit15Resources;

// Generate lesson plans for Book 1, Unit 15
export const generateUnit15LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit15-lesson1",
      title: "Transport Vocabulary Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn vocabulary for common transportation methods (car, bus, train, airplane, boat)",
        "Use 'This is a...' to identify different vehicles",
        "Connect vehicles with appropriate environments (land, water, air)"
      ],
      materials: [
        "Transportation Song - The Singing Walrus video from Video Resources",
        "Transport Vocabulary video from Video Resources",
        "Transport flashcards",
        "Background scene cards (road, sky, water)",
        "Toy vehicles (if available)",
        "Drawing paper and coloring supplies"
      ],
      steps: [
        {
          title: "Warm-up: Transportation Song",
          duration: "5 minutes",
          description: "Play the 'Transportation Song' video. Have students watch first, then join in with actions mimicking each vehicle during the second viewing."
        },
        {
          title: "Transport Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce key vocabulary: car, bus, train, bicycle, airplane, helicopter, boat, ship. Show flashcards or toy vehicles. For each item, say 'This is a (vehicle)' and have students repeat."
        },
        {
          title: "Transport Vocabulary Video",
          duration: "7 minutes",
          description: "Watch sections of the 'Transport Vocabulary' video, focusing on clear pronunciation. After watching, review the vehicles from the video and have students identify them in pictures."
        },
        {
          title: "Land, Air, Water Sorting",
          duration: "8 minutes",
          description: "Create three areas representing land, air, and water. Students take turns placing transport flashcards or toys in the appropriate area, saying 'A (vehicle) goes on land/in air/on water.'"
        },
        {
          title: "Vehicle Movement Game",
          duration: "10 minutes",
          description: "Students mimic how different vehicles move and make appropriate sounds while others guess which vehicle is being acted out. When guessing correctly, they say 'This is a (vehicle).'"
        },
        {
          title: "My Favorite Transport",
          duration: "5 minutes",
          description: "Students draw their favorite mode of transportation and write or say a simple sentence: 'This is my favorite transport. It is a (vehicle).' They can add where it travels (land/air/water)."
        }
      ]
    },
    {
      id: "book1-unit15-lesson2",
      title: "Transport in Action",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Use verbs associated with different transport methods (drive, fly, sail)",
        "Learn to ask and answer 'How do you go to...?' questions",
        "Practice transport vocabulary in context of daily travel"
      ],
      materials: [
        "The Wheels on the Bus video from Video Resources",
        "Transport scenes flashcards",
        "Action verb cards (drive, fly, sail, ride)",
        "Destination cards (school, park, beach, mountains)",
        "Transport route map",
        "Wordwall game from Game Resources"
      ],
      steps: [
        {
          title: "Warm-up: Wheels on the Bus",
          duration: "5 minutes",
          description: "Play 'The Wheels on the Bus' video. Encourage students to sing along and do the actions. Discuss how buses are a form of transportation that many people use."
        },
        {
          title: "Transport Verbs",
          duration: "8 minutes",
          description: "Teach action verbs: drive a car, ride a bike/bus, fly an airplane, sail a boat. Model sentences with the verbs and have students mimic the action while saying the appropriate sentence."
        },
        {
          title: "How Do You Go To...?",
          duration: "10 minutes",
          description: "Introduce the question 'How do you go to (place)?' and responses 'I go by (transport).' Show destination cards (school, park, supermarket) and have students practice asking and answering in pairs."
        },
        {
          title: "Transport Routes",
          duration: "7 minutes",
          description: "Using a simple town map, show different routes and appropriate transport for each. Ask 'How do you go from home to the beach?' Students respond with the appropriate transport method."
        },
        {
          title: "Transport Charades",
          duration: "10 minutes",
          description: "Students act out traveling to different places using various forms of transportation. The class guesses both the destination and the transport: 'You're going to the mountains by train.'"
        },
        {
          title: "Transport Sorting Game",
          duration: "5 minutes",
          description: "Play the Wordwall 'Transport Sorting' game as a class. Students categorize different types of transportation as land, air, or water vehicles."
        }
      ]
    }
  ];
};