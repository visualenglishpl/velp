// This file contains resources for Book 7, Unit 9 (Jobs and Careers themed content)

export const unit9Resources = [
  {
    title: "Wordwall - Types of Jobs (Multiple Choice)",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Wordwall - Types of Jobs (Match Up)",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    title: "Kahoot - Visual 7 Unit 9 Jobs",
    resourceType: "game" as const,
    provider: "Kahoot",
    sourceUrl: "https://create.kahoot.it/share/visual-7-unit-9-jobs/07fa5381-b0a3-4da8-996f-e34a9232145b",
    embedCode: ""
  },
  {
    title: "Song - What Do You Want To Be?",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/embed/nfzYoNTcAn8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=ePvFy6TfZVtNh1gZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }
];

// Lesson plan data for Jobs and Occupations Vocabulary
export const jobsVocabularyLessonPlan = {
  id: "jobs-vocabulary-lesson",
  title: "Jobs and Occupations Vocabulary",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Identify and name common jobs and occupations in English",
    "Learn vocabulary related to workplace settings and responsibilities",
    "Practice asking and answering questions about jobs",
    "Use present simple tense to describe job responsibilities"
  ],
  materials: [
    "Visual English Book 7, Unit 9 slides",
    "Job flashcards or images",
    "'What Do You Want To Be?' song video",
    "Wordwall games on job types",
    "Job descriptions handout"
  ],
  steps: [
    {
      title: "Warm-up: Job Guessing Game",
      duration: "5 minutes",
      description: "Activate prior knowledge with a quick job guessing game",
      instructions: [
        "Mime or describe different jobs without saying the job title",
        "Students guess the occupation being demonstrated",
        "Ask follow-up questions like 'Would you like this job?'"
      ]
    },
    {
      title: "Vocabulary Introduction",
      duration: "10 minutes",
      description: "Present key job vocabulary with visuals and descriptions",
      materials: ["Job flashcards", "Book 7, Unit 9 slides"],
      instructions: [
        "Introduce job titles with images",
        "For each job, discuss typical responsibilities using present simple tense",
        "Practice proper pronunciation of occupational terms",
        "Focus on job-specific verbs (teach, build, design, sell, etc.)"
      ],
      teacherNotes: "Ensure you cover a variety of sectors including service, professional, trade, and creative jobs"
    },
    {
      title: "Song Activity: 'What Do You Want To Be?'",
      duration: "10 minutes",
      description: "Use the song to reinforce job vocabulary and career aspirations",
      materials: ["'What Do You Want To Be?' song video", "Lyrics handout with gaps"],
      instructions: [
        "Distribute lyrics with missing job words",
        "Play the song once for students to enjoy",
        "Play again, asking students to fill in missing job words",
        "Sing along together if appropriate for your class"
      ]
    },
    {
      title: "Interactive Game: Jobs and Responsibilities",
      duration: "15 minutes",
      description: "Students match jobs with responsibilities using Wordwall game",
      materials: ["Wordwall - Types of Jobs games"],
      instructions: [
        "Demonstrate how to play the game",
        "Students play in pairs or small groups",
        "After matching, students create sentences about each job: 'A teacher teaches students.'",
        "Discuss any challenging matches as a class"
      ]
    },
    {
      title: "Wrap-up: Career Aspirations",
      duration: "5 minutes",
      description: "Students share their career interests and reasons",
      instructions: [
        "Students complete the sentence: 'In the future, I would like to be a ___ because...'" ,
        "Share responses with the class",
        "Summarize key vocabulary learned in the lesson"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to correctly use job vocabulary, describe job responsibilities, and ask/answer questions about occupations.",
  homeworkIdeas: [
    "Interview a family member about their job and write 5-7 sentences about it", 
    "Research an unusual or future-oriented job and prepare a short description"
  ],
  additionalResources: [
    {
      title: "Jobs and Occupations Vocabulary Lists",
      url: "https://www.englishclub.com/vocabulary/jobs.htm"
    }
  ]
};

// Lesson plan data for Workplace Communication
export const workplaceCommunicationLessonPlan = {
  id: "workplace-communication-lesson",
  title: "Workplace Communication Skills",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for workplace communication",
    "Practice common workplace conversations and expressions",
    "Develop email and phone communication skills",
    "Understand workplace etiquette in English-speaking contexts"
  ],
  materials: [
    "Visual English Book 7, Unit 9 slides",
    "Workplace dialogue cards",
    "Email templates handout",
    "Role-play scenario cards",
    "Workplace etiquette guidance sheet"
  ],
  steps: [
    {
      title: "Introduction to Workplace Communication",
      duration: "5 minutes",
      description: "Discuss the importance of effective communication in the workplace",
      instructions: [
        "Ask students about communication challenges they might face at work",
        "Introduce key concepts: clarity, formality, channels of communication",
        "Show examples of different workplace communication situations"
      ]
    },
    {
      title: "Email Language Practice",
      duration: "10 minutes",
      description: "Learn and practice language for professional emails",
      materials: ["Email templates handout"],
      instructions: [
        "Present common email expressions and structures",
        "Highlight differences between formal and informal email language",
        "Students complete gap-fill email exercises",
        "Review answers and discuss appropriate tone"
      ],
      teacherNotes: "Emphasize the importance of subject lines, greetings, and sign-offs"
    },
    {
      title: "Phone Conversation Role-Play",
      duration: "15 minutes",
      description: "Practice professional telephone conversations through role-play",
      materials: ["Workplace dialogue cards"],
      instructions: [
        "Model a professional phone conversation",
        "Present useful phrases: 'May I speak to...', 'I'll put you through', 'Could you hold?'",
        "Students practice dialogues in pairs using role cards",
        "Switch roles to ensure all students practice different parts"
      ]
    },
    {
      title: "Workplace Etiquette Discussion",
      duration: "10 minutes",
      description: "Learn about appropriate behavior and communication in the workplace",
      materials: ["Workplace etiquette guidance sheet"],
      instructions: [
        "Present key workplace etiquette rules in English-speaking countries",
        "Discuss cultural differences in workplace communication",
        "Students identify appropriate and inappropriate workplace behaviors"
      ]
    },
    {
      title: "Wrap-up: Mini Problem-Solving",
      duration: "5 minutes",
      description: "Apply workplace communication skills to solve a simple problem",
      instructions: [
        "Present a workplace communication problem",
        "In pairs, students discuss solutions and appropriate language",
        "Share best approaches with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students based on their participation in role-plays, appropriate use of formal/informal language, and their understanding of workplace etiquette.",
  homeworkIdeas: [
    "Write a professional email applying for a job", 
    "Create a dialogue for a challenging workplace situation and how to resolve it"
  ],
  additionalResources: [
    {
      title: "Business English Resources",
      url: "https://www.businessenglishresources.com/"
    }
  ]
};
