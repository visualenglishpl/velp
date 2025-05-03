/**
 * Visual English Book 1, Unit 11: Seasons of the Year
 * Lesson Plans Implementation
 */

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { book1Unit11Resources } from './book1-unit11-resources';

// Export a function to get resources for this unit
export const getBook1Unit11Resources = (): TeacherResource[] => {
  return book1Unit11Resources;
};

// Export a function to get lesson plans for this unit
export const generateUnit11LessonPlans = (): LessonPlan[] => {
  return [
    // Lesson Plan 1 - Introduction to the Four Seasons (45 minutes)
    {
      id: 'book1-unit11-lesson1',
      title: 'Introduction to the Four Seasons',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn names of the four seasons (spring, summer, autumn/fall, winter)',
        'Identify key characteristics of each season',
        'Use simple sentences to talk about seasons'
      ],
      materials: [
        'Visual English Book 1 - Unit 11 slides',
        'Season flashcards',
        'Season Song - PANCAKE MANOR video',
        'Colored pencils and drawing paper',
        'Pictures showing different seasons'
      ],
      steps: [
        {
          title: 'Seasons Song Introduction',
          duration: '5 minutes',
          description: 'Play the "Season Song - PANCAKE MANOR" video. Have students watch and listen first time, then encourage them to join in with actions during the second viewing.'
        },
        {
          title: 'Seasons Vocabulary Introduction',
          duration: '10 minutes',
          description: 'Use flashcards to introduce the four seasons: spring, summer, autumn/fall, winter. For each season, discuss key features (e.g., flowers in spring, snow in winter) and appropriate clothing.'
        },
        {
          title: 'Seasonal Picture Sorting',
          duration: '8 minutes',
          description: 'Show various pictures and have students identify which season they represent. Ask: "What season is this?" Students respond: "It is summer/winter/etc."'
        },
        {
          title: 'Four Seasons Drawing Activity',
          duration: '15 minutes',
          description: 'Divide a paper into four sections and have students draw something representing each season. Teacher circulates to help with vocabulary and encourage use of season names.'
        },
        {
          title: 'Season Movement Game',
          duration: '7 minutes',
          description: 'Call out a season and an action associated with that season. Students perform the action. For example: "Summer - swimming", "Winter - making a snowman", etc.'
        }
      ],
      assessmentTips: 'Check if students can correctly identify seasons in pictures. Listen for proper pronunciation of season names during activities.',
      homeworkIdeas: [
        'Cut out pictures from magazines that represent different seasons',
        'Complete a worksheet matching seasons to appropriate clothing/activities'
      ],
      additionalResources: [
        {
          title: 'Seasons Teaching Resources',
          url: 'https://www.eslkidstuff.com/'
        }
      ]
    },
    
    // Lesson Plan 2 - Seasonal Activities and Weather (45 minutes)
    {
      id: 'book1-unit11-lesson2',
      title: 'Seasonal Activities and Weather',
      duration: '45 minutes',
      level: 'Beginner',
      objectives: [
        'Learn vocabulary for seasonal activities',
        'Connect weather patterns to different seasons',
        'Practice asking and answering questions about seasons',
        'Create a seasons craft project'
      ],
      materials: [
        'Visual English Book 1 - Unit 11 slides',
        'Four Seasons - DREAM ENGLISH video',
        'Art supplies (colored paper, scissors, glue)',
        'Wordwall games from resources section',
        'Seasonal activity flashcards'
      ],
      steps: [
        {
          title: 'Review and Video',
          duration: '7 minutes',
          description: 'Review season names from previous lesson. Play the "SONG - Four Seasons - DREAM ENGLISH" video, asking students to listen for activities mentioned for each season.'
        },
        {
          title: 'Seasonal Activities Vocabulary',
          duration: '8 minutes',
          description: 'Introduce activities for each season: planting flowers (spring), swimming (summer), collecting leaves (autumn), building snowman (winter). Practice phrases like "In summer, I go swimming."'
        },
        {
          title: 'Weather and Seasons Connection',
          duration: '10 minutes',
          description: 'Discuss weather patterns for each season. Teach simple sentences: "In winter, it is cold/snowy." "In summer, it is hot/sunny." Have students practice these patterns in pairs.'
        },
        {
          title: 'Four Seasons Tree Craft',
          duration: '12 minutes',
          description: 'Based on the craft video from resources, have students create a four seasons tree showing all seasons on one tree (different colored leaves/decorations for each quarter of the tree).'
        },
        {
          title: 'Interactive Wordwall Game',
          duration: '8 minutes',
          description: 'Use the "WORDWALL - SEASONS" games from resources. Students take turns matching season names, activities, and weather.'
        }
      ],
      assessmentTips: 'Observe students\'s ability to connect appropriate activities with seasons. Check comprehension through the interactive games.',
      homeworkIdeas: [
        'Create a "My Favorite Season" poster with drawings and descriptions',
        'Complete a seasons calendar showing major activities for each month'
      ],
      additionalResources: [
        {
          title: 'Seasons and Weather Resources',
          url: 'https://en.islcollective.com/'
        }
      ]
    }
  ];
};

export default generateUnit11LessonPlans;
