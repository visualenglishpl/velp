/**
 * Resources for Book 4 Unit 4 - Family - Describing People
 * 
 * This file contains all the external resources (videos, games, etc.) for Book 4 Unit 4
 */

import { TeacherResource } from "../types/teacher-resources";

/**
 * Resources for Book 4 Unit 4 (Family - Describing People)
 */
export const book4Unit4Resources: TeacherResource[] = [
  // Wordwall games
  {
    id: "book4-unit4-wordwall-1",
    bookId: "4",
    unitId: "4",
    resourceType: "game",
    title: "Types of Hair - Wordwall Game",
    description: "Interactive wordwall game about types of hair",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/0268bf9e65734957a7b291700fc07eee",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/0268bf9e65734957a7b291700fc07eee?themeId=1&templateId=5&fontStackId=0"
    }
  },
  {
    id: "book4-unit4-wordwall-2",
    bookId: "4",
    unitId: "4",
    resourceType: "game",
    title: "Describing People - Wordwall Game",
    description: "Interactive wordwall game about describing people",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/6c610a5d0f4e4b72be38e5deebf55425",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/6c610a5d0f4e4b72be38e5deebf55425?themeId=1&templateId=5&fontStackId=0"
    }
  },
  {
    id: "book4-unit4-wordwall-3",
    bookId: "4",
    unitId: "4",
    resourceType: "game",
    title: "Family - Wordwall Game",
    description: "Interactive wordwall game about family vocabulary",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/1373ff4429454b2c8c63824e64176643",
    content: {
      type: "wordwall",
      embedUrl: "https://wordwall.net/embed/1373ff4429454b2c8c63824e64176643?themeId=1&templateId=38&fontStackId=0"
    }
  },
  // YouTube videos
  {
    id: "book4-unit4-youtube-1",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "Describing People's Appearance",
    description: "Learn vocabulary to describe people's physical appearance",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=dX1nlYuPDg8",
    content: {
      type: "youtube",
      embedId: "dX1nlYuPDg8"
    }
  },
  {
    id: "book4-unit4-youtube-2",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "Family Members Vocabulary",
    description: "Learn English vocabulary for family members",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=YsDfuAiIzDE",
    content: {
      type: "youtube",
      embedId: "YsDfuAiIzDE"
    }
  },
  {
    id: "book4-unit4-youtube-3",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "Describing Physical Appearance",
    description: "Vocabulary for describing physical appearance in English",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=vihFVjXGv-Y",
    content: {
      type: "youtube",
      embedId: "vihFVjXGv-Y"
    }
  },
  {
    id: "book4-unit4-youtube-4",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "Parts of the Face",
    description: "Learn the parts of the face in English",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=GhHbh9SVtVE",
    content: {
      type: "youtube",
      embedId: "GhHbh9SVtVE"
    }
  },
  {
    id: "book4-unit4-youtube-5",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "Talking About Your Family",
    description: "Learn how to talk about your family in English",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=RpuF57cIltw",
    content: {
      type: "youtube",
      embedId: "RpuF57cIltw"
    }
  },
  // ESL Collective Video Lesson
  {
    id: "book4-unit4-esl-collective",
    bookId: "4",
    unitId: "4",
    resourceType: "video",
    title: "ESL Collective Video Lesson",
    description: "Interactive ESL lesson about describing people",
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/19368",
    content: {
      type: "external",
      embedUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/19368"
    }
  },
  // Lesson Plans
  {
    id: "book4-unit4-lesson-plan-1",
    bookId: "4",
    unitId: "4",
    resourceType: "lesson",
    title: "Lesson Plan 1 - Family Members",
    description: "A 45-minute lesson plan introducing family vocabulary",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      id: "b4u4-lesson-1-plan",
      title: "Family Members",
      duration: "45 minutes",
      level: "Book 4",
      objectives: [
        "Introduce vocabulary related to family members",
        "Practice describing family relationships",
        "Develop speaking skills through family-related activities"
      ],
      materials: [
        "Visual English Book 4",
        "Family tree diagrams",
        "Family member flashcards"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5 minutes",
          description: "Students share how many people are in their family and who they are."
        },
        {
          title: "Family Vocabulary",
          duration: "10 minutes",
          description: "Introduce family vocabulary using a family tree diagram."
        },
        {
          title: "Family Tree Practice",
          duration: "12 minutes",
          description: "Students complete a family tree using the new vocabulary."
        },
        {
          title: "'Guess Who?' Game",
          duration: "13 minutes",
          description: "Play 'Guess Who?' with family members descriptions."
        },
        {
          title: "Review and Reflection",
          duration: "5 minutes",
          description: "Review family vocabulary and discuss the importance of family in different cultures."
        }
      ],
      assessmentTips: "Students describe their family members using the target vocabulary.",
      homeworkIdeas: ["Students create their own family tree with pictures or drawings."],
      // Keep legacy fields for backward compatibility
      warmUp: "Students share how many people are in their family and who they are.",
      mainActivities: [
        "Presentation: Introduce family vocabulary using a family tree diagram.",
        "Practice: Students complete a family tree using the new vocabulary.",
        "Game: 'Guess Who?' with family members descriptions."
      ],
      extension: "Students create their own family tree with pictures or drawings.",
      assessment: "Students describe their family members using the target vocabulary.",
      conclusion: "Review family vocabulary and discuss the importance of family in different cultures."
    }
  },
  {
    id: "book4-unit4-lesson-plan-2",
    bookId: "4",
    unitId: "4",
    resourceType: "lesson",
    title: "Lesson Plan 2 - Describing People",
    description: "A 45-minute lesson plan focused on describing physical appearance",
    content: {
      type: "markdown",
      embedUrl: ""
    },
    lessonPlan: {
      id: "b4u4-lesson-2-plan",
      title: "Describing People's Appearance",
      duration: "45 minutes",
      level: "Book 4",
      objectives: [
        "Learn vocabulary to describe physical appearance",
        "Practice describing height, build, hair, eyes, and other physical characteristics",
        "Develop the ability to identify people based on descriptions"
      ],
      materials: [
        "Visual English Book 4",
        "Pictures of people with different physical characteristics",
        "Description worksheet"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5 minutes",
          description: "Show pictures of famous people and ask students to describe their physical appearance."
        },
        {
          title: "Vocabulary Introduction",
          duration: "12 minutes",
          description: "Teach vocabulary for describing hair (color, length, style), height, build, and facial features."
        },
        {
          title: "Pair Description Practice",
          duration: "10 minutes",
          description: "Students work in pairs to describe people in pictures using target vocabulary."
        },
        {
          title: "'Who am I?' Activity",
          duration: "13 minutes",
          description: "Students write descriptions of classmates without names, then read aloud for others to guess."
        },
        {
          title: "Review and Reflection",
          duration: "5 minutes",
          description: "Review key descriptive vocabulary and discuss the importance of looking beyond physical appearance."
        }
      ],
      assessmentTips: "Students complete a gap-fill exercise with physical description vocabulary.",
      homeworkIdeas: ["Students create 'Wanted' posters with detailed physical descriptions and drawings."],
      // Keep legacy fields for backward compatibility
      warmUp: "Show pictures of famous people and ask students to describe their physical appearance.",
      mainActivities: [
        "Presentation: Teach vocabulary for describing hair (color, length, style), height, build, and facial features.",
        "Practice: Students work in pairs to describe people in pictures using target vocabulary.",
        "Activity: 'Who am I?' - Students write descriptions of classmates without names, then read aloud for others to guess."
      ],
      extension: "Students create 'Wanted' posters with detailed physical descriptions and drawings.",
      assessment: "Students complete a gap-fill exercise with physical description vocabulary.",
      conclusion: "Review key descriptive vocabulary and discuss the importance of looking beyond physical appearance."
    }
  }
];

/**
 * Get all resources for Book 4 Unit 4
 * @returns Array of teacher resources
 */
export function getBook4Unit4Resources(): TeacherResource[] {
  return book4Unit4Resources;
}

/**
 * Get lesson plans for Book 4 Unit 4
 * @returns Array of lesson plan resources
 */
export function getBook4Unit4LessonPlans(): TeacherResource[] {
  return book4Unit4Resources.filter(resource => resource.resourceType === "lesson");
}