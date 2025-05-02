// This file contains resources for Book 6, Unit 16 (City Life themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit16Resources = [
  {
    title: "City Life Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/eee1bf3b774142c3933bc71166544636",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/eee1bf3b774142c3933bc71166544636?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "City Life Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/16b62317675e46cfb1a822f77d3ea319",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/16b62317675e46cfb1a822f77d3ea319?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "City Life Vocabulary Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/d3a07d614e964c408aec558d6f1c0aa9",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d3a07d614e964c408aec558d6f1c0aa9?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "City Life Vocabulary Game 4",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/9226ab267a0f47cfbb747b16c94f7396",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9226ab267a0f47cfbb747b16c94f7396?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Urban Planning ESL Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/1101928",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/1101928" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  },
  {
    title: "City Life ESL Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/266409",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/266409" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for City Life
export const cityLifeVocabularyLessonPlan = {
  id: "city-life-vocabulary-lesson",
  title: "City Life Vocabulary and Urban Features",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to city features and urban environments",
    "Practice describing different parts of a city and their functions",
    "Develop language for giving directions in urban settings",
    "Build awareness of urban planning and city infrastructure"
  ],
  materials: [
    "Visual English Book 6, Unit 16 slides",
    "City map illustrations",
    "City Life Vocabulary Games",
    "Urban Planning ESL Video Lesson",
    "Picture cards of city locations"
  ],
  steps: [
    {
      title: "Warm-up: Cities of the World",
      duration: "5 minutes",
      description: "Activate knowledge about cities and urban features",
      instructions: [
        "Show pictures of famous cities from around the world",
        "Ask students to identify the cities if possible",
        "Discuss what makes each city unique or recognizable",
        "Create a list of urban features students can identify (skyscrapers, parks, etc.)"
      ]
    },
    {
      title: "City Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to city features",
      materials: ["Visual English Book 6, Unit 16 slides", "City map illustrations"],
      instructions: [
        "Introduce vocabulary: downtown, suburb, pedestrian crossing, traffic light, etc.",
        "Present city buildings and locations: skyscraper, shopping mall, museum, etc.",
        "Teach infrastructure terms: public transportation, subway system, bike lane, etc.",
        "Use city map illustrations to point out and label different urban features"
      ]
    },
    {
      title: "Video: Urban Planning",
      duration: "10 minutes",
      description: "Watch and analyze urban environments and planning",
      materials: ["Urban Planning ESL Video Lesson"],
      instructions: [
        "Play the Urban Planning ESL Video Lesson",
        "Ask students to identify city features mentioned in the video",
        "Discuss the concept of urban planning and its importance",
        "Have students share what they like and dislike about cities"
      ]
    },
    {
      title: "Interactive Games: City Life Vocabulary",
      duration: "10 minutes",
      description: "Reinforce city vocabulary through games",
      materials: ["City Life Vocabulary Games"],
      instructions: [
        "Have students play the City Life vocabulary games",
        "Encourage students to use complete sentences when identifying features",
        "Review any difficult vocabulary as a class",
        "Discuss how cities differ around the world"
      ]
    },
    {
      title: "City Navigation Activity",
      duration: "10 minutes",
      description: "Practice giving and following directions in a city context",
      materials: ["City map illustrations", "Picture cards of city locations"],
      instructions: [
        "Divide students into pairs",
        "Distribute city maps to each pair",
        "One student selects a destination card (museum, library, etc.)",
        "That student must give directions from a starting point to the destination",
        "Partner follows the directions on the map to see if they reach the correct location",
        "Students switch roles and try with different destinations",
        "Reinforce direction phrases: 'Turn left/right at', 'Go straight for two blocks', etc."
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of city vocabulary, ability to describe urban features, and skill in giving clear directions during the navigation activity.",
  homeworkIdeas: [
    "Draw a simple map of your neighborhood and label at least 10 features using vocabulary from class", 
    "Write directions from your home to school or another important location",
    "Research and write about a famous city you would like to visit"
  ],
  additionalResources: [
    {
      title: "City Vocabulary Guide",
      url: "https://www.vocabulary.cl/english/city-vocabulary.htm"
    },
    {
      title: "ESL Directions Activities",
      url: "https://www.fluentu.com/blog/educator-english/esl-directions-activities/"
    }
  ]
};

// Second lesson plan for Unit 16: Urban vs. Rural Life
export const urbanRuralLifeLessonPlan = {
  id: "urban-rural-life-lesson",
  title: "Urban vs. Rural Life: Comparing Lifestyles",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for comparing urban and rural environments",
    "Develop language for expressing advantages and disadvantages",
    "Practice making comparisons using comparative and superlative forms",
    "Build critical thinking skills about different lifestyle choices"
  ],
  materials: [
    "Visual English Book 6, Unit 16 slides",
    "City Life ESL Video Lesson",
    "Urban vs. rural comparison charts",
    "Pictures of city and countryside scenes",
    "Pros and cons card sets"
  ],
  steps: [
    {
      title: "Warm-up: City and Countryside Images",
      duration: "5 minutes",
      description: "Activate thinking about differences in urban and rural environments",
      materials: ["Pictures of city and countryside scenes"],
      instructions: [
        "Display contrasting images of city and countryside scenes",
        "Ask students to describe what they see in each image",
        "Create two columns on the board: 'Urban' and 'Rural'",
        "Have students suggest words that describe each environment"
      ]
    },
    {
      title: "Comparison Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary for making comparisons and expressing advantages/disadvantages",
      materials: ["Visual English Book 6, Unit 16 slides"],
      instructions: [
        "Introduce comparison structures: 'more...than', 'less...than', '-er than', etc.",
        "Present vocabulary for advantages: 'benefit', 'advantage', 'convenient', etc.",
        "Present vocabulary for disadvantages: 'drawback', 'downside', 'inconvenient', etc.",
        "Practice with examples: 'Cities are more crowded than villages', 'Rural areas are less polluted than urban areas'"
      ]
    },
    {
      title: "Video: City Life Discussion",
      duration: "10 minutes",
      description: "Watch and discuss aspects of city living",
      materials: ["City Life ESL Video Lesson"],
      instructions: [
        "Play the City Life ESL Video Lesson",
        "Have students identify positive and negative aspects of city life mentioned",
        "Discuss whether these aspects apply to cities in their country",
        "Compare with what they know about rural life"
      ]
    },
    {
      title: "Urban vs. Rural Comparison Activity",
      duration: "10 minutes",
      description: "Analyze and compare different aspects of urban and rural living",
      materials: ["Urban vs. rural comparison charts", "Pros and cons card sets"],
      instructions: [
        "Divide students into small groups",
        "Distribute comparison charts with categories: transportation, entertainment, cost of living, etc.",
        "Groups complete the charts with comparisons for each category",
        "Provide pros and cons cards for groups to sort into urban or rural advantages",
        "Each group shares their most interesting comparisons"
      ]
    },
    {
      title: "Lifestyle Debate",
      duration: "10 minutes",
      description: "Practice expressing opinions about urban vs. rural living",
      instructions: [
        "Divide the class into two teams: urban advocates and rural advocates",
        "Each team prepares arguments for why their lifestyle is better",
        "Teams take turns presenting arguments using comparison language",
        "After the formal debate, ask students their personal preferences",
        "Discuss how different stages of life might affect where people prefer to live"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of comparison vocabulary, ability to express advantages and disadvantages clearly, and participation in the debate activity.",
  homeworkIdeas: [
    "Write a paragraph about where you would prefer to live (city or countryside) and why", 
    "Create a comparison chart of a specific city and rural area in your country",
    "Interview someone who has moved between urban and rural areas about their experience"
  ],
  additionalResources: [
    {
      title: "Urban and Rural Life Vocabulary",
      url: "https://www.englishclub.com/vocabulary/environment-urban-rural.htm"
    },
    {
      title: "ESL Debate Activities",
      url: "https://www.fluentu.com/blog/educator-english/esl-debate-topics-activities/"
    }
  ]
};
