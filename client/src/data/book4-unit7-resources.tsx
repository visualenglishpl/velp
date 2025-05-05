/**
 * Resources for Book 4 Unit 7 - Fashion Crazy
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 7
 */

import { ResourceCategory, TeacherResource } from "../types/teacher-resources";

/**
 * Resources for Book 4 Unit 7 (Fashion Crazy)
 */
export const book4Unit7Resources: TeacherResource[] = [
  // Video Resources
  {
    id: "book4-unit7-video-1",
    bookId: "4",
    unitId: "7",
    title: "Clothes and Fashion Vocabulary",
    description: "Learn vocabulary related to clothing and fashion",
    resourceType: "video",
    provider: "YouTube",
    categories: ["tutorial"],
    tags: ["clothing", "vocabulary", "fashion"],
    dateAdded: "2024-05-05",
    difficulty: "beginner",
    ageGroup: "teens",
    durationMinutes: 4,
    sourceUrl: "https://www.youtube.com/watch?v=ZkIzvwfvpGg",
    content: {
      type: "youtube",
      embedId: "ZkIzvwfvpGg"
    }
  },
  {
    id: "book4-unit7-video-2",
    bookId: "4",
    unitId: "7",
    title: "Fashion and Clothing Styles",
    description: "Video about different fashion styles and clothing types",
    resourceType: "video",
    provider: "YouTube",
    categories: ["presentation"],
    tags: ["fashion", "styles", "clothing"],
    dateAdded: "2024-05-05",
    difficulty: "intermediate",
    ageGroup: "teens",
    durationMinutes: 7,
    sourceUrl: "https://www.youtube.com/watch?v=ADXYVutW2k0",
    content: {
      type: "youtube",
      embedId: "ADXYVutW2k0"
    }
  },
  
  // Game Resources
  {
    id: "book4-unit7-wordwall-1",
    bookId: "4",
    unitId: "7",
    title: "Clothes Vocabulary Game",
    description: "Interactive Wordwall game about clothes vocabulary",
    resourceType: "game",
    provider: "Wordwall",
    categories: ["activity", "exercise"],
    tags: ["clothing", "vocabulary", "interactive"],
    dateAdded: "2024-05-05",
    difficulty: "beginner",
    ageGroup: "all",
    durationMinutes: 10,
    sourceUrl: "https://wordwall.net/resource/4b5921b195f2437b91adf882adb32d07",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/4b5921b195f2437b91adf882adb32d07?themeId=1&templateId=3&fontStackId=0"
    }
  },
  {
    id: "book4-unit7-wordwall-2",
    bookId: "4",
    unitId: "7",
    title: "Clothes Patterns Game 1",
    description: "Interactive Wordwall game about clothes patterns",
    resourceType: "game",
    provider: "Wordwall",
    categories: ["activity", "exercise"],
    tags: ["patterns", "clothing", "matching"],
    dateAdded: "2024-05-05",
    difficulty: "intermediate",
    ageGroup: "all",
    durationMinutes: 10,
    sourceUrl: "https://wordwall.net/resource/31b10b47b8184627b05d45e372b69b62",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/31b10b47b8184627b05d45e372b69b62?themeId=1&templateId=46&fontStackId=0"
    }
  },
  {
    id: "book4-unit7-wordwall-3",
    bookId: "4",
    unitId: "7",
    title: "Clothes Patterns Game 2",
    description: "Another interactive Wordwall game focused on clothes patterns",
    resourceType: "game",
    provider: "Wordwall",
    categories: ["activity", "assessment"],
    tags: ["patterns", "clothing", "quiz"],
    dateAdded: "2024-05-05",
    difficulty: "intermediate",
    ageGroup: "all",
    durationMinutes: 15,
    sourceUrl: "https://wordwall.net/resource/87e2df1853c646db9f4a27d632cc9f48",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/87e2df1853c646db9f4a27d632cc9f48?themeId=1&templateId=5&fontStackId=0"
    }
  }
];

/**
 * Lesson plans for Book 4 Unit 7
 */
export const book4Unit7LessonPlans: TeacherResource[] = [
  {
    id: "b4u7-lesson-1",
    bookId: "4",
    unitId: "7",
    title: "Introduction to Fashion and Clothing",
    description: "Lesson plan introducing clothing vocabulary and fashion styles",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      id: "b4u7-lesson-1-plan",
      title: "Introduction to Fashion and Clothing",
      duration: "45 minutes",
      level: "intermediate",
      objectives: [
        "Introduce students to clothing and fashion vocabulary",
        "Practice describing different clothing items and styles",
        "Develop speaking skills through fashion-related activities"
      ],
      materials: [
        "Visual English Book 4",
        "Clothing flashcards",
        "Fashion magazines or images"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5 minutes",
          description: "Show pictures of different clothing styles and ask students to identify items they know."
        },
        {
          title: "Vocabulary Introduction",
          duration: "10 minutes",
          description: "Present key clothing vocabulary with visual aids"
        },
        {
          title: "Pronunciation Practice",
          duration: "5 minutes",
          description: "Practice pronunciation of new fashion and clothing terms"
        },
        {
          title: "Pair Activity",
          duration: "10 minutes",
          description: "Students describe what their partner is wearing using target vocabulary"
        },
        {
          title: "Fashion Design Challenge",
          duration: "15 minutes",
          description: "Small groups create and present a fashion design using new vocabulary"
        }
      ],
      warmUp: "Show pictures of different clothing styles and ask students to identify items they know.",
      extension: "Students create a fashion catalog page with descriptions of clothing items.",
      assessment: "Students complete a matching activity connecting clothing items with their names.",
      conclusion: "Review the key vocabulary and have students reflect on fashion styles they prefer."
    }
  },
  {
    id: "b4u7-lesson-2",
    bookId: "4",
    unitId: "7",
    title: "Fashion Trends and Styles",
    description: "Lesson plan focused on fashion trends and describing styles",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      id: "b4u7-lesson-2-plan",
      title: "Fashion Trends and Styles",
      duration: "45 minutes",
      level: "intermediate",
      objectives: [
        "Expand vocabulary for describing fashion trends",
        "Learn to use adjectives to describe clothing styles",
        "Practice discussing preferences in fashion"
      ],
      materials: [
        "Visual English Book 4",
        "Fashion trend images",
        "Style description worksheets"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5 minutes",
          description: "Show pictures of fashion trends from different decades and have students guess the era."
        },
        {
          title: "Vocabulary Review",
          duration: "8 minutes",
          description: "Review clothing vocabulary from previous lesson with quick matching exercises"
        },
        {
          title: "Fashion Adjectives",
          duration: "10 minutes",
          description: "Introduce adjectives for describing fashion (trendy, casual, formal, etc.)"
        },
        {
          title: "Style Categorization",
          duration: "12 minutes",
          description: "Group activity: sort clothing items by style categories and present to class"
        },
        {
          title: "Fashion Preferences",
          duration: "10 minutes",
          description: "Discussion: favorite fashion trends and personal style preferences"
        }
      ],
      warmUp: "Show pictures of fashion trends from different decades and have students guess the era.",
      extension: "Fashion show activity: Students present different styles with descriptions.",
      assessment: "Students write short paragraphs describing their ideal outfit for different occasions.",
      conclusion: "Class discussion about how fashion changes over time and varies across cultures."
    }
  }
];

/**
 * Get all resources for Book 4 Unit 7
 * @returns Array of teacher resources
 */
export function getBook4Unit7Resources(): TeacherResource[] {
  return book4Unit7Resources;
}

/**
 * Get lesson plans for Book 4 Unit 7
 * @returns Array of lesson plan resources
 */
export function getBook4Unit7LessonPlans(): TeacherResource[] {
  return book4Unit7LessonPlans;
}
