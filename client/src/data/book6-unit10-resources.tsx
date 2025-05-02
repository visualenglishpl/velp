import { TeacherResource } from '@/components/TeacherResources';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Past Continuous - Unit 10 Resources
export const book6Unit10Resources: TeacherResource[] = generateBook6UnitResources('6', '10');

// Create the implementation function to expose the resources
export function getBook6Unit10Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit10Resources;
}

// Unit 10 specific lesson plans
export const pastContinuousLessonPlan = {
  id: "book6-unit10-past-continuous-lesson",
  title: "Past Continuous: What Was Happening",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Understand and use the past continuous tense",
    "Describe actions in progress in the past",
    "Contrast past simple and past continuous"
  ],
  materials: [
    "Visual English Book 6 Unit 10 slides",
    "Situation pictures for past continuous",
    "Past continuous worksheet"
  ],
  steps: [
    {
      title: "Warm-up", 
      duration: "10 minutes",
      description: "Introduce past continuous through visual contexts",
      instructions: ["Show pictures of actions in progress", "Ask students what was happening in each picture", "Highlight the structure: was/were + verb-ing"]
    },
    {
      title: "Grammar Presentation",
      duration: "15 minutes",
      description: "Present the form and function of past continuous",
      materials: ["Visual examples", "Grammar chart"],
      instructions: ["Present affirmative, negative and question forms", "Demonstrate how to describe ongoing past actions", "Show examples in context with timelines"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Guided practice using past continuous",
      materials: ["Past Continuous Wordwall game"],
      instructions: ["Play interactive game to identify past continuous sentences", "Have students create their own examples", "Monitor for correct form and usage"]
    },
    {
      title: "Activity", 
      duration: "15 minutes",
      description: "Past continuous storytelling",
      materials: ["Story sequence cards"],
      instructions: ["Distribute story cards with scenes", "Students work in pairs to describe what was happening", "Share stories with the class"]
    }
  ],
  assessmentTips: "Check formation of past continuous in written work. Listen for proper usage of was/were + verb-ing. Evaluate storytelling for appropriate use of tense.",
  homeworkIdeas: [
    "Write a short paragraph about what you were doing at specific times yesterday",
    "Complete past continuous exercises in workbook",
    "Create a comic strip showing actions in progress in the past"
  ]
};

export const pastContinuousInterruptionLessonPlan = {
  id: "book6-unit10-past-continuous-interruption-lesson",
  title: "Past Continuous: Interrupted Actions",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Use past continuous for interrupted actions",
    "Combine past continuous and past simple",
    "Create narrative sequences with both tenses"
  ],
  materials: [
    "Visual English Book 6 Unit 10 slides",
    "Interruption scenario cards",
    "Interactive whiteboard activities"
  ],
  steps: [
    {
      title: "Review",
      duration: "10 minutes",
      description: "Review past continuous from previous lesson",
      instructions: ["Quick recall of past continuous form", "Elicit example sentences", "Introduce the concept of interrupted actions"]
    },
    {
      title: "Presentation",
      duration: "15 minutes",
      description: "Introduce interrupted actions with 'when' and 'while'",
      materials: ["Sentence structure charts", "Visual examples"],
      instructions: ["Present the structure: 'while + past continuous, past simple'", "Show examples with illustrations", "Demonstrate how to connect the two tenses"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Guided practice with interrupted actions",
      materials: ["When/While Wordwall activity"],
      instructions: ["Guide students through the online activity", "Have them connect sentence halves using when/while", "Check answers as a class"]
    },
    {
      title: "Activity",
      duration: "15 minutes",
      description: "Creating interrupted action stories",
      materials: ["Scenario cards"],
      instructions: ["Pair students with scenario prompts", "Have them create short stories with interrupted actions", "Share stories and provide feedback"]
    }
  ],
  assessmentTips: "Check for proper coordination of tenses. Ensure 'when' and 'while' are used correctly. Evaluate students' ability to create logical sequences of events.",
  homeworkIdeas: [
    "Write about a time when you were interrupted while doing something",
    "Complete the exercises connecting past simple and past continuous",
    "Create a timeline of events showing main actions and interruptions"
  ]
};

export const book6Unit10LessonPlans = [
  pastContinuousLessonPlan,
  pastContinuousInterruptionLessonPlan
];

export function getBook6Unit10LessonPlans() {
  return book6Unit10LessonPlans;
}
