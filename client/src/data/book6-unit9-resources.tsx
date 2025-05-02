import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Present Perfect: What Has Just Happened - Unit 9 Resources

// Base resources generated from common module
const baseResources = generateBook6UnitResources('6', '9');

// Additional specific resources from the document
const additionalResources: TeacherResource[] = [
  {
    id: "book6-unit9-game3",
    bookId: '6',
    unitId: '9',
    title: "Present Perfect Tense Verbs Game 1",
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: "https://wordwall.net/resource/885efcf090f04b169ba976a1db08187d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/885efcf090f04b169ba976a1db08187d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit9-game4",
    bookId: '6',
    unitId: '9',
    title: "Present Perfect Tense Verbs Game 2",
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: "https://wordwall.net/resource/971dcc6b738b4ee6b50d2f0d3108fb9e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/971dcc6b738b4ee6b50d2f0d3108fb9e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit9-game5",
    bookId: '6',
    unitId: '9',
    title: "Present Perfect Tense Verbs Game 3",
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: "https://wordwall.net/resource/8caa6d3e98844ee9ad346e2127b3caf6",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8caa6d3e98844ee9ad346e2127b3caf6?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit9-video2",
    bookId: '6',
    unitId: '9',
    title: "Present Perfect Lesson",
    resourceType: 'video',
    provider: 'ISL Collective',
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/3360",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/3360" width="560" height="315" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Combine base resources with additional specific resources
export const book6Unit9Resources = [...baseResources, ...additionalResources];

// Create the implementation function to expose the resources
export function getBook6Unit9Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit9Resources;
}

// Unit 9 specific lesson plans
export const presentPerfectLessonPlan = {
  id: "book6-unit9-present-perfect-lesson",
  title: "Present Perfect: What Has Just Happened",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Understand and use the present perfect tense",
    "Describe actions that have just happened",
    "Contrast present perfect with past simple"
  ],
  materials: [
    "Visual English Book 6 Unit 9 slides",
    "Present Perfect Wordwall games",
    "Situation pictures for present perfect"
  ],
  steps: [
    {
      title: "Warm-up", 
      duration: "10 minutes",
      description: "Introduce the present perfect with visual contexts",
      instructions: ["Show pictures of actions that have just happened", "Ask students what has happened in each picture", "Highlight the structure: has/have + past participle"]
    },
    {
      title: "Grammar Presentation",
      duration: "15 minutes",
      description: "Present the form and function of present perfect",
      materials: ["Visual examples", "Grammar chart"],
      instructions: ["Present affirmative, negative and question forms", "Show how to use 'just' with present perfect", "Explain the meaning of recent completion"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Guided practice using present perfect with 'just'",
      materials: ["Present Perfect Wordwall games"],
      instructions: ["Use interactive games to identify present perfect sentences", "Have students create their own examples", "Monitor for correct form and usage"]
    },
    {
      title: "Activity", 
      duration: "15 minutes",
      description: "Present perfect chain activity",
      instructions: ["Students take turns creating sentences about what they have just done", "Each student must use the present perfect correctly", "Create a chain of actions in the classroom"]
    }
  ],
  assessmentTips: "Check use of auxiliary verbs has/have with correct past participle forms. Listen for appropriate use of 'just'. Evaluate students' ability to describe recent actions.",
  homeworkIdeas: [
    "Write 5 sentences about things you have just done today",
    "Create a comic strip showing people who have just completed actions",
    "Complete present perfect exercises in workbook"
  ]
};

export const presentPerfectVsPastSimpleLessonPlan = {
  id: "book6-unit9-present-perfect-vs-past-simple-lesson",
  title: "Present Perfect vs Past Simple",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Differentiate between present perfect and past simple",
    "Choose the appropriate tense based on context",
    "Practice using time expressions with both tenses"
  ],
  materials: [
    "Visual English Book 6 Unit 9 slides",
    "Contrast charts for present perfect and past simple",
    "Situation cards for practice"
  ],
  steps: [
    {
      title: "Review",
      duration: "10 minutes",
      description: "Review present perfect from previous lesson",
      instructions: ["Quick recall of present perfect form", "Elicit example sentences", "Introduce past simple for comparison"]
    },
    {
      title: "Presentation",
      duration: "15 minutes",
      description: "Compare present perfect and past simple",
      materials: ["Tense comparison chart", "Visual examples"],
      instructions: ["Show how present perfect connects past to present", "Demonstrate how past simple shows completed actions", "Highlight time expressions for each tense"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Guided practice with tense selection",
      materials: ["Gap-fill exercises", "Wordwall games"],
      instructions: ["Students complete sentences choosing correct tense", "Use interactive games to reinforce differences", "Check answers as a class"]
    },
    {
      title: "Activity",
      duration: "15 minutes",
      description: "Tense contrast interview",
      materials: ["Interview worksheets"],
      instructions: ["Students interview partners about recent and past experiences", "Practice questions in both tenses", "Report findings to the class using correct tenses"]
    }
  ],
  assessmentTips: "Check appropriate tense selection based on context. Listen for proper time expressions with each tense. Evaluate ability to explain the difference between the two tenses.",
  homeworkIdeas: [
    "Write a paragraph about your weekend using both tenses appropriately",
    "Create a timeline of your life showing when to use each tense",
    "Complete the comparative exercises in the workbook"
  ]
};

export const book6Unit9LessonPlans = [
  presentPerfectLessonPlan,
  presentPerfectVsPastSimpleLessonPlan
];

export function getBook6Unit9LessonPlans(): LessonPlan[] {
  return book6Unit9LessonPlans;
}
