/**
 * Resources for Book 6 Unit 12 - Are You Eco? Environment
 */
import { TeacherResource, LessonPlan } from '@/components/TeacherResources';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 12
 * This uses the centralized resource management approach
 */
export function getBook6Unit12Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

/**
 * Get lesson plans for Book 6 Unit 12
 * This uses the centralized lesson plan generator
 */
export function getBook6Unit12LessonPlans(): LessonPlan[] {
  return [
    {
      id: "book6-unit12-environmental-lesson",
      title: "Are You Eco? Environmental Awareness",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Understand key environmental concepts and issues",
        "Learn vocabulary related to environmental conservation",
        "Discuss human impact on the environment",
        "Develop eco-friendly mindset and practices"
      ],
      materials: [
        "Visual English Book 6 Unit 12 slides",
        "Environmental vocabulary flashcards",
        "Images of environmental issues",
        "Wordwall games on pollution and recycling"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Environmental awareness discussion",
          instructions: [
            "Show images of natural environments and polluted areas",
            "Ask students to describe what they see",
            "Discuss what 'environment' means to them"
          ]
        },
        {
          title: "Vocabulary Introduction",
          duration: "15 minutes",
          description: "Present key environmental terms",
          materials: [
            "Visual English slides on pollution types",
            "Environmental vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary: pollution, recycle, endangered, extinct, conservation",
            "Show examples of each concept",
            "Have students categorize environmental issues"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on environmental topics",
          materials: [
            "Tablets or computers",
            "Wordwall games on recycling and pollution"
          ],
          instructions: [
            "Divide students into pairs or small groups",
            "Have them play the 'Types of Pollution' and 'Can You Recycle?' games",
            "Discuss their scores and what they learned"
          ]
        },
        {
          title: "Environmental Action Plan",
          duration: "10-15 minutes",
          description: "Create personal eco-friendly plans",
          instructions: [
            "Students create a list of 3-5 actions they can take to help the environment",
            "Share ideas with the class",
            "Vote on which actions are most important"
          ]
        }
      ],
      assessmentTips: "Observe participation in discussions. Check vocabulary usage during activities. Evaluate the quality and practicality of students' environmental action plans.",
      homeworkIdeas: [
        "Research an endangered animal and create a fact sheet",
        "Track household waste for one day and identify ways to reduce it",
        "Create a poster about an environmental issue that concerns you"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
