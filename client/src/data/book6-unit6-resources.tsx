// Resources for Book 6, Unit 6 - In the Kitchen

import { LessonPlan } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const kitchenUtensilsLessonPlan: LessonPlan = {
  id: 'book6-unit6-kitchen-utensils',
  title: 'Kitchen Utensils and Tools',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Identify and name common kitchen utensils and tools',
    'Describe the uses of different kitchen implements',
    'Practice asking and answering questions about kitchen items'
  ],
  materials: [
    'Visual English Book 6, Unit 6',
    'Digital projector or interactive whiteboard',
    'Kitchen utensil flashcards or real items',
    'Handout with kitchen vocabulary exercises',
    'Pictures of kitchen scenes'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about kitchens and cooking',
      instructions: [
        'Show students pictures of different kitchens',
        'Ask students about items they recognize in the kitchen',
        'Have students share what they or their family members cook at home'
      ]
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Introduce key kitchen vocabulary using Visual English materials',
      instructions: [
        'Present the vocabulary from Book 6, Unit 6 using the Visual English slides',
        'Group vocabulary by function: cutting tools, cooking containers, measuring tools, etc.',
        'Model correct pronunciation and have students repeat',
        'Demonstrate or mime the use of each utensil'
      ]
    },
    {
      title: 'Matching Activity',
      duration: '10 minutes',
      description: 'Students match kitchen utensils with their uses',
      instructions: [
        'Divide students into pairs',
        'Distribute matching worksheets with kitchen items and their functions',
        'Have students match the items to their uses',
        'Review answers as a class and address any misconceptions'
      ]
    },
    {
      title: 'Recipe Role-play',
      duration: '15 minutes',
      description: 'Students practice kitchen vocabulary in context',
      instructions: [
        'Divide students into small groups',
        'Give each group a simple recipe card with highlighted utensils',
        'Students role-play preparing the recipe, mentioning each utensil as they use it',
        'Groups present their role-plays to the class'
      ]
    }
  ],
  assessmentTips: 'Assess students\' vocabulary retention through their ability to correctly name and demonstrate the use of kitchen utensils. Observe their communication during the role-play activity to evaluate contextual use of vocabulary.',
  homeworkIdeas: [
    'Create a labeled diagram of a kitchen with at least 10 utensils',
    'Write instructions for a simple recipe, highlighting kitchen tools needed',
    'Complete vocabulary matching exercises in the workbook'
  ],
  additionalResources: [
    {
      title: 'Kitchen Utensils Wordwall Game',
      url: 'https://wordwall.net/embed/5eedd77a9110462a9111a38f2f52fda5'
    },
    {
      title: 'Cooking Methods Wordwall Game',
      url: 'https://wordwall.net/embed/ecb2dd96232d4c4e9f9103f738de561c'
    }
  ]
};

export const cookingMethodsLessonPlan: LessonPlan = {
  id: 'book6-unit6-cooking-methods',
  title: 'Cooking Methods and Instructions',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn and use vocabulary related to cooking methods',
    'Follow and give instructions using imperative forms',
    'Sequence cooking steps using time markers and sequence words'
  ],
  materials: [
    'Visual English Book 6, Unit 6',
    'Digital projector or interactive whiteboard',
    'Simple recipe cards',
    'Cooking verbs flashcards',
    'Sequence words cards (first, then, next, finally)'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Review kitchen vocabulary and introduce cooking methods',
      instructions: [
        'Show pictures of different cooking methods (frying, boiling, baking, etc.)',
        'Ask students to name the cooking methods they recognize',
        'Have students share which cooking methods they use at home'
      ]
    },
    {
      title: 'Cooking Verbs',
      duration: '15 minutes',
      description: 'Teach key cooking verbs and practice imperative forms',
      instructions: [
        'Present cooking verbs using flashcards and demonstrations',
        'Practice imperative forms for giving cooking instructions',
        'Have students repeat instructions like "Chop the onions" or "Stir the sauce"',
        'Highlight the difference between similar cooking methods (e.g., fry vs. sauté)'
      ]
    },
    {
      title: 'Sequencing Activity',
      duration: '10 minutes',
      description: 'Practice sequencing cooking instructions',
      instructions: [
        'Distribute cards with scrambled recipe steps',
        'In pairs, students arrange the steps in logical order',
        'Have students add appropriate sequence words (first, then, next, finally)',
        'Check answers as a class'
      ]
    },
    {
      title: 'Recipe Creation',
      duration: '15 minutes',
      description: 'Apply cooking vocabulary and sequencing in a creative task',
      instructions: [
        'Divide class into small groups',
        'Each group creates a simple recipe using at least 5 cooking verbs',
        'Students must use sequence words and imperative forms',
        'Groups present their recipes to the class, miming the actions'
      ]
    }
  ],
  assessmentTips: 'Evaluate students\' understanding of cooking methods through their recipe creations. Note their use of imperative forms and sequence words. Check for proper pronunciation of cooking verbs during presentations.',
  homeworkIdeas: [
    'Write instructions for their favorite recipe',
    'Create a cooking video script with clear sequence words',
    'Research traditional cooking methods from different cultures'
  ],
  additionalResources: [
    {
      title: 'Cooking Methods Wordwall Game',
      url: 'https://wordwall.net/embed/c12666ce8e1640e299be713f24762d8c'
    },
    {
      title: 'Kitchen Utensils Video',
      url: 'https://www.youtube.com/embed/6BIFnvjpquk'
    }
  ]
};

// Book 6, Unit 6 (In the Kitchen) Resources
export const book6Unit6Resources = [
  {
    title: "Kahoot: In The Kitchen",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/in-the-kitchen/b683184e-f723-4784-a02a-d51e3678c3af"
  },
  {
    title: "Kitchen Utensils Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5eedd77a9110462a9111a38f2f52fda5",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5eedd77a9110462a9111a38f2f52fda5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kitchen Utensils Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/8080784ba2f2495287e30b926bf38bcb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8080784ba2f2495287e30b926bf38bcb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Cooking Methods Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/ecb2dd96232d4c4e9f9103f738de561c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ecb2dd96232d4c4e9f9103f738de561c?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Cooking Methods Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/c12666ce8e1640e299be713f24762d8c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c12666ce8e1640e299be713f24762d8c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kitchen Utensils Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=6BIFnvjpquk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6BIFnvjpquk?si=31dsztCC97dUIu18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Kitchen Utensils Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: kitchenUtensilsLessonPlan
  },
  {
    title: "Cooking Methods Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: cookingMethodsLessonPlan
  }
];
