/**
 * Resources for Book 4 Unit 6 - Collections
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 6
 */

import { TeacherResource } from "../types/teacher-resources";

/**
 * Resources for Book 4 Unit 6 (Collections)
 */
export const book4Unit6Resources: TeacherResource[] = [
  // Video Resources
  {
    id: "book4-unit6-video-1",
    bookId: "4",
    unitId: "6",
    title: "Building a Coin Collection for Beginners",
    description: "Learn how to start a coin collection",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=DMKcEdjZKEs",
    content: {
      type: "youtube",
      embedId: "DMKcEdjZKEs"
    }
  },
  {
    id: "book4-unit6-video-2",
    bookId: "4",
    unitId: "6",
    title: "Stamp Collecting for Beginners",
    description: "How to start collecting stamps",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=fXUsuyvtT0c",
    content: {
      type: "youtube",
      embedId: "fXUsuyvtT0c"
    }
  },
  
  // Game Resources
  {
    id: "book4-unit6-wordwall-1",
    bookId: "4",
    unitId: "6",
    title: "Collections - Wordwall Game",
    description: "Interactive Wordwall game about different types of collections",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5329387/collections",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/e4ce3183f5944e87823d6fef00f3f7b3?themeId=1&templateId=3&fontStackId=0"
    }
  },
  {
    id: "book4-unit6-kahoot-1",
    bookId: "4",
    unitId: "6",
    title: "Collecting Things - Kahoot Game",
    description: "Interactive Kahoot quiz about collections",
    resourceType: "game",
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300",
    content: {
      type: "external",
      embedUrl: "https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300"
    }
  },
  
  // Note: No PDF resources currently available for this unit
];

/**
 * Lesson plans for Book 4 Unit 6
 */
export const book4Unit6LessonPlans: TeacherResource[] = [
  {
    id: "b4u6-lesson-1",
    bookId: "4",
    unitId: "6",
    title: "Introduction to Collections",
    description: "Lesson plan introducing students to various types of collections",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Introduction to Collections",
      objectives: [
        "Introduce students to the concept of collections",
        "Learn vocabulary related to collections and collectibles",
        "Practice using possessive pronouns with collections"
      ],
      materials: [
        "Visual English Book 4",
        "Collection pictures",
        "Vocabulary flashcards"
      ],
      warmUp: "Ask students what they like to collect. Discuss different types of collections people have.",
      mainActivities: [
        "Presentation: Show pictures of different collections (stamps, coins, etc.) and introduce relevant vocabulary.",
        "Practice: Pair activity - students interview each other about their collections using question prompts.",
        "Game: Play 'I collect...' chain game where each student adds an item to the growing list."
      ],
      extension: "Have students create a poster about their own collection or a collection they would like to start.",
      assessment: "Students can present their posters to the class, using target vocabulary.",
      conclusion: "Review key vocabulary and celebrate the diversity of collections discussed."
    }
  },
  {
    id: "b4u6-lesson-2",
    bookId: "4",
    unitId: "6",
    title: "Comparing Collections",
    description: "Lesson plan focused on comparing different collections using comparative language",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Comparing Collections",
      objectives: [
        "Practice using comparative and superlative forms",
        "Develop vocabulary related to describing and comparing collections",
        "Encourage critical thinking about value and interest in collections"
      ],
      materials: [
        "Visual English Book 4",
        "Pictures of various collections",
        "Comparison worksheet"
      ],
      warmUp: "Show pictures of two collections and ask students to identify similarities and differences.",
      mainActivities: [
        "Presentation: Teach or review comparative and superlative forms with collection-related vocabulary.",
        "Practice: Group activity - students sort collection cards by different criteria (oldest, most valuable, most interesting).",
        "Production: Students write sentences comparing different collections using target language."
      ],
      extension: "Debate activity: 'Which collection is the most valuable/interesting/unusual?'",
      assessment: "Complete a gap-fill exercise using comparative and superlative forms related to collections.",
      conclusion: "Class vote on the most interesting collection discussed in the lesson."
    }
  }
];

/**
 * Get all resources for Book 4 Unit 6
 * @returns Array of teacher resources
 */
export function getBook4Unit6Resources(): TeacherResource[] {
  return book4Unit6Resources;
}

/**
 * Get lesson plans for Book 4 Unit 6
 * @returns Array of lesson plan resources
 */
export function getBook4Unit6LessonPlans(): TeacherResource[] {
  return book4Unit6LessonPlans;
}
