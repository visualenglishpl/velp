// This file contains resources for Book 7, Unit 8 (Musical Instruments themed content)

export const unit8Resources = [
  {
    title: "Musical Instruments Quiz",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/WV63aVMnyMA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WV63aVMnyMA?si=iicLZ4_-HXXjnJiF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Guess the Sound - Musical Instruments Quiz",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/tb0gHAzpQPE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tb0gHAzpQPE?si=01WXGLlOnyEFfrXy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Kahoot - Musical Instruments",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/music-instruments/60a322c4-b3a8-4c2d-9078-e877ca66ac23",
    embedCode: ""
  },
  {
    title: "Wordwall - Places of Entertainment",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/9e1962f07e5b4f6ab60abe28003ad348",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9e1962f07e5b4f6ab60abe28003ad348?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Music Instruments",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/a399888cbe8943ec97dabfb51b788af5",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a399888cbe8943ec97dabfb51b788af5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Artists and Musicians",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4e38eb1bea364cef87a813ce0c7d0482",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4e38eb1bea364cef87a813ce0c7d0482?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Types of Books",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/77bf2cabcab44344a2080c033914d8be",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/77bf2cabcab44344a2080c033914d8be?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Musical Instruments Vocabulary
export const musicalInstrumentsLessonPlan = {
  id: "musical-instruments-lesson",
  title: "Musical Instruments Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Identify and name common musical instruments in English",
    "Categorize instruments by their families (string, wind, percussion, etc.)",
    "Practice listening skills by identifying instruments by their sounds",
    "Use appropriate verbs to describe playing different instruments"
  ],
  materials: [
    "Visual English Book 7, Unit 8 slides",
    "Musical instrument flashcards",
    "Audio clips of different instruments",
    "'Musical Instruments Quiz' video",
    "Instrument family classification worksheets"
  ],
  steps: [
    {
      title: "Warm-up: Prior Knowledge",
      duration: "5 minutes",
      description: "Assess students' existing knowledge of musical instruments",
      instructions: [
        "Ask students if they play any musical instruments",
        "Elicit names of instruments they already know in English",
        "Create a mind map on the board organizing their responses"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Introduce key musical instrument vocabulary using Visual English slides and flashcards",
      materials: ["Musical instrument flashcards", "Book 7, Unit 8 slides"],
      instructions: [
        "Present instrument names with images",
        "Practice pronunciation with choral and individual repetition",
        "Teach the appropriate verb for each instrument: play the guitar, blow the trumpet, beat the drum, etc."
      ]
    },
    {
      title: "Instrument Families Classification",
      duration: "10 minutes",
      description: "Teach students how to categorize instruments into their families",
      materials: ["Classification worksheets"],
      instructions: [
        "Introduce the main instrument families: string, wind, brass, percussion, keyboard",
        "Students work in pairs to classify instruments into their respective families",
        "Review answers as a class"
      ],
      teacherNotes: "This activity helps students organize vocabulary in a meaningful way"
    },
    {
      title: "Sound Recognition Activity",
      duration: "15 minutes",
      description: "Students identify instruments by their sounds",
      materials: ["'Guess the Sound - Musical Instruments Quiz' video"],
      instructions: [
        "Play the video quiz, pausing after each instrument sound",
        "Students write down or say which instrument they think they heard",
        "Discuss answers and any challenging sounds",
        "Award points for correct answers to add a competitive element"
      ]
    },
    {
      title: "Wrap-up: Musical Preferences",
      duration: "5 minutes",
      description: "Students share their favorite instruments and discuss music preferences",
      instructions: [
        "Students complete the sentence: 'My favorite instrument is ___ because...'" ,
        "Discuss which instruments are common in different types of music and cultural contexts"
      ]
    }
  ],
  assessmentTips: "Assess students' ability to correctly identify instruments by name and sound, and their proper use of verbs for playing different instruments.",
  homeworkIdeas: [
    "Research an unusual musical instrument and prepare a short presentation", 
    "Write a paragraph about a famous musician and the instrument they play"
  ],
  additionalResources: [
    {
      title: "Musical Instruments Vocabulary Lists",
      url: "https://www.englishclub.com/vocabulary/music-instruments.htm"
    }
  ]
};

// Lesson plan data for Music and Entertainment
export const musicEntertainmentLessonPlan = {
  id: "music-entertainment-lesson",
  title: "Music and Entertainment Venues",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to entertainment venues",
    "Practice conversation skills for discussing music and entertainment preferences",
    "Develop listening comprehension through music-themed activities",
    "Use present simple and present continuous tenses in the context of entertainment"
  ],
  materials: [
    "Visual English Book 7, Unit 8 slides",
    "Images of different entertainment venues",
    "Conversation prompt cards",
    "Wordwall game - Places of Entertainment"
  ],
  steps: [
    {
      title: "Introduction to Entertainment Venues",
      duration: "10 minutes",
      description: "Introduce vocabulary for different places where people enjoy music and entertainment",
      materials: ["Venue flashcards", "Book 7, Unit 8 slides"],
      instructions: [
        "Present vocabulary: concert hall, theater, opera house, jazz club, stadium, etc.",
        "Discuss what kind of performances happen at each venue",
        "Practice pronunciation and appropriate prepositions (at a concert, in a theater)"
      ]
    },
    {
      title: "Entertainment Preferences Pair Work",
      duration: "10 minutes",
      description: "Students practice conversation about entertainment preferences",
      materials: ["Conversation prompt cards"],
      instructions: [
        "Distribute conversation cards with questions like 'Have you ever been to a concert?'",
        "Students interview each other in pairs using the prompts",
        "Share interesting findings with the whole class"
      ],
      teacherNotes: "Monitor for correct use of present perfect tense with 'ever' questions"
    },
    {
      title: "Interactive Game: Places of Entertainment",
      duration: "15 minutes",
      description: "Students play the Wordwall game to reinforce vocabulary",
      materials: ["Wordwall game - Places of Entertainment"],
      instructions: [
        "Demonstrate how to play the game",
        "Students take turns playing in small groups or as a whole class",
        "For each correct match, have students create a sentence using the term"
      ]
    },
    {
      title: "Cultural Discussion: Music Around the World",
      duration: "5 minutes",
      description: "Brief discussion about different musical traditions and venues around the world",
      instructions: [
        "Show images of unique performance venues from different cultures",
        "Discuss how music and entertainment vary across cultures",
        "Encourage students to share any experiences with music from different countries"
      ]
    },
    {
      title: "Wrap-up: Planning an Outing",
      duration: "5 minutes",
      description: "Students plan an imaginary entertainment outing",
      instructions: [
        "In pairs, students decide on an entertainment venue they would like to visit",
        "They prepare a few sentences about what they would see/hear there and why they chose it",
        "Share plans with the class if time permits"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their correct use of venue vocabulary and their ability to engage in meaningful conversations about entertainment preferences.",
  homeworkIdeas: [
    "Write a review of a concert, play, or other entertainment event you have attended", 
    "Research a famous entertainment venue and prepare a short presentation about it"
  ],
  additionalResources: [
    {
      title: "Entertainment Venue Vocabulary",
      url: "https://www.vocabulary.cl/english/places-entertainment.htm"
    }
  ]
};
