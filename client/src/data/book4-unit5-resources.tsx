/**
 * Resources for Book 4 Unit 5 - Personality
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 5
 */

import { TeacherResource } from "@/types/teacher-resources";

/**
 * Resources for Book 4 Unit 5 (Personality)
 */
export const book4Unit5Resources: TeacherResource[] = [
  // Wordwall games
  {
    id: "book4-unit5-wordwall-1",
    bookId: "4",
    unitId: "5",
    resourceType: "game",
    title: "Personality Traits - Wordwall Game 1",
    description: "Interactive wordwall game about personality traits",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/339ab9a507314c98aa8ad268f9dbd2fc",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0"
    }
  },
  {
    id: "book4-unit5-wordwall-2",
    bookId: "4",
    unitId: "5",
    resourceType: "game",
    title: "Personality Traits - Wordwall Game 2",
    description: "Interactive wordwall game about personality traits",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/c6d609be7c0a4370adf35d199dd1001d",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0"
    }
  },
  // YouTube videos
  {
    id: "book4-unit5-youtube-1",
    bookId: "4",
    unitId: "5",
    resourceType: "video",
    title: "Personality Traits Vocabulary",
    description: "Learn vocabulary to describe personality traits in English",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=D7ZjMjfasfU",
    content: {
      type: "youtube",
      embedId: "D7ZjMjfasfU"
    }
  },
  // Lesson Plans
  {
    id: "book4-unit5-lesson-plan-1",
    bookId: "4",
    unitId: "5",
    resourceType: "lesson",
    title: "Lesson Plan 1 - Personality Traits Introduction",
    description: "A 45-minute lesson plan introducing personality traits vocabulary",
    content: {
      type: "markdown",
      embedUrl: ""
    }
  },
  {
    id: "book4-unit5-lesson-plan-2",
    bookId: "4",
    unitId: "5",
    resourceType: "lesson",
    title: "Lesson Plan 2 - Describing Personalities",
    description: "A 45-minute lesson plan focused on describing personalities in English",
    content: {
      type: "markdown",
      embedUrl: ""
    }
  }
];

/**
 * Get all resources for Book 4 Unit 5
 * @returns Array of teacher resources
 */
export function getBook4Unit5Resources(): TeacherResource[] {
  return book4Unit5Resources;
}

/**
 * Get lesson plans for Book 4 Unit 5
 * @returns Array of lesson plan resources
 */
export function getBook4Unit5LessonPlans(): TeacherResource[] {
  return book4Unit5Resources.filter(resource => resource.resourceType === "lesson");
}