// Book 6 Unit 8 implementation file - Free Time - Past Simple

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Unit 8 specific free time and past simple resources
export const book6Unit8Resources: TeacherResource[] = generateBook6UnitResources('6', '8');

// Unit 8 lesson plans
export const pastTenseVerbsLessonPlan: LessonPlan = {
  id: "book6-unit8-past-tense-lesson",
  title: "Past Simple Tense - Regular and Irregular Verbs",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn regular and irregular past tense forms",
    "Practice using past simple in context",
    "Describe past activities and free time events"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Past tense verb flashcards",
    "Wordwall games on past tense verbs"
  ],
  steps: [
    {
      title: "Warm-up",
      duration: "10 minutes",
      description: "Activate knowledge of past activities",
      instructions: [
        "Ask students what they did last weekend",
        "Make a list of past tense verbs from their answers"
      ]
    },
    {
      title: "Grammar Review",
      duration: "15 minutes",
      description: "Review past simple formation rules",
      instructions: [
        "Explain regular past tense formation (-ed ending)",
        "Present common irregular past tense verbs",
        "Sort verbs into regular and irregular categories"
      ]
    },
    {
      title: "Interactive Practice",
      duration: "15 minutes",
      description: "Use Wordwall games to reinforce past tense forms",
      instructions: [
        "Have students play the past tense Wordwall games",
        "Monitor and provide feedback on verb forms"
      ]
    },
    {
      title: "Free Time Discussion",
      duration: "10 minutes",
      description: "Apply past tense in context of leisure activities",
      instructions: [
        "Discuss various free time activities using past tense",
        "Ask and answer questions about past experiences"
      ]
    },
    {
      title: "Assessment",
      duration: "10 minutes",
      description: "Check understanding of past simple tense",
      instructions: [
        "Complete a gap-fill exercise with past tense verbs",
        "Write short sentences about past weekend activities"
      ]
    }
  ]
};

export const freeTimeActivitiesLessonPlan: LessonPlan = {
  id: "book6-unit8-free-time-lesson",
  title: "Free Time Activities in the Past",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for free time activities",
    "Practice narrating past events",
    "Develop speaking skills about leisure activities"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Free time activity images",
    "Past simple worksheet"
  ],
  steps: [
    {
      title: "Introduction",
      duration: "10 minutes",
      description: "Introduce free time vocabulary",
      instructions: [
        "Present various leisure activities with images",
        "Discuss which activities students enjoy"
      ]
    },
    {
      title: "Vocabulary Building",
      duration: "15 minutes",
      description: "Expand free time vocabulary",
      instructions: [
        "Introduce additional leisure activity terms",
        "Categorize activities (indoor, outdoor, social, etc.)"
      ]
    },
    {
      title: "Past Tense Stories",
      duration: "15 minutes",
      description: "Create past tense narratives about free time",
      instructions: [
        "Model a short story about a past weekend",
        "Have students write their own past tense stories"
      ]
    },
    {
      title: "Speaking Practice",
      duration: "15 minutes",
      description: "Share past experiences in pairs",
      instructions: [
        "Interview classmates about past leisure activities",
        "Report findings to the class using past tense"
      ]
    }
  ]
};

// Combined lesson plans for Unit 8
export const book6Unit8LessonPlans: LessonPlan[] = [
  pastTenseVerbsLessonPlan,
  freeTimeActivitiesLessonPlan
];

// Function to get resources for this unit
export function getBook6Unit8Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit8Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit8LessonPlans(): LessonPlan[] {
  return book6Unit8LessonPlans;
}
