/**
 * Resources for Book 6 Unit 12 - Are You Eco? Environment
 */
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

// This is now handled in the implementation file directly
export const book6Unit12Resources: TeacherResource[] = [];

// Export the environmental lesson plan
export const environmentalIssuesLessonPlan: LessonPlan = {
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
};

// Export the sustainability lesson plan
export const sustainabilityLessonPlan: LessonPlan = {
  id: "book6-unit12-sustainability-lesson",
  title: "Sustainability and Eco-Friendly Practices",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to sustainability",
    "Understand concepts of reducing, reusing, and recycling",
    "Develop awareness of eco-friendly alternatives"
  ],
  materials: [
    "Visual English Book 6 Unit 12 slides",
    "Sustainability vocabulary cards",
    "Recycled materials for demonstration"
  ],
  steps: [
    {
      title: "Introduction",
      duration: "10 minutes",
      description: "Introduce concept of sustainability",
      instructions: [
        "Define sustainability with visual aids",
        "Discuss everyday sustainability challenges"
      ]
    },
    {
      title: "Vocabulary Focus",
      duration: "15 minutes",
      description: "Present sustainability terminology",
      instructions: [
        "Teach vocabulary: renewable, sustainable, biodegradable, eco-friendly",
        "Show examples of sustainable vs unsustainable practices"
      ]
    },
    {
      title: "The 3Rs Activity",
      duration: "15 minutes",
      description: "Explore reducing, reusing, and recycling",
      instructions: [
        "Explain the hierarchy of the 3Rs",
        "Sort items into reduce, reuse, or recycle categories"
      ]
    },
    {
      title: "Problem-Solving",
      duration: "15 minutes",
      description: "Develop solutions to environmental problems",
      instructions: [
        "Present real-world environmental challenges",
        "In groups, develop possible solutions",
        "Present ideas to the class"
      ]
    }
  ],
  assessmentTips: "Monitor student understanding through group discussions. Evaluate proposed solutions for creativity and practicality.",
  homeworkIdeas: [
    "Conduct a sustainability audit of your home",
    "Create a 7-day plan to reduce personal waste",
    "Research sustainable alternatives to everyday products"
  ]
};
