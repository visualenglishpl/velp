// Resources for Book 6, Unit 10 - Are You Tech Savvy?

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const technologyVocabularyLessonPlan: LessonPlan = {
  id: 'book6-unit10-technology-vocabulary',
  title: 'Technology Vocabulary',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to modern technology and gadgets',
    'Identify and name different tech devices and their functions',
    'Practice discussing technology preferences and uses',
    'Develop vocabulary for describing tech problems and solutions'
  ],
  materials: [
    'Visual English Book 6, Unit 10',
    'Digital projector or interactive whiteboard',
    'Technology flashcards',
    'Wordwall technology games',
    'Tech device pictures or real devices if available'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about technology',
      instructions: [
        'Ask students what technology devices they use daily',
        'Create a mind map on the board with different categories of tech (communication, entertainment, etc.)',
        'Discuss how technology has changed in the last 10 years',
        'Have students share which tech devices they couldn\'t live without'
      ]
    },
    {
      title: 'Vocabulary Introduction',
      duration: '15 minutes',
      description: 'Present key technology vocabulary using Visual English materials',
      instructions: [
        'Present vocabulary related to common tech devices using Visual English slides',
        'Group vocabulary: gadgets, software, hardware, apps, accessories, etc.',
        'Model correct pronunciation and have students repeat',
        'Teach related verbs: download, upload, install, charge, connect, etc.',
        'Introduce tech-specific adjectives: wireless, digital, smart, high-resolution, etc.'
      ]
    },
    {
      title: 'Tech Gadgets Game',
      duration: '10 minutes',
      description: 'Play interactive games to reinforce technology vocabulary',
      instructions: [
        'Divide class into small groups',
        'Have students play the Wordwall Technology Gadgets games',
        'Monitor and provide assistance as needed',
        'Review any challenging vocabulary that emerges during the games'
      ]
    },
    {
      title: 'Tech Problem-Solving Activity',
      duration: '15 minutes',
      description: 'Practice language for describing tech problems and solutions',
      instructions: [
        'Present common tech problem phrases: "It won\'t turn on", "The battery is dead", "It keeps crashing"',
        'Teach solution vocabulary: troubleshoot, restart, update, etc.',
        'Distribute tech problem scenario cards to pairs',
        'Students role-play tech support conversations using the target vocabulary',
        'Share the most interesting conversations with the whole class'
      ]
    }
  ],
  assessmentTips: 'Evaluate students\' mastery of tech vocabulary through their participation in games and role-plays. Note their ability to accurately describe tech devices and problems.',
  homeworkIdeas: [
    'Create a labeled diagram of your favorite tech device with at least 8 parts labeled',
    'Write instructions for how to use a specific app or device using the vocabulary learned',
    'Research a new technology and prepare a short presentation about how it works'
  ],
  additionalResources: [
    {
      title: 'Technology Vocabulary Games',
      url: 'https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed'
    },
    {
      title: 'Computer Verbs Activities',
      url: 'https://wordwall.net/resource/124ba44470124539ac4168b97714f02a'
    }
  ]
};

export const digitalLiteracyLessonPlan: LessonPlan = {
  id: 'book6-unit10-digital-literacy',
  title: 'Digital Literacy Skills',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Develop vocabulary related to online safety and digital literacy',
    'Practice discussing internet use habits and preferences',
    'Learn language for expressing opinions about technology',
    'Understand terminology related to digital communication'
  ],
  materials: [
    'Visual English Book 6, Unit 10',
    'Digital projector or interactive whiteboard',
    'Internet safety handouts',
    'ISL Collective Tech Savvy video',
    'Digital literacy scenario cards'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Discuss digital habits and internet use',
      instructions: [
        'Ask students how much time they spend online each day',
        'Have them share what activities they do online (social media, games, research, etc.)',
        'Discuss positive and negative aspects of internet use',
        'Create a class list of favorite websites and apps'
      ]
    },
    {
      title: 'Digital Vocabulary',
      duration: '10 minutes',
      description: 'Introduce vocabulary related to digital literacy',
      instructions: [
        'Present vocabulary: password, privacy, security, digital footprint, etc.',
        'Teach phrases for discussing online safety: "protect your data", "secure password", etc.',
        'Introduce terminology for digital communication: post, share, comment, stream, etc.',
        'Have students create sentences using the new vocabulary'
      ]
    },
    {
      title: 'Internet Safety Discussion',
      duration: '15 minutes',
      description: 'Practice language for discussing online safety',
      instructions: [
        'Distribute internet safety handouts',
        'In small groups, students discuss safety tips using target language',
        'Each group creates a list of 5 important online safety rules',
        'Groups present their rules to the class',
        'Create a class chart of the most important digital safety guidelines'
      ]
    },
    {
      title: 'Tech Savvy Video',
      duration: '15 minutes',
      description: 'Watch and respond to a video about digital skills',
      instructions: [
        'Show the ISL Collective Tech Savvy video',
        'Students note down key vocabulary and phrases from the video',
        'Discuss the main points of the video as a class',
        'Have students complete a brief comprehension activity based on the video content'
      ]
    }
  ],
  assessmentTips: 'Assess students\' use of digital literacy vocabulary through their group discussions and presentations. Note their ability to express opinions about technology using appropriate language.',
  homeworkIdeas: [
    'Create a digital safety poster with at least 5 important tips',
    'Write a paragraph about how technology has changed education',
    'Research a digital trend and prepare 5 interesting facts to share with the class'
  ],
  additionalResources: [
    {
      title: 'Digital Literacy Resources',
      url: 'https://www.commonsense.org/education/digital-citizenship/curriculum'
    },
    {
      title: 'Tech Vocabulary Games',
      url: 'https://wordwall.net/resource/589446a1c2674dcc964dc2115c3c119f'
    }
  ]
};

// Book 6, Unit 10 (Are You Tech Savvy?) Resources
export const book6Unit10Resources = [
  {
    title: "Technology Gadgets Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/023ea996683742539d4e330a7ec8f9ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Technology Gadgets Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/589446a1c2674dcc964dc2115c3c119f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/589446a1c2674dcc964dc2115c3c119f?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Google Search Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/3a895f34745a45009993054359e15e3f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3a895f34745a45009993054359e15e3f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Computer Verbs Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/124ba44470124539ac4168b97714f02a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/124ba44470124539ac4168b97714f02a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Find the Gadgets Game",
    resourceType: "game" as const,
    provider: "ABCya",
    sourceUrl: "https://www.abcya.com/games/find_the_tech"
  },
  {
    title: "Technology Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/1015142",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/1015142" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Technology Vocabulary Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: technologyVocabularyLessonPlan
  },
  {
    title: "Digital Literacy Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: digitalLiteracyLessonPlan
  }
];
