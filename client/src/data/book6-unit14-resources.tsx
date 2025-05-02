// This file contains resources for Book 6, Unit 14 (Are You a Survivor? themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit14Resources = [
  {
    title: "Survival Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/2ae89f748cba464fa7153978e294ef98",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2ae89f748cba464fa7153978e294ef98?themeId=1&templateId=37&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Survival Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/c9cc186823c946288c52e6160ceaeb37",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c9cc186823c946288c52e6160ceaeb37?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Survival ESL Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/837363",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/837363" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Survival Skills
export const survivalSkillsLessonPlan = {
  id: "survival-skills-lesson",
  title: "Survival Skills and Emergency Situations",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to survival and emergency situations",
    "Practice giving advice and instructions for emergency scenarios",
    "Develop language for describing survival skills and priorities",
    "Build confidence in discussing challenging situations"
  ],
  materials: [
    "Visual English Book 6, Unit 14 slides",
    "Survival scenario cards",
    "Survival Vocabulary Games",
    "Survival ESL Video Lesson",
    "Pictures of survival equipment"
  ],
  steps: [
    {
      title: "Warm-up: Survival Situations",
      duration: "5 minutes",
      description: "Activate knowledge about survival and emergency scenarios",
      instructions: [
        "Ask students: 'What are some emergency situations people might face?'",
        "List their ideas on the board (natural disasters, wilderness survival, etc.)",
        "Ask: 'What are the most important things to remember in an emergency?'",
        "Introduce the topic of survival skills and emergency preparedness"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to survival and emergencies",
      materials: ["Visual English Book 6, Unit 14 slides", "Pictures of survival equipment"],
      instructions: [
        "Introduce vocabulary: shelter, first aid kit, emergency, survival, rescue, etc.",
        "Present survival equipment and their uses (compass, flashlight, water purifier, etc.)",
        "Discuss survival priorities (shelter, water, food, etc.)",
        "Teach verb phrases: 'to build a shelter', 'to signal for help', 'to treat injuries', etc."
      ]
    },
    {
      title: "Video: Survival Situations",
      duration: "10 minutes",
      description: "Watch and analyze survival scenarios",
      materials: ["Survival ESL Video Lesson"],
      instructions: [
        "Play the Survival ESL Video Lesson",
        "Pause at key points to discuss vocabulary and situations",
        "Ask students to identify the main challenges in each scenario",
        "Discuss potential solutions using target vocabulary",
        "Note any additional useful phrases from the video"
      ]
    },
    {
      title: "Interactive Games: Survival Vocabulary",
      duration: "10 minutes",
      description: "Reinforce survival vocabulary through games",
      materials: ["Survival Vocabulary Games"],
      instructions: [
        "Have students play the Wordwall survival vocabulary games",
        "Encourage students to use complete sentences when answering",
        "Review any difficult vocabulary as a class",
        "Award points for correct answers and discuss any misunderstandings"
      ]
    },
    {
      title: "Survival Scenario Discussion",
      duration: "10 minutes",
      description: "Apply survival knowledge to scenario-based discussions",
      materials: ["Survival scenario cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute different survival scenario cards to each group",
        "Groups discuss what they would do in their scenario and create a survival plan",
        "Each group presents their scenario and plan to the class",
        "Other students can offer additional suggestions",
        "Teacher provides feedback on language use and practical ideas"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of survival vocabulary, ability to discuss emergency procedures logically, and participation in the scenario discussions.",
  homeworkIdeas: [
    "Create a survival kit checklist with explanations for each item", 
    "Write a short paragraph about a survival situation and how to handle it",
    "Research a real survival story and prepare to share it with the class"
  ],
  additionalResources: [
    {
      title: "Survival Vocabulary Guide",
      url: "https://www.vocabulary.com/lists/145691"
    },
    {
      title: "Emergency Preparedness Tips",
      url: "https://www.ready.gov/"
    }
  ]
};

// Second lesson plan for Unit 14: Natural Disasters and Emergencies
export const naturalDisastersLessonPlan = {
  id: "natural-disasters-lesson",
  title: "Natural Disasters and Emergency Response",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to different types of natural disasters",
    "Develop language for describing emergency responses and procedures",
    "Practice giving safety instructions and advice",
    "Build awareness of disaster preparedness"
  ],
  materials: [
    "Visual English Book 6, Unit 14 slides",
    "Natural disaster photos and videos",
    "Emergency procedure cards",
    "Safety instruction worksheets"
  ],
  steps: [
    {
      title: "Warm-up: Natural Disaster Knowledge",
      duration: "5 minutes",
      description: "Activate knowledge about different types of natural disasters",
      instructions: [
        "Show pictures of different natural disasters",
        "Ask students to identify each disaster type",
        "Create a list of natural disasters on the board",
        "Briefly discuss which disasters are common in different parts of the world"
      ]
    },
    {
      title: "Natural Disaster Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to disasters and their effects",
      materials: ["Visual English Book 6, Unit 14 slides", "Natural disaster photos and videos"],
      instructions: [
        "Present vocabulary: earthquake, flood, hurricane, tsunami, wildfire, etc.",
        "Teach associated verbs: 'to evacuate', 'to take shelter', 'to rescue', etc.",
        "Discuss disaster effects: power outage, property damage, displacement, etc.",
        "Show short video clips of different disasters and discuss using target vocabulary"
      ]
    },
    {
      title: "Emergency Procedures",
      duration: "10 minutes",
      description: "Learn and practice language for emergency procedures",
      materials: ["Emergency procedure cards"],
      instructions: [
        "Introduce common emergency procedures for different disasters",
        "Present imperative forms: 'Stay indoors', 'Move to higher ground', 'Take cover', etc.",
        "Distribute emergency procedure cards for different disasters",
        "Students take turns reading procedures aloud and explaining them",
        "Discuss why each procedure is important for safety"
      ]
    },
    {
      title: "Safety Instruction Writing",
      duration: "10 minutes",
      description: "Practice writing safety instructions for emergencies",
      materials: ["Safety instruction worksheets"],
      instructions: [
        "Divide students into pairs or small groups",
        "Assign each group a specific natural disaster",
        "Groups create a list of 5-7 safety instructions for their disaster",
        "Ensure students use imperative forms and appropriate vocabulary",
        "Provide assistance with grammar and vocabulary as needed"
      ]
    },
    {
      title: "Emergency Response Role-play",
      duration: "10 minutes",
      description: "Practice emergency communication through role-play",
      instructions: [
        "Divide students into pairs",
        "Assign roles: emergency official and civilian during a disaster",
        "Provide disaster scenario cards",
        "Pairs create and practice dialogues about emergency situations",
        "Have volunteers perform their role-plays for the class",
        "Provide feedback on language use and appropriate emergency response"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of disaster vocabulary, ability to give clear emergency instructions, and participation in the role-play activity.",
  homeworkIdeas: [
    "Create an emergency plan for your home and family", 
    "Research a major natural disaster and write about the emergency response",
    "Create a poster with safety tips for a specific type of natural disaster"
  ],
  additionalResources: [
    {
      title: "Natural Disasters Information",
      url: "https://www.nationalgeographic.org/encyclopedia/natural-disaster/"
    },
    {
      title: "Disaster Preparedness Guide",
      url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html"
    }
  ]
};
