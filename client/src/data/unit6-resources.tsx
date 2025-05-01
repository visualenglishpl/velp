// This file contains resources for Book 7, Unit 6 (Money themed content)

export const unit6Resources = [
  {
    title: "Learn English Money from 1p to 50 Pounds",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/Vcoi6l0D6ak",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Vcoi6l0D6ak?si=cYTh99UmUthwy1yO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "British Currency Worksheet to Print",
    resourceType: "lesson" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-worksheets/general-topic/countries/british-currency/18577",
    embedCode: ""
  },
  {
    title: "Money Kahoot Game",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/currency/f87e8719-291e-440a-a340-22344175fedb",
    embedCode: ""
  },
  {
    title: "Money Wordwall Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/463ad4520fbb4edd9ea903446f182971",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/463ad4520fbb4edd9ea903446f182971?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Money Wordwall Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/2108e23e264b487b9f5c8022145d22d8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2108e23e264b487b9f5c8022145d22d8?themeId=41&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for British Currency
export const britishCurrencyLessonPlan = {
  id: "british-currency-lesson",
  title: "British Currency",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Identify British coins and notes",
    "Understand the value relationships between different denominations",
    "Practice real-life money exchange scenarios"
  ],
  materials: [
    "Printouts of British currency images",
    "Currency conversion worksheets",
    "Role-play scenario cards"
  ],
  steps: [
    {
      title: "Introduction to British Currency",
      duration: "10 minutes",
      description: "Introduce the British currency system and its denominations",
      instructions: ["Show images of different coins and notes", "Explain the value relationships"]
    },
    {
      title: "Visual Recognition Practice",
      duration: "10 minutes",
      description: "Practice identifying coins and notes through visual exercises",
      materials: ["Currency flashcards", "Worksheets with coin/note images"]
    },
    {
      title: "Pair Work: Price Comparison",
      duration: "15 minutes",
      description: "Students work in pairs to compare prices and practice shopping dialogues",
      teacherNotes: "Monitor conversations and provide assistance with pronunciation and vocabulary"
    },
    {
      title: "Role-play: Shopping Scenarios",
      duration: "10 minutes",
      description: "Students role-play making purchases in a British shop",
      materials: ["Role-play scenario cards", "Fake British currency for props"]
    }
  ],
  assessmentTips: "Students will be evaluated on their ability to correctly identify currency and perform basic transactions.",
  homeworkIdeas: ["Compare British currency with other currencies from English-speaking countries", "Create a currency conversion chart"]
};

// Lesson plan data for International Money
export const internationalMoneyLessonPlan = {
  id: "international-money-lesson",
  title: "International Money Exchange",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Identify major world currencies",
    "Understand basic exchange rate concepts",
    "Practice currency conversion calculations"
  ],
  materials: [
    "Currency flashcards for major world currencies",
    "Simple exchange rate charts",
    "Currency conversion worksheets"
  ],
  steps: [
    {
      title: "Introduction to World Currencies",
      duration: "10 minutes",
      description: "Introduction to major world currencies and their symbols",
      instructions: ["Show images of different currencies", "Discuss which countries use which currencies"]
    },
    {
      title: "Exchange Rate Explanation",
      duration: "15 minutes",
      description: "Explain exchange rate concepts and practice conversions",
      materials: ["Exchange rate charts", "Conversion worksheets"],
      teacherNotes: "Emphasize that exchange rates fluctuate daily"
    },
    {
      title: "International Shopping Simulation",
      duration: "15 minutes",
      description: "Group activity simulating international shopping",
      instructions: ["Divide students into groups representing different countries", "Have them 'purchase' items using different currencies"]
    },
    {
      title: "Wrap-up Discussion",
      duration: "5 minutes",
      description: "Discussion about currency values and international travel",
      teacherNotes: "Ask students about their experiences with different currencies if applicable"
    }
  ],
  assessmentTips: "Students will complete a worksheet with currency conversion problems.",
  homeworkIdeas: ["Research how exchange rates affect international business and trade", "Track exchange rates for a week and note changes"]
};

// Lesson plan data for Spending and Saving
export const spendingSavingLessonPlan = {
  id: "spending-saving-lesson",
  title: "Spending and Saving Money",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to banking and saving",
    "Understand the concept of budgeting",
    "Practice making financial decisions"
  ],
  materials: [
    "Budget worksheet templates",
    "Banking vocabulary flashcards",
    "Decision-making scenario cards"
  ],
  steps: [
    {
      title: "Banking Vocabulary",
      duration: "10 minutes",
      description: "Vocabulary building: Banking and saving terms",
      materials: ["Banking vocabulary flashcards"],
      instructions: ["Present key terms related to banking and saving", "Have students match terms with definitions"]
    },
    {
      title: "Importance of Saving",
      duration: "5 minutes",
      description: "Class discussion about why saving money is important",
      teacherNotes: "Encourage students to share personal experiences with saving money"
    },
    {
      title: "Budget Creation Activity",
      duration: "15 minutes",
      description: "Practical activity: Creating a simple budget",
      materials: ["Budget worksheet templates"],
      instructions: ["Distribute budget worksheets", "Guide students through creating a monthly budget"]
    },
    {
      title: "Financial Decision Role-play",
      duration: "15 minutes",
      description: "Role-play: Making financial decisions in different scenarios",
      materials: ["Decision-making scenario cards"]
    }
  ],
  assessmentTips: "Students will create a personal budget for a hypothetical scenario.",
  homeworkIdeas: ["Track personal spending for one week", "Research and write about a banking service"],
  additionalResources: [
    {
      title: "Youth Banking Guide",
      url: "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/"
    }
  ]
};
