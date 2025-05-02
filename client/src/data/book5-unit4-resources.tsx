// This file contains resources for Book 5, Unit 4 (Was/Were - Places in the Town themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit4Resources = [
  {
    title: "Places in the Town Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/fcd95f5da91a46999ea7387b93ec48c2",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/fcd95f5da91a46999ea7387b93ec48c2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Was/Were Grammar Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/e73309001cde4503892be88c67e63937",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e73309001cde4503892be88c67e63937?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Was/Were Grammar Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/0ac7df480ccf4c84ae7b82245da6921a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0ac7df480ccf4c84ae7b82245da6921a?themeId=1&templateId=35&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Places in Town Exploration Video",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/7fF60Kjw5zE",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7fF60Kjw5zE?si=dWBv7e9Scss6LBRT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Places in Town
export const placesInTownLessonPlan = {
  id: "places-in-town-lesson",
  title: "Places in the Town Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to places in a town or city",
    "Practice giving and asking for directions",
    "Develop language for describing locations",
    "Build speaking skills through town-themed conversations"
  ],
  materials: [
    "Visual English Book 5, Unit 4 slides",
    "Places in the Town Vocabulary Game",
    "Places in Town Exploration Video",
    "Town map handouts",
    "Direction vocabulary cards"
  ],
  steps: [
    {
      title: "Warm-up: Places We Visit",
      duration: "5 minutes",
      description: "Activate prior knowledge about locations in a town",
      instructions: [
        "Ask students: 'What places do you visit in your town/city?'",
        "Create a mind map of town locations on the board",
        "Group locations by type (shopping, services, entertainment, etc.)",
        "Ask students to share which places they visited recently"
      ]
    },
    {
      title: "Town Vocabulary Introduction",
      duration: "10 minutes",
      description: "Learn vocabulary related to places in a town",
      materials: ["Visual English Book 5, Unit 4 slides"],
      instructions: [
        "Introduce buildings and places: library, post office, bank, hospital, etc.",
        "Present urban features: street, sidewalk, traffic light, crosswalk, etc.",
        "Teach location-specific vocabulary: counter, checkout, waiting room, etc.",
        "Discuss what people do at different places using present tense verbs"
      ]
    },
    {
      title: "Video: Places in Town Exploration",
      duration: "10 minutes",
      description: "Watch a video showing different locations in a town",
      materials: ["Places in Town Exploration Video"],
      instructions: [
        "Play the Places in Town Exploration Video",
        "Ask students to note any new places they see",
        "Pause to discuss functions of different locations",
        "After watching, have students recall places shown in the video"
      ]
    },
    {
      title: "Interactive Game: Places in Town Vocabulary",
      duration: "10 minutes",
      description: "Practice town vocabulary through a digital game",
      materials: ["Places in the Town Vocabulary Game"],
      instructions: [
        "Have students play the Places in the Town Vocabulary Game",
        "Encourage students to use complete sentences when identifying places",
        "Review any challenging vocabulary as a class",
        "Discuss which places serve similar functions"
      ]
    },
    {
      title: "Directions Dialogue Practice",
      duration: "10 minutes",
      description: "Practice giving and asking for directions in a town",
      materials: ["Town map handouts", "Direction vocabulary cards"],
      instructions: [
        "Review direction vocabulary: turn left/right, go straight, across from, next to, etc.",
        "Model a dialogue asking for and giving directions between two locations",
        "Distribute town map handouts to pairs of students",
        "One student chooses a starting point and destination without telling their partner",
        "The other student asks for directions to reach the destination",
        "Partners take turns asking for and giving directions",
        "Volunteers perform their dialogues for the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of town vocabulary, ability to describe locations, and accuracy in giving and following directions.",
  homeworkIdeas: [
    "Draw a map of your neighborhood and label 10 different places using the vocabulary learned", 
    "Write a paragraph describing the route from your home to school using direction vocabulary",
    "Create a dialogue between a tourist and local asking for directions to a famous place"
  ],
  additionalResources: [
    {
      title: "ESL Town and City Vocabulary",
      url: "https://www.eslkidstuff.com/worksheets/places.htm"
    },
    {
      title: "Giving Directions Language Guide",
      url: "https://www.englishclub.com/english-for-work/language-giving-directions.htm"
    }
  ]
};

// Second lesson plan for Unit 4: Past Simple with Was/Were
export const pastSimpleWasWereLessonPlan = {
  id: "past-simple-was-were-lesson",
  title: "Past Simple with Was/Were",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn to use 'was' and 'were' correctly",
    "Practice forming statements, questions, and negatives in past simple with be verbs",
    "Develop language for describing past locations and conditions",
    "Build grammar skills through structured practice"
  ],
  materials: [
    "Visual English Book 5, Unit 4 slides",
    "Was/Were Grammar Games",
    "Past tense situation cards",
    "Grammar reference sheet",
    "Sentence transformation worksheet"
  ],
  steps: [
    {
      title: "Warm-up: Yesterday's Locations",
      duration: "5 minutes",
      description: "Activate knowledge about past actions and locations",
      instructions: [
        "Ask students: 'Where were you yesterday at 3:00 PM?'",
        "Write some student responses on the board highlighting 'was' and 'were'",
        "Point out the past simple form of 'be' (was/were)",
        "Elicit more examples using different pronouns (I, you, he, she, it, we, they)"
      ]
    },
    {
      title: "Grammar Introduction: Was/Were",
      duration: "10 minutes",
      description: "Learn the past simple of the verb 'be' and its usage",
      materials: ["Visual English Book 5, Unit 4 slides", "Grammar reference sheet"],
      instructions: [
        "Present the conjugation of 'be' in past simple:",
        "I/He/She/It was...",
        "You/We/They were...",
        "Show positive statements, negative forms, and question forms",
        "Explain the rules for contractions: wasn't, weren't",
        "Provide examples in context of town locations: 'I was at the library', 'They were at the cinema'"
      ]
    },
    {
      title: "Controlled Practice: Was/Were Exercises",
      duration: "10 minutes",
      description: "Practice using 'was' and 'were' in structured exercises",
      materials: ["Sentence transformation worksheet"],
      instructions: [
        "Distribute sentence transformation worksheets",
        "Students complete exercises to change present tense sentences to past tense",
        "Example: 'She is at the post office' → 'She was at the post office'",
        "Include positive, negative, and question forms",
        "Check answers as a class, focusing on correct form usage"
      ]
    },
    {
      title: "Interactive Games: Was/Were Practice",
      duration: "10 minutes",
      description: "Reinforce grammar through digital games",
      materials: ["Was/Were Grammar Games"],
      instructions: [
        "Have students play the Was/Were Grammar Games",
        "Game 1 focuses on selecting correct form (was vs. were)",
        "Game 2 practices forming questions and negatives",
        "Review any errors or difficulties together",
        "Discuss patterns observed in was/were usage"
      ]
    },
    {
      title: "Communicative Activity: Past Locations",
      duration: "10 minutes",
      description: "Practice using was/were in meaningful communication",
      materials: ["Past tense situation cards"],
      instructions: [
        "Divide students into pairs",
        "Distribute past tense situation cards with prompts like:",
        "'Yesterday at 8:00 AM' (breakfast time)",
        "'Last Saturday afternoon' (weekend activity)",
        "'During the last holiday' (vacation place)",
        "'Last week during a rainstorm' (weather situation)",
        "Students ask each other questions using was/were about these times",
        "Example: 'Where were you yesterday at 8:00 AM?'",
        "Partners respond with true statements using was/were",
        "Students report interesting discoveries about their partners to the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their correct usage of was/were in different contexts, ability to form questions and negatives, and participation in the communicative activity.",
  homeworkIdeas: [
    "Write 10 sentences about where you and your family members were last weekend", 
    "Transform a paragraph about someone's typical day (present tense) into past tense using was/were",
    "Create a short diary entry about yesterday using was/were appropriately"
  ],
  additionalResources: [
    {
      title: "Past Simple - Be Verb Exercises",
      url: "https://www.perfect-english-grammar.com/past-simple-be.html"
    },
    {
      title: "ESL Was/Were Worksheets",
      url: "https://en.islcollective.com/english-esl-worksheets/grammar/past-simple-tense/was-were"
    }
  ]
};
