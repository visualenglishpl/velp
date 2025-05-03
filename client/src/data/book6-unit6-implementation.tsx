// This file contains implementation details for Book 6, Unit 6 (In the Kitchen)

import { LessonPlan } from "@/components/LessonPlanTemplate";
import { book6Unit6Resources } from "./book6-unit6-resources";

// Define lesson plans directly in the implementation file
const kitchenVocabularyLessonPlan: LessonPlan = {
  id: 'book6-unit6-kitchen-vocabulary-lesson',
  title: 'Kitchen Vocabulary',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to kitchen items and appliances',
    'Practice using prepositions to describe kitchen layouts',
    'Develop speaking skills discussing kitchen arrangements'
  ],
  materials: [
    'Visual English Book 6 Unit 6 slides',
    'Kitchen item flashcards',
    'Kitchen layout diagrams'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5-10 minutes',
      description: 'Introduce kitchen vocabulary with visual aids',
      instructions: ['Show images of kitchen items', 'Ask students to name items they recognize', 'Build initial vocabulary list']
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Present key kitchen vocabulary',
      materials: ['Kitchen flashcards', 'Visual English slides'],
      instructions: ['Present kitchen item vocabulary', 'Categorize items by function', 'Have students repeat and practice pronunciation']
    },
    {
      title: 'Practice Activities',
      duration: '15 minutes',
      description: 'Interactive kitchen vocabulary games',
      materials: ['Wordwall games', 'Kitchen vocabulary worksheets'],
      instructions: ['Match kitchen items with their uses', 'Complete vocabulary games', 'Practice prepositions to describe kitchen layouts']
    },
    {
      title: 'Production',
      duration: '10-15 minutes',
      description: 'Kitchen design activity',
      instructions: ['Students describe their ideal kitchen layout', 'Identify where items would be placed', 'Present their design to a partner']
    }
  ],
  assessmentTips: 'Monitor accurate use of kitchen vocabulary. Check comprehension of item functions. Evaluate use of prepositions in kitchen descriptions.',
  homeworkIdeas: [
    'Create a labeled diagram of a kitchen',
    'Write a short description of their home kitchen',
    'Research kitchen tools from different cultures'
  ]
};

const cookingVerbsLessonPlan: LessonPlan = {
  id: 'book6-unit6-cooking-verbs-lesson',
  title: 'Cooking Verbs and Actions',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary for common cooking actions and verbs',
    'Practice giving and following cooking instructions',
    'Develop speaking skills through recipe discussions'
  ],
  materials: [
    'Visual English Book 6 Unit 6 slides',
    'Cooking verb flashcards',
    'Simple recipe cards'
  ],
  steps: [
    {
      title: 'Review',
      duration: '5 minutes',
      description: 'Quick review of kitchen vocabulary',
      instructions: ['Review kitchen items from previous lesson', 'Connect items to cooking actions']
    },
    {
      title: 'Cooking Verbs',
      duration: '15 minutes',
      description: 'Present vocabulary for cooking actions',
      materials: ['Cooking verb flashcards', 'Visual English slides'],
      instructions: ['Present key cooking verbs', 'Demonstrate actions when possible', 'Have students match verbs to kitchen tools']
    },
    {
      title: 'Recipe Activity',
      duration: '15 minutes',
      description: 'Follow simple recipes',
      materials: ['Recipe cards', 'Sequencing worksheet'],
      instructions: ['Examine simple recipe instructions', 'Put cooking steps in correct order', 'Practice giving cooking instructions in pairs']
    },
    {
      title: 'Recipe Creation',
      duration: '10 minutes',
      description: 'Create a simple recipe',
      instructions: ['Students create instructions for a simple dish', 'Incorporate at least 5 cooking verbs', 'Share recipes with the class']
    }
  ],
  assessmentTips: 'Evaluate correct use of cooking verbs. Check sequencing of recipe steps. Monitor clarity of cooking instructions during presentations.',
  homeworkIdeas: [
    'Write instructions for a favorite family recipe',
    'Create a cooking verb dictionary with illustrations',
    'Watch a cooking video and list the cooking verbs used'
  ]
};

// Function to get the lesson plans for the unit
export function getBook6Unit6LessonPlans(): LessonPlan[] {
  // Return the two 45-minute lesson plans for this unit
  return [
    kitchenVocabularyLessonPlan,
    cookingVerbsLessonPlan
  ];
}

// Function to get additional resources for the unit
export function getBook6Unit6Resources() {
  // Return resources with proper typing for TeacherResource
  return book6Unit6Resources.map(resource => ({
    ...resource,
    id: `book6-unit6-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
    bookId: '6',
    unitId: '6'
  }));
}
