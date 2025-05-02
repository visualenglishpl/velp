// This file contains resources for Book 5, Unit 13 (Irregular Verbs - Past Tense themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit13Resources = [
  {
    title: "Past Tense Verbs Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/7c9e288361b14419beac7fc8c66234c8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7c9e288361b14419beac7fc8c66234c8?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Tense Verbs Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/c492d3022c664a79b96b36d9351a5631",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c492d3022c664a79b96b36d9351a5631?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Irregular Verbs Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/325326",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/325326" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Irregular Verbs Introduction
export const irregularVerbsIntroductionLessonPlan = {
  id: "irregular-verbs-introduction-lesson",
  title: "Irregular Verbs Introduction",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn common irregular verbs and their past tense forms",
    "Understand the difference between regular and irregular past tense",
    "Recognize patterns among irregular verbs",
    "Practice using irregular past tense verbs in context"
  ],
  materials: [
    "Visual English Book 5, Unit 13 slides",
    "Past Tense Verbs Games",
    "Irregular Verbs Video Lesson",
    "Irregular verb flashcards",
    "Verb form chart"
  ],
  steps: [
    {
      title: "Warm-up: Regular vs. Irregular",
      duration: "5 minutes",
      description: "Activate knowledge about past tense formation",
      instructions: [
        "Review regular past tense formation (-ed ending)",
        "Ask students if they know any verbs that don't follow this pattern",
        "Create two columns on the board: 'Regular' and 'Irregular'",
        "Add examples to each column (walked, talked vs. went, saw)",
        "Explain that today's lesson focuses on irregular verbs"
      ]
    },
    {
      title: "Irregular Verbs Introduction",
      duration: "10 minutes",
      description: "Learn common irregular verbs and their past forms",
      materials: ["Visual English Book 5, Unit 13 slides", "Irregular verb flashcards"],
      instructions: [
        "Present high-frequency irregular verbs in groups:",
        "- No change: cut → cut, put → put, hit → hit",
        "- Vowel change: swim → swam, sing → sang, drink → drank",
        "- Complete change: go → went, am/is → was, are → were",
        "Use flashcards to practice basic recognition",
        "Have students repeat present and past forms",
        "Explain that irregular verbs need to be memorized"
      ]
    },
    {
      title: "Video: Irregular Verbs Lesson",
      duration: "10 minutes",
      description: "Watch a video explaining irregular verbs",
      materials: ["Irregular Verbs Video Lesson"],
      instructions: [
        "Play the Irregular Verbs Video Lesson",
        "Ask students to note any new irregular verbs they hear",
        "Pause to practice pronunciation of difficult forms",
        "After watching, review the key irregular verbs from the video",
        "Discuss any patterns they notice among the verbs"
      ]
    },
    {
      title: "Interactive Games: Past Tense Verbs",
      duration: "10 minutes",
      description: "Practice irregular verbs through digital games",
      materials: ["Past Tense Verbs Games"],
      instructions: [
        "Have students play the Past Tense Verbs Games",
        "Focus on recognizing the correct irregular form",
        "Review any particularly challenging verbs",
        "Create a 'difficult verbs' list for extra practice"
      ]
    },
    {
      title: "Verb Pattern Activity",
      duration: "10 minutes",
      description: "Practice grouping irregular verbs by patterns",
      materials: ["Verb form chart"],
      instructions: [
        "Divide students into small groups",
        "Distribute verb form charts with columns for present and past forms",
        "Provide a list of irregular verbs in random order",
        "Groups organize the verbs according to patterns:",
        "- Verbs that change vowels: sing/sang, ring/rang",
        "- Verbs ending in -ought: bring/brought, think/thought",
        "- Verbs with completely different forms: go/went, am/was",
        "- Verbs with no change: cut/cut, put/put",
        "Groups present their categorizations",
        "Class discusses helpful ways to remember irregular forms",
        "Create a class reference chart of irregular verb patterns"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to recognize and form irregular past tense verbs, understanding of patterns, and participation in the verb pattern activity.",
  homeworkIdeas: [
    "Complete an irregular verb matching worksheet", 
    "Create flashcards for 10 irregular verbs that are difficult to remember",
    "Write 10 sentences using different irregular verbs in past tense"
  ],
  additionalResources: [
    {
      title: "Irregular Verbs List",
      url: "https://www.perfect-english-grammar.com/irregular-verbs-list.html"
    },
    {
      title: "Irregular Verbs Practice Activities",
      url: "https://www.eslflow.com/pasttensei.html"
    }
  ]
};

// Second lesson plan for Unit 13: Using Irregular Verbs in Context
export const irregularVerbsContextLessonPlan = {
  id: "irregular-verbs-context-lesson",
  title: "Using Irregular Verbs in Context",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Practice using irregular past tense verbs in sentences and stories",
    "Develop fluency with past tense narratives",
    "Build confidence in correctly applying irregular verb forms",
    "Apply irregular verbs in meaningful contexts"
  ],
  materials: [
    "Visual English Book 5, Unit 13 slides",
    "Past Tense Verbs Game 2",
    "Story sequence cards",
    "Past tense sentence starters",
    "Weekend activity worksheet"
  ],
  steps: [
    {
      title: "Warm-up: Yesterday I...",
      duration: "5 minutes",
      description: "Activate use of past tense in personal contexts",
      instructions: [
        "Start a chain activity: 'Yesterday I went to the store'",
        "Each student repeats the previous sentences and adds their own using an irregular verb",
        "Example: 'Yesterday Maria went to the store and I saw a movie'",
        "Continue until everyone has participated",
        "Note the irregular verbs used on the board"
      ]
    },
    {
      title: "Irregular Verbs in Sentences",
      duration: "10 minutes",
      description: "Practice forming complete sentences with irregular verbs",
      materials: ["Visual English Book 5, Unit 13 slides", "Past tense sentence starters"],
      instructions: [
        "Review common irregular verbs and their forms",
        "Present sentence structures for past tense narratives",
        "Provide sentence starters like: 'Last weekend I...', 'When I was young, I...'",
        "Model completing sentences with irregular verbs",
        "Have students create their own sentences using the starters",
        "Students share their sentences with partners",
        "Partners check for correct irregular verb usage"
      ]
    },
    {
      title: "Interactive Game: Irregular Verb Practice",
      duration: "10 minutes",
      description: "Reinforce irregular verb forms through a game",
      materials: ["Past Tense Verbs Game 2"],
      instructions: [
        "Have students play Past Tense Verbs Game 2",
        "For each correct answer, have the student make a sentence using the verb",
        "Encourage creative and meaningful sentences",
        "Review any verbs that continue to be challenging",
        "Create a list of 'tricky verbs' for future reference"
      ]
    },
    {
      title: "Past Tense Story Building",
      duration: "10 minutes",
      description: "Create stories using irregular verbs in context",
      materials: ["Story sequence cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute sets of story sequence cards (4-6 pictures showing a sequence of events)",
        "Groups arrange the cards in a logical order",
        "Groups write a short story based on the pictures, using at least 8 irregular verbs",
        "Provide a list of target irregular verbs they should try to include",
        "Groups practice telling their story orally",
        "Each group presents their story to the class",
        "Class listens for and identifies the irregular verbs used"
      ]
    },
    {
      title: "Weekend Activities Report",
      duration: "10 minutes",
      description: "Practice personal narratives using irregular verbs",
      materials: ["Weekend activity worksheet"],
      instructions: [
        "Distribute weekend activity worksheets with questions about past activities",
        "Questions include: 'What did you do last weekend?', 'Who did you see?', 'Where did you go?'",
        "Students complete the worksheet with their own experiences",
        "Ensure they use a variety of irregular verbs",
        "Students pair up and interview each other based on their answers",
        "Pairs report interesting information they learned about their partners",
        "Class discusses common weekend activities and the irregular verbs used to describe them"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their accurate use of irregular verb forms in context, ability to create coherent past tense narratives, and participation in the story building activity.",
  homeworkIdeas: [
    "Write a diary entry about yesterday using at least 10 irregular verbs", 
    "Transform a present tense story into past tense, paying attention to irregular verbs",
    "Create a comic strip that tells a story using irregular verbs in the captions"
  ],
  additionalResources: [
    {
      title: "Past Tense Story Activities",
      url: "https://busyteacher.org/classroom_activities-grammar/past_tense-worksheets/"
    },
    {
      title: "Irregular Verbs Games",
      url: "https://www.eslgamesplus.com/irregular-verbs/"
    }
  ]
};
