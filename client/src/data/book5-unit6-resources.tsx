// This file contains resources for Book 5, Unit 6 (Nationalities themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit6Resources = [
  {
    title: "Nationalities and Countries Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/151de0b0e78c40c982330a4f5b54bfd8",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/151de0b0e78c40c982330a4f5b54bfd8?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Nationalities and Continents Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/1501e730acca4735b3f9e2f41c1b3412",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1501e730acca4735b3f9e2f41c1b3412?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Nationalities and Countries Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/7e1e16ccded843338ef89765c16e875d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7e1e16ccded843338ef89765c16e875d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Luna's Seek and Find - Nationalities Game",
    resourceType: "game" as const,
    provider: "PBS Kids",
    sourceUrl: "https://pbskids.org/luna/games/lunas-seek-and-find"
  },
  {
    title: "Luna's World Packages - Countries Game",
    resourceType: "game" as const,
    provider: "PBS Kids",
    sourceUrl: "https://pbskids.org/luna/games/lunas-world-packages"
  },
  {
    title: "Nationalities Kahoot Quiz",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/nationalities/3c1603e3-1f81-4c67-9f3f-4aa2855331bf"
  },
  {
    title: "Car Brand Nationalities Kahoot Quiz",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/20-car-brand-nationalities/90e2a9f0-fcec-4374-9ece-35ae3c774953"
  },
  {
    title: "Countries and Nationalities Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/PzqdDdxr9VI",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PzqdDdxr9VI?si=Gs8qMPs6F1xEUidN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Countries and Nationalities
export const countriesNationalitiesLessonPlan = {
  id: "countries-nationalities-lesson",
  title: "Countries and Nationalities Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to countries and their nationalities",
    "Practice forming nationality adjectives from country names",
    "Develop language for discussing global geography",
    "Build cultural awareness through diverse nationality exploration"
  ],
  materials: [
    "Visual English Book 5, Unit 6 slides",
    "Nationalities and Countries Games",
    "Countries and Nationalities Video",
    "World map",
    "Country/nationality matching cards"
  ],
  steps: [
    {
      title: "Warm-up: Countries We Know",
      duration: "5 minutes",
      description: "Activate prior knowledge about countries and nationalities",
      instructions: [
        "Ask students: 'What countries have you visited or would like to visit?'",
        "Create a list of countries on the board",
        "Point to countries on a world map as they are mentioned",
        "Ask students if they know the nationalities for some of these countries"
      ]
    },
    {
      title: "Countries and Nationalities Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary for countries and their corresponding nationalities",
      materials: ["Visual English Book 5, Unit 6 slides", "World map"],
      instructions: [
        "Present common country-nationality pairs: France-French, Japan-Japanese, etc.",
        "Highlight nationality adjective patterns: -ish (British), -ian (Canadian), -ese (Chinese), etc.",
        "Discuss exceptions and irregular forms: Dutch, Swiss, Thai, etc.",
        "Practice pronunciation of both country and nationality words"
      ]
    },
    {
      title: "Video: Countries and Nationalities",
      duration: "10 minutes",
      description: "Watch a video explaining country-nationality relationships",
      materials: ["Countries and Nationalities Video"],
      instructions: [
        "Play the Countries and Nationalities Video",
        "Ask students to note any new nationality forms they hear",
        "Pause to discuss interesting or challenging examples",
        "After watching, review key nationality patterns from the video"
      ]
    },
    {
      title: "Interactive Games: Nationalities Practice",
      duration: "10 minutes",
      description: "Practice country-nationality connections through digital games",
      materials: ["Nationalities and Countries Games"],
      instructions: [
        "Have students play the Nationalities and Countries Games",
        "Encourage students to say both the country and nationality when answering",
        "Review any difficult or confusing nationality forms",
        "Discuss how nationality words can be both adjectives and nouns"
      ]
    },
    {
      title: "Nationality Matching Activity",
      duration: "10 minutes",
      description: "Practice matching countries with nationalities",
      materials: ["Country/nationality matching cards"],
      instructions: [
        "Divide students into pairs or small groups",
        "Distribute country/nationality matching cards",
        "Students match country names with their corresponding nationalities",
        "After matching, students create sentences using the nationality as both an adjective and a noun",
        "Example: 'She is Spanish.' (nationality as noun) and 'She speaks the Spanish language.' (nationality as adjective)",
        "Groups share their sentences with the class",
        "Discuss any patterns or rules they noticed about nationality word formation"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of nationality vocabulary, ability to form nationality adjectives from country names, and participation in the matching activity.",
  homeworkIdeas: [
    "Create a chart of 15 countries and their nationalities, including examples of sentences using each nationality", 
    "Research three countries and write a paragraph about each one using the nationality in different ways",
    "Design a quiz testing classmates on country-nationality pairs"
  ],
  additionalResources: [
    {
      title: "ESL Countries and Nationalities Resources",
      url: "https://www.teach-this.com/resources/countries-and-nationalities"
    },
    {
      title: "Nationality Adjectives Guide",
      url: "https://www.ef.com/wwen/english-resources/english-grammar/nationalities/"
    }
  ]
};

// Second lesson plan for Unit 6: Cultural Diversity and Global Awareness
export const culturalDiversityLessonPlan = {
  id: "cultural-diversity-lesson",
  title: "Cultural Diversity and Global Awareness",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Expand vocabulary related to cultures and cultural elements",
    "Practice discussing cultural similarities and differences",
    "Develop language for expressing appreciation of diversity",
    "Build global awareness through cultural comparison"
  ],
  materials: [
    "Visual English Book 5, Unit 6 slides",
    "Nationalities and Continents Game",
    "Cultural elements cards",
    "Famous landmarks pictures",
    "Cultural profile worksheet"
  ],
  steps: [
    {
      title: "Warm-up: Cultural Elements",
      duration: "5 minutes",
      description: "Activate knowledge about cultural components",
      instructions: [
        "Ask students: 'What makes up a culture?'",
        "Create a mind map of cultural elements on the board (food, clothing, music, etc.)",
        "Show pictures representing different cultures and ask students to identify them",
        "Discuss what students know about cultures different from their own"
      ]
    },
    {
      title: "Cultural Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to cultures and cultural identity",
      materials: ["Visual English Book 5, Unit 6 slides", "Cultural elements cards"],
      instructions: [
        "Introduce cultural vocabulary: tradition, custom, heritage, festival, ceremony, etc.",
        "Present cultural element categories: cuisine, attire, celebration, art, music, etc.",
        "Teach phrases for discussing culture: 'It's customary to...', 'They traditionally...', etc.",
        "Use cultural elements cards to explore different aspects of various cultures"
      ]
    },
    {
      title: "Famous Landmarks and Cultural Icons",
      duration: "10 minutes",
      description: "Explore landmarks and symbols associated with different countries",
      materials: ["Famous landmarks pictures"],
      instructions: [
        "Show pictures of famous landmarks and cultural icons",
        "Ask students to identify the country and nationality associated with each",
        "Discuss the cultural significance of each landmark",
        "Teach vocabulary related to architecture and cultural monuments",
        "Have students share any landmarks they have visited or would like to visit"
      ]
    },
    {
      title: "Interactive Game: Continental Cultures",
      duration: "10 minutes",
      description: "Practice grouping countries by continent and discussing cultural regions",
      materials: ["Nationalities and Continents Game"],
      instructions: [
        "Have students play the Nationalities and Continents Game",
        "Discuss how countries on the same continent may share cultural features",
        "Explore vocabulary for describing cultural regions",
        "Compare and contrast countries within the same continent"
      ]
    },
    {
      title: "Cultural Profile Activity",
      duration: "10 minutes",
      description: "Create a profile of a selected country's culture",
      materials: ["Cultural profile worksheet"],
      instructions: [
        "Divide students into small groups",
        "Assign or have each group select a country",
        "Distribute cultural profile worksheets with sections for:",
        "- Food and cuisine",
        "- Traditional clothing",
        "- Festivals and celebrations",
        "- Music and arts",
        "- Interesting customs",
        "Groups complete the worksheet for their assigned country",
        "Groups share their cultural profiles with the class",
        "Discuss similarities and differences between the cultures presented"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of cultural vocabulary, ability to describe cultural elements from different countries, and participation in the cultural profile activity.",
  homeworkIdeas: [
    "Research a country's culture and create a more detailed cultural profile", 
    "Compare your own culture with another culture, noting similarities and differences",
    "Create a presentation about a cultural festival from a country that interests you"
  ],
  additionalResources: [
    {
      title: "Cultural Studies ESL Resources",
      url: "https://www.eslflow.com/interculturalcommunication.html"
    },
    {
      title: "World Culture Encyclopedia",
      url: "https://www.everyculture.com/"
    }
  ]
};
