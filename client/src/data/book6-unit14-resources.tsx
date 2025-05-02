/**
 * Resources for Book 6 Unit 14 - Cinema And Movies
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
      id: "book6-unit14-cinema-lesson",
      title: "Cinema and Movies Vocabulary",
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn key vocabulary related to cinema and movies",
        "Identify and describe different film genres",
        "Express opinions about movies",
        "Discuss the process of filmmaking"
      ],
      materials: [
        "Visual English Book 6 Unit 14 slides",
        "Movie posters or images",
        "Short film clips",
        "Wordwall games on movie vocabulary"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Movie discussion and genre identification",
          instructions: [
            "Show images of different film genres",
            "Ask students about their favorite movies",
            "Elicit vocabulary they already know about cinema"
          ]
        },
        {
          title: "Vocabulary Introduction",
          duration: "15 minutes",
          description: "Present cinema and movie terminology",
          materials: [
            "Visual English slides on film vocabulary",
            "Movie industry vocabulary list"
          ],
          instructions: [
            "Introduce vocabulary categories: genres, production roles, cinema vocabulary",
            "Show examples of each with visual aids",
            "Practice pronunciation and meaning"
          ]
        },
        {
          title: "Interactive Learning",
          duration: "15-20 minutes",
          description: "Play Wordwall games on movie terminology",
          materials: [
            "Devices with internet access",
            "Film genres and movie vocabulary games"
          ],
          instructions: [
            "Students play 'Film Genres Quiz Game' and 'Movie Vocabulary Game'",
            "Review challenging vocabulary as a class",
            "Discuss different types of films"
          ]
        },
        {
          title: "Movie Review Activity",
          duration: "10-15 minutes",
          description: "Students create mini movie reviews",
          instructions: [
            "In pairs, students describe a movie they have seen",
            "They should use the new vocabulary to discuss plot, genre, and opinion",
            "Some pairs present their reviews to the class"
          ]
        }
      ],
      assessmentTips: "Observe students' use of cinema vocabulary. Check understanding of different film genres. Evaluate ability to express opinions about movies using appropriate terminology.",
      homeworkIdeas: [
        "Write a short review of a favorite film using the new vocabulary",
        "Create a movie poster with descriptions using film terminology",
        "Research a famous director or actor and prepare a brief presentation"
      ]
    }
  ];
}

// This is just a sample implementation to satisfy TypeScript imports
// The actual resources are now managed in a centralized manner in book6-resources-common.tsx
export const resources: TeacherResource[] = [];
