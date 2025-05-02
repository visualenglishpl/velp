// This file contains resources for Book 6, Unit 13 (At the Airport themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book6Unit13Resources = [
  {
    title: "At the Airport Vocabulary Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/ccb5b022c55d4267a1f7a53031171834",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ccb5b022c55d4267a1f7a53031171834?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "At the Airport Vocabulary Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4924741921d44b4c9cd142bf981cb4c2",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4924741921d44b4c9cd142bf981cb4c2?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "At the Airport Vocabulary Game 3",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/b2e5db302e2a4448bfed489e232a1587",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b2e5db302e2a4448bfed489e232a1587?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "ESL At the Airport Video Lesson",
    resourceType: "video" as const,
    provider: "ISL Collective",
    sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/546172",
    embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/546172" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
  }
];

// Lesson plan data for At the Airport
export const airportVocabularyLessonPlan = {
  id: "airport-vocabulary-lesson",
  title: "Airport Vocabulary and Travel Phrases",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to airports and air travel",
    "Practice common phrases used at the airport",
    "Develop skills for navigating through the check-in process",
    "Build confidence in travel-related communication"
  ],
  materials: [
    "Visual English Book 6, Unit 13 slides",
    "Airport vocabulary flashcards",
    "Airport announcement audio clips",
    "Wordwall airport vocabulary games"
  ],
  steps: [
    {
      title: "Warm-up: Airport Experience",
      duration: "5 minutes",
      description: "Activate prior knowledge about airports and air travel",
      instructions: [
        "Ask students if they have ever been to an airport or traveled by plane",
        "Have volunteers share their experiences or what they know about airports",
        "Create a quick mind map of airport-related words on the board",
        "Introduce the lesson topic: At the Airport"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key vocabulary related to airports and air travel",
      materials: ["Visual English Book 6, Unit 13 slides", "Airport vocabulary flashcards"],
      instructions: [
        "Introduce vocabulary: check-in counter, boarding pass, baggage claim, security checkpoint, etc.",
        "Show airport vocabulary flashcards and have students repeat the terms",
        "Explain the airport process from arrival to boarding the plane",
        "Discuss different airport areas and their functions"
      ]
    },
    {
      title: "Airport Announcements Activity",
      duration: "10 minutes",
      description: "Practice understanding airport announcements",
      materials: ["Airport announcement audio clips"],
      instructions: [
        "Play sample airport announcements for students",
        "Discuss the vocabulary and phrases used in the announcements",
        "Have students identify key information: flight numbers, gates, boarding times",
        "Practice making simple airport announcements in pairs"
      ]
    },
    {
      title: "Interactive Games: Airport Vocabulary",
      duration: "10 minutes",
      description: "Reinforce airport vocabulary through games",
      materials: ["Wordwall airport vocabulary games"],
      instructions: [
        "Have students play the Wordwall airport vocabulary games",
        "Encourage students to identify words they found challenging",
        "Review any difficult vocabulary as a class",
        "Award points for correct answers and discuss any misunderstandings"
      ]
    },
    {
      title: "Airport Role-play",
      duration: "10 minutes",
      description: "Practice airport interactions through role-play",
      instructions: [
        "Divide students into pairs",
        "Assign roles: passenger and airport staff (check-in agent, security officer, etc.)",
        "Provide scenario cards for different airport situations",
        "Have students act out their scenarios using the vocabulary learned",
        "Switch roles after 5 minutes",
        "Ask a few pairs to perform their role-plays for the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of airport vocabulary, ability to understand and respond to airport announcements, and participation in the role-play activity.",
  homeworkIdeas: [
    "Write a short dialogue between a passenger and an airport staff member", 
    "Create a list of 10 important things to remember when traveling by air",
    "Research and write about airport procedures in another country"
  ],
  additionalResources: [
    {
      title: "ESL Airport Vocabulary Guide",
      url: "https://www.eslbuzz.com/airport-vocabulary/"
    }
  ]
};

// Second lesson plan for Unit 13: Travel Problems and Solutions
export const travelProblemsSolutionsLessonPlan = {
  id: "travel-problems-solutions-lesson",
  title: "Travel Problems and Solutions",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to common travel problems",
    "Develop language for describing issues and seeking assistance",
    "Practice problem-solving conversations in travel contexts",
    "Build confidence in handling difficult travel situations"
  ],
  materials: [
    "Visual English Book 6, Unit 13 slides",
    "Travel problem scenario cards",
    "Problem-solution matching cards",
    "ESL At the Airport Video Lesson"
  ],
  steps: [
    {
      title: "Warm-up: Travel Problems Discussion",
      duration: "5 minutes",
      description: "Activate knowledge about common travel issues",
      instructions: [
        "Ask students: 'What problems can happen when traveling by air?'",
        "List their suggestions on the board",
        "Categorize problems (before flight, at the airport, during flight, after landing)",
        "Ask if any students have experienced these problems and how they handled them"
      ]
    },
    {
      title: "Problem Vocabulary and Phrases",
      duration: "10 minutes",
      description: "Learn vocabulary related to travel problems and helpful phrases",
      materials: ["Visual English Book 6, Unit 13 slides"],
      instructions: [
        "Present vocabulary: delayed flight, canceled flight, missed connection, lost baggage, etc.",
        "Introduce useful phrases: 'I've missed my flight', 'My luggage hasn't arrived', etc.",
        "Teach question forms: 'Could you tell me where...?', 'When will the next flight be?'",
        "Demonstrate polite language for requesting assistance"
      ]
    },
    {
      title: "Video: Airport Problems and Solutions",
      duration: "10 minutes",
      description: "Watch and analyze travel problem scenarios",
      materials: ["ESL At the Airport Video Lesson"],
      instructions: [
        "Play the ESL At the Airport Video Lesson",
        "Ask students to identify the problems presented in the video",
        "Discuss the solutions and language used",
        "Note any additional useful phrases from the video"
      ]
    },
    {
      title: "Problem-Solution Matching",
      duration: "10 minutes",
      description: "Match travel problems with appropriate solutions",
      materials: ["Problem-solution matching cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute problem cards and solution cards",
        "Groups match each problem with an appropriate solution",
        "Review matches as a class and discuss alternative solutions",
        "Introduce additional vocabulary as needed"
      ]
    },
    {
      title: "Travel Problem Role-play",
      duration: "10 minutes",
      description: "Practice handling travel problems through role-play",
      materials: ["Travel problem scenario cards"],
      instructions: [
        "Divide students into pairs",
        "Assign roles: traveler with a problem and airline/airport staff",
        "Distribute scenario cards with specific travel problems",
        "Pairs create and practice dialogues addressing the problems",
        "Have volunteers perform their role-plays for the class",
        "Provide feedback on language use and problem-solving approach"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to identify travel problems, use appropriate vocabulary and phrases to describe issues, and communicate effectively to resolve problems.",
  homeworkIdeas: [
    "Write a dialogue between a traveler with a problem and an airline customer service agent", 
    "Create a 'Travel Problems Survival Guide' with useful phrases and tips",
    "Research passenger rights in case of flight delays or cancellations"
  ],
  additionalResources: [
    {
      title: "Air Passenger Rights Guide",
      url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm"
    },
    {
      title: "Vocabulary for Travel Problems",
      url: "https://www.englishclub.com/vocabulary/travel-problems.htm"
    }
  ]
};
