import { TeacherResource } from '@/components/TeacherResources';
import { LessonPlan } from '@/components/LessonPlanTemplate';

/**
 * This file contains common resources (games, videos) for Book 5 that will be shared
 * across multiple units. It provides functions to generate standardized resources
 * for any unit in Book 5.
 */

// Unit titles for reference in lesson plans and resources
export const BOOK5_UNIT_TITLES: Record<string, string> = {
  '1': 'Schools in the UK/USA',
  '2': 'Holiday Activities',
  '3': 'Hobbies and Leisure',
  '4': 'Transport',
  '5': 'Winter Fun',
  '6': 'World of Animals',
  '7': 'Healthy Eating',
  '8': 'Sports and Games',
  '9': 'Emotions',
  '10': 'Technology and Gadgets',
  '11': 'Describing People',
  '12': 'Shopping and Money',
  '13': 'Irregular Verbs - Past Tense',
  '14': 'Environment',
  '15': 'Music and Instruments',
  '16': 'Travel and Tourism'
};

// Wordwall games mapped by unit with their embed codes
/**
 * Collection of games for each Book 5 unit
 * These are organized by unit number and will be added to the resources list
 */
const BOOK5_UNIT_GAMES: Record<string, { title: string, sourceUrl: string, embedCode: string, provider?: string }[]> = {
  // Default games for Unit 1 - Schools in the UK/USA
  '1': [
    {
      title: "School Subjects Game",
      sourceUrl: "https://wordwall.net/resource/2ce24d3e0b854aacab0fa19e1c3e53d5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2ce24d3e0b854aacab0fa19e1c3e53d5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "School Items Vocabulary",
      sourceUrl: "https://wordwall.net/resource/f98b65c30b0c4dbfa8542a2c47b3c420",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f98b65c30b0c4dbfa8542a2c47b3c420?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  // Default games for Unit 5 - Winter Fun
  '5': [
    {
      title: "Winter Activities Game",
      sourceUrl: "https://wordwall.net/resource/29168450/winter-activities",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c1f5ce9fb2324d63896a1fe126efecc2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Winter Vocabulary",
      sourceUrl: "https://wordwall.net/resource/8790082/winter-vocabulary",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b3b4e43bf3d7410a9671e23ce50afa3a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  // Default games for Unit 9 - Emotions
  '9': [
    {
      title: "Emotions Game",
      sourceUrl: "https://wordwall.net/resource/31370010/emotions",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/31370010/emotions?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Feelings Vocabulary",
      sourceUrl: "https://wordwall.net/resource/12261684/feelings",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/12261684/feelings?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ],
  // Default games for Unit 13 - Irregular Verbs - Past Tense
  '13': [
    {
      title: "Irregular Verbs Past Tense Game",
      sourceUrl: "https://wordwall.net/resource/2109641/past-simple-irregular-verbs",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2109641/past-simple-irregular-verbs?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      title: "Past Tense Verbs Practice",
      sourceUrl: "https://wordwall.net/resource/1026867/past-tense-verbs",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1026867/past-tense-verbs?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ]
};

// YouTube videos mapped by unit with their embed codes
/**
 * Collection of videos for each Book 5 unit
 * These are organized by unit number and will be added to the resources list
 */
const BOOK5_UNIT_VIDEOS: Record<string, { title: string, sourceUrl: string, embedCode: string, provider?: string }[]> = {
  // Default videos for Unit 1 - Schools in the UK/USA
  '1': [
    {
      title: "Schools in the UK vs USA",
      sourceUrl: "https://www.youtube.com/embed/fAAFO4-wF1E",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fAAFO4-wF1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    },
    {
      title: "Life in a British School",
      sourceUrl: "https://www.youtube.com/embed/pOg6y-Q59eM",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pOg6y-Q59eM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    }
  ],
  // Default videos for Unit 5 - Winter Fun
  '5': [
    {
      title: "Winter Activities Vocabulary",
      sourceUrl: "https://www.youtube.com/embed/qHJThFVeyiw",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qHJThFVeyiw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    },
    {
      title: "Winter Sports and Activities",
      sourceUrl: "https://www.youtube.com/embed/BnIt9_8UpQ8",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/BnIt9_8UpQ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    }
  ],
  // Default videos for Unit 9 - Emotions
  '9': [
    {
      title: "Emotions and Feelings Vocabulary",
      sourceUrl: "https://www.youtube.com/embed/xHQWZXhLxYM",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xHQWZXhLxYM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    },
    {
      title: "Expressing Emotions in English",
      sourceUrl: "https://www.youtube.com/embed/yKcYWR0NpH4",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yKcYWR0NpH4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    }
  ],
  // Default videos for Unit 13 - Irregular Verbs - Past Tense
  '13': [
    {
      title: "Irregular Verbs in Past Tense",
      sourceUrl: "https://www.youtube.com/embed/MAXk7UXFnWM",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/MAXk7UXFnWM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    },
    {
      title: "Past Tense Irregular Verbs Practice",
      sourceUrl: "https://www.youtube.com/embed/JnaXPcTAIoA",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JnaXPcTAIoA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      provider: "YouTube"
    }
  ]
};

/**
 * Generate resources for Book 5 based on the given unit
 * This function returns a set of resources that are appropriate for the specified unit
 * 
 * @param bookId The book ID (should be '5')
 * @param unitId The unit ID (1-16)
 * @returns An array of TeacherResource objects
 */
export function generateBook5UnitResources(bookId: string, unitId: string): TeacherResource[] {
  const resources: TeacherResource[] = [];
  const unitTitle = BOOK5_UNIT_TITLES[unitId] || `Unit ${unitId}`;
  
  // Add videos
  const videos = BOOK5_UNIT_VIDEOS[unitId] || [];
  videos.forEach((video, index) => {
    resources.push({
      id: `book5-unit${unitId}-video-${index + 1}`,
      bookId,
      unitId,
      title: video.title,
      resourceType: 'video',
      provider: video.provider || 'YouTube',
      sourceUrl: video.sourceUrl,
      embedCode: video.embedCode
    });
  });
  
  // Add games
  const games = BOOK5_UNIT_GAMES[unitId] || [];
  games.forEach((game, index) => {
    resources.push({
      id: `book5-unit${unitId}-game-${index + 1}`,
      bookId,
      unitId,
      title: game.title,
      resourceType: 'game',
      provider: game.provider || 'Wordwall',
      sourceUrl: game.sourceUrl,
      embedCode: game.embedCode
    });
  });
  
  return resources;
}

/**
 * Generate default lesson plans for Book 5 units
 * This serves as a template - individual unit files can override this with specific lesson plans
 * 
 * @param unitId The unit ID
 * @param unitTitle The title of the unit
 * @returns An array of LessonPlan objects
 */
export function generateDefaultBook5UnitLessonPlans(unitId: string, unitTitle: string): LessonPlan[] {
  return [
    {
      id: `book5-unit${unitId}-vocab-lesson`,
      title: `${unitTitle} - Vocabulary Development`,
      duration: "45 minutes",
      level: "Intermediate",
      objectives: [
        "Learn key vocabulary related to the unit theme",
        "Practice using new terms in context",
        "Develop listening and speaking skills"
      ],
      materials: [
        `Visual English Book 5 Unit ${unitId} slides`,
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
        "Complete online practice activities"
      ],
      notes: "Adjust the pace based on student understanding. For advanced learners, introduce additional idiomatic expressions related to the theme."
    },
    {
      id: `book5-unit${unitId}-grammar-lesson`,
      title: `${unitTitle} - Grammar Practice`,
      duration: "45 minutes",
      level: "Intermediate",
      objectives: [
        "Understand the grammar point associated with the unit",
        "Practice using the target grammar structures",
        "Apply grammar knowledge in communicative activities"
      ],
      materials: [
        `Visual English Book 5 Unit ${unitId} slides`,
        "Grammar practice worksheets",
        "Interactive activities"
      ],
      steps: [
        {
          title: "Review",
          duration: "5 minutes",
          description: "Quick review of previous vocabulary",
          instructions: ["Ask questions using vocabulary from previous lesson", "Elicit responses from students"]
        },
        {
          title: "Grammar Introduction",
          duration: "10 minutes",
          description: "Present grammar point with examples",
          materials: ["Visual English slides", "Grammar reference sheets"],
          instructions: ["Explain grammar rules", "Show example sentences", "Highlight structure and usage", "Check understanding with quick questions"]
        },
        {
          title: "Controlled Practice",
          duration: "15 minutes",
          description: "Guided exercises with feedback",
          materials: ["Practice worksheets", "Exercise handouts"],
          instructions: ["Guide students through practice exercises", "Provide immediate feedback", "Clarify misconceptions"]
        },
        {
          title: "Free Practice",
          duration: "15 minutes",
          description: "Communicative activities using target grammar",
          materials: ["Role-play cards", "Discussion prompts"],
          instructions: ["Set up communicative tasks", "Have students work in pairs or groups", "Monitor and note common errors for later feedback"]
        }
      ],
      assessmentTips: "Collect and review worksheets. Listen for accurate use of grammar during free practice. Conduct an exit quiz with 3-5 questions to check understanding.",
      homeworkIdeas: [
        "Complete grammar exercises",
        "Write sentences using the target structure",
        "Prepare a short presentation incorporating the grammar point"
      ],
      notes: "Use error correction selectively during free practice to maintain flow. Provide more detailed feedback at the end of the activity."
    }
  ];
}
