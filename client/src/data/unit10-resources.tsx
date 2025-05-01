// This file contains resources for Book 7, Unit 10 (Sports themed content)

export const unit10Resources = [
  {
    title: "Top 10 Strangest Sports in The World",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/Lsn8z-AJxFc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Lsn8z-AJxFc?si=uhd5NViyAbeKM3n3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Go, Play, Do Sports",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/29a03787b421456f827094e6b08363cc",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29a03787b421456f827094e6b08363cc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Sports Places",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/48a835075ae5459eb3dbb23e211f7019",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/48a835075ae5459eb3dbb23e211f7019?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Sports Equipment",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/2f85e31cefed4733a458f93e9c7352fb",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2f85e31cefed4733a458f93e9c7352fb?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Sports Places (Random Cards)",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/29de738cb6964006b5a15c86def52c2b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29de738cb6964006b5a15c86def52c2b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kahoot - Sport Places and Equipment",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/sport-places-and-equipment/b2205677-5c0b-43af-aacd-28af5751763e",
    embedCode: ""
  }
];

// Lesson plan data for Sports Vocabulary
export const sportsVocabularyLessonPlan = {
  id: "sports-vocabulary-lesson",
  title: "Sports Vocabulary and Collocations",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for different types of sports",
    "Master correct verb collocations with sports (play, do, go)",
    "Identify sports equipment and facilities",
    "Practice describing sports rules and procedures"
  ],
  materials: [
    "Visual English Book 7, Unit 10 slides",
    "Sports flashcards or images",
    "Wordwall game - Go, Play, Do Sports",
    "Wordwall game - Sports Equipment",
    "Sports collocations handout"
  ],
  steps: [
    {
      title: "Warm-up: Sports Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge of sports vocabulary",
      instructions: [
        "Ask students to name as many sports as they can in 1 minute",
        "Write their suggestions on the board, grouping by type",
        "Discuss which sports are popular in students' countries"
      ]
    },
    {
      title: "Vocabulary Introduction: Types of Sports",
      duration: "10 minutes",
      description: "Present sports vocabulary categorized by type and verb collocation",
      materials: ["Sports flashcards", "Book 7, Unit 10 slides"],
      instructions: [
        "Introduce sports with appropriate verbs: play tennis, do gymnastics, go swimming",
        "Explain the patterns for each verb category",
        "Practice pronunciation and use in simple sentences",
        "Highlight any exceptions to the general rules"
      ],
      teacherNotes: "Generally, we use 'play' with ball/team sports, 'do' with individual activities/combat sports, and 'go' with activities ending in -ing"
    },
    {
      title: "Interactive Practice: Verb Collocations",
      duration: "10 minutes",
      description: "Students practice verb-sport collocations using Wordwall game",
      materials: ["Wordwall game - Go, Play, Do Sports"],
      instructions: [
        "Demonstrate how to play the game",
        "Students match sports with their correct verbs",
        "After each match, create a full sentence: 'I play basketball on weekends'",
        "Discuss any challenging matches"
      ]
    },
    {
      title: "Sports Equipment and Facilities",
      duration: "15 minutes",
      description: "Teach vocabulary related to sports equipment and venues",
      materials: [
        "Sports equipment images", 
        "Wordwall game - Sports Equipment",
        "Wordwall game - Sports Places"
      ],
      instructions: [
        "Introduce equipment vocabulary for different sports",
        "Teach facility/venue vocabulary: stadium, court, field, pool, etc.",
        "Students match equipment and venues to appropriate sports",
        "Practice using prepositions with venues: at the stadium, on the court"
      ]
    },
    {
      title: "Wrap-up: Sports Survey",
      duration: "5 minutes",
      description: "Students survey classmates about sports preferences",
      instructions: [
        "Students ask 2-3 classmates: 'What sport do you play/do/go?'",
        "Report findings to the class using proper collocations",
        "Review key vocabulary covered in the lesson"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their correct use of verb collocations with sports and their ability to identify equipment and facilities.",
  homeworkIdeas: [
    "Write a paragraph about your favorite sport including equipment, venue, and key vocabulary", 
    "Create a sports matching quiz with 10 items for classmates to solve"
  ],
  additionalResources: [
    {
      title: "Sports Vocabulary Resources",
      url: "https://www.eslflow.com/Sportlesson-plans.html"
    }
  ]
};

// Lesson plan data for Unusual Sports
export const unusualSportsLessonPlan = {
  id: "unusual-sports-lesson",
  title: "Unusual Sports Around the World",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn about unusual sports from different cultures",
    "Practice descriptive language for sports rules and equipment",
    "Develop listening comprehension through video activities",
    "Compare and contrast familiar and unusual sports"
  ],
  materials: [
    "Visual English Book 7, Unit 10 slides",
    "'Top 10 Strangest Sports in The World' video",
    "Unusual sports fact cards",
    "World map to locate countries of origin"
  ],
  steps: [
    {
      title: "Introduction: What Makes a Sport?",
      duration: "5 minutes",
      description: "Discuss the definition of sports and what makes activities qualify as sports",
      instructions: [
        "Ask: 'What makes something a sport?'",
        "Elicit key elements: competition, physical activity, rules, etc.",
        "Briefly introduce the concept of unusual or regional sports"
      ]
    },
    {
      title: "Video Activity: Strangest Sports",
      duration: "15 minutes",
      description: "Watch and discuss video showing unusual sports from around the world",
      materials: ["'Top 10 Strangest Sports in The World' video", "Note-taking sheet"],
      instructions: [
        "Distribute note-taking sheets for students to record key information",
        "Play the video, pausing after each sport",
        "Ask comprehension questions: 'Where is this sport from? What are the rules?'",
        "Locate each sport's country of origin on a world map"
      ],
      teacherNotes: "The video provides excellent visuals, but you may need to simplify some explanations"
    },
    {
      title: "Comparative Discussion",
      duration: "10 minutes",
      description: "Compare unusual sports with more familiar ones",
      materials: ["Unusual sports fact cards"],
      instructions: [
        "Divide class into small groups",
        "Distribute unusual sports fact cards, one per group",
        "Groups identify similarities and differences with mainstream sports",
        "Share findings using comparative language: 'Unlike football, this sport...'"
      ]
    },
    {
      title: "Creative Activity: Invent a Sport",
      duration: "10 minutes",
      description: "Students create their own unusual sport",
      instructions: [
        "In pairs, students invent a new sport with unique rules",
        "They must name it, describe equipment needed, explain basic rules",
        "Encourage creativity while using proper sports vocabulary",
        "Prepare a brief presentation of their sport"
      ]
    },
    {
      title: "Wrap-up: Sport Presentations",
      duration: "5 minutes",
      description: "Share invented sports with the class",
      instructions: [
        "2-3 pairs present their invented sports",
        "Class votes on the most interesting or creative sport",
        "Review unusual sports vocabulary from the lesson"
      ]
    }
  ],
  assessmentTips: "Assess students on their comprehension of the video, their use of descriptive language for sports, and their creativity in the sport invention activity.",
  homeworkIdeas: [
    "Research an unusual sport not covered in class and create an informative poster", 
    "Write rules for the invented sport in a step-by-step format"
  ],
  additionalResources: [
    {
      title: "Unusual Sports Around the World",
      url: "https://www.britannica.com/list/10-unusual-sports"
    }
  ]
};
