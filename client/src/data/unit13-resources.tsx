// This file contains resources for Book 7, Unit 13 (City Tour themed content)

export const unit13Resources = [
  {
    title: "10 Things to do in NEW YORK CITY WITH KIDS",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/Ceib2bv7BlA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ceib2bv7BlA?si=g7i3HSCPRzdhdsFx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Shops Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/411d9dcb9eb041b8b1be990c120d6931",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/411d9dcb9eb041b8b1be990c120d6931?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Places in the City",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/1b0157e89e6442009e1385bda1661fbf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1b0157e89e6442009e1385bda1661fbf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for City Tour
export const cityTourLessonPlan = {
  id: "city-tour-lesson",
  title: "Exploring the City",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to places in a city",
    "Practice giving and following directions",
    "Discuss city attractions and tourist destinations",
    "Develop skills for navigating in an urban environment"
  ],
  materials: [
    "Visual English Book 7, Unit 13 slides",
    "City map handouts",
    "New York City with Kids video",
    "Wordwall Places in the City game",
    "Wordwall Shops game",
    "Direction cards"
  ],
  steps: [
    {
      title: "Warm-up: City Places Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge about places in a city",
      instructions: [
        "Ask students what places they know in a city",
        "List different city locations on the board",
        "Group places by category: shopping, entertainment, services, etc."
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key city vocabulary with visuals",
      materials: ["Book 7, Unit 13 slides"],
      instructions: [
        "Introduce vocabulary: shopping mall, museum, library, cinema, restaurant, etc.",
        "For each location, discuss what people do there",
        "Practice pronunciation and have students repeat each term",
        "Review prepositions of place often used when giving directions"
      ],
      teacherNotes: "Compare differences between cities in different countries if appropriate"
    },
    {
      title: "Video: New York City",
      duration: "10 minutes",
      description: "Watch video about things to do in New York City with kids",
      materials: ["New York City with Kids video"],
      instructions: [
        "Introduce New York City briefly",
        "Play the video",
        "Ask students to note 3-5 places mentioned they'd like to visit",
        "Discuss what places students found interesting and why"
      ]
    },
    {
      title: "Map Navigation Activity",
      duration: "15 minutes",
      description: "Practice giving and following directions using a city map",
      materials: ["City map handouts", "Direction cards"],
      instructions: [
        "Distribute city map handouts to pairs of students",
        "Review direction vocabulary: turn left/right, go straight, across from, next to, etc.",
        "One student picks a starting point and destination from direction cards",
        "Student gives directions while partner follows on map",
        "Switch roles and repeat with new locations"
      ]
    },
    {
      title: "Interactive Games: City Places",
      duration: "5 minutes",
      description: "Play Wordwall games to reinforce city vocabulary",
      materials: ["Wordwall Places in the City game", "Wordwall Shops game"],
      instructions: [
        "Play the Wordwall games as a class or in small groups",
        "Review any challenging vocabulary",
        "Discuss which places students visit most often in their city"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use city vocabulary, give clear directions, and understand descriptions of urban locations.",
  homeworkIdeas: [
    "Create a tourist guide for your hometown with 5 must-visit places", 
    "Draw a map of your neighborhood and write directions from your home to three important locations"
  ],
  additionalResources: [
    {
      title: "ESL City Vocabulary Activities",
      url: "https://www.eslkidstuff.com/lesson-plans/city.html"
    }
  ]
};
