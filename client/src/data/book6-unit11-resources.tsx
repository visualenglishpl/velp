// Resources for Book 6, Unit 11 - Extreme Sports

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const extremeSportsVocabularyLessonPlan: LessonPlan = {
  id: 'book6-unit11-extreme-sports-vocabulary',
  title: 'Extreme Sports Vocabulary',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to extreme sports and adventure activities',
    'Identify and describe different extreme sports and their equipment',
    'Practice expressing opinions about risky activities',
    'Develop vocabulary for discussing safety in sports'
  ],
  materials: [
    'Visual English Book 6, Unit 11',
    'Digital projector or interactive whiteboard',
    'Extreme sports photos and videos',
    'Wordwall extreme sports games',
    'Sport equipment flashcards'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about sports and adventure activities',
      instructions: [
        'Show photos of different extreme sports',
        'Ask students to name any extreme sports they recognize',
        'Create a list on the board of sports students consider "extreme"',
        'Discuss what makes a sport "extreme" (danger, adrenaline, special skills, etc.)'
      ]
    },
    {
      title: 'Vocabulary Introduction',
      duration: '15 minutes',
      description: 'Present key extreme sports vocabulary using Visual English materials',
      instructions: [
        'Present vocabulary for different extreme sports: bungee jumping, rock climbing, skateboarding, etc.',
        'Teach equipment vocabulary for each sport',
        'Introduce action verbs associated with extreme sports: climb, dive, jump, etc.',
        'Model correct pronunciation and have students repeat',
        'Group vocabulary by location: water sports, mountain sports, air sports, urban sports'
      ]
    },
    {
      title: 'Extreme Sports Games',
      duration: '10 minutes',
      description: 'Reinforce vocabulary through interactive games',
      instructions: [
        'Have students play the Wordwall Extreme Sports games',
        'Divide class into teams for friendly competition',
        'Award points for correct identification of sports and equipment',
        'Review any challenging vocabulary that emerges during the games'
      ]
    },
    {
      title: 'Sports Opinion Activity',
      duration: '15 minutes',
      description: 'Practice expressing opinions about extreme sports',
      instructions: [
        'Teach phrases for expressing opinions: "I think...is exciting/dangerous", "I would/wouldn\'t try..."',
        'Show videos of different extreme sports in action',
        'After each video, students share opinions using target phrases',
        'Discuss safety precautions for different extreme sports',
        'Students vote on which extreme sport they would most like to try'
      ]
    }
  ],
  assessmentTips: 'Evaluate students\' mastery of extreme sports vocabulary through their participation in games and opinion-sharing activities. Note their ability to use appropriate adjectives to describe different sports.',
  homeworkIdeas: [
    'Research an extreme sport not covered in class and create a fact sheet with vocabulary',
    'Write a paragraph about an extreme sport you would like to try and explain why',
    'Create a safety poster for an extreme sport including necessary equipment and precautions'
  ],
  additionalResources: [
    {
      title: 'Extreme Sports Vocabulary Games',
      url: 'https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed'
    },
    {
      title: 'Extreme Sports Videos',
      url: 'https://www.youtube.com/watch?v=WDKc6z4LRgQ'
    }
  ]
};

export const adventureSportsLessonPlan: LessonPlan = {
  id: 'book6-unit11-adventure-sports',
  title: 'Adventure Sports and Risk',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Discuss the concept of risk and safety in extreme sports',
    'Practice using modal verbs to give advice about safety',
    'Learn vocabulary related to injuries and safety equipment',
    'Develop fluency in discussing personal preferences about adventure activities'
  ],
  materials: [
    'Visual English Book 6, Unit 11',
    'Digital projector or interactive whiteboard',
    'Safety equipment pictures',
    'Extreme sports video compilation',
    'Role-play scenario cards'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Discuss concepts of risk and safety',
      instructions: [
        'Ask students: "Why do people enjoy risky activities?"',
        'Create a mind map of reasons (adrenaline, challenge, freedom, etc.)',
        'Discuss the balance between adventure and safety',
        'Have students share if they prefer safe or risky activities'
      ]
    },
    {
      title: 'Safety Vocabulary',
      duration: '10 minutes',
      description: 'Learn vocabulary related to safety in extreme sports',
      instructions: [
        'Present vocabulary: helmet, harness, padding, precaution, etc.',
        'Teach injury-related vocabulary: sprain, fracture, concussion, etc.',
        'Introduce modal verbs for giving advice: should, must, have to',
        'Students practice creating safety advice sentences using modals',
        'Example: "You should always wear a helmet when skateboarding."'
      ]
    },
    {
      title: 'Video Analysis',
      duration: '15 minutes',
      description: 'Watch and discuss extreme sports footage',
      instructions: [
        'Show compilation video of extreme sports',
        'Students identify safety equipment being used',
        'Discuss risks visible in each sport',
        'Have students suggest safety measures for each activity shown',
        'Create a class list of the most important safety rules for adventure sports'
      ]
    },
    {
      title: 'Adventure Sports Role-play',
      duration: '15 minutes',
      description: 'Practice conversations about extreme sports participation',
      instructions: [
        'Divide students into pairs',
        'Distribute role-play scenario cards',
        'Scenarios include: convincing a friend to try an extreme sport, giving safety advice, etc.',
        'Students prepare and perform their dialogues',
        'Class provides feedback on language use and content'
      ]
    }
  ],
  assessmentTips: 'Assess students\' ability to discuss risk and safety using appropriate vocabulary and modal verbs. Note their fluency in expressing opinions and giving advice about extreme sports.',
  homeworkIdeas: [
    'Interview someone who participates in an adventure sport and write about their experience',
    'Create a safety guide for beginners of an extreme sport of your choice',
    'Write a persuasive paragraph arguing for or against extreme sports in schools'
  ],
  additionalResources: [
    {
      title: 'Extreme Sports Safety Resources',
      url: 'https://www.adventuresportsnetwork.com/sport/safety/'
    },
    {
      title: 'Adventure Sports Videos',
      url: 'https://www.youtube.com/watch?v=WDKc6z4LRgQ'
    }
  ]
};

// Book 6, Unit 11 (Extreme Sports) Resources
export const book6Unit11Resources = [
  {
    title: "Extreme Sports Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/023ea996683742539d4e330a7ec8f9ed",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/023ea996683742539d4e330a7ec8f9ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Bungee Jumping Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/40ad412bff5445a58c7565c4ad2fb93c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/40ad412bff5445a58c7565c4ad2fb93c?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Mountain Climbing Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/10faffddc0754134a699973c8fe2eb8f",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/10faffddc0754134a699973c8fe2eb8f?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kayaking and Canoeing Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/547a0204c8d446bdad43f0af9e882d90",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/547a0204c8d446bdad43f0af9e882d90?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Skateboarding Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/49a2de09506145b0921d52f2ff4721dd",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/49a2de09506145b0921d52f2ff4721dd?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Snorkeling and Diving Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/7a67bcb8e63240f1afc7a7b580477bb9",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7a67bcb8e63240f1afc7a7b580477bb9?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Snowboarding Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/a68f375b78f24e5e9de01e48f0a799fa",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a68f375b78f24e5e9de01e48f0a799fa?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Extreme Sports Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=WDKc6z4LRgQ",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WDKc6z4LRgQ?si=UQfzoadLUb5rdN3v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Extreme Sports Vocabulary Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: extremeSportsVocabularyLessonPlan
  },
  {
    title: "Adventure Sports and Risk Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: adventureSportsLessonPlan
  }
];
