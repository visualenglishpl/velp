/**
 * Book 1, Unit 11: Seasons - Implementation
 * 
 * This file contains the implementation for the teacher resources for Book 1, Unit 11.
 */

import { book1Unit11Resources } from './book1-unit11-resources';
import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Get all resources for Book 1, Unit 11
export const getBook1Unit11Resources = () => book1Unit11Resources;

// Generate lesson plans for Book 1, Unit 11
export const generateUnit11LessonPlans = (): LessonPlan[] => {
  return [
    {
      id: "book1-unit11-lesson1",
      title: "Four Seasons Introduction",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Learn the names of the four seasons (spring, summer, autumn/fall, winter)",
        "Match seasons with their key characteristics",
        "Use simple sentences to describe seasons"
      ],
      materials: [
        "Season Song - Pancake Manor video from Video Resources",
        "Flashcards with seasons and seasonal images",
        "Season wheel craft materials",
        "Coloring supplies",
        "Season picture sorting cards"
      ],
      steps: [
        {
          title: "Warm-up: Season Song",
          duration: "5 minutes",
          description: "Play the 'Season Song - Pancake Manor' video. Have students watch first, then join in with gestures during the second viewing."
        },
        {
          title: "Seasons Vocabulary Introduction",
          duration: "10 minutes",
          description: "Introduce the four seasons using flashcards: spring, summer, autumn/fall, winter. For each season, show pictures of characteristic weather, clothing, and activities. Practice pronunciation."
        },
        {
          title: "Season Characteristics",
          duration: "8 minutes",
          description: "Teach simple sentences for each season: 'In spring, it rains.' 'In summer, it's hot.' 'In autumn, leaves fall.' 'In winter, it snows.' Have students repeat and practice."
        },
        {
          title: "Season Sorting Activity",
          duration: "7 minutes",
          description: "Give students cards with various seasonal images (snow, flowers, beach, colored leaves). They sort the cards into the correct season category and say a sentence about each."
        },
        {
          title: "Season Wheel Craft",
          duration: "10 minutes",
          description: "Students create a simple four-part wheel with illustrations for each season. As they work, walk around and ask 'What season is this?' and have them respond with the name and a characteristic."
        },
        {
          title: "My Favorite Season",
          duration: "5 minutes",
          description: "Students share their favorite season using the sentence stem 'My favorite season is ___ because ___.' Encourage them to use seasonal vocabulary in their explanations."
        }
      ]
    },
    {
      id: "book1-unit11-lesson2",
      title: "Seasons and Weather",
      duration: "45 minutes",
      level: "Beginner",
      objectives: [
        "Connect seasons with appropriate weather vocabulary",
        "Learn to ask and answer 'What's the weather like in (season)?'",
        "Identify appropriate clothing for different seasons/weather"
      ],
      materials: [
        "Weather Song - The Singing Walrus video from Video Resources",
        "Four Seasons Song video from Video Resources",
        "Weather flashcards",
        "Seasonal clothing cards or pictures",
        "Season/weather matching worksheet",
        "Weather wheel or chart"
      ],
      steps: [
        {
          title: "Warm-up: Weather Song",
          duration: "5 minutes",
          description: "Play the 'Weather Song - The Singing Walrus' video. Have students make appropriate gestures for each weather type (rain, snow, wind, sun)."
        },
        {
          title: "Weather Vocabulary Review",
          duration: "8 minutes",
          description: "Review or introduce weather vocabulary: sunny, rainy, windy, snowy, cloudy, hot, cold. Use flashcards and encourage students to mimic the weather with sounds and movements."
        },
        {
          title: "Seasons and Weather Connections",
          duration: "10 minutes",
          description: "Show pictures of each season and ask 'What's the weather like in (season)?' Model answers: 'In spring, it's often rainy.' 'In winter, it's cold and snowy.' Students practice in pairs."
        },
        {
          title: "Four Seasons Song",
          duration: "7 minutes",
          description: "Watch the 'Four Seasons Song' video focusing on the weather aspects of each season. After watching, have students recall what weather was shown for each season."
        },
        {
          title: "Seasonal Clothing Activity",
          duration: "10 minutes",
          description: "Display various clothing items (or pictures) and have students sort them by season. Practice sentences: 'In winter, we wear coats.' 'In summer, we wear shorts and t-shirts.'"
        },
        {
          title: "Weather Forecast Game",
          duration: "5 minutes",
          description: "Students take turns being 'weather reporters' who give simple forecasts for different seasons: 'It's spring. Today it's rainy and warm.' Others can act out the appropriate weather and clothing."
        }
      ]
    }
  ];
};