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
  // Video Resources
  {
    id: "book4-unit5-video-1",
    bookId: "4",
    unitId: "5",
    title: "Personality Traits Video",
    description: "Learn about different personality traits and characteristics",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=D7ZjMjfasfU",
    content: {
      type: "youtube",
      embedId: "D7ZjMjfasfU"
    }
  },
  
  // Game Resources
  {
    id: "book4-unit5-wordwall-1",
    bookId: "4",
    unitId: "5",
    title: "Personality Traits Game 1",
    description: "Interactive Wordwall game about personality traits",
    resourceType: "game",
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
    title: "Personality Traits Game 2",
    description: "Interactive Wordwall game about personality traits",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/c6d609be7c0a4370adf35d199dd1001d",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0"
    }
  },
  
  // Note: No PDF resources currently available for this unit
];

/**
 * Lesson plans for Book 4 Unit 5
 */
export const book4Unit5LessonPlans: TeacherResource[] = [
  {
    id: "b4u5-lesson-1",
    bookId: "4",
    unitId: "5",
    title: "Introduction to Personality Traits",
    description: "Lesson plan introducing personality traits vocabulary and concepts",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Introduction to Personality Traits",
      objectives: [
        "Introduce students to personality trait vocabulary",
        "Practice describing people's personalities in English",
        "Develop speaking skills through interactive activities"
      ],
      materials: [
        "Visual English Book 4",
        "Personality trait flashcards",
        "Famous people pictures"
      ],
      warmUp: "Show pictures of famous people and ask students to describe their personality traits based on what they know.",
      mainActivities: [
        "Presentation: Introduce key personality trait vocabulary with visual aids and examples.",
        "Practice: Pair activity - students describe themselves and a friend using the new vocabulary.",
        "Game: 'Who am I?' - One student describes a famous person's personality and others guess."
      ],
      extension: "Students create a personality profile for their ideal friend or partner.",
      assessment: "Students complete a matching activity connecting personality traits with behaviors/actions.",
      conclusion: "Review the key personality traits and have students reflect on the traits they admire most."
    }
  },
  {
    id: "b4u5-lesson-2",
    bookId: "4",
    unitId: "5",
    title: "Describing Personalities in Detail",
    description: "Lesson plan focused on giving detailed personality descriptions",
    resourceType: "lesson",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      title: "Describing Personalities in Detail",
      objectives: [
        "Expand vocabulary for describing personality traits",
        "Learn to use adjectives with intensifiers and modifiers",
        "Practice writing short personality descriptions"
      ],
      materials: [
        "Visual English Book 4",
        "Personality trait word cards",
        "Character profile worksheets"
      ],
      warmUp: "Students list as many personality adjectives as they can in two minutes in small groups.",
      mainActivities: [
        "Presentation: Teach intensifiers and modifiers to make personality descriptions more nuanced (quite shy, extremely confident, etc.).",
        "Practice: Students use word cards to create personality descriptions with appropriate intensifiers.",
        "Production: Students complete character profiles for fictional characters or celebrities using target language."
      ],
      extension: "Group activity: Students create a 'Personality Types' magazine with profiles of different types of people.",
      assessment: "Students present their character profiles to the class using correct vocabulary and structures.",
      conclusion: "Reflection activity: Students discuss how personality traits can be both positive and negative depending on the situation."
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
  return book4Unit5LessonPlans;
}
