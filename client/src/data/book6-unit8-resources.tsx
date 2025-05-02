// Resources for Book 6, Unit 8 - Free Time - Past Simple

import { LessonPlan } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const pastTenseVerbsLessonPlan: LessonPlan = {
  id: 'book6-unit8-past-tense-verbs',
  title: 'Past Tense Verbs',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Identify and use regular and irregular past tense verb forms',
    'Form affirmative, negative, and question forms in the past simple',
    'Describe past activities using appropriate time expressions'
  ],
  materials: [
    'Visual English Book 6, Unit 8',
    'Digital projector or interactive whiteboard',
    'Past tense verb cards (regular and irregular)',
    'Handout with past tense exercises',
    'Timeline for sequencing past events'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about verbs and past activities',
      instructions: [
        'Show pictures of people engaged in various activities',
        'Ask students to identify what the people are doing (elicit present tense)',
        'Then ask students what they did yesterday (elicit past tense forms)',
        'Write some examples on the board, highlighting the past tense forms'
      ]
    },
    {
      title: 'Regular vs Irregular Verbs',
      duration: '15 minutes',
      description: 'Teach the formation of past tense verbs',
      instructions: [
        'Present regular past tense verbs using Visual English slides',
        'Explain the -ed ending pattern and pronunciation rules',
        'Introduce common irregular past tense forms',
        'Create a chart comparing present and past forms',
        'Have students practice pronunciation'
      ]
    },
    {
      title: 'Past Tense Sorting Activity',
      duration: '10 minutes',
      description: 'Reinforce understanding of regular and irregular verbs',
      instructions: [
        'Divide students into pairs or small groups',
        'Distribute verb cards with present tense forms',
        'Students sort verbs into regular and irregular categories',
        'Then they write the past tense form for each verb',
        'Check answers as a class'
      ]
    },
    {
      title: 'Yesterday's Activities',
      duration: '15 minutes',
      description: 'Practice using past tense in meaningful context',
      instructions: [
        'Model a short paragraph about your activities yesterday',
        'Highlight the past tense verbs used',
        'Students write 5-7 sentences about their own activities yesterday',
        'In pairs, students take turns reading their sentences',
        'Partners identify the past tense verbs used'
      ]
    }
  ],
  assessmentTips: 'Assess students\' ability to correctly form and use past tense verbs through their written sentences and pair discussions. Note common errors with irregular verbs for further practice.',
  homeworkIdeas: [
    'Write a paragraph about an interesting day in the past',
    'Complete past tense verb exercises in the workbook',
    'Create a timeline of their past weekend with at least 8 activities'
  ],
  additionalResources: [
    {
      title: 'Past Tense Verbs Wordwall Game',
      url: 'https://wordwall.net/embed/a95c4a46b32447f0916d3b6f2093cac3'
    },
    {
      title: 'Past Tense Verb Matching Game',
      url: 'https://wordwall.net/embed/b5a88799031c431e971373a669bfb5c7'
    }
  ]
};

export const talkingAboutPastActivitiesLessonPlan: LessonPlan = {
  id: 'book6-unit8-talking-about-past-activities',
  title: 'Talking About Past Activities',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Use past simple tense to describe leisure activities',
    'Ask and answer questions about past free time activities',
    'Use time expressions correctly with past simple tense'
  ],
  materials: [
    'Visual English Book 6, Unit 8',
    'Digital projector or interactive whiteboard',
    'Free time activity pictures',
    'Question prompt cards',
    'Weekend diary template'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Review past tense forms and introduce free time context',
      instructions: [
        'Display pictures of different leisure activities',
        'Ask students: "What free time activities do you enjoy?"',
        'Elicit responses and list them on the board',
        'Explain that today we will talk about these activities in the past'
      ]
    },
    {
      title: 'Past Time Expressions',
      duration: '10 minutes',
      description: 'Teach time expressions commonly used with past simple',
      instructions: [
        'Present common time expressions: yesterday, last week, last weekend, two days ago, etc.',
        'Show example sentences combining time expressions with past tense verbs',
        'Students create their own sentences using the model',
        'Check for correct placement of time expressions'
      ]
    },
    {
      title: 'Question Formation Practice',
      duration: '15 minutes',
      description: 'Practice forming and answering past simple questions',
      instructions: [
        'Present the structure for past simple questions with "did"',
        'Contrast with other question types (yes/no vs. wh-questions)',
        'In pairs, students practice asking and answering questions about past activities',
        'Provide prompt cards with question starters: "Did you...?", "What did you...?", "Where did you...?"'
      ]
    },
    {
      title: 'Weekend Report',
      duration: '15 minutes',
      description: 'Apply past simple in an extended speaking context',
      instructions: [
        'Distribute a weekend diary template',
        'Students complete the template with activities they did last weekend',
        'Divide students into groups of 3-4',
        'Students take turns reporting about their weekend',
        'Listeners must ask at least one follow-up question after each report'
      ]
    }
  ],
  assessmentTips: 'Monitor group discussions to assess fluency and accuracy with past simple forms. Note students\' ability to ask appropriate questions in the past tense. Check for correct use of time expressions in context.',
  homeworkIdeas: [
    'Interview a family member about a memorable day in their life',
    'Write a journal entry about a special day in the past',
    'Create a questionnaire about past activities and survey classmates next lesson'
  ],
  additionalResources: [
    {
      title: 'Past Tense Verbs Categorizing Game',
      url: 'https://wordwall.net/embed/6c4f1e98c0f24f5fbf63d959bba397ce'
    },
    {
      title: 'Past Simple Activities Video Lesson',
      url: 'https://en.islcollective.com/english-esl-video-lessons/embed/772028'
    }
  ]
};

// Book 6, Unit 8 (Free Time - Past Simple) Resources
export const book6Unit8Resources = [
  {
    title: "Past Tense Verbs Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/a95c4a46b32447f0916d3b6f2093cac3",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a95c4a46b32447f0916d3b6f2093cac3?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Tense Verbs Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/b5a88799031c431e971373a669bfb5c7",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b5a88799031c431e971373a669bfb5c7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Tense Verbs Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/6c4f1e98c0f24f5fbf63d959bba397ce",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c4f1e98c0f24f5fbf63d959bba397ce?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Simple Activities Video",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/772028",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/772028" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Past Tense Verbs Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: pastTenseVerbsLessonPlan
  },
  {
    title: "Talking About Past Activities Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: talkingAboutPastActivitiesLessonPlan
  }
];
