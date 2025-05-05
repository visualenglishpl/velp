/**
 * Resources for Book 4 Unit 2 - Gadgets
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 2
 */

import { TeacherResource } from "../types/teacher-resources";

/**
 * Resources for Book 4 Unit 2 (Gadgets)
 */
export const book4Unit2Resources: TeacherResource[] = [
  // Wordwall games
  {
    id: "book4-unit2-wordwall-1",
    bookId: "4",
    unitId: "2",
    resourceType: "game",
    title: "Gadgets 1 - Wordwall Game",
    description: "Interactive wordwall game about gadgets",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/9b778eef10ff453b8ef30da1d667dadb",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/9b778eef10ff453b8ef30da1d667dadb?themeId=1&templateId=3&fontStackId=0"
    }
  },
  {
    id: "book4-unit2-wordwall-2",
    bookId: "4",
    unitId: "2",
    resourceType: "game",
    title: "Gadgets 2 - Wordwall Game",
    description: "Interactive wordwall game about gadgets",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/7543280a4eab4edf90f4cbbe14a8f771",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/7543280a4eab4edf90f4cbbe14a8f771?themeId=1&templateId=3&fontStackId=0"
    }
  },
  {
    id: "book4-unit2-wordwall-3",
    bookId: "4",
    unitId: "2",
    resourceType: "game",
    title: "Gadgets 3 - Wordwall Game",
    description: "Interactive wordwall game about gadgets",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/96418a9e2fce4091844ac3f35a855add",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0"
    }
  },
  {
    id: "book4-unit2-abcya",
    bookId: "4",
    unitId: "2",
    resourceType: "game",
    title: "Find the Technology - ABCya Game",
    description: "Find technology items in this interactive game",
    provider: "ABCya",
    sourceUrl: "https://www.abcya.com/games/find_the_tech",
    content: {
      type: "external",
      embedUrl: "https://www.abcya.com/games/find_the_tech"
    }
  },
  {
    id: "book4-unit2-youtube-gadgets-1",
    bookId: "4",
    unitId: "2",
    resourceType: "video",
    title: "Gadgets and Technology Video",
    description: "YouTube video about gadgets and technology in everyday life",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=08BoI6zFDTw",
    content: {
      type: "youtube",
      embedId: "08BoI6zFDTw"
    }
  },
  {
    id: "book4-unit2-youtube-gadgets-2",
    bookId: "4",
    unitId: "2",
    resourceType: "video",
    title: "Gadgets Video",
    description: "YouTube video about gadgets and technology",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=BsK4tX28Jcs",
    content: {
      type: "youtube",
      embedId: "BsK4tX28Jcs"
    }
  },
  // Lesson Plans
  {
    id: "book4-unit2-lesson-plan-1",
    bookId: "4",
    unitId: "2",
    resourceType: "lesson",
    title: "Lesson Plan 1 - Introduction to Gadgets",
    description: "A 45-minute lesson plan introducing gadgets vocabulary and usage",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Introduction to Gadgets",
      objectives: [
        "Introduce vocabulary related to common gadgets",
        "Practice asking and answering questions about gadgets",
        "Develop speaking skills through technology-related activities"
      ],
      materials: [
        "Visual English Book 4",
        "Pictures of different gadgets",
        "Gadget flashcards"
      ],
      warmUp: "Show students various gadgets or pictures and ask them to name them if they can.",
      mainActivities: [
        "Presentation: Introduce gadget vocabulary using visual aids.",
        "Practice: Students complete matching exercises connecting gadgets with their functions.",
        "Game: 'What is it?' - Teacher describes a gadget and students guess which one it is."
      ],
      extension: "Students create a poster about their favorite gadget with labeled parts.",
      assessment: "Students identify and name various gadgets in pictures.",
      conclusion: "Review gadget vocabulary and discuss how these devices help us in daily life."
    }
  },
  {
    id: "book4-unit2-lesson-plan-2",
    bookId: "4",
    unitId: "2",
    resourceType: "lesson",
    title: "Lesson Plan 2 - Technology in Daily Life",
    description: "A 45-minute lesson plan focused on how we use technology in daily life",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Technology in Daily Life",
      objectives: [
        "Learn vocabulary related to technology usage",
        "Practice discussing how we use gadgets in everyday situations",
        "Develop the ability to express preferences about technology"
      ],
      materials: [
        "Visual English Book 4",
        "Technology usage worksheet",
        "Pictures showing people using various gadgets"
      ],
      warmUp: "Ask students to share how many hours they spend using different gadgets each day.",
      mainActivities: [
        "Presentation: Teach vocabulary for different technology uses (communication, entertainment, work, etc.).",
        "Practice: Students work in pairs to discuss how they use technology in their daily routines.",
        "Activity: 'Tech Survey' - Students interview classmates about their technology preferences and create a simple chart."
      ],
      extension: "Students create a 'day without technology' plan, describing what would be different.",
      assessment: "Students complete a speaking task explaining how they use 3-4 different gadgets in their lives.",
      conclusion: "Discuss the benefits and challenges of technology in our daily lives."
    }
  }
];

/**
 * Get all resources for Book 4 Unit 2
 * @returns Array of teacher resources
 */
export function getBook4Unit2Resources(): TeacherResource[] {
  return book4Unit2Resources;
}

/**
 * Get lesson plans for Book 4 Unit 2
 * @returns Array of lesson plan resources
 */
export function getBook4Unit2LessonPlans(): TeacherResource[] {
  return book4Unit2Resources.filter(resource => resource.resourceType === "lesson");
}