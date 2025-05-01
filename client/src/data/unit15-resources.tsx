// This file contains resources for Book 7, Unit 15 (Holidays and Festivals themed content)

export const unit15Resources = [
  {
    title: "Weird Holidays Celebrated Around the World || Unique Festivals",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/dk9-dNvApng",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dk9-dNvApng?si=I1CWY8crgQoGcabR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Guess the festival | Top 10 most famous festivals",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/Gn3qEebFMLc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Gn3qEebFMLc?si=xHSA-RlnQ_npy3ck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Months of the Year",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Months Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - World Celebrations",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Family Celebrations",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Holidays and Festivals
export const holidaysAndFestivalsLessonPlan = {
  id: "holidays-festivals-lesson",
  title: "Holidays and Festivals Around the World",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to holidays, festivals, and celebrations",
    "Explore cultural diversity through worldwide celebrations",
    "Practice describing events and traditions",
    "Develop awareness of cultural similarities and differences"
  ],
  materials: [
    "Visual English Book 7, Unit 15 slides",
    "Weird Holidays video",
    "Guess the Festival video",
    "Wordwall games (Months, World Celebrations, Family Celebrations)",
    "Calendar templates",
    "Festival flashcards"
  ],
  steps: [
    {
      title: "Warm-up: Celebration Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge about holidays and festivals",
      instructions: [
        "Ask students what holidays they celebrate in their cultures",
        "List different holidays and festivals on the board",
        "Group celebrations by type (religious, national, seasonal, etc.)"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to celebrations with visuals",
      materials: ["Festival flashcards", "Book 7, Unit 15 slides"],
      instructions: [
        "Introduce vocabulary: holiday, festival, celebration, parade, tradition, costume, etc.",
        "Show images of different festivals around the world",
        "Practice pronunciation and have students repeat each term",
        "Review months of the year and connect them to specific holidays"
      ],
      teacherNotes: "Emphasize both global celebrations and local/regional festivals"
    },
    {
      title: "Video: Unique Festivals Around the World",
      duration: "10 minutes",
      description: "Watch videos about unusual and famous festivals",
      materials: ["Weird Holidays video", "Guess the Festival video"],
      instructions: [
        "Introduce the videos about unusual and famous festivals",
        "Ask students to note 2-3 festivals they find interesting",
        "Play the videos",
        "After watching, discuss which festivals were most surprising or interesting",
        "Have students share which festivals they would like to attend and why"
      ]
    },
    {
      title: "Festival Description Activity",
      duration: "15 minutes",
      description: "Practice describing holidays and festivals",
      instructions: [
        "Divide students into small groups",
        "Assign each group a different festival or holiday",
        "Groups prepare a short presentation about their assigned celebration including:",
        "- When and where it takes place",
        "- What people do during the celebration",
        "- Special food, clothing, or traditions associated with it",
        "Each group presents their festival to the class"
      ]
    },
    {
      title: "Interactive Games: Celebrations",
      duration: "5 minutes",
      description: "Reinforce vocabulary with Wordwall games",
      materials: ["Wordwall games (Months, World Celebrations, Family Celebrations)"],
      instructions: [
        "Play the Wordwall games as class competitions",
        "Start with the Months of the Year game to review calendar vocabulary",
        "Continue with the celebrations games to reinforce festival vocabulary",
        "Award points for correct answers and discuss any challenging questions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to describe holidays/festivals, use celebration vocabulary correctly, and demonstrate cultural awareness in discussions.",
  homeworkIdeas: [
    "Create a calendar marking important celebrations throughout the year", 
    "Research and write about an unusual festival from another country"
  ],
  additionalResources: [
    {
      title: "UNESCO Intangible Cultural Heritage List",
      url: "https://ich.unesco.org/en/lists"
    }
  ]
};
