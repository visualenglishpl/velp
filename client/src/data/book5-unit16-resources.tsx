// This file contains resources for Book 5, Unit 16 (Sounds of Music themed content)

import { LessonPlan, LessonStep } from '@/components/LessonPlanTemplate';

export const book5Unit16Resources = [
  {
    title: "Music Instruments Game 1",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/4b132d88150c431c85a8e53efe361964",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4b132d88150c431c85a8e53efe361964?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Music Instruments Game 2",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/7efc652e774f49a7a9be33e8bc873291",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7efc652e774f49a7a9be33e8bc873291?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Music Instruments Kahoot",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/music-instruments/60a322c4-b3a8-4c2d-9078-e877ca66ac23"
  },
  {
    title: "Music Instruments Quiz Video 1",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/WV63aVMnyMA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WV63aVMnyMA?si=uZ_AAF9EYNUbyrSX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    title: "Music Instruments Quiz Video 2",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/QNJcU7oOSL4",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/QNJcU7oOSL4?si=zciTLUH5LflEOaAH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Musical Instruments
export const musicalInstrumentsLessonPlan = {
  id: "musical-instruments-lesson",
  title: "Musical Instruments and Orchestra",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to musical instruments",
    "Categorize instruments by type and family",
    "Develop language for describing sounds and music",
    "Build listening skills through musical instrument recognition"
  ],
  materials: [
    "Visual English Book 5, Unit 16 slides",
    "Music Instruments Games",
    "Music Instruments Quiz Videos",
    "Instrument picture cards",
    "Instrument family chart",
    "Audio clips of instrument sounds (optional)"
  ],
  steps: [
    {
      title: "Warm-up: Music Experience",
      duration: "5 minutes",
      description: "Activate prior knowledge about musical instruments",
      instructions: [
        "Ask students: 'Do you play a musical instrument? Which one(s)?'",
        "Create a list of instruments mentioned by students",
        "Ask if students can name other instruments they know",
        "Discuss what makes some instruments different from others",
        "Introduce the topic of musical instrument vocabulary"
      ]
    },
    {
      title: "Musical Instrument Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to different instrument types",
      materials: ["Visual English Book 5, Unit 16 slides", "Instrument picture cards", "Instrument family chart"],
      instructions: [
        "Present instruments by family/category:",
        "- String instruments: violin, guitar, cello, harp, etc.",
        "- Wind instruments: flute, clarinet, saxophone, trumpet, etc.",
        "- Percussion instruments: drums, cymbals, tambourine, etc.",
        "- Keyboard instruments: piano, organ, accordion, etc.",
        "Teach related vocabulary: orchestra, band, musician, conductor, etc.",
        "Discuss parts of instruments: strings, keys, bow, mouthpiece, etc.",
        "Show how instruments are placed in an orchestra using the instrument family chart"
      ]
    },
    {
      title: "Videos: Musical Instrument Quiz",
      duration: "10 minutes",
      description: "Watch videos about musical instruments and test recognition",
      materials: ["Music Instruments Quiz Videos", "Audio clips of instrument sounds (optional)"],
      instructions: [
        "Play the Music Instruments Quiz Videos",
        "Pause before answers are revealed to let students guess",
        "If available, play audio clips of different instruments for students to identify",
        "Discuss the unique sounds made by different instruments",
        "Introduce vocabulary for describing sounds: high/low pitch, loud/soft, sharp/smooth, etc."
      ]
    },
    {
      title: "Interactive Games: Instrument Vocabulary",
      duration: "10 minutes",
      description: "Practice instrument vocabulary through digital games",
      materials: ["Music Instruments Games"],
      instructions: [
        "Have students play the Music Instruments Games",
        "For each instrument, ask students to categorize it by family",
        "Review any challenging instrument names or categories",
        "Discuss how some instruments appear in multiple musical genres"
      ]
    },
    {
      title: "Musical Description Activity",
      duration: "10 minutes",
      description: "Practice describing instruments and their sounds",
      materials: ["Instrument picture cards"],
      instructions: [
        "Divide students into small groups",
        "Distribute instrument picture cards",
        "Groups prepare descriptions of their instruments including:",
        "- What family it belongs to",
        "- How it's played (bow, keys, blowing, striking, etc.)",
        "- What it sounds like (using descriptive vocabulary)",
        "- Famous musicians who play it",
        "- Music genres it's commonly used in",
        "Each group presents their instrument descriptions",
        "Other students try to guess the instrument before it's revealed",
        "Class discusses their favorite instruments and why they like them"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of instrument vocabulary, ability to categorize instruments by family, and participation in the musical description activity.",
  homeworkIdeas: [
    "Create an illustrated guide to one instrument family with labeled parts", 
    "Research a traditional instrument from another culture and prepare a short presentation",
    "Write a paragraph comparing two different instruments"
  ],
  additionalResources: [
    {
      title: "ESL Musical Instruments Vocabulary",
      url: "https://www.eslflow.com/music-instruments-vocabulary-games-and-worksheets.html"
    },
    {
      title: "Instrument Families Guide",
      url: "https://www.classicsforkids.com/music/instruments_orchestra.php"
    }
  ]
};

// Second lesson plan for Unit 16: Music Genres and Preferences
export const musicGenresLessonPlan = {
  id: "music-genres-lesson",
  title: "Music Genres and Preferences",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary related to music genres and styles",
    "Practice expressing preferences and opinions about music",
    "Develop language for discussing different types of music",
    "Build conversation skills through music-themed discussions"
  ],
  materials: [
    "Visual English Book 5, Unit 16 slides",
    "Music Instruments Quiz Video 2",
    "Music genre picture cards",
    "Music preference survey sheets",
    "Short audio samples of different music genres (optional)"
  ],
  steps: [
    {
      title: "Warm-up: Music Preferences",
      duration: "5 minutes",
      description: "Activate knowledge about music styles and preferences",
      instructions: [
        "Ask students: 'What kind of music do you like? Who is your favorite musician?'",
        "Create a list of music genres mentioned by students",
        "Take a quick poll to see which genres are most popular in the class",
        "Introduce the topic of music genres and vocabulary for discussing preferences"
      ]
    },
    {
      title: "Music Genre Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary related to different music styles",
      materials: ["Visual English Book 5, Unit 16 slides", "Music genre picture cards", "Short audio samples (optional)"],
      instructions: [
        "Present major music genres: classical, rock, pop, jazz, hip-hop, folk, country, etc.",
        "If available, play short audio samples of different genres",
        "Teach genre-specific vocabulary: melody, rhythm, beat, lyrics, etc.",
        "Introduce famous musicians associated with each genre",
        "Discuss how genres can be combined or evolve into new styles",
        "Present vocabulary for describing music: catchy, relaxing, energetic, melancholic, etc."
      ]
    },
    {
      title: "Music Preferences Language",
      duration: "10 minutes",
      description: "Learn expressions for discussing music preferences",
      materials: ["Visual English Book 5, Unit 16 slides"],
      instructions: [
        "Teach phrases for expressing preferences:",
        "- 'I'm a big fan of...', 'I'm really into...', 'I can't stand...'",
        "- 'I prefer... to...', 'I enjoy listening to...', 'I'm not keen on...'",
        "Model conversations about music preferences",
        "Present vocabulary for discussing music experiences: concert, playlist, album, etc.",
        "Have students practice using the expressions in pairs",
        "Discuss how music preferences might change depending on mood or situation"
      ]
    },
    {
      title: "Interactive Quiz: Music Knowledge",
      duration: "10 minutes",
      description: "Reinforce music vocabulary through a quiz",
      materials: ["Music Instruments Quiz Video 2"],
      instructions: [
        "Play the Music Instruments Quiz Video 2",
        "Extend the quiz by asking additional questions about music genres",
        "Example: 'Which genre would this instrument typically be used in?'",
        "Award points for correct answers and music knowledge",
        "Discuss connections between instruments and specific genres"
      ]
    },
    {
      title: "Music Survey Activity",
      duration: "10 minutes",
      description: "Practice discussing music preferences and habits",
      materials: ["Music preference survey sheets"],
      instructions: [
        "Distribute music preference survey sheets with questions like:",
        "- 'What kind of music do you listen to most often?'",
        "- 'When and where do you usually listen to music?'",
        "- 'Do you prefer listening to music alone or with friends?'",
        "- 'What musical instrument would you like to learn to play?'",
        "- 'Has your music taste changed over time? How?'",
        "Students interview 3-4 classmates using the survey",
        "After completing surveys, students prepare a short summary of their findings",
        "Volunteers present the results of their surveys to the class",
        "Class discusses trends in music preferences and listening habits"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their proper use of music genre vocabulary, ability to express preferences using appropriate language, and participation in the survey activity.",
  homeworkIdeas: [
    "Create a music playlist for different moods or activities, explaining your choices", 
    "Write a paragraph comparing your music preferences with those of your parents or grandparents",
    "Research a music genre from another country and prepare a brief presentation"
  ],
  additionalResources: [
    {
      title: "ESL Music Vocabulary and Activities",
      url: "https://www.eslflow.com/Music-and-songs-teaching-resources.html"
    },
    {
      title: "Music Genre Guide",
      url: "https://www.musicgenreslist.com/"
    }
  ]
};
