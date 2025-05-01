// This file contains resources for Book 7, Unit 14 (Climate Change themed content)

export const unit14Resources = [
  {
    title: "Migrants | Award-Winning CG Animated Short Film about Climate change",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/ugPJi8kMK8Q",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ugPJi8kMK8Q?si=aj_dlhbAyjFFNf0G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Climate Change Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/693f7afb993242929b59236c929717a5",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/693f7afb993242929b59236c929717a5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Climate Change
export const climateChangeLessonPlan = {
  id: "climate-change-lesson",
  title: "Climate Change Awareness",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to climate change and environmental issues",
    "Discuss causes and effects of climate change",
    "Understand the concept of migration due to environmental changes",
    "Develop critical thinking about sustainability and conservation"
  ],
  materials: [
    "Visual English Book 7, Unit 14 slides",
    "Migrants animated short film",
    "Wordwall Climate Change game",
    "Climate change vocabulary cards",
    "Discussion questions handout"
  ],
  steps: [
    {
      title: "Warm-up: Environmental Knowledge",
      duration: "5 minutes",
      description: "Activate prior knowledge about environmental issues",
      instructions: [
        "Ask students what they know about climate change",
        "Create a mind map on the board with their responses",
        "Discuss which environmental problems affect their local area"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key climate change vocabulary with visuals",
      materials: ["Climate change vocabulary cards", "Book 7, Unit 14 slides"],
      instructions: [
        "Introduce vocabulary: global warming, climate change, carbon footprint, renewable energy, etc.",
        "Discuss meanings and provide examples for each term",
        "Practice pronunciation and have students repeat each term",
        "Have students sort vocabulary into causes, effects, and solutions categories"
      ],
      teacherNotes: "Adjust vocabulary difficulty based on students' level"
    },
    {
      title: "Video: Migrants Animated Short",
      duration: "15 minutes",
      description: "Watch and discuss the animated film about climate migration",
      materials: ["Migrants animated short film", "Discussion questions handout"],
      instructions: [
        "Introduce the animated short film 'Migrants'",
        "Ask students to watch for specific themes or messages in the film",
        "Play the video",
        "After watching, discuss the main message and symbolism in the film",
        "Have students work in pairs to answer discussion questions",
        "Share responses as a class"
      ]
    },
    {
      title: "Climate Change Causes and Effects",
      duration: "10 minutes",
      description: "Analyze causes and effects of climate change",
      instructions: [
        "Divide the board into two sections: 'Causes' and 'Effects'",
        "Ask students to contribute ideas to each section",
        "Discuss the relationship between human activities and climate change",
        "Connect effects to the migration theme from the film"
      ]
    },
    {
      title: "Wordwall Game: Climate Change",
      duration: "5 minutes",
      description: "Reinforce vocabulary with interactive game",
      materials: ["Wordwall Climate Change game"],
      instructions: [
        "Play the Wordwall game as a class competition",
        "Divide students into teams and award points for correct answers",
        "Review any challenging vocabulary or concepts from the game"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their understanding of climate change vocabulary, ability to discuss environmental issues, and participation in class discussions.",
  homeworkIdeas: [
    "Research and write about one solution to climate change", 
    "Create a poster showing ways to reduce your carbon footprint"
  ],
  additionalResources: [
    {
      title: "NASA Climate Kids",
      url: "https://climatekids.nasa.gov/"
    }
  ]
};
