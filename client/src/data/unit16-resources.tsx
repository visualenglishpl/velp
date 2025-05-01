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

// Second lesson plan for Unit 16: Food Culture and Dining Etiquette
export const foodCultureLessonPlan = {
  id: "food-culture-lesson",
  title: "Food Culture and Dining Etiquette",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to dining etiquette and table manners",
    "Understand cultural differences in eating habits and food traditions",
    "Practice language for ordering food and dining out",
    "Develop awareness of proper dining behavior in different contexts"
  ],
  materials: [
    "Visual English Book 7, Unit 16 slides",
    "Pictures of dining settings from different cultures",
    "Menu cards from various restaurant types",
    "Dining etiquette flashcards",
    "Role-play scenario cards"
  ],
  steps: [
    {
      title: "Warm-up: Table Setting",
      duration: "5 minutes",
      description: "Identify table setting items and dining utensils",
      instructions: [
        "Display images of different table settings (formal Western, Asian, Middle Eastern, etc.)",
        "Ask students to identify the items: fork, knife, spoon, chopsticks, plates, glasses, etc.",
        "Discuss how table settings differ across cultures",
        "Create a simple diagram of a formal place setting on the board with labels"
      ]
    },
    {
      title: "Dining Etiquette Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary for dining behavior and restaurant interaction",
      materials: ["Visual English Book 7, Unit 16 slides", "Dining etiquette flashcards"],
      instructions: [
        "Introduce vocabulary: reservation, appetizer, main course, dessert, bill, tip, etc.",
        "Present etiquette terms: manner, polite, impolite, acceptable, taboo, custom, etc.",
        "Show dining etiquette flashcards with dos and don'ts for different cultures",
        "Students categorize behaviors as 'polite' or 'impolite' based on their own culture"
      ]
    },
    {
      title: "Cultural Food Customs",
      duration: "10 minutes",
      description: "Explore dining customs from around the world",
      materials: ["Pictures of dining settings from different cultures"],
      instructions: [
        "Present interesting food customs from different countries",
        "Examples: leaving food on plate in China (polite) vs. clearing plate in US (polite)",
        "Discuss eating with hands in India vs. using utensils in Europe",
        "Have students share unusual or interesting food customs from their own cultures",
        "Create a chart comparing different dining customs across 3-4 cultures"
      ]
    },
    {
      title: "Restaurant Role-play",
      duration: "15 minutes",
      description: "Practice restaurant conversations and ordering food",
      materials: ["Menu cards from various restaurant types", "Role-play scenario cards"],
      instructions: [
        "Divide students into pairs or groups of three",
        "Distribute menu cards from different types of restaurants",
        "Assign roles: customer(s), server, host/hostess",
        "Students role-play a restaurant scenario including: greeting, ordering, asking questions about menu items, paying, and thanking",
        "Rotate so students can try different roles",
        "Invite some groups to perform their role-play for the class"
      ]
    },
    {
      title: "Dining Dilemmas",
      duration: "5 minutes",
      description: "Problem-solve challenging dining situations",
      instructions: [
        "Present 3-4 dining 'dilemmas' or challenging situations",
        "Examples: 'You don't like the food you ordered', 'You don't know how to use chopsticks', 'You're invited to eat something you're allergic to'",
        "Students discuss in small groups how to handle each situation politely",
        "Share solutions with the class and discuss cultural sensitivity"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of dining vocabulary, participation in role-plays, and understanding of cultural differences in dining customs.",
  homeworkIdeas: [
    "Create a guide for visitors to your country explaining important dining etiquette rules", 
    "Research dining customs in a country you'd like to visit and write a short report",
    "Design a formal dinner menu with appropriate courses and descriptions"
  ],
  additionalResources: [
    {
      title: "International Dining Etiquette Guide",
      url: "https://www.etiquettescholar.com/dining_etiquette/table-etiquette.html"
    },
    {
      title: "Food and Culture Resources - National Geographic",
      url: "https://www.nationalgeographic.org/topics/resource-library-food-and-culture/"
    }
  ]
};
