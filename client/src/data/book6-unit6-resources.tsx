import { TeacherResource } from '@/components/TeacherResources';

// In the Kitchen - Unit 6 Resources
export const book6Unit6Resources: TeacherResource[] = [
  {
    title: "In the Kitchen Kahoot",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/in-the-kitchen/b683184e-f723-4784-a02a-d51e3678c3af",
    embedCode: ""
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
    title: "Kitchen Vocabulary Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=6BIFnvjpquk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6BIFnvjpquk?si=31dsztCC97dUIu18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook6Unit6Resources(bookId: string, unitId: string): TeacherResource[] {
  return book6Unit6Resources.map(resource => ({
    ...resource,
    bookId,
    unitId
  }));
}

// Sample lesson plans for Unit 6
export const kitchenVocabularyLessonPlan = {
  title: "Kitchen Vocabulary and Utensils",
  objectives: [
    "Identify common kitchen utensils and their uses",
    "Practice vocabulary related to the kitchen environment",
    "Understand instructions for basic food preparation"
  ],
  materials: [
    "Visual English Book 6 Unit 6 slides",
    "Wordwall games on kitchen utensils",
    "Picture cards of kitchen items"
  ],
  procedure: [
    "Introduction: Show images of different kitchens and discuss",
    "Vocabulary: Present kitchen utensil vocabulary with matching images",
    "Practice: Use Wordwall games to reinforce vocabulary",
    "Activity: 'What's missing?' kitchen items memory game",
    "Speaking: Role-play giving instructions using kitchen vocabulary"
  ],
  assessment: [
    "Vocabulary quiz on kitchen items and utensils",
    "Practical demonstration of kitchen item identification",
    "Follow-the-instruction listening assessment"
  ],
  extensions: [
    "Create a kitchen safety poster using key vocabulary",
    "Research different types of specialist kitchen equipment",
    "Write simple recipes using the vocabulary learned"
  ]
};

export const cookingMethodsLessonPlan = {
  title: "Cooking Methods and Techniques",
  objectives: [
    "Learn vocabulary related to cooking methods (boil, fry, bake, etc.)",
    "Practice describing food preparation processes",
    "Understand and follow recipe instructions"
  ],
  materials: [
    "Visual English Book 6 Unit 6 slides",
    "Cooking methods flashcards",
    "Simple recipe cards",
    "Wordwall games on cooking methods"
  ],
  procedure: [
    "Warm-up: Match cooking method to food items",
    "Vocabulary: Present cooking verbs with visual examples",
    "Practice: Interactive Wordwall games on cooking methods",
    "Activity: Sequence cooking steps in the correct order",
    "Project: Create a simple illustrated recipe using target vocabulary"
  ],
  assessment: [
    "Cooking methods vocabulary test",
    "Recipe sequencing assessment",
    "Oral presentation of a simple cooking procedure"
  ],
  extensions: [
    "Compare cooking methods across different cultures",
    "Create a cooking video script using the vocabulary",
    "Research healthy vs. unhealthy cooking methods"
  ]
};

export const book6Unit6LessonPlans = [
  kitchenVocabularyLessonPlan,
  cookingMethodsLessonPlan
];

export function getBook6Unit6LessonPlans() {
  return book6Unit6LessonPlans;
}
