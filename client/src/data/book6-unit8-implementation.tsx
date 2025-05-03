// Book 6 Unit 8 implementation file - Free Time - Past Simple

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Unit 8 specific gym-related resources
export const book6Unit8Resources: TeacherResource[] = generateBook6UnitResources('6', '8');

// Unit 8 lesson plans
export const gymVocabularyLessonPlan: LessonPlan = {
  id: "book6-unit8-gym-lesson",
  title: "Gym Equipment and Activities",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to gym equipment",
    "Understand and use vocabulary for fitness activities",
    "Practice describing gym routines"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Pictures of gym equipment",
    "Fitness activity cards"
  ],
  steps: [
    {
      title: "Warm-up",
      duration: "10 minutes",
      description: "Activate prior knowledge about fitness and gym activities",
      instructions: [
        "Ask students if they go to a gym and what activities they do",
        "Discuss different types of fitness activities"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "15 minutes",
      description: "Introduce gym-related vocabulary",
      instructions: [
        "Present gym equipment vocabulary using slides",
        "Demonstrate proper pronunciation of new terms"
      ]
    },
    {
      title: "Guided Practice",
      duration: "15 minutes",
      description: "Apply vocabulary in contextual activities",
      instructions: [
        "Match equipment names to images",
        "Complete sentences about gym routines using new vocabulary"
      ]
    },
    {
      title: "Speaking Activity",
      duration: "10 minutes",
      description: "Practice using gym vocabulary in conversation",
      instructions: [
        "Role play: Giving advice about gym routines",
        "Discuss personal fitness preferences"
      ]
    },
    {
      title: "Assessment",
      duration: "10 minutes",
      description: "Check understanding of gym vocabulary",
      instructions: [
        "Complete a vocabulary quiz",
        "Create a personal workout routine using target vocabulary"
      ]
    }
  ]
};

export const fitnessRoutinesLessonPlan: LessonPlan = {
  id: "book6-unit8-fitness-routines-lesson",
  title: "Describing Fitness Routines",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Practice describing exercise routines",
    "Learn vocabulary for fitness goals",
    "Use frequency adverbs to discuss workout schedules"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Workout schedule templates",
    "Fitness goal cards"
  ],
  steps: [
    {
      title: "Introduction",
      duration: "10 minutes",
      description: "Discuss workout routines and fitness goals",
      instructions: [
        "Ask students about their exercise habits",
        "Introduce concept of fitness goals and routines"
      ]
    },
    {
      title: "Vocabulary Building",
      duration: "15 minutes",
      description: "Focus on specific vocabulary for fitness routines",
      instructions: [
        "Present vocabulary related to workout frequency and intensity",
        "Introduce terms for describing fitness progress"
      ]
    },
    {
      title: "Grammar Focus",
      duration: "10 minutes",
      description: "Practice using frequency adverbs with workout descriptions",
      instructions: [
        "Review frequency adverbs (always, often, sometimes, rarely, never)",
        "Practice sentence formation with frequency adverbs"
      ]
    },
    {
      title: "Pair Work",
      duration: "15 minutes",
      description: "Create and discuss fitness routines in pairs",
      instructions: [
        "Create a weekly workout schedule with a partner",
        "Discuss fitness goals and how to achieve them"
      ]
    },
    {
      title: "Production",
      duration: "10 minutes",
      description: "Present fitness plans to the class",
      instructions: [
        "Present created workout schedules to the class",
        "Give feedback on others' fitness plans"
      ]
    }
  ]
};

// Combined lesson plans for Unit 8
export const book6Unit8LessonPlans: LessonPlan[] = [
  gymVocabularyLessonPlan,
  fitnessRoutinesLessonPlan
];

// Function to get resources for this unit
export function getBook6Unit8Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit8Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit8LessonPlans(): LessonPlan[] {
  return book6Unit8LessonPlans;
}
