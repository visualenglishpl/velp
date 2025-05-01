// This file contains resources for Book 7, Unit 11 (Natural Disasters themed content)

export const unit11Resources = [
  {
    title: "ISL Collective - Natural Disasters Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/718198",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/718198" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Wordwall - Natural Disaster",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kahoot - Visual English 7 Unit 11 Natural Disasters",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/visual-english-7-unit-11-natural-disasters/49b6cfd8-e8b3-479c-bda3-e2192412a301",
    embedCode: ""
  }
];

// Lesson plan data for Natural Disasters
export const naturalDisastersLessonPlan = {
  id: "natural-disasters-lesson",
  title: "Natural Disasters Vocabulary and Safety",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to different natural disasters",
    "Understand basic safety procedures during emergencies",
    "Practice describing causes and effects of natural disasters",
    "Develop disaster preparedness awareness"
  ],
  materials: [
    "Visual English Book 7, Unit 11 slides",
    "Natural disasters flashcards",
    "ISL Collective Natural Disasters video",
    "Wordwall Natural Disasters game",
    "Safety procedure handouts"
  ],
  steps: [
    {
      title: "Warm-up: Disasters Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge about different natural disasters",
      instructions: [
        "Ask students what natural disasters they know about",
        "Create a mind map on the board with different disaster types",
        "Briefly discuss which disasters are common in your region"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key natural disaster vocabulary with visuals",
      materials: ["Natural disaster flashcards", "Book 7, Unit 11 slides"],
      instructions: [
        "Introduce vocabulary: earthquake, flood, hurricane/typhoon, tornado, wildfire, volcanic eruption, etc.",
        "For each disaster, discuss what causes it and its effects",
        "Practice pronunciation and have students repeat each term",
        "Review related words: evacuate, shelter, emergency, warning, etc."
      ],
      teacherNotes: "Ensure you explain the difference between similar terms like hurricane/typhoon/cyclone based on region"
    },
    {
      title: "Video: Natural Disasters",
      duration: "10 minutes",
      description: "Watch ISL Collective video about natural disasters",
      materials: ["ISL Collective Natural Disasters video"],
      instructions: [
        "Introduce the video and what to watch for",
        "Play the video once",
        "Ask comprehension questions about the disasters shown",
        "Play again if needed, pausing to discuss key points"
      ]
    },
    {
      title: "Safety Procedures Activity",
      duration: "15 minutes",
      description: "Learn and practice safety procedures for different disasters",
      materials: ["Safety procedure handouts"],
      instructions: [
        "Divide students into small groups",
        "Assign each group a different natural disaster",
        "Groups read about safety procedures for their assigned disaster",
        "Groups create a safety poster or present a role-play showing proper safety measures",
        "Each group presents to the class"
      ]
    },
    {
      title: "Wordwall Game: Natural Disasters",
      duration: "5 minutes",
      description: "Reinforce vocabulary with interactive game",
      materials: ["Wordwall Natural Disasters game"],
      instructions: [
        "Play the Wordwall game as a class or in small groups",
        "Review any challenging vocabulary that appears in the game",
        "Discuss strategies for remembering the terms"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use disaster vocabulary, explain basic safety procedures, and participate in group activities.",
  homeworkIdeas: [
    "Create a family emergency plan for one type of natural disaster", 
    "Research a major natural disaster from history and write 5-7 sentences about its impact"
  ],
  additionalResources: [
    {
      title: "National Geographic Kids - Natural Disasters",
      url: "https://kids.nationalgeographic.com/science/topic/natural-disasters"
    }
  ]
};
