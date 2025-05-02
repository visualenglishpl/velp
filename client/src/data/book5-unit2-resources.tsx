// This file contains resources for Book 5, Unit 2 (Household Chores themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit2Resources = [
  {
    title: "Chores Millionaire Quiz Game",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/WVxO30fMfO8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WVxO30fMfO8?si=Brb3f9p1-RR51MO1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Household Chores Verbs Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/dacca5129a4a46ae9e0a9c0578a1ba12",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dacca5129a4a46ae9e0a9c0578a1ba12?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Household Chores Tools Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Household Chores Tools Video",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/249611",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/249611" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Household Chores
export const householdChoresLessonPlan = {
  id: "household-chores-lesson",
  title: "Household Chores and Responsibilities",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to common household chores",
    "Practice describing household responsibilities and routines",
    "Develop language for discussing frequency and preferences",
    "Build speaking skills through chore-related conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 2 slides",
    "Chores Millionaire Quiz Game video",
    "Household Chores Verbs Game",
    "Chores picture cards",
    "Frequency adverbs chart"
  ],
  steps: [
    {
      title: "Warm-up: Household Responsibilities",
      duration: "5 minutes",
      description: "Activate prior knowledge about household chores",
      instructions: [
        "Ask students: 'What chores do you do at home?'",
        "Create a list of household chores on the board",
        "Categorize chores by location (kitchen, bathroom, bedroom, etc.)",
        "Ask students which chores they like/dislike and why"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to household chores",
      materials: ["Visual English Book 5, Unit 2 slides", "Chores picture cards"],
      instructions: [
        "Introduce chore verbs: wash, clean, sweep, mop, vacuum, dust, etc.",
        "Show pictures of various household chores and elicit vocabulary",
        "Teach collocations: 'do the dishes', 'make the bed', 'take out the trash', etc.",
        "Practice chore vocabulary with simple sentences: 'I wash the dishes every day.'"
      ]
    },
    {
      title: "Video: Chores Millionaire Quiz",
      duration: "10 minutes",
      description: "Reinforce vocabulary through an interactive quiz video",
      materials: ["Chores Millionaire Quiz Game video"],
      instructions: [
        "Play the Chores Millionaire Quiz Game video",
        "Pause after each question to allow students to answer",
        "Discuss the correct answers and clarify any vocabulary confusion",
        "Keep score to make the activity more engaging"
      ]
    },
    {
      title: "Interactive Games: Household Chores Vocabulary",
      duration: "10 minutes",
      description: "Practice chores vocabulary through digital games",
      materials: ["Household Chores Verbs Game"],
      instructions: [
        "Have students play the Household Chores Verbs Game",
        "Encourage students to use the verbs in complete sentences",
        "Review any difficult vocabulary together",
        "Discuss which chores use similar actions or tools"
      ]
    },
    {
      title: "Chore Frequency and Responsibility Discussion",
      duration: "10 minutes",
      description: "Practice discussing how often chores are done and who does them",
      materials: ["Frequency adverbs chart"],
      instructions: [
        "Introduce frequency adverbs: always, usually, often, sometimes, rarely, never",
        "Model sentences: 'I always make my bed in the morning', 'My brother never does the dishes'",
        "Divide students into pairs to discuss their household responsibilities",
        "Have pairs create 5 sentences about their chore routines using frequency adverbs",
        "Ask volunteers to share their sentences with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of household chore vocabulary, ability to discuss frequency using appropriate adverbs, and participation in pair discussions.",
  homeworkIdeas: [
    "Create a weekly chore schedule showing which family members do which chores and when", 
    "Write a paragraph comparing household responsibilities in your family",
    "Interview a family member about which chores they do and how often"
  ],
  additionalResources: [
    {
      title: "ESL Household Chores Vocabulary",
      url: "https://www.eslprintables.com/vocabulary_worksheets/the_house/household_chores/"
    },
    {
      title: "Frequency Adverbs Guide",
      url: "https://www.englishclub.com/grammar/adverbs-frequency.htm"
    }
  ]
};

// Second lesson plan for Unit 2: Household Tools and Equipment
export const householdToolsLessonPlan = {
  id: "household-tools-lesson",
  title: "Household Tools and Equipment",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to household tools and cleaning equipment",
    "Understand how to describe the function and use of different tools",
    "Practice giving instructions for household tasks",
    "Build language skills for explaining processes and procedures"
  ],
  materials: [
    "Visual English Book 5, Unit 2 slides",
    "Household Chores Tools Game",
    "Household Chores Tools Video",
    "Tool picture cards",
    "Task instruction worksheets"
  ],
  steps: [
    {
      title: "Warm-up: Tools Identification",
      duration: "5 minutes",
      description: "Activate knowledge about household tools and equipment",
      instructions: [
        "Show pictures of common household tools and cleaning equipment",
        "Ask students to identify each item and what it's used for",
        "Create a list of tools and equipment on the board",
        "Ask students which tools they use at home"
      ]
    },
    {
      title: "Tools Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to household tools and their uses",
      materials: ["Visual English Book 5, Unit 2 slides", "Tool picture cards"],
      instructions: [
        "Introduce cleaning tools: vacuum cleaner, mop, broom, dustpan, sponge, etc.",
        "Present kitchen tools: dishwasher, mixer, blender, microwave, etc.",
        "Teach laundry equipment: washing machine, dryer, iron, clothesline, etc.",
        "Discuss the function of each tool using sentences with 'used for' or 'used to'"
      ]
    },
    {
      title: "Video: Household Tools",
      duration: "10 minutes",
      description: "Watch and learn about household tools and their uses",
      materials: ["Household Chores Tools Video"],
      instructions: [
        "Play the Household Chores Tools Video",
        "Ask students to note any new tools they see",
        "Pause to discuss how each tool is used",
        "Have students practice sentences: 'A vacuum cleaner is used to clean the carpet.'"
      ]
    },
    {
      title: "Interactive Game: Household Tools",
      duration: "10 minutes",
      description: "Practice tool vocabulary through a digital game",
      materials: ["Household Chores Tools Game"],
      instructions: [
        "Have students play the Household Chores Tools Game",
        "Encourage students to use complete sentences when identifying tools",
        "Review any difficult vocabulary as a class",
        "Discuss which tools serve similar purposes or functions"
      ]
    },
    {
      title: "Task Instructions Activity",
      duration: "10 minutes",
      description: "Practice giving instructions for household tasks",
      materials: ["Task instruction worksheets"],
      instructions: [
        "Introduce language for instructions: 'First', 'Then', 'Next', 'Finally', etc.",
        "Model how to give clear instructions for a simple household task",
        "Divide students into pairs and assign each pair a household task",
        "Pairs write step-by-step instructions for completing their task using the proper tools",
        "Volunteers present their instructions to the class",
        "Other students guess which household task is being described"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of tool vocabulary, ability to explain tool functions, and clarity in giving task instructions.",
  homeworkIdeas: [
    "Create an illustrated guide for how to complete a household chore using the proper tools", 
    "Write instructions for using a household appliance or tool",
    "Compare traditional cleaning tools with modern appliances that serve the same purpose"
  ],
  additionalResources: [
    {
      title: "Household Tools ESL Resources",
      url: "https://www.teach-this.com/resources/home"
    },
    {
      title: "Giving Instructions Language Guide",
      url: "https://www.englishclub.com/vocabulary/giving-instructions.htm"
    }
  ]
};
