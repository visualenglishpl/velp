/**
 * Resources for Book 6 Unit 14 - Are You a Survivor?
 */
import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';
import { generateBook6UnitResources } from './book6-resources-common';

// Export the resource generator for this unit
export const generateBook6Unit14Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return book6Unit14Resources;
};

// Base resources for survival unit
const baseResources = generateBook6UnitResources('6', '14');

// Additional survival specific resources
const survivalResources: TeacherResource[] = [
  {
    id: 'book6-unit14-video1',
    bookId: '6',
    unitId: '14',
    title: 'Survival Skills Vocabulary',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/5oJsPQNV_kc',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5oJsPQNV_kc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit14-video2',
    bookId: '6',
    unitId: '14',
    title: 'Basic Survival Tips',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/mbiLtYtBZkw',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mbiLtYtBZkw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit14-game1',
    bookId: '6',
    unitId: '14',
    title: 'Survival Vocabulary Game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/c2cdb3b10f8e4ba59b9eca81a345a39a',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c2cdb3b10f8e4ba59b9eca81a345a39a" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: 'book6-unit14-game2',
    bookId: '6',
    unitId: '14',
    title: 'Survival Skills Quiz',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8fb986bcdf7241e8a89b23a8d5fa9104',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8fb986bcdf7241e8a89b23a8d5fa9104" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// Combine resources
export const book6Unit14Resources: TeacherResource[] = [...baseResources, ...survivalResources];

// Create survival lesson plans
export const survivalVocabularyLessonPlan: LessonPlan = {
  id: "book6-unit14-survival-vocabulary-lesson",
  title: "Survival Skills Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for survival skills and equipment",
    "Practice describing survival situations",
    "Develop language to discuss emergency preparedness"
  ],
  materials: [
    "Visual English Book 6 Unit 14 slides",
    "Survival equipment flashcards",
    "Emergency scenario cards"
  ],
  steps: [
    {
      title: "Warm-up", 
      duration: "5-10 minutes",
      description: "Introduce survival scenarios",
      instructions: ["Show pictures of different survival situations", "Ask students what they would do in each situation", "Introduce the concept of survival skills"]
    },
    {
      title: "Vocabulary Presentation",
      duration: "15 minutes",
      description: "Present survival vocabulary",
      materials: ["Visual slides", "Survival equipment flashcards"],
      instructions: ["Introduce key vocabulary for survival items and skills", "Demonstrate pronunciation", "Explain the purpose of each survival item"]
    },
    {
      title: "Practice Activities",
      duration: "15 minutes",
      description: "Interactive survival games",
      materials: ["Wordwall games", "Survival item matching activities"],
      instructions: ["Play survival vocabulary matching games", "Complete survival skills identification activities", "Discuss which skills are most important"]
    },
    {
      title: "Discussion", 
      duration: "10 minutes",
      description: "Discussing survival priorities",
      instructions: ["Present the survival rule of three (3 minutes without air, 3 hours without shelter, 3 days without water, 3 weeks without food)", "Discuss survival priorities", "Have students rank survival items in order of importance"]
    }
  ],
  assessmentTips: "Monitor vocabulary usage. Check for accurate descriptions of survival items and their uses. Evaluate students' ability to explain survival priorities.",
  homeworkIdeas: [
    "Create a basic survival kit list for your area",
    "Write a paragraph about a survival situation and how to handle it",
    "Research a survival story and prepare to share it with the class"
  ]
};

export const wildernessSkillsLessonPlan: LessonPlan = {
  id: "book6-unit14-wilderness-skills-lesson",
  title: "Wilderness Survival Skills",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for wilderness survival",
    "Practice giving instructions for survival techniques",
    "Develop language for describing problem-solving in nature"
  ],
  materials: [
    "Visual English Book 6 Unit 14 slides",
    "Wilderness survival technique cards",
    "Nature hazard flashcards",
    "Survival instruction worksheet templates"
  ],
  steps: [
    {
      title: "Review", 
      duration: "5 minutes",
      description: "Review survival basics",
      instructions: ["Quick recall of survival items from previous lesson", "Elicit key vocabulary", "Introduce wilderness focus"]
    },
    {
      title: "Wilderness Challenges",
      duration: "15 minutes",
      description: "Present wilderness survival challenges",
      materials: ["Nature hazard flashcards", "Wilderness images"],
      instructions: ["Introduce common wilderness challenges", "Present vocabulary for natural hazards", "Discuss how to avoid dangerous situations"]
    },
    {
      title: "Survival Techniques Activity",
      duration: "15 minutes",
      description: "Practice giving survival instructions",
      materials: ["Technique cards", "Imperative verb prompts"],
      instructions: ["Students read technique cards about wilderness survival skills", "Groups prepare step-by-step instructions using imperative verbs", "Present instructions to the class"]
    },
    {
      title: "Creating Survival Guides", 
      duration: "10 minutes",
      description: "Collaborative survival guide creation",
      materials: ["Guide templates", "Example wilderness survival pamphlets"],
      instructions: ["In groups, create a simple wilderness survival guide", "Include safety tips, equipment needed, and emergency procedures", "Share guides with the class"]
    }
  ],
  assessmentTips: "Check appropriate use of imperative verbs for instructions. Monitor natural hazard vocabulary usage. Evaluate completeness of survival guides.",
  homeworkIdeas: [
    "Complete your wilderness survival guide",
    "Create a poster about wilderness safety",
    "Write a dialogue between an experienced survivor teaching a novice"
  ]
};

// Create lesson plan array
export const book6Unit14LessonPlans: LessonPlan[] = [
  survivalVocabularyLessonPlan,
  wildernessSkillsLessonPlan
];

// Get resources function
export function getBook6Unit14Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit14Resources;
}

// Get lesson plans function
export function getBook6Unit14LessonPlans(): LessonPlan[] {
  return book6Unit14LessonPlans;
}
