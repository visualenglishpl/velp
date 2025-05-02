import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Are You Tech Savvy - Unit 10 Resources

// Base resources generated from common module
const baseResources = generateBook6UnitResources('6', '10');

// Additional specific resources from the document
const additionalResources: TeacherResource[] = [
  {
    id: "book6-unit10-game3",
    bookId: '6',
    unitId: '10',
    title: "Technology Gadgets Game 1",
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: "https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/023ea996683742539d4e330a7ec8f9ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book6-unit10-game4",
    bookId: '6',
    unitId: '10',
    title: "Technology Gadgets Game 2",
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: "https://wordwall.net/resource/589446a1c2674dcc964dc2115c3c119f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/589446a1c2674dcc964dc2115c3c119f?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combine base resources with additional specific resources
export const book6Unit10Resources = [...baseResources, ...additionalResources];

// Create the implementation function to expose the resources
export function getBook6Unit10Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit10Resources;
}

// Unit 10 specific lesson plans
export const technologyVocabularyLessonPlan = {
  id: "book6-unit10-tech-vocabulary-lesson",
  title: "Technology Vocabulary Development",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Learn key vocabulary related to modern technology",
    "Practice describing technology devices and their functions",
    "Develop confidence in discussing technology in English"
  ],
  materials: [
    "Visual English Book 6 Unit 10 slides",
    "Technology Gadgets Wordwall games",
    "Pictures of various modern devices"
  ],
  steps: [
    {
      title: "Warm-up", 
      duration: "10 minutes",
      description: "Introduce technology vocabulary through visual aids",
      instructions: ["Show pictures of various technology devices", "Ask students to name any devices they recognize", "Create a mind map of technology categories on the board"]
    },
    {
      title: "Vocabulary Presentation",
      duration: "15 minutes",
      description: "Present key technology vocabulary and functions",
      materials: ["Visual examples", "Vocabulary handout"],
      instructions: ["Present devices, parts and functions vocabulary", "Model pronunciation of technical terms", "Explain basic functions of each technology"]
    },
    {
      title: "Practice",
      duration: "15 minutes",
      description: "Interactive practice with technology vocabulary",
      materials: ["Technology Gadgets Wordwall games"],
      instructions: ["Use interactive games to practice identifying devices", "Have students match devices with their functions", "Monitor for proper terminology use"]
    },
    {
      title: "Activity", 
      duration: "15 minutes",
      description: "Technology explanation speaking activity",
      materials: ["Technology device cards"],
      instructions: ["Assign students devices to explain", "Have them describe what the device is used for", "Encourage use of target vocabulary in explanations"]
    }
  ],
  assessmentTips: "Evaluate accurate use of technology vocabulary. Listen for proper terminology and function descriptions. Check ability to identify devices and explain their purposes.",
  homeworkIdeas: [
    "Create a technology vocabulary notebook with illustrations",
    "Write instructions for how to use a specific technology device",
    "Prepare a short presentation about your favorite gadget"
  ]
};

export const digitalLiteracyLessonPlan = {
  id: "book6-unit10-digital-literacy-lesson",
  title: "Digital Literacy: Being Tech Savvy",
  duration: "45-60 minutes",
  level: "Intermediate",
  objectives: [
    "Discuss what it means to be 'tech savvy'",
    "Learn phrases to describe technology skills",
    "Practice discussing technology capabilities"
  ],
  materials: [
    "Visual English Book 6 Unit 10 slides",
    "Tech survey handout",
    "Digital literacy checklist"
  ],
  steps: [
    {
      title: "Introduction",
      duration: "10 minutes",
      description: "Explore the concept of being 'tech savvy'",
      instructions: ["Discuss what 'tech savvy' means", "Have students rate their own tech skills", "Brainstorm common technology tasks"]
    },
    {
      title: "Language Focus",
      duration: "15 minutes",
      description: "Introduce useful expressions for technology skills",
      materials: ["Expressions handout", "Example conversations"],
      instructions: ["Present useful phrases like 'I can...', 'I know how to...'", "Demonstrate asking about tech abilities", "Model conversations about technology skills"]
    },
    {
      title: "Survey Activity",
      duration: "15 minutes",
      description: "Technology skills survey",
      materials: ["Survey worksheets"],
      instructions: ["Students interview classmates about tech abilities", "Complete the tech survey form", "Identify the most and least common tech skills"]
    },
    {
      title: "Discussion",
      duration: "10 minutes",
      description: "Discuss advantages of being tech savvy",
      instructions: ["Group discussion about technology's importance", "Share ideas about essential tech skills for today", "Talk about how to improve digital literacy"]
    }
  ],
  assessmentTips: "Observe students' ability to discuss technology confidently. Check use of target expressions. Evaluate survey completion accuracy and presentation of findings.",
  homeworkIdeas: [
    "Complete a self-assessment of your technology skills",
    "Write about a technology skill you want to learn",
    "Research and write about a new technology trend"
  ]
};

export const book6Unit10LessonPlans = [
  technologyVocabularyLessonPlan,
  digitalLiteracyLessonPlan
];

export function getBook6Unit10LessonPlans(): LessonPlan[] {
  return book6Unit10LessonPlans;
}
