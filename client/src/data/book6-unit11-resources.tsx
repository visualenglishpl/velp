/**
 * Resources for Book 6 Unit 11 - Extreme Sports
 */
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans } from './book6-resources-common';

// Base resources for extreme sports unit
const baseResources = generateBook6UnitResources('6', '11');

// Additional extreme sports specific resources
const extremeSportsResources: TeacherResource[] = [
  {
    id: 'book6-unit11-video1',
    bookId: '6',
    unitId: '11',
    title: 'Extreme Sports Vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/xDL7Vz20O28',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xDL7Vz20O28" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit11-video2',
    bookId: '6',
    unitId: '11',
    title: 'Extreme Sports Around the World',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/RBqvyMUleNw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RBqvyMUleNw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit11-game1',
    bookId: '6',
    unitId: '11',
    title: 'Extreme Sports Matching Game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/3ec6a1fb6c374d93a37a24e5edc4bc7a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3ec6a1fb6c374d93a37a24e5edc4bc7a" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit11-game2',
    bookId: '6',
    unitId: '11',
    title: 'Extreme Sports Equipment Quiz',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/a78f83f0de124db39c0242be7cf3f7ae',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a78f83f0de124db39c0242be7cf3f7ae" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// Combine resources
export const book6Unit11Resources: TeacherResource[] = [...baseResources, ...extremeSportsResources];

// Create extreme sports lesson plans
export const extremeSportsLessonPlan: LessonPlan = {
  id: "book6-unit11-extreme-sports-lesson",
  title: "Extreme Sports Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for different extreme sports",
    "Practice describing extreme sports experiences",
    "Develop language to express opinions about risks and adventure"
  ],
  materials: [
    "Visual English Book 6 Unit 11 slides",
    "Extreme sports flashcards",
    "Adventure sports equipment pictures",
    "Risk level rating cards"
  ],
  steps: [
    {
      title: "Warm-up", 
      duration: "5-10 minutes",
      description: "Introduce extreme sports with visual examples",
      instructions: ["Show pictures of different extreme sports", "Ask students if they've tried any of these activities", "Discuss what makes a sport 'extreme'"]
    },
    {
      title: "Vocabulary Presentation",
      duration: "15 minutes",
      description: "Present extreme sports vocabulary",
      materials: ["Visual slides", "Extreme sports flashcards"],
      instructions: ["Introduce key vocabulary for extreme sports", "Demonstrate pronunciation", "Match sports with equipment and locations"]
    },
    {
      title: "Practice Activities",
      duration: "15 minutes",
      description: "Interactive extreme sports games",
      materials: ["Wordwall games", "Matching activities"],
      instructions: ["Play extreme sports matching games", "Complete equipment identification activities", "Discuss safety precautions for each sport"]
    },
    {
      title: "Discussion", 
      duration: "10 minutes",
      description: "Discussing adventure and risk",
      instructions: ["Debate the appeal of extreme sports", "Discuss risk levels and personal boundaries", "Share opinions about which sports students would try"]
    }
  ],
  assessmentTips: "Monitor vocabulary usage. Check for accurate descriptions of sports. Evaluate students' ability to express opinions about risks and adventures.",
  homeworkIdeas: [
    "Write a paragraph about an extreme sport you'd like to try",
    "Create a safety guide for one extreme sport",
    "Research an extreme sport from your country"
  ]
};

export const adventureActivitiesLessonPlan: LessonPlan = {
  id: "book6-unit11-adventure-activities-lesson",
  title: "Adventure Activities and Safety",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for safety equipment and precautions",
    "Practice giving advice about extreme sports safety",
    "Develop language for describing adventures and experiences"
  ],
  materials: [
    "Visual English Book 6 Unit 11 slides",
    "Safety equipment flashcards",
    "Adventure sports scenario cards",
    "Safety instruction leaflet templates"
  ],
  steps: [
    {
      title: "Review", 
      duration: "5 minutes",
      description: "Review extreme sports vocabulary",
      instructions: ["Quick recall of sports from previous lesson", "Elicit key vocabulary", "Introduce safety focus"]
    },
    {
      title: "Safety Equipment",
      duration: "15 minutes",
      description: "Present safety equipment vocabulary",
      materials: ["Safety equipment images", "Sport-equipment matching cards"],
      instructions: ["Introduce safety equipment for different sports", "Match safety gear to appropriate activities", "Discuss why each item is important"]
    },
    {
      title: "Safety Advice Activity",
      duration: "15 minutes",
      description: "Practice giving safety advice",
      materials: ["Scenario cards", "Modal verb prompts"],
      instructions: ["Students read scenario cards about extreme sports situations", "Groups prepare safety advice using modal verbs", "Present advice to the class"]
    },
    {
      title: "Creating Safety Guides", 
      duration: "10 minutes",
      description: "Collaborative safety guide creation",
      materials: ["Safety guide templates", "Example brochures"],
      instructions: ["In groups, create a simple safety guide for one extreme sport", "Include equipment, precautions, and training needed", "Share guides with the class"]
    }
  ],
  assessmentTips: "Check appropriate use of modal verbs for advice. Monitor safety vocabulary usage. Evaluate completeness of safety guides.",
  homeworkIdeas: [
    "Complete your extreme sport safety guide",
    "Create a poster about an extreme sport and its safety requirements",
    "Write a dialogue between an instructor and a beginner trying an extreme sport"
  ]
};

// Create lesson plan array
export const book6Unit11LessonPlans: LessonPlan[] = [
  extremeSportsLessonPlan,
  adventureActivitiesLessonPlan
];

// Get resources function
export function getBook6Unit11Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit11Resources;
}

// Get lesson plans function
export function getBook6Unit11LessonPlans(): LessonPlan[] {
  return book6Unit11LessonPlans;
}
