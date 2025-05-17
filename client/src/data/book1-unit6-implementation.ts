/**
 * Visual English Book 1, Unit 6: My Favourite Colour
 * Implementation guidance for teachers
 */

import { LessonPlan, LessonActivity, LessonSection } from '@/components/LessonPlanTemplate';
import { getBook1Unit6Resources } from './book1-unit6-resources';
import { UnitId } from '@/types/content';

/**
 * Main lesson plan for Book 1 Unit 6: My Favourite Colour
 */
export const book1Unit6Implementation: LessonPlan = {
  id: "book1-unit6-main",
  title: "My Favourite Colour - Main Lesson",
  unitId: "6" as UnitId,
  bookId: "1",
  description: "A comprehensive lesson plan for teaching colors vocabulary and expressing preferences.",
  duration: 45,
  objectives: [
    "Identify and name at least 6 basic colors in English",
    "Ask and answer about favorite colors",
    "Recognize colors in everyday objects"
  ],
  materials: [
    "Visual English Book 1, Unit 6 slides",
    "Colored objects or cards",
    "Printable coloring sheets"
  ],
  warm_up: {
    title: "Color Recognition Game",
    duration: 5,
    description: "Show different colored objects and have students name the colors they see.",
    steps: [
      "Prepare various colored objects or cards before class",
      "Hold up one object at a time and ask 'What color is this?'",
      "Help students respond with 'It's [color]'",
      "Continue with different colors, increasing pace as students become more confident"
    ]
  },
  main_activities: [
    {
      title: "Color Vocabulary Introduction",
      duration: 10,
      description: "Present the basic colors using Visual English slides, focusing on clear pronunciation.",
      steps: [
        "Show each color slide from Unit 6",
        "Model the color name and have students repeat",
        "Point to objects in the classroom that match each color",
        "Have students touch something of that color when you name it"
      ]
    },
    {
      title: "Favorite Color Expression",
      duration: 10,
      description: "Teach and practice expressing color preferences using the phrase 'My favorite color is...'.",
      steps: [
        "Model the phrase 'My favorite color is [color]' using slides",
        "Have students practice the phrase with their own preference",
        "Ask individual students 'What is your favorite color?'",
        "Have students ask each other in pairs"
      ]
    },
    {
      title: "I See Something Blue (Color Spotting)",
      duration: 10,
      description: "Play a game based on the Super Simple Songs video where students spot colored objects.",
      steps: [
        "Explain the game: when you say 'I see something [color]', students must point to something of that color",
        "Play a few rounds, starting slowly and then speeding up",
        "For an extra challenge, ask students to say 'I see something [color]' and have others respond",
        "Optional: Show the 'I See Something Blue' video as reinforcement"
      ],
      resources: [
        {
          title: "I See Something Blue - Super Simple Songs",
          url: "https://www.youtube.com/watch?v=jYAWf8Y91hA"
        }
      ]
    }
  ],
  assessment: {
    title: "Color Matching and Naming",
    duration: 5,
    description: "Students match color names to color swatches and name their favorite color.",
    criteria: [
      "Can name at least 6 colors correctly",
      "Can express favorite color preference using full sentences",
      "Can understand and respond to 'What color is this?' questions"
    ]
  },
  extension: {
    title: "Coloring Activity",
    duration: 5,
    description: "Students color a simple worksheet following oral instructions about which colors to use.",
    steps: [
      "Distribute a simple outline drawing with multiple elements",
      "Give instructions such as 'Color the sun yellow' and 'Color the tree green'",
      "When finished, have students share what colors they used"
    ]
  },
  resources: getBook1Unit6Resources()
};

/**
 * Phonics-focused lesson plan for Book 1 Unit 6
 */
export const book1Unit6PhonicsLesson: LessonPlan = {
  id: "book1-unit6-phonics",
  title: "Color Words and Sounds - Phonics Lesson",
  unitId: "6" as UnitId,
  bookId: "1",
  description: "A phonics-focused lesson focusing on the sounds and spelling patterns in color words.",
  duration: 30,
  objectives: [
    "Recognize and pronounce the initial sounds in color words",
    "Match color words to their correct spellings",
    "Practice writing color words"
  ],
  materials: [
    "Color word flashcards",
    "Visual English Book 1, Unit 6 slides",
    "Letter cards",
    "Colored pencils or markers"
  ],
  warm_up: {
    title: "Initial Sound Game",
    duration: 5,
    description: "Focus on the beginning sounds of color words.",
    steps: [
      "Say a color word emphasizing the initial sound (e.g., 'rrred', 'bbbblue')",
      "Have students repeat the word with emphasis on the first sound",
      "Ask students to think of other words that start with the same sound",
      "Show the written word and highlight the first letter"
    ]
  },
  main_activities: [
    {
      title: "Color Word Spelling",
      duration: 10,
      description: "Practice spelling color words through visual and auditory activities.",
      steps: [
        "Show a color flashcard with the word hidden",
        "Say the word slowly, sounding out each letter",
        "Reveal the word and have students spell it together",
        "Have students trace the word in the air with their finger"
      ]
    },
    {
      title: "Letter Matching",
      duration: 10,
      description: "Students match letters to form color words.",
      steps: [
        "Distribute letter cards that can form color words",
        "Say a color word and have students arrange their letters to spell it",
        "For younger students, provide a model to follow",
        "For older students, challenge them to spell from memory"
      ]
    }
  ],
  assessment: {
    title: "Color Word Recognition",
    duration: 5,
    description: "Assess students' ability to recognize and read color words.",
    criteria: [
      "Can identify color words when shown in written form",
      "Can correctly spell at least 3-4 basic color words",
      "Can identify the initial sounds in color words"
    ]
  },
  resources: getBook1Unit6Resources().filter(r => r.resourceType === "video")
};

/**
 * Conversation-focused lesson plan for Book 1 Unit 6
 */
export const book1Unit6ConversationLesson: LessonPlan = {
  id: "book1-unit6-conversation",
  title: "Talking About Colors - Conversation Lesson",
  unitId: "6" as UnitId,
  bookId: "1",
  description: "A communication-focused lesson developing speaking skills through color-based conversations.",
  duration: 30,
  objectives: [
    "Ask and answer questions about colors",
    "Describe objects using color adjectives",
    "Express preferences about colors in conversation"
  ],
  materials: [
    "Visual English Book 1, Unit 6 slides",
    "Colored objects from the classroom",
    "Picture cards of objects in various colors"
  ],
  warm_up: {
    title: "Color Survey",
    duration: 5,
    description: "Students ask each other about favorite colors and report findings.",
    steps: [
      "Model the question 'What is your favorite color?' and the answer 'My favorite color is [color]'",
      "Have students ask their neighbor the question and listen to the answer",
      "Ask a few students to report what they learned (e.g., 'Her favorite color is blue')",
      "Create a simple graph or tally of class favorite colors"
    ]
  },
  main_activities: [
    {
      title: "What Color Is It?",
      duration: 10,
      description: "Practice asking and answering questions about the colors of objects.",
      steps: [
        "Model the question 'What color is this?' and the answer 'It's [color]'",
        "Show various objects or images and have students practice the dialogue",
        "Have students work in pairs with their own objects or picture cards",
        "Monitor and provide feedback on pronunciation and sentence structure"
      ],
      resources: [
        {
          title: "What Colour Is It?",
          url: "https://www.youtube.com/watch?v=NUquLTPhMwg"
        }
      ]
    },
    {
      title: "Color Preference Conversations",
      duration: 10,
      description: "Extended conversations about color preferences.",
      steps: [
        "Teach extended phrases like 'I like [color] because...'",
        "Model simple reasons: 'because it's bright' or 'because it's pretty'",
        "Have students practice expressing their preferences with reasons",
        "Create a chain dialogue where each student states their preference and asks the next person"
      ],
      resources: [
        {
          title: "What's Your Favorite Color - Super Simple Song",
          url: "https://www.youtube.com/watch?v=zxIpA5nF_LY"
        }
      ]
    }
  ],
  assessment: {
    title: "Color Conversation Role Play",
    duration: 5,
    description: "Students demonstrate conversation skills through short role plays about colors.",
    criteria: [
      "Can ask and answer questions about colors",
      "Uses complete sentences when describing objects by color",
      "Can express color preferences with appropriate vocabulary"
    ]
  },
  resources: getBook1Unit6Resources().filter(r => r.resourceType === "video")
};

/**
 * Complete set of lesson plans for Book 1 Unit 6
 */
export const book1Unit6Implementations = [
  book1Unit6Implementation,
  book1Unit6PhonicsLesson,
  book1Unit6ConversationLesson
];

/**
 * Lesson plan generator function
 */
export function generateUnit6LessonPlans(): LessonPlan[] {
  return book1Unit6Implementations;
}

export default book1Unit6Implementations;