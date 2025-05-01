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
  title: "British Currency",
  overview: "A comprehensive lesson on British currency, focusing on identification, values, and usage.",
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
  procedure: [
    "Introduce British currency system (10 min)",
    "Practice identifying coins and notes through visual exercises (10 min)",
    "Pair work: Price comparison and shopping dialogues (15 min)",
    "Role-play: Making purchases in a British shop (10 min)"
  ],
  assessment: "Students will be evaluated on their ability to correctly identify currency and perform basic transactions.",
  extension: "Compare British currency with other currencies from English-speaking countries."
};

// Lesson plan data for International Money
export const internationalMoneyLessonPlan = {
  title: "International Money Exchange",
  overview: "An interactive lesson on international currencies and exchange rates.",
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
  procedure: [
    "Introduction to major world currencies (10 min)",
    "Exchange rate explanation and practice conversions (15 min)",
    "Group activity: International shopping simulation (15 min)",
    "Wrap-up discussion: Currency values and international travel (5 min)"
  ],
  assessment: "Students will complete a worksheet with currency conversion problems.",
  extension: "Research how exchange rates affect international business and trade."
};

// Lesson plan data for Spending and Saving
export const spendingSavingLessonPlan = {
  title: "Spending and Saving Money",
  overview: "A practical lesson on financial literacy focused on spending wisely and saving money.",
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
  procedure: [
    "Vocabulary building: Banking and saving terms (10 min)",
    "Discussion: Why is saving important? (5 min)",
    "Practical activity: Creating a simple budget (15 min)",
    "Role-play: Making financial decisions (15 min)"
  ],
  assessment: "Students will create a personal budget for a hypothetical scenario.",
  extension: "Invite a local bank representative to discuss youth banking options."
};
