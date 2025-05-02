/**
 * Resources for Book 6 Unit 13 - Clothes And Fashion
 */
import { TeacherResource } from '@/components/TeacherResources';
import type { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

/**
 * Get resources for Book 6 Unit 13
 * This uses the centralized resource management approach
 */
export function getBook6Unit13Resources(bookId: string, unitId: string): TeacherResource[] {
  return generateBook6UnitResources(bookId, unitId);
}

/**
 * Get lesson plans for Book 6 Unit 13
 * This uses the centralized lesson plan generator
 */
export function getBook6Unit13LessonPlans(): LessonPlan[] {
  return [
    {
      id: "book6-unit13-fashion-lesson",
      title: "Clothes and Fashion Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn vocabulary related to clothing and fashion",
        "Describe clothing items and styles",
        "Express preferences about fashion",
        "Practice using adjectives to describe clothing"
      ],
      materials: [
        "Visual English Book 6 Unit 13 slides",
        "Clothing vocabulary flashcards",
        "Fashion magazines or images",
        "Wordwall games on clothing items"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Fashion discussion and vocabulary activation",
          instructions: [
            "Show images of different clothing styles",
            "Ask students what they're wearing today",
            "Elicit vocabulary they already know about clothing"
          ]
        },
        {
          title: "Vocabulary Presentation",
          duration: "15 minutes",
          description: "Present clothing and fashion terms",
          materials: [
            "Visual English slides on clothing items",
            "Fashion vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: tops, bottoms, footwear, accessories",
            "Show examples of each category",
            "Practice pronunciation and have students repeat"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on fashion vocabulary",
          materials: [
            "Devices with internet access",
            "Wordwall fashion games"
          ],
          instructions: [
            "Divide students into pairs or small groups",
            "Have them play the 'Clothing Items Game' and 'Fashion Accessories Game'",
            "Discuss their scores and review challenging vocabulary"
          ]
        },
        {
          title: "Fashion Show Activity",
          duration: "10-15 minutes",
          description: "Students describe and present outfits",
          instructions: [
            "Students work in pairs to describe each other's clothing",
            "Each student presents their partner's outfit to the class",
            "Encourage the use of adjectives and fashion terminology"
          ]
        }
      ],
      assessmentTips: "Monitor vocabulary use during pair work. Check correct application of adjectives to describe clothing. Evaluate students' ability to express preferences about fashion items.",
      homeworkIdeas: [
        "Create a fashion magazine page with descriptions of different outfits",
        "Research fashion trends in different countries and prepare a short presentation",
        "Write a paragraph describing their favorite outfit using the new vocabulary"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
