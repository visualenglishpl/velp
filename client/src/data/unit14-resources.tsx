// This file contains resources for Book 7, Unit 14 (Climate Change and Migration themed content)

export const unit14Resources = [
  {
    title: "Climate Change - What can be done?",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/VTfgNFz1DBM",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VTfgNFz1DBM?si=1zHMvg37xRbqmmJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "MIGRANTS - Award-Winning CG Animated Short Film",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/LtWdrDqS_uc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LtWdrDqS_uc?si=EyWUNJqFAOkNdEVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Climate Change Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/7f0c2e9ff2e1426f92f9a42c93b3e5ec",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7f0c2e9ff2e1426f92f9a42c93b3e5ec?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Migration Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/3e56b5ac92a646e0afc5ea5c4bb0b82e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3e56b5ac92a646e0afc5ea5c4bb0b82e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Migration and Climate Change
export const migrationClimateLessonPlan = {
  id: "migration-climate-lesson",
  title: "Migration and Climate Change",
  duration: "50 minutes",
  level: "Intermediate to Advanced",
  objectives: [
    "Learn vocabulary related to climate change and migration",
    "Understand the connection between climate change and human migration",
    "Develop critical thinking about global challenges",
    "Practice discussing complex social issues in English"
  ],
  materials: [
    "Visual English Book 7, Unit 14 slides",
    "'MIGRANTS' animated short film",
    "Climate Change video",
    "Climate Change vocabulary game",
    "Migration vocabulary game",
    "World map",
    "Chart paper and markers"
  ],
  steps: [
    {
      title: "Warm-up: Climate Change Knowledge",
      duration: "5 minutes",
      description: "Activate prior knowledge and introduce the topic",
      instructions: [
        "Ask students what they know about climate change",
        "Create a mind map on the board with student contributions",
        "Introduce key vocabulary: migration, refugee, climate crisis, global warming, etc."
      ]
    },
    {
      title: "Video: Climate Change - What can be done?",
      duration: "10 minutes",
      description: "Watch video to build understanding of climate issues",
      materials: ["Climate Change video"],
      instructions: [
        "Play the climate change video",
        "Have students take notes on key points",
        "After watching, discuss in pairs what solutions were presented",
        "Create a class list of possible actions to address climate change"
      ]
    },
    {
      title: "MIGRANTS Short Film Analysis",
      duration: "15 minutes",
      description: "Watch and analyze the animated film about migration",
      materials: ["'MIGRANTS' animated short film", "World map"],
      instructions: [
        "Introduce the short film 'MIGRANTS' as a metaphor for climate migration",
        "Watch the animated short film",
        "Guide discussion questions: What happened in the film? Who were the characters? What did they represent?",
        "Locate regions on a world map that are currently affected by climate migration",
        "Discuss the symbolism in the animation and how it relates to real-world issues"
      ]
    },
    {
      title: "Vocabulary Building",
      duration: "10 minutes",
      description: "Develop climate and migration vocabulary through interactive games",
      materials: ["Climate Change vocabulary game", "Migration vocabulary game"],
      instructions: [
        "Have students play the climate change vocabulary game in small groups",
        "Follow with the migration vocabulary game",
        "After each game, ask students to use three new words in sentences",
        "Create a class vocabulary wall with new terms"
      ]
    },
    {
      title: "Discussion and Reflection",
      duration: "10 minutes",
      description: "Apply learning to real-world situations and personal values",
      materials: ["Chart paper and markers"],
      instructions: [
        "Divide students into small groups",
        "Give each group a discussion prompt: How might climate change affect your country/region? What responsibilities do countries have toward climate migrants?",
        "Groups create a poster with their ideas and present to the class",
        "End with a reflective writing prompt: 'What can I do to help address climate change?'"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their participation in discussions, appropriate use of vocabulary, and ability to express complex ideas about climate change and migration.",
  homeworkIdeas: [
    "Research a region affected by climate migration and prepare a short presentation", 
    "Write a creative story about the journey of a climate refugee",
    "Create an infographic showing the connection between climate change and migration"
  ],
  additionalResources: [
    {
      title: "Environmental Migration Portal",
      url: "https://environmentalmigration.iom.int/"
    },
    {
      title: "Climate Change Knowledge Portal",
      url: "https://climateknowledgeportal.worldbank.org/"
    }
  ]
};
