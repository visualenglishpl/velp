// This file contains resources for Book 6, Unit 6 (In the Kitchen themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit6Resources = [
  {
    title: "Kitchen Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/2a3df8dade174b7daa1a03df20a5f06a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2a3df8dade174b7daa1a03df20a5f06a?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kitchen Appliances Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/3c86b8f6b92745b1aef9551a65d4a273",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3c86b8f6b92745b1aef9551a65d4a273?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Cooking Verbs Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/XemfrXbBb6Q",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XemfrXbBb6Q?si=DrM9Cm4Y1XKeFqUa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Kitchen Safety Quiz",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f18d924c2c0a47ffa69fcd22b4b5d17e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f18d924c2c0a47ffa69fcd22b4b5d17e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Kitchen Vocabulary
export const kitchenVocabularyLessonPlan = {
  id: "kitchen-vocabulary-lesson",
  title: "Kitchen Vocabulary and Equipment",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to kitchen items and appliances",
    "Practice describing kitchen equipment and their uses",
    "Develop language for following recipes and cooking instructions",
    "Build speaking skills through kitchen-themed conversations"
  ],
  materials: [
    "Visual English Book 6, Unit 6 slides",
    "Kitchen Vocabulary Game",
    "Kitchen Appliances Matching Game",
    "Kitchen equipment flashcards",
    "Recipe handouts"
  ],
  steps: [
    {
      title: "Warm-up: Kitchen Experience",
      duration: "5 minutes",
      description: "Activate prior knowledge about kitchen experiences",
      instructions: [
        "Ask students: 'Do you cook at home? What do you like to cook?'",
        "Create a mind map on the board with students' favorite dishes",
        "Briefly discuss what equipment is needed to make those dishes",
        "Ask about students' favorite kitchen gadgets or appliances"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to kitchen equipment",
      materials: ["Visual English Book 6, Unit 6 slides", "Kitchen equipment flashcards"],
      instructions: [
        "Introduce kitchen item vocabulary: pot, pan, blender, oven, microwave, etc.",
        "Present kitchen utensil vocabulary: knife, spoon, spatula, whisk, etc.",
        "Teach related adjectives: sharp, hot, cold, clean, dirty, etc.",
        "Show kitchen equipment flashcards and have students identify the items",
        "Practice pronunciation paying attention to word stress"
      ]
    },
    {
      title: "Interactive Games: Kitchen Vocabulary",
      duration: "10 minutes",
      description: "Reinforce vocabulary through digital games",
      materials: ["Kitchen Vocabulary Game", "Kitchen Appliances Matching Game"],
      instructions: [
        "Have students play the Kitchen Vocabulary Game",
        "Continue with the Kitchen Appliances Matching Game",
        "Review any challenging vocabulary items",
        "Ask students to categorize items into groups (cooking, cleaning, storing, etc.)"
      ]
    },
    {
      title: "Equipment Description Activity",
      duration: "10 minutes",
      description: "Practice describing kitchen equipment and their uses",
      materials: ["Kitchen equipment flashcards"],
      instructions: [
        "Divide students into pairs",
        "Give each pair several kitchen equipment flashcards",
        "Student A describes the item and its use without naming it",
        "Student B guesses which kitchen item is being described",
        "Encourage use of descriptive language and specific vocabulary",
        "Provide sentence starters: 'This is used for...', 'You need this when...', etc.",
        "Pairs switch roles and continue with new cards"
      ]
    },
    {
      title: "Recipe Instructions Practice",
      duration: "10 minutes",
      description: "Practice following and giving cooking instructions",
      materials: ["Recipe handouts"],
      instructions: [
        "Distribute simple recipe handouts to small groups",
        "Each group reads their recipe and identifies all kitchen equipment needed",
        "Groups then take turns explaining how to make their dish",
        "Focus on sequence words (first, then, next, finally) and imperatives",
        "Other students can ask questions about the process",
        "Discuss which recipes sound most interesting or delicious"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their appropriate use of kitchen vocabulary, ability to describe kitchen equipment in detail, and participation in the recipe instructions activity.",
  homeworkIdeas: [
    "Write a paragraph describing your kitchen at home", 
    "Create a recipe for your favorite dish including all equipment needed",
    "Draw and label five kitchen items you use regularly"
  ],
  additionalResources: [
    {
      title: "ESL Kitchen Vocabulary Activities",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/kitchen"
    }
  ]
};

// Second lesson plan for Unit 6: Cooking Verbs and Kitchen Safety
export const cookingVerbsLessonPlan = {
  id: "cooking-verbs-lesson",
  title: "Cooking Verbs and Kitchen Safety",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to cooking verbs and actions",
    "Practice giving and following cooking instructions",
    "Develop language for kitchen safety rules",
    "Build confidence in describing cooking processes"
  ],
  materials: [
    "Visual English Book 6, Unit 6 slides",
    "Cooking Verbs Video",
    "Kitchen Safety Quiz",
    "Action cards with cooking verbs",
    "Kitchen safety posters"
  ],
  steps: [
    {
      title: "Warm-up: Cooking Show",
      duration: "5 minutes",
      description: "Engage students with cooking demonstrations",
      instructions: [
        "Ask students: 'Do you watch cooking shows? What actions do chefs perform?'",
        "Mime some cooking actions and have students guess the verbs",
        "List cooking verbs on the board as students identify them",
        "Briefly discuss favorite cooking shows or famous chefs"
      ]
    },
    {
      title: "Cooking Verbs Video",
      duration: "10 minutes",
      description: "Learn common cooking verbs through video",
      materials: ["Cooking Verbs Video"],
      instructions: [
        "Play the Cooking Verbs Video",
        "Ask students to note any new cooking verbs they hear",
        "After watching, create a comprehensive list of cooking verbs",
        "Group verbs by cooking method (heat-based, mixing, cutting, etc.)",
        "Practice the pronunciation of challenging verbs",
        "Have students mime the actions as you say the verbs"
      ]
    },
    {
      title: "Cooking Instructions Practice",
      duration: "10 minutes",
      description: "Practice using cooking verbs in instructions",
      materials: ["Action cards with cooking verbs"],
      instructions: [
        "Divide students into small groups",
        "Distribute action cards with cooking verbs to each group",
        "Groups create a short cooking demonstration using the verbs on their cards",
        "Encourage use of sequence markers and time expressions",
        "Each group presents their cooking demonstration to the class",
        "Other students identify all the cooking verbs used"
      ]
    },
    {
      title: "Kitchen Safety Discussion",
      duration: "10 minutes",
      description: "Learn about kitchen safety rules and vocabulary",
      materials: ["Visual English Book 6, Unit 6 slides", "Kitchen safety posters"],
      instructions: [
        "Present key kitchen safety vocabulary",
        "Show kitchen safety posters and discuss the rules shown",
        "Teach important imperatives for kitchen safety: 'Be careful with...', 'Never leave... unattended'",
        "Discuss potential dangers in the kitchen and how to avoid them",
        "Have students share any kitchen accidents they've witnessed or experienced"
      ]
    },
    {
      title: "Kitchen Safety Quiz Game",
      duration: "10 minutes",
      description: "Test knowledge of kitchen safety rules",
      materials: ["Kitchen Safety Quiz"],
      instructions: [
        "Have students complete the Kitchen Safety Quiz individually",
        "Review answers as a class",
        "For each safety rule, have students explain why it's important",
        "Ask students to create their own kitchen safety rule",
        "Vote on the most important kitchen safety rules"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of cooking verbs, ability to give clear cooking instructions, and understanding of kitchen safety rules.",
  homeworkIdeas: [
    "Create a poster illustrating five important kitchen safety rules", 
    "Write a paragraph explaining how to prepare a simple dish using at least 8 cooking verbs",
    "Record a short video of yourself demonstrating cooking actions and explaining what you're doing"
  ],
  additionalResources: [
    {
      title: "Cooking Verbs Dictionary",
      url: "https://www.vocabulary.cl/Lists/Cooking_Verbs.htm"
    },
    {
      title: "Kitchen Safety for Kids",
      url: "https://kidshealth.org/en/kids/kitchen-safety.html"
    }
  ]
};
