// This file contains resources for Book 5, Unit 8 (Regular Verbs Past Tense themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit8Resources = [
  {
    title: "Past Simple Regular Verbs Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/634707da2b274fe5b687a0eb0498317a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/634707da2b274fe5b687a0eb0498317a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Simple Regular Verbs Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4f267a1441db4c939aefed479d23ffac",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4f267a1441db4c939aefed479d23ffac?themeId=21&templateId=69&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Past Simple Regular Verbs Kahoot Quiz",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/simple-past-basic-regular-verbs/7a4134ca-4b25-41d8-8cdc-be5ed1732bf8"
  },
  {
    title: "Past Simple Video Lesson 1",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/685249",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/685249" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Past Simple Video Lesson 2",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/445749",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/445749" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Past Simple Regular Verbs Form
export const pastSimpleFormLessonPlan = {
  id: "past-simple-form-lesson",
  title: "Past Simple: Regular Verbs Form",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn how to form the past simple tense with regular verbs",
    "Practice pronunciation of -ed endings",
    "Develop understanding of spelling rules for regular past tense verbs",
    "Build confidence in using past simple in affirmative sentences"
  ],
  materials: [
    "Visual English Book 5, Unit 8 slides",
    "Past Simple Regular Verbs Games",
    "Past Simple Video Lesson 1",
    "Verb cards",
    "Past tense pronunciation guide"
  ],
  steps: [
    {
      title: "Warm-up: Verb Brainstorm",
      duration: "5 minutes",
      description: "Activate knowledge about regular verbs",
      instructions: [
        "Ask students to list action verbs they know (walk, talk, play, etc.)",
        "Write these on the board in present tense",
        "Explain that today's lesson will focus on changing these verbs to past tense",
        "Elicit if students already know any past tense forms"
      ]
    },
    {
      title: "Past Simple Formation Rules",
      duration: "10 minutes",
      description: "Learn how to form the past simple tense of regular verbs",
      materials: ["Visual English Book 5, Unit 8 slides"],
      instructions: [
        "Present the basic rule: add -ed to regular verbs (walk → walked)",
        "Explain spelling rules: verbs ending in e add only -d (like → liked)",
        "Verbs ending in consonant + y: change y to i and add -ed (study → studied)",
        "Verbs ending in single vowel + consonant: double the final consonant (stop → stopped)",
        "Practice applying rules with examples from the brainstorming activity"
      ]
    },
    {
      title: "Pronunciation of -ed Endings",
      duration: "10 minutes",
      description: "Learn and practice the three pronunciations of -ed",
      materials: ["Past tense pronunciation guide"],
      instructions: [
        "Explain that -ed has three different pronunciations: /t/, /d/, and /ɪd/",
        "/t/ after unvoiced sounds (walked, stopped, watched)",
        "/d/ after voiced sounds (played, opened, closed)",
        "/ɪd/ after t or d sounds (wanted, needed, decided)",
        "Demonstrate each sound clearly and have students repeat",
        "Practice with different verbs, having students identify the correct pronunciation"
      ]
    },
    {
      title: "Video: Past Simple Introduction",
      duration: "10 minutes",
      description: "Watch a video explaining regular past tense formation",
      materials: ["Past Simple Video Lesson 1"],
      instructions: [
        "Play the Past Simple Video Lesson 1",
        "Ask students to note any new rules or examples they observe",
        "Pause to check understanding and practice examples",
        "After watching, review the main points about regular past tense formation"
      ]
    },
    {
      title: "Interactive Practice: Past Tense Games",
      duration: "10 minutes",
      description: "Practice forming past simple through digital games",
      materials: ["Past Simple Regular Verbs Games", "Verb cards"],
      instructions: [
        "Have students play the Past Simple Regular Verbs Games",
        "Alternate with a quick verb card activity: show present tense verb cards and have students say the past tense form",
        "Focus on both spelling and pronunciation",
        "Provide feedback and correction as needed",
        "Review any patterns or rules that students find challenging"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly form past tense verbs according to spelling rules, proper pronunciation of -ed endings, and participation in practice activities.",
  homeworkIdeas: [
    "Complete a worksheet with 20 regular verbs to change to past tense", 
    "Write 10 sentences about activities you did last weekend using regular past tense verbs",
    "Create a chart categorizing past tense verbs by their -ed pronunciation (/t/, /d/, or /ɪd/)"
  ],
  additionalResources: [
    {
      title: "Past Simple Regular Verbs Exercises",
      url: "https://www.perfect-english-grammar.com/past-simple-regular-verbs-exercises.html"
    },
    {
      title: "Ed Pronunciation Guide",
      url: "https://www.englishclub.com/pronunciation/past-tense.htm"
    }
  ]
};

// Second lesson plan for Unit 8: Using Past Simple in Context
export const pastSimpleContextLessonPlan = {
  id: "past-simple-context-lesson",
  title: "Using Past Simple in Context",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Practice using past simple tense in negative and question forms",
    "Develop ability to use time expressions with past simple",
    "Build narrative skills using past simple verbs",
    "Apply past simple in meaningful contexts"
  ],
  materials: [
    "Visual English Book 5, Unit 8 slides",
    "Past Simple Video Lesson 2",
    "Past Simple Regular Verbs Kahoot Quiz",
    "Past tense time expression cards",
    "Story sequence pictures"
  ],
  steps: [
    {
      title: "Warm-up: Yesterday's Activities",
      duration: "5 minutes",
      description: "Activate knowledge about past activities",
      instructions: [
        "Ask students: 'What did you do yesterday?'",
        "Write some examples on the board highlighting regular past tense verbs",
        "Introduce common time expressions for past simple: yesterday, last week, ago, etc.",
        "Have students take turns sharing one activity using past tense"
      ]
    },
    {
      title: "Negative and Question Forms",
      duration: "10 minutes",
      description: "Learn how to form negatives and questions in past simple",
      materials: ["Visual English Book 5, Unit 8 slides"],
      instructions: [
        "Present negative structure: subject + didn't + base form (I didn't play)",
        "Explain that we don't add -ed in negative forms",
        "Present question structure: Did + subject + base form (Did you watch TV?)",
        "Show examples of short answers: Yes, I did. / No, I didn't.",
        "Practice transforming affirmative sentences into negative and question forms"
      ]
    },
    {
      title: "Time Expressions with Past Simple",
      duration: "10 minutes",
      description: "Learn and practice time expressions used with past simple",
      materials: ["Past tense time expression cards"],
      instructions: [
        "Present common time expressions: yesterday, last night/week/month/year, ago, in 2010, etc.",
        "Explain position of time expressions in sentences",
        "Distribute time expression cards to pairs or small groups",
        "Students create sentences using the time expressions and past simple verbs",
        "Share sentences with the class and correct as needed"
      ]
    },
    {
      title: "Video: Past Simple in Context",
      duration: "10 minutes",
      description: "Watch a video showing past simple used in context",
      materials: ["Past Simple Video Lesson 2"],
      instructions: [
        "Play the Past Simple Video Lesson 2",
        "Ask students to note examples of past simple in different contexts",
        "Pause to discuss how past simple is used in the examples",
        "After watching, review the key uses of past simple tense"
      ]
    },
    {
      title: "Past Simple Narrative Activity",
      duration: "10 minutes",
      description: "Practice using past simple in storytelling",
      materials: ["Story sequence pictures", "Past Simple Regular Verbs Kahoot Quiz"],
      instructions: [
        "Show a series of pictures depicting a simple story",
        "Model narrating the story using past simple: 'First, he walked to school. Then he talked to his friend.'",
        "Divide students into pairs or small groups",
        "Distribute different story sequence pictures to each group",
        "Groups prepare a short narrative of their picture sequence using past simple",
        "Groups present their stories to the class",
        "Finish with the Past Simple Regular Verbs Kahoot Quiz if time permits"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to form negative and question forms correctly, appropriate use of time expressions, and ability to use past simple in a coherent narrative.",
  homeworkIdeas: [
    "Write a short story about a memorable day using at least 10 regular past tense verbs", 
    "Transform a present tense paragraph into past tense",
    "Create 5 questions about a classmate's past activities and interview them in the next class"
  ],
  additionalResources: [
    {
      title: "Past Simple Exercises with Time Expressions",
      url: "https://www.englisch-hilfen.de/en/exercises/tenses/simple_past_time.htm"
    },
    {
      title: "Past Simple Storytelling Activities",
      url: "https://www.teach-this.com/esl-resources/past-simple-activities"
    }
  ]
};
