/**
 * Resources for Book 6 Unit 15 - Are You A Survivor
 */
import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 15
 * This uses the centralized resource management approach
 */
export function getBook6Unit15Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

/**
 * Get lesson plans for Book 6 Unit 15
 * This uses the centralized lesson plan generator
 */
export function getBook6Unit15LessonPlans(): LessonPlan[] {
  return [
    {
      id: "book6-unit15-survival-lesson",
      title: "Survival Skills Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn vocabulary related to survival and outdoor skills",
        "Understand and describe survival situations",
        "Practice giving and following survival instructions",
        "Develop problem-solving skills for emergency scenarios"
      ],
      materials: [
        "Visual English Book 6 Unit 15 slides",
        "Survival equipment images or props",
        "Survival scenario cards",
        "Wordwall games on survival vocabulary"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Survival knowledge activation",
          instructions: [
            "Ask students what they know about outdoor survival",
            "Show images of survival situations and equipment",
            "Discuss what skills are most important in emergencies"
          ]
        },
        {
          title: "Vocabulary Introduction",
          duration: "15 minutes",
          description: "Present survival terminology",
          materials: [
            "Visual English slides on survival equipment",
            "Survival vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: equipment, skills, natural hazards",
            "Show examples with visual aids",
            "Practice pronunciation and meaning"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on survival skills",
          materials: [
            "Devices with internet access",
            "Survival Vocabulary Games"
          ],
          instructions: [
            "Students play 'Survival Vocabulary Games'",
            "Review challenging vocabulary as a class",
            "Discuss practical applications of survival knowledge"
          ]
        },
        {
          title: "Survival Challenge",
          duration: "10-15 minutes",
          description: "Problem-solving activity",
          instructions: [
            "Divide students into small groups",
            "Give each group a survival scenario card",
            "Have students prepare and present their survival plan to the class",
            "Other students evaluate and suggest improvements"
          ]
        }
      ],
      assessmentTips: "Evaluate the practical application of vocabulary in the survival challenge. Check understanding of survival instructions. Assess students' ability to describe emergency procedures clearly.",
      homeworkIdeas: [
        "Create a survival kit checklist with explanations for each item",
        "Write a short survival guide for a specific environment (desert, forest, mountain, etc.)",
        "Research a real survival story and prepare a brief presentation"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
