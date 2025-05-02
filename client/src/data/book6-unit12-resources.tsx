// Resources for Book 6, Unit 12 - Are You Eco: Environment

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

// Lesson Plans
export const environmentalIssuesLessonPlan: LessonPlan = {
  id: 'book6-unit12-environmental-issues',
  title: 'Environmental Issues',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to environmental problems and solutions',
    'Identify different types of pollution and their effects',
    'Practice discussing environmental concerns using appropriate terminology',
    'Develop language for expressing opinions about environmental issues'
  ],
  materials: [
    'Visual English Book 6, Unit 12',
    'Digital projector or interactive whiteboard',
    'Environmental issue cards',
    'ISL Collective Environmental Pollution video',
    'Wordwall environment games'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Activate prior knowledge about environmental issues',
      instructions: [
        'Show images of various environmental problems',
        'Ask students to identify the issues they see',
        'Create a list on the board of environmental concerns',
        'Discuss which environmental issues affect the students\' local area'
      ]
    },
    {
      title: 'Vocabulary Introduction',
      duration: '15 minutes',
      description: 'Present key environmental vocabulary using Visual English materials',
      instructions: [
        'Present vocabulary related to environmental issues: pollution, deforestation, climate change, etc.',
        'Introduce types of pollution: air pollution, water pollution, noise pollution, etc.',
        'Teach verbs associated with environmental damage: pollute, contaminate, destroy, etc.',
        'Model correct pronunciation and have students repeat',
        'Group vocabulary by related concepts: causes, effects, solutions'
      ]
    },
    {
      title: 'Pollution Types Game',
      duration: '10 minutes',
      description: 'Reinforce pollution vocabulary through interactive games',
      instructions: [
        'Have students play the Wordwall Types of Pollution game',
        'Divide class into teams for friendly competition',
        'Discuss each type of pollution as it appears in the game',
        'For each type, have students suggest one cause and one solution'
      ]
    },
    {
      title: 'Environmental Video Discussion',
      duration: '15 minutes',
      description: 'Watch and respond to a video about environmental pollution',
      instructions: [
        'Show the ISL Collective Environmental Pollution video',
        'Students note key vocabulary and issues mentioned',
        'Discuss the main environmental problems presented in the video',
        'In small groups, students rank the issues by urgency and explain their reasoning',
        'Class shares ideas about how to address these environmental problems'
      ]
    }
  ],
  assessmentTips: 'Evaluate students\' mastery of environmental vocabulary through their discussions and game participation. Note their ability to describe environmental problems and suggest solutions using appropriate terminology.',
  homeworkIdeas: [
    'Create a poster about an environmental issue affecting your community',
    'Write a paragraph about what you personally do to help the environment',
    'Research an environmental organization and prepare 5 facts about their work'
  ],
  additionalResources: [
    {
      title: 'Environmental Vocabulary Games',
      url: 'https://wordwall.net/resource/f07c8c0eebfb48d9a771d2c7cad81f3d'
    },
    {
      title: 'Environmental Pollution Animation',
      url: 'https://en.islcollective.com/english-esl-video-lessons/vocabulary-practice/general-vocabulary-practice/word-classes/environmental-pollution-vocabulary/79022'
    }
  ]
};

export const sustainabilityLessonPlan: LessonPlan = {
  id: 'book6-unit12-sustainability',
  title: 'Sustainability and Conservation',
  duration: '45 minutes',
  level: 'Intermediate',
  objectives: [
    'Learn vocabulary related to sustainability and conservation',
    'Understand concepts of recycling, reusing, and reducing waste',
    'Practice discussing ways to protect endangered species and habitats',
    'Develop language for proposing environmental solutions'
  ],
  materials: [
    'Visual English Book 6, Unit 12',
    'Digital projector or interactive whiteboard',
    'Recycling sorting cards',
    'Endangered animals flashcards',
    'Michael Jackson\'s "Earth Song" video'
  ],
  steps: [
    {
      title: 'Warm-up',
      duration: '5 minutes',
      description: 'Introduce sustainability concepts',
      instructions: [
        'Ask students: "What does it mean to be eco-friendly?"',
        'Create a mind map with students\' ideas',
        'Introduce the "3 Rs": Reduce, Reuse, Recycle',
        'Discuss examples of each concept'
      ]
    },
    {
      title: 'Sustainability Vocabulary',
      duration: '10 minutes',
      description: 'Learn vocabulary related to sustainability',
      instructions: [
        'Present vocabulary: renewable, sustainable, conservation, biodegradable, etc.',
        'Teach phrases for discussing environmentally-friendly actions',
        'Introduce terminology related to resource management and conservation',
        'Students practice using new vocabulary in sentences'
      ]
    },
    {
      title: 'Recycling Game',
      duration: '10 minutes',
      description: 'Practice recycling vocabulary and concepts',
      instructions: [
        'Play the "Can You Recycle?" Wordwall game',
        'Discuss different materials and how they should be disposed of',
        'Share recycling practices from students\' homes and communities',
        'Create a class list of items that can and cannot be recycled'
      ]
    },
    {
      title: 'Endangered Species Activity',
      duration: '10 minutes',
      description: 'Learn about endangered animals and conservation',
      instructions: [
        'Play the "Endangered or Extinct" Wordwall game',
        'Show images of endangered animals and discuss threats to their survival',
        'In pairs, students discuss ways to protect endangered species',
        'Create a class chart of conservation ideas'
      ]
    },
    {
      title: 'Earth Song Video',
      duration: '10 minutes',
      description: 'Watch and discuss a video about environmental concerns',
      instructions: [
        'Play Michael Jackson\'s "Earth Song" video',
        'Students identify environmental issues shown in the video',
        'Discuss the message of the song and how it makes students feel',
        'Students share one action they can take to help the environment'
      ]
    }
  ],
  assessmentTips: 'Assess students\' understanding of sustainability concepts through their participation in discussions and recycling activities. Note their ability to discuss endangered species and conservation using appropriate vocabulary.',
  homeworkIdeas: [
    'Design a poster promoting the "3 Rs" (Reduce, Reuse, Recycle)',
    'Create a list of 10 ways to save energy and water at home',
    'Research an endangered animal and create a fact sheet about conservation efforts'
  ],
  additionalResources: [
    {
      title: 'Recycling Games',
      url: 'https://wordwall.net/resource/98fd4453f46240f0ac6bb612b5945960'
    },
    {
      title: 'Endangered Animals Resources',
      url: 'https://wordwall.net/resource/db58fd0165464c08a4c385c035325f3b'
    }
  ]
};

// Book 6, Unit 12 (Are You Eco: Environment) Resources
export const book6Unit12Resources = [
  {
    title: "Solar System Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Types of Pollution Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Can You Recycle? Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered or Extinct Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f04d2f477ff8484db0456922be236071",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f04d2f477ff8484db0456922be236071?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered Animals Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Earth Song",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/S2SMvfGe72U",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/S2SMvfGe72U?si=lNL1zDC02ILXCMju" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  },
  {
    title: "Environmental Pollution Animation",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/vocabulary-practice/general-vocabulary-practice/word-classes/environmental-pollution-vocabulary/79022",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/79022" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Environment Animation",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/grammar-practice/general-grammar-practice/future-tenses/environmental-animation/262369",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/262369" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
  {
    title: "Solar System Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/2753bac717214441a38d76fda2cc33b8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Types of Pollution Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/f07c8c0eebfb48d9a771d2c7cad81f3d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Can You Recycle? Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/98fd4453f46240f0ac6bb612b5945960",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered or Extinct Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/f04d2f477ff8484db0456922be236071",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f04d2f477ff8484db0456922be236071?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Endangered Animals Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/db58fd0165464c08a4c385c035325f3b",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Earth Song Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=S2SMvfGe72U",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/S2SMvfGe72U?si=lNL1zDC02ILXCMju" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Environmental Pollution Animation",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/vocabulary-practice/general-vocabulary-practice/word-classes/environmental-pollution-vocabulary/79022",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/79022" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Environment Animation Video",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/grammar-practice/general-grammar-practice/future-tenses/environmental-animation/262369",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/262369" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "Planets & Stars Comparison Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=HEheh1BH34Q",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HEheh1BH34Q?si=-L7XXOZqHjFsV3TT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Climate Change Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=MK5E_7hOi-k",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/MK5E_7hOi-k?si=bGioPGye_NH29Xty" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Environmental Issues Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: environmentalIssuesLessonPlan
  },
  {
    title: "Sustainability Lesson Plan",
    resourceType: "lesson" as const,
    provider: "Visual English",
    lessonPlan: sustainabilityLessonPlan
  }
];
import { TeacherResource } from "@/components/TeacherResources";

export const environmentResources: TeacherResource[] = [
  {
    title: "Solar System Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2753bac717214441a38d76fda2cc33b8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Types of Pollution Game",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f07c8c0eebfb48d9a771d2c7cad81f3d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Can You Recycle?",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/98fd4453f46240f0ac6bb612b5945960?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Endangered or Extinct",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f04d2f477ff8484db0456922be236071",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f04d2f477ff8484db0456922be236071?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Endangered Animals",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/db58fd0165464c08a4c385c035325f3b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Earth Song",
    resourceType: "video",
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/S2SMvfGe72U",
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/S2SMvfGe72U?si=lNL1zDC02ILXCMju" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  }
];
