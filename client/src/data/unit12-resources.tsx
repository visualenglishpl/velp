// This file contains resources for Book 7, Unit 12 (Healthy Lifestyle themed content)

export const unit12Resources = [
  {
    title: "ISL Collective - Burnout Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/1102668",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/1102668" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Wordwall - Should vs. Shouldn't Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/37bd90b81ab549adab6f3d3c074889ed",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/37bd90b81ab549adab6f3d3c074889ed?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Healthy vs. Unhealthy Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/ee74009d2b384b808714e36062a0801a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ee74009d2b384b808714e36062a0801a?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Healthy Lifestyle
export const healthyLifestyleLessonPlan = {
  id: "healthy-lifestyle-lesson",
  title: "Healthy Lifestyle Choices",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to healthy and unhealthy habits",
    "Practice using 'should' and 'shouldn't' for giving advice",
    "Understand the components of a balanced lifestyle",
    "Develop awareness of burnout and stress management"
  ],
  materials: [
    "Visual English Book 7, Unit 12 slides",
    "Healthy/unhealthy habits flashcards",
    "ISL Collective Burnout video",
    "Wordwall Should/Shouldn't game",
    "Wordwall Healthy/Unhealthy game",
    "Lifestyle advice worksheet"
  ],
  steps: [
    {
      title: "Warm-up: Lifestyle Discussion",
      duration: "5 minutes",
      description: "Activate prior knowledge about healthy and unhealthy habits",
      instructions: [
        "Ask students what they do to stay healthy",
        "Create two columns on the board: 'Healthy Habits' and 'Unhealthy Habits'",
        "Have students contribute ideas to each column"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key healthy lifestyle vocabulary with visuals",
      materials: ["Healthy/unhealthy habits flashcards", "Book 7, Unit 12 slides"],
      instructions: [
        "Introduce vocabulary related to health: exercise, balanced diet, sleep, stress, junk food, etc.",
        "Sort vocabulary into categories: diet, exercise, mental health, rest, etc.",
        "Practice pronunciation and have students repeat each term",
        "Have students categorize activities as healthy or unhealthy"
      ],
      teacherNotes: "Make sure to emphasize that balance is key - even healthy activities can become unhealthy in excess"
    },
    {
      title: "Should/Shouldn't for Advice",
      duration: "10 minutes",
      description: "Practice using modal verbs for giving health advice",
      materials: ["Lifestyle advice worksheet"],
      instructions: [
        "Explain how to use 'should' and 'shouldn't' for giving advice",
        "Model sentences: 'You should exercise regularly.' 'You shouldn't eat too much junk food.'",
        "Students complete worksheet sentences with appropriate advice",
        "In pairs, students take turns giving each other lifestyle advice using should/shouldn't"
      ]
    },
    {
      title: "Video: Burnout Awareness",
      duration: "10 minutes",
      description: "Watch ISL Collective video about burnout and discuss",
      materials: ["ISL Collective Burnout video"],
      instructions: [
        "Introduce the concept of burnout",
        "Play the video about burnout",
        "Ask comprehension questions about signs and causes of burnout",
        "Discuss strategies for avoiding burnout and managing stress"
      ]
    },
    {
      title: "Interactive Games: Health Choices",
      duration: "10 minutes",
      description: "Play Wordwall games to reinforce healthy vs. unhealthy choices",
      materials: ["Wordwall Should/Shouldn't game", "Wordwall Healthy/Unhealthy game"],
      instructions: [
        "Divide class into teams",
        "Play the Wordwall games as team competitions",
        "Award points for correct answers",
        "Discuss any challenging concepts that arise during the games"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use health vocabulary, give appropriate advice using should/shouldn't, and identify healthy versus unhealthy habits.",
  homeworkIdeas: [
    "Create a weekly health plan with daily goals for a balanced lifestyle", 
    "Write five pieces of advice for someone suffering from stress or burnout"
  ],
  additionalResources: [
    {
      title: "Healthy Lifestyle Resources for Teens",
      url: "https://kidshealth.org/en/teens/healthy-lifestyle.html"
    }
  ]
};
