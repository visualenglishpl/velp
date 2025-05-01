// This file contains resources for Book 7, Unit 12 (Healthy Lifestyle themed content)

export const unit12Resources = [
  {
    title: "Healthy Lifestyle | 7 Habits of Happy & Healthy People",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/yFcvSz0AEJw",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yFcvSz0AEJw?si=iXwK1DzpbsXixSWB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Healthy vs Unhealthy Food Challenge",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/_Yt0W3nZ1hc",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_Yt0W3nZ1hc?si=sQXELz9a95RGe4mK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Healthy Lifestyle Vocabulary",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/bf2b1f1c5f784a9f9d0ce5a41ea71a13",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bf2b1f1c5f784a9f9d0ce5a41ea71a13?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Healthy vs Unhealthy Foods",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/09d64b12bed34c3b9c10b83a5a53c4b4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/09d64b12bed34c3b9c10b83a5a53c4b4?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Healthy Lifestyle
export const healthyLifestyleLessonPlan = {
  id: "healthy-lifestyle-lesson",
  title: "Promoting a Healthy Lifestyle",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to health, fitness, and nutrition",
    "Understand components of a healthy lifestyle",
    "Compare healthy and unhealthy habits",
    "Develop basic health communication skills"
  ],
  materials: [
    "Visual English Book 7, Unit 12 slides",
    "Healthy Lifestyle video",
    "Healthy vs Unhealthy Food Challenge video",
    "Wordwall Healthy Lifestyle game",
    "Wordwall Healthy vs Unhealthy Foods game",
    "Food pyramid diagram",
    "Pictures of various activities and foods"
  ],
  steps: [
    {
      title: "Warm-up: Health Check",
      duration: "5 minutes",
      description: "Activate prior knowledge about healthy habits",
      instructions: [
        "Ask students to rate their own lifestyle on a scale of 1-10",
        "Have them share one healthy and one unhealthy habit they have",
        "Create two columns on the board: 'Healthy Habits' and 'Unhealthy Habits'",
        "Add student examples to the appropriate columns"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to health and fitness",
      materials: ["Visual English Book 7, Unit 12 slides"],
      instructions: [
        "Introduce vocabulary: nutrition, exercise, balanced diet, hydration, etc.",
        "Show images representing different healthy activities and foods",
        "Practice pronunciation and have students repeat key terms",
        "Categorize vocabulary into groups: nutrition, exercise, mental health, etc."
      ]
    },
    {
      title: "Video: Healthy Lifestyle Habits",
      duration: "10 minutes",
      description: "Watch video about creating healthy habits",
      materials: ["Healthy Lifestyle video"],
      instructions: [
        "Play the Healthy Lifestyle video",
        "Ask students to take notes on the 7 habits mentioned",
        "After watching, create a mind map of the 7 habits on the board",
        "Discuss which habits students already practice and which they could adopt"
      ]
    },
    {
      title: "Healthy Food Choices",
      duration: "10 minutes",
      description: "Learn about nutrition and making good food choices",
      materials: ["Healthy vs Unhealthy Food Challenge video", "Food pyramid diagram"],
      instructions: [
        "Display a food pyramid and discuss food groups",
        "Play the Healthy vs Unhealthy Food Challenge video",
        "Pause periodically and have students identify healthy alternatives",
        "After watching, have students create a one-day healthy meal plan"
      ]
    },
    {
      title: "Interactive Games",
      duration: "10 minutes",
      description: "Practice health vocabulary through interactive games",
      materials: ["Wordwall Healthy Lifestyle game", "Wordwall Healthy vs Unhealthy Foods game"],
      instructions: [
        "Have students play the Healthy Lifestyle vocabulary game in pairs",
        "Follow with the Healthy vs Unhealthy Foods sorting game",
        "Award points for correct answers and discuss any challenging concepts"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use health-related vocabulary, identify healthy choices, and explain components of a healthy lifestyle.",
  homeworkIdeas: [
    "Keep a food and activity journal for three days", 
    "Create a poster promoting three healthy habits with illustrations",
    "Research traditional healthy foods from different cultures"
  ],
  additionalResources: [
    {
      title: "World Health Organization - Healthy Living",
      url: "https://www.who.int/health-topics/healthy-lifestyle"
    }
  ]
};

// Second lesson plan for Unit 12: Fitness and Exercise
export const fitnessExerciseLessonPlan = {
  id: "fitness-exercise-lesson",
  title: "Fitness and Exercise",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to physical activities and sports",
    "Understand the importance of regular exercise",
    "Practice describing different fitness activities",
    "Develop language for discussing exercise preferences and routines"
  ],
  materials: [
    "Visual English Book 7, Unit 12 slides",
    "Pictures of various physical activities and sports",
    "Exercise routine cards or handouts",
    "Simple fitness equipment (optional)",
    "Fitness routine videos (short clips)"
  ],
  steps: [
    {
      title: "Warm-up: Physical Activity Survey",
      duration: "5 minutes",
      description: "Assess student exercise habits and preferences",
      instructions: [
        "Ask students to stand up and stretch",
        "Conduct a quick survey: 'Who exercises every day?' 'Who plays sports?' etc.",
        "Have students briefly share their favorite physical activities",
        "Create a class chart showing popular activities"
      ]
    },
    {
      title: "Vocabulary Building",
      duration: "10 minutes",
      description: "Introduce fitness and exercise terminology",
      materials: ["Visual English Book 7, Unit 12 slides", "Pictures of activities"],
      instructions: [
        "Present vocabulary: cardio, strength training, flexibility, endurance, etc.",
        "Show images of different exercise types and sports",
        "Practice pronunciation and have students repeat each term",
        "Group exercises by type (team sports, individual activities, gym exercises)"
      ]
    },
    {
      title: "Benefits of Exercise Discussion",
      duration: "10 minutes",
      description: "Explore why physical activity is important",
      instructions: [
        "Brainstorm benefits of regular exercise (health, mood, energy, etc.)",
        "Create a mind map on the board with different benefits",
        "Have students construct sentences using 'Exercise helps/improves/prevents...'",
        "Discuss consequences of inactivity or sedentary lifestyle"
      ]
    },
    {
      title: "Exercise Routine Creation",
      duration: "15 minutes",
      description: "Design personalized fitness routines",
      materials: ["Exercise routine cards", "Fitness videos"],
      instructions: [
        "Show short clips of different exercise routines",
        "Distribute exercise routine cards with various activities",
        "In pairs, have students create a weekly exercise plan",
        "Include variety of activities (strength, cardio, flexibility, etc.)",
        "Students present their routines to the class using target vocabulary"
      ]
    },
    {
      title: "Mini Movement Break",
      duration: "5 minutes",
      description: "Practice giving and following exercise instructions",
      materials: ["Simple fitness equipment (optional)"],
      instructions: [
        "Have students stand up and clear space around them",
        "Teach simple exercise instruction phrases",
        "Students take turns leading the class in a simple exercise",
        "Practice language like 'bend your knees', 'stretch your arms', etc."
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of exercise-related vocabulary, ability to discuss fitness benefits, and participation in the exercise routine planning activity.",
  homeworkIdeas: [
    "Track physical activities for one week in an exercise journal", 
    "Research a sport or exercise not discussed in class and create a presentation",
    "Design a poster promoting the benefits of regular exercise"
  ],
  additionalResources: [
    {
      title: "Physical Activity Guidelines - World Health Organization",
      url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
    }
  ]
};
