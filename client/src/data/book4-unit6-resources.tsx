/**
 * Resources for Book 4 Unit 6 - Collections
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 6
 */

import { TeacherResource } from "@/types/teacher-resources";

/**
 * Resources for Book 4 Unit 6 (Collections)
 */
export const book4Unit6Resources: TeacherResource[] = [
  // Video Resources
  {
    id: "b4u6-vid-1",
    bookId: "4",
    unitId: "6",
    title: "Collections and Collectibles Song",
    description: "A fun song about collections and collectibles",
    resourceType: "video",
    provider: "YouTube",
    content: {
      type: "youtube",
      embedId: "dQw4w9WgXcQ"
    }
  },
  
  // Game Resources
  {
    id: "b4u6-game-1",
    bookId: "4",
    unitId: "6",
    title: "Collections Game",
    description: "Interactive game about various collections",
    resourceType: "game",
    provider: "Wordwall",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7b5b9c1cb8a1466eb4dc4f9e5a5240b4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
    content: {
      type: "iframe",
      embedUrl: "https://wordwall.net/embed/7b5b9c1cb8a1466eb4dc4f9e5a5240b4?themeId=1&templateId=3&fontStackId=0"
    }
  },
  
  // PDF Resources
  {
    id: "b4u6-pdf-1",
    bookId: "4",
    unitId: "6",
    title: "Collections Vocabulary Guide",
    description: "Vocabulary guide for collections and collectibles",
    resourceType: "pdf",
    fileUrl: "https://example.com/collections-vocabulary.pdf",
    content: {
      type: "pdf",
      embedUrl: "https://example.com/collections-vocabulary.pdf"
    }
  }
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
