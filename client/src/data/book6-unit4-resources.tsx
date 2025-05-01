// This file contains resources for Book 6, Unit 4 (Animal Classification themed content)

export const book6Unit4Resources = [
  {
    title: "Animal Classification Song - Science Songs",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/4VixROiu8Qg",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/4VixROiu8Qg?si=IGYwf2OAfcTSrmK5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Animal Classification Wordwall Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/b8fdaeeaebd94b3a967f74bb089c4fb1",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b8fdaeeaebd94b3a967f74bb089c4fb1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Animal Groups Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/cbb7f7c79a734d7486a4305d4a7b4522",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/cbb7f7c79a734d7486a4305d4a7b4522?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Animal Characteristics Quiz",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/d32038b5e08a423db5e45bea20e3f991",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d32038b5e08a423db5e45bea20e3f991?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Vertebrate Classification Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/ba7c9ec7e68d499898a42c537c62cc7c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ba7c9ec7e68d499898a42c537c62cc7c?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Animal Group Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/dfc836366f9643b58ac49ead018e7512",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dfc836366f9643b58ac49ead018e7512?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Animal Characteristics Game",
    resourceType: "game" as const,
    provider: "Sheppardsoftware",
    sourceUrl: "https://www.sheppardsoftware.com/science/animals/games/animal-characteristics/",
    embedCode: ``
  }
];

// Lesson plan data for Animal Classification
export const animalClassificationLessonPlan = {
  id: "animal-classification-lesson",
  title: "Animal Classification",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to animal classification",
    "Understand the main vertebrate groups (mammals, birds, reptiles, amphibians, fish)",
    "Identify key characteristics of each animal group",
    "Practice describing and categorizing animals based on features"
  ],
  materials: [
    "Visual English Book 6, Unit 4 slides",
    "Animal Classification Song video",
    "Wordwall Animal Classification games",
    "Animal picture cards",
    "Classification chart"
  ],
  steps: [
    {
      title: "Warm-up: Animal Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge about animals",
      instructions: [
        "Ask students to name as many animals as they can",
        "Write their suggestions on the board",
        "Have students suggest ways to group the animals",
        "Introduce the concept of classification in science"
      ]
    },
    {
      title: "Vertebrate Groups Introduction",
      duration: "10 minutes",
      description: "Present the five main vertebrate groups and their characteristics",
      materials: ["Visual English Book 6, Unit 4 slides", "Classification chart"],
      instructions: [
        "Introduce the five vertebrate groups: mammals, birds, reptiles, amphibians, fish",
        "Present key vocabulary: vertebrate, invertebrate, warm-blooded, cold-blooded, etc.",
        "Show examples of animals from each group",
        "Create a classification chart showing key features of each group",
        "Practice pronunciation of scientific terms"
      ]
    },
    {
      title: "Video: Animal Classification Song",
      duration: "10 minutes",
      description: "Use music to reinforce animal classification concepts",
      materials: ["Animal Classification Song video"],
      instructions: [
        "Play the Animal Classification Song video",
        "Have students listen for key characteristics of each group",
        "Play again, encouraging students to sing along with the chorus",
        "After viewing, create a list of features mentioned for each group",
        "Discuss any new vocabulary from the video"
      ]
    },
    {
      title: "Classification Activity",
      duration: "10 minutes",
      description: "Practice classifying animals based on characteristics",
      materials: ["Animal picture cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute animal picture cards to each group",
        "Groups sort animals into the five vertebrate categories",
        "For each animal, groups must explain why it belongs in that category",
        "Include some challenging animals that may have unusual features",
        "Review as a class, discussing any disagreements"
      ]
    },
    {
      title: "Interactive Games: Animal Classification",
      duration: "10 minutes",
      description: "Reinforce learning through interactive games",
      materials: ["Wordwall Animal Classification games", "Vertebrate Classification Game"],
      instructions: [
        "Have students play the Animal Classification Wordwall game",
        "Follow with the Animal Groups Matching Game",
        "Finish with the Animal Characteristics Quiz to test knowledge",
        "Award points for correct answers and discuss any challenging questions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their correct use of classification vocabulary, ability to identify key characteristics of animal groups, and success in categorizing animals.",
  homeworkIdeas: [
    "Create a poster about one vertebrate group showing 5 examples and key characteristics", 
    "Research an unusual animal and write about why it belongs to its classification group",
    "Create a set of 'Animal Group' trading cards with facts about different animals"
  ],
  additionalResources: [
    {
      title: "National Geographic Kids - Animal Classification",
      url: "https://kids.nationalgeographic.com/animals"
    }
  ]
};

// Second lesson plan for Unit 4: Animal Adaptations and Habitats
export const animalAdaptationsLessonPlan = {
  id: "animal-adaptations-lesson",
  title: "Animal Adaptations and Habitats",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to animal adaptations and habitats",
    "Understand how animals adapt to their environments",
    "Connect animal features to survival advantages",
    "Practice describing environmental conditions and animal adaptations"
  ],
  materials: [
    "Visual English Book 6, Unit 4 slides",
    "Habitat pictures (desert, ocean, rainforest, arctic, etc.)",
    "Animal adaptation cards",
    "Habitat-animal matching worksheet"
  ],
  steps: [
    {
      title: "Warm-up: Animal Homes",
      duration: "5 minutes",
      description: "Introduce the concept of habitats",
      instructions: [
        "Show pictures of different habitats: desert, ocean, rainforest, arctic, etc.",
        "Ask students: 'What animals live in each habitat?'",
        "Create a list on the board of animals for each environment",
        "Introduce the term 'habitat' as an animal's natural home"
      ]
    },
    {
      title: "Adaptation Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to animal adaptations",
      materials: ["Visual English Book 6, Unit 4 slides"],
      instructions: [
        "Present vocabulary: adaptation, survive, camouflage, migration, hibernation, etc.",
        "Define 'adaptation' as a feature that helps an animal survive",
        "Show examples of physical adaptations: sharp teeth, thick fur, webbed feet, etc.",
        "Discuss behavioral adaptations: migration, hibernation, hunting in packs",
        "Practice using phrases like 'adapted to', 'helps the animal to', 'allows them to'"
      ]
    },
    {
      title: "Environment Challenges",
      duration: "10 minutes",
      description: "Understand survival challenges in different environments",
      materials: ["Habitat pictures"],
      instructions: [
        "Show habitat pictures one by one",
        "For each habitat, discuss:  ",
        "  - What challenges do animals face here? (heat, cold, finding food, etc.)",
        "  - What adaptations would help survive here?",
        "  - What animals are well-adapted to this environment?",
        "Create a cause-effect diagram for each habitat"
      ]
    },
    {
      title: "Adaptation Matching Activity",
      duration: "15 minutes",
      description: "Match animal adaptations to survival advantages",
      materials: ["Animal adaptation cards", "Habitat-animal matching worksheet"],
      instructions: [
        "Divide students into small groups",
        "Distribute animal adaptation cards (each showing an animal with a specific adaptation)",
        "Groups discuss how each adaptation helps the animal survive",
        "Complete the habitat-animal matching worksheet",
        "For each match, students write a sentence explaining the adaptation:  ",
        "  'The camel's hump helps it survive in the desert by storing fat for energy.'",
        "Share examples with the class"
      ]
    },
    {
      title: "Create-an-Animal Activity",
      duration: "5 minutes",
      description: "Apply understanding of adaptations creatively",
      instructions: [
        "Assign each student or pair a specific habitat",
        "Students imagine and draw an animal perfectly adapted to that habitat",
        "They must include and label at least 3 specific adaptations",
        "Volunteers present their animals to the class, explaining the adaptations"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their understanding of adaptation concepts, ability to connect animal features to survival benefits, and appropriate use of adaptation vocabulary.",
  homeworkIdeas: [
    "Research an animal with unusual adaptations and create a mini-poster", 
    "Write a short story about an animal using its adaptations to overcome a challenge",
    "Compare adaptations of two animals from the same habitat"
  ],
  additionalResources: [
    {
      title: "Animal Adaptations - National Geographic Kids",
      url: "https://kids.nationalgeographic.com/animals/animal-adaptation"
    },
    {
      title: "BBC Bitesize - Animal Adaptations",
      url: "https://www.bbc.co.uk/bitesize/topics/zvhhvcw/articles/zxg7y4j"
    }
  ]
};
