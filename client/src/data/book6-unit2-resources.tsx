// This file contains resources for Book 6, Unit 2 (Household Appliances themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit2Resources = [
  {
    title: "Guess the Appliance",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/1ZPStTtE7JI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/1ZPStTtE7JI?si=VBo8KA4cD2fUAbyT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Household Appliances Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Household Appliances Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/618c61ec94e44892a33f2e4db491b222?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Jobs Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/52d2810af010454d9363eec201d2f23f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Household Appliances
export const householdAppliancesLessonPlan = {
  id: "household-appliances-lesson",
  title: "Household Appliances",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to common household appliances",
    "Understand the function and use of different appliances",
    "Practice describing how appliances work",
    "Develop vocabulary for discussing technology in the home"
  ],
  materials: [
    "Visual English Book 6, Unit 2 slides",
    "Guess the Appliance video",
    "Wordwall Household Appliances games",
    "Appliance flashcards or pictures",
    "Function description cards"
  ],
  steps: [
    {
      title: "Warm-up: Appliances at Home",
      duration: "5 minutes",
      description: "Activate prior knowledge about household technology",
      instructions: [
        "Ask students to name appliances they have in their homes",
        "Create a list on the board categorized by room (kitchen, bathroom, etc.)",
        "Ask students which appliance they use most often and why",
        "Discuss which appliances are essential vs. luxury items"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to household appliances",
      materials: ["Visual English Book 6, Unit 2 slides", "Appliance flashcards"],
      instructions: [
        "Introduce vocabulary: appliance, device, gadget, electric, power, etc.",
        "Show appliance flashcards and have students repeat the names",
        "Teach related verbs: plug in, turn on/off, operate, use, etc.",
        "Practice pronunciation paying attention to stress patterns"
      ]
    },
    {
      title: "Video: Guess the Appliance",
      duration: "10 minutes",
      description: "Watch and participate in appliance identification activity",
      materials: ["Guess the Appliance video"],
      instructions: [
        "Play the Guess the Appliance video",
        "Pause after each clue and have students guess the appliance",
        "Discuss what each appliance does and how it works",
        "Create a list of key features for each appliance shown"
      ]
    },
    {
      title: "Function Matching Activity",
      duration: "10 minutes",
      description: "Match appliances with their functions",
      materials: ["Function description cards", "Appliance pictures"],
      instructions: [
        "Divide students into pairs or small groups",
        "Distribute function description cards and appliance pictures",
        "Students match each function description to the correct appliance",
        "Review the matches as a class and discuss any confusions",
        "Extend by having students add additional functions for each appliance"
      ]
    },
    {
      title: "Interactive Games: Appliance Vocabulary",
      duration: "10 minutes",
      description: "Reinforce vocabulary through interactive games",
      materials: ["Wordwall Household Appliances games"],
      instructions: [
        "Have students play the Wordwall Household Appliances games",
        "Play in teams to encourage cooperation and discussion",
        "Award points for correct answers and discuss any challenging questions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of appliance vocabulary, ability to describe appliance functions, and participation in matching activities.",
  homeworkIdeas: [
    "Write a paragraph about your favorite household appliance and why it's important", 
    "Create an advertisement for a new household appliance (real or imaginary)",
    "Research how a specific appliance has changed over time and prepare 3-5 facts"
  ],
  additionalResources: [
    {
      title: "Household Items ESL Activities",
      url: "https://www.eslkidstuff.com/esl-kids-lessons/household-items-videos/"
    }
  ]
};

// Second lesson plan for Unit 2: Appliances and Energy Use
export const appliancesEnergyLessonPlan = {
  id: "appliances-energy-lesson",
  title: "Appliances and Energy Use",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to energy consumption",
    "Understand energy efficiency and conservation concepts",
    "Practice comparing appliances based on energy use",
    "Develop language for discussing environmental impacts"
  ],
  materials: [
    "Visual English Book 6, Unit 2 slides",
    "Energy efficiency rating charts",
    "Energy consumption comparison cards",
    "Energy-saving tips handout"
  ],
  steps: [
    {
      title: "Warm-up: Energy Sources",
      duration: "5 minutes",
      description: "Introduce the concept of energy and power",
      instructions: [
        "Ask students: 'Where does the electricity for appliances come from?'",
        "Create a mind map of energy sources (coal, solar, wind, etc.)",
        "Discuss the difference between renewable and non-renewable energy",
        "Connect energy production to household consumption"
      ]
    },
    {
      title: "Energy Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to energy use",
      materials: ["Visual English Book 6, Unit 2 slides"],
      instructions: [
        "Present vocabulary: energy, power, watt, consumption, efficient, etc.",
        "Introduce energy efficiency ratings and what they mean",
        "Teach phrases for comparing efficiency: 'uses less/more energy than', 'more efficient than', etc.",
        "Practice creating comparative sentences about appliances"
      ]
    },
    {
      title: "Appliance Energy Comparison",
      duration: "15 minutes",
      description: "Compare the energy use of different appliances",
      materials: ["Energy consumption comparison cards", "Energy efficiency rating charts"],
      instructions: [
        "Divide students into small groups",
        "Distribute energy consumption comparison cards for different appliances",
        "Have groups rank appliances from highest to lowest energy consumption",
        "Discuss how newer versions of appliances are often more energy-efficient",
        "Create a class chart showing approximate energy use of common household items"
      ]
    },
    {
      title: "Energy-Saving Strategies",
      duration: "10 minutes",
      description: "Learn and discuss ways to reduce energy consumption",
      materials: ["Energy-saving tips handout"],
      instructions: [
        "Distribute energy-saving tips handout",
        "Review vocabulary: standby power, energy vampire, power strip, etc.",
        "Discuss simple ways to reduce energy use at home",
        "Have students share their own energy-saving strategies"
      ]
    },
    {
      title: "Energy-Saving Campaign",
      duration: "5 minutes",
      description: "Create slogans for energy conservation",
      instructions: [
        "Divide students into pairs",
        "Each pair creates a slogan promoting energy-efficient appliance use",
        "Pairs share their slogans with the class",
        "Class votes on the most effective slogan"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of energy-related vocabulary, ability to discuss efficiency concepts, and participation in the energy comparison activity.",
  homeworkIdeas: [
    "Create a poster with 5 tips for saving energy at home", 
    "Research an energy-efficient appliance and write a short report about its benefits",
    "Track your household's appliance use for one day and identify ways to reduce energy consumption"
  ],
  additionalResources: [
    {
      title: "Energy Efficiency - ENERGY STAR",
      url: "https://www.energystar.gov/"
    },
    {
      title: "Energy Saving Tips for Kids",
      url: "https://www.energy.gov/energysaver/energy-saver"
    }
  ]
};
