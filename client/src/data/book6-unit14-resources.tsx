/**
 * Resources for Book 6 Unit 14 - At The Airport
 */
import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 14
 * This uses the centralized resource management approach
 */
export function getBook6Unit14Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

/**
 * Get lesson plans for Book 6 Unit 14
 * This uses the centralized lesson plan generator
 */
export function getBook6Unit14LessonPlans(): LessonPlan[] {
  return [
    {
      id: "book6-unit14-airport-lesson",
      title: "At The Airport Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn key vocabulary related to airports and air travel",
        "Understand airport procedures and announcements",
        "Practice dialogues related to checking in and security",
        "Use travel phrasal verbs correctly"
      ],
      materials: [
        "Visual English Book 6 Unit 14 slides",
        "Airport signs and announcement printouts",
        "Boarding pass templates",
        "Wordwall games on airport vocabulary"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Airport experience discussion",
          instructions: [
            "Ask students about their experiences at airports",
            "Show images of different parts of an airport",
            "Elicit vocabulary they already know about air travel"
          ]
        },
        {
          title: "Vocabulary Introduction",
          duration: "15 minutes",
          description: "Present airport terminology",
          materials: [
            "Visual English slides on airport zones",
            "Airport vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: check-in, security, boarding, arrival",
            "Show examples of each with visual aids",
            "Practice pronunciation and meaning"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on airport terminology",
          materials: [
            "Devices with internet access",
            "Airport vocabulary games"
          ],
          instructions: [
            "Students play 'Airport Vocabulary Games'",
            "Review challenging vocabulary as a class",
            "Discuss different airport procedures"
          ]
        },
        {
          title: "Role-Play Activity",
          duration: "10-15 minutes",
          description: "Students act out airport scenarios",
          instructions: [
            "Divide students into pairs with assigned roles (passenger/staff)",
            "Provide scenario cards for different airport situations",
            "Have students perform their dialogues for the class"
          ]
        }
      ],
      assessmentTips: "Observe students' use of airport vocabulary during role-plays. Check understanding of airport procedures. Evaluate ability to form questions and give information about air travel.",
      homeworkIdeas: [
        "Write a short dialogue between a passenger and airport staff",
        "Create a guide for first-time travelers with important airport vocabulary",
        "Research and describe the main features of a famous international airport"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
