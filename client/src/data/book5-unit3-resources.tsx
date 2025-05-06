import { TeacherResource } from '@/types/teacher-resources';
import { BOOK5_UNIT_TITLES } from './book5-resources-common';

/**
 * Book 5 Unit 3 - HOBBIES AND LEISURE
 * Resources including videos and games
 */

const unitNumber = '3';
const unitTitle = BOOK5_UNIT_TITLES[unitNumber];

// Videos for this unit
export const videos: TeacherResource[] = [
  {
    id: `book5-unit${unitNumber}-video-1`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Hobbies Video`,
    description: 'Educational video about hobbies and leisure activities',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/embed/N0YJpQKlRVs',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/N0YJpQKlRVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    content: {
      type: 'iframe',
      embedUrl: 'https://www.youtube.com/embed/N0YJpQKlRVs'
    }
  }
];

// Games for this unit
export const games: TeacherResource[] = [
  {
    id: `book5-unit${unitNumber}-game-1`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Gaming Vocabulary Game`,
    description: 'Interactive game to practice gaming vocabulary',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e4c95330e95040728ac8cee60b69ec5f',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e4c95330e95040728ac8cee60b69ec5f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/e4c95330e95040728ac8cee60b69ec5f?themeId=1&templateId=3&fontStackId=0'
    }
  },
  {
    id: `book5-unit${unitNumber}-game-2`,
    bookId: '5',
    unitId: unitNumber,
    title: `Book 5 - Unit ${unitNumber} - ${unitTitle} - Gaming Tools Vocabulary`,
    description: 'Practice gaming tools vocabulary with an interactive game',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/8a3d7e16b671463f86b3dfa6f0cf2100',
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
    content: {
      type: 'wordwall',
      embedUrl: 'https://wordwall.net/embed/8a3d7e16b671463f86b3dfa6f0cf2100?themeId=1&templateId=3&fontStackId=0'
    }
  }
];

// Combine all resources for the unit
export const resources: TeacherResource[] = [...videos, ...games];

// Direct exports for consistent importing
export default resources;

/**
 * Get all resources for Book 5 Unit 3
 * @returns Array of teacher resources
 */
export function getBook5Unit3Resources(): TeacherResource[] {
  return resources;
}

// VideoResources for verification script
export const VideoResources = videos;

// GameResources for verification script
export const GameResources = games;

// Lesson plan data for Gaming Vocabulary and Technology
export const gamingVocabularyLessonPlan = {
  id: "gaming-vocabulary-lesson",
  title: "Gaming Vocabulary and Technology",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to video games and gaming equipment",
    "Understand gaming genres and platforms",
    "Develop language for discussing technology preferences",
    "Build speaking skills through gaming-themed conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 3 slides",
    "Gaming Vocabulary Game",
    "Gaming genre chart",
    "Gaming platform pictures",
    "Discussion question cards"
  ],
  steps: [
    {
      title: "Warm-up: Gaming Experience",
      duration: "5 minutes",
      description: "Activate prior knowledge about gaming",
      instructions: [
        "Ask students: 'Do you play video games? What games do you play?'",
        "Create a mind map of gaming words on the board",
        "Take a quick class poll about gaming habits and preferences",
        "Ask students what devices they use for gaming"
      ]
    },
    {
      title: "Gaming Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to gaming equipment and activities",
      materials: ["Visual English Book 5, Unit 3 slides", "Gaming platform pictures"],
      instructions: [
        "Introduce gaming hardware: console, controller, headset, keyboard, mouse, etc.",
        "Present gaming platforms: PC, PlayStation, Xbox, Nintendo Switch, mobile, etc.",
        "Teach gaming actions: play, win, lose, level up, save, download, etc.",
        "Discuss gaming-related verbs: compete, challenge, defeat, explore, etc."
      ]
    },
    {
      title: "Gaming Genres Overview",
      duration: "10 minutes",
      description: "Learn about different types of video games and their characteristics",
      materials: ["Gaming genre chart"],
      instructions: [
        "Present major gaming genres: action, adventure, strategy, simulation, role-playing, sports, etc.",
        "Show examples of popular games in each genre",
        "Discuss vocabulary specific to different genres",
        "Have students identify games they know and categorize them by genre"
      ]
    },
    {
      title: "Interactive Activity: Gaming Vocabulary Game",
      duration: "10 minutes",
      description: "Practice gaming vocabulary through a digital game",
      materials: ["Gaming Vocabulary Game"],
      instructions: [
        "Have students play the Gaming Vocabulary Game",
        "Encourage students to use gaming terms in complete sentences",
        "Review any difficult vocabulary together",
        "Discuss connections between different gaming terms"
      ]
    },
    {
      title: "Gaming Discussion Activity",
      duration: "10 minutes",
      description: "Practice speaking about gaming preferences and experiences",
      materials: ["Discussion question cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute discussion question cards with prompts like:",
        "'What kind of games do you prefer and why?'",
        "'How much time do you spend gaming each week?'",
        "'Do you think gaming is beneficial or harmful? Why?'",
        "'What skills can people develop through gaming?'",
        "Groups discuss their answers and prepare to share with the class",
        "Each group presents a summary of their discussion"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of gaming vocabulary, ability to discuss different gaming genres, and participation in the group discussion activity.",
  homeworkIdeas: [
    "Create a poster or presentation about your favorite video game using appropriate vocabulary", 
    "Write a paragraph comparing two different gaming platforms or genres",
    "Design a simple game concept and describe it using gaming terminology"
  ],
  additionalResources: [
    {
      title: "ESL Gaming Vocabulary",
      url: "https://www.eslgames.com/edutainment/"
    },
    {
      title: "Video Game Genres Guide",
      url: "https://www.commonsensemedia.org/blog/video-game-genres-explained"
    }
  ]
};

// Second lesson plan for Unit 3: Digital Literacy and Online Gaming
export const digitalLiteracyLessonPlan = {
  id: "digital-literacy-lesson",
  title: "Digital Literacy and Online Gaming",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to online gaming and internet safety",
    "Understand the concept of digital citizenship",
    "Develop language for discussing online behavior and etiquette",
    "Build critical thinking skills about digital media consumption"
  ],
  materials: [
    "Visual English Book 5, Unit 3 slides",
    "Gaming Tools Vocabulary game",
    "Internet safety guidelines handout",
    "Digital citizenship poster",
    "Scenario cards for role-play"
  ],
  steps: [
    {
      title: "Warm-up: Online Experiences",
      duration: "5 minutes",
      description: "Activate knowledge about online interactions",
      instructions: [
        "Ask students about their online activities beyond gaming",
        "Discuss what they enjoy and what challenges they face online",
        "Create a list of online platforms students use regularly",
        "Introduce the concept of digital citizenship"
      ]
    },
    {
      title: "Online Gaming Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to online gaming and communication",
      materials: ["Visual English Book 5, Unit 3 slides"],
      instructions: [
        "Introduce online gaming terminology: multiplayer, chat, stream, server, lag, etc.",
        "Present communication vocabulary: message, voice chat, emote, friend request, etc.",
        "Teach community terms: guild, clan, team, competition, tournament, etc.",
        "Discuss positive and negative online behaviors using new vocabulary"
      ]
    },
    {
      title: "Internet Safety Discussion",
      duration: "10 minutes",
      description: "Learn about staying safe while gaming online",
      materials: ["Internet safety guidelines handout", "Digital citizenship poster"],
      instructions: [
        "Present internet safety vocabulary: privacy, personal information, password, report, block, etc.",
        "Discuss guidelines for safe online interaction",
        "Teach phrases for handling uncomfortable situations online",
        "Review the concept of digital footprint and its importance"
      ]
    },
    {
      title: "Interactive Game: Gaming Tools Vocabulary",
      duration: "10 minutes",
      description: "Practice digital terminology through a vocabulary game",
      materials: ["Gaming Tools Vocabulary game"],
      instructions: [
        "Have students play the Gaming Tools Vocabulary game",
        "Encourage students to make connections between tools and their functions",
        "Review any challenging terminology as a class",
        "Discuss how different digital tools enhance the gaming experience"
      ]
    },
    {
      title: "Online Interaction Role-play",
      duration: "10 minutes",
      description: "Practice appropriate online communication through scenarios",
      materials: ["Scenario cards for role-play"],
      instructions: [
        "Divide students into pairs",
        "Distribute scenario cards with online situations like:",
        "'Someone is being rude in a game chat'",
        "'A player is asking for your personal information'",
        "'You want to invite someone to join your team'",
        "'You need to report a technical problem to game support'",
        "Pairs create and practice dialogues for their scenarios",
        "Volunteers perform their dialogues for the class",
        "Discuss appropriate responses and language for each situation"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their understanding of online safety vocabulary, ability to communicate appropriately in digital contexts, and participation in the role-play activity.",
  homeworkIdeas: [
    "Create a digital citizenship guideline poster for gamers", 
    "Write a dialogue between players demonstrating good online etiquette",
    "Research and write about how gaming has changed communication globally"
  ],
  additionalResources: [
    {
      title: "Digital Citizenship Resources",
      url: "https://www.commonsense.org/education/digital-citizenship"
    },
    {
      title: "Online Gaming Safety Guide",
      url: "https://www.internetmatters.org/resources/online-gaming-advice/"
    }
  ]
};
