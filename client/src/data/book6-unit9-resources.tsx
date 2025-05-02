// This file contains resources for Book 6, Unit 9 (Present Perfect - What Has Just Happened)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

/**
 * Resources for Book 6, Unit 9 - Present Perfect - What Has Just Happened
 */
export const book6Unit9Resources = [
  // Wordwall Games
  {
    title: "Present Perfect Tense Verbs - Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/885efcf090f04b169ba976a1db08187d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
  },
  {
    title: "Present Perfect Tense Verbs - Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/971dcc6b738b4ee6b50d2f0d3108fb9e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
  },
  {
    title: "Present Perfect Tense Verbs - Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8caa6d3e98844ee9ad346e2127b3caf6?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`,
  },
  // ISL Collective Video
  {
    title: "Present Perfect Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/3360" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`,
  },
];

/**
 * Present Perfect Structure Lesson Plan
 */
export const presentPerfectStructureLessonPlan: LessonPlan = {
  id: "present-perfect-structure",
  title: "Present Perfect Structure and Usage",
  duration: "45",
  level: "Intermediate",
  objectives: [
    "Understand the structure of the Present Perfect tense",
    "Recognize when to use Present Perfect (for actions that have just happened)",
    "Practice forming Present Perfect sentences correctly",
    "Differentiate between Present Perfect and Past Simple tenses"
  ],
  materials: [
    "Visual English Book 6, Unit 9 Slides",
    "Whiteboard and markers",
    "Handouts with Present Perfect exercises",
    "Action picture cards"
  ],
  steps: [
    {
      title: "Warm-up (5 minutes)",
      description: "Begin with a quick activity to engage students. Show pictures of people who have clearly just completed actions (someone with wet hair who has just taken a shower, someone out of breath who has just run, etc.) and ask students to describe what they think has happened.",
      duration: "5"
    },
    {
      title: "Introduction to Present Perfect (10 minutes)",
      description: "Explain the structure of Present Perfect: subject + have/has + past participle. Write examples on the board: 'I have finished my homework,' 'She has broken her arm.' Emphasize that this tense connects past actions to the present time.",
      duration: "10"
    },
    {
      title: "Just Happened Actions (10 minutes)",
      description: "Focus specifically on using Present Perfect for actions that have just happened. Show Visual English Book 6, Unit 9 slides with 'just happened' scenarios. Have students identify what has just happened in each image using the structure 'Subject + has/have just + past participle.'",
      duration: "10"
    },
    {
      title: "Practice Activities (15 minutes)",
      description: "1. Pair Activity: Give pairs of students action cards. One student performs a simple action (close a book, drop a pen), and their partner must say what has just happened using Present Perfect with 'just.'\n\n2. Chain Activity: Start a sentence with 'I have just...' and have students continue around the class, each adding a new action.",
      duration: "15"
    },
    {
      title: "Wrap-up and Assessment (5 minutes)",
      description: "Review the key points about Present Perfect structure. Ask students to write three sentences describing things that have just happened in their lives. Collect these to assess understanding.",
      duration: "5"
    }
  ],
  assessmentTips: "Observe students' participation in activities and review their written sentences for correct structure of Present Perfect tense with 'just'.",
  homeworkIdeas: [
    "Ask students to create a diary entry using Present Perfect tense describing what they have done today",
    "Have students find 5 examples of Present Perfect in articles, songs, or online content"
  ],
  additionalResources: [
    {
      title: "Present Perfect Worksheets"
    },
    {
      title: "Visual English Book 6, Unit 9 Online Games"
    }
  ]
};

/**
 * Present Perfect vs Past Simple Lesson Plan
 */
export const presentPerfectVsPastSimpleLessonPlan: LessonPlan = {
  id: "present-perfect-vs-past-simple",
  title: "Differentiating Present Perfect and Past Simple",
  duration: "45",
  level: "Intermediate",
  objectives: [
    "Understand the difference between Present Perfect and Past Simple tenses",
    "Identify appropriate contexts for using each tense",
    "Practice switching between tenses based on time markers",
    "Apply both tenses in conversational contexts"
  ],
  materials: [
    "Visual English Book 6, Unit 9 Slides",
    "Timeline visuals showing past vs. present perfect events",
    "Handouts with mixed tense exercises",
    "Time marker cards (yesterday, just, already, last week, etc.)"
  ],
  steps: [
    {
      title: "Warm-up (5 minutes)",
      description: "Show students pairs of sentences (e.g., 'I went to Paris last year' vs. 'I have been to Paris') and ask them to identify which tense is used in each and how the meaning differs.",
      duration: "5"
    },
    {
      title: "Comparing the Tenses (10 minutes)",
      description: "Use a timeline visual to explain when to use each tense:\n\n- Past Simple: For completed actions at a specific time in the past ('I visited my grandmother yesterday')\n\n- Present Perfect: For actions that happened at an unspecified time in the past or have just happened ('I have visited my grandmother' or 'I have just visited my grandmother')",
      duration: "10"
    },
    {
      title: "Time Markers Activity (10 minutes)",
      description: "Distribute time marker cards to students. Provide a base sentence (e.g., 'She (visit) London'). Students must create a complete sentence using the correct tense based on their time marker card (e.g., 'yesterday' → 'She visited London yesterday' or 'just' → 'She has just visited London').",
      duration: "10"
    },
    {
      title: "Conversation Practice (15 minutes)",
      description: "In pairs, students interview each other about experiences, using both tenses appropriately:\n\n1. Questions about specific past events (When did you last go to a restaurant? What did you eat?)\n\n2. Questions about life experiences (Have you ever traveled abroad? Have you tried exotic food?)",
      duration: "15"
    },
    {
      title: "Wrap-up and Assessment (5 minutes)",
      description: "Students complete a quick written exercise where they must fill in verbs in either Past Simple or Present Perfect based on context clues in the sentences. Review answers as a class.",
      duration: "5"
    }
  ],
  assessmentTips: "Check students' written exercises for accurate tense usage and listen for correct tense application during the conversation practice.",
  homeworkIdeas: [
    "Create a diary entry using both Past Simple and Present Perfect tenses appropriately",
    "Complete a gap-fill exercise with verbs in the correct tense"
  ],
  additionalResources: [
    {
      title: "Tense Comparison Chart"
    },
    {
      title: "Online Grammar Games"
    }
  ]
};
