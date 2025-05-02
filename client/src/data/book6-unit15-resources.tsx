// This file contains resources for Book 6, Unit 15 (Fashion Accessories themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit15Resources = [
  {
    title: "Fashion Accessories Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/5d2783ba0ff64d5c84bd49992b7ab734",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5d2783ba0ff64d5c84bd49992b7ab734?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Fashion Accessories Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/909a9c5e5ebb4e64892f86ed18f6d581",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/909a9c5e5ebb4e64892f86ed18f6d581?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Fashion Accessories Vocabulary Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/a74d3e4d720144bb85d9aaf10eccb1dc",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a74d3e4d720144bb85d9aaf10eccb1dc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Fashion Accessories Vocabulary Game 4",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/62ec7fa4d36f47b9b5c3bdf4bb68d8d4",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/62ec7fa4d36f47b9b5c3bdf4bb68d8d4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Fashion ESL Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/266409",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/266409" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for Fashion Accessories
export const fashionAccessoriesLessonPlan = {
  id: "fashion-accessories-lesson",
  title: "Fashion Accessories and Style Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to fashion accessories and clothing items",
    "Practice describing different styles and fashion preferences",
    "Develop language for shopping for clothing and accessories",
    "Build skills in expressing opinions about fashion"
  ],
  materials: [
    "Visual English Book 6, Unit 15 slides",
    "Fashion accessories flashcards",
    "Fashion vocabulary games",
    "Fashion ESL Video Lesson",
    "Fashion magazines or catalogs"
  ],
  steps: [
    {
      title: "Warm-up: Fashion Discussion",
      duration: "5 minutes",
      description: "Activate knowledge about fashion and accessories",
      instructions: [
        "Display pictures of people wearing different accessories",
        "Ask students to identify the accessories they see",
        "Discuss which accessories are popular among students",
        "Ask students about their favorite accessories and why they like them"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to fashion accessories",
      materials: ["Visual English Book 6, Unit 15 slides", "Fashion accessories flashcards"],
      instructions: [
        "Introduce vocabulary: necklace, earrings, bracelet, watch, scarf, tie, etc.",
        "Organize accessories by category (jewelry, headwear, etc.)",
        "Teach adjectives to describe accessories: elegant, casual, formal, trendy, etc.",
        "Present collocations: 'wear accessories', 'match with an outfit', 'go with', etc."
      ]
    },
    {
      title: "Video: Fashion Styles",
      duration: "10 minutes",
      description: "Watch and analyze different fashion styles",
      materials: ["Fashion ESL Video Lesson"],
      instructions: [
        "Play the Fashion ESL Video Lesson",
        "Ask students to identify accessories mentioned in the video",
        "Discuss different styles presented and vocabulary used",
        "Have students describe their favorite style using new vocabulary"
      ]
    },
    {
      title: "Interactive Games: Fashion Accessories",
      duration: "10 minutes",
      description: "Reinforce fashion vocabulary through games",
      materials: ["Fashion Accessories Vocabulary Games"],
      instructions: [
        "Have students play the Wordwall fashion accessories vocabulary games",
        "Encourage full sentences when identifying items: 'She is wearing a...' etc.",
        "Review any difficult vocabulary as a class",
        "Discuss how different accessories can change an outfit's style"
      ]
    },
    {
      title: "Fashion Styling Activity",
      duration: "10 minutes",
      description: "Apply fashion vocabulary in a creative activity",
      materials: ["Fashion magazines or catalogs"],
      instructions: [
        "Divide students into small groups",
        "Distribute fashion magazines or catalogs to each group",
        "Groups select an outfit and describe what accessories would go well with it",
        "Each group presents their outfit and accessory choices to the class",
        "Students explain why those accessories match the outfit",
        "Other students can make alternative suggestions"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of fashion vocabulary, ability to describe accessories appropriately, and participation in the fashion styling activity.",
  homeworkIdeas: [
    "Create a fashion vocabulary mind map with at least 15 accessories", 
    "Write a short paragraph describing your ideal outfit including accessories",
    "Research fashion trends in a specific country and make notes on popular accessories"
  ],
  additionalResources: [
    {
      title: "Fashion Vocabulary Guide",
      url: "https://www.vocabulary.cl/english/clothes-clothing.htm"
    },
    {
      title: "ESL Fashion Activities",
      url: "https://www.fluentu.com/blog/educator-english/esl-fashion-vocabulary/"
    }
  ]
};

// Second lesson plan for Unit 15: Fashion Trends and Shopping
export const fashionTrendsShoppingLessonPlan = {
  id: "fashion-trends-shopping-lesson",
  title: "Fashion Trends and Shopping",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to fashion trends and shopping",
    "Practice conversations in clothing and accessory stores",
    "Develop language for expressing preferences and making comparisons",
    "Build skills in describing and discussing current fashion trends"
  ],
  materials: [
    "Visual English Book 6, Unit 15 slides",
    "Shopping dialogue cards",
    "Price tag templates",
    "Pictures of current fashion trends",
    "Fashion accessories vocabulary games"
  ],
  steps: [
    {
      title: "Warm-up: Fashion Trends",
      duration: "5 minutes",
      description: "Discuss current fashion trends and shopping habits",
      materials: ["Pictures of current fashion trends"],
      instructions: [
        "Show pictures of current fashion trends and popular accessories",
        "Ask students: 'Which of these trends do you like/dislike? Why?'",
        "Discuss how trends change over time and across cultures",
        "Ask about students' shopping habits: 'Where do you shop for accessories?'"
      ]
    },
    {
      title: "Shopping Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to shopping for fashion items",
      materials: ["Visual English Book 6, Unit 15 slides", "Price tag templates"],
      instructions: [
        "Introduce shopping vocabulary: sale, discount, bargain, try on, fit, etc.",
        "Present shopping phrases: 'Can I try this on?', 'Do you have this in another color?', etc.",
        "Teach price expressions: 'It costs...', 'It's on sale for...', 'That's a good deal', etc.",
        "Practice reading price tags and expressing prices correctly"
      ]
    },
    {
      title: "Comparison Shopping Activity",
      duration: "10 minutes",
      description: "Practice comparison language with fashion items",
      instructions: [
        "Present comparative and superlative forms: 'more expensive than', 'the cheapest', etc.",
        "Show pictures of similar accessories with different prices",
        "Students practice making comparisons: 'The gold necklace is more expensive than the silver one'",
        "Introduce expressions of preference: 'I prefer', 'I'd rather', 'I think...is better'",
        "Students express preferences and give reasons"
      ]
    },
    {
      title: "Shopping Dialogues",
      duration: "10 minutes",
      description: "Practice conversations in clothing and accessory stores",
      materials: ["Shopping dialogue cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute shopping dialogue cards with different scenarios",
        "Pairs create and practice conversations between a customer and shop assistant",
        "Encourage use of shopping vocabulary and phrases from the lesson",
        "Have volunteers perform their dialogues for the class",
        "Provide feedback on language use and appropriateness"
      ]
    },
    {
      title: "Fashion Trends Presentation",
      duration: "10 minutes",
      description: "Students discuss and present current fashion trends",
      instructions: [
        "Divide students into small groups",
        "Each group discusses a current fashion trend in accessories",
        "Groups prepare a short presentation about their trend",
        "Presentations should include: what the trend is, why it's popular, examples, and opinions",
        "Each group presents to the class",
        "Other students ask questions or share their opinions on the trend"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of shopping vocabulary, ability to create realistic shopping dialogues, and participation in the fashion trends presentation.",
  homeworkIdeas: [
    "Write a shopping dialogue between a customer and sales assistant", 
    "Create a fashion trend report about a current accessory trend",
    "Compare prices of similar accessories from different stores and write about the differences"
  ],
  additionalResources: [
    {
      title: "Shopping Vocabulary Guide",
      url: "https://www.englishclub.com/vocabulary/shopping.htm"
    },
    {
      title: "Fashion Trends ESL Activities",
      url: "https://busyteacher.org/7925-fashion-trends-speaking-activity.html"
    }
  ]
};
import { TeacherResource } from "@/components/TeacherResources";

export const fashionResources: TeacherResource[] = [
  {
    title: "Fashion Accessories Game 1",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/5d2783ba0ff64d5c84bd49992b7ab734",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/5d2783ba0ff64d5c84bd49992b7ab734?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Fashion Accessories Game 2",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/909a9c5e5ebb4e64892f86ed18f6d581",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/909a9c5e5ebb4e64892f86ed18f6d581?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Fashion Accessories Game 3",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/a74d3e4d720144bb85d9aaf10eccb1dc",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a74d3e4d720144bb85d9aaf10eccb1dc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    title: "Fashion Accessories Game 4",
    resourceType: "game",
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/62ec7fa4d36f47b9b5c3bdf4bb68d8d4",
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/62ec7fa4d36f47b9b5c3bdf4bb68d8d4?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];
