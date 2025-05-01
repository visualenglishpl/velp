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
