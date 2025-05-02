// This file contains resources for Book 5, Unit 12 (Transport themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit12Resources = [
  {
    title: "Transport Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/74768357b1e242778c463a6046545118",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/74768357b1e242778c463a6046545118?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Transport Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/d72f01439ad445f48f95638b2a95d313",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d72f01439ad445f48f95638b2a95d313?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Transport Vocabulary Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/89ac5e3a555f4cb6b4a8abbe7a8be343",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/89ac5e3a555f4cb6b4a8abbe7a8be343?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Transport and Travel Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/E-lVNX0Q2Uo",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/E-lVNX0Q2Uo?si=4gEiPOGsxG6jtWEc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Transport Vocabulary
export const transportVocabularyLessonPlan = {
  id: "transport-vocabulary-lesson",
  title: "Transport Vocabulary and Types",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to different modes of transport",
    "Categorize transport by type, speed, and purpose",
    "Develop language for discussing travel preferences",
    "Build speaking skills through transport-themed conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 12 slides",
    "Transport Vocabulary Games",
    "Transport and Travel Video",
    "Transport picture cards",
    "Transport category chart"
  ],
  steps: [
    {
      title: "Warm-up: How Did You Get Here?",
      duration: "5 minutes",
      description: "Activate prior knowledge about transport",
      instructions: [
        "Ask students: 'How did you get to school/class today?'",
        "Create a tally chart on the board showing different modes of transport used",
        "Discuss which transport methods are most/least common in the class",
        "Introduce the topic of transport vocabulary and categories"
      ]
    },
    {
      title: "Transport Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary for various modes of transport",
      materials: ["Visual English Book 5, Unit 12 slides", "Transport picture cards"],
      instructions: [
        "Present transport vocabulary grouped by category:",
        "- Road: car, bus, motorcycle, bicycle, truck, van, etc.",
        "- Rail: train, tram, subway/underground, monorail, etc.",
        "- Air: airplane, helicopter, hot air balloon, glider, etc.",
        "- Water: ship, boat, ferry, yacht, canoe, etc.",
        "Use picture cards to practice identification and pronunciation",
        "Discuss parts of vehicles: wheel, engine, wing, propeller, deck, etc."
      ]
    },
    {
      title: "Video: Transport and Travel",
      duration: "10 minutes",
      description: "Watch a video about different modes of transport",
      materials: ["Transport and Travel Video"],
      instructions: [
        "Play the Transport and Travel Video",
        "Ask students to note any new transport vocabulary they hear",
        "Pause to discuss interesting modes of transport shown",
        "After watching, review the transport vocabulary presented in the video",
        "Discuss which modes of transport students have/haven't used"
      ]
    },
    {
      title: "Interactive Games: Transport Vocabulary",
      duration: "10 minutes",
      description: "Practice transport vocabulary through digital games",
      materials: ["Transport Vocabulary Games"],
      instructions: [
        "Have students play the Transport Vocabulary Games",
        "Encourage them to use the vocabulary in complete sentences",
        "Example: 'A ferry is used to cross water', 'People travel by helicopter'",
        "Review any challenging vocabulary as a class",
        "Discuss transport-related verbs: drive, ride, fly, sail, etc."
      ]
    },
    {
      title: "Transport Comparison Activity",
      duration: "10 minutes",
      description: "Compare different modes of transport using categorization",
      materials: ["Transport category chart"],
      instructions: [
        "Divide students into small groups",
        "Distribute transport category charts with columns for:",
        "- Speed (fast/medium/slow)",
        "- Distance (short/medium/long journeys)",
        "- Capacity (few/many passengers)",
        "- Environmental impact (high/medium/low)",
        "Groups categorize different modes of transport according to these criteria",
        "Example: 'Airplanes are fast, for long journeys, can carry many passengers, but have high environmental impact'",
        "Groups share their categorizations with the class",
        "Class discusses the advantages and disadvantages of different transport methods",
        "Finish with a brief debate on 'The best way to travel is...'"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of transport vocabulary, ability to categorize different modes of transport, and participation in the comparison activity.",
  homeworkIdeas: [
    "Create a poster about an unusual mode of transport with labeled parts and information", 
    "Write a paragraph about your ideal journey, describing the transport you would use for different parts",
    "Survey family members about their transport preferences and prepare a report"
  ],
  additionalResources: [
    {
      title: "ESL Transport Vocabulary",
      url: "https://www.eslflow.com/Transportslessonplans.html"
    },
    {
      title: "Transport Comparison Activities",
      url: "https://busyteacher.org/classroom_activities-vocabulary/transportation-worksheets/"
    }
  ]
};

// Second lesson plan for Unit 12: Transport and Travel Conversations
export const transportTravelConversationsLessonPlan = {
  id: "transport-travel-conversations-lesson",
  title: "Transport and Travel Conversations",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn language for discussing journeys and travel plans",
    "Practice travel-related conversations and scenarios",
    "Develop vocabulary for transport problems and solutions",
    "Build confidence in handling real-world travel situations"
  ],
  materials: [
    "Visual English Book 5, Unit 12 slides",
    "Transport Vocabulary Game 3",
    "Transport and Travel Video",
    "Travel situation cards",
    "Transport timetable examples"
  ],
  steps: [
    {
      title: "Warm-up: Recent Journeys",
      duration: "5 minutes",
      description: "Activate knowledge about travel experiences",
      instructions: [
        "Ask students about a recent journey they made: 'Where did you go? How did you travel?'",
        "Encourage descriptions using transport vocabulary",
        "Discuss what makes a journey good or bad",
        "Introduce travel-related vocabulary and phrases"
      ]
    },
    {
      title: "Travel Conversation Vocabulary",
      duration: "10 minutes",
      description: "Learn useful phrases for transport and travel situations",
      materials: ["Visual English Book 5, Unit 12 slides"],
      instructions: [
        "Present vocabulary for different travel situations:",
        "- Buying tickets: 'A return ticket to...', 'What time is the next...?'",
        "- Asking for information: 'Does this bus go to...?', 'Which platform...?'",
        "- Problems: 'The train is delayed', 'I've missed my connection'",
        "- Giving directions: 'Take the number 5 bus', 'Change at the station'",
        "Model dialogues using the phrases",
        "Have students repeat and practice the expressions"
      ]
    },
    {
      title: "Video: Transport Situations",
      duration: "10 minutes",
      description: "Watch sections of the video focusing on travel interactions",
      materials: ["Transport and Travel Video"],
      instructions: [
        "Play relevant sections of the Transport and Travel Video",
        "Focus on parts showing interactions (buying tickets, asking directions, etc.)",
        "Pause to discuss useful phrases and vocabulary",
        "Have students predict what the people might say next",
        "Review the most useful expressions for travel communications"
      ]
    },
    {
      title: "Interactive Game: Transport Vocabulary Practice",
      duration: "10 minutes",
      description: "Reinforce transport and travel vocabulary",
      materials: ["Transport Vocabulary Game 3"],
      instructions: [
        "Have students play Transport Vocabulary Game 3",
        "For each transport word, ask students to suggest a related travel phrase",
        "Example: 'Train' → 'When does the train depart?'",
        "Review any challenging vocabulary or expressions",
        "Discuss strategies for effective communication while traveling"
      ]
    },
    {
      title: "Travel Scenario Role-plays",
      duration: "10 minutes",
      description: "Practice conversations for common travel situations",
      materials: ["Travel situation cards", "Transport timetable examples"],
      instructions: [
        "Divide students into pairs",
        "Distribute travel situation cards with scenarios like:",
        "- Buying a train ticket for a specific destination",
        "- Asking for directions to the bus station",
        "- Reporting a problem with a flight",
        "- Asking about transport schedules",
        "Provide timetables or transport maps as props",
        "Pairs prepare and practice dialogues for their scenarios",
        "Volunteers perform their dialogues for the class",
        "Class provides feedback on effective communication"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their use of appropriate travel phrases, ability to engage in transport-related conversations, and participation in the role-play activity.",
  homeworkIdeas: [
    "Write a dialogue between a traveler and a ticket agent, flight attendant, or taxi driver", 
    "Create a travel guide with useful phrases for using different modes of transport",
    "Record a short video role-play of a travel conversation with a friend or family member"
  ],
  additionalResources: [
    {
      title: "ESL Travel Conversations",
      url: "https://www.eslfast.com/easydialogs/ec/transportation01.html"
    },
    {
      title: "Travel English Resource Guide",
      url: "https://www.thoughtco.com/esl-traveling-4133095"
    }
  ]
};
