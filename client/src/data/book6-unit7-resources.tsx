// This file contains resources for Book 6, Unit 7 (What Your Body Can Do)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit7Resources = [
  {
    title: "Body Parts and Actions Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f89ab1eaa7a94989a92d31cd18e3d2b5",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f89ab1eaa7a94989a92d31cd18e3d2b5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Action Verbs Matching Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/9de06e0e4cc44c8da0cc2dc34a5ddeed",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9de06e0e4cc44c8da0cc2dc34a5ddeed?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Body Movement Vocabulary Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/YBdZbWjnDRY",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YBdZbWjnDRY?si=pGbSn3I_-xVdOD1q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Can/Can't Quiz Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/19c7c8c22a5c4a64b0ded3c9db6e6c1a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/19c7c8c22a5c4a64b0ded3c9db6e6c1a?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Lesson plan for Body Parts and Actions
export const bodyActionsLessonPlan = {
  id: "body-actions-lesson",
  title: "Body Parts and Physical Actions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to body parts and physical actions",
    "Practice describing what different body parts can do",
    "Develop language for explaining physical abilities",
    "Build speaking skills through movement-based activities"
  ],
  materials: [
    "Visual English Book 6, Unit 7 slides",
    "Body Parts and Actions Game",
    "Body Movement Vocabulary Video",
    "Action cards with body movements",
    "Blank body outline handouts"
  ],
  steps: [
    {
      title: "Warm-up: Simon Says",
      duration: "5 minutes",
      description: "Activate vocabulary through a movement game",
      instructions: [
        "Play 'Simon Says' using body parts and actions",
        "Examples: 'Simon says touch your nose', 'Simon says bend your knees'",
        "Once students are warmed up, increase the challenge with combinations",
        "Example: 'Simon says touch your nose with your left hand while standing on one foot'",
        "When students are eliminated, have them identify which body part or action they missed"
      ]
    },
    {
      title: "Body Parts Vocabulary Presentation",
      duration: "10 minutes",
      description: "Teach and reinforce vocabulary for body parts",
      materials: ["Visual English Book 6, Unit 7 slides", "Blank body outline handouts"],
      instructions: [
        "Present key body part vocabulary through the slides",
        "Include basic (head, arm, leg) and more specific parts (elbow, wrist, ankle, etc.)",
        "Have students label the blank body outline handouts",
        "Teach related adjectives: strong, flexible, stiff, weak, etc.",
        "Practice pronunciation paying attention to word stress and plural forms"
      ]
    },
    {
      title: "Action Verb Introduction",
      duration: "10 minutes",
      description: "Learn verbs associated with body movements",
      materials: ["Body Movement Vocabulary Video"],
      instructions: [
        "Show the Body Movement Vocabulary Video",
        "Have students mimic the actions as they watch",
        "After watching, list all the action verbs from the video on the board",
        "Categorize the verbs by body part (e.g., head: nod, shake; arms: wave, flex, etc.)",
        "Have students demonstrate each action for the class"
      ]
    },
    {
      title: "Interactive Game: Body Actions",
      duration: "10 minutes",
      description: "Practice matching body parts with actions",
      materials: ["Body Parts and Actions Game", "Action Verbs Matching Game"],
      instructions: [
        "Have students play the Body Parts and Actions Game",
        "Continue with the Action Verbs Matching Game",
        "Discuss which actions were easy or difficult to match",
        "Ask students to come up with additional actions for each body part",
        "Create a comprehensive chart of body parts and possible actions"
      ]
    },
    {
      title: "Ability Statements Practice",
      duration: "10 minutes",
      description: "Practice expressing physical abilities using 'can' and 'can't'",
      materials: ["Action cards with body movements"],
      instructions: [
        "Introduce the structure 'I can...' and 'I can't...' for describing abilities",
        "Distribute action cards with different body movements",
        "Students take turns drawing cards and making statements about their abilities",
        "Example: 'I can touch my toes' or 'I can't do a handstand'",
        "Encourage students to elaborate with adverbs: 'I can run quickly' or 'I can throw a ball far'",
        "For advanced students, add frequency adverbs: 'I can sometimes...', 'I can usually...'"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their appropriate use of body part vocabulary, ability to correctly match actions with body parts, and proper use of 'can' and 'can't' statements.",
  homeworkIdeas: [
    "Create a poster of the human body with labels and actions each part can perform", 
    "Write 10 sentences about physical abilities you have and 5 you would like to develop",
    "Record a short video demonstrating 5 physical actions and explaining them in English"
  ],
  additionalResources: [
    {
      title: "ESL Body Parts Activities",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/body"
    }
  ]
};

// Second lesson plan for Unit 7: Physical Abilities and Sports
export const physicalAbilitiesLessonPlan = {
  id: "physical-abilities-lesson",
  title: "Physical Abilities and Sports",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to physical abilities and limitations",
    "Practice using 'can', 'can't', 'able to', and 'unable to' correctly",
    "Connect physical abilities to sports and activities",
    "Develop language for describing athletic skills"
  ],
  materials: [
    "Visual English Book 6, Unit 7 slides",
    "Can/Can't Quiz Game",
    "Sports equipment pictures",
    "Sports ability questionnaire",
    "Videos of different sports"
  ],
  steps: [
    {
      title: "Warm-up: Physical Abilities Survey",
      duration: "5 minutes",
      description: "Engage students with a survey of physical abilities",
      materials: ["Sports ability questionnaire"],
      instructions: [
        "Distribute the sports ability questionnaire",
        "Students interview 2-3 classmates about their physical abilities",
        "Questions include: 'Can you swim?', 'Can you ride a bike?', 'Can you do a cartwheel?'",
        "Students take notes on their partners' answers",
        "Ask for volunteers to share interesting discoveries about their classmates"
      ]
    },
    {
      title: "Sports and Activities Vocabulary",
      duration: "10 minutes",
      description: "Present vocabulary related to sports and physical activities",
      materials: ["Visual English Book 6, Unit 7 slides", "Videos of different sports"],
      instructions: [
        "Show slides of different sports and physical activities",
        "Teach key vocabulary: swim, run, jump, climb, balance, throw, catch, kick, etc.",
        "Show brief videos of different sports in action",
        "Discuss what physical abilities are needed for each sport",
        "Create a chart linking sports to required physical abilities"
      ]
    },
    {
      title: "Grammar Focus: Can/Can't",
      duration: "10 minutes",
      description: "Focus on the correct usage of modal verbs for ability",
      instructions: [
        "Explain the grammar rules for using 'can' and 'can't' to express ability",
        "Demonstrate the sentence structure: Subject + can/can't + verb",
        "Introduce the formal alternatives: 'able to' and 'unable to'",
        "Practice forming questions: 'Can you...?' and short answers: 'Yes, I can.', 'No, I can't.'",
        "Have students create their own examples using sports vocabulary",
        "Highlight the difference between ability (can) and permission (may/allowed to)"
      ]
    },
    {
      title: "Interactive Activity: Can/Can't Quiz",
      duration: "10 minutes",
      description: "Reinforce grammar through interactive quiz",
      materials: ["Can/Can't Quiz Game"],
      instructions: [
        "Have students play the Can/Can't Quiz Game",
        "After the game, discuss any challenging questions",
        "Ask students to create their own quiz questions about abilities",
        "Have students exchange and answer each other's questions",
        "Review common errors in using 'can' and 'can't'"
      ]
    },
    {
      title: "Sports Equipment and Abilities",
      duration: "10 minutes",
      description: "Connect physical abilities to sports equipment",
      materials: ["Sports equipment pictures"],
      instructions: [
        "Show pictures of various sports equipment",
        "Students identify the equipment and what physical ability it requires",
        "Example: 'This is a tennis racket. You need to be able to swing and hit the ball.'",
        "Divide students into groups and assign each a sport",
        "Groups create a list of physical abilities needed for their sport",
        "Each group presents their sport and required abilities to the class",
        "Class discusses which sports have similar physical requirements"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of 'can/can't' structures, knowledge of sports vocabulary, and ability to accurately describe physical abilities required for different activities.",
  homeworkIdeas: [
    "Write a paragraph about your favorite sport and the physical abilities it requires", 
    "Create a physical ability profile for a famous athlete",
    "Make a list of 5 physical abilities you have, 5 you don't have, and 5 you want to develop"
  ],
  additionalResources: [
    {
      title: "ESL Sports Activities",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/sports"
    },
    {
      title: "Modal Verbs - Can/Can't",
      url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-can-could"
    }
  ]
};
