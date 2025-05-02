import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

// Book 6 Unit 8 resources - Free Time - Past Simple
export const book6Unit8Resources = [
  {
    id: "book6-unit8-video1",
    bookId: "6",
    unitId: "8",
    title: "Past Simple Regular Verbs Song",
    resourceType: "video" as const,
    provider: "YouTube - English Singing",
    sourceUrl: "https://www.youtube.com/embed/T_ULLzQcCOs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/T_ULLzQcCOs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-video2",
    bookId: "6",
    unitId: "8",
    title: "Past Simple Irregular Verbs Song",
    resourceType: "video" as const,
    provider: "YouTube - English Singing",
    sourceUrl: "https://www.youtube.com/embed/DCvdEE46LH8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DCvdEE46LH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-video3",
    bookId: "6",
    unitId: "8",
    title: "Past Simple Explained",
    resourceType: "video" as const,
    provider: "YouTube - English with Max",
    sourceUrl: "https://www.youtube.com/embed/nU9soGsvNw4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nU9soGsvNw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-game1",
    bookId: "6",
    unitId: "8",
    title: "Past Simple Tense Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/48061698/past-simple-tense",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/e9f0d7a13e9144be95b91f81e12a81aa?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-game2",
    bookId: "6",
    unitId: "8",
    title: "Free Time Activities Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/33049458/free-time-activities",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/2f553ba8a2ba4db39f4a30532a9aa4a2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-game3",
    bookId: "6",
    unitId: "8",
    title: "What Did You Do Yesterday? - Past Simple Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/127222/yesterday-did-you",
    embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/a6d3a252f0f64a47a7de43b95e4ed095?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit8-game4",
    bookId: "6",
    unitId: "8",
    title: "Irregular Verbs Quiz",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://kahoot.it/challenge/?quiz-id=d15e3ae9-e98c-4cb6-8c6b-10eb053acf21&single-player=true"
  }
];

// Lesson Plan 1: Past Simple Regular and Irregular Verbs
export const pastSimpleVerbsLessonPlan: LessonPlan = {
  id: "book6-unit8-plan1",
  title: "Past Simple Regular and Irregular Verbs",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Students will be able to differentiate between regular and irregular verbs",
    "Students will practice using past simple tense with both regular and irregular verbs",
    "Students will correctly form and pronounce past simple regular verb endings (-ed)"
  ],
  materials: [
    "Flashcards with base form and past simple form of various verbs",
    "Worksheets with regular and irregular verb exercises",
    "Interactive whiteboard or projector for verb games",
    "Visual English Book 6, Unit 8 materials"
  ],
  steps: [
    {
      title: "Warm-up Activity",
      duration: "5 minutes",
      description: "Activate prior knowledge about recent activities",
      instructions: [
        "Start by asking students what they did yesterday or last weekend", 
        "Write their responses on the board, highlighting the past simple verbs they use naturally",
        "Point out examples of both regular and irregular verbs from their responses"
      ]
    },
    {
      title: "Introduction to Past Simple",
      duration: "10 minutes",
      description: "Present the structure and rules of past simple tense",
      instructions: [
        "Present the past simple tense structure using examples from the warm-up", 
        "Explain that regular verbs add -ed in the past simple while irregular verbs have special forms", 
        "Show examples of both types side by side",
        "Explain when to use past simple (completed actions in the past)"
      ]
    },
    {
      title: "Regular Verbs Practice",
      duration: "10 minutes",
      description: "Focus on regular verb pronunciation and formation",
      instructions: [
        "Focus on regular verbs first", 
        "Teach the three different pronunciations of -ed endings: /t/ (walked), /d/ (played), /ɪd/ (wanted)", 
        "Have students categorize and practice pronouncing various regular verbs correctly",
        "Provide practice with forming simple sentences using regular verbs"
      ]
    },
    {
      title: "Irregular Verbs Activity",
      duration: "10 minutes",
      description: "Practice identifying and using irregular verb forms",
      instructions: [
        "Play a memory matching game with irregular verbs", 
        "Place cards with base forms and past forms face down", 
        "Students take turns flipping two cards, trying to match the base form with its past form",
        "Review the most common irregular verbs and their past forms"
      ]
    },
    {
      title: "Guided Practice",
      duration: "5 minutes",
      description: "Apply past simple in context with Visual English materials",
      instructions: [
        "Using the Visual English Book 6 Unit 8 materials, guide students through examples of past simple in context", 
        "Point out both regular and irregular verbs in the content",
        "Model asking and answering questions about past events"
      ]
    },
    {
      title: "Production Activity",
      duration: "10 minutes",
      description: "Interview practice using past simple in conversation",
      instructions: [
        "In pairs, students interview each other about what they did last weekend using a worksheet with question prompts", 
        "Encourage them to use both regular and irregular verbs in their questions and answers",
        "Monitor for correct question formation and answers in past simple"
      ]
    },
    {
      title: "Wrap-up",
      duration: "5 minutes",
      description: "Review and reinforce key past simple concepts",
      instructions: [
        "Review the key points about past simple", 
        "Play a quick game where you say a verb in its base form and students must provide the past simple form",
        "Provide feedback on common errors observed during the lesson"
      ]
    }
  ],
  assessmentTips: "Throughout the lesson, monitor students' use of past simple forms in speech and writing. Note common errors for future remediation. The interview activity will demonstrate their ability to use past simple in meaningful contexts.",
  homeworkIdeas: [
    "Complete a worksheet with regular and irregular verb exercises",
    "Write a paragraph about a past event using at least 5 regular and 5 irregular verbs",
    "Prepare to talk about what they did last weekend using past simple verbs"
  ],
  additionalResources: [
    {
      title: "Past Simple Regular Verbs Song",
      url: "https://www.youtube.com/embed/T_ULLzQcCOs"
    },
    {
      title: "Past Simple Irregular Verbs Song",
      url: "https://www.youtube.com/embed/DCvdEE46LH8"
    }
  ]
};

// Lesson Plan 2: Free Time Activities in the Past
export const freeTimeActivitiesLessonPlan: LessonPlan = {
  id: "book6-unit8-plan2",
  title: "Free Time Activities in the Past",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Students will learn vocabulary related to free time activities",
    "Students will practice talking about past experiences using past simple",
    "Students will ask and answer questions about leisure activities"
  ],
  materials: [
    "Visual aids showing various free time activities",
    "Handouts with past simple question forms",
    "Visual English Book 6, Unit 8",
    "Mini whiteboards or paper for group activities"
  ],
  steps: [
    {
      title: "Vocabulary Introduction",
      duration: "8 minutes",
      description: "Present free time activities vocabulary with visual aids",
      instructions: [
        "Present various free time activities with visual aids: sports, hobbies, entertainment options", 
        "Elicit both the activity name and the verb used with it (e.g., play basketball, watch movies, visit museums)",
        "Group activities into categories (sports, arts, entertainment, etc.)"
      ]
    },
    {
      title: "Past Simple Review",
      duration: "5 minutes",
      description: "Review past simple verb forms and question structure",
      instructions: [
        "Quickly review past simple formation for both regular and irregular verbs", 
        "Focus on verbs commonly used with free time activities", 
        "Include question formation: 'Did you...?'",
        "Practice with example sentences about free time activities"
      ]
    },
    {
      title: "Model Dialogue",
      duration: "7 minutes",
      description: "Practice conversation about weekend activities in past simple",
      instructions: [
        "Present and practice a model dialogue about weekend activities in the past:", 
        "A: What did you do last weekend?", 
        "B: I played tennis and watched a movie. What about you?", 
        "A: I visited my grandparents and went shopping.", 
        "B: Did you have a good time?", 
        "A: Yes, I did. It was fun.",
        "Have students practice the dialogue in pairs"
      ]
    },
    {
      title: "Free Time Survey",
      duration: "10 minutes",
      description: "Interactive activity asking and answering about past activities",
      instructions: [
        "Give students a survey handout with questions about past free time activities", 
        "Students move around the class asking each other questions like 'Did you watch TV last night?' or 'Did you play sports last weekend?'", 
        "They must find classmates who answer 'Yes, I did' to each question and write their names",
        "Monitor for correct question formation and answers in past simple"
      ]
    },
    {
      title: "Visual English Book Activities",
      duration: "8 minutes",
      description: "Reinforce concepts with book exercises",
      instructions: [
        "Use the relevant pages from Visual English Book 6, Unit 8", 
        "Reinforce free time vocabulary and past simple structures", 
        "Have students work through the exercises in pairs",
        "Check answers as a class and address any questions"
      ]
    },
    {
      title: "Creative Writing",
      duration: "7 minutes",
      description: "Practice writing free time activities in past simple",
      instructions: [
        "Students write 3-5 sentences about what they did last weekend or during their last holiday", 
        "Encourage the use of time expressions like 'last weekend,' 'yesterday,' 'last month'",
        "Remind students to use past simple verbs correctly",
        "Have volunteers read their sentences to the class"
      ]
    },
    {
      title: "Closing Game",
      duration: "5 minutes",
      description: "Fun activity to practice past simple in statements",
      instructions: [
        "Play 'Two Truths and a Lie' about past activities", 
        "Each student writes three statements about what they did recently—two true and one false", 
        "In groups, others guess which statement is the lie",
        "Award points for correct guesses and correct past simple usage"
      ]
    }
  ],
  assessmentTips: "Evaluate students' use of free time vocabulary and past simple through their survey participation and written sentences. Check for correct question formation and appropriate responses during pair work.",
  homeworkIdeas: [
    "Complete a worksheet with past simple questions about free time activities",
    "Write a diary entry about what they did last weekend using at least 10 different verbs in past simple",
    "Prepare a short presentation about their favorite free time activity and when they last did it"
  ],
  additionalResources: [
    {
      title: "Free Time Activities Matching Game",
      url: "https://wordwall.net/resource/33049458/free-time-activities"
    },
    {
      title: "What Did You Do Yesterday? - Past Simple Game",
      url: "https://wordwall.net/resource/127222/yesterday-did-you"
    }
  ]
};
