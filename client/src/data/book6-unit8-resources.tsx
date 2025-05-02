import { TeacherResource } from '@/components/TeacherResources';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Baking & Cooking - Unit 8 Resources
export const book6Unit8Resources: TeacherResource[] = generateBook6UnitResources('6', '8');

// Create the implementation function to expose the resources
export function getBook6Unit8Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit8Resources;
}

// Unit 8 specific lesson plans
export const bakingLessonPlan = {
  id: "book6-unit8-baking-lesson",
  title: "Baking Vocabulary and Skills",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to baking and cooking",
    "Understand recipe instructions",
    "Practice describing baking processes"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Kitchen vocabulary flashcards",
    "Simple recipe cards"
  ],
  steps: [
    {
      title: "Introduction", 
      duration: "5-10 minutes",
      description: "Show baking video",
      instructions: ["Play the unit baking video", "Discuss baking experiences", "Introduce key vocabulary"]
    },
    {
      title: "Vocabulary Presentation",
      duration: "15 minutes",
      description: "Present baking terms with illustrations",
      materials: ["Baking vocabulary cards", "Visual aids"],
      instructions: ["Present 10-12 baking terms", "Model pronunciation", "Connect terms to visual examples"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Use Wordwall games to reinforce vocabulary",
      materials: ["Baking Wordwall game"],
      instructions: ["Demonstrate game instructions", "Have students play in pairs", "Monitor and assist"]
    },
    {
      title: "Activity", 
      duration: "10 minutes",
      description: "Sequence recipe instructions",
      materials: ["Recipe instruction cards"],
      instructions: ["Distribute jumbled recipe instructions", "Have students arrange in correct order", "Check sequence as a class"]
    }
  ],
  assessmentTips: "Evaluate vocabulary recognition through matching activities. Assess sequencing ability with recipe instructions. Check pronunciation during role-play activities.",
  homeworkIdeas: [
    "Create a simple recipe booklet",
    "Research traditional baked goods from different cultures",
    "If possible, follow a simple recipe and document the process"
  ]
};

export const cookingToolsLessonPlan = {
  id: "book6-unit8-cooking-tools-lesson",
  title: "Kitchen Equipment and Cooking Methods",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Identify common kitchen tools and appliances",
    "Learn vocabulary for cooking methods",
    "Practice giving cooking instructions"
  ],
  materials: [
    "Visual English Book 6 Unit 8 slides",
    "Kitchen utensils flashcards",
    "Cooking method demonstration videos"
  ],
  steps: [
    {
      title: "Warm-up",
      duration: "10 minutes",
      description: "Kitchen tool guessing game",
      instructions: ["Show partial images of kitchen tools", "Have students guess the items", "Introduce vocabulary as items are revealed"]
    },
    {
      title: "Vocabulary",
      duration: "15 minutes",
      description: "Present cooking equipment with pictures",
      materials: ["Kitchen tools flashcards", "Real kitchen tools (if available)"],
      instructions: ["Present each tool with name and function", "Demonstrate or mime how each is used", "Have students repeat names and functions"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Kitchen tools Wordwall game",
      materials: ["Kitchen Utensils Wordwall game"],
      instructions: ["Guide students to the online game", "Allow practice time in pairs or small groups", "Review difficult items together"]
    },
    {
      title: "Activity",
      duration: "15 minutes",
      description: "Create cooking instructions using new vocabulary",
      materials: ["Recipe template worksheets"],
      instructions: ["Distribute recipe templates", "Have students create simple instructions using target vocabulary", "Share with partners"]
    }
  ],
  assessmentTips: "Check kitchen tools identification accuracy. Evaluate proper use of vocabulary in written instructions. Assess pronunciation during oral presentations.",
  homeworkIdeas: [
    "Design your dream kitchen with labeled equipment",
    "Compare cooking methods across different cuisines",
    "Create a how-to guide for using a kitchen appliance"
  ]
};

export const book6Unit8LessonPlans = [
  bakingLessonPlan,
  cookingToolsLessonPlan
];

export function getBook6Unit8LessonPlans() {
  return book6Unit8LessonPlans;
}
