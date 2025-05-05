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
  // Wordwall games
  {
    id: "book4-unit6-wordwall-1",
    bookId: "4",
    unitId: "6",
    resourceType: "game",
    title: "Collections - Wordwall Game",
    description: "Interactive wordwall game about collections",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/6bcdbdd1f33a4700968fcc126d42c323",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0"
    }
  },
  // Kahoot game
  {
    id: "book4-unit6-kahoot",
    bookId: "4",
    unitId: "6",
    resourceType: "game",
    title: "Collecting Things - Kahoot",
    description: "Kahoot game about collections",
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300",
    content: {
      type: "external",
      embedUrl: "https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300"
    }
  },
  // YouTube videos
  {
    id: "book4-unit6-youtube-1",
    bookId: "4",
    unitId: "6",
    resourceType: "video",
    title: "Collections Video 1",
    description: "Learn about collections and collectibles",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=DMKcEdjZKEs",
    content: {
      type: "youtube",
      embedId: "DMKcEdjZKEs"
    }
  },
  {
    id: "book4-unit6-youtube-2",
    bookId: "4",
    unitId: "6",
    resourceType: "video",
    title: "Collections Video 2",
    description: "Another video about collections",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=fXUsuyvtT0c",
    content: {
      type: "youtube",
      embedId: "fXUsuyvtT0c"
    }
  },
  // Lesson Plans
  {
    id: "book4-unit6-lesson-plan-1",
    bookId: "4",
    unitId: "6",
    resourceType: "lesson",
    title: "Lesson Plan 1 - Introduction to Collections",
    description: "A 45-minute lesson plan introducing collections vocabulary",
    content: {
      type: "markdown",
      embedUrl: ""
    }
  },
  {
    id: "book4-unit6-lesson-plan-2",
    bookId: "4",
    unitId: "6",
    resourceType: "lesson",
    title: "Lesson Plan 2 - Talking About Collections",
    description: "A 45-minute lesson plan focused on talking about collections in English",
    content: {
      type: "markdown",
      embedUrl: ""
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
  return book4Unit6Resources.filter(resource => resource.resourceType === "lesson");
}