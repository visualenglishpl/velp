/**
 * Resources for Book 6 Unit 13 - City Life
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
      id: "book6-unit13-city-life-lesson",
      title: "City Life Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn vocabulary related to city life and urban environments",
        "Describe features and locations in a city",
        "Compare rural and urban living",
        "Use prepositions to describe locations in a city"
      ],
      materials: [
        "Visual English Book 6 Unit 13 slides",
        "City maps or images",
        "Urban vocabulary flashcards",
        "Wordwall games on city vocabulary"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "City discussion and vocabulary activation",
          instructions: [
            "Show images of different cities around the world",
            "Ask students what places they can identify in a city",
            "Elicit vocabulary they already know about urban areas"
          ]
        },
        {
          title: "Vocabulary Presentation",
          duration: "15 minutes",
          description: "Present urban vocabulary terms",
          materials: [
            "Visual English slides on city features",
            "City vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: buildings, transportation, public spaces",
            "Show examples of each category",
            "Practice pronunciation and have students repeat"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on city vocabulary",
          materials: [
            "Devices with internet access",
            "City Life vocabulary games"
          ],
          instructions: [
            "Divide students into pairs or small groups",
            "Have them play the 'City Life Vocabulary Games'",
            "Discuss their scores and review challenging vocabulary"
          ]
        },
        {
          title: "City Planning Activity",
          duration: "10-15 minutes",
          description: "Students design their own ideal city",
          instructions: [
            "Provide blank paper for students to design a city map",
            "They should label at least 10 places using the new vocabulary",
            "Have students present their ideal city design to a partner or the class"
          ]
        }
      ],
      assessmentTips: "Monitor vocabulary use during pair work. Check correct application of prepositions when describing locations. Evaluate students' ability to compare urban and rural environments.",
      homeworkIdeas: [
        "Write a paragraph comparing city life to country life",
        "Create a brochure for tourists visiting your city highlighting key attractions",
        "Research and describe a famous city around the world"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
