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
  
  // Unit 3: Music
  "3": [
    {
      id: "book7-unit3-main-lesson",
      title: "Music Genres - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different music genres",
        "Express music preferences using target structures",
        "Ask and answer questions about music listening habits",
        "Discuss favorite musicians and songs"
      ],
      materials: [
        "Visual English Book 7, Unit 3 slides",
        "Music genre flashcards",
        "Short music samples (optional)",
        "Music vocabulary worksheet"
      ],
      steps: [
        {
          title: "Warm-up: Music Preferences",
          duration: "5 mins",
          description: "Begin by asking students about their music listening habits.",
          instructions: [
            "Ask students: 'What kind of music do you listen to?'",
            "Follow up with: 'Who is your favorite singer or band?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on music genres."
        },
        {
          title: "Vocabulary Presentation: Music Genres",
          duration: "10 mins",
          description: "Introduce vocabulary for different music genres.",
          materials: [
            "Book 7, Unit 3 slides (first section)",
            "Music genre flashcards",
            "Short audio samples if available"
          ],
          instructions: [
            "Display slides showing different music genres (pop, rock, classical, etc.)",
            "For each genre, ask: 'What type of music is this?'",
            "Drill pronunciation of each genre name",
            "Play short audio samples if available",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Music Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing music preferences.",
          materials: [
            "Book 7, Unit 3 slides (middle section)",
            "Music preference worksheet"
          ],
          instructions: [
            "Review expressions: 'I'm into/I can't stand/I love listening to'",
            "Demonstrate how to express music preferences",
            "Students complete guided practice exercises in pairs",
            "Ask: 'What kind of music are you into?'",
            "Check answers as a class"
          ],
          teacherNotes: "Encourage students to use a variety of preference expressions."
        },
        {
          title: "Music Festival Role Play",
          duration: "15 mins",
          description: "Students practice planning attendance at a music festival.",
          materials: [
            "Music festival schedule handouts",
            "Role play cards"
          ],
          instructions: [
            "Distribute music festival schedules with different genres",
            "In pairs, students must decide which performances to attend",
            "They must negotiate based on preferences",
            "Provide dialog prompts: 'Shall we go to the rock concert?'",
            "Have 2-3 pairs demonstrate their conversations"
          ]
        },
        {
          title: "Wrap-up: Music Survey",
          duration: "5 mins",
          description: "Conduct a quick class survey on music preferences.",
          instructions: [
            "List 5-6 music genres on the board",
            "Students raise hands for their favorite genre",
            "Tally the results and discuss",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the music festival role play and their ability to express music preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about your favorite musician or band, describing their music genre and why you like them.",
        "Create a playlist of 5 songs from different genres and explain your choices briefly."
      ],
      additionalResources: [
        {
          title: "Music Genres Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Music.htm"
        },
        {
          title: "Music Genre Quiz",
          url: "https://wordwall.net/resource/search?query=music%20genres"
        }
      ]
    },
    {
      id: "book7-unit3-extension-lesson",
      title: "Musical Instruments - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary for musical instruments and instrument families",
        "Describe sounds made by different instruments",
        "Discuss experiences with playing musical instruments",
        "Develop listening skills through instrument identification"
      ],
      materials: [
        "Visual English Book 7, Unit 3 slides",
        "Musical instrument flashcards or images",
        "Short audio clips of different instruments (optional)",
        "Musical instrument family chart"
      ],
      steps: [
        {
          title: "Warm-up: Instrument Experience",
          duration: "5 mins",
          description: "Begin by asking students about their experiences with musical instruments.",
          instructions: [
            "Ask students: 'Can you play any musical instruments?'",
            "Follow up with: 'What instruments would you like to learn to play?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on musical instruments."
        },
        {
          title: "Vocabulary Presentation: Instrument Families",
          duration: "10 mins",
          description: "Introduce vocabulary for different instrument families and specific instruments.",
          materials: [
            "Musical instrument family chart",
            "Instrument flashcards"
          ],
          instructions: [
            "Introduce the main instrument families: strings, woodwinds, brass, percussion",
            "Show images of different instruments in each family",
            "For each instrument, ask: 'What is this instrument called?'",
            "Drill pronunciation of each instrument name",
            "Explain briefly how each type of instrument produces sound"
          ],
          teacherNotes: "Use gestures to mimic playing different instruments to help with vocabulary retention."
        },
        {
          title: "Instrument Sound Description",
          duration: "10 mins",
          description: "Students practice describing the sounds made by different instruments.",
          materials: [
            "Audio clips of different instruments",
            "List of descriptive adjectives for sounds"
          ],
          instructions: [
            "Introduce adjectives for describing sounds: 'loud, soft, high-pitched, deep, etc.'",
            "Play short clips of different instruments (or demonstrate with recordings)",
            "Students match adjectives to the sounds they hear",
            "Practice sentences: 'The violin sounds high and bright. The drum sounds loud and deep.'",
            "Students describe the sounds in pairs using the target adjectives"
          ]
        },
        {
          title: "Musical Questionnaire Activity",
          duration: "15 mins",
          description: "Students interview each other about musical instruments and experiences.",
          materials: [
            "Musical questionnaire handout",
            "Interview prompt cards"
          ],
          instructions: [
            "Distribute questionnaire handouts with questions about musical instruments",
            "Review question forms: 'Have you ever played...? Do you like the sound of...?'",
            "Students work in pairs to interview each other",
            "Students make notes of their partner's answers",
            "Students report back to the class about their partner's musical experiences"
          ]
        },
        {
          title: "Wrap-up: Instrument Quiz",
          duration: "5 mins",
          description: "Test students' knowledge of musical instruments with a quick quiz.",
          instructions: [
            "Play 5-6 short audio clips of different instruments",
            "Students write down which instrument they think they hear",
            "Check answers as a class",
            "Review key vocabulary from the lesson"
          ],
          teacherNotes: "If audio clips aren't available, describe the instruments and have students identify them."
        }
      ],
      assessmentTips: "Assess students through their participation in the questionnaire activity and their ability to correctly identify and describe musical instruments.",
      homeworkIdeas: [
        "Research a musical instrument from another culture and write 5-7 sentences about it.",
        "Create a diagram of an orchestra, labeling the different instrument sections."
      ],
      additionalResources: [
        {
          title: "Musical Instruments Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Musical_Instruments.htm"
        },
        {
          title: "Instrument Sounds Quiz",
          url: "https://wordwall.net/resource/search?query=musical%20instruments"
        }
      ]
    }
  ],
  
  // Unit 4: Books
  "4": [
    {
      id: "book7-unit4-main-lesson",
      title: "Book Genres - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name different book genres",
        "Express reading preferences using target structures",
        "Ask and answer questions about reading habits",
        "Recommend books to others based on preferences"
      ],
      materials: [
        "Visual English Book 7, Unit 4 slides",
        "Book cover images or actual books from different genres",
        "Reading habits questionnaire",
        "Book recommendation cards"
      ],
      steps: [
        {
          title: "Warm-up: Reading Habits",
          duration: "5 mins",
          description: "Begin by asking students about their reading habits.",
          instructions: [
            "Ask students: 'Do you enjoy reading books?'",
            "Follow up with: 'What was the last book you read?'",
            "Have students discuss in pairs for 1-2 minutes",
            "Get feedback from several students"
          ],
          teacherNotes: "This activates schema and creates context for the main lesson on book genres."
        },
        {
          title: "Vocabulary Presentation: Book Genres",
          duration: "10 mins",
          description: "Introduce vocabulary for different book genres.",
          materials: [
            "Book 7, Unit 4 slides (first section)",
            "Book cover images representing different genres"
          ],
          instructions: [
            "Display slides showing different book genres (mystery, romance, science fiction, etc.)",
            "For each genre, ask: 'What type of book is this?'",
            "Drill pronunciation of each genre name",
            "Discuss key characteristics of each genre",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Reading Preferences Practice",
          duration: "10 mins",
          description: "Students practice expressing reading preferences.",
          materials: [
            "Book 7, Unit 4 slides (middle section)",
            "Reading preferences questionnaire"
          ],
          instructions: [
            "Review expressions: 'I prefer/I'm interested in/I find...boring/exciting'",
            "Demonstrate how to express reading preferences",
            "Students complete questionnaire in pairs, asking each other",
            "Ask: 'What kind of books do you prefer reading?'",
            "Collect some responses as a class"
          ],
          teacherNotes: "Encourage students to give reasons for their preferences."
        },
        {
          title: "Book Recommendation Activity",
          duration: "15 mins",
          description: "Students practice recommending books based on preferences.",
          materials: [
            "Book recommendation cards",
            "Book 7, Unit 4 slides (final section)"
          ],
          instructions: [
            "Distribute book recommendation cards with brief descriptions",
            "Students circulate and recommend books to each other",
            "They must match books to classmates' preferences",
            "Provide dialog prompts: 'I think you might enjoy this book because...'",
            "Have 2-3 students share their recommended books"
          ]
        },
        {
          title: "Wrap-up: Best Book",
          duration: "5 mins",
          description: "Students vote for the most interesting book recommendation.",
          instructions: [
            "Display all book recommendations briefly",
            "Students vote for the book they would most like to read",
            "Discuss the most popular choices",
            "Review key vocabulary and expressions from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their participation in the book recommendation activity and their ability to express reading preferences using the target structures.",
      homeworkIdeas: [
        "Write a paragraph about your favorite book, describing its genre and why you like it.",
        "Create a mini book review for a book you have read recently."
      ],
      additionalResources: [
        {
          title: "Book Genres Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Books.htm"
        },
        {
          title: "Book Genre Quiz",
          url: "https://wordwall.net/resource/search?query=book%20genres"
        }
      ]
    },
    {
      id: "book7-unit4-extension-lesson",
      title: "Book Parts and Publishing - 45-minute Extension Lesson",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Learn vocabulary related to book parts and publishing",
        "Understand the process of how books are made",
        "Create a book cover and blurb for an imaginary book",
        "Practice presenting and describing books to an audience"
      ],
      materials: [
        "Visual English Book 7, Unit 4 slides",
        "Real books to show different parts",
        "Book creation template handouts",
        "Book publishing process diagrams"
      ],
      steps: [
        {
          title: "Warm-up: Book Parts",
          duration: "5 mins",
          description: "Begin by showing students a book and asking them to identify its parts.",
          instructions: [
            "Hold up a book and point to different parts",
            "Ask: 'What is this part of the book called?'",
            "Elicit or teach: cover, spine, title, author, blurb, chapters, etc.",
            "Have students briefly examine books in pairs and identify 5 parts"
          ],
          teacherNotes: "This activates schema and creates context for the lesson on book parts and publishing."
        },
        {
          title: "Vocabulary Presentation: Book Publishing",
          duration: "10 mins",
          description: "Introduce vocabulary related to book publishing and creation.",
          materials: [
            "Book 7, Unit 4 slides (supplementary section)",
            "Book publishing process diagram"
          ],
          instructions: [
            "Display slides showing book publishing vocabulary",
            "Introduce terms: author, editor, publisher, manuscript, draft, etc.",
            "Show a simple diagram of how a book is published",
            "Drill pronunciation of each term",
            "Have students repeat and practice the vocabulary"
          ]
        },
        {
          title: "Book Cover Analysis",
          duration: "10 mins",
          description: "Students analyze book covers and discuss their features.",
          materials: [
            "Various book covers (digital or physical)",
            "Book cover analysis worksheet"
          ],
          instructions: [
            "Show 4-5 different book covers",
            "Discuss elements: title, author name, images, colors, genre signals",
            "Students complete analysis worksheet in pairs",
            "Ask: 'How does this cover reflect the book's genre?'",
            "Share observations as a class"
          ],
          teacherNotes: "Help students understand how design elements communicate genre and content."
        },
        {
          title: "Create Your Own Book",
          duration: "15 mins",
          description: "Students design a book cover and write a blurb for an imaginary book.",
          materials: [
            "Book creation template handouts",
            "Colored pencils/markers",
            "Sample blurbs for reference"
          ],
          instructions: [
            "Distribute book creation templates",
            "Students choose a genre for their imaginary book",
            "They design a cover that reflects the genre",
            "They write a 2-3 sentence blurb for the back cover",
            "Monitor and assist with vocabulary and expressions"
          ]
        },
        {
          title: "Wrap-up: Book Presentations",
          duration: "5 mins",
          description: "Students present their book covers and blurbs to the class.",
          instructions: [
            "Have 2-3 students present their book designs",
            "Ask the class to guess the genre based on the cover design",
            "Discuss effective elements of the presented books",
            "Review key vocabulary from the lesson"
          ]
        }
      ],
      assessmentTips: "Assess students through their book cover designs and blurbs, checking for appropriate use of genre-specific vocabulary and features.",
      homeworkIdeas: [
        "Research a famous author and write 5-7 sentences about their life and books.",
        "Find an interesting book cover and analyze its design elements in writing."
      ],
      additionalResources: [
        {
          title: "Book Publishing Vocabulary",
          url: "https://www.vocabulary.cl/Lists/Publishing.htm"
        },
        {
          title: "Book Cover Design Principles",
          url: "https://www.canva.com/learn/book-cover-design/"
        }
      ]
    }
  ],
  
  // Unit 5: Art
  "5": [
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
      id: "book7-unit16-british-food",
      title: "British Food and Meals - 45-minute Lesson Plan",
      duration: "45 minutes",
      level: "Elementary to Pre-Intermediate (A1-A2)",
      objectives: [
        "Identify and name common British foods and meals",
        "Discuss food preferences using simple structures",
        "Learn vocabulary related to British cuisine",
        "Understand cultural differences in meal times and food customs"
      ],
      materials: [
        "Visual English Book 7, Unit 16 slides (01 A - 05 C)",
        "Wordwall interactive game - British Food Quiz",
        "YouTube video: 'British Food and Meals Vocabulary'",
        "Food flashcards",
        "Recipe handouts for traditional British dishes"
      ],
      steps: [
        {
          title: "Warm-up: Food Preferences",
          duration: "5 mins",
          description: "Begin by asking students about their food preferences and eating habits.",
          instructions: [
            "Ask students: 'What did you eat for breakfast today?'",
            "Follow up with: 'Do you prefer sweet or savory breakfast foods?'",
            "Use the opportunity to pre-teach some basic vocabulary that might come up in their responses."
          ],
          teacherNotes: "This activity helps assess prior knowledge and creates context for the lesson."
        },
        {
          title: "Presentation: British Food Introduction",
          duration: "10 mins",
          description: "Introduce traditional British foods using Visual English slides.",
          materials: [
            "Book 7, Unit 16 slides (01 A - 03 C)",
            "Food flashcards"
          ],
          instructions: [
            "Display Book 7, Unit 16 slides showing different British foods",
            "For each food, ask: 'What is this food called?'",
            "Drill pronunciation of each food name",
            "Briefly explain the ingredients and when this food is typically eaten"
          ]
        },
        {
          title: "Vocabulary Development: British Food Video",
          duration: "10 mins",
          description: "Watch the 'British Food and Meals Vocabulary' video to reinforce food vocabulary.",
          materials: [
            "YouTube video from Teacher Resources",
            "Simple worksheet with food items listed"
          ],
          instructions: [
            "Play the video once all the way through",
            "Play again, pausing after each section to discuss the foods shown",
            "Have students mark on their worksheets which foods they recognize or would like to try"
          ],
          teacherNotes: "This video provides authentic examples and pronunciation of food vocabulary."
        },
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