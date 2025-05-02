// This file contains resources for Book 5, Unit 15 (Let's Go Sightseeing themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit15Resources = [
  {
    title: "Monuments of the World Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/8447783f507844c48ac5be37820d9f24",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8447783f507844c48ac5be37820d9f24?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Places to Visit Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/5d89ce9a2ced4979827c3c892d25c832",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/5d89ce9a2ced4979827c3c892d25c832?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Sightseeing in London Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/864c75894af24bb9a009cbf29d9c7e8d",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/864c75894af24bb9a009cbf29d9c7e8d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Famous Landmarks Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/w3Gyz_-TkJ8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/w3Gyz_-TkJ8?si=wcNaunKXBwLzyTl6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "London Landmarks Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/WFRR0zC70-0",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WFRR0zC70-0?si=SGDe1RjJT3nZ9JV3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Famous Landmarks
export const famousLandmarksLessonPlan = {
  id: "famous-landmarks-lesson",
  title: "Famous Landmarks and Monuments",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to famous landmarks and monuments",
    "Match landmarks to their countries and cities",
    "Develop language for describing tourist attractions",
    "Build cultural awareness through exploration of global landmarks"
  ],
  materials: [
    "Visual English Book 5, Unit 15 slides",
    "Monuments of the World Game",
    "Famous Landmarks Video",
    "World map or globe",
    "Landmark picture cards",
    "Landmark information cards"
  ],
  steps: [
    {
      title: "Warm-up: Landmark Recognition",
      duration: "5 minutes",
      description: "Activate prior knowledge about famous landmarks",
      instructions: [
        "Show pictures of well-known landmarks (Eiffel Tower, Taj Mahal, etc.)",
        "Ask students if they recognize them and what countries they're in",
        "Create a list of identified landmarks on the board",
        "Ask if anyone has visited any famous landmarks",
        "Introduce the topic of sightseeing and landmarks"
      ]
    },
    {
      title: "Landmark Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to famous sites and monuments",
      materials: ["Visual English Book 5, Unit 15 slides", "Landmark picture cards"],
      instructions: [
        "Present landmark vocabulary: monument, statue, tower, palace, cathedral, etc.",
        "Introduce famous landmarks with their locations: 'The Colosseum is in Rome, Italy'",
        "Teach descriptive vocabulary: ancient, modern, spectacular, iconic, historic, etc.",
        "Practice pronunciation of landmark and city names",
        "Have students match landmark pictures with their names and locations"
      ]
    },
    {
      title: "Video: Famous Landmarks",
      duration: "10 minutes",
      description: "Watch a video about famous landmarks around the world",
      materials: ["Famous Landmarks Video"],
      instructions: [
        "Play the Famous Landmarks Video",
        "Ask students to note any new landmarks they see",
        "Pause at key moments to discuss interesting landmarks",
        "After watching, review the landmarks presented in the video",
        "Discuss which landmarks students would most like to visit and why"
      ]
    },
    {
      title: "Interactive Game: Monuments of the World",
      duration: "10 minutes",
      description: "Practice landmark vocabulary through a digital game",
      materials: ["Monuments of the World Game"],
      instructions: [
        "Have students play the Monuments of the World Game",
        "For each landmark, ask students to say something interesting about it",
        "Review any challenging landmark names or locations",
        "Discuss what makes certain landmarks famous or special"
      ]
    },
    {
      title: "Landmark Presentation Activity",
      duration: "10 minutes",
      description: "Practice describing famous landmarks",
      materials: ["Landmark information cards", "World map or globe"],
      instructions: [
        "Divide students into small groups",
        "Distribute landmark information cards with details about different monuments",
        "Groups prepare a short presentation about their landmark including:",
        "- Name and location (country/city)",
        "- When it was built",
        "- Why it's famous",
        "- Interesting facts",
        "Each group presents their landmark to the class",
        "After each presentation, locate the landmark on the world map",
        "Class votes on which landmark they'd most like to visit"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of landmark vocabulary, ability to connect landmarks with their locations, and participation in the presentation activity.",
  homeworkIdeas: [
    "Create a poster or digital presentation about a famous landmark in your country", 
    "Research and write a paragraph about a landmark you would like to visit",
    "Design a tourist brochure for three landmarks in the same country or region"
  ],
  additionalResources: [
    {
      title: "ESL Famous Landmarks Resources",
      url: "https://en.islcollective.com/english-esl-worksheets/vocabulary/places-city/famous-landmarks"
    },
    {
      title: "World Landmarks Information",
      url: "https://www.kids-world-travel-guide.com/top-monuments.html"
    }
  ]
};

// Second lesson plan for Unit 15: Sightseeing and Tourism
export const sightseeingTourismLessonPlan = {
  id: "sightseeing-tourism-lesson",
  title: "Sightseeing and Tourism",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to tourism and sightseeing activities",
    "Practice asking for and giving tourist information",
    "Develop language for describing travel experiences",
    "Build speaking skills through tourism-themed role plays"
  ],
  materials: [
    "Visual English Book 5, Unit 15 slides",
    "Places to Visit Game",
    "Sightseeing in London Game",
    "London Landmarks Video",
    "Tourist information brochures",
    "City tour map handouts"
  ],
  steps: [
    {
      title: "Warm-up: Travel Experiences",
      duration: "5 minutes",
      description: "Activate knowledge about tourism and sightseeing",
      instructions: [
        "Ask students: 'Have you ever been a tourist? Where did you go? What did you see?'",
        "Create a list of tourist activities on the board: taking photos, buying souvenirs, etc.",
        "Discuss what makes a good tourist experience",
        "Introduce the topic of sightseeing vocabulary and tourism"
      ]
    },
    {
      title: "Tourism Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to tourism and sightseeing",
      materials: ["Visual English Book 5, Unit 15 slides", "Tourist information brochures"],
      instructions: [
        "Present tourism vocabulary: sightseeing, guided tour, souvenir, tourist attraction, etc.",
        "Introduce travel-related verbs: visit, explore, discover, experience, photograph, etc.",
        "Teach tourist facilities vocabulary: information center, tour bus, audio guide, etc.",
        "Show examples of tourist brochures and discuss the information they contain",
        "Have students identify tourism vocabulary in the brochures"
      ]
    },
    {
      title: "Video: London Landmarks",
      duration: "10 minutes",
      description: "Watch a video about landmarks in London",
      materials: ["London Landmarks Video"],
      instructions: [
        "Play the London Landmarks Video",
        "Ask students to note down the different attractions shown",
        "Pause to discuss specific landmarks and their features",
        "After watching, create a list of London attractions on the board",
        "Discuss which landmarks would be included in a one-day tour of London"
      ]
    },
    {
      title: "Interactive Games: Sightseeing Practice",
      duration: "10 minutes",
      description: "Practice tourism vocabulary through digital games",
      materials: ["Places to Visit Game", "Sightseeing in London Game"],
      instructions: [
        "Have students play the Places to Visit Game",
        "Continue with the Sightseeing in London Game",
        "For each place identified, ask students what activities tourists might do there",
        "Review any challenging vocabulary related to tourism and sightseeing",
        "Discuss differences between types of tourist attractions (historical, cultural, natural, etc.)"
      ]
    },
    {
      title: "Tourist Information Role Play",
      duration: "10 minutes",
      description: "Practice conversations related to tourism",
      materials: ["City tour map handouts"],
      instructions: [
        "Divide students into pairs",
        "Distribute city tour map handouts",
        "One student plays a tourist visiting the city for the first time",
        "The other student plays a tour guide or information desk staff",
        "Tourist asks questions about:",
        "- Recommended attractions to visit",
        "- How to get to specific landmarks",
        "- Opening hours and ticket prices",
        "- Where to eat, shop, or take photos",
        "Guide provides information and suggestions",
        "Pairs practice their dialogues",
        "Volunteers perform their role plays for the class",
        "Class provides feedback on the helpfulness of the information provided"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of tourism vocabulary, ability to ask for and provide tourist information, and participation in the role play activity.",
  homeworkIdeas: [
    "Create a one-day sightseeing itinerary for tourists visiting your town or city", 
    "Write a dialogue between a tourist and a local asking about attractions in a specific city",
    "Design a tourist brochure for a destination of your choice"
  ],
  additionalResources: [
    {
      title: "ESL Tourism Vocabulary",
      url: "https://www.vocabulary.cl/Lists/Tourism.htm"
    },
    {
      title: "Tourist Information Role Plays",
      url: "https://www.teachingenglish.org.uk/resources/activities/tourist-information"
    }
  ]
};
