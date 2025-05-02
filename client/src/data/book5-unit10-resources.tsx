// This file contains resources for Book 5, Unit 10 (At the Supermarket themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit10Resources = [
  {
    title: "Supermarket Aisles Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/632052bcd48a47109b16b6aade7219d4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/632052bcd48a47109b16b6aade7219d4?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Supermarket Aisles Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/6a61b552d93846289bb2528e84dc88d3",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6a61b552d93846289bb2528e84dc88d3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Food Packaging Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4c17e844768a466eadfbc964ff9ec892",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4c17e844768a466eadfbc964ff9ec892?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Food Packaging Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/d6e743a6f5cc41c598087b5a83cdefcb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d6e743a6f5cc41c598087b5a83cdefcb?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Supermarket Shopping Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/28mzdkgvfeY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/28mzdkgvfeY?si=EscE4hNwH_heNO7J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Trolley Dash Shopping Game",
    resourceType: "game" as const,
    provider: "Flash Museum",
    sourceUrl: "https://flashmuseum.org/trolley-dash/"
  }
];

// Lesson plan data for Supermarket Vocabulary
export const supermarketVocabularyLessonPlan = {
  id: "supermarket-vocabulary-lesson",
  title: "Supermarket Vocabulary and Layout",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to supermarket sections and aisles",
    "Practice describing food locations in a store",
    "Develop language for navigating a supermarket",
    "Build shopping-related conversation skills"
  ],
  materials: [
    "Visual English Book 5, Unit 10 slides",
    "Supermarket Aisles Vocabulary Games",
    "Supermarket Shopping Video",
    "Supermarket floor plan handout",
    "Food item picture cards"
  ],
  steps: [
    {
      title: "Warm-up: Shopping Experiences",
      duration: "5 minutes",
      description: "Activate prior knowledge about supermarkets",
      instructions: [
        "Ask students: 'How often do you go to the supermarket? What do you usually buy?'",
        "Create a list of common supermarket purchases on the board",
        "Discuss differences between supermarkets and other types of shops",
        "Introduce the topic of supermarket organization and vocabulary"
      ]
    },
    {
      title: "Supermarket Sections Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to supermarket departments and aisles",
      materials: ["Visual English Book 5, Unit 10 slides", "Supermarket floor plan handout"],
      instructions: [
        "Present supermarket section vocabulary: bakery, produce, dairy, meat, frozen foods, etc.",
        "Introduce aisle and shelf vocabulary: shelf, aisle, counter, checkout, etc.",
        "Teach location prepositions: next to, across from, at the back/front, etc.",
        "Use the supermarket floor plan to practice describing where items are located"
      ]
    },
    {
      title: "Video: Supermarket Shopping",
      duration: "10 minutes",
      description: "Watch a video about shopping in a supermarket",
      materials: ["Supermarket Shopping Video"],
      instructions: [
        "Play the Supermarket Shopping Video",
        "Ask students to note any new vocabulary they hear",
        "Pause to discuss the different sections shown in the supermarket",
        "After watching, review the supermarket vocabulary presented in the video"
      ]
    },
    {
      title: "Interactive Games: Supermarket Vocabulary",
      duration: "10 minutes",
      description: "Practice supermarket vocabulary through digital games",
      materials: ["Supermarket Aisles Vocabulary Games"],
      instructions: [
        "Have students play the Supermarket Aisles Vocabulary Games",
        "Encourage students to say where each item would be found in a supermarket",
        "Review any challenging vocabulary as a class",
        "Discuss how supermarkets are organized to encourage shopping"
      ]
    },
    {
      title: "Supermarket Navigation Activity",
      duration: "10 minutes",
      description: "Practice giving and following directions in a supermarket",
      materials: ["Supermarket floor plan handout", "Food item picture cards"],
      instructions: [
        "Divide students into pairs",
        "Using the supermarket floor plan, one student asks where to find specific items",
        "The partner gives directions using supermarket vocabulary and prepositions",
        "Example: 'Where can I find milk?' 'It's in the dairy section, aisle 3, on the right side.'",
        "Students take turns asking for and giving directions",
        "As an extension, have students create a shopping route for a list of 5 items",
        "Volunteers share their routes with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of supermarket vocabulary, ability to describe locations within a store, and participation in the navigation activity.",
  homeworkIdeas: [
    "Create a map of a local supermarket, labeling the different sections", 
    "Write a dialogue between a customer and store employee asking for help finding items",
    "Make a shopping list categorized by supermarket sections"
  ],
  additionalResources: [
    {
      title: "ESL Supermarket Vocabulary",
      url: "https://www.eslflow.com/shopping_and_moneylessonplans.html"
    },
    {
      title: "Supermarket Language Guide",
      url: "https://www.fluentu.com/blog/english/english-supermarket-vocabulary/"
    }
  ]
};

// Second lesson plan for Unit 10: Food Packaging and Quantities
export const foodPackagingLessonPlan = {
  id: "food-packaging-lesson",
  title: "Food Packaging and Quantities",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to food packaging and containers",
    "Practice using quantity expressions and measurements",
    "Develop language for discussing food purchases",
    "Build shopping list creation skills"
  ],
  materials: [
    "Visual English Book 5, Unit 10 slides",
    "Food Packaging Vocabulary Games",
    "Trolley Dash Shopping Game",
    "Food packaging examples or pictures",
    "Shopping list template"
  ],
  steps: [
    {
      title: "Warm-up: Food Containers",
      duration: "5 minutes",
      description: "Activate knowledge about food packaging",
      instructions: [
        "Show pictures of various food packages and ask students to name them",
        "Create a list of packaging vocabulary on the board",
        "Discuss why different foods have different packaging",
        "Introduce the topic of food quantities and measurements"
      ]
    },
    {
      title: "Packaging Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to food containers and packaging",
      materials: ["Visual English Book 5, Unit 10 slides", "Food packaging examples or pictures"],
      instructions: [
        "Present packaging vocabulary: can, jar, bottle, carton, box, packet, bag, etc.",
        "Introduce quantity expressions: a bottle of, a jar of, a box of, etc.",
        "Teach measurement vocabulary: gram, kilogram, liter, milliliter, etc.",
        "Practice matching foods with their typical packaging"
      ]
    },
    {
      title: "Quantity Expressions",
      duration: "10 minutes",
      description: "Practice using quantity expressions for food items",
      materials: ["Visual English Book 5, Unit 10 slides"],
      instructions: [
        "Present countable vs. uncountable food vocabulary",
        "Explain quantity expressions for countable items: a dozen eggs, a bunch of bananas, etc.",
        "Teach quantity expressions for uncountable items: a loaf of bread, a piece of cheese, etc.",
        "Practice forming sentences with quantity expressions",
        "Example: 'I need to buy a jar of honey, a loaf of bread, and a bunch of bananas.'",
        "Have students take turns creating shopping sentences with correct quantity expressions"
      ]
    },
    {
      title: "Interactive Games: Food Packaging",
      duration: "10 minutes",
      description: "Practice packaging vocabulary through digital games",
      materials: ["Food Packaging Vocabulary Games", "Trolley Dash Shopping Game"],
      instructions: [
        "Have students play the Food Packaging Vocabulary Games",
        "If time permits, let students try the Trolley Dash Shopping Game",
        "Review any challenging vocabulary as a class",
        "Discuss regional differences in food packaging and measurements (metric vs. imperial)"
      ]
    },
    {
      title: "Shopping List Activity",
      duration: "10 minutes",
      description: "Practice creating a detailed shopping list with quantities",
      materials: ["Shopping list template"],
      instructions: [
        "Distribute shopping list templates",
        "Explain that a good shopping list includes specific quantities and packaging",
        "Example: '2 loaves of whole wheat bread' vs. just 'bread'",
        "Students create detailed shopping lists for a specified scenario (family dinner, week's groceries, etc.)",
        "Include at least 10 items with appropriate quantity expressions and packaging types",
        "Volunteers share their shopping lists with the class",
        "Class discusses whether lists are clear and specific enough for shopping"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of packaging vocabulary, correct usage of quantity expressions, and ability to create a detailed shopping list.",
  homeworkIdeas: [
    "Take photos of 10 different food packages at home and write their names and quantities", 
    "Create a recipe with ingredients listed with specific quantities and packaging",
    "Compare food packaging between two countries or cultures"
  ],
  additionalResources: [
    {
      title: "ESL Food Quantities Vocabulary",
      url: "https://www.thoughtco.com/food-and-quantities-1212065"
    },
    {
      title: "Shopping Language Guide",
      url: "https://www.english-at-home.com/vocabulary/shopping-vocabulary/"
    }
  ]
};
