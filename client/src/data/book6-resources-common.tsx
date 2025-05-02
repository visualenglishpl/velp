import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * This file contains common resources (games, videos) for Book 6 that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book 6.
 */

// Wordwall games mapped by unit with their embed codes
const BOOK6_UNIT_GAMES: Record<string, { title: string, sourceUrl: string, embedCode: string }[]> = {
  '1': [
    {
      title: "Jobs and Occupations",
      sourceUrl: "https://wordwall.net/resource/5f4a631cd6854eeda345a1a79e4f0f11",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5f4a631cd6854eeda345a1a79e4f0f11?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Dream Jobs Quiz", 
      sourceUrl: "https://wordwall.net/resource/1b30c69bc4774aebb0b3c04cc1f08b56",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1b30c69bc4774aebb0b3c04cc1f08b56?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '5': [
    {
      title: "Theme Park Attractions", 
      sourceUrl: "https://wordwall.net/resource/19a3f2475cff43e98a217bc24b6fa0b7",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/19a3f2475cff43e98a217bc24b6fa0b7?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Theme Park Vocabulary", 
      sourceUrl: "https://wordwall.net/resource/e824bd6f7dfa4dcaa32b3428d7cf9e8a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e824bd6f7dfa4dcaa32b3428d7cf9e8a?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '6': [
    {
      title: "Home Appliances Game", 
      sourceUrl: "https://wordwall.net/resource/b1feb9c7e0e64156b44e38a03c97e1d4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b1feb9c7e0e64156b44e38a03c97e1d4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Kitchen Appliances Quiz", 
      sourceUrl: "https://wordwall.net/resource/2a77fe1f92404eff89b58ff9fbe3dbff",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2a77fe1f92404eff89b58ff9fbe3dbff?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '7': [
    {
      title: "Illness Vocabulary Game",
      sourceUrl: "https://wordwall.net/resource/34904fd94f30404192d2bdab3f028260",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/34904fd94f30404192d2bdab3f028260?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Internal Body Parts Game",
      sourceUrl: "https://wordwall.net/resource/4fbc8cd964f04a51aebc1e96f382140e",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4fbc8cd964f04a51aebc1e96f382140e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "What Your Body Can Do Game",
      sourceUrl: "https://wordwall.net/resource/5cec72b501b54381b2f536e9c82a1c5c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5cec72b501b54381b2f536e9c82a1c5c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '8': [
    {
      title: "Baking and Cooking Vocabulary",
      sourceUrl: "https://wordwall.net/resource/f5f8ab129c0245a2be4fc2e4e7f9b8c5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f5f8ab129c0245a2be4fc2e4e7f9b8c5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Kitchen Utensils Game",
      sourceUrl: "https://wordwall.net/resource/936e0d47a00a4fc69c32a9b7db8ace34",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/936e0d47a00a4fc69c32a9b7db8ace34?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '9': [
    {
      title: "Present Perfect Tense Practice",
      sourceUrl: "https://wordwall.net/resource/5ae8ba7fbcad46ceb8b7d881a29a9d08",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5ae8ba7fbcad46ceb8b7d881a29a9d08?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Present Perfect with Just",
      sourceUrl: "https://wordwall.net/resource/33cbf62b2fb0453786f26cb0511febc4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/33cbf62b2fb0453786f26cb0511febc4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '10': [
    {
      title: "Google Technology Quiz",
      sourceUrl: "https://wordwall.net/resource/3a895f34745a45009993054359e15e3f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3a895f34745a45009993054359e15e3f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Computer Verbs Practice",
      sourceUrl: "https://wordwall.net/resource/124ba44470124539ac4168b97714f02a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/124ba44470124539ac4168b97714f02a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  '12': [
    {
      title: "Environmental Problems Game",
      sourceUrl: "https://wordwall.net/resource/e8aeb81eecf44bab9de731f4edf8ea31",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e8aeb81eecf44bab9de731f4edf8ea31?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Environmental Protection Vocabulary",
      sourceUrl: "https://wordwall.net/resource/82f30a9fa3804bc1ad7b4db75f59a8da",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/82f30a9fa3804bc1ad7b4db75f59a8da?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
};

// YouTube videos mapped by unit with their embed codes
const BOOK6_UNIT_VIDEOS: Record<string, { title: string, sourceUrl: string, embedCode: string }[]> = {
  '1': [
    {
      title: "Jobs and Occupations Vocabulary",
      sourceUrl: "https://www.youtube.com/watch?v=fcKC1Vc8UYM",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fcKC1Vc8UYM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '5': [
    {
      title: "Theme Park Virtual Tour",
      sourceUrl: "https://www.youtube.com/watch?v=op7STir1HA0",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/op7STir1HA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '6': [
    {
      title: "Kitchen Appliances Explained",
      sourceUrl: "https://www.youtube.com/watch?v=PBwJiG38CHU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PBwJiG38CHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '7': [
    {
      title: "Human Body Systems",
      sourceUrl: "https://www.youtube.com/watch?v=2q9Jb-f7cAE",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2q9Jb-f7cAE?si=8EK5FiTjeWF9kXHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
  ],
  '8': [
    {
      title: "Baking Basics for Beginners",
      sourceUrl: "https://www.youtube.com/watch?v=yCxRmIVt6tU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yCxRmIVt6tU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '9': [
    {
      title: "Present Perfect Tense Explained",
      sourceUrl: "https://www.youtube.com/watch?v=_GhAWaVV0Gk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_GhAWaVV0Gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '10': [
    {
      title: "Technology Devices Vocabulary",
      sourceUrl: "https://www.youtube.com/watch?v=AVKzuuZRdKA",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AVKzuuZRdKA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
  '12': [
    {
      title: "Environmental Conservation Explained",
      sourceUrl: "https://www.youtube.com/watch?v=Jwr1Dzx0ycs",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Jwr1Dzx0ycs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
  ],
};

// Default resources for units that don't have specific resources defined
const DEFAULT_UNIT_GAMES = [
  {
    title: "English Vocabulary Practice",
    sourceUrl: "https://wordwall.net/resource/96a45bc01cd649659c90e9546f8a8972",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/96a45bc01cd649659c90e9546f8a8972?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "ESL Vocabulary Builder",
    sourceUrl: "https://wordwall.net/resource/29a8c3d88ae24188b99f621e0dd1cefd",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29a8c3d88ae24188b99f621e0dd1cefd?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

const DEFAULT_UNIT_VIDEOS = [
  {
    title: "English Learning Tips",
    sourceUrl: "https://www.youtube.com/watch?v=9wT_ehMR0NU",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/9wT_ehMR0NU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

/**
 * Generate standard resources for any Book 6 unit
 * @param unitId The unit ID as a string (1-16)
 * @returns Array of TeacherResource objects
 */
export function generateBook6UnitResources(bookId: string, unitId: string): TeacherResource[] {
  const resources: TeacherResource[] = [];
  const unitGames = BOOK6_UNIT_GAMES[unitId] || DEFAULT_UNIT_GAMES;
  const unitVideos = BOOK6_UNIT_VIDEOS[unitId] || DEFAULT_UNIT_VIDEOS;
  
  // Add games
  unitGames.forEach((game, index) => {
    resources.push({
      id: `book6-unit${unitId}-game${index + 1}`,
      bookId,
      unitId,
      title: game.title,
      resourceType: 'game',
      provider: 'Wordwall',
      sourceUrl: game.sourceUrl,
      embedCode: game.embedCode
    });
  });
  
  // Add videos
  unitVideos.forEach((video, index) => {
    resources.push({
      id: `book6-unit${unitId}-video${index + 1}`,
      bookId,
      unitId,
      title: video.title,
      resourceType: 'video',
      provider: 'YouTube',
      sourceUrl: video.sourceUrl,
      embedCode: video.embedCode
    });
  });
  
  return resources;
}

/**
 * Create a generic lesson plan generator for Book 6 units
 * This serves as a template - individual unit files can override this with specific lesson plans
 */
export function generateDefaultBook6UnitLessonPlans(unitId: string, unitTitle: string): LessonPlan[] {
  return [
    {
      id: `book6-unit${unitId}-vocab-lesson`,
      title: `${unitTitle} - Vocabulary Development`,
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Learn key vocabulary related to the unit theme",
        "Practice using new terms in context",
        "Develop listening and speaking skills"
      ],
      materials: [
        `Visual English Book 6 Unit ${unitId} slides`,
        "Wordwall vocabulary games",
        "Flashcards and handouts"
      ],
      steps: [
        {
          title: "Warm-up",
          duration: "5-10 minutes",
          description: "Introduce theme with visual aids",
          instructions: ["Show unit theme visuals", "Ask eliciting questions", "Build interest in the topic"]
        },
        {
          title: "Vocabulary Presentation",
          duration: "15 minutes",
          description: "Use slides to present new words",
          materials: ["Visual English slides", "Vocabulary list handout"],
          instructions: ["Present 10-12 new vocabulary items", "Model pronunciation", "Have students repeat", "Explain meanings with visuals"]
        },
        {
          title: "Practice Activities",
          duration: "15 minutes",
          description: "Interactive Wordwall games",
          materials: ["Wordwall game access", "Devices for access"],
          instructions: ["Demonstrate game access", "Have students play in pairs or small groups", "Monitor and assist as needed"]
        },
        {
          title: "Production",
          duration: "10-15 minutes",
          description: "Role-play or conversation activity",
          instructions: ["Assign conversation scenarios", "Have students practice in pairs", "Ask volunteers to present"]
        }
      ],
      assessmentTips: "Observe student participation in activities. Check vocabulary recognition through Wordwall game scores. Evaluate pronunciation and usage during production activities.",
      homeworkIdeas: [
        "Create a mini-project related to the unit theme",
        "Research and present additional vocabulary in the topic area",
        "Practice using the vocabulary in writing activities"
      ]
    },
    {
      id: `book6-unit${unitId}-grammar-lesson`,
      title: `${unitTitle} - Language Functions`,
      duration: "45-60 minutes",
      level: "Intermediate",
      objectives: [
        "Understand and use key grammar structures",
        "Apply language functions in real-life situations",
        "Build confidence in English communication"
      ],
      materials: [
        `Visual English Book 6 Unit ${unitId} slides`,
        "Grammar practice worksheets",
        "Video materials and audio resources"
      ],
      steps: [
        {
          title: "Review",
          duration: "5-10 minutes",
          description: "Quick recap of previous vocabulary",
          instructions: ["Use quick activities to review key vocabulary", "Connect vocabulary to new grammar focus"]
        },
        {
          title: "Grammar Presentation",
          duration: "15 minutes",
          description: "Introduce grammar point with examples",
          materials: ["Structure examples on board/slides", "Grammar reference handout"],
          instructions: ["Present target structure", "Show examples in context", "Highlight form and usage"]
        },
        {
          title: "Guided Practice",
          duration: "15 minutes",
          description: "Complete structured exercises",
          materials: ["Grammar worksheets", "Pair activity cards"],
          instructions: ["Demonstrate example exercises", "Have students complete practice activities", "Check answers as a class"]
        },
        {
          title: "Free Practice",
          duration: "10-15 minutes",
          description: "Open-ended application activities",
          instructions: ["Set up communicative activities", "Have students create their own examples", "Provide feedback on usage"]
        }
      ],
      assessmentTips: "Check accuracy in worksheet completion. Listen for correct grammar usage during speaking activities. Have students self-assess confidence level with new structures.",
      homeworkIdeas: [
        "Create your own examples using the target structure",
        "Extend the dialogue using additional vocabulary",
        "Record yourself practicing the language functions"
      ]
    }
  ];
}
