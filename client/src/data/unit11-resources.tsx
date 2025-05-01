// This file contains resources for Book 7, Unit 11 (Natural Disasters themed content)

export const unit11Resources = [
  {
    title: "Natural Disasters: What to Know",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/v9KU5jxbIeQ",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v9KU5jxbIeQ?si=mNY5t6Aaq1mFxhXG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Natural Disasters for Kids",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/VlEg8MGHVOQ",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VlEg8MGHVOQ?si=LTDY3ZLIlhLzfajO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Natural Disasters Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/a1a4d4ffe0a747e3800e1c0532f48a34",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a1a4d4ffe0a747e3800e1c0532f48a34?themeId=1&templateId=11&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Extreme Weather Terms",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/d1c9dc45c25f4d53bda1e89f3b2c3b9d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d1c9dc45c25f4d53bda1e89f3b2c3b9d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Natural Disasters
export const naturalDisastersLessonPlan = {
  id: "natural-disasters-lesson",
  title: "Understanding Natural Disasters",
  duration: "50 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to natural disasters and extreme weather",
    "Understand causes and effects of different natural phenomena",
    "Develop safety awareness and emergency preparedness knowledge",
    "Practice discussing environmental phenomena in English"
  ],
  materials: [
    "Visual English Book 7, Unit 11 slides",
    "Natural Disasters video",
    "Natural Disasters for Kids video",
    "Wordwall Natural Disasters game",
    "Wordwall Extreme Weather game",
    "World map",
    "Emergency kit items (or pictures of them)"
  ],
  steps: [
    {
      title: "Warm-up: Disaster Knowledge",
      duration: "5 minutes",
      description: "Activate prior knowledge about natural disasters",
      instructions: [
        "Show images of various natural disasters",
        "Ask students to name each disaster in English",
        "Create a mind map on the board categorizing different types of disasters",
        "Discuss if students have experienced any natural disasters"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key disaster and emergency vocabulary",
      materials: ["Visual English Book 7, Unit 11 slides"],
      instructions: [
        "Introduce vocabulary: earthquake, tsunami, hurricane, tornado, flood, drought, etc.",
        "Present related emergency terms: evacuation, shelter, warning, etc.",
        "Practice pronunciation and have students repeat each term",
        "Show examples of each disaster type from the slides"
      ]
    },
    {
      title: "Video: Natural Disasters",
      duration: "15 minutes",
      description: "Watch informational videos about natural disasters",
      materials: ["Natural Disasters video", "Natural Disasters for Kids video", "World map"],
      instructions: [
        "Play the Natural Disasters video",
        "After watching, identify which disasters are most common in different regions",
        "Mark disaster-prone areas on a world map",
        "Play the Natural Disasters for Kids video focusing on safety tips",
        "Have students take notes on what to do during different emergencies"
      ]
    },
    {
      title: "Interactive Vocabulary Games",
      duration: "10 minutes",
      description: "Practice disaster vocabulary through games",
      materials: ["Wordwall Natural Disasters game", "Wordwall Extreme Weather game"],
      instructions: [
        "Have students play the Wordwall Natural Disasters vocabulary game as a class competition",
        "Continue with the Extreme Weather Terms game",
        "Award points for correct answers and discuss any challenging vocabulary"
      ]
    },
    {
      title: "Emergency Preparedness Discussion",
      duration: "10 minutes",
      description: "Learn about safety measures and emergency planning",
      materials: ["Emergency kit items or pictures"],
      instructions: [
        "Show items that should be in an emergency kit (or pictures)",
        "Discuss what to do during different types of natural disasters",
        "In small groups, have students create a simple emergency plan for a specific disaster",
        "Groups present their emergency plans to the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use disaster vocabulary, understand safety procedures, and communicate effectively about emergency situations.",
  homeworkIdeas: [
    "Research a famous historical natural disaster and write a short report", 
    "Create an emergency plan for your home and family",
    "Design an informational poster about a specific natural disaster"
  ],
  additionalResources: [
    {
      title: "National Geographic - Natural Disasters",
      url: "https://www.nationalgeographic.com/environment/natural-disasters/"
    }
  ]
};
