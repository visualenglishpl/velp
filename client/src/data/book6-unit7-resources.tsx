// Resources for Book 6, Unit 7 - What Your Body Can Do

import { LessonPlan } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const bodyPartsLessonPlan: LessonPlan = {
  id: 'book6-unit7-body-parts',
  title: 'Internal and External Body Parts',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Identify and name internal and external body parts',
    'Describe the function of major body parts and organs',
    'Use appropriate possessive forms when discussing body parts'
  ],
  materials: [
    'Visual English Book 6, Unit 7',
    'Digital projector or interactive whiteboard',
    'Body parts flashcards or diagrams',
    'Handout with labeled body diagrams',
    'Colored pencils or markers'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about the human body',
      instructions: [
        'Play a quick game of "Simon Says" focusing on external body parts',
        'Ask students to point to different parts of their bodies',
        'Have students share what they know about internal body organs'
      ]
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Introduce key body part vocabulary using Visual English materials',
      instructions: [
        'Present external and internal body part vocabulary using Visual English slides',
        'Group vocabulary by systems: digestive, respiratory, circulatory, etc.',
        'Model correct pronunciation and have students repeat',
        'Explain the function of major organs and body parts'
      ]
    },
    {
      title: 'Labeling Activity',
      duration: '10 minutes',
      description: 'Reinforce vocabulary through a diagram labeling exercise',
      instructions: [
        'Distribute body diagram handouts',
        'Have students work in pairs to label as many body parts as they can',
        'Review the labels as a class',
        'Add information about the function of each labeled part'
      ]
    },
    {
      title: 'Body Systems Presentation',
      duration: '15 minutes',
      description: 'Students create and present about different body systems',
      instructions: [
        'Divide students into small groups',
        'Assign each group a body system (digestive, respiratory, circulatory, etc.)',
        'Groups prepare a short presentation about their system, including key organs and functions',
        'Each group presents to the class'
      ]
    }
  ],
  assessmentTips: 'Assess students\' vocabulary retention through their labeled diagrams and system presentations. Note their ability to correctly pronounce body part names and accurately describe functions.',
  homeworkIdeas: [
    'Create a detailed diagram of one body system with labels and function descriptions',
    'Write a paragraph explaining how a particular body system works',
    'Research and prepare a fact sheet about an interesting body part or organ'
  ],
  additionalResources: [
    {
      title: 'Internal Body Parts Wordwall Game',
      url: 'https://wordwall.net/embed/4fbc8cd964f04a51aebc1e96f382140e'
    },
    {
      title: 'Human Body Systems Video',
      url: 'https://www.youtube.com/embed/2q9Jb-f7cAE'
    }
  ]
};

export const healthAndIllnessLessonPlan: LessonPlan = {
  id: 'book6-unit7-health-illness',
  title: 'Health and Illness Vocabulary',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to common illnesses and health issues',
    'Practice expressing health problems using appropriate structures',
    'Develop skills for discussing symptoms and seeking medical help'
  ],
  materials: [
    'Visual English Book 6, Unit 7',
    'Digital projector or interactive whiteboard',
    'Illness and symptoms flashcards',
    'Dialogue templates for doctor-patient conversations',
    'Health problem scenarios for role-play'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Introduce the topic of health and illness',
      instructions: [
        'Show pictures of people with common health problems',
        'Ask students to identify what might be wrong with each person',
        'Have students share experiences with minor illnesses'
      ]
    },
    {
      title: 'Vocabulary Presentation',
      duration: '15 minutes',
      description: 'Teach key vocabulary related to illnesses and symptoms',
      instructions: [
        'Present illness vocabulary using Visual English slides',
        'Group vocabulary by type: symptoms, conditions, treatments',
        'Model structures like "I have a headache" or "My throat hurts"',
        'Practice pronunciation and encourage students to repeat'
      ]
    },
    {
      title: 'Matching Exercise',
      duration: '10 minutes',
      description: 'Connect illnesses with appropriate symptoms and treatments',
      instructions: [
        'Distribute handouts with illness names, symptoms, and treatments',
        'In pairs, students match illnesses with corresponding symptoms and treatments',
        'Review answers as a class and clarify any misconceptions',
        'Discuss preventive measures for common illnesses'
      ]
    },
    {
      title: 'Doctor\'s Office Role-play',
      duration: '15 minutes',
      description: 'Practice health vocabulary in context through role-play',
      instructions: [
        'Divide students into pairs',
        'Distribute role cards with health problem scenarios',
        'One student plays the patient, the other the doctor',
        'Students perform their dialogues for the class',
        'Provide feedback on vocabulary use and pronunciation'
      ]
    }
  ],
  assessmentTips: 'Evaluate students\' understanding through their role-play performances. Note their appropriate use of health vocabulary and structures. Assess their ability to describe symptoms clearly and ask relevant health-related questions.',
  homeworkIdeas: [
    'Write a dialogue between a patient and doctor for a specific illness',
    'Create a poster about preventing a common illness',
    'Research traditional remedies for common ailments from different cultures'
  ],
  additionalResources: [
    {
      title: 'Illness Vocabulary Wordwall Game',
      url: 'https://wordwall.net/embed/34904fd94f30404192d2bdab3f028260'
    },
    {
      title: 'Body Actions Wordwall Game',
      url: 'https://wordwall.net/embed/5cec72b501b54381b2f536e9c82a1c5c'
    }
  ]
};

// Book 6, Unit 7 (What Your Body Can Do) Resources
export const book6Unit7Resources = [
  {
    title: "Illness Vocabulary Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/34904fd94f30404192d2bdab3f028260",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/34904fd94f30404192d2bdab3f028260?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Internal Body Parts Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/4fbc8cd964f04a51aebc1e96f382140e",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4fbc8cd964f04a51aebc1e96f382140e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Body Actions Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/5cec72b501b54381b2f536e9c82a1c5c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5cec72b501b54381b2f536e9c82a1c5c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Human Body Systems Video",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=2q9Jb-f7cAE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2q9Jb-f7cAE?si=8EK5FiTjeWF9kXHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Body Parts Lesson Plan",
    resourceType: "lesson",
    provider: "Visual English",
    lessonPlan: bodyPartsLessonPlan
  },
  {
    title: "Health and Illness Lesson Plan",
    resourceType: "lesson",
    provider: "Visual English",
    lessonPlan: healthAndIllnessLessonPlan
  }
];
