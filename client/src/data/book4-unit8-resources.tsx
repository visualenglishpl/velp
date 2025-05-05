/**
 * Resources for Book 4 Unit 8 - Enjoy Your Meal
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 8
 */

import { TeacherResource } from '@/types/teacher-resources';

/**
 * Resources for Book 4 Unit 8 (Enjoy Your Meal)
 */
export const book4Unit8Resources: TeacherResource[] = [
  // Videos
  {
    id: 'book4-unit8-video1',
    bookId: '4',
    unitId: '8',
    title: 'British Breakfast - What is English Breakfast?',
    description: 'Learn about traditional British breakfast foods',
    resourceType: 'video',
    categories: ['tutorial'],
    tags: ['food', 'breakfast', 'british culture'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'YouTube',
    dateAdded: '2023-06-10',
    content: {
      type: 'youtube',
      embedId: 'qLtTUd6FPOs',
    },
    thumbnailUrl: 'https://img.youtube.com/vi/qLtTUd6FPOs/mqdefault.jpg',
  },
  {
    id: 'book4-unit8-video2',
    bookId: '4',
    unitId: '8',
    title: 'Food Groups - Nutrition for Kids',
    description: 'Learn about the different food groups and balanced nutrition',
    resourceType: 'video',
    categories: ['tutorial'],
    tags: ['food groups', 'nutrition', 'healthy eating'],
    difficulty: 'beginner',
    ageGroup: 'kids',
    provider: 'YouTube',
    dateAdded: '2023-06-12',
    content: {
      type: 'youtube',
      embedId: 'g9-8qQkIh5k',
    },
    thumbnailUrl: 'https://img.youtube.com/vi/g9-8qQkIh5k/mqdefault.jpg',
  },
  {
    id: 'book4-unit8-video3',
    bookId: '4',
    unitId: '8',
    title: 'Healthy Foods - Vocabulary for Kids',
    description: 'Learn vocabulary related to healthy foods',
    resourceType: 'video',
    categories: ['tutorial'],
    tags: ['food vocabulary', 'healthy food', 'ESL'],
    difficulty: 'beginner',
    ageGroup: 'kids',
    provider: 'YouTube',
    dateAdded: '2023-06-15',
    content: {
      type: 'youtube',
      embedId: 'pD9mk0Y_pyo',
    },
    thumbnailUrl: 'https://img.youtube.com/vi/pD9mk0Y_pyo/mqdefault.jpg',
  },
  {
    id: 'book4-unit8-video4',
    bookId: '4',
    unitId: '8',
    title: 'Food Pyramid for Kids - Nutrition by Mocomi',
    description: 'Learn about the food pyramid and balanced nutrition',
    resourceType: 'video',
    categories: ['tutorial'],
    tags: ['food pyramid', 'nutrition', 'balanced diet'],
    difficulty: 'beginner',
    ageGroup: 'kids',
    provider: 'YouTube',
    dateAdded: '2023-06-18',
    content: {
      type: 'youtube',
      embedId: 'nCKwUB8EVbc',
    },
    thumbnailUrl: 'https://img.youtube.com/vi/nCKwUB8EVbc/mqdefault.jpg',
  },
  
  // Games
  {
    id: 'book4-unit8-game1',
    bookId: '4',
    unitId: '8',
    title: 'British Breakfast Game',
    description: 'Interactive game about British breakfast foods',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['breakfast', 'british food', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-06-20',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game2',
    bookId: '4',
    unitId: '8',
    title: 'Food Groups Part 1',
    description: 'Learn and practice food group classifications',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['food groups', 'nutrition', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-06-22',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game3',
    bookId: '4',
    unitId: '8',
    title: 'Food Groups Part 2',
    description: 'Additional practice with food group classifications',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['food groups', 'nutrition', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-06-25',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9899470993214165a255330753bdd0ff?themeId=1&templateId=2&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game4',
    bookId: '4',
    unitId: '8',
    title: 'Drinks Vocabulary',
    description: 'Learn and practice vocabulary related to drinks',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['drinks', 'beverages', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-06-28',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game5',
    bookId: '4',
    unitId: '8',
    title: 'Berries Vocabulary',
    description: 'Learn and practice vocabulary related to berries',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['berries', 'fruits', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-07-01',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/a6ff7af2a86047cfbc2bc3fa0e940c96?themeId=1&templateId=3&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game6',
    bookId: '4',
    unitId: '8',
    title: 'Nuts Vocabulary',
    description: 'Learn and practice vocabulary related to nuts',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['nuts', 'food', 'vocabulary'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-07-03',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/08c1c6a3d58a46419a654d194ffd9af0?themeId=1&templateId=3&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
  {
    id: 'book4-unit8-game7',
    bookId: '4',
    unitId: '8',
    title: 'Food Pyramid Game',
    description: 'Learn about the food pyramid through an interactive game',
    resourceType: 'game',
    categories: ['activity', 'exercise'],
    tags: ['food pyramid', 'nutrition', 'healthy eating'],
    difficulty: 'beginner',
    ageGroup: 'all',
    provider: 'Wordwall',
    dateAdded: '2023-07-05',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/c19d7fb0540e4e269de458c2184b6624?themeId=1&templateId=22&fontStackId=0',
    },
    thumbnailUrl: 'https://www.wordwall.net/apple-touch-icon.png',
  },
];

/**
 * Lesson plans for Book 4 Unit 8
 */
export const book4Unit8LessonPlans: TeacherResource[] = [
  {
    id: 'book4-unit8-lesson1',
    bookId: '4',
    unitId: '8',
    title: 'Food Groups and Nutrition',
    description: 'A comprehensive 45-minute lesson on food groups and balanced nutrition',
    resourceType: 'lesson',
    categories: ['tutorial', 'exercise'],
    tags: ['food groups', 'nutrition', 'balanced diet'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: 'book4-unit8-lesson1-plan',
      title: 'Food Groups and Nutrition',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Identify the five main food groups',
        'Understand the concept of a balanced diet',
        'Learn vocabulary related to food and nutrition'
      ],
      materials: [
        'Food group flashcards',
        'Food pyramid handout',
        'Vocabulary worksheet'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a quick discussion about students\'favorite foods',
          instructions: [
            'Ask students to name their favorite foods',
            'Write responses on the board'
          ]
        },
        {
          title: 'Introduction to Food Groups',
          duration: '10 minutes',
          description: 'Present the five main food groups using flashcards',
          materials: ['Food group flashcards'],
          instructions: [
            'Show flashcards for each food group: fruits, vegetables, grains, protein, dairy',
            'Elicit examples for each group from students'
          ]
        },
        {
          title: 'Food Pyramid Activity',
          duration: '15 minutes',
          description: 'Explain the food pyramid and its importance',
          materials: ['Food pyramid handout'],
          instructions: [
            'Distribute food pyramid handouts',
            'Explain how the pyramid shows recommended proportions',
            'Have students categorize foods into the correct pyramid levels'
          ]
        },
        {
          title: 'Vocabulary Practice',
          duration: '10 minutes',
          description: 'Reinforce food-related vocabulary',
          materials: ['Vocabulary worksheet'],
          instructions: [
            'Introduce key terms: nutrients, protein, carbohydrates, vitamins, minerals',
            'Have students complete matching exercises on the worksheet'
          ]
        },
        {
          title: 'Closing Activity',
          duration: '5 minutes',
          description: 'Review main concepts and check understanding',
          instructions: [
            'Ask students to name one food from each food group',
            'Discuss the importance of a balanced diet'
          ]
        }
      ],
      assessmentTips: 'Observe student participation in group activities and check worksheet completion'
    }
  },
  {
    id: 'book4-unit8-lesson2',
    bookId: '4',
    unitId: '8',
    title: 'Traditional Meals Around the World',
    description: 'A 45-minute lesson exploring breakfast traditions across different cultures',
    resourceType: 'lesson',
    categories: ['tutorial', 'discussion'],
    tags: ['cultural foods', 'breakfast', 'traditions'],
    difficulty: 'beginner',
    ageGroup: 'all',
    durationMinutes: 45,
    content: {
      type: 'lesson-plan'
    },
    lessonPlan: {
      id: 'book4-unit8-lesson2-plan',
      title: 'Traditional Meals Around the World',
      duration: '45 minutes',
      level: 'Book 4',
      objectives: [
        'Learn about breakfast traditions in different countries',
        'Compare and contrast cultural food practices',
        'Practice food-related vocabulary in context'
      ],
      materials: [
        'World map',
        'Pictures of traditional breakfasts',
        'Comparison chart handout'
      ],
      steps: [
        {
          title: 'Warm-up',
          duration: '5 minutes',
          description: 'Begin with a discussion about students\'breakfast habits',
          instructions: [
            'Ask students what they typically eat for breakfast',
            'Record responses on the board'
          ]
        },
        {
          title: 'Breakfast Around the World',
          duration: '15 minutes',
          description: 'Present traditional breakfasts from different countries',
          materials: ['World map', 'Pictures of traditional breakfasts'],
          instructions: [
            'Show pictures of traditional breakfasts from England, Japan, Mexico, and India',
            'Locate each country on the world map',
            'Describe key components of each breakfast tradition'
          ]
        },
        {
          title: 'Comparative Analysis',
          duration: '10 minutes',
          description: 'Compare different breakfast traditions',
          materials: ['Comparison chart handout'],
          instructions: [
            'Distribute comparison charts',
            'Guide students to identify similarities and differences',
            'Discuss healthy components in each tradition'
          ]
        },
        {
          title: 'Role Play Activity',
          duration: '10 minutes',
          description: 'Practice food-related dialogue',
          instructions: [
            'Divide students into pairs',
            'Have them role-play ordering a traditional breakfast in a restaurant',
            'Encourage use of food vocabulary and polite expressions'
          ]
        },
        {
          title: 'Closing Discussion',
          duration: '5 minutes',
          description: 'Reflect on cultural diversity in food traditions',
          instructions: [
            'Ask students which breakfast tradition they would like to try',
            'Discuss the importance of cultural awareness and respect'
          ]
        }
      ],
      assessmentTips: 'Evaluate student participation in discussions and role play activities',
      homeworkIdeas: [
        'Research a traditional breakfast from another country not covered in class',
        'Create a menu for a traditional breakfast from their own culture'
      ]
    }
  }
];

/**
 * Get all resources for Book 4 Unit 8
 * @returns Array of teacher resources
 */
export function getBook4Unit8Resources(): TeacherResource[] {
  return book4Unit8Resources;
}

/**
 * Get lesson plans for Book 4 Unit 8
 * @returns Array of lesson plan resources
 */
export function getBook4Unit8LessonPlans(): TeacherResource[] {
  return book4Unit8LessonPlans;
}
