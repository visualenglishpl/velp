// Implementation file for Book 6, Unit 11 - Transportation And Travel

import { LessonPlan } from '@/components/LessonPlanTemplate';
import { TeacherResource } from '@/components/TeacherResources';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Unit 11 specific transport and travel resources
export const book6Unit11Resources: TeacherResource[] = generateBook6UnitResources('6', '11');

// Unit 11 lesson plans
export const transportationLessonPlan: LessonPlan = {
  id: "book6-unit11-transportation-lesson",
  title: "Transportation and Travel Vocabulary",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to transportation",
    "Discuss different modes of travel",
    "Compare transportation options"
  ],
  materials: [
    "Visual English Book 6 Unit 11 slides",
    "Transportation flashcards",
    "Travel brochures or images"
  ],
  steps: [
    {
      title: "Warm-up",
      duration: "10 minutes",
      description: "Get students thinking about transportation",
      instructions: [
        "Ask students about their preferred methods of transportation",
        "Discuss recent travel experiences"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "15 minutes",
      description: "Introduce key transportation vocabulary",
      instructions: [
        "Present transportation vocabulary using slides",
        "Practice pronunciation of new terms"
      ]
    },
    {
      title: "Guided Practice",
      duration: "15 minutes",
      description: "Apply vocabulary in structured activities",
      instructions: [
        "Pair work: Discussing advantages/disadvantages of different transport methods",
        "Role play: Planning a trip using public transportation"
      ]
    },
    {
      title: "Independent Practice",
      duration: "10 minutes",
      description: "Individual application of concepts",
      instructions: [
        "Complete exercises on transportation vocabulary",
        "Create a travel itinerary using multiple forms of transportation"
      ]
    },
    {
      title: "Assessment",
      duration: "10 minutes",
      description: "Check understanding of transportation vocabulary",
      instructions: [
        "Quiz on transportation vocabulary",
        "Present travel plans to the class"
      ]
    }
  ]
};

export const travelExperiencesLessonPlan: LessonPlan = {
  id: "book6-unit11-travel-experiences-lesson",
  title: "Discussing Travel Experiences",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Practice using past tense to describe travel experiences",
    "Learn vocabulary for describing destinations",
    "Develop conversation skills about travel topics"
  ],
  materials: [
    "Visual English Book 6 Unit 11 slides",
    "World map or travel posters",
    "Travel experience worksheet"
  ],
  steps: [
    {
      title: "Warm-up",
      duration: "10 minutes",
      description: "Activate prior knowledge about travel destinations",
      instructions: [
        "Show images of famous destinations and have students identify them",
        "Discuss places students have visited or would like to visit"
      ]
    },
    {
      title: "Vocabulary Building",
      duration: "10 minutes",
      description: "Learn vocabulary for describing travel destinations",
      instructions: [
        "Introduce travel-related vocabulary",
        "Practice describing destinations using adjectives"
      ]
    },
    {
      title: "Grammar Focus",
      duration: "15 minutes",
      description: "Practice past tense for describing travel experiences",
      instructions: [
        "Review past tense for describing travel experiences",
        "Practice forming questions about past travel"
      ]
    },
    {
      title: "Speaking Activity",
      duration: "15 minutes",
      description: "Apply vocabulary and grammar in conversation",
      instructions: [
        "Interview a partner about their travel experiences",
        "Share the most interesting travel story with the class"
      ]
    },
    {
      title: "Writing Activity",
      duration: "10 minutes",
      description: "Create a written product using learned vocabulary and structures",
      instructions: [
        "Write a short paragraph about a memorable journey",
        "Create a postcard from an imaginary trip"
      ]
    }
  ]
};

// Combined lesson plans for Unit 11
export const book6Unit11LessonPlans: LessonPlan[] = [
  transportationLessonPlan,
  travelExperiencesLessonPlan
];

// Function to get resources for this unit
export function getBook6Unit11Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit11Resources;
}

// Function to get lesson plans for this unit
export function getBook6Unit11LessonPlans(): LessonPlan[] {
  return book6Unit11LessonPlans;
}
