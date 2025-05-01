// This file contains resources for Book 7, Unit 13 (City Tour themed content)

export const unit13Resources = [
  {
    title: "City Tour of London",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/P9D2kkUMClE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/P9D2kkUMClE?si=RCZLXGQFf3KAD9Jz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "City Buildings and Places Vocabulary",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/dEB7_XH8K5o",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dEB7_XH8K5o?si=NrVWR2Qf9aw2ysPL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Places in the City",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/20c14a4f7eca49a58c75a4e5bc9e3141",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/20c14a4f7eca49a58c75a4e5bc9e3141?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - City Facilities Matching",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/e4df8a8d99e54721afcdafedaa90badf",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e4df8a8d99e54721afcdafedaa90badf?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for City Tour
export const cityTourLessonPlan = {
  id: "city-tour-lesson",
  title: "Exploring a City",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to city places and buildings",
    "Develop ability to give and follow directions",
    "Practice describing locations and city features",
    "Build skills for navigating urban environments"
  ],
  materials: [
    "Visual English Book 7, Unit 13 slides",
    "City Tour of London video",
    "City Buildings vocabulary video",
    "Wordwall Places in the City game",
    "Wordwall City Facilities Matching game",
    "City map (real or illustrated)",
    "Pictures of famous landmarks"
  ],
  steps: [
    {
      title: "Warm-up: My City",
      duration: "5 minutes",
      description: "Activate prior knowledge about cities",
      instructions: [
        "Ask students what city they live in or have visited",
        "Have them share what they like most about cities",
        "Create a list on the board of city places students mention",
        "Show pictures of famous city landmarks and have students identify them"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to city places",
      materials: ["Visual English Book 7, Unit 13 slides", "City map"],
      instructions: [
        "Introduce vocabulary: railway station, market square, hospital, fire station, etc.",
        "Show images of different city buildings and facilities",
        "Practice pronunciation and have students repeat each location name",
        "Point out locations on the city map and practice spatial prepositions (next to, across from, etc.)"
      ]
    },
    {
      title: "Video: City Tour",
      duration: "10 minutes",
      description: "Watch video tour of a major city",
      materials: ["City Tour of London video"],
      instructions: [
        "Play the City Tour of London video",
        "Ask students to note 5 important places they see",
        "After watching, create a list of the places mentioned by students",
        "Discuss which places are essential in every city and why"
      ]
    },
    {
      title: "City Buildings Vocabulary",
      duration: "10 minutes",
      description: "Learn specific vocabulary for different building types",
      materials: ["City Buildings and Places vocabulary video"],
      instructions: [
        "Play the City Buildings vocabulary video",
        "Have students take notes on new words",
        "After watching, practice using the words in sentences",
        "Create simple dialogues asking for and giving directions to these places"
      ]
    },
    {
      title: "Interactive Games",
      duration: "10 minutes",
      description: "Practice city vocabulary through games",
      materials: ["Wordwall Places in the City game", "Wordwall City Facilities Matching game"],
      instructions: [
        "Have students play the Places in the City vocabulary game in small groups",
        "Follow with the City Facilities Matching game",
        "Have students create simple sentences using the vocabulary from the games",
        "E.g., 'If you want to buy food, you go to the supermarket.'"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use city-related vocabulary, give clear directions, and describe locations using appropriate prepositions.",
  homeworkIdeas: [
    "Draw a map of your neighborhood marking important places",
    "Write directions from your home to school/work using appropriate vocabulary",
    "Create a tourist guide for a city you know well, describing 5 important places to visit"
  ],
  additionalResources: [
    {
      title: "Google Maps",
      url: "https://www.google.com/maps"
    }
  ]
};

// Second lesson plan for Unit 13: City Navigation and Directions
export const cityNavigationLessonPlan = {
  id: "city-navigation-lesson",
  title: "City Navigation and Directions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Master directional vocabulary and prepositions",
    "Learn to give and follow directions accurately",
    "Understand city maps and navigation symbols",
    "Practice role-play conversations about finding places in a city"
  ],
  materials: [
    "Visual English Book 7, Unit 13 slides",
    "City maps (printed for each student or pair)",
    "Direction vocabulary cards",
    "Role-play scenario cards",
    "Pictures of street signs and navigation symbols"
  ],
  steps: [
    {
      title: "Warm-up: Direction Words",
      duration: "5 minutes",
      description: "Review basic directional vocabulary",
      instructions: [
        "Use gestures to demonstrate: left, right, straight ahead, turn, etc.",
        "Have students repeat the words and mimic the gestures",
        "Show pictures of street signs and have students identify them",
        "Create a list of navigation words on the board"
      ]
    },
    {
      title: "Map Reading Skills",
      duration: "10 minutes",
      description: "Learn to interpret city maps and symbols",
      materials: ["City maps", "Visual English Book 7, Unit 13 slides"],
      instructions: [
        "Distribute city maps to students",
        "Explain common map symbols and legend items",
        "Teach vocabulary: block, intersection, crossroads, roundabout, etc.",
        "Have students identify key landmarks and features on their maps"
      ]
    },
    {
      title: "Direction Phrases Practice",
      duration: "10 minutes",
      description: "Build sentences for giving directions",
      materials: ["Direction vocabulary cards"],
      instructions: [
        "Introduce phrases: 'Go straight for two blocks', 'Turn left at the light', etc.",
        "Practice prepositions: across from, next to, between, on the corner of, etc.",
        "Distribute direction cards and have students create sentences",
        "Have students practice in pairs, taking turns giving directions"
      ]
    },
    {
      title: "Find Your Way Activity",
      duration: "15 minutes",
      description: "Practice giving and following directions with maps",
      materials: ["City maps", "Role-play scenario cards"],
      instructions: [
        "Divide students into pairs and distribute scenario cards",
        "Each card contains a starting point and destination on the map",
        "Student A must give directions while Student B follows on their map",
        "Student B should reach the correct destination following the directions",
        "Switch roles and repeat with different scenarios"
      ]
    },
    {
      title: "Real-Life Navigation Roleplay",
      duration: "5 minutes",
      description: "Practice complete dialogues for asking/giving directions",
      instructions: [
        "Model a dialogue: 'Excuse me, how do I get to the museum?' etc.",
        "Teach polite expressions: 'Could you tell me...?', 'Do you know where...?'",
        "In pairs, have students create and perform their own dialogues",
        "Invite a few pairs to present their dialogues to the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their accuracy in giving directions, proper use of prepositions, ability to follow directions on a map, and participation in role-play activities.",
  homeworkIdeas: [
    "Write directions from a local landmark to your home using at least 8 direction words", 
    "Create a simple map of your neighborhood with directions to 3 important places",
    "Record yourself giving directions to a famous place in your city"
  ],
  additionalResources: [
    {
      title: "Street View in Google Maps",
      url: "https://www.google.com/streetview/"
    },
    {
      title: "BBC Learning English - Asking for Directions",
      url: "https://www.bbc.co.uk/learningenglish/english/course/eiam/unit-5/session-1"
    }
  ]
};
