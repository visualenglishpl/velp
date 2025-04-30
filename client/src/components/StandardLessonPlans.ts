import { LessonPlan } from './LessonPlanTemplate';

/**
 * Creates standardized lesson plans for all Book 7 units
 * Each plan follows the same structure but with unit-specific content
 */
export const createStandardLessonPlan = (
  bookId: string, 
  unitId: string, 
  title: string, 
  topic: string
): LessonPlan => {
  return {
    id: `book${bookId}-unit${unitId}-main-lesson`,
    title: `${title} - 45-minute Lesson Plan`,
    duration: "45 minutes",
    level: "Elementary to Pre-Intermediate (A1-A2)",
    objectives: [
      `Identify and name common ${topic} vocabulary`,
      `Discuss ${topic} preferences using target expressions`,
      `Practice asking and answering questions about ${topic}`,
      `Develop speaking fluency through pair and group activities`
    ],
    materials: [
      `Visual English Book ${bookId}, Unit ${unitId} slides`,
      `${topic} flashcards or images`,
      `Wordwall interactive game related to ${topic}`,
      `Worksheet with ${topic} vocabulary exercises`
    ],
    steps: [
      {
        title: "Warm-up Activity",
        duration: "5 mins",
        description: `Begin by asking students about their experience with ${topic} to activate prior knowledge.`,
        instructions: [
          `Ask 2-3 simple questions about ${topic} preferences or experiences`,
          "Have students discuss in pairs for 1-2 minutes",
          "Get feedback from 3-4 students"
        ],
        teacherNotes: "This activates schema and creates context for the main lesson."
      },
      {
        title: "Vocabulary Presentation",
        duration: "10 mins",
        description: `Introduce key ${topic} vocabulary using Visual English slides.`,
        materials: [
          `Book ${bookId}, Unit ${unitId} slides (first section)`,
          `${topic} flashcards`
        ],
        instructions: [
          "Display slides showing key vocabulary items",
          "Drill pronunciation of each new word",
          "Ask simple comprehension questions about each item",
          "Have students repeat and practice the vocabulary"
        ]
      },
      {
        title: "Controlled Practice",
        duration: "10 mins",
        description: `Students practice using target vocabulary and structures related to ${topic}.`,
        materials: [
          `Book ${bookId}, Unit ${unitId} slides (middle section)`,
          "Handout with guided practice exercises"
        ],
        instructions: [
          "Distribute practice worksheets",
          "Demonstrate the first example",
          "Students complete exercises in pairs",
          "Check answers as a class"
        ],
        teacherNotes: "Monitor carefully to identify any common errors for correction."
      },
      {
        title: "Interactive Activity",
        duration: "15 mins",
        description: `Students engage in a communicative activity about ${topic} to practice the target language.`,
        materials: [
          `Book ${bookId}, Unit ${unitId} slides (final section)`,
          "Role play cards or game materials"
        ],
        instructions: [
          "Divide students into pairs or small groups",
          "Explain the activity rules and demonstrate with a strong student",
          "Students complete the activity while teacher monitors",
          "Provide feedback on common errors observed"
        ]
      },
      {
        title: "Wrap-up and Review",
        duration: "5 mins",
        description: "Summarize what students have learned and check comprehension.",
        instructions: [
          "Ask students to share what they learned today",
          "Review key vocabulary and structures",
          "Give a brief preview of the next lesson",
          "Assign homework if appropriate"
        ]
      }
    ],
    assessmentTips: `Assess students through their participation in the ${topic} activities and their ability to use the target vocabulary and structures correctly.`,
    homeworkIdeas: [
      `Write 5-7 sentences about your ${topic} preferences using the target structures.`,
      `Complete the ${topic} vocabulary worksheet for additional practice.`
    ],
    additionalResources: [
      {
        title: `Wordwall ${topic} Quiz`,
        url: `https://wordwall.net/resource/search?query=${topic}%20quiz`
      },
      {
        title: `${topic} Vocabulary Video`,
        url: `https://www.youtube.com/results?search_query=${topic}+vocabulary+esl`
      }
    ]
  };
};

/**
 * Specific lesson plans for all Book 7 units
 * Each plan follows the standard template but with customized content
 */
export const book7LessonPlans: Record<string, LessonPlan[]> = {
  // Unit 1: Film Genres
  "1": [
    {
      id: "book7-unit1-main-lesson",
      title: "Film Genres - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name common film genre vocabulary",
        "Express film preferences using structures like 'I enjoy/I can't stand/I don't mind'",
        "Ask and answer questions about film preferences",
        "Discuss favorite films and make recommendations"
      ],
      materials: [
        "Visual English Book 7, Unit 1 slides",
        "Film genre flashcards or images",
        "Wordwall interactive game: 'Film Genre Quiz'",
        "Worksheet with film vocabulary and expression exercises"
      ],
      steps: [
        {
          title: "Warm-up: Film Discussion",
          duration: "5 mins",
          description: "Begin by asking students about their film-watching habits to activate prior knowledge.",
          instructions: [
            "Ask students: 'What was the last film you watched? Did you enjoy it?'",
            "Follow up with: 'What type of films do you usually watch?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from 3-4 students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on film genres."
        },
        {
          title: "Vocabulary Presentation: Film Genres",
          duration: "10 mins",
          description: "Introduce film genre vocabulary using Visual English slides.",
          materials: [
            "Book 7, Unit 1 slides (01 A - 01 D)",
            "Film genre flashcards"
          ],
          instructions: [
            "Display slides showing different film genres (action, adventure, animation, etc.)",
            "For each genre, ask: 'What type of film is this?'",
            "Drill pronunciation of each genre name",
            "Discuss key characteristics of each genre",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Expressing Preferences Practice",
          duration: "10 mins",
          description: "Students practice using expressions to talk about film preferences.",
          materials: [
            "Book 7, Unit 1 slides (01 E Aa - 01 E Cc)",
            "Handout with preference expressions"
          ],
          instructions: [
            "Introduce expressions: 'I enjoy/I can't stand/I don't mind'",
            "Use slides to demonstrate how to express preferences about film genres",
            "Students complete guided practice exercises in pairs",
            "Ask questions like: 'What do you think of action films?'",
            "Check answers as a class"
          ],
          teacherNotes: "Monitor carefully to identify any common errors in using the preference structures."
        },
        {
          title: "Film Recommendation Role Play",
          duration: "15 mins",
          description: "Students practice making and responding to film recommendations.",
          materials: [
            "Book 7, Unit 1 slides (remainder of unit)",
            "Role play cards with film genres and scenarios"
          ],
          instructions: [
            "Divide students into pairs - A and B",
            "Student A wants to watch a film and asks for recommendations",
            "Student B recommends films based on genres",
            "Provide role cards with prompts: 'Can you recommend a good film? I enjoy...'",
            "Students switch roles after 5-7 minutes",
            "Ask 2-3 pairs to perform their dialogues for the class"
          ]
        },
        {
          title: "Wrap-up: Film Genre Quiz",
          duration: "5 mins",
          description: "Consolidate learning with a quick film genre identification quiz.",
          instructions: [
            "Show images from different film genres",
            "Students identify the genre and use a preference expression",
            "Review key vocabulary and structures from the lesson",
            "Assign homework: Write a paragraph about your favorite film"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the role play activity and their ability to use the film genre vocabulary and preference expressions correctly.",
      homeworkIdeas: [
        "Write a short paragraph about your favorite film, mentioning its genre and why you like it.",
        "Complete the worksheet with film genre vocabulary and expressions."
      ],
      additionalResources: [
        {
          title: "Movie Genres Vocabulary Game",
          url: "https://www.youtube.com/watch?v=FTuQIwl7j3k"
        },
        {
          title: "Film Genres Quiz",
          url: "https://wordwall.net/resource/search?query=film%20genres"
        }
      ]
    },
    {
      id: "book7-unit1-extension-lesson",
      title: "Film Reviews - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary for describing and reviewing films",
        "Practice writing short film reviews using appropriate adjectives",
        "Develop critical thinking skills by evaluating films",
        "Present opinions about films to classmates"
      ],
      materials: [
        "Visual English Book 7, Unit 1 slides",
        "Sample film review handouts",
        "Film review template worksheet",
        "Film poster images or screenshots"
      ],
      steps: [
        {
          title: "Warm-up: Film Rating",
          duration: "5 mins",
          description: "Students rate recent popular films they have seen on a scale of 1-5 stars.",
          instructions: [
            "Show 5-6 popular film posters",
            "Students rate each film from 1-5 stars",
            "Ask volunteers to explain their ratings",
            "Introduce key adjectives: excellent, terrible, boring, exciting, etc."
          ]
        },
        {
          title: "Film Review Vocabulary",
          duration: "10 mins",
          description: "Introduce vocabulary for writing film reviews.",
          materials: [
            "Handout with film review vocabulary",
            "Sample film review paragraphs"
          ],
          instructions: [
            "Distribute sample film review handouts",
            "Highlight key vocabulary and expressions for reviews",
            "Practice pronunciation of review vocabulary",
            "Students identify positive and negative review expressions"
          ]
        },
        {
          title: "Guided Film Review Writing",
          duration: "12 mins",
          description: "Students write a short review of a film they have watched using the target vocabulary.",
          materials: [
            "Film review template",
            "Writing prompt cards"
          ],
          instructions: [
            "Distribute film review templates",
            "Review the structure: introduction, plot summary, opinion, recommendation",
            "Students write a 3-5 sentence review of a film they've seen",
            "Monitor and provide help with vocabulary and expressions"
          ],
          teacherNotes: "For lower-level students, provide sentence starters."
        },
        {
          title: "Film Review Presentations",
          duration: "13 mins",
          description: "Students present their film reviews to partners or small groups.",
          instructions: [
            "Organize students into groups of 3-4",
            "Each student presents their film review to the group",
            "Group members ask at least one question about the film",
            "Group selects one review to share with the class"
          ]
        },
        {
          title: "Wrap-up: Class Recommendations",
          duration: "5 mins",
          description: "Create a class list of recommended films by genre.",
          instructions: [
            "Draw a chart on the board with different film genres",
            "Add student film recommendations under each genre",
            "Take a photo of the chart for students to reference",
            "Summarize key vocabulary and expressions learned"
          ]
        }
      ],
      assessmentTips: "Evaluate students on their written film reviews and oral presentations. Look for correct use of review vocabulary and film genre terms.",
      homeworkIdeas: [
        "Write a more detailed review of a favorite film using at least 10 vocabulary items from the lesson.",
        "Watch a film in a genre you don't usually choose and write a brief review."
      ],
      additionalResources: [
        {
          title: "ESL Film Review Writing Guide",
          url: "https://www.thoughtco.com/writing-a-film-review-1212765"
        },
        {
          title: "Film Review Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Film_Reviews.htm"
        }
      ]
    }
  ],
  
  // Unit 2: Television Programs
  "2": [
    {
      id: "book7-unit2-main-lesson",
      title: "Television Programs - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different types of TV programs",
        "Express TV viewing preferences using target structures",
        "Ask and answer questions about TV habits",
        "Discuss favorite TV shows using new vocabulary"
      ],
      materials: [
        "Visual English Book 7, Unit 2 slides",
        "TV program type flashcards",
        "TV schedule handouts",
        "Preference expression worksheet"
      ],
      steps: [
        {
          title: "Warm-up: TV Habits",
          duration: "5 mins",
          description: "Begin by asking students about their television viewing habits.",
          instructions: [
            "Ask students: 'How many hours of TV do you watch per day?'",
            "Follow up with: 'What do you usually watch on TV?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect responses from 3-4 students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on TV programs."
        },
        {
          title: "Vocabulary Presentation: TV Program Types",
          duration: "10 mins",
          description: "Introduce vocabulary for different types of TV programs.",
          materials: [
            "Book 7, Unit 2 slides (first section)",
            "TV program flashcards"
          ],
          instructions: [
            "Display slides showing different TV program types (news, documentary, sitcom, etc.)",
            "For each type, ask: 'What type of TV program is this?'",
            "Drill pronunciation of each program type",
            "Discuss key characteristics of each type of show",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "TV Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing preferences about TV programs.",
          materials: [
            "Book 7, Unit 2 slides (middle section)",
            "Preference expression worksheet"
          ],
          instructions: [
            "Review expressions: 'I enjoy watching/I can't stand/I prefer'",
            "Demonstrate how to express TV preferences",
            "Students complete guided practice exercises in pairs",
            "Ask: 'What types of programs do you enjoy watching?'",
            "Check answers as a class"
          ],
          teacherNotes: "Ensure students are using the correct form of verbs after preference expressions."
        },
        {
          title: "TV Schedule Role Play",
          duration: "15 mins",
          description: "Students practice discussing TV schedules and making viewing decisions.",
          materials: [
            "TV schedule handouts",
            "Role play scenario cards"
          ],
          instructions: [
            "Distribute TV schedule handouts to pairs",
            "Partners must decide what to watch together for an evening",
            "They must negotiate and express preferences",
            "Provide dialog prompts: 'What would you like to watch at 8:00?'",
            "Have 2-3 pairs demonstrate their conversations"
          ]
        },
        {
          title: "Wrap-up: TV Recommendation",
          duration: "5 mins",
          description: "Students recommend a TV show to the class.",
          instructions: [
            "Students write a one-sentence recommendation",
            "Format: 'I recommend watching [show name] because...'",
            "Share 3-4 recommendations with the class",
            "Review key vocabulary and expressions"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the TV schedule role play and their ability to express preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about your TV viewing habits using the vocabulary learned.",
        "Create your ideal TV schedule for one day, describing each program briefly."
      ],
      additionalResources: [
        {
          title: "TV Program Types Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Television.htm"
        },
        {
          title: "TV Program Quiz",
          url: "https://wordwall.net/resource/search?query=tv%20programs"
        }
      ]
    },
    {
      id: "book7-unit2-extension-lesson",
      title: "TV Show Reviews - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary for describing and reviewing TV shows",
        "Practice writing short TV show reviews",
        "Develop speaking skills through group discussions about shows",
        "Compare different TV programs using comparative adjectives"
      ],
      materials: [
        "Visual English Book 7, Unit 2 slides",
        "Sample TV show review handouts",
        "TV show images or posters",
        "Review writing template"
      ],
      steps: [
        {
          title: "Warm-up: Rating Shows",
          duration: "5 mins",
          description: "Students rate familiar TV shows on a scale of 1-5 stars.",
          instructions: [
            "Show images of 5-6 popular TV shows",
            "Students rate each show from 1-5 stars",
            "Ask volunteers to explain their ratings",
            "Introduce key adjectives: entertaining, boring, exciting, predictable, etc."
          ],
          teacherNotes: "Choose a mix of different TV program types for this activity."
        },
        {
          title: "TV Review Vocabulary",
          duration: "10 mins",
          description: "Introduce vocabulary for reviewing TV programs.",
          materials: [
            "Handout with TV review vocabulary",
            "Sample reviews of different programs"
          ],
          instructions: [
            "Distribute sample TV show review handouts",
            "Highlight key vocabulary and expressions for reviews",
            "Practice pronunciation of review vocabulary",
            "Students identify positive and negative review expressions",
            "Point out common structures: 'The show is... It has... The characters are...'"
          ]
        },
        {
          title: "Comparing TV Shows",
          duration: "10 mins",
          description: "Students practice using comparative adjectives to compare different TV shows.",
          materials: [
            "Pairs of TV show images",
            "List of comparative adjectives"
          ],
          instructions: [
            "Review comparative forms: 'more interesting than, funnier than, better than'",
            "Show pairs of TV shows (e.g., comedy vs. drama)",
            "Students work in pairs to write 3-4 comparative sentences",
            "Example: 'Comedies are funnier than documentaries, but documentaries are more informative'",
            "Share comparisons with the class"
          ],
          teacherNotes: "Help students with the correct formation of comparatives, especially irregular forms."
        },
        {
          title: "TV Show Review Writing",
          duration: "15 mins",
          description: "Students write a short review of a TV show they know well.",
          materials: [
            "TV show review template",
            "Writing guidelines handout"
          ],
          instructions: [
            "Distribute review writing templates",
            "Review the structure: title, type of show, main characters, plot, opinion",
            "Students write a 5-8 sentence review of a favorite TV show",
            "Monitor and assist with vocabulary and expressions",
            "Encourage use of adjectives and opinion phrases from earlier activities"
          ]
        },
        {
          title: "Wrap-up: Review Sharing",
          duration: "5 mins",
          description: "Students share their reviews with the class.",
          instructions: [
            "Have 2-3 students read their reviews aloud",
            "Class guesses which show is being described (if not mentioned by name)",
            "Discuss if others have seen the show and if they agree with the review",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Evaluate students on their written TV reviews and their use of comparative forms when discussing different programs.",
      homeworkIdeas: [
        "Watch an episode of a TV show in English and write a more detailed review.",
        "Research a popular TV show from another country and prepare a short presentation about it."
      ],
      additionalResources: [
        {
          title: "TV Show Review Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Television_Reviews.htm"
        },
        {
          title: "Comparative Adjectives Exercise",
          url: "https://wordwall.net/resource/search?query=comparative%20adjectives"
        }
      ]
    }
  ],
  
  // Unit 3: Crime and Law Enforcement
  "3": [
    {
      id: "book7-unit3-main-lesson",
      title: "Crime and Law Enforcement - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different types of crimes and criminals",
        "Learn vocabulary related to law enforcement",
        "Ask and answer questions about crime and safety",
        "Discuss crime prevention and law enforcement roles"
      ],
      materials: [
        "Visual English Book 7, Unit 3 slides",
        "Crime and law enforcement flashcards",
        "Crime vocabulary worksheet",
        "Law enforcement role cards"
      ],
      steps: [
        {
          title: "Warm-up: Safety Discussion",
          duration: "5 mins",
          description: "Begin by asking students about safety in their neighborhood.",
          instructions: [
            "Ask students: 'Is there a lot of crime near where you live?'",
            "Follow up with: 'Do you feel safe in your neighborhood?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on crime and law enforcement."
        },
        {
          title: "Vocabulary Presentation: Crime Types",
          duration: "10 mins",
          description: "Introduce vocabulary for different types of crimes and criminals.",
          materials: [
            "Book 7, Unit 3 slides (first section)",
            "Crime flashcards"
          ],
          instructions: [
            "Display slides showing different types of crimes (burglary, robbery, theft, etc.)",
            "For each crime, ask: 'What is this crime called?'",
            "Introduce related criminals (burglar, robber, thief, etc.)",
            "Drill pronunciation of each term",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Law Enforcement Vocabulary",
          duration: "10 mins",
          description: "Students learn vocabulary related to law enforcement and legal system.",
          materials: [
            "Book 7, Unit 3 slides (middle section)",
            "Law enforcement vocabulary handout"
          ],
          instructions: [
            "Present vocabulary: police officer, detective, judge, prison, etc.",
            "Ask: 'What do police officers do? They catch criminals.'",
            "Students match law enforcement roles with their responsibilities",
            "Practice using structures: 'A [role] is responsible for [action]'",
            "Check responses as a class"
          ],
          teacherNotes: "Emphasize the difference between various law enforcement roles."
        },
        {
          title: "Crime Scene Investigation Role Play",
          duration: "15 mins",
          description: "Students simulate a crime investigation using target vocabulary.",
          materials: [
            "Crime scenario cards",
            "Role cards (detective, witness, suspect)",
            "Book 7, Unit 3 slides (final section)"
          ],
          instructions: [
            "Divide students into groups of 3-4",
            "Assign roles: detective, witnesses, suspect",
            "Provide simple crime scenario (burglary, vandalism, etc.)",
            "Detectives ask questions about the crime to solve it",
            "Witnesses and suspects respond appropriately",
            "Groups present their findings to the class"
          ]
        },
        {
          title: "Wrap-up: Crime Prevention",
          duration: "5 mins",
          description: "Students discuss ways to prevent crime in their community.",
          instructions: [
            "Ask students to think about crime prevention",
            "They complete the sentence: 'To prevent crime, we should...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the crime investigation role play and their ability to use crime-related vocabulary correctly.",
      homeworkIdeas: [
        "Write a paragraph about how to stay safe in your neighborhood.",
        "Create a poster about crime prevention using vocabulary from the lesson."
      ],
      additionalResources: [
        {
          title: "Crime and Law Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Law_and_Crime.htm"
        },
        {
          title: "Crime and Law Quiz",
          url: "https://wordwall.net/resource/search?query=crime%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit3-extension-lesson",
      title: "Legal System and Justice - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to courts and the legal system",
        "Understand the concept of justice and punishment",
        "Practice discussing different types of crimes and appropriate consequences",
        "Develop critical thinking about crime and punishment"
      ],
      materials: [
        "Visual English Book 7, Unit 3 slides",
        "Legal system vocabulary handout",
        "Court system diagram",
        "Justice system role cards"
      ],
      steps: [
        {
          title: "Warm-up: Justice Discussion",
          duration: "5 mins",
          description: "Begin by asking students about their understanding of justice.",
          instructions: [
            "Ask students: 'What does justice mean to you?'",
            "Follow up with: 'Is the justice system in your country fair?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates context for discussing the legal system."
        },
        {
          title: "Vocabulary Presentation: Legal System",
          duration: "10 mins",
          description: "Introduce vocabulary related to courts and legal proceedings.",
          materials: [
            "Legal system vocabulary handout",
            "Court system diagram"
          ],
          instructions: [
            "Present legal system terms: court, judge, lawyer, trial, etc.",
            "Explain the basic court process with visual aids",
            "Drill pronunciation of each term",
            "Discuss how the legal system works with simple explanations",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Crime and Punishment Matching",
          duration: "10 mins",
          description: "Students match crimes with appropriate punishments.",
          materials: [
            "Crime and punishment cards",
            "Legal consequences worksheet"
          ],
          instructions: [
            "Review different types of crimes from the main lesson",
            "Introduce vocabulary for punishments: fine, community service, prison sentence, etc.",
            "Students work in pairs to match crimes with appropriate punishments",
            "Discuss the concept of proportionate punishment",
            "Check answers as a class"
          ],
          teacherNotes: "Encourage thinking about the severity of crimes and proportionate consequences."
        },
        {
          title: "Mock Trial Simulation",
          duration: "15 mins",
          description: "Students participate in a simplified mock trial.",
          materials: [
            "Simple case scenario",
            "Role cards (judge, lawyers, defendant, witnesses)"
          ],
          instructions: [
            "Divide students into groups and assign roles",
            "Present a simple case scenario (e.g., a theft case)",
            "Give students 5 minutes to prepare their arguments",
            "Conduct a simplified mock trial with each group",
            "Judge(s) deliver verdict and explain reasoning"
          ]
        },
        {
          title: "Wrap-up: Justice System Reflection",
          duration: "5 mins",
          description: "Students reflect on what makes a fair justice system.",
          instructions: [
            "Students think about their mock trial experience",
            "They complete: 'A fair justice system should...'",
            "Share ideas with the class",
            "Review key vocabulary and concepts from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the mock trial activity and their ability to use legal vocabulary appropriately.",
      homeworkIdeas: [
        "Research the legal system in another country and write 5-7 sentences comparing it to your own.",
        "Create a poster explaining the steps of a criminal trial using vocabulary from the lesson."
      ],
      additionalResources: [
        {
          title: "Legal System Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Legal_English.htm"
        },
        {
          title: "Courts and Justice System",
          url: "https://learnenglish.britishcouncil.org/vocabulary/beginner-to-pre-intermediate/law"
        }
      ]
    }
  ],  
  // Unit 4: Hotels and Accommodation
  "4": [
    {
      id: "book7-unit4-main-lesson",
      title: "Hotel Accommodation - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different types of hotel rooms and facilities",
        "Learn vocabulary related to hotel services and amenities",
        "Practice making hotel reservations and checking in/out",
        "Ask and answer questions about accommodation preferences"
      ],
      materials: [
        "Visual English Book 7, Unit 4 slides",
        "Hotel vocabulary flashcards",
        "Hotel booking form worksheets",
        "Hotel facilities and services handouts"
      ],
      steps: [
        {
          title: "Warm-up: Accommodation Experiences",
          duration: "5 mins",
          description: "Begin by asking students about their hotel experiences.",
          instructions: [
            "Ask students: 'Have you ever stayed in a hotel?'",
            "Follow up with: 'What kind of accommodation do you prefer when traveling?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on hotel accommodation."
        },
        {
          title: "Vocabulary Presentation: Hotel Rooms and Facilities",
          duration: "10 mins",
          description: "Introduce vocabulary for different types of hotel rooms and facilities.",
          materials: [
            "Book 7, Unit 4 slides (first section)",
            "Hotel vocabulary flashcards"
          ],
          instructions: [
            "Display slides showing different hotel rooms (single, double, suite, etc.)",
            "For each room type, ask: 'What type of room is this?'",
            "Introduce hotel facilities (reception, restaurant, gym, spa, etc.)",
            "Drill pronunciation of each term",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Hotel Services and Amenities",
          duration: "10 mins",
          description: "Students learn vocabulary related to hotel services and amenities.",
          materials: [
            "Book 7, Unit 4 slides (middle section)",
            "Hotel services and amenities handout"
          ],
          instructions: [
            "Present vocabulary: room service, housekeeping, concierge, etc.",
            "Ask: 'What services do hotels offer to guests?'",
            "Students match services with descriptions in pairs",
            "Practice using structures: 'I would like to order room service.'",
            "Check responses as a class"
          ],
          teacherNotes: "Emphasize practical language for requesting hotel services."
        },
        {
          title: "Hotel Booking Role Play",
          duration: "15 mins",
          description: "Students practice making hotel reservations through role play.",
          materials: [
            "Hotel booking form worksheets",
            "Role cards (receptionist, guest)",
            "Book 7, Unit 4 slides (final section)"
          ],
          instructions: [
            "Review language for making reservations and checking in/out",
            "Divide students into pairs (receptionist and guest)",
            "Provide booking forms and scenario cards",
            "Guests must book specific types of rooms with particular requirements",
            "Receptionists complete booking forms based on requests",
            "Have 2-3 pairs demonstrate their dialogues"
          ]
        },
        {
          title: "Wrap-up: Ideal Hotel",
          duration: "5 mins",
          description: "Students describe their ideal hotel accommodation.",
          instructions: [
            "Ask students to think about their perfect hotel",
            "They complete the sentence: 'My ideal hotel would have...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the hotel booking role play and their ability to use hotel vocabulary correctly.",
      homeworkIdeas: [
        "Write a hotel review for a real or imaginary hotel using vocabulary from the lesson.",
        "Create a brochure for a new luxury hotel including rooms, facilities, and services."
      ],
      additionalResources: [
        {
          title: "Hotel and Accommodation Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Hotels.htm"
        },
        {
          title: "Hotel Vocabulary Quiz",
          url: "https://wordwall.net/resource/search?query=hotel%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit4-extension-lesson",
      title: "Types of Accommodation - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary for different types of accommodation",
        "Compare advantages and disadvantages of various lodging options",
        "Discuss travel and accommodation preferences",
        "Develop speaking skills through accommodation comparisons"
      ],
      materials: [
        "Visual English Book 7, Unit 4 slides",
        "Accommodation types flashcards",
        "Accommodation comparison worksheet",
        "Travel scenarios cards"
      ],
      steps: [
        {
          title: "Warm-up: Travel Preferences",
          duration: "5 mins",
          description: "Begin by asking students about their travel accommodation preferences.",
          instructions: [
            "Ask students: 'What kind of place do you usually stay in when traveling?'",
            "Follow up with: 'Have you ever tried unusual accommodation like camping or a hostel?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates context for discussing different types of accommodation."
        },
        {
          title: "Vocabulary Presentation: Accommodation Types",
          duration: "10 mins",
          description: "Introduce vocabulary for different types of accommodation beyond hotels.",
          materials: [
            "Accommodation types flashcards",
            "Book 7, Unit 4 slides (supplementary section)"
          ],
          instructions: [
            "Present accommodation types: hostel, motel, B&B, guesthouse, apartment, campsite, etc.",
            "Explain key features of each accommodation type",
            "Drill pronunciation of each term",
            "Discuss typical guests for each accommodation type",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Accommodation Comparison",
          duration: "10 mins",
          description: "Students compare different types of accommodation.",
          materials: [
            "Accommodation comparison worksheet",
            "Price range and features chart"
          ],
          instructions: [
            "Distribute comparison worksheets with criteria (price, comfort, privacy, etc.)",
            "Review comparative language: 'Hotels are more expensive than hostels.'",
            "Students work in pairs to complete comparisons",
            "Discuss which accommodation offers best value for different travelers",
            "Check answers as a class"
          ],
          teacherNotes: "Encourage students to think about different traveler needs and budgets."
        },
        {
          title: "Travel Scenarios Activity",
          duration: "15 mins",
          description: "Students recommend accommodation based on different travel scenarios.",
          materials: [
            "Travel scenarios cards",
            "Accommodation recommendation form"
          ],
          instructions: [
            "Divide students into small groups",
            "Distribute travel scenario cards (business trip, family vacation, backpacking, etc.)",
            "Groups discuss and recommend suitable accommodation for each scenario",
            "They must justify their recommendations",
            "Groups present their recommendations to the class"
          ]
        },
        {
          title: "Wrap-up: Unusual Accommodations",
          duration: "5 mins",
          description: "Students discuss unusual or unique accommodation options.",
          instructions: [
            "Show pictures of unusual accommodations (ice hotel, treehouse, underwater hotel, etc.)",
            "Ask: 'Would you like to stay in any of these places? Why or why not?'",
            "Students share their opinions with the class",
            "Review key vocabulary and concepts from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the travel scenarios activity and their ability to use appropriate vocabulary for different types of accommodation.",
      homeworkIdeas: [
        "Research an unusual type of accommodation and prepare a short presentation.",
        "Write a dialogue between a travel agent and a client looking for specific accommodation."
      ],
      additionalResources: [
        {
          title: "Types of Accommodation Vocabulary",
          url: "https://www.englishclub.com/vocabulary/travel-accommodation.php"
        },
        {
          title: "Accommodation Matching Game",
          url: "https://wordwall.net/resource/search?query=accommodation%20types"
        }
      ]
    }
  ],  "5": [
    {
      id: "book7-unit5-main-lesson",
      title: "Art and Artists - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different types of art and artistic styles",
        "Express preferences about art using target structures",
        "Describe artwork using appropriate adjectives",
        "Discuss famous artists and their works"
      ],
      materials: [
        "Visual English Book 7, Unit 5 slides",
        "Images of famous artworks",
        "Art style flashcards",
        "Art description vocabulary handout"
      ],
      steps: [
        {
          title: "Warm-up: Art Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with art.",
          instructions: [
            "Ask students: 'Have you ever visited an art gallery?'",
            "Follow up with: 'Do you have a favorite artist?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on art."
        },
        {
          title: "Vocabulary Presentation: Art Styles",
          duration: "10 mins",
          description: "Introduce vocabulary for different art styles and forms.",
          materials: [
            "Book 7, Unit 5 slides (first section)",
            "Art style flashcards",
            "Images of famous artworks"
          ],
          instructions: [
            "Display slides showing different art styles (abstract, impressionism, etc.)",
            "For each style, ask: 'What type of art is this?'",
            "Drill pronunciation of each style name",
            "Discuss key characteristics of each style",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Art Description Practice",
          duration: "10 mins",
          description: "Students practice describing artwork using target vocabulary.",
          materials: [
            "Book 7, Unit 5 slides (middle section)",
            "Art description vocabulary handout"
          ],
          instructions: [
            "Introduce adjectives for describing art: 'beautiful, striking, colorful, etc.'",
            "Demonstrate how to describe a painting",
            "Show 3-4 different artworks",
            "Students practice describing them using target vocabulary",
            "Check responses as a class"
          ],
          teacherNotes: "Encourage students to use a variety of descriptive adjectives."
        },
        {
          title: "Art Gallery Role Play",
          duration: "15 mins",
          description: "Students simulate visiting an art gallery and discussing artworks.",
          materials: [
            "Printed images of artwork placed around the classroom",
            "Role play prompt cards"
          ],
          instructions: [
            "Set up an 'art gallery' with images around the classroom",
            "Divide students into pairs - visitor and gallery guide",
            "Visitor asks questions about artworks, guide provides information",
            "Provide dialog prompts: 'What do you think of this painting?'",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Favorite Artwork",
          duration: "5 mins",
          description: "Students select their favorite artwork from the 'gallery' and explain why.",
          instructions: [
            "Students select one artwork they liked best",
            "They complete the sentence: 'I like this artwork because...'",
            "Share 3-4 opinions with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the art gallery role play and their ability to describe artwork using appropriate vocabulary.",
      homeworkIdeas: [
        "Research a famous artist and write 5-7 sentences about their life and work.",
        "Find an artwork you like and write a short description using the vocabulary learned."
      ],
      additionalResources: [
        {
          title: "Art Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Art.htm"
        },
        {
          title: "Famous Paintings Quiz",
          url: "https://wordwall.net/resource/search?query=famous%20paintings"
        }
      ]
    },
    {
      id: "book7-unit5-extension-lesson",
      title: "Creating Art - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to art materials and techniques",
        "Follow instructions to create a simple artwork",
        "Describe the process of creating art",
        "Present and explain an artwork to classmates"
      ],
      materials: [
        "Visual English Book 7, Unit 5 slides",
        "Art materials vocabulary flashcards",
        "Simple art supplies (paper, colored pencils, etc.)",
        "Step-by-step art project instructions"
      ],
      steps: [
        {
          title: "Warm-up: Art Creation",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with creating art.",
          instructions: [
            "Ask students: 'Do you enjoy creating art yourself?'",
            "Follow up with: 'What kind of art do you like to create?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect ideas from several students"
          ],
          teacherNotes: "This activates schema and creates context for the art creation activity."
        },
        {
          title: "Vocabulary Presentation: Art Materials",
          duration: "10 mins",
          description: "Introduce vocabulary for different art materials and techniques.",
          materials: [
            "Art materials vocabulary flashcards",
            "Actual art supplies as examples"
          ],
          instructions: [
            "Show different art materials (brush, canvas, paint, pencil, etc.)",
            "For each item, ask: 'What is this called?'",
            "Introduce verbs for art techniques: sketch, paint, draw, shade, etc.",
            "Demonstrate simple techniques with the materials",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Art Project Instructions",
          duration: "10 mins",
          description: "Prepare students for creating their own artwork by explaining the process.",
          materials: [
            "Step-by-step instructions",
            "Sample completed artwork"
          ],
          instructions: [
            "Explain the art project (e.g., abstract design, landscape sketch)",
            "Go through the steps one by one, demonstrating each",
            "Introduce phrases for describing process: 'First, Then, Next, Finally'",
            "Review any necessary vocabulary for the specific project",
            "Check student understanding by asking questions"
          ],
          teacherNotes: "Choose a simple art project that can be completed in limited time with basic materials."
        },
        {
          title: "Art Creation Activity",
          duration: "15 mins",
          description: "Students create their own artwork following the instructions.",
          materials: [
            "Art supplies for each student",
            "Project instruction handouts"
          ],
          instructions: [
            "Distribute art supplies to students",
            "Students follow the step-by-step instructions to create artwork",
            "Monitor and assist as needed, encouraging use of target vocabulary",
            "Remind students to think about how they will describe their work",
            "Allow time for completion and basic cleanup"
          ]
        },
        {
          title: "Wrap-up: Art Exhibition",
          duration: "5 mins",
          description: "Students present their artwork to classmates.",
          instructions: [
            "Arrange artwork for viewing",
            "Have 2-3 students present their work to the class",
            "Students should describe what they created and the process",
            "Encourage positive feedback from classmates",
            "Review key vocabulary from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students based on their participation in the art creation activity and their ability to describe their process and finished product using appropriate vocabulary.",
      homeworkIdeas: [
        "Create another artwork at home using a different technique and write 5-7 sentences describing the process.",
        "Research an art technique you're interested in and write a short description of it."
      ],
      additionalResources: [
        {
          title: "Art Materials Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Art_Materials.htm"
        },
        {
          title: "Simple Art Projects for ESL Students",
          url: "https://busyteacher.org/classroom_activities-vocabulary/art_craft-worksheets/"
        }
      ]
    }
  ],
  
  // Unit 6: Photography
  "6": [
    {
      id: "book7-unit6-main-lesson",
      title: "Photography - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to photography and cameras",
        "Describe photographs using appropriate adjectives",
        "Express opinions about different types of photography",
        "Discuss taking and sharing photos in daily life"
      ],
      materials: [
        "Visual English Book 7, Unit 6 slides",
        "Different types of photographs (landscape, portrait, etc.)",
        "Photography equipment vocabulary cards",
        "Photo description worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Photo Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with photography.",
          instructions: [
            "Ask students: 'Do you like taking photos?'",
            "Follow up with: 'What do you usually take photos of?'",
            "Have students show a recent photo on their phones (if appropriate)",
            "Get feedback from 3-4 students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on photography."
        },
        {
          title: "Vocabulary Presentation: Photography",
          duration: "10 mins",
          description: "Introduce vocabulary related to photography and cameras.",
          materials: [
            "Book 7, Unit 6 slides (first section)",
            "Photography equipment flashcards"
          ],
          instructions: [
            "Display slides showing different photography terms and equipment",
            "For each item, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Explain the function of different camera parts",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Photo Description Practice",
          duration: "10 mins",
          description: "Students practice describing photographs using target vocabulary.",
          materials: [
            "Book 7, Unit 6 slides (middle section)",
            "Photo description worksheet",
            "Sample photographs of different styles"
          ],
          instructions: [
            "Introduce adjectives for describing photos: 'clear, blurry, bright, etc.'",
            "Demonstrate how to describe a photograph",
            "Show 3-4 different photographs",
            "Students practice describing them using target vocabulary",
            "Check responses as a class"
          ],
          teacherNotes: "Ensure students are using appropriate adjectives for different aspects of photos."
        },
        {
          title: "Photo Exhibition Role Play",
          duration: "15 mins",
          description: "Students simulate a photo exhibition, presenting and discussing photos.",
          materials: [
            "Various photographs printed or displayed",
            "Role play cards with photographer/visitor roles"
          ],
          instructions: [
            "Divide students into pairs - photographer and visitor",
            "Photographer presents 2-3 photos and explains them",
            "Visitor asks questions about the photos",
            "Provide dialog prompts: 'When did you take this photo?'",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Perfect Photo",
          duration: "5 mins",
          description: "Students describe their idea of a perfect photo.",
          instructions: [
            "Students imagine a perfect photo they would like to take",
            "They complete: 'My perfect photo would show...'",
            "Share 3-4 ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the photo exhibition role play and their ability to describe photographs using appropriate vocabulary.",
      homeworkIdeas: [
        "Take 3 different photos and write a short description of each one using the vocabulary learned.",
        "Research a famous photographer and write 5-7 sentences about their work."
      ],
      additionalResources: [
        {
          title: "Photography Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Photography.htm"
        },
        {
          title: "Photography Quiz",
          url: "https://wordwall.net/resource/search?query=photography%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit6-extension-lesson",
      title: "Digital Photography and Sharing - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to digital photography and photo sharing",
        "Discuss the impact of social media on photography",
        "Practice giving and receiving feedback on photos",
        "Create captions for photos using descriptive language"
      ],
      materials: [
        "Visual English Book 7, Unit 6 slides",
        "Digital photography vocabulary handout",
        "Sample social media posts with photos",
        "Caption writing worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Social Media Photos",
          duration: "5 mins",
          description: "Begin by asking students about photo sharing on social media.",
          instructions: [
            "Ask students: 'Do you share photos on social media?'",
            "Follow up with: 'What types of photos do you share online?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on digital photography and sharing."
        },
        {
          title: "Vocabulary Presentation: Digital Photography",
          duration: "10 mins",
          description: "Introduce vocabulary related to digital photography and online sharing.",
          materials: [
            "Digital photography vocabulary handout",
            "Book 7, Unit 6 slides (supplementary section)"
          ],
          instructions: [
            "Present digital photography terms: upload, filter, edit, share, etc.",
            "Introduce social media photography terms: selfie, story, post, caption",
            "Drill pronunciation of each term",
            "Show examples of each concept",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Photo Caption Writing",
          duration: "10 mins",
          description: "Students practice writing captions for photos using descriptive language.",
          materials: [
            "Sample photos for captioning",
            "Caption writing worksheet"
          ],
          instructions: [
            "Explain the purpose of captions in photo sharing",
            "Show examples of effective photo captions",
            "Distribute photos for students to caption",
            "Students write 1-2 sentence captions for each photo",
            "Share some examples with the class"
          ],
          teacherNotes: "Encourage students to be creative but clear in their captions."
        },
        {
          title: "Digital Photo Feedback Activity",
          duration: "15 mins",
          description: "Students simulate a social media environment, giving feedback on photos.",
          materials: [
            "Sample photos with captions",
            "Feedback expression handout"
          ],
          instructions: [
            "Introduce expressions for giving photo feedback: 'Great shot! The lighting is...'",
            "Display 5-6 different photos with captions",
            "Students work in small groups to discuss each photo",
            "They write positive comments and suggestions for each photo",
            "Groups share their feedback with the class"
          ]
        },
        {
          title: "Wrap-up: Digital Ethics",
          duration: "5 mins",
          description: "Brief discussion about digital photography ethics and etiquette.",
          instructions: [
            "Ask: 'What should you consider before sharing photos online?'",
            "Discuss issues like permission, privacy, and appropriate content",
            "Students complete: 'When I share photos, I always...'",
            "Share several ideas with the class",
            "Review key vocabulary from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students based on their caption writing skills and their ability to use appropriate digital photography vocabulary during the feedback activity.",
      homeworkIdeas: [
        "Create a mini photo essay of 3-5 photos with captions that tell a story.",
        "Write a paragraph comparing traditional and digital photography."
      ],
      additionalResources: [
        {
          title: "Digital Photography Vocabulary",
          url: "https://en.wikipedia.org/wiki/Glossary_of_digital_photography_terms"
        },
        {
          title: "Photo Caption Writing Tips",
          url: "https://grammar.yourdictionary.com/grammar/writing/how-to-write-good-captions-in-photojournalism.html"
        }
      ]
    }
  ],
  
  // Unit 7: Sports
  "7": [
    {
      id: "book7-unit7-main-lesson",
      title: "Sports and Activities - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different sports and sporting equipment",
        "Express preferences about sports using target structures",
        "Ask and answer questions about sporting activities",
        "Discuss benefits of different sports"
      ],
      materials: [
        "Visual English Book 7, Unit 7 slides",
        "Sports flashcards or images",
        "Sports equipment pictures",
        "Sports survey handout"
      ],
      steps: [
        {
          title: "Warm-up: Sports Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with sports.",
          instructions: [
            "Ask students: 'Do you play any sports?'",
            "Follow up with: 'What's your favorite sport to watch?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on sports."
        },
        {
          title: "Vocabulary Presentation: Sports",
          duration: "10 mins",
          description: "Introduce vocabulary for different sports and equipment.",
          materials: [
            "Book 7, Unit 7 slides (first section)",
            "Sports flashcards"
          ],
          instructions: [
            "Display slides showing different sports (football, tennis, swimming, etc.)",
            "For each sport, ask: 'What sport is this?'",
            "Drill pronunciation of each sport name",
            "Introduce equipment used in each sport",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Sports Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing sports preferences.",
          materials: [
            "Book 7, Unit 7 slides (middle section)",
            "Sports survey handout"
          ],
          instructions: [
            "Review expressions: 'I enjoy playing/I'm good at/I find...difficult'",
            "Demonstrate how to express sports preferences",
            "Students complete a sports survey with a partner",
            "Ask questions about different sports",
            "Check some responses as a class"
          ],
          teacherNotes: "Encourage students to give reasons for their preferences."
        },
        {
          title: "Sports Recommendation Role Play",
          duration: "15 mins",
          description: "Students practice recommending sports based on preferences.",
          materials: [
            "Book 7, Unit 7 slides (final section)",
            "Role play cards with different personas"
          ],
          instructions: [
            "Divide students into pairs - advisor and client",
            "Client has specific goals (get fit, make friends, etc.)",
            "Advisor recommends suitable sports",
            "Provide dialog prompts: 'What kind of sport are you looking for?'",
            "Have 2-3 pairs demonstrate their conversations"
          ]
        },
        {
          title: "Wrap-up: Sports Benefits",
          duration: "5 mins",
          description: "Students discuss the benefits of their favorite sports.",
          instructions: [
            "Students think about benefits of their favorite sport",
            "They complete: '[Sport] is good for...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the sports recommendation role play and their ability to express sports preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about your favorite sport, describing what equipment is needed and why you enjoy it.",
        "Create a poster advertising a sport you think more people should try."
      ],
      additionalResources: [
        {
          title: "Sports Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Sports.htm"
        },
        {
          title: "Sports Quiz",
          url: "https://wordwall.net/resource/search?query=sports%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit7-extension-lesson",
      title: "Sports Rules and Competitions - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to sports rules and competitions",
        "Understand and explain basic rules of common sports",
        "Practice using imperatives for giving instructions",
        "Develop speaking skills through commentary and explanation"
      ],
      materials: [
        "Visual English Book 7, Unit 7 slides",
        "Sports rules flashcards or handouts",
        "Competition vocabulary worksheet",
        "Sports commentary video clips (optional)"
      ],
      steps: [
        {
          title: "Warm-up: Sports Knowledge",
          duration: "5 mins",
          description: "Begin by asking students about their knowledge of sports rules.",
          instructions: [
            "Ask students: 'What sports do you know the rules for?'",
            "Follow up with: 'What happens if a player breaks a rule?'",
            "Have students share 1-2 basic rules from their favorite sports",
            "Collect ideas from several students"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on sports rules."
        },
        {
          title: "Vocabulary Presentation: Rules and Competitions",
          duration: "10 mins",
          description: "Introduce vocabulary related to sports rules and competitions.",
          materials: [
            "Competition vocabulary worksheet",
            "Sports rules flashcards"
          ],
          instructions: [
            "Introduce rule-related vocabulary: foul, penalty, referee, offside, etc.",
            "Present competition vocabulary: tournament, championship, league, etc.",
            "Drill pronunciation of each term",
            "Demonstrate the meaning of each term with examples or gestures",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Sport Rules Explanation",
          duration: "10 mins",
          description: "Students practice explaining the basic rules of different sports.",
          materials: [
            "Sport rule cards for common sports",
            "Visual aids showing sport situations"
          ],
          instructions: [
            "Divide students into pairs",
            "Give each pair a sport to focus on",
            "They discuss and note down 3-5 basic rules of that sport",
            "Practice using imperatives: 'Don't touch the ball with your hands in football'",
            "Pairs take turns explaining their sport's rules to another pair"
          ],
          teacherNotes: "Focus on clear, simple explanations rather than complex rules."
        },
        {
          title: "Sports Commentary Activity",
          duration: "15 mins",
          description: "Students practice providing sports commentary for imaginary or video sport scenarios.",
          materials: [
            "Short sports video clips (optional)",
            "Commentary expression handout"
          ],
          instructions: [
            "Introduce common phrases used in sports commentary",
            "Show short sports video clips with sound off (or describe scenarios)",
            "Students practice providing commentary in pairs",
            "Focus on using present continuous and descriptive language",
            "Have 2-3 pairs demonstrate their commentary to the class"
          ]
        },
        {
          title: "Wrap-up: Mini-Tournament Design",
          duration: "5 mins",
          description: "Students design a simple tournament structure for a class competition.",
          instructions: [
            "Discuss the concept of a tournament format",
            "In small groups, students create a mini tournament plan",
            "They decide: What sport? How many teams? What rules?",
            "Share ideas with the class",
            "Review key vocabulary from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their ability to explain sports rules clearly and their use of appropriate vocabulary during the commentary activity.",
      homeworkIdeas: [
        "Write rules for a made-up sport using at least 8 vocabulary items from the lesson.",
        "Create a tournament bracket for a class competition in a sport of your choice."
      ],
      additionalResources: [
        {
          title: "Sports Rules Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Sports_Rules.htm"
        },
        {
          title: "Sports Commentary Phrases",
          url: "https://howdoyousay.net/sports-idioms-and-phrases/"
        }
      ]
    }
  ],
  
  // Unit 8: Hobbies
  "8": [
    {
      id: "book7-unit8-main-lesson",
      title: "Hobbies and Free Time - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different hobbies and free-time activities",
        "Express preferences about hobbies using target structures",
        "Ask and answer questions about free time",
        "Discuss benefits of different hobbies"
      ],
      materials: [
        "Visual English Book 7, Unit 8 slides",
        "Hobby flashcards or images",
        "Free time activities questionnaire",
        "Hobby description cards"
      ],
      steps: [
        {
          title: "Warm-up: Free Time",
          duration: "5 mins",
          description: "Begin by asking students about their free time activities.",
          instructions: [
            "Ask students: 'What do you do in your free time?'",
            "Follow up with: 'How often do you do your hobby?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on hobbies."
        },
        {
          title: "Vocabulary Presentation: Hobbies",
          duration: "10 mins",
          description: "Introduce vocabulary for different hobbies and free-time activities.",
          materials: [
            "Book 7, Unit 8 slides (first section)",
            "Hobby flashcards"
          ],
          instructions: [
            "Display slides showing different hobbies (painting, gardening, cooking, etc.)",
            "For each hobby, ask: 'What activity is this?'",
            "Drill pronunciation of each hobby name",
            "Discuss what each hobby involves",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Hobby Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing preferences about hobbies.",
          materials: [
            "Book 7, Unit 8 slides (middle section)",
            "Free time activities questionnaire"
          ],
          instructions: [
            "Review expressions: 'I'm interested in/I enjoy/I'm keen on'",
            "Demonstrate how to express hobby preferences",
            "Students complete questionnaire with a partner",
            "Ask: 'What kind of hobbies do you enjoy?'",
            "Check some responses as a class"
          ],
          teacherNotes: "Encourage students to use frequency adverbs (often, sometimes, rarely)."
        },
        {
          title: "Hobby Fair Role Play",
          duration: "15 mins",
          description: "Students simulate a hobby fair, presenting and discussing hobbies.",
          materials: [
            "Hobby description cards",
            "Book 7, Unit 8 slides (final section)"
          ],
          instructions: [
            "Give each student a hobby to present at the 'fair'",
            "They prepare a brief presentation about the hobby",
            "Students circulate, asking questions about each others' hobbies",
            "Provide dialog prompts: 'What equipment do you need for this hobby?'",
            "Have 2-3 students present their hobbies to the whole class"
          ]
        },
        {
          title: "Wrap-up: New Hobby",
          duration: "5 mins",
          description: "Students choose a new hobby they would like to try.",
          instructions: [
            "Based on the hobby fair, students select a new hobby to try",
            "They complete: 'I would like to try... because...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the hobby fair role play and their ability to express preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about your favorite hobby, describing what you need and how often you do it.",
        "Interview a family member about their hobbies and write 5-7 sentences about it."
      ],
      additionalResources: [
        {
          title: "Hobbies Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Hobbies.htm"
        },
        {
          title: "Free Time Activities Quiz",
          url: "https://wordwall.net/resource/search?query=hobbies%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit8-extension-lesson",
      title: "Hobby-Related Professions - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Connect hobbies to related professions or careers",
        "Learn vocabulary related to turning hobbies into jobs",
        "Practice discussing career aspirations related to interests",
        "Express opinions about hobby-based businesses"
      ],
      materials: [
        "Visual English Book 7, Unit 8 slides",
        "Hobby-profession matching cards",
        "Career vocabulary handout",
        "Success story examples of hobby-based careers"
      ],
      steps: [
        {
          title: "Warm-up: Hobbies as Careers",
          duration: "5 mins",
          description: "Begin by asking students if they know anyone who turned a hobby into a job.",
          instructions: [
            "Ask students: 'Do you know anyone who turned their hobby into a job?'",
            "Follow up with: 'What hobbies could become careers?'",
            "Have students brainstorm ideas in pairs",
            "Collect examples from several students"
          ],
          teacherNotes: "This activates schema and creates context for the connection between hobbies and careers."
        },
        {
          title: "Vocabulary Presentation: Career Terms",
          duration: "10 mins",
          description: "Introduce vocabulary related to careers and turning hobbies into professions.",
          materials: [
            "Career vocabulary handout",
            "Success story examples"
          ],
          instructions: [
            "Present career vocabulary: profession, career, business, entrepreneur, etc.",
            "Show examples of hobby-related careers (photographer, chef, musician)",
            "Drill pronunciation of each term",
            "Discuss what skills are needed to turn a hobby into a career",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Hobby-Profession Matching",
          duration: "10 mins",
          description: "Students match hobbies with related professions and discuss connections.",
          materials: [
            "Hobby-profession matching cards",
            "Book 7, Unit 8 slides (supplementary section)"
          ],
          instructions: [
            "Divide students into small groups",
            "Distribute hobby-profession matching cards",
            "Groups match hobbies to related professions",
            "They discuss what skills transfer from hobby to profession",
            "Check answers and discuss as a class"
          ],
          teacherNotes: "Emphasize that many hobbies can lead to multiple career options."
        },
        {
          title: "Career Planning Role Play",
          duration: "15 mins",
          description: "Students roleplay career advisor and client discussing hobby-based career options.",
          materials: [
            "Career advisor role cards",
            "Client profile cards with hobby interests"
          ],
          instructions: [
            "Divide students into pairs - advisor and client",
            "Client has specific hobbies listed on their card",
            "Advisor suggests possible careers based on these hobbies",
            "Provide dialog prompts: 'Have you considered becoming a...?'",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Ideal Hobby-Job",
          duration: "5 mins",
          description: "Students imagine their ideal job based on their interests or hobbies.",
          instructions: [
            "Students reflect on their own hobbies and interests",
            "They complete: 'My ideal job would be... because I enjoy...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the career planning role play and their ability to make logical connections between hobbies and careers.",
      homeworkIdeas: [
        "Research someone who turned their hobby into a successful career and write a short profile.",
        "Create a simple business plan for a hobby-based business you might start someday."
      ],
      additionalResources: [
        {
          title: "Career Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Professions.htm"
        },
        {
          title: "Entrepreneurship Resources",
          url: "https://www.wikihow.com/Start-a-Business-Based-on-Your-Hobby"
        }
      ]
    }
  ],
  
  // Unit 9: Travel
  "9": [
    {
      id: "book7-unit9-main-lesson",
      title: "Travel and Tourism - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to travel and tourism",
        "Express preferences about travel destinations",
        "Ask and answer questions about holiday experiences",
        "Practice planning a trip using target language"
      ],
      materials: [
        "Visual English Book 7, Unit 9 slides",
        "Travel destination flashcards or images",
        "Travel vocabulary worksheet",
        "Trip planning worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Travel Experience",
          duration: "5 mins",
          description: "Begin by asking students about their travel experiences.",
          instructions: [
            "Ask students: 'Have you ever traveled abroad?'",
            "Follow up with: 'What's your favorite place to visit?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on travel."
        },
        {
          title: "Vocabulary Presentation: Travel",
          duration: "10 mins",
          description: "Introduce vocabulary related to travel and tourism.",
          materials: [
            "Book 7, Unit 9 slides (first section)",
            "Travel vocabulary flashcards"
          ],
          instructions: [
            "Display slides showing travel vocabulary (airport, hotel, sightseeing, etc.)",
            "For each term, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Discuss different types of holidays (beach, city break, etc.)",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Travel Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing travel preferences.",
          materials: [
            "Book 7, Unit 9 slides (middle section)",
            "Travel preferences worksheet"
          ],
          instructions: [
            "Review expressions: 'I prefer/I'd rather/I'd like to'",
            "Demonstrate how to express travel preferences",
            "Students complete worksheet with a partner",
            "Ask: 'What kind of holidays do you prefer?'",
            "Check some responses as a class"
          ],
          teacherNotes: "Encourage students to use comparative structures if appropriate."
        },
        {
          title: "Trip Planning Role Play",
          duration: "15 mins",
          description: "Students practice planning a trip in pairs.",
          materials: [
            "Trip planning worksheet",
            "Travel destination information cards"
          ],
          instructions: [
            "Divide students into pairs planning a trip together",
            "They must decide where to go, how to travel, what to do",
            "Provide planning worksheet with prompts",
            "Encourage use of expressions like 'We could... How about...?'",
            "Have 2-3 pairs present their trip plans"
          ]
        },
        {
          title: "Wrap-up: Dream Destination",
          duration: "5 mins",
          description: "Students describe their dream travel destination.",
          instructions: [
            "Students think about a place they dream of visiting",
            "They complete: 'I would love to visit... because...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the trip planning role play and their ability to express travel preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about a place you have visited, describing what you did there.",
        "Create a travel itinerary for a 3-day trip to a destination of your choice."
      ],
      additionalResources: [
        {
          title: "Travel Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Travel.htm"
        },
        {
          title: "Tourism and Travel Quiz",
          url: "https://wordwall.net/resource/search?query=travel%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit9-extension-lesson",
      title: "Cultural Etiquette While Traveling - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to cultural differences and customs",
        "Understand basic etiquette for different countries",
        "Practice asking for information about cultural norms",
        "Develop awareness of respectful behavior when traveling"
      ],
      materials: [
        "Visual English Book 7, Unit 9 slides",
        "Cultural etiquette cards for different countries",
        "Etiquette role play scenarios",
        "Cultural differences vocabulary handout"
      ],
      steps: [
        {
          title: "Warm-up: Cultural Surprises",
          duration: "5 mins",
          description: "Begin by asking students about cultural differences they have experienced.",
          instructions: [
            "Ask students: 'Have you ever experienced cultural differences when traveling?'",
            "Follow up with: 'What surprised you about another country's customs?'",
            "Have students share brief examples in pairs",
            "Collect a few interesting experiences from the class"
          ],
          teacherNotes: "This activates schema and creates context for cultural awareness while traveling."
        },
        {
          title: "Vocabulary Presentation: Cultural Etiquette",
          duration: "10 mins",
          description: "Introduce vocabulary related to cultural customs and etiquette.",
          materials: [
            "Cultural differences vocabulary handout",
            "Book 7, Unit 9 slides (supplementary section)"
          ],
          instructions: [
            "Present etiquette vocabulary: customs, polite, rude, acceptable, taboo, etc.",
            "Introduce phrases for asking about customs: 'Is it polite to...?'",
            "Drill pronunciation of each term",
            "Show examples of cultural differences (greetings, dining habits, etc.)",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Cultural Etiquette Matching",
          duration: "10 mins",
          description: "Students match cultural customs with their appropriate countries.",
          materials: [
            "Cultural etiquette cards for different countries",
            "World map (optional)"
          ],
          instructions: [
            "Divide students into small groups",
            "Distribute sets of country cards and custom cards",
            "Groups match customs to appropriate countries",
            "Discuss reasons for each match",
            "Check answers as a class and discuss any surprising customs"
          ],
          teacherNotes: "Emphasize that customs vary even within countries and cultures."
        },
        {
          title: "Travel Etiquette Role Play",
          duration: "15 mins",
          description: "Students practice handling cultural situations through role play.",
          materials: [
            "Etiquette role play scenario cards",
            "Props for different scenarios (optional)"
          ],
          instructions: [
            "Divide students into pairs",
            "Distribute scenario cards (dining, greeting, gift-giving, etc.)",
            "Students practice appropriate cultural responses",
            "Encourage using phrases like: 'I think we should... In this country, it's customary to...'",
            "Have 2-3 pairs demonstrate their scenarios"
          ]
        },
        {
          title: "Wrap-up: Cultural Research",
          duration: "5 mins",
          description: "Students discuss how to research cultural etiquette before traveling.",
          instructions: [
            "Ask: 'How can you learn about a country's customs before visiting?'",
            "Discuss different sources of information",
            "Students complete: 'Before traveling to a new country, I should research...'",
            "Share ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the cultural etiquette role plays and their ability to demonstrate appropriate cultural awareness.",
      homeworkIdeas: [
        "Research three important customs or etiquette rules for a country you would like to visit.",
        "Create a short guide to your country's customs for foreign visitors."
      ],
      additionalResources: [
        {
          title: "World Customs and Etiquette",
          url: "https://www.ef.com/wwen/blog/language/customs-and-etiquette-around-the-world/"
        },
        {
          title: "Cultural Awareness Quiz",
          url: "https://wordwall.net/resource/search?query=cultural%20etiquette"
        }
      ]
    }
  ],
  
  // Unit 10: Technology
  "10": [
    {
      id: "book7-unit10-main-lesson",
      title: "Technology in Daily Life - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to technology and devices",
        "Discuss how technology is used in daily life",
        "Express opinions about technology using target structures",
        "Compare advantages and disadvantages of different devices"
      ],
      materials: [
        "Visual English Book 7, Unit 10 slides",
        "Technology flashcards or images",
        "Tech usage questionnaire",
        "Gadget comparison worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Tech Usage",
          duration: "5 mins",
          description: "Begin by asking students about the technology they use daily.",
          instructions: [
            "Ask students: 'What technology do you use every day?'",
            "Follow up with: 'Which device is most important to you?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on technology."
        },
        {
          title: "Vocabulary Presentation: Technology",
          duration: "10 mins",
          description: "Introduce vocabulary related to technology and devices.",
          materials: [
            "Book 7, Unit 10 slides (first section)",
            "Technology flashcards"
          ],
          instructions: [
            "Display slides showing different devices and tech terms",
            "For each item, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Discuss what each device is used for",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Tech Opinions Practice",
          duration: "10 mins",
          description: "Students practice expressing opinions about technology.",
          materials: [
            "Book 7, Unit 10 slides (middle section)",
            "Tech usage questionnaire"
          ],
          instructions: [
            "Review expressions: 'I think.../In my opinion.../I believe...'",
            "Demonstrate how to express opinions about technology",
            "Students complete questionnaire with a partner",
            "Ask: 'What do you think about social media?'",
            "Check some responses as a class"
          ],
          teacherNotes: "Encourage students to give reasons for their opinions."
        },
        {
          title: "Gadget Showroom Role Play",
          duration: "15 mins",
          description: "Students simulate a technology showroom, presenting and comparing devices.",
          materials: [
            "Gadget comparison worksheet",
            "Role play cards with customer/salesperson roles"
          ],
          instructions: [
            "Divide students into pairs - customer and salesperson",
            "Salesperson presents 2-3 devices, comparing features",
            "Customer asks questions and decides which to buy",
            "Provide dialog prompts: 'What are the advantages of this device?'",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Future Tech",
          duration: "5 mins",
          description: "Students predict future technology.",
          instructions: [
            "Students imagine a new technology for the future",
            "They complete: 'In the future, I think we will have...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the gadget showroom role play and their ability to express opinions about technology using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about how you use technology in your daily life.",
        "Create a comparison chart of two technology devices, listing their advantages and disadvantages."
      ],
      additionalResources: [
        {
          title: "Technology Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Technology.htm"
        },
        {
          title: "Technology Quiz",
          url: "https://wordwall.net/resource/search?query=technology%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit10-extension-lesson",
      title: "Internet Safety and Digital Citizenship - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to internet safety and online behavior",
        "Understand basic principles of digital citizenship",
        "Practice giving advice about safe online habits",
        "Discuss potential problems and solutions related to internet use"
      ],
      materials: [
        "Visual English Book 7, Unit 10 slides",
        "Internet safety vocabulary handout",
        "Digital citizenship scenario cards",
        "Online safety tips worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Online Time",
          duration: "5 mins",
          description: "Begin by asking students about their online activities and time spent online.",
          instructions: [
            "Ask students: 'How much time do you spend online each day?'",
            "Follow up with: 'What do you usually do online?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect some responses from the class"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on internet safety."
        },
        {
          title: "Vocabulary Presentation: Internet Safety",
          duration: "10 mins",
          description: "Introduce vocabulary related to internet safety and digital citizenship.",
          materials: [
            "Internet safety vocabulary handout",
            "Book 7, Unit 10 slides (supplementary section)"
          ],
          instructions: [
            "Present safety vocabulary: password, privacy, personal information, phishing, etc.",
            "Introduce digital citizenship concepts: respect, responsibility, safety",
            "Drill pronunciation of each term",
            "Explain the meaning of each concept with examples",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Online Safety Guidelines",
          duration: "10 mins",
          description: "Students discuss and learn basic guidelines for staying safe online.",
          materials: [
            "Online safety tips worksheet",
            "Internet safety illustrations"
          ],
          instructions: [
            "Present 5-6 key online safety rules with examples",
            "Discuss why each rule is important",
            "Students match safety tips with appropriate scenarios",
            "Review answers as a class",
            "Ask students to add any additional tips they know"
          ],
          teacherNotes: "Focus on age-appropriate safety concerns without causing unnecessary worry."
        },
        {
          title: "Digital Citizenship Role Play",
          duration: "15 mins",
          description: "Students practice handling online scenarios responsibly.",
          materials: [
            "Digital citizenship scenario cards",
            "Response suggestion prompts"
          ],
          instructions: [
            "Divide students into small groups of 3-4",
            "Distribute scenario cards with online dilemmas",
            "Groups discuss appropriate responses to each scenario",
            "Groups present their scenario and solution to the class",
            "Class discusses if they agree with the solution"
          ]
        },
        {
          title: "Wrap-up: Personal Safety Plan",
          duration: "5 mins",
          description: "Students create a personal internet safety plan.",
          instructions: [
            "Students write 3 personal online safety rules they will follow",
            "Encourage specific, actionable commitments",
            "Have several students share their plans",
            "Review key vocabulary and safety concepts from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the digital citizenship role play and their ability to articulate appropriate responses to online scenarios.",
      homeworkIdeas: [
        "Create a poster or infographic with 5 important internet safety tips.",
        "Interview a family member about their online safety habits and write a short report."
      ],
      additionalResources: [
        {
          title: "Internet Safety for Kids",
          url: "https://www.commonsensemedia.org/privacy-and-internet-safety"
        },
        {
          title: "Digital Citizenship Games",
          url: "https://www.digitalcitizenship.net/curriculum.html"
        }
      ]
    }
  ],
  
  // Unit 11: Work
  "11": [
    {
      id: "book7-unit11-main-lesson",
      title: "Jobs and Careers - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to jobs and workplaces",
        "Discuss different professions and required skills",
        "Practice asking and answering questions about jobs",
        "Talk about career aspirations and preferences"
      ],
      materials: [
        "Visual English Book 7, Unit 11 slides",
        "Job flashcards or images",
        "Workplace vocabulary handout",
        "Job interview role play cards"
      ],
      steps: [
        {
          title: "Warm-up: Work Experience",
          duration: "5 mins",
          description: "Begin by asking students about their work experience or aspirations.",
          instructions: [
            "Ask students: 'Do you work or study?'",
            "Follow up with: 'What job would you like to have in the future?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on jobs."
        },
        {
          title: "Vocabulary Presentation: Jobs",
          duration: "10 mins",
          description: "Introduce vocabulary for different jobs and workplaces.",
          materials: [
            "Book 7, Unit 11 slides (first section)",
            "Job flashcards"
          ],
          instructions: [
            "Display slides showing different jobs (doctor, teacher, engineer, etc.)",
            "For each job, ask: 'What job is this?'",
            "Drill pronunciation of each job title",
            "Discuss what people do in each job",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Job Description Practice",
          duration: "10 mins",
          description: "Students practice describing jobs and required skills.",
          materials: [
            "Book 7, Unit 11 slides (middle section)",
            "Workplace vocabulary handout"
          ],
          instructions: [
            "Introduce phrases for describing jobs: 'They work in.../They're responsible for...'",
            "Demonstrate how to describe job responsibilities",
            "Students match jobs with their descriptions in pairs",
            "Ask: 'What skills do you need for this job?'",
            "Check answers as a class"
          ],
          teacherNotes: "Encourage students to use a variety of expressions to describe jobs."
        },
        {
          title: "Job Interview Role Play",
          duration: "15 mins",
          description: "Students practice job interviews in pairs.",
          materials: [
            "Job interview role play cards",
            "List of common interview questions"
          ],
          instructions: [
            "Divide students into pairs - interviewer and applicant",
            "Provide job descriptions and interview questions",
            "Interviewer asks questions about skills and experience",
            "Applicant responds appropriately",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Dream Job",
          duration: "5 mins",
          description: "Students describe their dream job.",
          instructions: [
            "Students think about their ideal job",
            "They complete: 'My dream job would be... because...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the job interview role play and their ability to describe jobs using appropriate vocabulary.",
      homeworkIdeas: [
        "Write a paragraph about a job you find interesting, describing the responsibilities and required skills.",
        "Create a simple CV/resume for yourself or for an imaginary person applying for a specific job."
      ],
      additionalResources: [
        {
          title: "Jobs and Occupations Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Jobs.htm"
        },
        {
          title: "Professions Quiz",
          url: "https://wordwall.net/resource/search?query=jobs%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit11-extension-lesson",
      title: "Workplace Communication - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to workplace communication",
        "Practice formal and informal communication styles",
        "Develop email writing skills for professional contexts",
        "Role play common workplace interactions"
      ],
      materials: [
        "Visual English Book 7, Unit 11 slides",
        "Workplace communication vocabulary handout",
        "Email template worksheet",
        "Workplace scenario cards"
      ],
      steps: [
        {
          title: "Warm-up: Communication Styles",
          duration: "5 mins",
          description: "Begin by discussing different communication styles in various contexts.",
          instructions: [
            "Ask students: 'How do you speak differently to friends versus teachers?'",
            "Follow up with: 'How is workplace communication different from casual conversation?'",
            "Have students discuss examples in pairs",
            "Collect ideas from several students"
          ],
          teacherNotes: "This activates schema and creates context for formal workplace communication."
        },
        {
          title: "Vocabulary Presentation: Workplace Communication",
          duration: "10 mins",
          description: "Introduce vocabulary related to workplace communication.",
          materials: [
            "Workplace communication vocabulary handout",
            "Book 7, Unit 11 slides (supplementary section)"
          ],
          instructions: [
            "Present communication vocabulary: meeting, deadline, report, supervisor, etc.",
            "Introduce formal phrases: 'I would appreciate if you could.../I'm writing to request...'",
            "Drill pronunciation of each term",
            "Compare formal and informal expressions for the same requests",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Professional Email Writing",
          duration: "10 mins",
          description: "Students learn and practice writing professional emails.",
          materials: [
            "Email template worksheet",
            "Sample professional emails"
          ],
          instructions: [
            "Present the structure of a professional email (greeting, purpose, details, closing)",
            "Discuss appropriate language and formality",
            "Show examples of good professional emails",
            "Students draft a short email based on a given scenario",
            "Check some examples as a class"
          ],
          teacherNotes: "Focus on appropriate level of formality and clear communication."
        },
        {
          title: "Workplace Communication Role Play",
          duration: "15 mins",
          description: "Students practice common workplace interactions through role play.",
          materials: [
            "Workplace scenario cards",
            "Dialogue prompts"
          ],
          instructions: [
            "Divide students into pairs",
            "Distribute scenario cards (requesting time off, explaining a delay, etc.)",
            "Students prepare and practice appropriate dialogues",
            "Encourage use of formal language and polite expressions",
            "Have 2-3 pairs demonstrate their scenarios"
          ]
        },
        {
          title: "Wrap-up: Communication Tips",
          duration: "5 mins",
          description: "Students compile tips for effective workplace communication.",
          instructions: [
            "In small groups, students create a list of 3-4 workplace communication tips",
            "Groups share their tips with the class",
            "Create a master list of the best communication tips",
            "Review key vocabulary and phrases from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their email writing skills and their ability to use appropriate formal language in workplace role plays.",
      homeworkIdeas: [
        "Write a formal email to request information about a job or internship opportunity.",
        "Create a dialogue between a boss and employee discussing a project deadline."
      ],
      additionalResources: [
        {
          title: "Business English Vocabulary",
          url: "https://www.businessenglishresources.com/vocabulary-list/"
        },
        {
          title: "Professional Email Writing Guide",
          url: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/email_etiquette.html"
        }
      ]
    }
  ],
  
  // Unit 12: Shopping
  "12": [
    {
      id: "book7-unit12-main-lesson",
      title: "Shopping and Stores - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to shopping and different types of stores",
        "Practice asking for items and information in shops",
        "Role play shopping dialogues with appropriate language",
        "Express preferences about shopping habits"
      ],
      materials: [
        "Visual English Book 7, Unit 12 slides",
        "Store type flashcards",
        "Shopping dialogue cards",
        "Price and item flashcards"
      ],
      steps: [
        {
          title: "Warm-up: Shopping Habits",
          duration: "5 mins",
          description: "Begin by asking students about their shopping habits.",
          instructions: [
            "Ask students: 'Do you enjoy shopping?'",
            "Follow up with: 'Where do you usually shop - in stores or online?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on shopping."
        },
        {
          title: "Vocabulary Presentation: Stores",
          duration: "10 mins",
          description: "Introduce vocabulary for different types of stores and shopping items.",
          materials: [
            "Book 7, Unit 12 slides (first section)",
            "Store type flashcards"
          ],
          instructions: [
            "Display slides showing different stores (supermarket, clothing store, etc.)",
            "For each store, ask: 'What type of store is this?'",
            "Drill pronunciation of each store name",
            "Discuss what items can be bought in each store",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Shopping Dialogue Practice",
          duration: "10 mins",
          description: "Students practice common shopping dialogues.",
          materials: [
            "Book 7, Unit 12 slides (middle section)",
            "Shopping dialogue worksheet"
          ],
          instructions: [
            "Introduce phrases: 'Can I help you?/I'm looking for.../How much is it?'",
            "Demonstrate a shopping dialogue with a student",
            "Students practice dialogues in pairs using the worksheet",
            "Monitor and provide feedback on pronunciation and intonation",
            "Check some responses as a class"
          ],
          teacherNotes: "Ensure students use appropriate politeness expressions."
        },
        {
          title: "Department Store Role Play",
          duration: "15 mins",
          description: "Students simulate shopping in different departments of a store.",
          materials: [
            "Department cards (clothing, electronics, etc.)",
            "Price and item flashcards",
            "Shopping list cards"
          ],
          instructions: [
            "Set up 'departments' around the classroom",
            "Divide students into shoppers and shop assistants",
            "Shoppers have lists of items to find",
            "Shop assistants help and provide information",
            "Have students switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Shopping Preferences",
          duration: "5 mins",
          description: "Students discuss their shopping preferences.",
          instructions: [
            "Students reflect on their shopping habits",
            "They complete: 'I prefer shopping in/for... because...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the department store role play and their ability to use shopping vocabulary and phrases appropriately.",
      homeworkIdeas: [
        "Write a dialogue between a customer and shop assistant for a specific type of store.",
        "Create a shopping list with 10 items and note which stores you would need to visit to buy them."
      ],
      additionalResources: [
        {
          title: "Shopping Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Shopping.htm"
        },
        {
          title: "Store Types Quiz",
          url: "https://wordwall.net/resource/search?query=shopping%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit12-extension-lesson",
      title: "Online Shopping - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to online shopping and e-commerce",
        "Compare traditional shopping with online shopping",
        "Practice language for describing online shopping experiences",
        "Develop critical thinking skills about advantages and disadvantages"
      ],
      materials: [
        "Visual English Book 7, Unit 12 slides",
        "Online shopping vocabulary handout",
        "Online store screenshots or printouts",
        "Online vs. in-store comparison worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Online Shopping Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with online shopping.",
          instructions: [
            "Ask students: 'Have you ever bought anything online?'",
            "Follow up with: 'What was the last thing you bought online?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on online shopping."
        },
        {
          title: "Vocabulary Presentation: E-commerce",
          duration: "10 mins",
          description: "Introduce vocabulary related to online shopping and e-commerce.",
          materials: [
            "Online shopping vocabulary handout",
            "Book 7, Unit 12 slides (supplementary section)"
          ],
          instructions: [
            "Present online shopping terms: cart, checkout, delivery, review, etc.",
            "Introduce online payment terms: credit card, PayPal, secure, etc.",
            "Drill pronunciation of each term",
            "Show examples using online store screenshots",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Online vs. In-store Comparison",
          duration: "10 mins",
          description: "Students compare traditional and online shopping experiences.",
          materials: [
            "Online vs. in-store comparison worksheet",
            "Comparison language prompts"
          ],
          instructions: [
            "Review comparative language: 'more convenient than', 'less time-consuming than'",
            "Brainstorm advantages and disadvantages of both shopping methods",
            "Students complete comparison worksheet in pairs",
            "Discuss differences in price, convenience, experience, etc.",
            "Check responses as a class"
          ],
          teacherNotes: "Encourage balanced consideration of both shopping methods."
        },
        {
          title: "Online Shopping Simulation",
          duration: "15 mins",
          description: "Students simulate the online shopping process through role play.",
          materials: [
            "Online store simulation worksheets",
            "Product cards with descriptions and prices"
          ],
          instructions: [
            "Divide students into pairs",
            "One student is the 'shopper', one is the 'website/customer service'",
            "Shopper browses products, asks questions, places order",
            "Website provides information, confirms order, answers questions",
            "Have pairs switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Shopping Advice",
          duration: "5 mins",
          description: "Students give advice about smart online shopping practices.",
          instructions: [
            "In small groups, students create tips for safe online shopping",
            "Each group shares their best piece of advice",
            "Create a class list of online shopping tips",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the online shopping simulation and their ability to use appropriate e-commerce vocabulary.",
      homeworkIdeas: [
        "Write a short review of an online store or a product you've purchased online.",
        "Create a comparison chart of prices for the same item in physical stores and online shops."
      ],
      additionalResources: [
        {
          title: "E-commerce Vocabulary",
          url: "https://quizlet.com/subject/e-commerce/"
        },
        {
          title: "Online Shopping Safety Guide",
          url: "https://www.consumer.ftc.gov/articles/0020-shopping-online"
        }
      ]
    }
  ],
  
  // Unit 13: Restaurants
  "13": [
    {
      id: "book7-unit13-main-lesson",
      title: "Restaurants and Dining - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to restaurants and dining",
        "Practice ordering food and making reservations",
        "Role play restaurant dialogues",
        "Discuss dining preferences and customs"
      ],
      materials: [
        "Visual English Book 7, Unit 13 slides",
        "Restaurant vocabulary flashcards",
        "Menu handouts",
        "Restaurant dialogue cards"
      ],
      steps: [
        {
          title: "Warm-up: Dining Experience",
          duration: "5 mins",
          description: "Begin by asking students about their dining experiences.",
          instructions: [
            "Ask students: 'How often do you eat at restaurants?'",
            "Follow up with: 'What's your favorite type of restaurant?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on restaurants."
        },
        {
          title: "Vocabulary Presentation: Restaurants",
          duration: "10 mins",
          description: "Introduce vocabulary related to restaurants and dining.",
          materials: [
            "Book 7, Unit 13 slides (first section)",
            "Restaurant vocabulary flashcards"
          ],
          instructions: [
            "Display slides showing restaurant vocabulary (menu, waiter, bill, etc.)",
            "For each term, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Discuss different courses in a meal (appetizer, main course, etc.)",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Restaurant Dialogue Practice",
          duration: "10 mins",
          description: "Students practice common restaurant dialogues.",
          materials: [
            "Book 7, Unit 13 slides (middle section)",
            "Restaurant dialogue worksheet"
          ],
          instructions: [
            "Introduce phrases: 'I'd like to order.../Could I have.../The bill, please'",
            "Demonstrate a restaurant dialogue with a student",
            "Students practice dialogues in pairs using the worksheet",
            "Monitor and provide feedback on pronunciation and intonation",
            "Check some responses as a class"
          ],
          teacherNotes: "Ensure students use appropriate politeness expressions."
        },
        {
          title: "Restaurant Role Play",
          duration: "15 mins",
          description: "Students simulate a restaurant experience with menus and ordering.",
          materials: [
            "Menu handouts",
            "Role play cards (waiter/customer)",
            "Play money (optional)"
          ],
          instructions: [
            "Divide students into groups of 3-4",
            "Assign roles: waiter, customers",
            "Provide menus for each 'restaurant'",
            "Customers make reservations, order food, ask for the bill",
            "Have students switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Dining Preferences",
          duration: "5 mins",
          description: "Students discuss their restaurant preferences.",
          instructions: [
            "Students reflect on their dining habits",
            "They complete: 'My ideal restaurant would...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the restaurant role play and their ability to use restaurant vocabulary and phrases appropriately.",
      homeworkIdeas: [
        "Write a dialogue between a customer and waiter in a restaurant.",
        "Create a menu for your own imaginary restaurant with appetizers, main courses, and desserts."
      ],
      additionalResources: [
        {
          title: "Restaurant Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Restaurant.htm"
        },
        {
          title: "Dining Out Quiz",
          url: "https://wordwall.net/resource/search?query=restaurant%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit13-extension-lesson",
      title: "International Cuisine - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to international cuisine and food types",
        "Compare eating customs from different cultures",
        "Practice describing dishes from around the world",
        "Develop cultural awareness through food traditions"
      ],
      materials: [
        "Visual English Book 7, Unit 13 slides",
        "World map with cuisine markers",
        "International food flashcards",
        "Cultural dining customs handout"
      ],
      steps: [
        {
          title: "Warm-up: Food Around the World",
          duration: "5 mins",
          description: "Begin by asking students about their experience with international foods.",
          instructions: [
            "Ask students: 'What foreign foods have you tried?'",
            "Follow up with: 'Which country's cuisine do you like best?'",
            "Have students share experiences in pairs",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates context for exploring international cuisines."
        },
        {
          title: "Vocabulary Presentation: International Dishes",
          duration: "10 mins",
          description: "Introduce vocabulary for different international dishes and ingredients.",
          materials: [
            "International food flashcards",
            "Book 7, Unit 13 slides (supplementary section)"
          ],
          instructions: [
            "Present dishes from different countries (pasta, sushi, curry, etc.)",
            "Show each dish and ask: 'Do you know what this is called and where it's from?'",
            "Drill pronunciation of each dish name",
            "Discuss key ingredients and preparation methods",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Cultural Dining Customs",
          duration: "10 mins",
          description: "Students learn about eating customs from different cultures.",
          materials: [
            "Cultural dining customs handout",
            "World map with cuisine markers"
          ],
          instructions: [
            "Present different dining customs (using chopsticks, eating with hands, etc.)",
            "Discuss table manners in different countries",
            "Students match customs to countries in pairs",
            "Highlight interesting differences and similarities",
            "Discuss what might surprise visitors to their own country"
          ],
          teacherNotes: "Emphasize respect for cultural differences and avoid stereotyping."
        },
        {
          title: "International Restaurant Guide",
          duration: "15 mins",
          description: "Students create guides for diners at international restaurants.",
          materials: [
            "Restaurant guide template",
            "Cultural information cards"
          ],
          instructions: [
            "Divide students into small groups",
            "Assign each group a specific cuisine/country",
            "Groups create mini-guides including: typical dishes, customs, useful phrases",
            "Encourage adding recommendations and tips for first-time diners",
            "Have groups present their guides to the class"
          ]
        },
        {
          title: "Wrap-up: Food Journey",
          duration: "5 mins",
          description: "Students plan an imaginary culinary journey around the world.",
          instructions: [
            "Students choose three countries they would visit for their cuisine",
            "They complete: 'On my food journey, I would visit... to try...'",
            "Share ideas with the class",
            "Review key vocabulary and cultural insights from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their international restaurant guides and their ability to appropriately describe international cuisines and customs.",
      homeworkIdeas: [
        "Research a traditional dish from another country and write a recipe with ingredients and preparation steps.",
        "Create a cultural comparison of dining customs between your country and another country of your choice."
      ],
      additionalResources: [
        {
          title: "International Cuisine Guide",
          url: "https://www.taste-atlas.com/"
        },
        {
          title: "World Food Vocabulary",
          url: "https://quizlet.com/subject/world-cuisine/"
        }
      ]
    }
  ],
  
  // Unit 14: Health
  "14": [
    {
      id: "book7-unit14-main-lesson",
      title: "Health and Wellness - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to health, illness, and medical care",
        "Describe health problems and symptoms",
        "Practice dialogues about health and doctor visits",
        "Discuss healthy habits and wellness"
      ],
      materials: [
        "Visual English Book 7, Unit 14 slides",
        "Health vocabulary flashcards",
        "Body parts diagram",
        "Doctor-patient role play cards"
      ],
      steps: [
        {
          title: "Warm-up: Health Habits",
          duration: "5 mins",
          description: "Begin by asking students about their health habits.",
          instructions: [
            "Ask students: 'What do you do to stay healthy?'",
            "Follow up with: 'When was the last time you were sick?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on health."
        },
        {
          title: "Vocabulary Presentation: Health",
          duration: "10 mins",
          description: "Introduce vocabulary related to health, illness, and medical care.",
          materials: [
            "Book 7, Unit 14 slides (first section)",
            "Health vocabulary flashcards",
            "Body parts diagram"
          ],
          instructions: [
            "Display slides showing health vocabulary (headache, fever, doctor, etc.)",
            "For each term, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Point to body parts and ask about related ailments",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Health Problem Description",
          duration: "10 mins",
          description: "Students practice describing health problems and symptoms.",
          materials: [
            "Book 7, Unit 14 slides (middle section)",
            "Health problem cards"
          ],
          instructions: [
            "Introduce phrases: 'I have a.../I feel.../It hurts when I...'",
            "Demonstrate how to describe health problems",
            "Students match symptoms with conditions in pairs",
            "Practice describing various health issues",
            "Check some responses as a class"
          ],
          teacherNotes: "Ensure students use appropriate vocabulary for symptoms."
        },
        {
          title: "Doctor Visit Role Play",
          duration: "15 mins",
          description: "Students practice doctor-patient dialogues.",
          materials: [
            "Doctor-patient role play cards",
            "Book 7, Unit 14 slides (final section)"
          ],
          instructions: [
            "Divide students into pairs - doctor and patient",
            "Patient has specific symptoms (provided on cards)",
            "Doctor asks questions and gives advice",
            "Provide dialogue prompts: 'What seems to be the problem?'",
            "Have students switch roles halfway through"
          ]
        },
        {
          title: "Wrap-up: Healthy Lifestyle",
          duration: "5 mins",
          description: "Students describe healthy habits.",
          instructions: [
            "Students think about healthy lifestyle choices",
            "They complete: 'To stay healthy, I...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the doctor visit role play and their ability to describe health problems using appropriate vocabulary.",
      homeworkIdeas: [
        "Write a dialogue between a doctor and patient for a specific health problem.",
        "Create a poster or list of 10 tips for staying healthy."
      ],
      additionalResources: [
        {
          title: "Health Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Health.htm"
        },
        {
          title: "Medical Vocabulary Quiz",
          url: "https://wordwall.net/resource/search?query=health%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit14-extension-lesson",
      title: "Mental Health and Well-being - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to mental health and well-being",
        "Discuss stress management and self-care strategies",
        "Practice expressing feelings and emotional states",
        "Develop awareness of the mind-body connection"
      ],
      materials: [
        "Visual English Book 7, Unit 14 slides",
        "Emotions flashcards",
        "Well-being activities worksheet",
        "Stress management scenario cards"
      ],
      steps: [
        {
          title: "Warm-up: Feelings Check-in",
          duration: "5 mins",
          description: "Begin by asking students to identify their current emotional state.",
          instructions: [
            "Present a range of emotion words or faces",
            "Ask students: 'How are you feeling today?'",
            "Encourage them to use more specific terms than just 'good' or 'bad'",
            "Have students discuss briefly why they feel that way"
          ],
          teacherNotes: "Keep this activity light and voluntary, with no pressure to share deeply personal feelings."
        },
        {
          title: "Vocabulary Presentation: Mental Well-being",
          duration: "10 mins",
          description: "Introduce vocabulary related to mental health and emotional well-being.",
          materials: [
            "Emotions flashcards",
            "Book 7, Unit 14 slides (supplementary section)"
          ],
          instructions: [
            "Present mental health vocabulary: stress, relaxation, mindfulness, etc.",
            "Introduce emotion vocabulary beyond basics: frustrated, content, anxious, etc.",
            "Drill pronunciation of each term",
            "Discuss different situations that might trigger various emotions",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Self-care Strategies",
          duration: "10 mins",
          description: "Students learn about and discuss various self-care strategies.",
          materials: [
            "Well-being activities worksheet",
            "Self-care images or examples"
          ],
          instructions: [
            "Present different self-care activities (exercise, meditation, hobbies, etc.)",
            "Discuss the benefits of each for mental well-being",
            "Students complete a worksheet matching activities to benefits",
            "Ask: 'What do you do to relax when you feel stressed?'",
            "Share responses as a class"
          ],
          teacherNotes: "Emphasize that different strategies work for different people."
        },
        {
          title: "Stress Management Role Play",
          duration: "15 mins",
          description: "Students practice responding to stressful scenarios in healthy ways.",
          materials: [
            "Stress management scenario cards",
            "Response suggestion prompts"
          ],
          instructions: [
            "Divide students into pairs",
            "Give each pair scenario cards with potentially stressful situations",
            "Students discuss how they would respond and manage the stress",
            "Encourage use of new vocabulary and positive coping strategies",
            "Have pairs share their best solutions with the class"
          ]
        },
        {
          title: "Wrap-up: Personal Well-being Plan",
          duration: "5 mins",
          description: "Students create simple personal well-being plans.",
          instructions: [
            "Students identify 3 activities they can do regularly for mental well-being",
            "They complete: 'To take care of my mental health, I will...'",
            "Share some ideas with the class (voluntary)",
            "Review key vocabulary and concepts from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the stress management role plays and their ability to discuss mental well-being using appropriate vocabulary.",
      homeworkIdeas: [
        "Keep a simple mood journal for three days, noting how you feel and what may have influenced your mood.",
        "Research a mindfulness or relaxation technique and write instructions for how to practice it."
      ],
      additionalResources: [
        {
          title: "Emotions Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Feelings.htm"
        },
        {
          title: "Mindfulness Activities for the Classroom",
          url: "https://www.mindfulschools.org/free-resources/"
        }
      ]
    }
  ],
  
  // Unit 15: Environment
  "15": [
    {
      id: "book7-unit15-main-lesson",
      title: "Environment and Nature - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to the environment and nature",
        "Discuss environmental issues and solutions",
        "Express opinions about environmental protection",
        "Generate ideas for eco-friendly practices"
      ],
      materials: [
        "Visual English Book 7, Unit 15 slides",
        "Environment vocabulary flashcards",
        "Environmental issues discussion cards",
        "Eco-friendly habits worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Nature Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with nature.",
          instructions: [
            "Ask students: 'Do you enjoy spending time in nature?'",
            "Follow up with: 'What environmental issues concern you?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on the environment."
        },
        {
          title: "Vocabulary Presentation: Environment",
          duration: "10 mins",
          description: "Introduce vocabulary related to the environment and nature.",
          materials: [
            "Book 7, Unit 15 slides (first section)",
            "Environment vocabulary flashcards"
          ],
          instructions: [
            "Display slides showing environment vocabulary (pollution, recycling, etc.)",
            "For each term, ask: 'What is this called?'",
            "Drill pronunciation of each term",
            "Discuss the impact of various environmental issues",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Environmental Issues Discussion",
          duration: "10 mins",
          description: "Students practice discussing environmental problems and solutions.",
          materials: [
            "Book 7, Unit 15 slides (middle section)",
            "Environmental issues discussion cards"
          ],
          instructions: [
            "Introduce phrases: 'I think.../We should.../It's important to...'",
            "Demonstrate discussing an environmental issue",
            "Students discuss different issues in pairs using prompt cards",
            "Focus on both problems and possible solutions",
            "Share some ideas as a class"
          ],
          teacherNotes: "Encourage students to use appropriate environmental vocabulary."
        },
        {
          title: "Environmental Campaign Role Play",
          duration: "15 mins",
          description: "Students create and present a mini environmental campaign.",
          materials: [
            "Environmental campaign worksheet",
            "Book 7, Unit 15 slides (final section)"
          ],
          instructions: [
            "Divide students into small groups of 3-4",
            "Each group chooses an environmental issue",
            "They prepare a short campaign with slogan and 3 actions",
            "Groups present their campaigns to the class",
            "Other students ask questions about the campaign"
          ]
        },
        {
          title: "Wrap-up: Eco Pledge",
          duration: "5 mins",
          description: "Students make a personal eco-friendly pledge.",
          instructions: [
            "Students think about one eco-friendly change they can make",
            "They complete: 'I pledge to... to help the environment'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the environmental campaign role play and their ability to discuss environmental issues using appropriate vocabulary.",
      homeworkIdeas: [
        "Write a paragraph about an environmental issue that concerns you and suggest solutions.",
        "Create a poster promoting an eco-friendly habit using vocabulary from the lesson."
      ],
      additionalResources: [
        {
          title: "Environment Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Environment.htm"
        },
        {
          title: "Environmental Issues Quiz",
          url: "https://wordwall.net/resource/search?query=environment%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit15-extension-lesson",
      title: "Climate Change - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to climate change and global warming",
        "Understand basic causes and effects of climate change",
        "Discuss personal and community actions to address climate issues",
        "Practice expressing opinions about environmental responsibility"
      ],
      materials: [
        "Visual English Book 7, Unit 15 slides",
        "Climate change vocabulary handout",
        "Before and after climate impact images",
        "Climate action cards"
      ],
      steps: [
        {
          title: "Warm-up: Weather Changes",
          duration: "5 mins",
          description: "Begin by asking students about weather patterns and changes they've noticed.",
          instructions: [
            "Ask students: 'Have you noticed any changes in the weather over the years?'",
            "Follow up with: 'What seasons do you like and why?'",
            "Have students discuss observations in pairs",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates a personal connection to climate topics."
        },
        {
          title: "Vocabulary Presentation: Climate Change",
          duration: "10 mins",
          description: "Introduce vocabulary related to climate change and its effects.",
          materials: [
            "Climate change vocabulary handout",
            "Book 7, Unit 15 slides (supplementary section)"
          ],
          instructions: [
            "Present climate change terms: global warming, greenhouse gases, carbon footprint, etc.",
            "Show before/after images of climate impacts",
            "Drill pronunciation of each term",
            "Explain each concept with simple, clear examples",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Causes and Effects Chain",
          duration: "10 mins",
          description: "Students identify causes and effects of climate change.",
          materials: [
            "Cause and effect worksheet",
            "Climate impact images"
          ],
          instructions: [
            "Present a simple model of cause and effect for climate change",
            "Provide sentence frames: 'When [action happens], it causes [result]'",
            "In pairs, students complete a cause-effect worksheet",
            "Discuss how one action can lead to multiple effects",
            "Review answers as a class"
          ],
          teacherNotes: "Keep explanations simple and appropriate for language level."
        },
        {
          title: "Climate Action Planning",
          duration: "15 mins",
          description: "Students develop and present climate action plans.",
          materials: [
            "Climate action cards",
            "Action plan template"
          ],
          instructions: [
            "Divide students into small groups",
            "Each group selects a climate issue to address (transport, energy, waste, etc.)",
            "Groups create a simple 3-step plan with actions at personal and community levels",
            "Encourage use of target vocabulary and 'should/could/must' structures",
            "Each group presents their plan to the class"
          ]
        },
        {
          title: "Wrap-up: Personal Climate Pledge",
          duration: "5 mins",
          description: "Students commit to one personal action to address climate change.",
          instructions: [
            "Students reflect on actions discussed during the lesson",
            "They complete: 'To help fight climate change, I will...'",
            "Share pledges with the class",
            "Review key vocabulary and concepts from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the climate action planning activity and their ability to discuss climate issues using appropriate vocabulary.",
      homeworkIdeas: [
        "Create a poster showing three causes and three effects of climate change with illustrations.",
        "Track your 'carbon footprint' for one day and write 3-5 sentences about how you could reduce it."
      ],
      additionalResources: [
        {
          title: "Climate Change Vocabulary",
          url: "https://learnenglish.britishcouncil.org/vocabulary/beginner-to-pre-intermediate/environment"
        },
        {
          title: "NASA Climate Kids",
          url: "https://climatekids.nasa.gov/"
        }
      ]
    }
  ],
  
  // Unit 16: Food
  "16": [
    {
      id: "book7-unit16-main-lesson",
      title: "Food and Meals - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name common food vocabulary",
        "Express food preferences using target structures",
        "Discuss eating habits and meal times",
        "Describe different types of cuisine and dishes"
      ],
      materials: [
        "Visual English Book 7, Unit 16 slides",
        "Food flashcards or images",
        "Food preferences questionnaire",
        "Recipe cards or menus"
      ],
      steps: [
        {
          title: "Warm-up: Food Preferences",
          duration: "5 mins",
          description: "Begin by asking students about their food preferences.",
          instructions: [
            "Ask students: 'What did you eat for breakfast today?'",
            "Follow up with: 'What's your favorite food?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on food."
        },
        {
          title: "Vocabulary Presentation: Food Categories",
          duration: "10 mins",
          description: "Introduce vocabulary for different food categories.",
          materials: [
            "Book 7, Unit 16 slides (first section)",
            "Food flashcards"
          ],
          instructions: [
            "Display slides showing different food categories (fruits, vegetables, meat, etc.)",
            "For each category, ask: 'What foods belong to this group?'",
            "Drill pronunciation of each food item",
            "Discuss typical meals that include these foods",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Food Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing food preferences.",
          materials: [
            "Book 7, Unit 16 slides (middle section)",
            "Food preferences questionnaire"
          ],
          instructions: [
            "Review expressions: 'I like/I don't like/I can't stand/My favorite'",
            "Demonstrate expressing food preferences",
            "Students complete questionnaire with a partner",
            "Ask: 'Do you prefer sweet or savory food?'",
            "Check some responses as a class"
          ],
          teacherNotes: "Encourage students to use a variety of preference expressions."
        },
        {
          title: "Food and Meals Role Play",
          duration: "15 mins",
          description: "Students practice discussing food and planning meals.",
          materials: [
            "Recipe cards or menus",
            "Role play scenario cards (planning a dinner party, etc.)"
          ],
          instructions: [
            "Divide students into pairs or small groups",
            "Provide scenario: 'Plan a dinner party menu'",
            "Students discuss food options and preferences",
            "Encourage use of target vocabulary and expressions",
            "Have 2-3 groups present their menus to the class"
          ]
        },
        {
          title: "Wrap-up: International Foods",
          duration: "5 mins",
          description: "Students discuss international foods they have tried or want to try.",
          instructions: [
            "Ask about foods from different countries",
            "Students complete: 'I would like to try... from...'",
            "Share several ideas with the class",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the food role play activity and their ability to express food preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about a traditional dish from your country, describing the ingredients and how it's prepared.",
        "Create a menu for a day's meals (breakfast, lunch, dinner) using vocabulary from the lesson."
      ],
      additionalResources: [
        {
          title: "Food Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Food.htm"
        },
        {
          title: "Food and Meals Quiz",
          url: "https://wordwall.net/resource/search?query=food%20vocabulary"
        }
      ]
    },
    {
      id: "book7-unit16-extension-lesson",
      title: "Cooking and Food Preparation - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to cooking and food preparation",
        "Understand and use cooking verbs and measurements",
        "Follow and give recipe instructions",
        "Develop speaking skills through collaborative recipe creation"
      ],
      materials: [
        "Visual English Book 7, Unit 16 slides",
        "Cooking verbs flashcards",
        "Simple recipe cards",
        "Food preparation images",
        "Kitchen utensils vocabulary handout"
      ],
      steps: [
        {
          title: "Warm-up: Cooking Experience",
          duration: "5 mins",
          description: "Begin by asking students about their cooking experiences.",
          instructions: [
            "Ask students: 'Do you like to cook? Why or why not?'",
            "Follow up with: 'What's something you know how to prepare?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Collect some examples from the class"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on cooking."
        },
        {
          title: "Vocabulary Presentation: Cooking Verbs",
          duration: "10 mins",
          description: "Introduce vocabulary related to cooking actions and utensils.",
          materials: [
            "Cooking verbs flashcards",
            "Kitchen utensils vocabulary handout"
          ],
          instructions: [
            "Present cooking verbs: chop, slice, boil, fry, bake, mix, etc.",
            "Demonstrate each action with gestures if possible",
            "Introduce kitchen utensils: knife, pan, pot, spoon, etc.",
            "Drill pronunciation of each term",
            "Have students match verbs with appropriate utensils"
          ]
        },
        {
          title: "Recipe Instruction Practice",
          duration: "10 mins",
          description: "Students practice following and giving recipe instructions.",
          materials: [
            "Simple recipe cards",
            "Food preparation images"
          ],
          instructions: [
            "Review imperative form used in recipes: 'Chop the onions', 'Beat the eggs'",
            "Introduce sequencing words: first, next, then, finally",
            "Model a simple recipe with clear step-by-step instructions",
            "Students arrange recipe steps in correct order in pairs",
            "Check answers as a class"
          ],
          teacherNotes: "Focus on clear sequence and appropriate cooking verbs."
        },
        {
          title: "Collaborative Recipe Creation",
          duration: "15 mins",
          description: "Students work together to create and present simple recipes.",
          materials: [
            "Recipe template worksheets",
            "Ingredient word cards"
          ],
          instructions: [
            "Divide students into small groups of 3-4",
            "Provide each group with ingredient word cards",
            "Groups create a simple recipe using the given ingredients",
            "They must use at least 5 cooking verbs and sequencing words",
            "Each group presents their recipe to the class"
          ]
        },
        {
          title: "Wrap-up: Recipe Exchange",
          duration: "5 mins",
          description: "Students share personal recipes or cooking tips.",
          instructions: [
            "Students think about a simple family recipe or cooking tip",
            "They complete: 'A dish I can teach you to make is...'",
            "Share several ideas with the class",
            "Review key vocabulary and cooking verbs from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their collaborative recipe creation and their ability to use cooking vocabulary and imperative forms appropriately.",
      homeworkIdeas: [
        "Write the instructions for preparing your favorite dish using at least 8 cooking verbs from the lesson.",
        "Create an illustrated guide showing the steps to prepare a simple snack or sandwich."
      ],
      additionalResources: [
        {
          title: "Cooking Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Cooking.htm"
        },
        {
          title: "Recipe English",
          url: "https://learnenglish.britishcouncil.org/vocabulary/beginner-to-pre-intermediate/food-preparation"
        }
      ]
    }
  ]
};
        {
          title: "Guided Practice: Food Matching Activity",
          duration: "15 mins",
          description: "Students match food names to images and categorize them by meal time.",
          materials: [
            "Handout with food images and meal categories",
            "Book 7, Unit 16 slides (04 A - 05 C)"
          ],
          instructions: [
            "Distribute handouts with food images",
            "Students work in pairs to match foods to appropriate meal times (breakfast, lunch, dinner)",
            "Review the answers as a class using the Book 7 slides",
            "For each answer, ask students if these foods are common in their country for these meals"
          ]
        },
        {
          title: "Wrap-up: Food Preferences Discussion",
          duration: "5 mins",
          description: "Students share their opinions about British foods they would like to try.",
          instructions: [
            "Have students complete the sentence: 'I would like to try ___ because...'",
            "Allow 3-4 students to share their preferences with the class",
            "Summarize the key food vocabulary learned in the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the matching activity and their ability to identify foods correctly during the video activity.",
      homeworkIdeas: [
        "Write 3-5 sentences about your favorite meal of the day, including what foods you typically eat.",
        "Research one traditional British dish and write down its main ingredients."
      ],
      additionalResources: [
        {
          title: "Wordwall British Food Quiz",
          url: "https://wordwall.net/resource/29266561/british-food-quiz"
        },
        {
          title: "British Food Vocabulary Video",
          url: "https://www.youtube.com/watch?v=QBt2RdBBNHo"
        }
      ]
    },
    {
      id: "book7-unit16-cooking-vocabulary",
      title: "Cooking Vocabulary - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to cooking methods and kitchen equipment",
        "Understand and follow simple recipe instructions",
        "Use imperative forms for cooking instructions",
        "Discuss food preparation in different cultures"
      ],
      materials: [
        "Visual English Book 7, Unit 16 slides (06 A - 10 C)",
        "Wordwall interactive game - Food Matching Game",
        "YouTube video: 'Cooking Vocabulary in English'",
        "Simple recipe cards with cooking instructions",
        "Kitchen utensils flashcards or images"
      ],
      steps: [
        {
          title: "Warm-up: Cooking Experience",
          duration: "5 mins",
          description: "Start by asking students about their cooking experience and favorite dishes to make.",
          instructions: [
            "Ask students: 'Do you cook at home? What do you like to cook?'",
            "Follow up with: 'What's your specialty dish?'",
            "Use the opportunity to pre-teach some basic cooking vocabulary."
          ],
          teacherNotes: "This activity helps assess prior knowledge and creates context for the lesson."
        },
        {
          title: "Presentation: Cooking Methods and Utensils",
          duration: "12 mins",
          description: "Introduce cooking vocabulary using Visual English slides and images.",
          materials: [
            "Book 7, Unit 16 slides (06 A - 08 B)",
            "Kitchen utensils flashcards"
          ],
          instructions: [
            "Display slides showing different cooking methods (boil, fry, bake, etc.)",
            "For each method, ask: 'What cooking method is this?'",
            "Introduce kitchen equipment vocabulary (pot, pan, spatula, etc.)",
            "Demonstrate the action for each cooking verb"
          ],
          teacherNotes: "Use gestures to reinforce the meaning of cooking verbs."
        },
        {
          title: "Vocabulary Development: Cooking Video",
          duration: "10 mins",
          description: "Watch the 'Cooking Vocabulary in English' video to reinforce cooking terminology.",
          materials: [
            "YouTube video from Teacher Resources",
            "Worksheet with cooking verbs and utensils"
          ],
          instructions: [
            "Play the video once all the way through",
            "Play again, pausing after each section to practice the vocabulary",
            "Have students complete their worksheets as they watch"
          ],
          teacherNotes: "This video shows practical applications of cooking vocabulary."
        },
        {
          title: "Guided Practice: Recipe Instructions",
          duration: "13 mins",
          description: "Students practice giving and following cooking instructions.",
          materials: [
            "Simple recipe cards with ingredients and steps",
            "Book 7, Unit 16 slides (09 A - 10 C)"
          ],
          instructions: [
            "Divide students into pairs and give each pair a simple recipe card",
            "One student reads the instructions while the other mimes the actions",
            "Students then switch roles",
            "As a class, discuss which recipes sound delicious or difficult"
          ]
        },
        {
          title: "Wrap-up: Favorite Recipe",
          duration: "5 mins",
          description: "Students share a simple recipe from their own culture.",
          instructions: [
            "Have students tell a partner about a simple dish from their country",
            "Ask them to include at least three cooking verbs in their description",
            "Invite 2-3 students to share their recipes with the class",
            "Summarize the key cooking vocabulary learned"
          ]
        }
      ],
      assessmentTips: "Evaluate students on their ability to use cooking verbs correctly and follow recipe instructions.",
      homeworkIdeas: [
        "Write a simple recipe for your favorite dish using at least 5 cooking verbs.",
        "Create a list of 10 kitchen utensils with their uses."
      ],
      additionalResources: [
        {
          title: "Food Matching Game",
          url: "https://wordwall.net/resource/23705207/food-matching-game"
        },
        {
          title: "Cooking Vocabulary Video",
          url: "https://www.youtube.com/watch?v=pySYSJQMs84"
        }
      ]
    }
  ]  
};

export default book7LessonPlans;