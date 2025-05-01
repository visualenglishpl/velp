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

// Second lesson plan for Unit 14: Environmental Conservation
export const environmentalConservationLessonPlan = {
  id: "environmental-conservation-lesson",
  title: "Environmental Conservation",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to environmental protection",
    "Understand solutions to environmental challenges",
    "Develop language for discussing conservation efforts",
    "Practice proposing and evaluating environmental solutions"
  ],
  materials: [
    "Visual English Book 7, Unit 14 slides",
    "Climate Change - What can be done? video",
    "Pictures of environmental conservation efforts",
    "Solution cards with environmental actions",
    "Chart paper and markers"
  ],
  steps: [
    {
      title: "Warm-up: Environmental Issues",
      duration: "5 minutes",
      description: "Identify environmental challenges in students' communities",
      instructions: [
        "Show pictures of various environmental issues (pollution, deforestation, etc.)",
        "Ask students what environmental problems exist in their communities",
        "Create a list on the board of environmental challenges identified",
        "Categorize the issues (air quality, water pollution, waste management, etc.)"
      ]
    },
    {
      title: "Conservation Vocabulary",
      duration: "10 minutes",
      description: "Introduce terminology related to environmental protection",
      materials: ["Visual English Book 7, Unit 14 slides"],
      instructions: [
        "Present vocabulary: conservation, sustainability, biodiversity, ecosystem, etc.",
        "Show images of conservation efforts and sustainable practices",
        "Practice pronunciation and have students repeat key terms",
        "Match vocabulary terms with their definitions in pairs"
      ]
    },
    {
      title: "Video: Solutions for Climate Change",
      duration: "10 minutes",
      description: "Learn about possible solutions to environmental challenges",
      materials: ["Climate Change - What can be done? video"],
      instructions: [
        "Play the video focusing on climate change solutions",
        "Have students note specific actions mentioned in the video",
        "After watching, create a solutions board with three categories: Individual Actions, Community Actions, Global Actions",
        "Sort solutions from the video into these categories"
      ]
    },
    {
      title: "Environmental Solutions Activity",
      duration: "15 minutes",
      description: "Evaluate and prioritize conservation solutions",
      materials: ["Solution cards with environmental actions", "Chart paper and markers"],
      instructions: [
        "Divide students into small groups of 3-4",
        "Distribute solution cards with various environmental actions",
        "Groups must sort their solutions from highest to lowest impact",
        "Each group creates a poster showing their prioritized solutions",
        "Groups present their rankings and explain their reasoning"
      ]
    },
    {
      title: "Personal Conservation Plan",
      duration: "5 minutes",
      description: "Commit to personal environmental actions",
      instructions: [
        "Students individually write 3 environmental actions they can take in their daily lives",
        "Students share one commitment with the class",
        "Create a class 'Conservation Commitment' poster with everyone's contributions",
        "Discuss how small individual actions can create larger positive change"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their appropriate use of environmental vocabulary, participation in the solutions activity, and ability to express ideas about conservation clearly.",
  homeworkIdeas: [
    "Research an environmental organization and prepare a presentation about their work", 
    "Design a poster promoting one specific environmental solution",
    "Conduct a 'mini-audit' of environmental practices at home and suggest three improvements"
  ],
  additionalResources: [
    {
      title: "National Geographic - Environment",
      url: "https://www.nationalgeographic.com/environment/"
    },
    {
      title: "UN Environment Programme",
      url: "https://www.unep.org/"
    }
  ]
};
