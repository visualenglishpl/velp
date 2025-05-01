// This file contains resources for Book 6, Unit 3 (Future themed content)

export const book6Unit3Resources = [
  {
    title: "What Will Happen - Future Tense",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/678492",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/678492" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Future - What Will You Do?",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/5aa489c7d8c24523a73d5ddc958bb415",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5aa489c7d8c24523a73d5ddc958bb415?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Future Tense Practice",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/53399cf8c14a468abc6ab84a193110f1",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/53399cf8c14a468abc6ab84a193110f1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Life in the Future",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/1920f9692e4c4619880faf22a4d1446c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1920f9692e4c4619880faf22a4d1446c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Future Tense and Predictions
export const futureTenseLessonPlan = {
  id: "future-tense-lesson",
  title: "Future Tense and Predictions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn and practice using 'will' for future predictions",
    "Understand the structure of future simple tense",
    "Develop vocabulary for discussing future events",
    "Make predictions about personal futures and world changes"
  ],
  materials: [
    "Visual English Book 6, Unit 3 slides",
    "What Will Happen video",
    "Wordwall Future Tense games",
    "Future prediction cards",
    "Timeline worksheet"
  ],
  steps: [
    {
      title: "Warm-up: The World Tomorrow",
      duration: "5 minutes",
      description: "Activate thinking about the future",
      instructions: [
        "Ask students: 'How do you think the world will be different in 20 years?'",
        "Write their ideas on the board using future tense structure",
        "Point out the use of 'will' in each sentence",
        "Discuss which predictions seem most likely and why"
      ]
    },
    {
      title: "Future Tense Structure",
      duration: "10 minutes",
      description: "Teach the grammar of future simple with 'will'",
      materials: ["Visual English Book 6, Unit 3 slides"],
      instructions: [
        "Present the structure: subject + will + verb (base form)",
        "Show examples for positive, negative, and question forms",
        "Contrast with present simple tense to highlight differences",
        "Practice transforming present tense sentences to future tense",
        "Focus on common time expressions: tomorrow, next week, in five years, etc."
      ]
    },
    {
      title: "Video: What Will Happen",
      duration: "10 minutes",
      description: "Watch video demonstrating future tense usage",
      materials: ["What Will Happen video"],
      instructions: [
        "Play the What Will Happen video",
        "Ask students to note examples of future tense used in the video",
        "Discuss the predictions made in the video",
        "Have students create their own similar predictions using the same structure"
      ]
    },
    {
      title: "Personal Future Timeline",
      duration: "10 minutes",
      description: "Create personal future predictions",
      materials: ["Timeline worksheet"],
      instructions: [
        "Distribute timeline worksheets with future time points (tomorrow, next week, next year, in 5 years, in 20 years)",
        "Students write predictions about their own lives at each point",
        "Encourage use of various verbs, not just 'be'",
        "In pairs, students share their timelines and ask follow-up questions",
        "Examples: 'I will graduate from university in 5 years.' 'I will travel to Japan next year.'"
      ]
    },
    {
      title: "Interactive Games: Future Tense Practice",
      duration: "10 minutes",
      description: "Reinforce future tense through games",
      materials: ["Wordwall Future Tense games", "Wordwall Life in the Future game"],
      instructions: [
        "Have students play the Future Tense Practice game",
        "Continue with Life in the Future to practice vocabulary",
        "Finish with What Will You Do? activity to personalize learning",
        "Award points for correct answers and discuss any challenging questions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their correct use of future tense structure, variety of predictions made, and participation in timeline and game activities.",
  homeworkIdeas: [
    "Write a paragraph about 'My Life in 2050' using at least 8 sentences with 'will'", 
    "Create 5 predictions about technology in the future",
    "Interview a family member about their future plans and write their responses"
  ],
  additionalResources: [
    {
      title: "Future Simple Tense - British Council",
      url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/will-and-would"
    }
  ]
};

// Second lesson plan for Unit 3: Future Plans and Intentions
export const futurePlansLessonPlan = {
  id: "future-plans-lesson",
  title: "Future Plans and Intentions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn and practice 'going to' for future plans and intentions",
    "Distinguish between 'will' and 'going to'",
    "Develop vocabulary for discussing plans and arrangements",
    "Practice talking about future events with different time expressions"
  ],
  materials: [
    "Visual English Book 6, Unit 3 slides",
    "Future forms comparison chart",
    "Plan cards with future activities",
    "Weekly planner worksheet",
    "Scenario cards"
  ],
  steps: [
    {
      title: "Warm-up: Weekend Plans",
      duration: "5 minutes",
      description: "Introduce 'going to' for planned future actions",
      instructions: [
        "Ask students: 'What are you going to do this weekend?'",
        "Write their answers on the board using 'going to'",
        "Point out the structure: subject + be + going to + verb (base form)",
        "Emphasize that 'going to' is used for plans already decided"
      ]
    },
    {
      title: "Future Forms Comparison",
      duration: "10 minutes",
      description: "Compare different ways to express future",
      materials: ["Visual English Book 6, Unit 3 slides", "Future forms comparison chart"],
      instructions: [
        "Present 'will' vs. 'going to' usage",
        "'Will' for predictions, spontaneous decisions, promises",
        "'Going to' for plans, intentions, evident future",
        "Show examples of each and have students identify the appropriate usage",
        "Add present continuous for arrangements ('I am meeting my friend tomorrow')"
      ]
    },
    {
      title: "Plans and Intentions Activity",
      duration: "10 minutes",
      description: "Practice using 'going to' for planned actions",
      materials: ["Plan cards with future activities"],
      instructions: [
        "Distribute plan cards with various activities",
        "Students move around the room asking each other about plans",
        "'Are you going to... this weekend/next month/next year?'",
        "Student with matching card responds: 'Yes, I'm going to...' or 'No, I'm not going to...'",
        "Students record who is doing what activity"
      ]
    },
    {
      title: "Weekly Planner Exercise",
      duration: "10 minutes",
      description: "Create and discuss a future schedule",
      materials: ["Weekly planner worksheet"],
      instructions: [
        "Distribute weekly planner worksheets",
        "Students fill in their real plans for the coming week",
        "Emphasize using 'going to' for plans and present continuous for arrangements",
        "In pairs, students interview each other about their plans",
        "Partners report back: 'On Monday, she is going to study English.'"
      ]
    },
    {
      title: "Future Forms Selection Game",
      duration: "10 minutes",
      description: "Practice choosing appropriate future forms",
      materials: ["Scenario cards"],
      instructions: [
        "Divide class into small teams",
        "Show scenario cards with different situations",
        "Teams choose the appropriate future form (will, going to, present continuous)",
        "Example: 'The sky is getting dark.' → 'It's going to rain.'",
        "'My friend needs help moving.' → 'I'll help you.'",
        "'My doctor appointment is on Friday.' → 'I'm seeing the doctor on Friday.'",
        "Award points for correct form selection and sentence formation"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their appropriate selection of future forms, correct grammatical structure, and ability to discuss plans in detail.",
  homeworkIdeas: [
    "Create a diary entry about your plans for next month using 'going to'", 
    "Write 10 sentences about your intentions for improving your English",
    "Create a dialogue between two friends discussing their future plans"
  ],
  additionalResources: [
    {
      title: "Future: going to - British Council",
      url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/going-to"
    },
    {
      title: "Talking about the Future - BBC Learning English",
      url: "https://www.bbc.co.uk/learningenglish/english/course/lower-intermediate/unit-10/session-1"
    }
  ]
};
