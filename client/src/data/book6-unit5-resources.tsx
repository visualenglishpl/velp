// This file contains resources for Book 6, Unit 5 (Theme Park Stalls themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit5Resources = [
  {
    title: "Amusement Park Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f8a9e5dae7694eb79feb9ff1ab1e8929",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f8a9e5dae7694eb79feb9ff1ab1e8929?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "At the Fair Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/ea8ec53eb3394ce6a6fd23b97c984fdb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ea8ec53eb3394ce6a6fd23b97c984fdb?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Amusement Park Safety Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/eqfbpQJg2xI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/eqfbpQJg2xI?si=MXisBCWI1i3_t7tl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Amusement Park Word Search",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/6f76da4f9b254c628e68e95dadc01800",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6f76da4f9b254c628e68e95dadc01800?themeId=1&templateId=1&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Theme Park Attractions
export const themeParkAttractionsLessonPlan = {
  id: "theme-park-attractions-lesson",
  title: "Theme Park Attractions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to theme parks and attractions",
    "Practice describing different rides and stalls",
    "Develop language for expressing preferences and feelings about attractions",
    "Build speaking skills through theme park-themed conversations"
  ],
  materials: [
    "Visual English Book 6, Unit 5 slides",
    "Amusement Park Vocabulary Game",
    "At the Fair Vocabulary Game",
    "Theme park picture cards",
    "Attraction description cards"
  ],
  steps: [
    {
      title: "Warm-up: Theme Park Experiences",
      duration: "5 minutes",
      description: "Activate prior knowledge about theme parks",
      instructions: [
        "Ask students: 'Have you ever been to a theme park? What was it like?'",
        "Create a mind map on the board with students' ideas",
        "Group similar attractions together (rides, games, food stalls, etc.)",
        "Discuss what makes theme parks exciting and fun"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to theme parks",
      materials: ["Visual English Book 6, Unit 5 slides", "Theme park picture cards"],
      instructions: [
        "Introduce attraction vocabulary: roller coaster, ferris wheel, carousel, etc.",
        "Present stall vocabulary: food stand, souvenir shop, game booth, etc.",
        "Teach related adjectives: thrilling, exciting, scary, fun, delicious, etc.",
        "Show theme park picture cards and have students identify the attractions",
        "Practice pronunciation paying attention to stress patterns"
      ]
    },
    {
      title: "Interactive Games: Theme Park Vocabulary",
      duration: "10 minutes",
      description: "Reinforce vocabulary through digital games",
      materials: ["Amusement Park Vocabulary Game", "At the Fair Vocabulary Game"],
      instructions: [
        "Have students play the Amusement Park Vocabulary Game",
        "Continue with the At the Fair Vocabulary Game",
        "Review any challenging vocabulary after each game",
        "Discuss students' favorite attractions from the games"
      ]
    },
    {
      title: "Attraction Description Activity",
      duration: "10 minutes",
      description: "Practice describing different theme park attractions",
      materials: ["Attraction description cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute attraction description cards",
        "Student A describes the attraction without naming it",
        "Student B guesses which attraction is being described",
        "Encourage use of descriptive language and specific vocabulary",
        "Provide sentence starters: 'This attraction is...', 'On this ride, you...', etc.",
        "Pairs switch roles and continue with new cards"
      ]
    },
    {
      title: "Theme Park Planning",
      duration: "10 minutes",
      description: "Create a plan for visiting a theme park",
      instructions: [
        "Divide students into small groups",
        "Each group creates a plan for a day at a theme park",
        "They must decide:",
        "- Which attractions to visit and in what order",
        "- Where and what to eat",
        "- Which souvenirs to buy",
        "Groups present their plans to the class",
        "Class votes on which plan sounds most enjoyable"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their appropriate use of theme park vocabulary, ability to describe attractions in detail, and participation in the planning activity.",
  homeworkIdeas: [
    "Design a new theme park attraction and write a paragraph describing it", 
    "Create a brochure for a real or imaginary theme park using vocabulary from the lesson",
    "Write a diary entry about a real or imaginary visit to a theme park"
  ],
  additionalResources: [
    {
      title: "ESL Amusement Park Activities",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/amusement-park"
    }
  ]
};

// Second lesson plan for Unit 5: Theme Park Games and Stalls
export const themeParkStallsLessonPlan = {
  id: "theme-park-stalls-lesson",
  title: "Theme Park Games and Stalls",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to theme park games and stalls",
    "Practice giving and following instructions for games",
    "Develop language for transactions at food and souvenir stalls",
    "Build confidence in role-play situations set in a theme park"
  ],
  materials: [
    "Visual English Book 6, Unit 5 slides",
    "Amusement Park Word Search game",
    "Amusement Park Safety Video",
    "Game instruction cards",
    "Food stall menu templates",
    "Play money for role-plays"
  ],
  steps: [
    {
      title: "Warm-up: Favorite Theme Park Games",
      duration: "5 minutes",
      description: "Discuss common games found at theme parks",
      instructions: [
        "Ask students: 'What games have you played at a theme park or carnival?'",
        "Create a list on the board of different games mentioned",
        "Briefly explain any games that some students might not know",
        "Discuss which games require skill and which rely on luck"
      ]
    },
    {
      title: "Stall Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to different types of stalls",
      materials: ["Visual English Book 6, Unit 5 slides"],
      instructions: [
        "Present vocabulary for game stalls: ring toss, balloon pop, water gun, etc.",
        "Introduce food stall vocabulary: cotton candy, popcorn, corn dog, funnel cake, etc.",
        "Teach souvenir stall vocabulary: stuffed animals, key chains, caps, t-shirts, etc.",
        "Present transaction phrases: 'How much is...?', 'I'd like to...', 'Can I have...?'",
        "Practice dialogue patterns for buying food, playing games, and purchasing souvenirs"
      ]
    },
    {
      title: "Video: Amusement Park Safety",
      duration: "10 minutes",
      description: "Learn about safety rules at theme parks",
      materials: ["Amusement Park Safety Video"],
      instructions: [
        "Play the Amusement Park Safety Video",
        "Ask students to note important safety rules mentioned",
        "After watching, list the safety rules on the board",
        "Teach imperatives used for safety instructions: 'Keep your hands inside', 'Wait your turn', etc.",
        "Discuss why safety is important at theme parks"
      ]
    },
    {
      title: "Game Instruction Activity",
      duration: "10 minutes",
      description: "Practice giving and following instructions for theme park games",
      materials: ["Game instruction cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute game instruction cards for various carnival games",
        "Groups prepare to explain how to play their assigned game",
        "Each group presents their game to the class, focusing on clear instructions",
        "Other students can ask questions about the game",
        "If time permits, simulate playing some of the games in class"
      ]
    },
    {
      title: "Theme Park Stall Role-Play",
      duration: "10 minutes",
      description: "Practice dialogues for theme park transactions",
      materials: ["Food stall menu templates", "Play money"],
      instructions: [
        "Divide students into pairs",
        "Assign each pair a stall type: food, game, or souvenir",
        "One student plays the vendor, the other the customer",
        "Distribute menu templates and play money",
        "Student pairs create and practice their dialogues",
        "Encourage use of appropriate question forms and responses",
        "Vendors should try to 'upsell' additional items",
        "Customers should ask questions about products",
        "Volunteers perform their role-plays for the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of theme park stall vocabulary, ability to give clear game instructions, and performance in the role-play activity.",
  homeworkIdeas: [
    "Create a menu for a theme park food stall with descriptions and prices", 
    "Write instructions for a new carnival game you've invented",
    "Design a souvenir shop with a list of items that reflect the theme park's attractions"
  ],
  additionalResources: [
    {
      title: "ESL Role-Play Activities",
      url: "https://www.teachingenglish.org.uk/article/role-play"
    },
    {
      title: "Carnival Games Vocabulary",
      url: "https://www.vocabulary.cl/Lists/Carnival.htm"
    }
  ]
};
