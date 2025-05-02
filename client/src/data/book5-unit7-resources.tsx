// This file contains resources for Book 5, Unit 7 (Get Well Soon themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit7Resources = [
  {
    title: "Illness Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/975eb210f1e7497a99932597106fc155",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/975eb210f1e7497a99932597106fc155?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Illness Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/e9585ed98c4a44ba8b39da310a3182be",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e9585ed98c4a44ba8b39da310a3182be?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Remedies Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/5dbae06551244c41af4e999eacae2536",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5dbae06551244c41af4e999eacae2536?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Health and Illness Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/8gTr9gAukIM",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8gTr9gAukIM?si=CbdvsqNz8BLFG0wr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Illness Vocabulary and Expressions
export const illnessVocabularyLessonPlan = {
  id: "illness-vocabulary-lesson",
  title: "Illness Vocabulary and Expressions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to common illnesses and symptoms",
    "Practice expressing how you feel when sick",
    "Develop language for describing health problems",
    "Build communication skills for health-related situations"
  ],
  materials: [
    "Visual English Book 5, Unit 7 slides",
    "Illness Vocabulary Games",
    "Health and Illness Video",
    "Illness picture cards",
    "Conversation prompt cards"
  ],
  steps: [
    {
      title: "Warm-up: Health Experiences",
      duration: "5 minutes",
      description: "Activate prior knowledge about illnesses and symptoms",
      instructions: [
        "Ask students: 'When was the last time you were sick? How did you feel?'",
        "Create a list of symptoms on the board as students mention them",
        "Introduce the topic of health and illness vocabulary",
        "Discuss common reasons people visit doctors"
      ]
    },
    {
      title: "Illness Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to common illnesses and symptoms",
      materials: ["Visual English Book 5, Unit 7 slides", "Illness picture cards"],
      instructions: [
        "Present common illnesses: cold, flu, fever, headache, stomachache, etc.",
        "Introduce symptom vocabulary: cough, sneeze, sore throat, runny nose, etc.",
        "Teach verbs for expressing feeling sick: ache, hurt, feel dizzy, feel nauseous, etc.",
        "Practice phrases: 'I have a ...', 'I feel ...', 'My ... hurts', etc."
      ]
    },
    {
      title: "Video: Health and Illness",
      duration: "10 minutes",
      description: "Watch a video about health problems and vocabulary",
      materials: ["Health and Illness Video"],
      instructions: [
        "Play the Health and Illness Video",
        "Ask students to note any new vocabulary they hear",
        "Pause to discuss specific illnesses and symptoms shown",
        "After watching, review key health vocabulary from the video"
      ]
    },
    {
      title: "Interactive Games: Illness Vocabulary",
      duration: "10 minutes",
      description: "Practice illness vocabulary through digital games",
      materials: ["Illness Vocabulary Games"],
      instructions: [
        "Have students play the Illness Vocabulary Games",
        "Encourage students to use complete sentences when describing illnesses",
        "Review any challenging vocabulary as a class",
        "Discuss which illnesses have similar symptoms"
      ]
    },
    {
      title: "At the Doctor's Conversation Practice",
      duration: "10 minutes",
      description: "Practice dialogues about feeling sick and visiting a doctor",
      materials: ["Conversation prompt cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute conversation prompt cards with different health scenarios",
        "One student plays the patient, the other plays the doctor",
        "Patients describe their symptoms using the vocabulary learned",
        "Doctors ask questions about symptoms and give advice",
        "Pairs practice their dialogues",
        "Volunteers perform their dialogues for the class",
        "Class discusses effective ways to describe health problems"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of illness vocabulary, ability to describe symptoms clearly, and participation in the doctor-patient role play.",
  homeworkIdeas: [
    "Write a dialogue between a patient and a doctor for a specific illness", 
    "Create an illustrated mini-dictionary of health problems and symptoms",
    "Research common illnesses in different seasons and write a short report"
  ],
  additionalResources: [
    {
      title: "ESL Health Vocabulary",
      url: "https://www.teach-this.com/resources/health"
    },
    {
      title: "Doctor-Patient Dialogue Examples",
      url: "https://www.thoughtco.com/dialogues-for-esl-students-going-to-the-doctor-1211328"
    }
  ]
};

// Second lesson plan for Unit 7: Remedies and Health Advice
export const remediesHealthAdviceLessonPlan = {
  id: "remedies-health-advice-lesson",
  title: "Remedies and Health Advice",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to treatments and remedies",
    "Practice giving health advice using should/shouldn't",
    "Develop language for discussing prevention of illness",
    "Build communication skills for offering sympathy and suggestions"
  ],
  materials: [
    "Visual English Book 5, Unit 7 slides",
    "Remedies Vocabulary Game",
    "Medicine cabinet pictures",
    "Health advice cards",
    "Get well card templates"
  ],
  steps: [
    {
      title: "Warm-up: Home Remedies",
      duration: "5 minutes",
      description: "Activate knowledge about treatments for illness",
      instructions: [
        "Ask students: 'What do you do when you have a cold?'",
        "Create a list of remedies and treatments on the board",
        "Discuss different approaches to treating common illnesses",
        "Introduce cultural variations in remedy approaches"
      ]
    },
    {
      title: "Remedies and Medicine Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to treatments and medications",
      materials: ["Visual English Book 5, Unit 7 slides", "Medicine cabinet pictures"],
      instructions: [
        "Present medicine vocabulary: pill, tablet, capsule, syrup, drops, ointment, etc.",
        "Introduce treatment verbs: take, apply, rest, stay in bed, drink fluids, etc.",
        "Teach home remedy vocabulary: hot tea with honey, chicken soup, steam inhalation, etc.",
        "Discuss medical professionals: doctor, nurse, pharmacist, specialist, etc."
      ]
    },
    {
      title: "Giving Health Advice",
      duration: "10 minutes",
      description: "Practice giving health advice using modal verbs",
      materials: ["Visual English Book 5, Unit 7 slides", "Health advice cards"],
      instructions: [
        "Introduce advice structures: 'You should...', 'You shouldn't...', 'You need to...', etc.",
        "Present health advice expressions: 'It's important to...', 'Make sure you...', 'Try to...', etc.",
        "Demonstrate with examples: 'You should rest', 'You shouldn't go to work', etc.",
        "Have students practice giving advice for different scenarios on health advice cards"
      ]
    },
    {
      title: "Interactive Game: Remedies Vocabulary",
      duration: "10 minutes",
      description: "Practice remedy vocabulary through a digital game",
      materials: ["Remedies Vocabulary Game"],
      instructions: [
        "Have students play the Remedies Vocabulary Game",
        "Encourage students to explain what each remedy is used for",
        "Review any challenging vocabulary as a class",
        "Discuss which remedies are most effective for different illnesses"
      ]
    },
    {
      title: "Get Well Soon Messages",
      duration: "10 minutes",
      description: "Practice writing and speaking sympathetic messages",
      materials: ["Get well card templates"],
      instructions: [
        "Introduce expressions of sympathy: 'I'm sorry to hear...', 'I hope you feel better soon', etc.",
        "Present get well wishes: 'Get well soon', 'Wishing you a speedy recovery', etc.",
        "Share examples of encouraging messages for sick friends",
        "Distribute get well card templates",
        "Students create get well messages for imaginary sick friends",
        "Include both sympathetic expressions and health advice",
        "Students share their messages with the class",
        "Discuss effective ways to show concern while giving helpful advice"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of remedy vocabulary, ability to give appropriate health advice using modal verbs, and composition of supportive get well messages.",
  homeworkIdeas: [
    "Create a health advice brochure for a common illness with remedies and prevention tips", 
    "Write a letter to a sick friend including expressions of sympathy and helpful advice",
    "Research traditional remedies from different cultures and present your findings"
  ],
  additionalResources: [
    {
      title: "ESL Health Advice Expressions",
      url: "https://www.englishclub.com/english-for-work/healthcare-giving-advice.htm"
    },
    {
      title: "Medical English Resources",
      url: "https://www.hospitalenglish.com/students-exercises/"
    }
  ]
};
