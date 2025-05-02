/**
 * Resources for Book 6 Unit 16 - Fashion Accessories
 */
import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 16
 * This uses the centralized resource management approach
 */
export function getBook6Unit16Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

/**
 * Get lesson plans for Book 6 Unit 16
 * This uses the centralized lesson plan generator
 */
export function getBook6Unit16LessonPlans(): LessonPlan[] {
  return [
    {
      id: "book6-unit16-fashion-accessories-lesson",
      title: "Fashion Accessories Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn vocabulary related to fashion accessories",
        "Describe clothing and accessories accurately",
        "Express preferences about style and fashion",
        "Practice shopping dialogues for fashion items"
      ],
      materials: [
        "Visual English Book 6 Unit 16 slides",
        "Fashion magazine cutouts or images",
        "Sample accessories (if available)",
        "Wordwall games on fashion vocabulary"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Fashion discussion and vocabulary activation",
          instructions: [
            "Ask students about their fashion preferences",
            "Show images of different fashion accessories",
            "Discuss current fashion trends"
          ]
        },
        {
          title: "Vocabulary Introduction",
          duration: "15 minutes",
          description: "Present fashion accessories terminology",
          materials: [
            "Visual English slides on accessories",
            "Fashion accessories vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: jewelry, bags, headwear, etc.",
            "Show examples with visual aids",
            "Practice pronunciation and meaning"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on fashion vocabulary",
          materials: [
            "Devices with internet access",
            "Fashion Accessories Games"
          ],
          instructions: [
            "Students play 'Fashion Accessories Games'",
            "Review challenging vocabulary as a class",
            "Discuss different styles and occasions for accessories"
          ]
        },
        {
          title: "Fashion Designer Activity",
          duration: "10-15 minutes",
          description: "Creative activity using new vocabulary",
          instructions: [
            "Divide students into pairs",
            "Each student describes their ideal outfit with accessories",
            "Partner draws the described outfit based on the description",
            "Compare drawings with original ideas"
          ]
        }
      ],
      assessmentTips: "Monitor appropriate use of descriptive vocabulary. Check understanding of fashion terminology. Evaluate students' ability to express preferences using comparative and superlative forms.",
      homeworkIdeas: [
        "Create a fashion magazine page showcasing accessories with descriptions",
        "Write a dialogue between a customer and sales assistant about purchasing accessories",
        "Research fashion accessories from different cultures and prepare a short presentation"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
