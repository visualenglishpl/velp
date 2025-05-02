// Resources for Book 6, Unit 9 - Present Perfect: What Has Just Happened

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const presentPerfectLessonPlan: LessonPlan = {
  id: 'book6-unit9-present-perfect',
  title: 'Present Perfect Tense',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Understand the structure of the present perfect tense',
    'Identify situations where present perfect is used',
    'Practice forming present perfect sentences',
    'Differentiate between present perfect and simple past tense'
  ],
  materials: [
    'Visual English Book 6, Unit 9',
    'Digital projector or interactive whiteboard',
    'Present perfect verb flashcards',
    'Wordwall Present Perfect games',
    'Handout with present perfect exercises'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about verbs and tenses',
      instructions: [
        'Ask students what tenses they already know (present simple, past simple, etc.)',
        'Elicit examples of each tense from students',
        'Introduce the concept of the present perfect as a connection between past and present',
        'Show examples of present perfect sentences on the board'
      ]
    },
    {
      title: 'Present Perfect Structure',
      duration: '10 minutes',
      description: 'Teach the form and structure of present perfect tense',
      instructions: [
        'Present the structure: subject + have/has + past participle',
        'Explain the use of "have" with I/you/we/they and "has" with he/she/it',
        'Show examples with regular and irregular past participles',
        'Highlight the difference between past simple (completed action at specific time) and present perfect (action with present relevance)'
      ]
    },
    {
      title: 'Just Happened Activity',
      duration: '15 minutes',
      description: 'Practice using present perfect for recently completed actions',
      instructions: [
        'Introduce time expressions used with present perfect: just, already, yet, ever, never',
        'Focus on "just" for actions that happened very recently',
        'Perform various actions in the classroom (open a window, close a door, etc.)',
        'Students describe what has just happened using present perfect',
        'Example: "You have just opened the window."'
      ]
    },
    {
      title: 'Interactive Games',
      duration: '15 minutes',
      description: 'Reinforce present perfect through online games',
      instructions: [
        'Divide class into small groups or pairs',
        'Have students play the Wordwall Present Perfect verb games',
        'Monitor and provide assistance as needed',
        'Discuss any difficult verbs or concepts that arise during the games'
      ]
    }
  ],
  assessmentTips: 'Evaluate students on their ability to correctly form present perfect sentences, appropriate use of time expressions, and understanding of when to use present perfect versus simple past.',
  homeworkIdeas: [
    'Complete a worksheet with present perfect fill-in-the-blank exercises',
    'Write 8-10 sentences describing things you have just done today using the present perfect tense',
    'Create a diary entry about your experiences using present perfect and past simple appropriately'
  ],
  additionalResources: [
    {
      title: 'Present Perfect ESL Games',
      url: 'https://www.eslgamesplus.com/present-perfect-esl-grammar-fun-game-online/'
    },
    {
      title: 'Present Perfect vs Past Simple',
      url: 'https://www.perfect-english-grammar.com/present-perfect-or-past-simple.html'
    }
  ]
};

export const experiencesLessonPlan: LessonPlan = {
  id: 'book6-unit9-experiences',
  title: 'Talking About Experiences',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Use present perfect to discuss life experiences',
    'Practice asking and answering "Have you ever...?" questions',
    'Develop fluency in discussing personal experiences',
    'Use adverbs of frequency with present perfect'
  ],
  materials: [
    'Visual English Book 6, Unit 9',
    'Experience question cards',
    'Digital projector or interactive whiteboard',
    'ISL Collective Present Perfect video',
    'Handout with "ever/never" prompts'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Introduce the concept of life experiences',
      instructions: [
        'Ask students: "What interesting things have you done in your life?"',
        'Share a few of your own experiences using present perfect',
        'Explain that present perfect is used for experiences at an unspecified time in the past',
        'Contrast with past simple which requires a specific time'
      ]
    },
    {
      title: 'Have You Ever Questions',
      duration: '15 minutes',
      description: 'Practice asking and answering about experiences',
      instructions: [
        'Present the structure: "Have you ever + past participle?"',
        'Model responses: "Yes, I have" / "No, I haven\'t"',
        'Introduce follow-up questions using past simple: "When did you...?" "Where did you...?"',
        'Distribute experience question cards',
        'Students move around the room asking each other "Have you ever...?" questions',
        'For positive answers, they ask follow-up questions about the experience'
      ]
    },
    {
      title: 'Ever and Never',
      duration: '10 minutes',
      description: 'Practice using frequency adverbs with present perfect',
      instructions: [
        'Explain the use of "ever" (in questions) and "never" (in negative statements)',
        'Introduce other frequency expressions: once, twice, several times, many times',
        'Provide sentence stems: "I have never..." / "I have been to... twice"',
        'Students complete sentences about their own experiences',
        'Share responses with a partner or small group'
      ]
    },
    {
      title: 'Video Activity',
      duration: '15 minutes',
      description: 'Watch and respond to a video about present perfect',
      instructions: [
        'Show the ISL Collective Present Perfect video',
        'Have students identify present perfect sentences in the video',
        'Pause at examples and discuss why present perfect is used in that context',
        'After watching, students create their own sentences following the patterns in the video'
      ]
    }
  ],
  assessmentTips: 'Assess students on their ability to form accurate "Have you ever" questions, give appropriate short and long-form answers, and distinguish between situations requiring present perfect versus past simple.',
  homeworkIdeas: [
    'Create a "Have you ever" survey with 8-10 questions and interview family members',
    'Write a paragraph about your most interesting life experience using present perfect and past simple',
    'Research a famous person and write 5 sentences about things they have done in their life'
  ],
  additionalResources: [
    {
      title: 'Present Perfect for Experiences',
      url: 'https://www.englishclub.com/grammar/verb-tenses_present-perfect.htm'
    },
    {
      title: 'Have You Ever Activities',
      url: 'https://www.teach-this.com/esl-activities/present-perfect-ever-never'
    }
  ]
};

// Book 6, Unit 9 (Present Perfect: What Has Just Happened) Resources
export const book6Unit9Resources = [
  {
    title: "Present Perfect Tense Verbs Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/885efcf090f04b169ba976a1db08187d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/885efcf090f04b169ba976a1db08187d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Present Perfect Tense Verbs Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/971dcc6b738b4ee6b50d2f0d3108fb9e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/971dcc6b738b4ee6b50d2f0d3108fb9e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Present Perfect Tense Verbs Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/8caa6d3e98844ee9ad346e2127b3caf6",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8caa6d3e98844ee9ad346e2127b3caf6?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Present Perfect Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/3360",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/3360" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Present Perfect Tense Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: presentPerfectLessonPlan
  },
  {
    title: "Talking About Experiences Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: experiencesLessonPlan
  }
];
