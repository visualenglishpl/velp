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
  }
];

// Lesson plan data for Holidays and Festivals
export const holidaysAndFestivalsLessonPlan = {
  id: "holidays-festivals-lesson",
  title: "Holidays and Festivals Around the World",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to celebrations, holidays, and festivals",
    "Explore cultural traditions from around the world",
    "Practice discussing special events and celebrations",
    "Develop cultural awareness and appreciation"
  ],
  materials: [
    "Visual English Book 7, Unit 15 slides",
    "World festivals video",
    "Unique holidays video",
    "Wordwall months of the year game",
    "Wordwall months matching game",
    "Calendar",
    "World map"
  ],
  steps: [
    {
      title: "Warm-up: Calendar of Celebrations",
      duration: "5 minutes",
      description: "Activate prior knowledge about holidays",
      instructions: [
        "Show a calendar and ask students to name holidays and celebrations they know",
        "Create a list of holidays by month on the board",
        "Ask students which holidays they personally celebrate"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to celebrations",
      instructions: [
        "Introduce vocabulary: festival, celebration, tradition, ceremony, custom, etc.",
        "Show images of different celebrations from around the world",
        "Practice pronunciation and have students repeat each term",
        "Use Visual English Book 7, Unit 15 slides to illustrate concepts"
      ]
    },
    {
      title: "Video: Unique Holidays and Festivals",
      duration: "10 minutes",
      description: "Watch videos about unusual celebrations around the world",
      materials: [
        "Weird Holidays Celebrated Around the World video",
        "Guess the festival video",
        "World map"
      ],
      instructions: [
        "Play the videos about unique festivals and holidays",
        "After each holiday is shown, locate the country on a world map",
        "Ask students to identify similarities and differences between celebrations",
        "Discuss which festival they would most like to attend and why"
      ]
    },
    {
      title: "Calendar Skills Activities",
      duration: "10 minutes",
      description: "Practice months, dates, and time expressions",
      materials: ["Wordwall months of the year game", "Wordwall months matching game"],
      instructions: [
        "Have students play the Wordwall months of the year game as a class",
        "Follow with the months matching game",
        "Practice saying dates for different holidays (e.g., 'Christmas is on December 25th')",
        "Review ordinal numbers and time expressions for talking about events"
      ]
    },
    {
      title: "Cultural Celebration Sharing",
      duration: "10 minutes",
      description: "Students share about their own cultural celebrations",
      instructions: [
        "Divide students into pairs or small groups",
        "Each student describes an important celebration from their culture or country",
        "Encourage them to explain when it happens, what people do, what food they eat, etc.",
        "Groups share the most interesting celebration they learned about with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use vocabulary related to celebrations, describe events using proper date formats, and demonstrate cultural awareness.",
  homeworkIdeas: [
    "Research an unusual holiday or festival not mentioned in class and prepare a short presentation", 
    "Create a calendar marking important celebrations from different cultures around the world"
  ],
  additionalResources: [
    {
      title: "Holidays Around the World",
      url: "https://www.timeanddate.com/holidays/"
    }
  ]
};
