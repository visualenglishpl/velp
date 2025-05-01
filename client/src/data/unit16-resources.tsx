// This file contains resources for Book 7, Unit 16 (Food and Cuisine themed content)

export const unit16Resources = [
  {
    title: "Guess The Fast Food Restaurants Logo | Food Logo Quiz",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/XPJ8sLW9MVs",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XPJ8sLW9MVs?si=rrEv0vqe5wxKRaMi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Guess the Country by its Food | Country Quiz",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/OuKo5MVaeWU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OuKo5MVaeWU?si=xYZvg7F70fGeNxbZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Food Tastes",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/6730885c619848649b96d5fa6bf972c7",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6730885c619848649b96d5fa6bf972c7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Food Stall / Trucks",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/3828678c606049d0a756fad74eb5819a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3828678c606049d0a756fad74eb5819a?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Food and Cuisine
export const foodAndCuisineLessonPlan = {
  id: "food-cuisine-lesson",
  title: "Food and Cuisine Around the World",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to food, flavors, and culinary traditions",
    "Explore different cuisines from around the world",
    "Practice describing food tastes and preferences",
    "Develop awareness of cultural diversity through food"
  ],
  materials: [
    "Visual English Book 7, Unit 16 slides",
    "Food logo quiz video",
    "Guess the country by food video",
    "Wordwall Food Tastes game",
    "Wordwall Food Stalls/Trucks game",
    "Food flashcards",
    "World map"
  ],
  steps: [
    {
      title: "Warm-up: Food Preferences",
      duration: "5 minutes",
      description: "Activate prior knowledge about food and tastes",
      instructions: [
        "Ask students about their favorite foods and cuisines",
        "Create a list of different food types on the board",
        "Discuss what makes certain foods popular or unique"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key food vocabulary with visuals",
      materials: ["Food flashcards", "Book 7, Unit 16 slides"],
      instructions: [
        "Introduce vocabulary related to food: cuisine, flavor, spicy, sour, sweet, savory, etc.",
        "Show images of different dishes from around the world",
        "Practice pronunciation and have students repeat each term",
        "Sort vocabulary into taste categories (sweet, salty, sour, etc.)"
      ],
      teacherNotes: "Emphasize both international and local food vocabulary"
    },
    {
      title: "Video: Food Quizzes",
      duration: "10 minutes",
      description: "Watch and participate in food-related quizzes",
      materials: ["Food logo quiz video", "Guess the country by food video", "World map"],
      instructions: [
        "Play the food logo quiz and have students guess the restaurants",
        "For each correct answer, discuss if those restaurants exist in students' countries",
        "Play the 'Guess the country by food' quiz",
        "For each food shown, locate the country on the world map",
        "Discuss which foods students have tried or would like to try"
      ]
    },
    {
      title: "Food Description Activity",
      duration: "15 minutes",
      description: "Practice describing foods and cuisines",
      instructions: [
        "Divide students into pairs",
        "Give each pair a set of food cards or images",
        "Students take turns describing a food without naming it",
        "Partner must guess the food based on the description",
        "After the activity, discuss which foods were easy or difficult to describe and why"
      ]
    },
    {
      title: "Interactive Games: Food Vocabulary",
      duration: "5 minutes",
      description: "Reinforce vocabulary with Wordwall games",
      materials: ["Wordwall Food Tastes game", "Wordwall Food Stalls/Trucks game"],
      instructions: [
        "Play the Wordwall games as class competitions",
        "Start with the Food Tastes game to review flavor vocabulary",
        "Continue with the Food Stalls/Trucks game to explore street food concepts",
        "Award points for correct answers and discuss any challenging questions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use food vocabulary, describe different cuisines, and demonstrate cultural awareness about food traditions.",
  homeworkIdeas: [
    "Create a menu for a restaurant featuring dishes from different countries", 
    "Write a recipe for a traditional dish from your culture or one you'd like to try"
  ],
  additionalResources: [
    {
      title: "Taste Atlas - World Food Atlas",
      url: "https://www.tasteatlas.com/"
    }
  ]
};
