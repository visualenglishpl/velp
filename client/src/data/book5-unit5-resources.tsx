// This file contains resources for Book 5, Unit 5 (Winter Fun themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit5Resources = [
  {
    title: "Winter Activities Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/947d2144dc414e66a86aad76d37d8dd8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/947d2144dc414e66a86aad76d37d8dd8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Winter Equipment Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/6c386095e72047989555b630d50a503c",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c386095e72047989555b630d50a503c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Winter Equipment Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/0bd8d158bcbf4a9696c8ea447ca3fb24",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0bd8d158bcbf4a9696c8ea447ca3fb24?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Winter Sports Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/f389ff77339b4a56af253467ed3356e4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f389ff77339b4a56af253467ed3356e4?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Winter Activities Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/hNRAmIY8NRk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hNRAmIY8NRk?si=rk-w7VwhSl5ZzJrP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Winter Activities and Vocabulary
export const winterActivitiesLessonPlan = {
  id: "winter-activities-lesson",
  title: "Winter Activities and Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to winter activities and sports",
    "Practice describing winter scenes and experiences",
    "Develop language for discussing seasonal activities",
    "Build speaking skills through winter-themed conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 5 slides",
    "Winter Activities Vocabulary Game",
    "Winter Sports Vocabulary Game",
    "Winter Activities Video",
    "Winter scene pictures",
    "Activity cards"
  ],
  steps: [
    {
      title: "Warm-up: Winter Experiences",
      duration: "5 minutes",
      description: "Activate prior knowledge about winter activities",
      instructions: [
        "Ask students: 'What activities do you enjoy in winter?'",
        "Create a mind map of winter activities on the board",
        "Show pictures of winter scenes and ask students to describe what they see",
        "Discuss differences between winter activities in various countries"
      ]
    },
    {
      title: "Winter Activities Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to winter activities",
      materials: ["Visual English Book 5, Unit 5 slides", "Winter scene pictures"],
      instructions: [
        "Introduce winter activity verbs: ski, skate, snowboard, sledge/sled, build a snowman, etc.",
        "Present winter scene vocabulary: snow, ice, snowflake, blizzard, frost, etc.",
        "Teach adjectives: cold, freezing, icy, snowy, slippery, etc.",
        "Have students practice using the vocabulary to describe winter scenes"
      ]
    },
    {
      title: "Video: Winter Activities",
      duration: "10 minutes",
      description: "Watch a video about winter activities and sports",
      materials: ["Winter Activities Video"],
      instructions: [
        "Play the Winter Activities Video",
        "Ask students to note any new activities they see",
        "Pause to discuss specific winter sports and activities",
        "After watching, have students recall activities shown in the video"
      ]
    },
    {
      title: "Interactive Games: Winter Vocabulary",
      duration: "10 minutes",
      description: "Practice winter-related vocabulary through digital games",
      materials: ["Winter Activities Vocabulary Game", "Winter Sports Vocabulary Game"],
      instructions: [
        "Have students play the Winter Activities Vocabulary Game",
        "Continue with the Winter Sports Vocabulary Game",
        "Encourage students to use complete sentences when discussing answers",
        "Review any challenging vocabulary as a class"
      ]
    },
    {
      title: "Winter Activities Discussion",
      duration: "10 minutes",
      description: "Practice speaking about winter activities and experiences",
      materials: ["Activity cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute activity cards with prompts like:",
        "'Describe your favorite winter activity'",
        "'Talk about a memorable winter experience'",
        "'What winter sports would you like to try?'",
        "'How do you prepare for winter?'",
        "Pairs discuss their responses to the prompts",
        "Ask volunteers to share their discussions with the class",
        "Conclude with a brief class discussion about popular winter activities"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of winter activity vocabulary, ability to describe seasonal activities, and participation in the discussion activity.",
  homeworkIdeas: [
    "Write a paragraph describing your ideal winter day", 
    "Create a poster about a winter sport with labeled equipment and actions",
    "Research winter activities in a different country and prepare a brief presentation"
  ],
  additionalResources: [
    {
      title: "ESL Winter Vocabulary",
      url: "https://www.eslkidstuff.com/worksheets/winter.htm"
    },
    {
      title: "Winter Sports Guide",
      url: "https://www.thoughtco.com/winter-sports-vocabulary-1210229"
    }
  ]
};

// Second lesson plan for Unit 5: Winter Equipment and Clothing
export const winterEquipmentLessonPlan = {
  id: "winter-equipment-lesson",
  title: "Winter Equipment and Clothing",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to winter clothing and equipment",
    "Practice describing appropriate clothing for different weather conditions",
    "Develop language for discussing outdoor gear and its functions",
    "Build speaking skills through practical winter scenarios"
  ],
  materials: [
    "Visual English Book 5, Unit 5 slides",
    "Winter Equipment Vocabulary Games",
    "Winter clothing pictures",
    "Equipment matching cards",
    "Weather scenario cards"
  ],
  steps: [
    {
      title: "Warm-up: Winter Clothing Brainstorm",
      duration: "5 minutes",
      description: "Activate prior knowledge about winter gear",
      instructions: [
        "Ask students: 'What do you wear in winter?'",
        "Create a list of winter clothing items on the board",
        "Categorize items by body part (head, hands, feet, etc.)",
        "Discuss why certain clothing is necessary in cold weather"
      ]
    },
    {
      title: "Winter Clothing Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to winter clothing and accessories",
      materials: ["Visual English Book 5, Unit 5 slides", "Winter clothing pictures"],
      instructions: [
        "Introduce clothing items: coat, jacket, sweater, gloves, mittens, scarf, hat, earmuffs, etc.",
        "Present layering vocabulary: base layer, insulation, outer shell, etc.",
        "Teach material adjectives: woolen, thermal, waterproof, insulated, etc.",
        "Have students describe what they wear in different winter temperatures"
      ]
    },
    {
      title: "Winter Equipment Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to winter sports equipment",
      materials: ["Visual English Book 5, Unit 5 slides", "Equipment matching cards"],
      instructions: [
        "Present winter sports equipment: skis, poles, snowboard, ice skates, sled, etc.",
        "Discuss safety equipment: helmet, goggles, pads, etc.",
        "Introduce equipment verbs: strap on, fasten, adjust, tighten, etc.",
        "Use equipment matching cards to pair items with their winter activities"
      ]
    },
    {
      title: "Interactive Games: Winter Equipment",
      duration: "10 minutes",
      description: "Practice equipment vocabulary through digital games",
      materials: ["Winter Equipment Vocabulary Games"],
      instructions: [
        "Have students play the Winter Equipment Vocabulary Games",
        "Encourage students to describe the function of each item",
        "Review any challenging vocabulary as a class",
        "Discuss which items are essential versus optional for winter activities"
      ]
    },
    {
      title: "Winter Weather Scenarios",
      duration: "10 minutes",
      description: "Practice recommending appropriate winter gear for different situations",
      materials: ["Weather scenario cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute weather scenario cards with different situations like:",
        "'Going skiing on a sunny winter day'",
        "'Walking to school during a snowstorm'",
        "'Ice skating at an indoor rink'",
        "'Building a snowman after fresh snowfall'",
        "Groups discuss what clothing and equipment would be appropriate for each scenario",
        "Each group presents their recommendations to the class",
        "Class discusses whether they agree with the recommendations and why"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of winter clothing and equipment vocabulary, ability to recommend appropriate gear for different conditions, and participation in the scenario activity.",
  homeworkIdeas: [
    "Create a packing list for a winter vacation, including all necessary clothing and equipment", 
    "Design a brochure for a winter sports shop, labeling and describing various items",
    "Write a set of instructions for a beginner explaining what to wear for a winter activity"
  ],
  additionalResources: [
    {
      title: "Winter Clothing ESL Resources",
      url: "https://www.teach-this.com/resources/winter"
    },
    {
      title: "Winter Sports Equipment Guide",
      url: "https://www.evo.com/guides"
    }
  ]
};
