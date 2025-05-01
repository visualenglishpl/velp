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

// Lesson plan data for Teen Jobs and Career Exploration
export const workplaceCommunicationLessonPlan = {
  id: "teen-jobs-career-exploration",
  title: "Teen Jobs and Career Exploration",
  duration: "45 minutes",
  level: "Intermediate",
  objectives: [
    "Learn vocabulary for common teenage jobs and part-time work",
    "Discuss skills development through early work experiences",
    "Explore career paths and job requirements",
    "Practice job interview skills relevant to teenagers"
  ],
  materials: [
    "Visual English Book 7, Unit 9 slides",
    "Teen jobs flashcards",
    "Career path charts",
    "Simple job application forms",
    "Interview question cards"
  ],
  steps: [
    {
      title: "Introduction: Teen Work Experiences",
      duration: "5 minutes",
      description: "Discuss common jobs and work experiences for teenagers",
      instructions: [
        "Ask students if any of them have had work experience",
        "Brainstorm types of jobs teenagers can do in your country",
        "Discuss reasons why teens might want to work part-time"
      ]
    },
    {
      title: "Teen Jobs Vocabulary",
      duration: "10 minutes",
      description: "Learn vocabulary for common teenage and entry-level jobs",
      materials: ["Teen jobs flashcards"],
      instructions: [
        "Present vocabulary for teen-friendly jobs: babysitter, dog walker, server, retail assistant, tutor, etc.",
        "For each job, discuss typical responsibilities and required skills",
        "Students sort jobs by category: working with people, working with things, etc.",
        "Discuss which jobs they would find interesting and why"
      ],
      teacherNotes: "Emphasize that early job experiences build valuable transferable skills"
    },
    {
      title: "Job Application Activity",
      duration: "15 minutes",
      description: "Practice completing simple job applications",
      materials: ["Simple job application forms"],
      instructions: [
        "Review vocabulary for job applications: experience, availability, reference, etc.",
        "Present example of a completed application form",
        "Students complete an application for a part-time job they'd be interested in",
        "In pairs, students review each other's applications and provide feedback"
      ]
    },
    {
      title: "Mock Interview Practice",
      duration: "10 minutes",
      description: "Learn and practice basic job interview skills",
      materials: ["Interview question cards"],
      instructions: [
        "Present common interview questions for teen jobs",
        "Model appropriate responses and body language",
        "In pairs, students take turns being interviewer and interviewee",
        "Provide feedback on communication skills and answers"
      ]
    },
    {
      title: "Future Career Exploration",
      duration: "5 minutes",
      description: "Connect current interests to potential future careers",
      instructions: [
        "Students identify skills they already have that could be useful in jobs",
        "Discuss how teen job experiences can lead to future career options",
        "Students share their long-term career interests with the class"
      ]
    }
  ],
  assessmentTips: "Evaluate students on their ability to discuss job options appropriate for teenagers, complete applications correctly, and participate effectively in mock interviews.",
  homeworkIdeas: [
    "Research three jobs you might be interested in doing as a teenager and describe the skills needed", 
    "Write a short paragraph explaining how a part-time job now could help with your future career goals"
  ],
  additionalResources: [
    {
      title: "Teen Job Guide",
      url: "https://www.indeed.com/career-advice/finding-a-job/jobs-for-teens"
    }
  ]
};
